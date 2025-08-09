// Typing Animation
const lines = [
    "🚀 Turning Code into Impact",
    "👋 I'm Abhishek."
];
const speed = 70;

let i = 0, j = 0;
let currentLine = 0;

function typeLine() {
    const h1 = document.querySelector("h1");
    const h2 = document.querySelector("h2");

    if (currentLine === 0) {
        if (i < lines[0].length) {
            h1.innerHTML += lines[0].charAt(i);
            i++;
            setTimeout(typeLine, speed);
        } else {
            currentLine++;
            setTimeout(typeLine, 500);
        }
    } else if (currentLine === 1) {
        if (j < lines[1].length) {
            h2.innerHTML += lines[1].charAt(j);
            j++;
            setTimeout(typeLine, speed);
        }
    }
}

// Navigation Highlighting
const navLinks = document.querySelectorAll(".nav-link");
const sections = document.querySelectorAll(".section");

window.addEventListener("scroll", () => {
    let scrollY = window.scrollY;
    sections.forEach((sec) => {
        const sectionTop = sec.offsetTop - 100;
        const sectionId = sec.getAttribute("id");
        if (scrollY >= sectionTop) {
            navLinks.forEach((link) => {
                link.classList.remove("active");
                if (link.dataset.target === sectionId) {
                    link.classList.add("active");
                }
            });
        }
    });
    
    // Show footer when scrolled to bottom
    const footer = document.getElementById('custom-footer');
    if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - 100) {
        footer.classList.add('show');
    } else {
        footer.classList.remove('show');
    }
});

// Email Slide Effect
document.querySelectorAll('.email-slide').forEach(slide => {
    const reveal = slide.querySelector('.email-reveal');
    const offset = slide.getAttribute('data-offset') || 90;
    reveal.style.left = `${offset}px`;

    slide.addEventListener('mouseenter', () => {
        reveal.classList.add('show');
    });

    slide.addEventListener('mouseleave', () => {
        void reveal.offsetWidth;
        reveal.classList.remove('show');
    });
});

// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// Check for saved theme preference or use preferred color scheme
const savedTheme = localStorage.getItem('theme') || 
                   (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

if (savedTheme === 'dark') {
    body.classList.add('dark-mode');
    themeToggle.checked = true;
}

themeToggle.addEventListener('change', () => {
    if (themeToggle.checked) {
        body.classList.add('dark-mode');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-mode');
        localStorage.setItem('theme', 'light');
    }
});

// Initialize on load
window.onload = () => {
    document.querySelector("h1").innerHTML = "";
    document.querySelector("h2").innerHTML = "";
    typeLine();
};