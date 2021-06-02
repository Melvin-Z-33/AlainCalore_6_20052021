let url = 'FishEyeData.json';
let photographers;

const research = async () => {
	photographers = await fetch(url)
		.then((res) => res.json())
		.then((value) => {
			console.log(value.photographers);

			// extract the id from url
			const queryString_url_id = window.location.search;
			const zid = queryString_url_id.slice(1);
			console.log(zid);
			const resultat = value.photographers.find((value) => value.id == zid);
			console.log(resultat);
		})
		.catch((err) => console.log('this is the error ' + err));
};
research();
