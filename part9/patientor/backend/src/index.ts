import express from 'express';
import cors from 'cors';
import routeDiagnose from './routes/diagnoses';

const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/ping",(_req,res) => {
    res.status(200).send("pong");
});

app.use('/api/diagnose',routeDiagnose);

const PORT = 3001;
app.listen(PORT,() => {
    console.log(`server running on port ${PORT}`);
});