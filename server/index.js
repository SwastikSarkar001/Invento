const express = require('express');
const dbPool = require('./db');
const cors = require('cors');
const { GoogleGenerativeAI } = require("@google/generative-ai");
require('dotenv').config();

const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.send('Hello, world!');
});

app.get('/api', async (req, res) => {
    try {
        const { rows } = await dbPool.query('SELECT $1::text as message', ['Hello, world!']);
        res.json(rows[0]);
    } catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ message: 'Internal server error' });
    }
}
);

app.post('/api/addProduct', async (req, res) => {
    try {
        const { product_name, category_id, supplier_id, price, stock_quantity } = req.body;
        console.log(req.body);

        const { rows } = await dbPool.query(
            'INSERT INTO inventory (product_name, category_id, supplier_id, price, stock_quantity) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [product_name, category_id, supplier_id, price, stock_quantity]
        );

        res.json(rows[0]);
    }
    catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/api/seeds', async (req, res) => {
    try {
        const { rows } = await dbPool.query('SELECT * FROM seeds');
        res.json(rows);
    }
    catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// CREATE TABLE seeds(
//     seed_id SERIAL PRIMARY KEY,
//     serial_number VARCHAR(50) NOT NULL,
//     name VARCHAR(255) NOT NULL,
//     quantity DECIMAL(10, 2),
//     price DECIMAL(10, 2),
//     user_email VARCHAR(255) REFERENCES users(email)
// );

app.post('/api/add/seed', async (req, res) => {
    try {
        const { name, quantity, price, user_email } = req.body;

        const { rows } = await dbPool.query(
            'INSERT INTO seeds (name, quantity, price, user_email) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, quantity, price, user_email]
        );

        res.json(rows[0]);
    }
    catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/api/seed/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await dbPool.query('SELECT * FROM seeds WHERE id = $1', [id]);
        res.json(rows[0]);
    }
    catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/api/add/user', async (req, res) => {
    try {
        const { name, email } = req.body;

        const { rows } = await dbPool.query(
            'INSERT INTO users (name, email) VALUES ($1, $2) RETURNING *',
            [name, email]
        );

        res.json(rows[0]);
    }
    catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/api/users', async (req, res) => {
    try {
        const { rows } = await dbPool.query('SELECT * FROM users');
        res.json(rows);
    }
    catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/api/user/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await dbPool.query('SELECT * FROM users WHERE id = $1', [id]);
        res.json(rows[0]);
    }
    catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// get all seeds for a user

app.post('/api/user/seeds', async (req, res) => {
    try {
        const { email } = req.body;
        const { rows } = await dbPool.query('SELECT seed_id, name, quantity, price FROM seeds WHERE user_email = $1', [email]);
        res.json(rows);
    }
    catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.post('/api/add/tool', async (req, res) => {
    try {
        const { name, quantity, price, user_email } = req.body;

        const { rows } = await dbPool.query(
            'INSERT INTO tools (name, quantity, price, user_email) VALUES ($1, $2, $3, $4) RETURNING *',
            [name, quantity, price, user_email]
        );

        res.json(rows[0]);
    }
    catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/api/tools', async (req, res) => {
    try {
        const { rows } = await dbPool.query('SELECT * FROM tools');
        res.json(rows);
    }
    catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/api/gen-ai', async (req, res) => {
    try {
        const genAI = new GoogleGenerativeAI(process.env.API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-pro" });
        const { msg } = req.body;
        const { email } = req.body;
        const seeds = await dbPool.query('SELECT * FROM seeds WHERE user_email = $1', [email]);
        const tools = await dbPool.query('SELECT * FROM tools');
        const seedData = JSON.stringify(seeds);
        const toolData = JSON.stringify(tools);
        const prompt = "My email is: " + email + ". I am a farmer. You act like my assistant. These are the crops in the inventory" + seedData + ". These are the tools in the inventory " + toolData + ". The tools and crops are mapped with email. Answer only with the info I have already provided."
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        res.json({ answer: text });
    }
    catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.get('/api/tool/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { rows } = await dbPool.query('SELECT * FROM tools WHERE id = $1', [id]);
        res.json(rows[0]);
    }
    catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// get all tools for a user

app.post('/api/user/tools', async (req, res) => {
    try {
        const { email } = req.body;
        const { rows } = await dbPool.query('SELECT tool_id, name, quantity, price FROM tools WHERE user_email = $1', [email]);
        res.json(rows);
    }
    catch (err) {
        console.error('Error executing query', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
