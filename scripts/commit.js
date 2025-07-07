#!/usr/bin/env node

const inquirer = require("inquirer");
const { execSync } = require("child_process");
const { inquirerPrompt, commitBody } = require("./helpers");

(async () => {
  try {
    console.info("➕ Añadiendo cambios...")
    execSync("git add .", { stdio: "inherit" })

    console.info("✅ Creando commit...")
    const answers = await inquirer.prompt(inquirerPrompt)
    const command = commitBody(answers).command
    execSync(command, { stdio: "inherit" })

    console.info("🎉 ¡Commit realizado con éxito!")
  } catch (err) {
    console.error("❌ Error durante el commit:", err.message)
  }
})()