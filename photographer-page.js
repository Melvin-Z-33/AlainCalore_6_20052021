let url = 'FishEyeData.json';
let photographers;

const research = async () => {
	photographers = await fetch(url)
		.then((res) => res.json())
		.then((value) => {
			const extractIdFromUrl = window.location.search;
			const id = extractIdFromUrl.slice(1);
			const resultat = value.photographers.find((value) => value.id == id);
			console.log(resultat);
			const test = document.querySelector('.test');
			const structureProduit = `

					<div class=card-header>
						<a href="page.html?${resultat.id}"><img src="/img/Sample_Photos/Photographers_thumbnails/${resultat.portrait}" loading="lazy" alt="" /></a>
						<h2 class="card-title">${resultat.name} </h2>
					</div>
					<div class="card-content">
						<p class="card-content-city"> ${resultat.city}, ${resultat.country} </p>
						<p class="card-content-tagline"> ${resultat.tagline} </p>
						<p class="card-content-price"> ${resultat.price}€/jour </p>
					</div>
					<div class="card-content-tag">${resultat.tags}</div>
				</div>
`;

			test.innerHTML = structureProduit;
		})
		.catch((err) => console.log('this is the error ' + err));
};
research();

// FORM
// DOM Elements
const modalbg = document.querySelector('.bground');
const modalBtn = document.querySelectorAll('.cta');
const formData = document.querySelectorAll('.formData');

// launch modal event
modalBtn.forEach((btn) => btn.addEventListener('click', launchModal));

// launch modal form
function launchModal() {
	modalbg.style.display = 'block';
}

//close modal form
let modalClose = document.getElementById('close');

const closeModal = () => {
	modalbg.style.display = 'none';
};
modalClose.addEventListener('click', closeModal);
