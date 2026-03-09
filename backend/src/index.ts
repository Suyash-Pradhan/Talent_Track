import express from "express";
const PORT = 8000;
const app = express();
import subjectRouter from "./routes/subjects.route.js";
import cors from "cors";
import securityMiddleware from "./middleware/security.js";

app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(securityMiddleware )
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}))
app.use('/api/subjects', subjectRouter);

app.get('/', (req, res) => {
    res.send("Hello World");
})

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT} http://localhost:${PORT}`);
})