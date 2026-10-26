
// =========================
// SMOOTH SCROLLING
// =========================

document.querySelectorAll('a[href^="#"]').forEach(link => {

    link.addEventListener("click", function (e) {

        const targetId = this.getAttribute("href");

        if (targetId === "#") return;

        const targetSection = document.querySelector(targetId);

        if (targetSection) {

            e.preventDefault();

            const reducedMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

            targetSection.scrollIntoView({
                behavior: reducedMotion ? "auto" : "smooth",
                block: "start"
            });

        }

    });

});


// =========================
// STICKY HEADER EFFECT
// =========================

const header = document.querySelector("header");

function updateHeader() {

    if (!header) return;

    header.classList.toggle(
        "scrolled",
        window.scrollY > 50
    );

}

window.addEventListener("scroll", updateHeader, {
    passive: true
});

updateHeader();


// =========================
// FADE-IN SCROLL ANIMATION
// =========================

const animatedElements = document.querySelectorAll(
    ".experience-card, .project-card, .education-box, .about-grid, .skills-list"
);

const reducedMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
).matches;

if ("IntersectionObserver" in window && !reducedMotion) {

    const observer = new IntersectionObserver(

        entries => {

            entries.forEach(entry => {

                if (entry.isIntersecting) {

                    entry.target.classList.add("show");

                    observer.unobserve(entry.target);

                }

            });

        },

        {
            threshold: 0.1
        }

    );

    animatedElements.forEach(element => {

        element.classList.add("reveal-on-scroll");

        observer.observe(element);

    });

}


// =========================
// ACTIVE NAVIGATION
// =========================

const sections = document.querySelectorAll("section[id]");
const navLinks = document.querySelectorAll(".nav-links a");

function updateActiveNavigation() {

    let currentSection = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop;

        if (window.scrollY >= sectionTop - 200) {

            currentSection = section.getAttribute("id");

        }

    });

    navLinks.forEach(link => {

        const href = link.getAttribute("href");

        link.classList.toggle(
            "active",
            href === "#" + currentSection
        );

    });

}

window.addEventListener("scroll", updateActiveNavigation, {
    passive: true
});

updateActiveNavigation();


// =========================
// PROFILE IMAGE CHECK
// =========================

const profileImage = document.querySelector(".hero-image img");

if (profileImage) {

    profileImage.addEventListener("error", () => {

        console.warn(
            "Profile picture could not load. Verify profile.jpg exists in the same folder as index.html."
        );

    });

}


// =========================
// CURRENT YEAR
// =========================

const yearElement = document.getElementById("year");

if (yearElement) {

    yearElement.textContent = new Date().getFullYear();

}


// =========================
// CONSOLE MESSAGE
// =========================

console.log("Daniel Sherry Portfolio loaded successfully.");
