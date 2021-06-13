const dataLocalParse = JSON.parse(sessionStorage.dataLocal);

//Search id photographer
let url = 'FishEyeData.json';
const queryString_url_id = window.location.search;
const idPhotographers = new URLSearchParams(queryString_url_id);
const id = idPhotographers.get('id');

let arrayTags = [];
const displayPhotographerHeader = async () => {
	fetchPhotographers = await fetch(url)
		.then((res) => res.json())
		.then((value) => {
			const photographerSelect = value.photographers.find((object) => object.id == id);
			let arrayTags = [``];

			for (tags of photographerSelect.tags) {
				arrayTags.push(`<button>#${tags}</button> `);
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
		})
		.catch((err) => console.log('this is the error ' + err));
};
displayPhotographerHeader();

let photographerMedia = [];

// const fetchPhotographer = async () => {
// 	fetchMediasPhotographer = await fetch(url)
// 		.then((res) => res.json())
// 		.then((value) => {
// 			photographerMedia = value;
// 			const fetchName = value.photographers.find((object) => object.id == id);
// 			const firstName = fetchName.name.split(' ');
// 			console.log(firstName[0]);

// 			let showMedia = '';
// 			for (const element of photographerMedia.media) {
// 				if (element.photographerId == id) {
// 					//console.log(userMedia);
// 					firstNamePhotographers = `${photographerMedia.photographers}`;
// 					//console.log(firstNamePhotographers[0]);
// 					showMedia += `
// 						<div id="main-gallery-img">
// 						<figure class="photo">
// 							<img src="img/Sample_Photos/${firstName[0]}/${element.image}" alt="" />
// 							<figcaption>
// 								<p>${element.title}</p>
// 								<span>${element.likes} <button class="btn-like"> <i class="fas fa-heart"></i></button></span>
// 							</figcaption>
// 						</figure>
// 						</div>
// 						`;
// 				}
// 			}

// 			showMedia += '';
// 			document
// 				.querySelector('#main-gallery-flex')
// 				.insertAdjacentHTML('afterbegin', showMedia);
// 		})
// 		.catch((err) => console.log('this is the error ' + err));
// };
// fetchPhotographer();
let test;
const fetchPhotographer = () => {
	//fetchMediasPhotographer = await fetch(url)
	//.then((res) => res.json())
	//.then((value) => {
	//photographerMedia = value;
	//console.log(value);
	console.log(dataLocalParse);
	const fetchName = dataLocalParse.photographers.find((object) => object.id == id);
	const firstName = fetchName.name.split(' ');
	console.log(firstName[0]);

	let showMedia = '';
	for (const element of dataLocalParse.media) {
		if (element.photographerId == id) {
			//console.log(userMedia);
			firstNamePhotographers = `${dataLocalParse.photographers}`;

			//console.log(firstNamePhotographers[0]);
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

// FORM
// DOM Elements

const cta = document.querySelector('.cta');
const modalform = document.querySelector('content');

const modalbg = document.querySelector('.bground');
const modalBtn = document.querySelectorAll('.modal-btn');
const formData = document.querySelectorAll('.formData');

// launch modal event
modalBtn.forEach((button) => button.addEventListener('click', launchModal));

// launch modal form
function launchModal() {
	modalbg.style.display = 'block';
}

//close modal form
let modalClose = document.getElementById('close');

const closeModal = () => {
	modalbg.style.display = 'none';
};
modalClose.addEventListener('click', closeModal);
