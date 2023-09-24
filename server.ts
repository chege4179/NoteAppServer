import express,{ Request,Response } from 'express';
import dotenv from "dotenv"
import cors from "cors"
import UserRoutes from "./routes/UserRoutes";
import NoteRoutes from "./routes/NoteRoutes";

const app: express.Application = express();

dotenv.config()



app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended:true }))

app.use('/note',NoteRoutes)
app.use('/user',UserRoutes)


app.get('/', (req:Request, res:Response) => {
     return res.send("InstaMall App Server");
});


const port: number = Number(process.env.PORT) || 9000;
app.listen(port, () => {
     console.log(`Note App Server running http://localhost:${port}/`);
});
