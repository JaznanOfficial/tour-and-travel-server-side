const express = require('express');
const { MongoClient } = require('mongodb');
const cors = require('cors')
require('dotenv').config()
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.gkhtj.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



const run = async () => {
    try {
        await client.connect();
        const database = client.db('tour-and-travel');
        const placesCollection = database.collection('places');
        console.log('data is running here');
        // GET API
        app.get('/places', async(req, res) => {
            const cursor = placesCollection.find({});
            const places = await cursor.toArray();
            res.send(places);
            res.send('hello world');
        })

        // POST API
        
       
    }
    finally {
        // await client.close();
    }
}
run().catch(console.dir);




app.get('/', (req, res) => {
    res.send('getting data properly...')
})

app.listen(port, () => {
    console.log('server is running on port',port);
})