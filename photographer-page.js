const dataLocalParse = JSON.parse(sessionStorage.dataLocal);

//Search id photographer
let url = 'FishEyeData.json';

const queryString_url_id = window.location.search;
const idPhotographers = new URLSearchParams(queryString_url_id);
const id = idPhotographers.get('id');
const photographerSelect = dataLocalParse.photographers.find((object) => object.id == id);

let arrayTags = [];
const displayPhotographerHeader = () => {
	let arrayTags = [``];
	for (tags of photographerSelect.tags) {
		arrayTags.push(`<a class="card-tag">#${tags}</a> `);
	}
	const photographerHeader = `
			<div class="photograph-header">
				<div class="photograph-profile">
					<h3>${photographerSelect.name}</h3>
					<div id="content">
						<p id="city">${photographerSelect.city}, ${photographerSelect.country}</p>
						<p id="quote">${photographerSelect.tagline}</p>
					</div>
					<p class="tag">${arrayTags.join('')}</p>
				</div>
				<div id="modal">
					<button class="cta" id="test">Contactez-moi</button>
				</div>
				<div class="user">
					<img src="/img/Sample_Photos/Photographers_thumbnails/${
						photographerSelect.portrait
					}" loading="lazy" alt="" />
				</div>
			</div>
			`;
	document.querySelector('.main').insertAdjacentHTML('afterbegin', photographerHeader);
};
displayPhotographerHeader();

// FORM

// const modalform = document.querySelector('content');
// const modalBtn = document.querySelectorAll('.modal-btn');
// const formData = document.querySelectorAll('.formData');
const modalbg = document.querySelector('.bground');
const buttonOpen = document.querySelector('.cta');
const buttonClose = document.getElementById('close');

const launchForm = () => {
	modalbg.style.display = 'block';
};
const closeForm = () => {
	modalbg.style.display = 'none';
};
buttonOpen.addEventListener('click', launchForm);
buttonClose.addEventListener('click', closeForm);

const fetchPhotographer = () => {
	const fetchName = dataLocalParse.photographers.find((object) => object.id == id);
	const firstName = fetchName.name.split(' ');
	let showMedia = '';
	for (const element of dataLocalParse.media) {
		if (element.photographerId == id) {
			firstNamePhotographers = `${dataLocalParse.photographers}`;
			showMedia += `
						<div id="main-gallery-img">
							<figure class="photo">
								<img src="img/Sample_Photos/${firstName[0]}/${element.image}" alt="" />
								<figcaption>
										<p>${element.title}</p>
										<span>
										<button class="addone  btn-counter">${element.likes}</button>
										<i class="fas fa-heart"></i>
										</span>
									</figcaption>
							</figure>
						</div>
						`;
		}
	}
	showMedia += '';
	document.querySelector('#main-gallery-flex').insertAdjacentHTML('afterbegin', showMedia);
};
fetchPhotographer();

// counter like
const divs = document.querySelectorAll('.btn-counter');
divs.forEach((el) =>
	el.addEventListener('click', (event) => {
		let value = event.target;
		let t = parseInt(value.textContent);
		let a;
		if (value.classList.contains('addone')) {
			a = t + 1;
			value.classList.toggle('addone');
		} else {
			a = t - 1;
			value.classList.toggle('addone');
		}
		value.innerHTML = a;
	}),
);

//  Factory pattern for differents medias
let arrayDataLocal = [];
let arrayImage = [];
let arrayVideo = [];
let cleanedArrayImage;
let cleanedArrayVideo;

const cleanedDataMedia = () => {
	arrayDataLocal = dataLocalParse.media;
	arrayDataLocal.forEach((element) => {
		if (element.photographerId == id) {
			arrayImage.push(element.image);
			arrayVideo.push(element.video);
		}
	});

	cleanedArrayImage = arrayImage.filter(function (x) {
		return x !== undefined;
	});
	cleanedArrayVideo = arrayVideo.filter(function (x) {
		return x !== undefined;
	});
};
cleanedDataMedia();

const MediasFactory = (array) => {
	console.log(photographerSelect);
	for (i = 0; i < array.length; i++) {
		if (array[i].match('.mp4')) {
			console.log('video');
		} else if (array[i].match('.jpg')) {
			console.log('image');
		} else {
			alert('Je ne reconnais pas ce format');
		}
	}
};

MediasFactory(cleanedArrayImage);
MediasFactory(cleanedArrayVideo);
