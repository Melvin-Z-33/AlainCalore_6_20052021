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
		})
		.catch((err) => console.log('this is the error ' + err));
};
research();
