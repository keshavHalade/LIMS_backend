import express from 'express';
import { config } from 'dotenv';
import dataRoutes from './routes/dataRoutes.js';
import routes from "./routes/index.js";
import cors from 'cors';
config();
const app = express();
app.use(cors());
app.use(express.json());

app.use("/api", routes);
app.use('/api', dataRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

