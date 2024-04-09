// const { postCard } = require("./server.js");

const addCards = (items) => {
	arr = Array.from(items);
	arr.forEach((item) => {
		let itemToAppend =
			'<div class="col s4 center-align">' +
			'<div class="card medium"><div class="card-image waves-effect waves-block waves-light"><img class="activator" src="' +
			item.path +
			'"></div>' +
			'<div class="card-content">' +
			'<span class="card-title activator grey-text text-darken-4">' +
			item.title +
			'<i class="material-icons right">more_vert</i></span><p><a href="#"></a></p></div>' +
			'<div class="card-reveal">' +
			'<span class="card-title grey-text text-darken-4">' +
			item.subTitle +
			'<i class="material-icons right">close</i></span>' +
			'<p class="card-text">' +
			item.description +
			"</p>" +
			"</div></div></div>";
		$("#card-section").append(itemToAppend);
	});
};

const submitForm = () => {
	let formData = {
		title: $("#title").val(),
		subTitle: $("#subTitle").val(),
		path: $("#path").val(),
		description: $("#description").val(),
	};

	console.log(formData);
	// postCard(formData);
};

const getcards = () => {
	$.get("/api/cards", (response) => {
		if (response.statusCode == 200) {
			console.log(response.data);
			addCards(response.data);
		}
	});
};

$(document).ready(function () {
	$(".materialboxed").materialbox();
	$("#formSubmit").click(() => {
		submitForm();
	});

	$(".modal").modal();
	getcards();
});
