import * as header from './photographer-page/header.js';
import * as formulary from './photographer-page/form.js';
import * as factory from './photographer-page/factory.js';
import * as counterlike from './photographer-page/counterLike.js';
import * as select from './photographer-page/sort.js';
import * as lightbox from './photographer-page/lightbox.js';
import * as sort from './photographer-page/sort.js';

//**** VARIABLES ********/
//Header Variable
header.dataLocalParse;
header.id;
header.photographerSelect;
header.buttonOpen;

//Form Variable

const firstName = document.querySelector('#first');
const nameForm = document.querySelector('#form-photographer-name');
let namePhotographer = `<h3>${header.photographerSelect.name}</h3>`;
nameForm.innerHTML = `${header.photographerSelect.name}`;

//Factory
// let arrayDataLocal = [];

//*****************  PHOTOGRAPH HEADER **************************/

header.displayPhotographerHeader();

//****************************** FORM ******************************/

// buttonOpen.onkeydown = function (event) {
// 	console.log(event.keyValue);
// };

//******************* FACTORY PATTERN FOR DIFFERENTS MEDIAS **************************/

// let arrayVideo = [];
//Factory
factory.cleanedDataMedia();
// factory.MediasFactory(factory.cleanedArrayMedia);
factory.factory(factory.cleanedArrayMedia);

//************************** COUNTER LIKE  ************************/

counterlike.showTotalLikes();
counterlike.checkButtonCounterClass();

factory.svgHeart.forEach((heart) =>
	heart.addEventListener('click', (event) => {
		counterlike.addOrSubOne(event);
	}),
);

factory.svgHeart.forEach((heart) =>
	heart.addEventListener('keydown', (event) => {
		const nomTouche = event.key;

		if (nomTouche === 'Enter') {
			counterlike.addOrSubOne(event);
		}
	}),
);

//*************************** BUTTON SORT MEDIAS **********************************/

select.chevronDown.addEventListener('click', select.buttonPopularity);
select.chevronUp.addEventListener('click', select.buttonPopularity);
select.dropdownButton.addEventListener('focus', select.openDropdown);
select.buttonTittle.onblur = function () {
	select.closeDropdown();
};

//*************************** LIGHTBOX ************************/

//********* SORT MEDIAS   *********************/

// ****************** Sort by Popularity

document.querySelector('#button-popularity').addEventListener('click', sort.sortByPopularity);
document.querySelector('#button-popularity').addEventListener('keydown', (event) => {
	if (event.key === 'Enter') {
		sort.sortByPopularity();
	}
});

// ******************* Sort by Date  ************************/
document.querySelector('#button-date').addEventListener('click', sort.sortByDate);
document.querySelector('#button-date').addEventListener('keydown', (event) => {
	if (event.key === 'Enter') {
		sort.sortByDate();
	}
});

//************************ Sort by title ******************/
document.querySelector('#button-title').addEventListener('click', sort.sortByTitle);
document.querySelector('#button-title').addEventListener('keydown', (event) => {
	if (event.key === 'Enter') {
		sort.sortByTitle();
	}
});

window.onload = () => {
	//Form

	const buttonClose = document.getElementById('close');
	const buttonOpen = document.querySelector('.button-form');
	buttonOpen.addEventListener('click', formulary.launchForm);
	buttonOpen.addEventListener('click', formulary.focusMethod);
	buttonClose.addEventListener('click', formulary.closeForm);
	form.onsubmit = function () {
		event.preventDefault();
		console.log(document.querySelector('#first').value);
		console.log(document.querySelector('#last').value);
		console.log(document.querySelector('#email').value);
	};

	lightbox.buildLightBox();
};
