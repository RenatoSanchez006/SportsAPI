
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

let sportSchema = mongoose.Schema({
	id: { type: Number, required: true, unique: true },
	name: { type: String, required: true }
});

let Sports = mongoose.model('Sports', sportSchema);

const ListSports = {
	get: function () {
		return Sports.find()
			.then(sports => {
				return sports;
			})
			.catch(err => {
				throw new Error(err);
			});
	},
	getById: function (sportId) {
		return Sports.findOne({ id: sportId })
			.then(sport => {
				return sport;
			})
			.catch(err => {
				throw new Error(err);
			});
	},
	updateSport: function (newSportId, newName) {
		// not finished!!!
		let sportToUpdate = Sports.findOne({ id: newSportId })
			.then(sport => {
				// sportToUpdate = sport;
				console.log(sport);
			});
	},
	post: function (newSport) {
		return Sports.create(newSport)
			.then(sport => {
				return sport;
			})
			.catch(err => {
				throw new Error(err);
			});
	},
	delete: function (sportId) {
		// does not works
		Sports.findOneAndDelete({ id: sportId })
			.then(sport => {
				return sport;
			})
			.catch(err => {
				throw new Error(err);
			});
	}
}

module.exports = { ListSports }; 