document.addEventListener("DOMContentLoaded", function () {
    // ✅ Set Current Year
    const date = document.getElementById("date");
    if (date) date.textContent = new Date().getFullYear();

    // ✅ Hamburger Menu Toggle
    const hamburger = document.querySelector(".hamburger");
    const navList = document.querySelector(".nav-list");
    const socials = document.querySelector(".social-nav");
    const navLinks = document.querySelectorAll(".nav-links");

    const categories = document.querySelectorAll(".skill-category");

    // ✅ Expand/Collapse Skill Sections
    const skillHeaders = document.querySelectorAll(".skill-header");

    skillHeaders.forEach(header => {
        header.addEventListener("click", function () {
            const category = this.parentElement;
            const content = category.querySelector(".skill-content");

            // Toggle active class
            category.classList.toggle("active");

            // Collapse all other categories
            document.querySelectorAll(".skill-category").forEach(otherCategory => {
                if (otherCategory !== category) {
                    otherCategory.classList.remove("active");
                    otherCategory.querySelector(".skill-content").style.display = "none";
                }
            });

            // Toggle visibility
            if (category.classList.contains("active")) {
                content.style.display = "block";
            } else {
                content.style.display = "none";
            }
        });
    });

    // ✅ Mobile Menu Toggle
    if (hamburger && navList && socials) {
        const toggleMobileMenu = () => {
            document.body.classList.toggle("open");
            hamburger.classList.toggle("open");
            navList.classList.toggle("open");
            socials.classList.toggle("open");
        };

        navLinks.forEach((link) => link.addEventListener("click", toggleMobileMenu));
        hamburger.addEventListener("click", toggleMobileMenu);
    }

    // ✅ Initialize Particles.js
    if (typeof particlesJS !== "undefined") {
        try {
            particlesJS.load("particles-js", "particles.json", () => console.log("Particles loaded!"));
        } catch (error) {
            console.warn("Particles.js failed to load:", error);
        }
    }

    // ✅ Initialize AOS (Scroll Animation)
    if (typeof AOS !== "undefined") {
        AOS.init();
    }

    // ✅ Typing Effect for Multiple Elements
    initializeTypewriter(".typewriter", 120, 60, 500, 0.1); // Fast typing for .typewriter
    initializeTypewriter(".typewriter-2", 170, 100, 200, 0.1); // Slower typing for .typewriter-2
});

// ✅ Typing Effect Function
function initializeTypewriter(selector, typingSpeed, backspaceSpeed, delayBeforeTyping, colorFrequency) {
    const typewriterElements = document.querySelectorAll(selector);

    typewriterElements.forEach((element) => {
        const texts = element.getAttribute("data-texts")?.split(",").map(text => text.trim()) || [];
        if (texts.length === 0) return; // Exit if no texts are provided

        let textIndex = 0;
        let index = 0;
        let isDeleting = false;

        // Function to generate a random color
        const getRandomColor = () => {
            return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
        };

        const type = () => {
            if (!isDeleting) {
                if (index < texts[textIndex].length) {
                    const letter = texts[textIndex].charAt(index);
                    const span = document.createElement("span");

                    span.textContent = letter === " " ? "\u00A0" : letter; // Handle spaces
                    if (Math.random() < colorFrequency) {
                        span.style.color = getRandomColor();
                    }
                    element.appendChild(span);
                    index++;
                    setTimeout(type, typingSpeed);
                } else {
                    setTimeout(() => {
                        isDeleting = true;
                        type();
                    }, 1000); // Pause before deleting
                }
            } else {
                if (element.children.length > 0) {
                    element.removeChild(element.lastChild);
                    setTimeout(type, backspaceSpeed);
                } else {
                    isDeleting = false;
                    index = 0;
                    textIndex = (textIndex + 1) % texts.length;
                    setTimeout(type, 500); // Pause before typing next text
                }
            }
        };

        // Start typing after delay
        setTimeout(type, delayBeforeTyping);
    });
}
