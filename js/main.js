//Sticky button
window.addEventListener('scroll', function () {
	let context = document.getElementById('context');
	if (window.scrollY > 0) {
		context.style.display = 'block';
	} else {
		context.style.display = 'none';
	}
});

// Request Api

let url = './FishEyeData.json';
let photographers;
const test = document.getElementById('test');

const fetchPhotographers = async () => {
	photographers = await fetch(url)
		.then((res) => res.json())
		.then((value) => {
			console.log(value.photographers);
			let counter = 1;

			let affichage = `<div id="title">Nos photographes</div>`;

			for (let photographer of value.photographers) {
				affichage += `
				
				<div class="cards" id="card-${counter}">
					<div class=card-header>
						<a href="photographer-page.html?${photographer.id}"><img src="/img/Sample_Photos/Photographers_thumbnails/${photographer.portrait}" loading="lazy" alt="" /></a>
						<h2 class="card-title">${photographer.name} </h2>
					</div>
					<div class="card-content">
						<p class="card-content-city"> ${photographer.city}, ${photographer.country} </p>
						<p class="card-content-tagline"> ${photographer.tagline} </p>
						<p class="card-content-price"> ${photographer.price}€/jour </p>
					</div>
					<div class="card-content-tag">${photographer.tags}</div>
				</div>
				`;
				counter += 1;
				// document.querySelector(
				// 	'#main',
				// ).innerHTML = `<div id="title">Nos photographes</div>`;
			}
			affichage += '';
			document.querySelector('#main').innerHTML = affichage;
		})
		.catch((err) => console.log('this is the error ' + err));
};

fetchPhotographers();
