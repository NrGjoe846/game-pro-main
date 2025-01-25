import express from 'express';
import cors from 'cors';
import { PythonShell } from 'python-shell';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());

// JavaScript code execution
app.post('/api/javascript', (req, res) => {
  const { code } = req.body;
  try {
    // Create a new function with console.log capture
    let output = '';
    const originalLog = console.log;
    console.log = (...args) => {
      output += args.map(arg => 
        typeof arg === 'object' ? JSON.stringify(arg, null, 2) : String(arg)
      ).join(' ') + '\n';
    };

    // Execute the code
    const AsyncFunction = Object.getPrototypeOf(async function(){}).constructor;
    const fn = new AsyncFunction(code);
    const result = fn();

    // Restore original console.log
    console.log = originalLog;

    res.json({ success: true, output: output || String(result) });
  } catch (error) {
    res.status(400).json({ success: false, error: error.message });
  }
});

// Python code execution
app.post('/api/python', (req, res) => {
  const { code } = req.body;
  
  // Create a temporary Python script
  const options = {
    mode: 'text',
    pythonPath: 'python3',
    pythonOptions: ['-u'], // unbuffered output
    scriptPath: __dirname,
    args: []
  };

  PythonShell.runString(code, options).then(messages => {
    res.json({ success: true, output: messages.join('\n') });
  }).catch(err => {
    res.status(400).json({ success: false, error: err.message });
  });
});

// Java code execution
app.post('/api/java', (req, res) => {
  const { code } = req.body;
  
  // For now, return a mock response since Java execution requires more setup
  res.json({ 
    success: true, 
    output: "Java execution is not implemented yet. This is a mock response." 
  });
});

app.listen(port, () => {
  console.log(`Code execution server running at http://localhost:${port}`);
});