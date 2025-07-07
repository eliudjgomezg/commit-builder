#!/usr/bin/env node

const { execSync } = require("child_process");

(() => {
  try {
    const branch = execSync("git rev-parse --abbrev-ref HEAD").toString().trim();
    const hash = execSync("git rev-parse --short HEAD").toString().trim();
    const message = execSync("git log -1 --pretty=%B").toString().trim();
    const tagName = `qa-${branch}/${hash}`;

    console.info(`🏷️  Creando tag ${tagName} con mensaje: "${message}"`);
    execSync(`git tag -f ${tagName} -m "${message}"`);
    execSync(`git push origin ${tagName}`, { stdio: "inherit" });

    console.info("✅ Tag creado y enviado exitosamente.");
  } catch (err) {
    console.error("❌ Error al crear o hacer push del tag:", err.message);
  }
})();