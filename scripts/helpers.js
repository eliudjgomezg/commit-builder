const validTypes = [
  "refactor: Refactorización de código (ni feature ni fix)",
  "feat: Nueva funcionalidad (feature)",
  "fix: Corrección de bug",
  "docs: Cambios solo en la documentación",
  "style: Cambios de formato (espaciado, indentación, etc.), sin afectar lógica",
  "test: Agregar o modificar tests",
  "chore: Tareas de mantenimiento menores (builds, dependencias, configs)",
  "perf: Mejoras de rendimiento",
  "ci: Cambios en archivos ",
  "build: Cambios en el sistema de build o dependencias externas",
  "revert: Reversión de un commit anterior"
]

const inquirerPrompt = [
  {
    type: "list",
    name: "type",
    message: "Tipo:",
    choices: validTypes,
  },
  {
    type: "input",
    name: "module",
    message: "Módulo:",
    validate: (input) => input.trim() !== "" || "El módulo no puede estar vacío.",
  },
  {
    type: "input",
    name: "title",
    message: "Título:",
    validate: (input) => input.trim() !== "" || "El título no puede estar vacío.",
  },
  {
    type: "input",
    name: "message",
    message: "Mensaje opcional:",
  },
]

const commitBody = (answers) => {
  const { type, module, title, message } = answers
  const parsedType = type.split(":")[0].trim()
  const header = `${parsedType}(${module.toLowerCase()}): ${title.toLowerCase()}`
  const body = message.trim() ? message.toLowerCase() : null

  const command = body ? `git commit -m "${header}" -m "${body}"` : `git commit -m "${header}"`

  return { command, header }
}

module.exports = {
  validTypes,
  inquirerPrompt,
  commitBody,
}