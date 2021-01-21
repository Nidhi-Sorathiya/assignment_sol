const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost:27017/empdetail", {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log("connect");
  })
  .catch((e) => {
    console.log("no connection");
  });
