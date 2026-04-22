const express = require('express');
const app = express();
const PORT = 7000;


const cors = require("cors")

const bodyParser = require('body-parser')
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
const ROUTEPATH = "./routes"
const authRoutes = require(`${ROUTEPATH}/auth`)

app.use("/auth/", authRoutes)


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});