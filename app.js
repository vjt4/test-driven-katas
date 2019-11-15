const express = require("express");
const app = express();
const morgan = require("morgan");
const path = require("path");
const { error } = require('./views/')

app.use(morgan("dev")); //logging middleware
app.use(express.static(path.join(__dirname, "./public"))); //serving up static files (e.g. css files)
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use("/wiki", require("./routes/wiki"));
app.use("/users", require("./routes/users"));

app.get('/', function (req, res) {
   res.redirect('/wiki/');
});

app.use((req,res,next) => {
	const err404 = new Error('Not found')
	err404.status = 404
	next(err404)
})


app.use((err, req, res, next) => {
   console.error(err)
   console.error(err.stack)
   err.status = (err.status || 500)
   res.status(err.status).send(error('Sorry, there was an error', err))
})

module.exports = app;
