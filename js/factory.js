import * as header from './header.js';

export let cleanedArrayMedia;
export const cleanedDataMedia = () => {
	let arrayDataLocal = header.dataLocalParse.media;
	let arrayImage = [];
	for (const element of arrayDataLocal) {
		if (element.photographerId == header.id) {
			arrayImage.push(element);
		}
	}
	cleanedArrayMedia = arrayImage.filter(function (x) {
		return x !== undefined;
	});
};

export let showMedia = '';
export let svgHeart;
export let buttonCounter;

export const MediasFactory = (array) => {
	//counterImage = 1;
	//counterVideo = 1;
	showMedia = '';

	for (const element of array) {
		if (typeof element.image !== 'undefined' && element.image.includes('jpg')) {
			showMedia += `
			<figure class="main-gallery-img" 	>
				<figure class="photo">
					<img src="img/Sample_Photos/${header.photographerSelect.name.split(' ')[0]}/${
				element.image
			}" tabindex="2" alt="${element.alt}" />
				</figure>
			<figcaption>
				<p>${element.title}</p>
				<div class="like-container">
					<span id="${element.id}" class="ap addone" aria-label=likes >${element.likes}</span>
					<em class="fas fa-heart" title="increment ou decrement nombre de like" tabindex="2" aria-hidden="false" ></em>
				</div>
			</figcaption>
			<p class='gallery-hover'> </p>
			</figure>
			`;
		} else if (element.video.match('.mp4')) {
			showMedia += `
			<figure class="main-gallery-img"  >
				<video  class="photo"  width="475"  " tabindex="2">
					<source src="img/Sample_Photos/${header.photographerSelect.name.split(' ')[0]}/${
				element.video
			}"  tabindex="2"alt="${element.alt}" />
				</video >
				<figcaption>
					<p>${element.title}</p>
						<div class="like-container">
							<span id="${element.id}" class="a addone">${element.likes}</span>
							<em class="fas fa-heart" tabindex="2" aria-hidden="false" ></em>
						</div>
				</figcaption>
				<p class='gallery-hover'> </p>
			</figure>
		`;
		} else {
			alert('Je ne reconnais pas ce format');
		}
		//counterImage += 1;
		//counterVideo = 1;
	}
	showMedia += '';
	document.querySelector('#main-gallery-flex').innerHTML = showMedia;
	svgHeart = document.querySelectorAll('.fa-heart');
	buttonCounter = document.querySelectorAll('.like-container span');
};
