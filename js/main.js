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
let photographers;
const test = document.getElementById('test');

//Store data

let dataLocalParse;

const fetchPhotographers = async () => {
	photographers = await fetch(url)
		.then((res) => res.json())
		.then((value) => {
			console.log(value.photographers);
			let counter = 1;

			let affichage = `<div id="title">Nos photographes</div>`;
			let da = [``];
			for (let photographer of value.photographers) {
				for (tags of photographer.tags) {
					da.push(`<button>#${tags}</button> `);
					console.log(da);

					affichage += `
				
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
					<div class="card-content-tag">${da.join('')}</div>
				</div>
				`;
				}
				counter += 1;
				da = [``];
			}

			affichage += '';
			document.querySelector('#main').innerHTML = affichage;
		})

		.catch((err) => console.log('this is the error ' + err));
};

const storeDataLocal = async () => {
	photographers = await fetch(url)
		.then((res) => res.json())
		.then((value) => {
			sessionStorage.dataLocal = JSON.stringify(value);
			dataLocalParse = JSON.parse(sessionStorage.dataLocal);
			console.log(sessionStorage.datalocal);
		})
		.then(fetchPhotographers())
		.then(() => {
			for (const element in dataLocalParse.medias) {
				console.log(element);
			}
		});
};

storeDataLocal();
// d1.insertAdjacentHTML('afterend', `<div>#${element}</div>`);

// ``let d1 = document.querySelector('#main');
// d1.insertAdjacentHTML('afterend', `<div>#${element}</div>`);
// console.log(element.tags);``
