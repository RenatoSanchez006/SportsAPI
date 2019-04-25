function displaySportList(data) {
	data.sports.forEach(element => {
		$('.sports-list').append(`
			<div id='${element._id}'>
				${element.id} ${element.name}
			</div>
		`);
	});
}

function onload() {
	let url = "./sports/api/list-sports";
	let settings = {
		method: "GET",
		headers: {
			'Content-Type': 'application/json'
		}
	};

	fetch(url, settings)
		.then(response => {
			if (response.ok) {
				return response.json();
			}
			// throw new Error(response.statusText);
		})
		.then(responseJSON => {
			displaySportList(responseJSON);
		})
		.catch(err => {
			console.log(err);
		})
}

$(onload);

$('#submitButton').click(function () {
	let sportName = $('#sportName').val();
	let id = $('#id').val();
	let newSport = {
		id: id,
		name: sportName
	};
	console.log(newSport);
	postAjaxCall(newSport, displaySportList);
});

function postAjaxCall (newSport, callback) {
	console.log(newSport);
	$.ajax({
		url: './sports/api/post-sport',
		method: "POST",
		contentType: 'application/json',
		data: JSON.stringify(newSport),
		dataType: 'json',
		success: responseJson => callback(responseJson),
		error: err => console.log(err)
	});
}