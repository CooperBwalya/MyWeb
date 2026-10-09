document.addEventListener('DOMContentLoaded', () => {

    // 1. Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');

    if (mobileMenuBtn && navMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            navMenu.classList.toggle('active');
        });

        // Close menu when clicking links on mobile
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
            });
        });
    }

    // 2. Dark Mode Switcher
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
        if (localStorage.getItem('theme') === 'dark') {
            document.body.classList.add('dark-theme');
        }

        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-theme');
            const isDark = document.body.classList.contains('dark-theme');
            localStorage.setItem('theme', isDark ? 'dark' : 'light');
            
            const icon = themeBtn.querySelector('i');
            if (icon) {
                icon.className = isDark ? 'fa-solid fa-sun' : 'fa-solid fa-moon';
            }
        });
    }

    // 3. Project Search Filter
    const searchInput = document.getElementById('project-search');
    const projectCards = document.querySelectorAll('.project-card');
    const noProjectsMsg = document.getElementById('no-projects-msg');

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            const query = e.target.value.toLowerCase().trim();
            let visibleCount = 0;

            projectCards.forEach(card => {
                const text = card.textContent.toLowerCase();
                if (text.includes(query)) {
                    card.style.display = 'block';
                    visibleCount++;
                } else {
                    card.style.display = 'none';
                }
            });

            if (noProjectsMsg) {
                noProjectsMsg.style.display = visibleCount === 0 ? 'block' : 'none';
            }
        });
    }

    // 4. Study Hours Calculator
    const calcBtn = document.getElementById('calc-btn');
    const calcOutput = document.getElementById('calc-output');

    if (calcBtn) {
        calcBtn.addEventListener('click', () => {
            const hours = parseFloat(document.getElementById('daily-hours').value);
            const days = parseInt(document.getElementById('weekly-days').value);

            if (isNaN(hours) || isNaN(days) || hours < 0 || days < 1 || days > 7) {
                calcOutput.style.color = '#ef4444';
                calcOutput.textContent = 'Error: Enter valid positive hours and days (1-7).';
            } else {
                const total = (hours * days).toFixed(1);
                calcOutput.style.color = '#10b981';
                calcOutput.innerHTML = `Total Planned Weekly Study: <strong>${total} hours</strong>.`;
            }
        });
    }

    // 5. Contact Form Validation
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', (event) => {
            event.preventDefault();

            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            const feedback = document.getElementById('form-feedback');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

            if (name === '' || message === '' || !emailRegex.test(email)) {
                feedback.style.display = 'block';
                feedback.style.backgroundColor = '#fee2e2';
                feedback.style.color = '#991b1b';
                feedback.textContent = 'Error: Please fill in all fields correctly.';
                return;
            }

            feedback.style.display = 'block';
            feedback.style.backgroundColor = '#dcfce7';
            feedback.style.color = '#15803d';
            feedback.innerHTML = `
                <h4>Form Validated!</h4>
                <p>Browser demonstration only — no message sent.</p>
                <p><strong>Name:</strong> ${name}</p>
                <p><strong>Email:</strong> ${email}</p>
            `;
            contactForm.reset();
        });
    }
});
console.log("JavaScript is successfully connected!");