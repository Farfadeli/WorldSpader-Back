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
const simRoutes = require(`${ROUTEPATH}/simulation`)

app.use("/auth/", authRoutes)
app.use("/simulation/", simRoutes)

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

