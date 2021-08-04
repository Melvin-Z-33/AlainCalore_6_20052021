import * as factory from './factory.js';
import * as counterlike from './counterLike.js';
import * as lightbox from './lightbox.js';

export const chevronDown = document.querySelector('#arrow-down');
export const chevronUp = document.querySelector('#arrow-up');
export const chevron = document.querySelector('.chevron');
export const dropdownButton = document.querySelector('#button-popularity');
export const buttonSortMedias = document.querySelector('#menu-sort-media');
export const buttonTittle = document.querySelector('#button-title');

export const openDropdown = () => {
	chevronDown.classList.remove('inline-block');
	chevronDown.classList.add('none');
	chevronUp.classList.remove('none');
	chevronUp.classList.add('inline-block');
	document.querySelector('.dd-menu').style.display = 'block';
	buttonSortMedias.ariaExpanded = 'true';
};

export const closeDropdown = () => {
	chevronDown.classList.remove('none');
	chevronDown.classList.add('inline-block');
	chevronUp.classList.remove('inline-block');
	chevronUp.classList.add('none');
	document.querySelector('.dd-menu').style.display = 'none';
	buttonSortMedias.ariaExpanded = 'false';
};

export const buttonPopularity = () => {
	if (chevronDown.classList.contains('inline-block')) {
		openDropdown();
	} else if (chevronUp.classList.contains('inline-block')) {
		closeDropdown();
	}
};

//******** SORT MEDIAS *********/

export const sortByPopularity = () => {
	factory.cleanedArrayMedia.sort((a, b) => {
		return b.likes - a.likes;
	});

	factory.factoryMedia(factory.cleanedArrayMedia);
	counterlike.checkButtonCounterClass();
	counterlike.showTotalLikes();
	factory.svgHeart.forEach((heart) => (heart.onclick = counterlike.addOrSubOne));
	factory.svgHeart.forEach((heart) =>
		heart.addEventListener('keydown', (event) => {
			if (event.key === 'Enter') {
				counterlike.addOrSubOne(event);
			}
		}),
	);

	closeDropdown();
	lightbox.buildLightBox();
	let itemsMedia = document.querySelectorAll('.photo');
	itemsMedia[0].children[0].focus();
};

export const sortByDate = () => {
	factory.cleanedArrayMedia.sort((a, b) => {
		return new Date(a.date) - new Date(b.date);
	});

	factory.factoryMedia(factory.cleanedArrayMedia);
	counterlike.checkButtonCounterClass();
	counterlike.showTotalLikes();
	factory.svgHeart.forEach((heart) => (heart.onclick = counterlike.addOrSubOne));
	factory.svgHeart.forEach((heart) =>
		heart.addEventListener('keydown', (event) => {
			if (event.key === 'Enter') {
				counterlike.addOrSubOne(event);
			}
		}),
	);

	closeDropdown();
	lightbox.buildLightBox();
	let itemsMedia = document.querySelectorAll('.photo');
	itemsMedia[0].children[0].focus();
};

export const sortByTitle = () => {
	factory.cleanedArrayMedia.sort((a, b) => {
		return a.title.localeCompare(b.title);
	});

	factory.factoryMedia(factory.cleanedArrayMedia);
	counterlike.checkButtonCounterClass();
	counterlike.showTotalLikes();
	factory.svgHeart.forEach((heart) => (heart.onclick = counterlike.addOrSubOne));
	factory.svgHeart.forEach((heart) =>
		heart.addEventListener('keydown', (event) => {
			if (event.key === 'Enter') {
				addOrSubOne(event);
			}
		}),
	);

	closeDropdown();
	lightbox.buildLightBox();
	let itemsMedia = document.querySelectorAll('.photo');
	itemsMedia[0].firstElementChild.focus();
};
