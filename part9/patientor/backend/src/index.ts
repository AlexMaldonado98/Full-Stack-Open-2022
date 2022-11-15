import express from 'express';
import cors from 'cors';
import routeDiagnose from './routes/diagnoses';
import routerPatients from './routes/patients';

const app = express();

app.use(express.json());
app.use(cors());

app.get("/api/ping",(_req,res) => {
    res.status(200).send("pong");
});

app.use('/api/diagnoses',routeDiagnose);
app.use('/api/patients',routerPatients);

const PORT = 3001;
app.listen(PORT,() => {
    console.log(`server running on port ${PORT}`);
});