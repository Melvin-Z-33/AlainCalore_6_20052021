const queryString_url_id = window.location.search;
const idPhotographers = new URLSearchParams(queryString_url_id);
const id = idPhotographers.get('id');
const datalocal = localStorage.getItem('dataLocal');
const dataLocalParse = JSON.parse(localStorage.getItem('dataLocal'));
// console.log(typeof dataLocalParse);
const photographerSelect = dataLocalParse.photographers.find((object) => object.id == id);
//*****************  PHOTOGRAPH HEADER **************************/
let arrayTags = [];
const displayPhotographerHeader = () => {
	let arrayTags = [``];
	let tags;
	for (tags of photographerSelect.tags) {
		arrayTags.push(`<a class="card-tag" aria-label="tag">#${tags}</a> `);
	}
	const photographerHeader = `
			<div class="photograph-header">
				<div class="photograph-profile">
					<h1>${photographerSelect.name}</h1>
					<div id="content">
						<p id="city">${photographerSelect.city}, ${photographerSelect.country}</p>
						<p id="quote">${photographerSelect.tagline}</p>
					</div>
					<p class="tag">${arrayTags.join('')}</p>
				</div>
				<div id="modal">
					<button class="button-form"  aria-label="contact me">Contactez-moi</button>
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

//****************************** FORMULAIRE ******************************/

const modalbg = document.querySelector('.bground');
const buttonOpen = document.querySelector('.button-form');
const buttonClose = document.getElementById('close');
const firstName = document.querySelector('#first');
const nameForm = document.querySelector('#form-photographer-name');
let namePhotographer = `<h3>${photographerSelect.name}</h3>`;
nameForm.innerHTML = `${photographerSelect.name}`;

const closeWithKeyboard = () => {
	document.addEventListener('keydown', (event) => {
		if (modalbg.classList.contains('block') && event.key == 'Escape') {
			closeForm();
		}
	});
};

const launchForm = () => {
	modalbg.classList.toggle('block');
	modalbg.style.backgroundColor = 'rgb(255,255,255,0.7 )';
	buttonOpen.style.display = 'none';
	closeWithKeyboard();
};

const closeForm = () => {
	modalbg.classList.toggle('block');
	modalbg.style.backgroundColor = 'rgb(255,255,255,0 )';
	buttonOpen.style.display = 'block';
};
focusMethod = function getFocus() {
	document.getElementById('first').focus();
};

buttonOpen.addEventListener('click', launchForm);
buttonOpen.addEventListener('click', focusMethod);
buttonClose.addEventListener('click', closeForm);

form.onsubmit = function () {
	// event.preventDefault();
	console.log(document.querySelector('#first').value);
	console.log(document.querySelector('#last').value);
	console.log(document.querySelector('#email').value);
};

//******************* FACTORY PATTERN FOR DIFFERENTS MEDIA **************************/
let arrayDataLocal = [];
let arrayImage = [];
let arrayVideo = [];
let cleanedArrayMedia;

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
};

cleanedDataMedia();
let svgHeart;
let buttonCounter;
let showMedia = '';
const MediasFactory = (array) => {
	counterImage = 1;
	counterVideo = 1;
	showMedia = '';

	for (const element of array) {
		if (typeof element.image !== 'undefined' && element.image.includes('jpg')) {
			showMedia += `
			<div class="main-gallery-img">
				<figure class="photo">
					<img src="img/Sample_Photos/${photographerSelect.name.split(' ')[0]}/${element.image}" alt="" />
				</figure>
			<figcaption>
				<p>${element.title}</p>
				<div class="chatnoir">
					<span id="${element.id}" class="ap addone" aria-label=likes >${element.likes}</span>
					<i class="fas fa-heart" title="increment ou decrement nombre de like"></i>
				</div>
			</figcaption>
			<p class='gallery-hover'> </p>
			</div>
			`;
		} else if (element.video.match('.mp4')) {
			showMedia += `
			<div class="main-gallery-img" >
				<video  class="photo"  width="475"  ">
					<source src="img/Sample_Photos/${photographerSelect.name.split(' ')[0]}/${element.video}" alt="" />
				</video >
				<figcaption>
					<p>${element.title}</p>
						<div class="chatnoir">
							<span id="${element.id}" class="a addone">${element.likes}</span>
							<i class="fas fa-heart"></i>
						</div>
				</figcaption>
				<p class='gallery-hover'> </p>
			</div>
		`;
		} else {
			alert('Je ne reconnais pas ce format');
		}
		counterImage += 1;
		counterVideo = 1;
	}
	showMedia += '';
	document.querySelector('#main-gallery-flex').innerHTML = showMedia;
	svgHeart = document.querySelectorAll('.fa-heart');
	buttonCounter = document.querySelectorAll('.chatnoir span');
};
MediasFactory(cleanedArrayMedia);

//************************** COUNTER LIKE  ************************/
const showTotalLikes = () => {
	let arrayTotalLikes = new Number();

	for (element of buttonCounter) {
		arrayTotalLikes += parseFloat(element.innerText);
		document.querySelectorAll('.gallery-hover').forEach((element) => {
			element.innerHTML = `<span>${arrayTotalLikes}
				<i class="fas fa-heart"></i></span></span><span>${photographerSelect.price}€ /jour</span>`;
		});
	}
};
showTotalLikes();

const checkButtonCounterClass = () => {
	for (key in localStorage) {
		for (element of buttonCounter) {
			if (key === element.id) {
				let dataFromLocalStorage = JSON.parse(localStorage.getItem(key));
				element.textContent = dataFromLocalStorage.number;
				if (dataFromLocalStorage.category === 'false') {
					element.classList.remove('addone');
				} else if (dataFromLocalStorage.category === 'true') {
					element.classList.add('addone');
				}
			}
		}
	}
};
checkButtonCounterClass();

svgHeart.forEach((el) =>
	el.addEventListener('click', (event) => {
		let value = event.target.closest('div div div').firstChild.nextSibling.textContent;
		let valueClasss = event.target.closest('div div div').firstChild.nextSibling;
		let counterNew;
		let objetLike = {};
		if (valueClasss.classList.contains('addone')) {
			counterNew = parseInt(value) + 1;
			valueClasss.classList.remove('addone');
			objetLike = {
				id: valueClasss.id,
				category: 'false',
				number: counterNew,
			};
			localStorage.setItem(valueClasss.id, JSON.stringify(objetLike));
		} else {
			counterNew = parseInt(value) - 1;
			valueClasss.classList.add('addone');
			objetLike = {
				id: valueClasss.id,
				category: 'true',
				number: counterNew,
			};
			localStorage.setItem(valueClasss.id, JSON.stringify(objetLike));
		}
		valueClasss.innerHTML = counterNew;
		showTotalLikes();
	}),
);

//*************************** CSS **********************************/
const chevronDown = document.querySelector('#arrow-down');
const chevronUp = document.querySelector('#arrow-up');
const chevron = document.querySelector('.chevron');
const dropdownButton = document.querySelector('#button-popularity');

const buttonPopularity = () => {
	if (chevronDown.classList.contains('inline-block')) {
		chevronDown.classList.remove('inline-block');
		chevronDown.classList.add('none');
		chevronUp.classList.remove('none');
		chevronUp.classList.add('inline-block');
		document.querySelector('.dd-menu').style.display = 'block';
	} else if (chevronUp.classList.contains('inline-block')) {
		chevronDown.classList.remove('none');
		chevronDown.classList.add('inline-block');
		chevronUp.classList.remove('inline-block');
		chevronUp.classList.add('none');
		document.querySelector('.dd-menu').style.display = 'none';
	}
};
chevronDown.addEventListener('click', buttonPopularity);
chevronUp.addEventListener('click', buttonPopularity);

//*************************** LIGHTBOX ************************/

let previewBox = document.querySelector('#litbox'),
	previewImg = previewBox.querySelector('img'),
	previewVideo = previewBox.querySelector('video'),
	closeIcon = previewBox.querySelector('.icon'),
	currentImg = previewBox.querySelector('.current-img'),
	totalImg = previewBox.querySelector('.total-img'),
	lightboxTitle = previewBox.querySelector('#lightbox-title'),
	shadow = document.querySelector('.shadow');

let galleryNew = document.querySelectorAll('.photo');
let empty = '';

window.onload = () => {
	for (let i = 0; i < galleryNew.length; i++) {
		totalImg.textContent = galleryNew.length;
		let newIndex = i;
		let clickedImgIndex;

		galleryNew[i].onclick = () => {
			clickedImgIndex = i;

			function lightbox() {
				document.querySelector('body').style.overflow = 'hidden';
				previewBox.classList.add('show');
				shadow.style.display = 'block';
				buttonOpen.style.display = 'none';

				if (!galleryNew[i].firstElementChild.src.split('.')[4].search('mp4')) {
					lightboxTitle.innnerHTML = '';
					let videoURL = galleryNew[i].firstElementChild.src;
					previewVideo.src = videoURL;
					previewImg.src = '';
					previewImg.style.display = 'none';
					previewVideo.style.display = 'block';
					lightboxTitle.innerHTML = '';
					lightboxTitle.insertAdjacentHTML(
						'afterbegin',
						`${cleanedArrayMedia[newIndex].title}`,
					);
				} else if (!galleryNew[i].firstElementChild.src.split('.')[4].search('jpg')) {
					lightboxTitle.insertAdjacentHTML('afterbegin', empty);
					let imageURL = galleryNew[i].firstElementChild.src;
					previewImg.src = imageURL;
					previewVideo.src = '';
					previewVideo.style.display = 'none';
					previewImg.style.display = 'block';
					lightboxTitle.innerHTML = '';
					lightboxTitle.insertAdjacentHTML(
						'afterbegin',
						`${cleanedArrayMedia[newIndex].title}`,
					);
				}
				currentImg.textContent = newIndex + 1;
			}
			lightbox();

			const prevBtn = document.querySelector('.prev');
			const nextBtn = document.querySelector('.next');
			if (newIndex == 0) {
				prevBtn.style.display = 'none';
			}
			if (newIndex >= galleryNew.length - 1) {
				nextBtn.style.display = 'none';
			}

			const goPreviousImage = () => {
				newIndex--;
				if (newIndex == 0) {
					lightbox(i--);
					prevBtn.style.display = 'none';
				} else {
					lightbox(i--);
					nextBtn.style.display = 'block';
				}
			};

			const goNextImage = () => {
				newIndex++;
				if (newIndex >= galleryNew.length - 1) {
					lightbox(i++);
					nextBtn.style.display = 'none';
				} else {
					lightbox(i++);
					prevBtn.style.display = 'block';
				}
			};
			prevBtn.addEventListener('click', goPreviousImage);
			nextBtn.addEventListener('click', goNextImage);

			const closeLightbox = () => {
				newIndex = clickedImgIndex;
				prevBtn.style.display = 'block';
				nextBtn.style.display = 'block';
				previewBox.classList.remove('show');
				shadow.style.display = 'none';
				document.querySelector('body').style.overflow = 'scroll';
				buttonOpen.style.display = 'block';
			};
			closeIcon.addEventListener('click', closeLightbox);

			if (previewBox.classList.contains('show')) {
				document.addEventListener('keydown', (event) => {
					const nomTouche = event.key;

					switch (nomTouche) {
						case 'ArrowRight':
							goNextImage();
							break;
						case 'ArrowLeft':
							goPreviousImage();
							break;
						case 'Escape':
							closeLightbox();
							break;
						default:
							console.log('problem with keyboard');
					}
				});
			}
		};
	}
};

//********* Sort Medias   *********************/

const incrementHeart = (event) => {
	let value = event.target.closest('div div div').firstChild.nextSibling.textContent;
	let valueClasss = event.target.closest('div div div').firstChild.nextSibling;
	let counterNew;
	let objetLike = {};
	if (valueClasss.classList.contains('addone')) {
		counterNew = parseInt(value) + 1;
		valueClasss.classList.remove('addone');
		objetLike = {
			id: valueClasss.id,
			category: 'false',
			number: counterNew,
		};
		localStorage.setItem(valueClasss.id, JSON.stringify(objetLike));
	} else {
		counterNew = parseInt(value) - 1;
		valueClasss.classList.add('addone');
		objetLike = {
			id: valueClasss.id,
			category: 'true',
			number: counterNew,
		};
		localStorage.setItem(valueClasss.id, JSON.stringify(objetLike));
	}
	valueClasss.innerHTML = counterNew;
};

document.querySelector('#button-popularity').addEventListener('click', () => {
	cleanedArrayMedia.sort((a, b) => {
		return b.likes - a.likes;
	});
	MediasFactory(cleanedArrayMedia);
	showTotalLikes();
	svgHeart.forEach((heart) => (heart.onclick = incrementHeart));
});

document.querySelector('#button-date').addEventListener('click', function () {
	cleanedArrayMedia.sort((a, b) => {
		return new Date(a.date) - new Date(b.date);
	});

	MediasFactory(cleanedArrayMedia);
	showTotalLikes();
	svgHeart.forEach((heart) => (heart.onclick = incrementHeart));
});

document.querySelector('#button-title').addEventListener('click', function () {
	cleanedArrayMedia.sort((a, b) => {
		return a.title.localeCompare(b.title);
	});
	MediasFactory(cleanedArrayMedia);
	showTotalLikes();
	svgHeart.forEach((heart) => (heart.onclick = incrementHeart));
});
