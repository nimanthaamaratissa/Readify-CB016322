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

// Tracker form
const trackerForm = document.getElementById('trackerForm');
if (trackerForm) {
    trackerForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const totalPages = parseInt(document.getElementById('totalPages').value);
        const pagesRead = parseInt(document.getElementById('pagesRead').value);
        const readingSpeed = parseInt(document.getElementById('readingSpeed').value);
        
        const percent = Math.round((pagesRead / totalPages) * 100);
        const remaining = totalPages - pagesRead;
        const days = Math.ceil(remaining / readingSpeed);
        const date = new Date(Date.now() + days * 86400000).toLocaleDateString();
        
        const percentComplete = document.getElementById('percentComplete');
        const pagesRemaining = document.getElementById('pagesRemaining');
        const daysToFinish = document.getElementById('daysToFinish');
        const finishDate = document.getElementById('finishDate');
        const progressBar = document.getElementById('progressBar');
        
        if (percentComplete) percentComplete.textContent = percent + '%';
        if (pagesRemaining) pagesRemaining.textContent = remaining;
        if (daysToFinish) daysToFinish.textContent = days;
        if (finishDate) finishDate.textContent = date;
        if (progressBar) progressBar.style.width = percent + '%';
    });
}

// Save progress
const saveProgress = document.getElementById('saveProgress');
if (saveProgress) {
    saveProgress.addEventListener('click', () => {
        const bookTitle = document.getElementById('bookTitle');
        const totalPages = document.getElementById('totalPages');
        const pagesRead = document.getElementById('pagesRead');
        const readingSpeed = document.getElementById('readingSpeed');
        const percentComplete = document.getElementById('percentComplete');
        
        if (!bookTitle || !bookTitle.value) {
            alert('Please enter a book title');
            return;
        }
        
        const data = {
            bookTitle: bookTitle.value,
            totalPages: totalPages.value,
            pagesRead: pagesRead.value,
            readingSpeed: readingSpeed.value,
            percentComplete: percentComplete.textContent,
            savedDate: new Date().toLocaleDateString()
        };
        
        let saved = JSON.parse(localStorage.getItem('readingProgress') || '[]');
        saved.push(data);
        localStorage.setItem('readingProgress', JSON.stringify(saved));
        
        const msg = document.getElementById('saveMessage');
        if (msg) {
            msg.textContent = 'Progress saved!';
            msg.style.color = '#27ae60';
            setTimeout(() => msg.textContent = '', 3000);
        }
        
        displaySavedProgress();
    });
}

// Display saved progress
function displaySavedProgress() {
    const list = document.getElementById('savedList');
    const saved = JSON.parse(localStorage.getItem('readingProgress') || '[]');
    
    if (!list) return;
    
    if (saved.length === 0) {
        list.innerHTML = '<p>No saved progress.</p>';
        return;
    }
    
    list.innerHTML = saved.map((item, i) => `
        <div class="saved-item">
            <h3>${item.bookTitle}</h3>
            <p>Progress: ${item.percentComplete}</p>
            <p>Pages: ${item.pagesRead} / ${item.totalPages}</p>
            <p>Saved: ${item.savedDate}</p>
            <button onclick="deleteProgress(${i})">Delete</button>
        </div>
    `).join('');
}

function deleteProgress(index) {
    let saved = JSON.parse(localStorage.getItem('readingProgress') || '[]');
    saved.splice(index, 1);
    localStorage.setItem('readingProgress', JSON.stringify(saved));
    displaySavedProgress();
}

displaySavedProgress();
