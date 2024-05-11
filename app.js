const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const {PrismaClient} = require('@prisma/client')
const app = express();
const port = 3000;

const prisma = new PrismaClient()

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
        res.send(result)
    } catch (e) {
        console.error("errorrr", e)
        res.status(500).json({ error: "Internal server error" });
    }
})

app.get('/addUserOG', (req, res) => {
    console.log("get addUserOG")
    res.send()
})

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
