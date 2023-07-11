const express = require('express');
require('dotenv').config();
const app = express();
const cors = require('cors');
const port = 5000 || process.env.PORT;

// Middleware
app.use(cors());
app.use(express.json());


const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.rgfriso.mongodb.net/?retryWrites=true&w=majority`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        // Database routs 
        const database = client.db("foodease");
        const foodsCollection = database.collection("foods");
        const cartsCollections = database.collection('carts');
        // Cart collections . 

        app.post('/cart', async (req, res) => {
            const cart = req.body;
            const result = await cartsCollections.insertOne(cart);
            res.send(result);
        })
        app.get(`/cart/:email`, async (req, res) => {
            const email = req.params.email;
            const query = { userEmail: email };
            const cart = await cartsCollections.find(query).toArray();
            res.send(cart);
        })

        app.get('/all-cart/:email', async (req, res) => {
            const email = req.params.email;
            const pipeline = [
                {
                    '$match': {
                        'userEmail': email
                    }
                },
                {
                    '$lookup': {
                        'from': 'foods',
                        'localField': 'itemId',
                        'foreignField': 'uuid',
                        'as': 'food'
                    }
                },
                {
                    '$unwind': {
                        'path': '$food'
                    }
                },
                {
                    '$project': {
                        'food': 1,
                        'quantity': 1
                    }
                }
            ]
            const cursor = cartsCollections.aggregate(pipeline);
            const cart = await cursor.toArray();
            res.send(cart);

        })

        app.get('/foods', async (req, res) => {
            const cursor = foodsCollection.find({});
            const foods = await cursor.toArray();
            res.send(foods);
        })


        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('Hello from Food ease')
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
})