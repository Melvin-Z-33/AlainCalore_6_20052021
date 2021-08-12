import * as header from './header.js';
import * as counterlike from './counterLike.js';

//Variables
export let cleanedArrayMedia;
export let showMedia = '';
export let svgHeart;
export let buttonCounter = document.querySelectorAll('.like-container span');

//Functions
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

const Objetfactory = (image, video, id, title, alt, likes) => {
	let media = {};

	media.image = image;
	media.video = video;
	media.id = id;
	media.title = title;
	media.alt = alt;
	media.likes = likes;

	media.displayImage = () => {
		let htmlforImage = `
		<figure class="main-gallery-img" 	>
			<figure class="photo">
				<img src="img/Sample_Photos/${
					header.photographerSelect.name.split(' ')[0]
				}/${image}" tabindex="2" alt="${alt}" />
			</figure>
		<figcaption>
			<p>${title}</p>
			<div class="like-container">
				<span id="${id}" class="ap addone" aria-label=likes >${likes}</span>
				<em class="fas fa-heart" title="increment ou decrement nombre de like" tabindex="2" aria-hidden="false" ></em>
			</div>
		</figcaption>
		<p class='gallery-hover'> </p>
		</figure>
		`;
		document.querySelector('#main-gallery-flex').insertAdjacentHTML('beforeend', htmlforImage);
	};

	media.displayVideo = () => {
		let htmlForVideo = `
		<figure class="main-gallery-img"  >
			<video  class="photo"  width="475"  " tabindex="2">
				<source src="img/Sample_Photos/${
					header.photographerSelect.name.split(' ')[0]
				}/${video}"  tabindex="2"alt="${alt}" />
			</video >
			<figcaption>
				<p>${title}</p>
					<div class="like-container">
						<span id="${id}" class="a addone">${likes}</span>
						<em class="fas fa-heart" tabindex="2" aria-hidden="false" ></em>
					</div>
			</figcaption>
			<p class='gallery-hover'> </p>
		</figure>
	`;
		document.querySelector('#main-gallery-flex').insertAdjacentHTML('beforeend', htmlForVideo);
	};

	return {
		media,
	};
};

export const factoryMedia = (array) => {
	document.querySelector('#main-gallery-flex').innerHTML = '';

	for (const element of array) {
		let objet = Objetfactory(
			element.image,
			element.video,
			element.id,
			element.title,
			element.alt,
			element.likes,
		);
		if (element.video === undefined) {
			objet.media.displayImage();
		} else if (element.image === undefined) {
			objet.media.displayVideo();
		}
		svgHeart = document.querySelectorAll('.fa-heart');
		buttonCounter = document.querySelectorAll('.like-container span');
		counterlike.showTotalLikes();
	}
};
