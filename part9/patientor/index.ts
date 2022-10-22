import express from 'express';

const app = express();

app.use(express.json());


app.get("/api/ping",(_req,res) => {
    res.status(200).send("pong");
});

const PORT = 3000;
app.listen(PORT,() => {
    console.log(`server running on port ${PORT}`);
});