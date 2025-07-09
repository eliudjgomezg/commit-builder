#!/usr/bin/env node

const inquirer = require("inquirer");
const { execSync, execFileSync } = require("child_process");
const { inquirerPrompt, commitBody } = require("./helpers");
const fetchFn = require("node-fetch");

function commandExists(cmd) {
  try {
    execSync(process.platform === "win32" ? `where ${cmd}` : `command -v ${cmd}`, {
      stdio: "ignore",
    });
    return true;
  } catch (_) {
    return false;
  }
}

function getGitlabRepoPath() {
  const remoteUrl = execSync("git config --get remote.origin.url").toString().trim();
  if (!remoteUrl) throw new Error("No se encontró remote.origin.url");

  const noGit = remoteUrl.replace(/\.git$/, "");

  let pathPart;
  if (noGit.startsWith("git@")) {
    pathPart = noGit.split(":")[1];
  } else if (noGit.startsWith("ssh://")) {
    pathPart = noGit.split("ssh://git@gitlab.com/")[1];
  } else if (noGit.startsWith("https://")) {
    pathPart = noGit.split("https://gitlab.com/")[1];
  }

  if (!pathPart) throw new Error(`No se pudo parsear la URL del remote: ${remoteUrl}`);
  return pathPart;
}

function createMrWithGlab({ header, description, sourceBranch, targetBranch }) {
  const args = [
    "mr",
    "create",
    "--title",
    header,
    "--description",
    description || header,
    "--source-branch",
    sourceBranch,
    "--target-branch",
    targetBranch,
    "--yes",
    "--no-editor",
  ];

  try {
    const output = execFileSync("glab", args, { encoding: "utf8" });
    const urlMatch = output.match(/https?:\/\/[^\s]+\/merge_requests\/\d+/);
    return urlMatch ? urlMatch[0] : null;
  } catch (err) {
    throw new Error(`glab falló: ${err.message}`);
  }
}

async function createMrWithApi({ header, description, sourceBranch, targetBranch, repoPath }) {
  const token = process.env.GITLAB_TOKEN;
  if (!token) throw new Error("Se requiere GITLAB_TOKEN para la ruta API");

  const encodedRepo = encodeURIComponent(repoPath);

  const projRes = await fetchFn(`https://gitlab.com/api/v4/projects/${encodedRepo}`, {
    headers: { "PRIVATE-TOKEN": token },
  });
  if (!projRes.ok) throw new Error(`Error al buscar proyecto: ${projRes.status} ${await projRes.text()}`);
  const project = await projRes.json();

  const mrRes = await fetchFn(`https://gitlab.com/api/v4/projects/${project.id}/merge_requests`, {
    method: "POST",
    headers: {
      "PRIVATE-TOKEN": token,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      source_branch: sourceBranch,
      target_branch: targetBranch,
      title: header,
      description: description || "",
    }),
  });
  if (!mrRes.ok) throw new Error(`Error al crear MR: ${mrRes.status} ${await mrRes.text()}`);
  const mr = await mrRes.json();
  return mr.web_url;
}

(async () => {
  try {
    console.info("➕ Añadiendo cambios…");
    execSync("git add .", { stdio: "inherit" });

    console.info("✅ Creando commit…");
    const answers = await inquirer.prompt(inquirerPrompt);
    const { command, header } = commitBody(answers);
    execSync(command, { stdio: "inherit" });

    const sourceBranch = execSync("git rev-parse --abbrev-ref HEAD").toString().trim();
    const targetBranch = "main";
    const description = answers.message || "";

    console.info("🚀 Haciendo push…");
    execSync(`git push --set-upstream origin ${sourceBranch}`, { stdio: "inherit" });

    const repoPath = getGitlabRepoPath();
    let mrUrl;

    if (commandExists("glab")) {
      try {
        console.info("🛠️ Creando Merge Request con glab…");
        mrUrl = createMrWithGlab({ header, description, sourceBranch, targetBranch });
      } catch (err) {
        console.warn("⚠️  glab falló, intentando API…", err.message);
      }
    } else {
      console.info("ℹ️ glab no está instalado, intentando API…");
    }

    if (!mrUrl) {
      try {
        mrUrl = await createMrWithApi({ header, description, sourceBranch, targetBranch, repoPath });
      } catch (err) {
        throw new Error(`${err.message}. Instala glab o define GITLAB_TOKEN para continuar.`);
      }
    }

    console.info("🎉 ¡Merge Request creado con éxito!");
    console.info(`🔗 URL del MR: ${mrUrl}`);
  } catch (err) {
    console.error("❌ Error durante el proceso:", err.message);
    process.exit(1);
  }
})();
