import express from "express";
import cors from 'cors';

const app = express();
app.use(express.json());

const corsOptions = {
    origin: '*', // Allow requests from all origins (in production this will be changed to specific origins)
    allowedHeaders: ['Content-Type', 'Authorization'], // Allowed headers to be sent to limit access to sensitive Data
    credentials: true, // This allow credentials as cookies, authentication tokens, etc
};
app.use(cors(corsOptions));

app.listen(3000, () => {
    console.log("Server running on port 3000");
});