import express from "express";
import dotenv from "dotenv";
import bodyParser from 'body-parser';
import { fileURLToPath } from 'url';
import path, { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const dotenvPath = path.join(__dirname, '.env')
dotenv.config({ path: dotenvPath })

const app = express();
const port = process.env.PORT || 8060

app.use(express.static(path.join(__dirname, 'sorting', 'build')));
app.use(express.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'sorting', 'index.html'));
});  

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});