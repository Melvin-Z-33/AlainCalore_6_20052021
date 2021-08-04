const queryString_url_id = window.location.search;
const idPhotographers = new URLSearchParams(queryString_url_id);
export const id = idPhotographers.get('id');
const datalocal = localStorage.getItem('dataLocal');
export const dataLocalParse = JSON.parse(localStorage.getItem('dataLocal'));
export const photographerSelect = dataLocalParse.photographers.find((object) => object.id == id);
export const buttonOpen = document.querySelector('.button-form');
export let bouttonOpen;
// let arrayTags = [];

export const displayPhotographerHeader = () => {
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
					<button class="button-form"  aria-label="contactez moi" tabindex="1">Contactez-moi</button>
				</div>
				<div class="user">
					<img src="/img/Sample_Photos/Photographers_thumbnails/${
						photographerSelect.portrait
					}" loading="lazy" alt="${photographerSelect.alt}" />
				</div>
			</div>
			`;
	document.querySelector('.main').insertAdjacentHTML('afterbegin', photographerHeader);

	bouttonOpen = document.querySelector('.button-form');
};
