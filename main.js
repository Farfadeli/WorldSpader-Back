const express = require('express');
const app = express();
const PORT = 7000;

// Routes
const ROUTEPATH = "./routes"
const authRoutes = require(`${ROUTEPATH}/auth`)

app.use("/auth/", authRoutes)



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});