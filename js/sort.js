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
	header.cleanedArrayMedia.sort((a, b) => {
		return b.likes - a.likes;
	});
	MediasFactory(cleanedArrayMedia);
	showTotalLikes();
	svgHeart.forEach((heart) => (heart.onclick = addOrSubOne));
	svgHeart.forEach((heart) =>
		heart.addEventListener('keydown', (event) => {
			if (event.key === 'Enter') {
				addOrSubOne(event);
			}
		}),
	);

	closeDropdown();
	buildLightBox();
	let itemsMedia = document.querySelectorAll('.photo');
	itemsMedia[0].children[0].focus();
};

export const sortByDate = () => {
	header.cleanedArrayMedia.sort((a, b) => {
		return new Date(a.date) - new Date(b.date);
	});
	MediasFactory(cleanedArrayMedia);
	showTotalLikes();
	svgHeart.forEach((heart) => (heart.onclick = addOrSubOne));
	svgHeart.forEach((heart) =>
		heart.addEventListener('keydown', (event) => {
			if (event.key === 'Enter') {
				addOrSubOne(event);
			}
		}),
	);
	closeDropdown();
	buildLightBox();
	let itemsMedia = document.querySelectorAll('.photo');
	itemsMedia[0].children[0].focus();
};

export const sortByTitle = () => {
	header.cleanedArrayMedia.sort((a, b) => {
		return a.title.localeCompare(b.title);
	});
	MediasFactory(cleanedArrayMedia);
	showTotalLikes();
	svgHeart.forEach((heart) => (heart.onclick = addOrSubOne));
	svgHeart.forEach((heart) =>
		heart.addEventListener('keydown', (event) => {
			if (event.key === 'Enter') {
				addOrSubOne(event);
			}
		}),
	);
	closeDropdown();
	buildLightBox();
	let itemsMedia = document.querySelectorAll('.photo');
	itemsMedia[0].firstElementChild.focus();
};
