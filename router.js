const express = require('express');
const router = express.Router();
const { ListSports } = require('./model');
const bcrypt = require('bcryptjs');

router.get('/list-sports', (req, res, next) => {
	ListSports.get()
		.then(sports => {
			res.status(200).json({
				message: 'Succesfully sent the list of sports',
				status: 200,
				sports: sports
			});
		})
		.catch(err => {
			res.status(500).json({
				message: 'Internal server error',
				status: 500
			});
			next();
		});
});

router.get('/list-sports/:id', (req, res, next) => {
	let sportId = req.params.id;

	ListSports.getById(sportId)
		.then(sport => {
			if (sport) {
				res.status(200).json({
					message: 'Succesfully sent the id',
					status: 200,
					sport: sport
				});
			} else {
				res.status(404).json({
					message: 'Sport not found in the list',
					status: 404
				});
				next();
			}
		})
		.catch(err => {
			console.log(err)
			res.status(500).json({
				message: 'Internal server error',
				status: 500
			});
			next();
		});
});

router.post('/post-sport', (req, res, next) => {
	console.log(req.body.id);
	console.log(req.body.name);
	bcrypt.hash(req.body.name, 10)
		.then(hashedName => {
			let objectToPost = {
				id: req.body.id,
				name: hashedName
			};
			console.log(objectToPost);
			ListSports.post(objectToPost);
		});

	let requiredFields = ['id', 'name'];
	for (let i = 0; i < requiredFields.length; i++) {
		let currentField = requiredFields[i];

		if (!(currentField in req.body)) {
			res.status(406).json({
				message: `Missing field ${currentField} in body.`,
				status: 406
			});
			return next();
		}
	}

	let objectToAdd = {
		id: req.body.id,
		name: req.body.name
	}

	ListSports.post(objectToAdd)
		.then(sport => {
			res.status(201).json({
				message: 'Succesfully added the sport',
				status: 201,
				sports: sport
			});
		})
		.catch(err => {
			res.status(500).json({
				message: 'Internal server error',
				status: 500
			});
			next();
		});
});

// not finished!!!!
router.put('/update-sport/:id', (req, res, next) => {
	let sportId = req.params.id;

	let requireField = ['name'];
	if (!('name' in req.body)) {
		res.status(406).json({
			message: 'Missing name field in body',
			status: 406
		});
	}

	// ListSports.updateSport(sportId, req.body.name);
	res.json({
		message: 'put not finished'
	})

	// sportsArray.forEach(item => {
	// 	if (item.id == sportId) {
	// 		item.name = req.body.name;
	// 		res.status(200).json({
	// 			message: `${sportId} updated`,
	// 			status: 200
	// 		})
	// 	}
	// });

	// res.status(404).json({
	// 	message: "ID doesn't exists",
	// 	status: 404
	// });
});


// does not works
router.delete('/remove-sport/:id', (req, res, next) => {
	let sportId = req.params.id;

	let requireField = ['id'];
	if (!('id' in req.body)) {
		res.status(406).json({
			message: 'Missing id field in body',
			status: 406
		});
		return next();
	}
	if (sportId != req.body.id) {
		res.status(406).json({
			message: "ID's do not match",
			status: 406
		});
		return next();
	}

	ListSports.delete(sportId)
		.then(sport => {
			if (sport) {
				res.status(200).json({
					message: "Sport deleted",
					status: 200,
					sport: sport
				});
			} else {
				res.status(404).json({
					message: "ID doesn't exists",
					status: 404
				});
				return next();
			}
		})
		.catch(err => {
			res.status(500).json({
				message: "Error 500",
				status: 500
			})
			return next();
		});

	// res.status(404).json({
	// 	message: "ID doesn't exists",
	// 	status: 404
	// });

});


module.exports = router;



















/*

app.get('/list-sports', (req, res) => {
	res.status(200).json({
		message: 'Successfully sent the list of sports',
		status: 200,
		sports: sportsArray
	});
});

app.get('/list-sports-with-headers', (req, res) => {
	let sportsId = req.get('id');

	sportsArray.forEach(item => {
		if (item.id == sportsId) {
			res.status(200).json({
				message: 'Success sent the id',
				status: 200,
				sport: item
			});
		}
	});
});

app.get('/list-sports/:id', (req, res) => {
	let sport = req.params.id;

	sportsArray.forEach(item => {
		if (item.id == sport) {
			res.status(200).json({
				message: 'Success sent the id',
				status: 200,
				sport: item
			});
		}
	});

	res.status(404).json({
		message: 'Sport not found in the list',
		status: 404
	})
});

app.put('/update-sport/:id', jsonParser, (req, res) => {
	let sportId = req.params.id;

	let requireField = ['name'];
	if (!('name' in req.body)) {
		res.status(406).json({
			message: 'Missing name field in body',
			status: 406
		});
	}

	sportsArray.forEach(item => {
		if (item.id == sportId) {
			item.name = req.body.name;
			res.status(200).json({
				message: `${sportId} updated`,
				status: 200
			})
		}
	});

	res.status(404).json({
		message: "ID doesn't exists",
		status: 404
	});
});

app.delete('/remove-sport/:id', jsonParser, (req, res) => {
	let sportId = req.params.id;

	let requireField = ['id'];
	if (!('id' in req.body)) {
		res.status(406).json({
			message: 'Missing id field in body',
			status: 406
		});
	}
	if (sportId != requireField) {
		res.status(406).json({
			message: "ID's do not match",
			status: 406
		});
	}

	sportsArray.forEach(item => {
		if (item.id == sportId) {
			// DELETE element from sportsArray
			/* item.name = req.body.name;
			res.status(200).json({
				message: `${sportId} updated`,
				status: 200
			}) /
		}
	});

	res.status(404).json({
		message: "ID doesn't exists",
		status: 404
	});

});

app.post('/post-sport', jsonParser, (req, res) => {

	// Validate that we receive both of the params
	// Send error with status 406 'Missing fields'
	let requiredFields = ['id', 'name'];
	for (let i = 0; i < requiredFields.length; i++) {
		let currentField = requiredFields[i];

		if (!(currentField in req.body)) {
			res.status(406).json({
				message: `Missing field ${currentField} in body.`,
				status: 406
			}).send('Finish');
		}
	}

	// Validate id received is not in the current array,
	// Send an error if its isn't received
	let sportId = req.body.id;
	sportsArray.forEach(item => {
		if (sportId == item.id) {
			res.status(409).json({
				message: 'ID already exists',
				status: 409
			}).send('Finish');
		}
	});

	// Success callback with status 201 with the
	// just created object
	let objectToAdd = {
		id: sportId,
		name: req.body.name
	}

	sportsArray.push(objectToAdd);
	res.status(201).json({
		message: 'Succesfully added the sport',
		status: 201,
		sport: objectToAdd
	});
}); */