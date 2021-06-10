let fetchPhotographers;
let fetchMediasPhotographer;
let data;

//Search id
let url = 'FishEyeData.json';
const queryString_url_id = window.location.search;
const idPhotographers = new URLSearchParams(queryString_url_id);
const id = idPhotographers.get('id');
console.log(id);

//Api Request

const fetchData = async () => {
	await fetch(url)
		.then((res) => res.json())
		.then((value) => {
			data = value;
			console.log(data.photographers);
		});
};
fetchData();

const displayPhotographerHeader = async () => {
	fetchPhotographers = await fetch(url)
		.then((res) => res.json())
		.then((value) => {
			const photographerSelect = value.photographers.find((object) => object.id == id);
			const photographerHeader = `
			<div class="photograph-header">
				<div class="photograph-profile">
					<h3>${photographerSelect.name}</h3>
					<div id="content">
						<p id="city">${photographerSelect.city}, ${photographerSelect.country}</p>
						<p id="quote">${photographerSelect.tagline}</p>
					</div>
					<p class="tag">${photographerSelect.tags}</p>
				</div>
				<div id="modal">
					<button class="cta" id="#test">Contactez-moi</button>
				</div>
				<div class="user">
					<img src="/img/Sample_Photos/Photographers_thumbnails/${photographerSelect.portrait}" loading="lazy" alt="" />
				</div>
			</div>
			`;

			document.querySelector('.main').insertAdjacentHTML('afterbegin', photographerHeader);
		})
		.catch((err) => console.log('this is the error ' + err));
};
displayPhotographerHeader();

let userMedia = [];

const fetchPhotographer = async () => {
	fetchMediasPhotographer = await fetch(url)
		.then((res) => res.json())
		.then((value) => {
			userMedia = value;
			const fetchName = value.photographers.find((object) => object.id == id);
			const firstName = fetchName.name.split(' ');
			console.log(firstName[0]);
			let affichageP = '';
			for (const element of userMedia.media) {
				if (element.photographerId == id) {
					console.log(userMedia);
					firstNamePhotographers = `${userMedia.photographers}`;
					console.log(firstNamePhotographers[0]);
					affichageP += `
						<div id="main-gallery-img">
						<figure class="photo">
							<img src="img/Sample_Photos/${firstName[0]}/${element.image}" alt="" />
							<figcaption>
								<p>${element.title}</p>
								<span>${element.likes}  <i class="fas fa-heart"></i></span>
							</figcaption>
						</figure>
						</div>
						`;
				}
			}
			affichageP += '';
			document
				.querySelector('#main-gallery-flex')
				.insertAdjacentHTML('afterbegin', affichageP);
		})
		.catch((err) => console.log('this is the error ' + err));
};

fetchPhotographer();

// const userDisplay = async () => {
// 	await displayGallery();

// 	console.log(userMedia);
// };

// userDisplay();

// FORM
// DOM Elements
const modalbg = document.querySelector('.bground');
const modalBtn = document.querySelectorAll('button');
const formData = document.querySelectorAll('.formData');

const test = document.querySelector('#test');
const modalform = document.querySelector('content');

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal));

// launch modal form
function launchModal() {
	modalbg.style.display = 'block';
	console.log('modal');
}

//close modal form
let modalClose = document.getElementById('close');

const closeModal = () => {
	modalbg.style.display = 'none';
};
modalClose.addEventListener('click', closeModal);
