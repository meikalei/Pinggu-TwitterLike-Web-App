'use strict';

const express = require('express');
const router = require(__dirname + '/config/router');

let app = express();

app.use(express.static(__dirname + '/../frontend'))
app.use(require('method-override')());
app.use(require('body-parser').urlencoded({extended: false}));
app.use(require('body-parser').json());
app.use(require('compression')());
app.use(router(express.Router()));

app.listen(8000, () => {
	console.log("Server is running at PORT 8000");
});