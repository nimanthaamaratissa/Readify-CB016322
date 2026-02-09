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

const feedbackForm = document.getElementById('feedbackForm');
if (feedbackForm) {
    feedbackForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const message = document.getElementById('message').value.trim();
        
        let valid = name.length >= 2 && email.includes('@') && message.length >= 10;
        if (!valid) {
            if (name.length < 2) document.getElementById('nameError').textContent = 'Name must be 2+ characters';
            if (!email.includes('@')) document.getElementById('emailError').textContent = 'Invalid email';
            if (message.length < 10) document.getElementById('messageError').textContent = 'Message must be 10+ characters';
            return;
        }
        
        let feedback = JSON.parse(localStorage.getItem('feedback') || '[]');
        feedback.push({ name, email, message, date: new Date().toLocaleDateString() });
        localStorage.setItem('feedback', JSON.stringify(feedback));
        
        const msg = document.getElementById('confirmationMessage');
        if (msg) msg.textContent = 'Thank you for your feedback!';
        feedbackForm.reset();
        displayFeedback();
        setTimeout(() => { if (msg) msg.textContent = ''; }, 3000);
    });
}

function displayFeedback() {
    const list = document.getElementById('feedbackList');
    const items = JSON.parse(localStorage.getItem('feedback') || '[]');
    list.innerHTML = items.length ? items.map((item, i) => `
        <div class="feedback-item">
            <h4>${item.name}</h4>
            <p><strong>Email:</strong> ${item.email}</p>
            <p><strong>Message:</strong> ${item.message}</p>
            <p><strong>Submitted:</strong> ${item.date}</p>
            <button onclick="deleteFeedback(${i})">Delete</button>
        </div>
    `).join('') : '<p style="color: #666;">No feedback yet.</p>';
}

function deleteFeedback(index) {
    let feedback = JSON.parse(localStorage.getItem('feedback') || '[]');
    feedback.splice(index, 1);
    localStorage.setItem('feedback', JSON.stringify(feedback));
    displayFeedback();
}

document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', function() {
        const item = this.parentElement;
        document.querySelectorAll('.faq-item').forEach(f => {
            if (f !== item) f.classList.remove('active');
        });
        item.classList.toggle('active');
    });
});

displayFeedback();
