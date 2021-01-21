const express = require("express");
const path = require("path");
const app = express();
const port = process.env.PORT || 8000;

require("./db/conn");
const Emp = require("./models/emp");

const hbspath = path.join(__dirname, "../templates/views");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.set("view engine", "ejs");
app.set("views", hbspath);

app.get("/", (req, res) => {
  Emp.find((err, docs) => {
    res.render("index", { clubs: docs });
  }).catch((err) => {
    console.log("mongo not con");
  });
});

app.get("/edit/:id", (req, res, next) => {
  Emp.findOneAndUpdate(
    { _id: req.params.id },
    req.body,
    { new: true },
    (err, docs) => {
      if (err) {
        console.log("db problem");
        next(err);
      } else {
        res.render("edit", { clubs: docs });
      }
    }
  );
});

app.post("/edit/:id", (req, res, next) => {
  Emp.findByIdAndUpdate({ _id: req.params.id }, req.body, (err, docs) => {
    if (err) {
      console.log("not up");
      next(err);
    } else {
      res.redirect("/");
    }
  });
});

app.get("/del/:id", (req, res, next) => {
  Emp.findByIdAndDelete({ _id: req.params.id }, (err, docs) => {
    if (err) {
      console.log("not del");
      next(err);
    } else {
      console.log("del");
      res.redirect("/");
    }
  });
});

app.post("/", async (req, res) => {
  try {
    const empreg = new Emp({
      email: req.body.email,
      pswd: req.body.pswd,
    });
    const registered = await empreg.save();
    res.redirect("/");
  } catch {
    console.log("not save");
  }
});

app.listen(port, () => {
  console.log("listen");
});
