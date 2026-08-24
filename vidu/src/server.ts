import express, { Request, Response } from 'express';
import { mkdirSync } from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';

const app = express();
const port = Number(process.env.PORT) || 9000;
const dataDirectory = path.join(__dirname, '..', 'data');

mkdirSync(dataDirectory, { recursive: true });
const database = new DatabaseSync(path.join(dataDirectory, 'app.db'));
database.exec(`
  CREATE TABLE IF NOT EXISTS customer_requests (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    customer_name TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'received',
    created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
  )
`);

app.use(express.json());
app.use(express.static(path.join(__dirname, '..')));

app.get('/api/get', (req: Request, res: Response) => {
  res.json({
    message: 'This is a GET request!',
    user: { id: 1, name: 'Demo User', status: 'active' }
  });
});

app.post('/api/post', (req: Request, res: Response) => {
  res.json({ message: 'This is a POST request!' });
});

app.get('/api/requests', (req: Request, res: Response) => {
  const requests = database.prepare(
    'SELECT id, customer_name AS customerName, message, status, created_at AS createdAt FROM customer_requests ORDER BY id DESC'
  ).all();
  res.json({ success: true, requests });
});

app.post('/api/request', (req: Request, res: Response) => {
  const { customerName, message } = req.body as {
    customerName?: string;
    message?: string;
  };

  if (!customerName?.trim() || !message?.trim()) {
    res.status(400).json({
      success: false,
      message: 'customerName and message are required.'
    });
    return;
  }

  const result = database.prepare(
    'INSERT INTO customer_requests (customer_name, message) VALUES (?, ?)'
  ).run(customerName.trim(), message.trim());

  res.status(201).json({
    success: true,
    message: 'Customer request received.',
    request: {
      id: result.lastInsertRowid,
      customerName: customerName.trim(),
      message: message.trim(),
      status: 'received'
    }
  });
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});