import express from "express";
import router from "./routes/index"
import { UsersStorage } from "./lib/users"

const app = express();
const port = 3000;

app.locals.users = new UsersStorage();

app.use(express.json());
app.use('/api/v1/', router);

app.listen( port, () => console.log(`started at ${port}.`) );