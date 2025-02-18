// Set Current Year
const date = document.getElementById('date');
if (date) {
	const setCurrentYear = () => {
		const currentYear = new Date().getFullYear();
		date.textContent = currentYear;
	};
	setCurrentYear();
}

// Hamburger Menu Toggle
const hamburger = document.querySelector('.hamburger');
const navList = document.querySelector('.nav-list');
const socials = document.querySelector('.social-nav');
const navLinks = document.querySelectorAll('.nav-links');

if (hamburger && navList && socials && navLinks.length > 0) {
	const toggleMobileMenu = () => {
		hamburger.classList.toggle('open');
		navList.classList.toggle('open');
		socials.classList.toggle('open');
		document.body.classList.toggle('open');
	};

	navLinks.forEach(link => link.addEventListener('click', toggleMobileMenu));
	hamburger.addEventListener('click', toggleMobileMenu);
}

// Initialize Particles.js
document.addEventListener('DOMContentLoaded', function () {
    particlesJS.load('particles-js', 'particles.json', function () {
        console.log('Particles loaded!');
    });
});

// Initialize AOS (Scroll Animation)
if (typeof AOS !== 'undefined') {
	AOS.init();
}