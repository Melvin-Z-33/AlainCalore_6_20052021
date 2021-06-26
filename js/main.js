//Sticky button
window.addEventListener('scroll', function () {
	let context = document.getElementById('context');
	let scrollY = document.getElementById('scrollY');

	if (window.scrollY > 0) {
		context.style.display = 'block';
		scrollY.style.display = 'block';
	} else {
		context.style.display = 'none';
		scrollY.style.display = 'none';
	}
});

// Request Api

let url = './FishEyeData.json';

const displayPhotographers = async () => {
	await fetch(url)
		.then((res) => res.json())
		.then((value) => {
			let counter = 1;
			let showCard = `<div id="title">Nos photographes</div>`;
			let arrayTags = [``];
			let tags;

			for (let photographer of value.photographers) {
				for (tags of photographer.tags) {
					arrayTags.push(`<a class="card-tag">#${tags}</a> `);
				}
				showCard += `
				<div class="cards" id="card-${counter}">
					<div class=card-header>
						<a href="photographer-page.html?id=${
							photographer.id
						}"><img src="/img/Sample_Photos/Photographers_thumbnails/${
					photographer.portrait
				}" loading="lazy" alt="" /></a>
						<h2 class="card-title">${photographer.name} </h2>
					</div>
					<div class="card-content">
						<p class="card-content-city"> ${photographer.city}, ${photographer.country} </p>
						<p class="card-content-tagline"> ${photographer.tagline} </p>
						<p class="card-content-price"> ${photographer.price}€/jour </p>
					</div>
					<div class="card-content-tag">${arrayTags.join('')}</div>
				</div>
				`;

				counter += 1;
				arrayTags = [``];
			}
			showCard += '';
			document.querySelector('#main').innerHTML = showCard;
			allTags = document.querySelectorAll('.card-content-tag');

			//filter images
			headerTags.forEach((el) =>
				el.addEventListener('click', (event) => {
					let valueElementClicked = event.target.textContent.toLowerCase();

					allTags.forEach((element) => {
						const tag = element.textContent.split(' ');

						if (tag.includes(valueElementClicked)) {
							element.closest('.cards').style.display = 'flex';
						} else {
							element.closest('.cards').style.display = 'none';
						}
					});
				}),
			);
		})
		.catch((err) => console.log('this is the error ' + err));
};
displayPhotographers();
const headerTags = document.querySelectorAll('.header-tag');
let allTags;

//Store data
let dataLocalParse;
const storeDataLocal = async () => {
	await fetch(url)
		.then((res) => res.json())
		.then((value) => {
			sessionStorage.dataLocal = JSON.stringify(value);
			dataLocalParse = JSON.parse(sessionStorage.dataLocal);
		});
};
storeDataLocal();
