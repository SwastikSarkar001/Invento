const express = require('express');
const dbPool = require('./db');
const cors = require('cors');
require('dotenv').config();


const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));


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
    try 
    {
        console.log("hit");
        const { product_name, category_id, supplier_id, price, stock_quantity } = req.body;
        console.log(req.body);

        // Assuming 'inventory' is the name of your table
        const { rows } = await dbPool.query(
            'INSERT INTO inventory (product_name, category_id, supplier_id, price, stock_quantity) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [product_name, category_id, supplier_id, price, stock_quantity]
        );

        res.json(rows[0]);
    } 
    catch (err) 
    {
        console.error('Error executing query', err);
        res.status(500).json({ message: 'Internal server error' });
    }
});


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
