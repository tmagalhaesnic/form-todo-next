import type { NextApiRequest, NextApiResponse } from 'next';
import connection from '../../utils/db';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { method } = req;

  if (method === 'GET') {
    const [tasks] = await connection.query('SELECT * FROM task');
    res.status(200).json(tasks);
  } else if (method === 'POST') {
    const { content } = req.body;
    if (typeof content === 'string' && content.length >= 5 && content.length <= 30) {
      await connection.query('INSERT INTO task (content) VALUES (?)', [content]);
      res.status(201).end();
    } else {
      res.status(400).json({ message: 'Content must be between 5 and 30 characters' });
    }
  } else if (method === 'DELETE') {
    const { id } = req.body;
    if (id) {
      await connection.query('DELETE FROM task WHERE id = ?', [id]);
    } else {
      await connection.query('DELETE FROM task');
    }
    res.status(200).end();
  } else if (method === 'PUT') {
    const { id, content, is_done } = req.body;
    if (typeof id === 'number' && typeof content === 'string' && typeof is_done === 'boolean') {
      await connection.query('UPDATE task SET content = ?, is_done = ? WHERE id = ?', [content, is_done, id]);
      res.status(200).end();
    } else {
      res.status(400).json({ message: 'Invalid input' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST', 'DELETE', 'PUT']);
    res.status(405).end(`Method ${method} Not Allowed`);
  }
}
