const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const {PrismaClient} = require('@prisma/client')
const app = express();
const port = 3000;

const prisma = new PrismaClient()

// PostgreSQL configuration
// const pool = new Pool({
//     user: 'postgres',
//     host: 'localhost',
//     database: 'commuFundDB',
//     password: 'admin',
//     port: 5433,
// });

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post("/addUserOG", async(req, res) => {
    const { nama_og, desk_og } = req.body;
    try {
        const result = await prisma.userOg.create({
            data: {
                nama: nama_og,
                deskripsi: desk_og
            }    
        });
        res.status(201).json({ message: "User OG created successfully", user: result });
    } catch (e) {
        console.error("errorrr", e)
        res.status(500).json({ error: "Internal server error" });
    }
})

// app.post('/submit', (req, res) => {
//     const { nama_organisasi, desc_organisasi } = req.body;

//     // Insert data into PostgreSQL
//     pool.query('INSERT INTO organisasi (nama_organisasi, deskripsi_organisasi) VALUES ($1, $2)', [nama_organisasi, desc_organisasi], (err, result) => {
//         if (err) {
//             console.error('Error executing query', err);
//             res.status(500).send('Error inserting data');
//         } else {
//             console.log('Data inserted successfully');
//             res.status(200).send('Data inserted successfully');
//         }
//     });
// });

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
