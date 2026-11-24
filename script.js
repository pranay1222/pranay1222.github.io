/* ═══════════════════════════════════════════════════════════
   PORTFOLIO WEBSITE — JAVASCRIPT
   Typing effect, scroll animations, counter, filters, etc.
   ═══════════════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

    // ── TYPING EFFECT ──
    const typingElement = document.getElementById('typing-text');
    const roles = [
        'Backend Software Developer',
        'Java & Spring Enthusiast',
        'Node.js & Express Engineer',
        'AI & RAG Application Builder',
        '150+ DSA Problem Solver',
        'B.Tech CSE (AI & ML) Student'
    ];
    let roleIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    const TYPING_SPEED = 80;
    const DELETING_SPEED = 40;
    const PAUSE_AFTER_TYPING = 2000;
    const PAUSE_AFTER_DELETING = 400;

    function typeWriter() {
        if (!typingElement) return;
        const currentRole = roles[roleIndex];

        if (!isDeleting) {
            typingElement.textContent = currentRole.substring(0, charIndex + 1);
            charIndex++;

            if (charIndex === currentRole.length) {
                isDeleting = true;
                setTimeout(typeWriter, PAUSE_AFTER_TYPING);
                return;
            }
            setTimeout(typeWriter, TYPING_SPEED);
        } else {
            typingElement.textContent = currentRole.substring(0, charIndex - 1);
            charIndex--;

            if (charIndex === 0) {
                isDeleting = false;
                roleIndex = (roleIndex + 1) % roles.length;
                setTimeout(typeWriter, PAUSE_AFTER_DELETING);
                return;
            }
            setTimeout(typeWriter, DELETING_SPEED);
        }
    }

    typeWriter();


    // ── NAVBAR ACTIVE STATE ON SCROLL ──
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveNav() {
        const scrollY = window.scrollY + 160;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('data-section') === sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }

    window.addEventListener('scroll', updateActiveNav);


    // ── BACK TO TOP BUTTON ──
    const backToTopBtn = document.getElementById('backToTop');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 500) {
            backToTopBtn.classList.add('visible');
        } else {
            backToTopBtn.classList.remove('visible');
        }
    });

    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });


    // ── STAT COUNTER ANIMATION ──
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;

    function animateCounters() {
        statNumbers.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'));
            const duration = 1800;
            const increment = target > 500 ? Math.ceil(target / (duration / 16)) : (target / (duration / 16));
            let current = 0;

            const updateCounter = () => {
                current += increment;
                if (current < target) {
                    stat.textContent = Math.floor(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    stat.textContent = target;
                }
            };

            updateCounter();
        });
    }

    // Trigger counters when stats bar enters viewport
    const statsBar = document.querySelector('.stats-bar');

    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !statsAnimated) {
                statsAnimated = true;
                animateCounters();
            }
        });
    }, { threshold: 0.3 });

    if (statsBar) {
        statsObserver.observe(statsBar);
    }


    // ── SCROLL REVEAL ANIMATIONS ──
    const revealElements = document.querySelectorAll(
        '.skill-category, .project-card, .cert-card, .contact-card, ' +
        '.about-image-wrapper, .about-content, .highlight-item, .stat-card'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    revealElements.forEach(el => revealObserver.observe(el));


    // ── PROJECT FILTER ──
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filter = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');

                if (filter === 'all' || category === filter) {
                    card.classList.remove('hidden');
                    card.style.animation = 'fadeInUp 0.4s ease forwards';
                } else {
                    card.classList.add('hidden');
                }
            });
        });
    });


    // ── SMOOTH SCROLL FOR NAV LINKS ──
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });


    // ── CONTACT FORM HANDLER ──
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const firstName = document.getElementById('firstName').value;
            const lastName = document.getElementById('lastName').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;

            // Trigger mailto link as fallback for immediate email communication
            const mailtoLink = `mailto:pranaybanait221204@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent("From: " + firstName + " " + lastName + " (" + email + ")\n\n" + message)}`;
            window.location.href = mailtoLink;

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;

            submitBtn.innerHTML = '<i class="fas fa-check"></i> Preparing Email...';
            submitBtn.style.background = '#22c55e';
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.style.background = '';
                submitBtn.disabled = false;
                contactForm.reset();
            }, 3000);
        });
    }


    // ── NAVBAR BACKGROUND ON SCROLL ──
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            navbar.style.top = '0.75rem';
        } else {
            navbar.style.top = '1.25rem';
        }
    });

});


// ── FADE IN UP ANIMATION (for project filter) ──
const style = document.createElement('style');
style.textContent = `
    @keyframes fadeInUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }
`;
document.head.appendChild(style);
