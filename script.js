/* ==========================================================================
   Shaarukesh G V Portfolio - Interactive JavaScript Engine
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    initCanvasAnimation();
    initTypingEffect();
    initSkillFilter();
    initCounterAnimation();
    initContactForm();
    initMobileNav();
    initScrollSpy();
    initThemeToggle();
});

/* --------------------------------------------------
   1. Interactive Node Particle Animation
   -------------------------------------------------- */
function initCanvasAnimation() {
    const canvas = document.getElementById('bg-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
    });

    const particles = [];
    const particleCount = Math.min(Math.floor(width / 18), 70);

    for (let i = 0; i < particleCount; i++) {
        particles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            radius: Math.random() * 2 + 1
        });
    }

    function animate() {
        ctx.clearRect(0, 0, width, height);

        const isDark = document.body.classList.contains('dark-theme');
        const connectionColor = isDark ? '0, 242, 254' : '79, 172, 254';

        for (let i = 0; i < particles.length; i++) {
            let p = particles[i];

            p.x += p.vx;
            p.y += p.vy;

            if (p.x < 0 || p.x > width) p.vx *= -1;
            if (p.y < 0 || p.y > height) p.vy *= -1;

            ctx.beginPath();
            ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${connectionColor}, 0.3)`;
            ctx.fill();

            for (let j = i + 1; j < particles.length; j++) {
                let p2 = particles[j];
                let dist = Math.hypot(p.x - p2.x, p.y - p2.y);

                if (dist < 130) {
                    ctx.beginPath();
                    ctx.moveTo(p.x, p.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.strokeStyle = `rgba(${connectionColor}, ${1 - dist / 130 * 0.7})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        requestAnimationFrame(animate);
    }

    animate();
}

/* --------------------------------------------------
   2. Typing Effect (Target Roles)
   -------------------------------------------------- */
function initTypingEffect() {
    const target = document.getElementById('typing-text');
    if (!target) return;

    const phrases = [
        'Machine Learning Engineering',
        'Data Analytics & BI Reporting',
        'Data Engineering & ETL Pipelines',
        'Full-Stack Software Development'
    ];

    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;

    function type() {
        const currentPhrase = phrases[phraseIdx];

        if (isDeleting) {
            target.textContent = currentPhrase.substring(0, charIdx - 1);
            charIdx--;
        } else {
            target.textContent = currentPhrase.substring(0, charIdx + 1);
            charIdx++;
        }

        let speed = isDeleting ? 30 : 70;

        if (!isDeleting && charIdx === currentPhrase.length) {
            speed = 2200; // Pause at completion
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            phraseIdx = (phraseIdx + 1) % phrases.length;
            speed = 400;
        }

        setTimeout(type, speed);
    }

    type();
}

/* --------------------------------------------------
   3. Interactive Skill Tabs Filtering
   -------------------------------------------------- */
function initSkillFilter() {
    const tabs = document.querySelectorAll('.tab-btn');
    const categories = document.querySelectorAll('.skill-category');

    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');

            const filter = tab.getAttribute('data-filter');

            categories.forEach(cat => {
                if (filter === 'all' || cat.getAttribute('data-category') === filter) {
                    cat.style.display = 'block';
                    cat.style.animation = 'fadeIn 0.5s ease forwards';
                } else {
                    cat.style.display = 'none';
                }
            });
        });
    });
}

/* --------------------------------------------------
   4. Stat Counter Numbers Animation
   -------------------------------------------------- */
function initCounterAnimation() {
    const statCards = document.querySelectorAll('.stat-number');
    let animated = false;

    function checkScroll() {
        if (animated || !statCards.length) return;

        const rect = statCards[0].getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom >= 0) {
            animated = true;

            statCards.forEach(card => {
                const text = card.textContent;
                const hasPlus = text.includes('+');
                const targetVal = parseFloat(text.replace('+', ''));
                const isFloat = targetVal % 1 !== 0;
                let current = 0;
                const increment = targetVal / 40;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= targetVal) {
                        card.textContent = (isFloat ? targetVal.toFixed(1) : Math.floor(targetVal)) + (hasPlus ? '+' : '');
                        clearInterval(timer);
                    } else {
                        card.textContent = (isFloat ? current.toFixed(1) : Math.floor(current)) + (hasPlus ? '+' : '');
                    }
                }, 30);
            });
        }
    }

    window.addEventListener('scroll', checkScroll);
    checkScroll();
}

/* --------------------------------------------------
   5. Interactive Theme Toggle (Dark / Light Mode)
   -------------------------------------------------- */
function initThemeToggle() {
    const btn = document.getElementById('theme-toggle');
    if (!btn) return;

    btn.addEventListener('click', () => {
        const body = document.body;
        if (body.classList.contains('dark-theme')) {
            body.classList.remove('dark-theme');
            body.classList.add('light-theme');
            btn.innerHTML = '<i class="fa-solid fa-sun"></i>';
        } else {
            body.classList.remove('light-theme');
            body.classList.add('dark-theme');
            btn.innerHTML = '<i class="fa-solid fa-moon"></i>';
        }
    });
}

/* --------------------------------------------------
   6. Contact Form Simulation
   -------------------------------------------------- */
function initContactForm() {
    const form = document.getElementById('portfolio-contact-form');
    const status = document.getElementById('form-status');

    if (!form) return;

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        status.className = 'form-status';
        status.textContent = 'Encrypting & Sending Message...';

        setTimeout(() => {
            status.className = 'form-status success';
            status.innerHTML = '<i class="fa-solid fa-circle-check"></i> Success! Your message has been sent successfully to Shaarukesh G V.';
            form.reset();
        }, 1100);
    });
}

/* --------------------------------------------------
   7. Navigation Active Highlighting & Mobile Toggle
   -------------------------------------------------- */
function initMobileNav() {
    const toggle = document.getElementById('mobile-toggle');
    const navLinks = document.getElementById('nav-links');

    if (toggle && navLinks) {
        toggle.addEventListener('click', () => {
            const isVisible = navLinks.classList.contains('mobile-visible');
            if (isVisible) {
                navLinks.classList.remove('mobile-visible');
                navLinks.style.display = 'none';
            } else {
                navLinks.classList.add('mobile-visible');
                navLinks.style.display = 'flex';
                navLinks.style.flexDirection = 'column';
                navLinks.style.position = 'absolute';
                navLinks.style.top = '100%';
                navLinks.style.left = '0';
                navLinks.style.width = '100%';
                navLinks.style.background = 'var(--bg-dark)';
                navLinks.style.padding = '1.5rem';
                navLinks.style.borderBottom = '1px solid var(--border-color)';
            }
        });
    }
}

/* ScrollSpy logic to highlight active link */
function initScrollSpy() {
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.nav-item');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 180;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });

        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    });
}
