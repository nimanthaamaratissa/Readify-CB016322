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

// Books database
const books = [
    { title: "The Dragon's Path", author: "Daniel Abraham", genre: "fantasy", pages: 310, length: "medium", description: "A merchant family caught in a dangerous fantasy conflict.", rating: 4.5 },
    { title: "Brave New World", author: "Aldous Huxley", genre: "fiction", pages: 328, length: "medium", description: "A society shaped by control and conditioning.", rating: 4.2 },
    { title: "Hyperion", author: "Dan Simmons", genre: "sci-fi", pages: 688, length: "long", description: "A group of travelers journey to a mysterious world.", rating: 4.8 },
    { title: "The Hound of the Baskervilles", author: "Arthur Conan Doyle", genre: "mystery", pages: 256, length: "medium", description: "A detective investigates a deadly legend.", rating: 4.3 },
    { title: "Outlander", author: "Diana Gabaldon", genre: "romance", pages: 279, length: "medium", description: "A romance that spans time and history.", rating: 4.6 },
    { title: "Lord of the Flies", author: "William Golding", genre: "fiction", pages: 112, length: "short", description: "A group of boys struggle for power on an island.", rating: 4.1 },
    { title: "Of Mice and Men", author: "John Steinbeck", genre: "fiction", pages: 180, length: "short", description: "A story of friendship and shattered dreams.", rating: 4.4 },
    { title: "The Name of the Wind", author: "Patrick Rothfuss", genre: "fantasy", pages: 223, length: "medium", description: "The early life of a legendary magician.", rating: 4.7 },
    { title: "Neuromancer", author: "William Gibson", genre: "sci-fi", pages: 255, length: "medium", description: "A hacker is pulled into a high-tech conspiracy.", rating: 4.0 }
];

let current = null;

const recommendBtn = document.getElementById('recommendBtn');
if (recommendBtn) {
    recommendBtn.addEventListener('click', getRecommendation);
}

const pickAgainBtn = document.getElementById('pickAgainBtn');
if (pickAgainBtn) {
    pickAgainBtn.addEventListener('click', getRecommendation);
}

function getRecommendation() {
    const genreSelect = document.getElementById('genreSelect');
    const lengthSelect = document.getElementById('lengthSelect');
    
    if (!genreSelect || !lengthSelect) return;
    
    const genre = genreSelect.value;
    const length = lengthSelect.value;
    
    let filtered = books.filter(b => 
        (!genre || b.genre === genre) && 
        (!length || b.length === length)
    );
    
    if (!filtered.length) {
        alert('No books found. Try different filters!');
        return;
    }
    
    current = filtered[Math.floor(Math.random() * filtered.length)];
    displayRecommendation(current);
}

function displayRecommendation(book) {
    const cover = document.getElementById('bookCover');
    const title = document.getElementById('bookTitle');
    const author = document.getElementById('bookAuthor');
    const genre = document.getElementById('bookGenre');
    const pages = document.getElementById('bookPages');
    const rating = document.getElementById('bookRating');
    const desc = document.getElementById('bookDescription');
    const section = document.getElementById('recommendationSection');
    const pickAgain = document.getElementById('pickAgainBtn');
    
    if (cover) cover.textContent = book.title;
    if (title) title.textContent = book.title;
    if (author) author.textContent = `by ${book.author}`;
    if (genre) genre.textContent = `Genre: ${book.genre}`;
    if (pages) pages.textContent = `Pages: ${book.pages}`;
    if (rating) rating.textContent = `${book.rating}/5 like Ratings`;
    if (desc) desc.textContent = book.description;
    if (section) section.style.display = 'block';
    if (pickAgain) pickAgain.style.display = 'block';
}

// Save to reading list
const saveToListBtn = document.getElementById('saveToListBtn');
if (saveToListBtn) {
    saveToListBtn.addEventListener('click', () => {
        if (!current) return;
        
        let list = JSON.parse(localStorage.getItem('readingList') || '[]');
        const exists = list.some(b => b.title === current.title);
        
        const msg = document.getElementById('saveMessage');
        if (!msg) return;
        
        if (exists) {
            msg.textContent = 'Already in your reading list!';
            msg.style.color = '#e67e22';
        } else {
            list.push(current);
            localStorage.setItem('readingList', JSON.stringify(list));
            msg.textContent = 'Added to your reading list!';
            msg.style.color = '#27ae60';
            displayReadingList();
        }
        
        setTimeout(() => msg.textContent = '', 3000);
    });
}

// Display reading list
function displayReadingList() {
    const list = document.getElementById('readingList');
    const items = JSON.parse(localStorage.getItem('readingList') || '[]');
    
    if (!list) return;
    
    if (items.length === 0) {
        list.innerHTML = '<p>Your reading list is empty.</p>';
        return;
    }
    
    list.innerHTML = items.map((b, i) => `
        <div class="reading-list-item">
            <div>
                <h4>${b.title}</h4>
                <p>by ${b.author} - ${b.genre} - ${b.pages} pages</p>
            </div>
            <button onclick="removeFromList(${i})">Remove</button>
        </div>
    `).join('');
}

function removeFromList(index) {
    let list = JSON.parse(localStorage.getItem('readingList') || '[]');
    list.splice(index, 1);
    localStorage.setItem('readingList', JSON.stringify(list));
    displayReadingList();
}

displayReadingList();
