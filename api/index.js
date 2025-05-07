const express = require("express");
const app = express();

const userRoutes = require("./routes/userRoutes");

app.use("/", userRoutes);

app.get("/", (req, res) => {
    res.send("Express on Vercel with Routes & Controllers");
});

app.listen(3000, () => console.log("Server ready on port 3000."));

module.exports = app;
