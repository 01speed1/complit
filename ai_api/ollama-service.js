import { Ollama } from "ollama";

const DEEPSEEK_MODEL = "deepseek-r1:7b";

const ollama = new Ollama({ host: process.env.OLLAMA_HOST });

async function downloadModelStatus({ modelName = DEEPSEEK_MODEL } = {}) {
  console.log(`downloading ${modelName}...`);
  let currentDigestDone = false;
  const stream = await ollama.pull({ model: modelName, stream: true });
  for await (const part of stream) {
    if (part.digest) {
      let percent = 0;
      if (part.completed && part.total) {
        percent = Math.round((part.completed / part.total) * 100);
      }
      process.stdout.clearLine(0); // Clear the current line
      process.stdout.cursorTo(0); // Move cursor to the beginning of the line
      process.stdout.write(`${part.status} ${percent}%...`); // Write the new text
      if (percent === 100 && !currentDigestDone) {
        console.log(); // Output to a new line
        currentDigestDone = true;
      } else {
        currentDigestDone = false;
      }
    } else {
      console.log(part.status);
    }
  }
}

downloadModelStatus().catch(console.error);
