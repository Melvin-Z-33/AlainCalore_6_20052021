import * as header from './header.js';
import * as factory from './factory.js';

export const showTotalLikes = () => {
	let arrayTotalLikes = new Number();

	for (const element of factory.buttonCounter) {
		arrayTotalLikes += parseFloat(element.innerText);

		document.querySelector('#totalLikes-price').innerHTML = `<span>${arrayTotalLikes}
				<em class="fas fa-heart"></em></span></span><span>${header.photographerSelect.price}€ /jour</span>`;
	}
};

export const checkButtonCounterClass = () => {
	for (const key in localStorage) {
		for (const element of factory.buttonCounter) {
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

export const addOrSubOne = (event) => {
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
};
