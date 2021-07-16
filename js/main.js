//Skip button
const showSkip = () => {
	if (document.hasFocus(context)) {
		context.style.top = '1rem';
		context.style.position = 'fixed';
	}
};
context.addEventListener('focus', showSkip);
context.onblur = () => {
	context.style.position = 'absolute';
	context.style.top = '-10rem';
};

window.addEventListener('scroll', function () {
	let context = document.getElementById('context');

	if (window.scrollY > 0) {
		context.style.position = 'fixed';
		context.style.top = '1rem';
	} else {
		context.style.position = 'absolute';
		context.style.top = '-10rem';
	}
});

// Request Api
let url = './FishEyeData.json';

const displayPhotographers = async () => {
	await fetch(url)
		.then((res) => res.json())
		.then((value) => {
			let counter = 1;
			let showCard = `<h1 id="title">Nos photographes</h1><ul id='main-photographer-list'>`;
			let arrayTags = [``];
			let tags;

			for (let photographer of value.photographers) {
				for (tags of photographer.tags) {
					arrayTags.push(`<a class="card-tag" aria-label="tag">#${tags}</a> `);
				}
				showCard += `
				<li class="cards" id="card-${counter}">
					<div class=card-header>
						<a href="photographer-page.html?id=${photographer.id}" aria-label="${
					photographer.name
				}"><img src="/img/Sample_Photos/Photographers_thumbnails/${
					photographer.portrait
				}" loading="lazy" alt="photo du photographe - Page du photographe" /></a>
						<h2 class="card-title">${photographer.name} </h2>
					</div>
					<div class="card-content">
						<p class="card-content-city"> ${photographer.city}, ${photographer.country} </p>
						<p class="card-content-tagline"> ${photographer.tagline} </p>
						<p class="card-content-price"> ${photographer.price}€/jour </p>
					</div>
					<div class="card-content-tag">${arrayTags.join('')}</div>
				</li>
				`;
				counter += 1;
				arrayTags = [``];
			}
			showCard += `</ul>`;
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
			localStorage.dataLocal = JSON.stringify(value);
		});
};
storeDataLocal();

// btn.addEventListener('click', () => {
// 	localStorage.setItem(product, JSON.stringify(product));
// 	btn.classList.add('invisible');
// 	div.textContent = 'Le produit a été ajouté au panier !';
// });
