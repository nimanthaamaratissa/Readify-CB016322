// Hamburger menu
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

// Simple books list
const books = [
    { id: 1, title: "The Dragon's Path", author: "Daniel Abraham", genre: "fantasy", cover: "images/The Dragon's Path.png", rating: 4.5 },
    { id: 2, title: "Brave New World", author: "Aldous Huxley", genre: "fiction", cover: "images/Brave New World.png", rating: 4.2 },
    { id: 3, title: "Hyperion", author: "Dan Simmons", genre: "sci-fi", cover: "images/Hyperion.png", rating: 4.8 },
    { id: 4, title: "The Hound of the Baskervilles", author: "Arthur Conan Doyle", genre: "mystery", cover: "images/The Hound of the Baskervilles.png", rating: 4.3 },
    { id: 5, title: "Outlander", author: "Diana Gabaldon", genre: "romance", cover: "images/Outlander.png", rating: 4.6 },
    { id: 6, title: "The Name of the Wind", author: "Patrick Rothfuss", genre: "fantasy", cover: "images/The Name of the Wind.png", rating: 4.7 }
];

// Display books
function displayBooks(booksToShow) {
    const grid = document.getElementById('booksGrid');
    if (!grid) return;
    
    grid.innerHTML = booksToShow.map(book => `
        <div class="book-card">
            <img src="${book.cover}" alt="${book.title}">
            <h3>${book.title}</h3>
            <p>by ${book.author}</p>
            <p class="rating">${book.rating}/5 Ratings</p>
        </div>
    `).join('');
}

// Search and filter
function filterBooks() {
    const searchInput = document.getElementById('searchInput');
    const genreFilter = document.getElementById('genreFilter');
    
    if (!searchInput || !genreFilter) return;
    
    const search = searchInput.value.toLowerCase();
    const genre = genreFilter.value;
    
    const filtered = books.filter(book => 
        (book.title.toLowerCase().includes(search) || book.author.toLowerCase().includes(search)) &&
        (genre === 'all' || book.genre === genre)
    );
    
    displayBooks(filtered);
}

const searchInput = document.getElementById('searchInput');
const genreFilter = document.getElementById('genreFilter');

if (searchInput) searchInput.addEventListener('input', filterBooks);
if (genreFilter) genreFilter.addEventListener('change', filterBooks);

displayBooks(books);
