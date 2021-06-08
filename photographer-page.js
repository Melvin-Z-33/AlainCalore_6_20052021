// FORM
// DOM Elements
const modalbg = document.querySelector('.bground');
const modalBtn = document.querySelectorAll('.cta');
const formData = document.querySelectorAll('.formData');

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal));

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

// ajout du photographer-header

//Recuperer id
let url = 'FishEyeData.json';
const queryString_url_id = window.location.search;
const idPhotographers = new URLSearchParams(queryString_url_id);
const id = idPhotographers.get('id');
console.log(id);
let show;

const displayPhotographerHeader = async () => {
	show = await fetch(url)
		.then((res) => res.json())
		.then((value) => {
			console.log(value.photographers);

			const photographerSelect = value.photographers.find((object) => object.id == id);
			console.log(photographerSelect);
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
			<button class="cta">Contactez-moi</button>
			</div>
			<div class="user">
			<<img src="/img/Sample_Photos/Photographers_thumbnails/${photographerSelect.portrait}" loading="lazy" alt="" />
			</div>
			</div>
			`;

			document.querySelector('.main').insertAdjacentHTML('afterbegin', photographerHeader);
		})
		.catch((err) => console.log('this is the error ' + err));
};
displayPhotographerHeader();
