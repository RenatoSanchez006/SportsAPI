const express = require('express');
const bodyParser = require('body-parser')
const mongoose = require('mongoose');
const sportRouter = require('./router');
const app = express();
mongoose.Promise = global.Promise;
const jsonParser = bodyParser.json();

const{DATABASE_URL, PORT} = require('./config'); 

app.use(express.static('public'));

app.use('/sports/api', jsonParser, sportRouter);

let server;

function runServer(port, databaseUrl) {
	return new Promise((resolve, reject) => {
		mongoose.connect(databaseUrl,
			err => {
				if (err) {
					return reject(err);
				} else {
					server = app.listen(port, () => {
						console.log("App is Running in port", port);
						resolve();
					})
						.on('error', err => {
							mongoose.disconnect();
							return reject(err);
						});
				}
			}
		);
	});
}

function closeServer() {
	return mongoose.disconnect()
		.then(() => {
			return new Promise((resolve, reject) => {
				console.log('Closing server');
				server.close(err => {
					if (err) {
						return reject(err);
					} else {
						resolve();
					}
				});
			});
		});
}

runServer(PORT,DATABASE_URL)
	.catch(err => console.log(err));

module.exports = { app, runServer, closeServer };