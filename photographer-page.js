const queryString_url_id = window.location.search;
const idPhotographers = new URLSearchParams(queryString_url_id);
const id = idPhotographers.get('id');
let dataLocalParse = JSON.parse(localStorage.dataLocal);

const photographerSelect = dataLocalParse.photographers.find((object) => object.id == id);
//*****************  PHOTOGRAPH HEADER **************************/
let arrayTags = [];
const displayPhotographerHeader = () => {
	let arrayTags = [``];
	let tags;
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

//****************************** FORMULAIRE ******************************/

const modalbg = document.querySelector('.bground');
const buttonOpen = document.querySelector('.cta');
const buttonClose = document.getElementById('close');
let namePhotographer = `<h3>${photographerSelect.name}</h3>`;
const nameForm = document.querySelector('#form-photographer-name');
nameForm.innerHTML = `${photographerSelect.name}`;
const firstName = document.querySelector('#first');

const closeWithKeyboard = () => {
	document.addEventListener('keydown', (event) => {
		console.log(event.key);
		if (modalbg.classList.contains('block') && event.key == 'Escape') {
			closeForm();
		}
	});
};

const launchForm = () => {
	//modalbg.style.display = 'block';
	modalbg.classList.toggle('block');
	closeWithKeyboard();
};

const closeForm = () => {
	//modalbg.style.display = 'none';
	modalbg.classList.toggle('block');
};
focusMethod = function getFocus() {
	document.getElementById('first').focus();
};

buttonOpen.addEventListener('click', launchForm);
buttonOpen.addEventListener('click', focusMethod);
buttonClose.addEventListener('click', closeForm);

//******************* FACTORY PATTERN FOR DIFFERENTS MEDIA **************************/
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
	counterImage = 1;
	counterVideo = 1;

	for (const element of array) {
		if (typeof element.image !== 'undefined' && element.image.includes('jpg')) {
			showMedia += `
							<div class="main-gallery-img">
								<figure class="photo">
									<img src="img/Sample_Photos/${photographerSelect.name.split(' ')[0]}/${element.image}" alt="" />
									</figure>
									<figcaption>
											<p>${element.title}</p>
											<div>
												<span id="image-like-${counterImage}" class="addone  btn-counter" >${element.likes}</span>
												<i class="fas fa-heart"></i>
											</div>
									</figcaption>
								<p class='gallery-hover'><span>${element.date}</span><span>${element.price}/jour</span> </p>
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
						<div>
							<span id="video-like-${counterVideo}" class="addone  btn-counter">${element.likes}</span>
							<i class="fas fa-heart"></i>
						</div>
				</figcaption>
				<p class='gallery-hover'><span>${element.date}</span><span>${element.price}/jour</span> </p>
			</div>
		`;
		} else {
			alert('Je ne reconnais pas ce format');
		}
		counterImage += 1;
		counterVideo = 1;
	}
	showMedia += '';
	document.querySelector('#main-gallery-flex').insertAdjacentHTML('afterbegin', showMedia);
}

MediasFactory(cleanedArrayMedia);

//************************** COUNTER LIKE  ************************/
const divs = document.querySelectorAll('.fa-heart');
const bttns = document.querySelectorAll('.btn-counter');

divs.forEach((el) =>
	el.addEventListener('click', (event) => {
		let value = event.target.closest('div div div').firstChild.nextSibling.textContent;
		let valueClasss = event.target.closest('div div div').firstChild.nextSibling;
		//let t = value.textContent;

		let a;
		if (valueClasss.classList.contains('addone')) {
			a = parseInt(value) + 1;
			valueClasss.classList.toggle('addone');
		} else {
			a = parseInt(value) - 1;
			valueClasss.classList.toggle('addone');
		}
		valueClasss.innerHTML = a;

		console.log(valueClasss.textContent);
		console.log(valueClasss.id);
		localStorage.setItem('this.id', 'Tom');
	}),
);

//*************************** CSS **********************************/
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

//*************************** LIGHTBOX ************************/
//let gallery = document.querySelectorAll('.photo img'),
let previewBox = document.querySelector('#litbox'),
	previewImg = previewBox.querySelector('img'),
	previewVideo = previewBox.querySelector('video'),
	closeIcon = previewBox.querySelector('.icon'),
	currentImg = previewBox.querySelector('.current-img'),
	totalImg = previewBox.querySelector('.total-img'),
	lightboxTitle = previewBox.querySelector('#lightbox-title'),
	shadow = document.querySelector('.shadow');

let galleryNew = document.querySelectorAll('.photo');

window.onload = () => {
	for (let i = 0; i < galleryNew.length; i++) {
		totalImg.textContent = galleryNew.length;
		let newIndex = i;
		let clickedImgIndex;

		let empty = '';
		galleryNew[i].onclick = () => {
			clickedImgIndex = i;

			function lightbox() {
				document.querySelector('body').style.overflow = 'hidden';
				previewBox.classList.add('show');
				shadow.style.display = 'block';

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
