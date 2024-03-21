const mongoose = require('mongoose');
const { port, MONGO_URL } = require('./Config');
const app = require('./app');

mongoose.connect(MONGO_URL)
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(port, () => {
      console.log(`App is connected to port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
