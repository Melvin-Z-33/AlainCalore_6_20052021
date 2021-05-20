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

let url =
	'https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeData.json';

// const json = () => {
// 	fetch(
// 		'https://s3-eu-west-1.amazonaws.com/course.oc-static.com/projects/Front-End+V2/P5+Javascript+%26+Accessibility/FishEyeData.json',
// 	)
// 		.then(function (res) {
// 			if (res.ok) {
// 				res.setHeader('Access-Control-Allow-Origin', '*');
// 				return res.json();
// 			}
// 		})
// 		.then(function (value) {
// 			res.setHeader('Access-Control-Allow-Origin', '*');
// 			console.log(value);
// 		})
// 		.catch(function (err) {
// 			console.log('voici l erreur' + err);
// 		});
// };
// const button = document.getElementById('touch');

// button.addEventListener('click', json);

// const test = () => {
// 	fetch('https://mockbin.com/reques')
// 		.then(function (res) {
// 			if (res.ok) {
// 				return res.json();
// 			}
// 		})
// 		.then(function (value) {
// 			console.log(value);
// 		})
// 		.catch(function (err) {
// 			// Une erreur est survenue
// 		});
// };

// document.getElementById('22').addEventListener('click', test);

fetch(url).then((res) => {
	res.setHeader('Access-Control-Allow-Origin', '*');
	if (res.ok) {
		console.log(res);
		res.setHeader('Access-Control-Allow-Origin', '*');
		return res.json();
		res.json().then((data) => {
			console.log('deux' + data);
		});
	} else {
		console.log('erreur');
		document.getElementById('erreur').innerHTML = 'Erreur';
	}
});

json();
