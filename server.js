const express = require('express');
const app = express();
const env = require('dotenv');
env.config();
const cors = require('cors');
const mongodb = require('mongodb');
const mongoose = require('mongoose');

const userRoutes = require('./src/routes/User');
const productRoutes = require('./src/routes/Product');
const orderRoutes = require('./src/routes/Order');

mongoose.connect(`mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.bgxjk.mongodb.net/${process.env.MONGO_DB}?retryWrites=true&w=majority`, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log(`MongoDB Connected…`)
  })

app.use(cors());
app.use(express.json());
app.use('/static', express.static('public/uploads'));

app.use("/api/user", userRoutes);
app.use("/api/product", productRoutes);
app.use("/api/order", orderRoutes);

app.listen(process.env.PORT, () => {
  console.log(`server up ${process.env.PORT}`);
})
