import express from "express";
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 8060

app.use(express.static(path.join(__dirname, 'sorting', 'build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'sorting', 'build', 'index.html'));
});  

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});