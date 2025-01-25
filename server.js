import express from 'express';
import cors from 'cors';
import { exec } from 'child_process';
import { writeFile } from 'fs/promises';
import { join } from 'path';
import { v4 as uuidv4 } from 'uuid';

const app = express();
app.use(cors());
app.use(express.json());

// Create temporary files for code execution
const createTempFile = async (code, extension) => {
  const fileName = `${uuidv4()}.${extension}`;
  const filePath = join(process.cwd(), 'temp', fileName);
  await writeFile(filePath, code);
  return { fileName, filePath };
};

// Execute code based on language
const executeCode = (language, code) => {
  return new Promise(async (resolve, reject) => {
    try {
      switch (language) {
        case 'javascript':
          // Execute JavaScript using Node.js
          exec(`node -e "${code.replace(/"/g, '\\"')}"`, (error, stdout, stderr) => {
            if (error) reject(stderr);
            else resolve(stdout);
          });
          break;

        case 'python':
          // Execute Python code
          const { filePath: pyPath } = await createTempFile(code, 'py');
          exec(`python3 ${pyPath}`, (error, stdout, stderr) => {
            if (error) reject(stderr);
            else resolve(stdout);
          });
          break;

        case 'java':
          // Execute Java code
          const className = 'Main';
          const { filePath: javaPath } = await createTempFile(code, 'java');
          exec(`javac ${javaPath} && java -cp ${process.cwd()}/temp ${className}`, 
            (error, stdout, stderr) => {
              if (error) reject(stderr);
              else resolve(stdout);
          });
          break;

        default:
          reject('Unsupported language');
      }
    } catch (error) {
      reject(error.message);
    }
  });
};

app.post('/api/compiler', async (req, res) => {
  const { language, code } = req.body;

  try {
    const output = await executeCode(language, code);
    res.json({ output });
  } catch (error) {
    res.status(400).json({ error: error.toString() });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});