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
    const { command } = commitBody(answers);
    execSync(command, { stdio: "inherit" });

    const branch = execSync("git rev-parse --abbrev-ref HEAD").toString().trim();

    console.info("🚀 Haciendo push...");
    execSync(`git push --set-upstream origin ${branch}`, { stdio: "inherit" });

    console.info("🎉 Push realizado con éxito!");
  } catch (err) {
    console.error("❌ Error durante el commit:", err.message);
  }
})();
