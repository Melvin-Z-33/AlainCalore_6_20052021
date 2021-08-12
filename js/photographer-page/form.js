import * as header from './header.js';
//Variables
const modalbg = document.querySelector('.bground');

//Function
export const launchForm = () => {
	modalbg.classList.toggle('block');

	modalbg.style.backgroundColor = 'rgb(255,255,255,0.7 )';
	header.bouttonOpen.style.display = 'none';
	closeWithKeyboard();
};

export const focusMethod = () => {
	document.getElementById('first').focus();
};

export const closeForm = () => {
	modalbg.classList.toggle('block');
	modalbg.style.backgroundColor = 'rgb(255,255,255,0 )';
	header.bouttonOpen.style.display = 'block';
	header.bouttonOpen.focus();
};

export const closeWithKeyboard = () => {
	document.addEventListener('keydown', (event) => {
		if (modalbg.classList.contains('block') && event.key == 'Escape') {
			closeForm();
		}
	});
};
