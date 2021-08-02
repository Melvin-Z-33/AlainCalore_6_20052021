import * as header from './header.js';
import * as factory from './factory.js';

export const buildLightBox = () => {
	let previewBox = document.querySelector('#lightbox'),
		previewImg = previewBox.querySelector('img'),
		previewVideo = previewBox.querySelector('video'),
		closeIcon = previewBox.querySelector('.icon'),
		currentImg = previewBox.querySelector('.current-img'),
		totalImg = previewBox.querySelector('.total-img'),
		lightboxTitle = previewBox.querySelector('#lightbox-title'),
		shadow = document.querySelector('.shadow');

	let galleryNew = document.querySelectorAll('.photo');
	let empty = '';

	for (let i = 0; i < galleryNew.length; i++) {
		totalImg.textContent = galleryNew.length;
		let newIndex = i;
		let clickedImgIndex;

		const openLightBox = () => {
			function lightbox() {
				document.querySelector('body').style.overflow = 'hidden';
				previewBox.classList.add('show');
				shadow.style.display = 'block';
				header.bouttonOpen.style.display = 'none';

				if (!galleryNew[i].firstElementChild.src.split('.')[4].search('mp4')) {
					lightboxTitle.innnerHTML = '';
					let videoURL = galleryNew[i].firstElementChild.src;
					previewVideo.src = videoURL;
					previewImg.src = '';
					previewImg.style.display = 'none';
					previewVideo.style.display = 'block';
					lightboxTitle.innerHTML = '';
					lightboxTitle.insertAdjacentHTML(
						'afterbegin',
						`${cleanedArrayMedia[newIndex].title}`,
					);
				} else if (!galleryNew[i].firstElementChild.src.split('.')[4].search('jpg')) {
					lightboxTitle.insertAdjacentHTML('afterbegin', empty);
					let imageURL = galleryNew[i].firstElementChild.src;
					previewImg.src = imageURL;
					previewVideo.src = '';
					previewVideo.style.display = 'none';
					previewImg.style.display = 'block';
					lightboxTitle.innerHTML = '';
					lightboxTitle.insertAdjacentHTML(
						'afterbegin',
						`${factory.cleanedArrayMedia[newIndex].title}`,
					);
				}
				currentImg.textContent = newIndex + 1;
			}
			lightbox();

			const prevBtn = document.querySelector('.prev');
			const nextBtn = document.querySelector('.next');
			if (newIndex == 0) {
				prevBtn.style.display = 'none';
			}
			if (newIndex >= galleryNew.length - 1) {
				nextBtn.style.display = 'none';
			}

			const goPreviousImage = () => {
				newIndex--;
				if (newIndex == 0) {
					lightbox(i--);
					prevBtn.style.display = 'none';
				} else {
					lightbox(i--);
					nextBtn.style.display = 'block';
				}
			};

			const goNextImage = () => {
				newIndex++;
				if (newIndex >= galleryNew.length - 1) {
					lightbox(i++);
					nextBtn.style.display = 'none';
				} else {
					lightbox(i++);
					prevBtn.style.display = 'block';
				}
			};
			prevBtn.addEventListener('click', goPreviousImage);
			nextBtn.addEventListener('click', goNextImage);

			const closeLightbox = () => {
				newIndex = clickedImgIndex;
				prevBtn.style.display = 'block';
				nextBtn.style.display = 'block';
				previewBox.classList.remove('show');
				shadow.style.display = 'none';
				document.querySelector('body').style.overflow = 'scroll';
				header.bouttonOpen.style.display = 'block';
			};
			closeIcon.addEventListener('click', closeLightbox);

			if (previewBox.classList.contains('show')) {
				document.addEventListener('keydown', (event) => {
					const nomTouche = event.key;

					switch (nomTouche) {
						case 'ArrowRight':
							goNextImage();
							break;
						case 'ArrowLeft':
							goPreviousImage();
							break;
						case 'Escape':
							closeLightbox();
							break;
						case 'Enter':
							console.log('Enter no problem');
							break;
						case 'Tab':
							console.log('Tab no problem');
							break;
						default:
							console.log('problem with keyboard');
					}
				});
			}
		};

		galleryNew[i].onclick = () => {
			clickedImgIndex = i;
			openLightBox();
		};

		galleryNew[i].onkeydown = (event) => {
			clickedImgIndex = i;
			if (event.key === 'Enter') {
				openLightBox();
				document.querySelector('.fa-angle-right').focus();
			}
		};
	}
};
