// Hamburger menu toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
}

// Set active nav link
function setActiveNavLink() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        const href = link.getAttribute('href');
        if (href === currentPage || (currentPage === '' && href === 'index.html')) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

setActiveNavLink();

// Quotes
const quotes = [
    { text: "Truth is what people want to believe, not what actually happened.", author: "Daniel Abraham" },
    { text: "Facts do not cease to exist because they are ignored.", author: "Aldous Huxley" },
    { text: "Sometimes the only way to understand the past is to imagine it.", author: "Dan Simmons" },
    { text: "It is a capital mistake to theorize before one has data.", author: "Arthur Conan Doyle" },
    { text: "Once you place your fate in another's hands, you open yourself to betrayal.", author: "Diana Gabaldon" },
    { text: "Words are pale shadows of forgotten names.", author: "Patrick Rothfuss" }
];


let quoteIndex = 0;
function showQuote() {
    const quote = quotes[quoteIndex];
    const quoteText = document.getElementById('rotatingQuote');
    const quoteAuthor = document.getElementById('quoteAuthor');
    
    if (quoteText) quoteText.textContent = `"${quote.text}"`;
    if (quoteAuthor) quoteAuthor.textContent = `— ${quote.author}`;
    
    quoteIndex = (quoteIndex + 1) % quotes.length;
}

showQuote();
setInterval(showQuote, 5000);

// Author of the Day
const authors = [
    { name: "Daniel Abraham", photo: "images/Daniel Abraham.png" },
    { name: "Aldous Huxley", photo: "images/Aldous Huxley.png" },
    { name: "Dan Simmons", photo: "images/Dan Simmons.png" },
    { name: "Arthur Conan Doyle", photo: "images/Arthur Conan Doyle.png" },
    { name: "Diana Gabaldon", photo: "images/Diana Gabaldon.png" },
    { name: "Patrick Rothfuss", photo: "images/Patrick Rothfuss.png" }
];

function showAuthorOfDay() {
    const day = new Date().getDate();
    const author = authors[day % authors.length];
    const nameEl = document.getElementById('authorName');
    const photoEl = document.getElementById('authorPhoto');
    if (nameEl) nameEl.textContent = author.name;
    if (photoEl) {
        photoEl.src = author.photo;
        photoEl.alt = author.name;
    }
}

showAuthorOfDay();

// Newsletter subscription
const newsletterForm = document.getElementById('newsletterForm');
if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const msg = document.getElementById('newsletterMessage');
        if (msg) {
            msg.textContent = 'Thank you for subscribing!';
            newsletterForm.reset();
            setTimeout(() => msg.textContent = '', 3000);
        }
    });
}
