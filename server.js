const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');


dotenv.config();
const app = express();  // ОБЪЯВЛЕНИЕ app
app.use(express.json());

const userRoute = require("./routes/user");
app.use("/api", userRoute);


const PORT = process.env.PORT || 5000;

mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB Connected"))
    .catch(err => console.log(err));

const authRoute = require("./routes/auth");
app.use("/api/auth", authRoute);  // Использование app после объявления

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
