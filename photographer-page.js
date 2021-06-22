const dataLocalParse = JSON.parse(sessionStorage.dataLocal);

//Search id photographer
let url = 'FishEyeData.json';

const queryString_url_id = window.location.search;
const idPhotographers = new URLSearchParams(queryString_url_id);
const id = idPhotographers.get('id');
const photographerSelect = dataLocalParse.photographers.find((object) => object.id == id);

//**********  PHOTOGRAPH HEADER **************************/
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

//************ FORMULAIRE ******************************/

const modalbg = document.querySelector('.bground');
const buttonOpen = document.querySelector('.cta');
const buttonClose = document.getElementById('close');
let namePhotographer = `<h3>${photographerSelect.name}</h3>`;
const nameForm = document.querySelector('#form-photographer-name');
nameForm.innerHTML = `${photographerSelect.name}`;

const launchForm = () => {
	modalbg.style.display = 'block';
};
const closeForm = () => {
	modalbg.style.display = 'none';
};
buttonOpen.addEventListener('click', launchForm);
buttonClose.addEventListener('click', closeForm);

//*  ##### FACTORY PATTERN FOR DIFFERENTS MEDIA ##########
let arrayDataLocal = [];
let arrayImage = [];
let arrayVideo = [];
let cleanedArrayMedia;
let cleanedArrayVideo;

const cleanedDataMedia = () => {
	arrayDataLocal = dataLocalParse.media;

	for (const element of arrayDataLocal) {
		if (element.photographerId == id) {
			arrayImage.push(element);
		}
	}

	cleanedArrayMedia = arrayImage.filter(function (x) {
		return x !== undefined;
	});
	cleanedArrayVideo = arrayVideo.filter(function (x) {
		return x !== undefined;
	});
};
cleanedDataMedia();

let showMedia = '';
function MediasFactory(array) {
	for (const element of array) {
		if (typeof element.image !== 'undefined' && element.image.includes('jpg')) {
			showMedia += `
							<div class="main-gallery-img">
								<figure class="photo">
									<img src="img/Sample_Photos/${photographerSelect.name.split(' ')[0]}/${element.image}" alt="" />
									<figcaption>
											<p>${element.title}</p>
											<div>
												<span class="addone  btn-counter">${element.likes}</span>
												<i class="fas fa-heart"></i>
											</div>
									</figcaption>
								</figure>
								<p class='gallery-hover'><span>${element.date}</span><span>${element.price}/jour</span> </p>
							</div>
							`;
		} else if (element.video.match('.mp4')) {
			showMedia += `
			<div id="main-gallery-img">
			<video class="photo" controls width="250">
				<source src="img/Sample_Photos/${photographerSelect.name.split(' ')[0]}/${element.video}" alt="" />
			</video>
				<figcaption>
						<p>${element.title}</p>
						<span>
						<button class="addone  btn-counter">${element.likes}</button>
						</span>
						<i class="fas fa-heart"></i>
				</figcaption>
						<p class='gallery-hover'><span>${element.date}</span><span>${element.price}/jour</span> </p>
		</div>
		`;
		} else {
			alert('Je ne reconnais pas ce format');
		}
	}
	showMedia += '';
	document.querySelector('#main-gallery-flex').insertAdjacentHTML('afterbegin', showMedia);
}

MediasFactory(cleanedArrayMedia);

//*##### counter like ############################
const divs = document.querySelectorAll('.fa-heart');
const bttns = document.querySelectorAll('.btn-counter');

divs.forEach((el) =>
	el.addEventListener('click', (event) => {
		let value = event.target.closest('div div div').firstChild.nextSibling.textContent;
		let valueClasss = event.target.closest('div div div').firstChild.nextSibling;
		//let t = value.textContent;
		console.log(valueClasss);
		let a;
		if (valueClasss.classList.contains('addone')) {
			a = parseInt(value) + 1;
			valueClasss.classList.toggle('addone');
		} else {
			a = parseInt(value) - 1;
			valueClasss.classList.toggle('addone');
		}
		valueClasss.innerHTML = a;
	}),
);

//* ############# CSS #################################
const chevronDown = document.querySelector('#arrow-down');
const chevronUp = document.querySelector('#arrow-up');
const chevron = document.querySelector('.chevron');
const dropdownButton = document.querySelector('#dropdown-button');

const buttonPopularity = () => {
	if (chevronDown.classList.contains('inline-block')) {
		chevronDown.classList.remove('inline-block');
		chevronDown.classList.add('none');
		chevronUp.classList.remove('none');
		chevronUp.classList.add('inline-block');
	} else if (chevronDown.classList.contains('none')) {
		chevronDown.classList.remove('none');
		chevronDown.classList.add('inline-block');
		chevronUp.classList.remove('inline-block');
		chevronUp.classList.add('none');
	}
};
dropdownButton.addEventListener('click', buttonPopularity);
