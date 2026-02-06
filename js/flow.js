const hamburger = document.getElementById('hamburger');
if (hamburger) {
    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        document.getElementById('navMenu')?.classList.toggle('active');
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

const rainAudio = document.getElementById('rainAudio');
const rainSound = document.getElementById('rainSound');
if (rainSound) {
    rainSound.addEventListener('click', function() {
        this.classList.toggle('active');
        if (rainAudio) {
            if (this.classList.contains('active')) {
                rainAudio.play();
            } else {
                rainAudio.pause();
            }
        }
    });
}

const stopBtn = document.getElementById('stopAll');
if (stopBtn) {
    stopBtn.addEventListener('click', () => {
        if (rainSound) rainSound.classList.remove('active');
        if (rainAudio) rainAudio.pause();
    });
}

const completedForm = document.getElementById('completedForm');
if (completedForm) {
    completedForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = document.getElementById('completedTitle').value;
        const author = document.getElementById('completedAuthor').value;
        let books = JSON.parse(localStorage.getItem('completedBooks') || '[]');
        books.push({ title, author, date: new Date().toLocaleDateString() });
        localStorage.setItem('completedBooks', JSON.stringify(books));
        completedForm.reset();
        displayCompletedBooks();
    });
}

function displayCompletedBooks() {
    const list = document.getElementById('completedBooks');
    const books = JSON.parse(localStorage.getItem('completedBooks') || '[]');
    list.innerHTML = books.length ? books.map((b) => `
        <div class="completed-item">
            <h4>${b.title}</h4>
            <p>by ${b.author} - ${b.date}</p>
        </div>
    `).join('') : '<p>No completed books yet.</p>';
}

displayCompletedBooks();
