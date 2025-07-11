#!/usr/bin/env node

const inquirer = require("inquirer");
const { execSync } = require("child_process");
const { inquirerPrompt, commitBody } = require("./helpers");

(async () => {
  try {
    console.info("➕ Añadiendo cambios...");
    execSync("git add .", { stdio: "inherit" });

    console.info("✅ Creando commit...");
    const answers = await inquirer.prompt(inquirerPrompt);
    const { command, header } = commitBody(answers);
    execSync(command, { stdio: "inherit" });

    const branch = execSync("git rev-parse --abbrev-ref HEAD").toString().trim();

    console.info("🚀 Haciendo push...");
    execSync(`git push --set-upstream origin ${branch}`, { stdio: "inherit" });

    const hash = execSync("git rev-parse --short HEAD").toString().trim();
    const sanitizedBranch = branch.replace(/[^a-zA-Z0-9\\-_.]/g, "-");
    const tagName = `qa-${sanitizedBranch}/${hash}`;

    console.info(`🏷️  Creando tag ${tagName}...`);
    execSync(`git tag -f ${tagName} -m '${header}'`, { stdio: "inherit" });
    execSync(`git push origin ${tagName}`, { stdio: "inherit" });

    console.info("🎉 ¡Todo listo!");
  } catch (err) {
    console.error("❌ Error durante el proceso:", err.message);
  }
})();
