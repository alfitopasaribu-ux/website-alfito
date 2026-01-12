document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initNavbar();
    initTypingEffect();
    initOrbitAnimations();
    initSunPhotoModal();
    initSmoothScroll();
    initSectionAnimations();
    initDownloadCV();
    initSkillsAnimation();
});

function initNavbar() {
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    hamburger.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    const sections = document.querySelectorAll('section');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remove active class from all links
                navLinks.forEach(link => link.classList.remove('active'));
                
                // Add active class to corresponding link
                const activeLink = document.querySelector(`a[href="#${entry.target.id}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }, {
        threshold: 0.3,
        rootMargin: '-100px 0px -100px 0px'
    });
    
    sections.forEach(section => observer.observe(section));
}

function initTypingEffect() {
    const typingText = document.getElementById('typing-text');
    const phrases = [
        'Web Developer',
        'Front-End', 
        'Problem Solver'
    ];
    
    let currentPhraseIndex = 0;
    let currentCharIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;
    
    function typeEffect() {
        const currentPhrase = phrases[currentPhraseIndex];
        
        if (isDeleting) {
            // Deleting characters
            typingText.textContent = currentPhrase.substring(0, currentCharIndex - 1);
            currentCharIndex--;
            typingSpeed = 50; // Faster when deleting
        } else {
            // Typing characters
            typingText.textContent = currentPhrase.substring(0, currentCharIndex + 1);
            currentCharIndex++;
            typingSpeed = 100; // Normal typing speed
        }
        
        // When word is complete
        if (!isDeleting && currentCharIndex === currentPhrase.length) {
            isDeleting = true;
            typingSpeed = 2000; // Pause before deleting
        } 
        // When word is completely deleted
        else if (isDeleting && currentCharIndex === 0) {
            isDeleting = false;
            currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
            typingSpeed = 500; // Pause before next word
        }
        
        setTimeout(typeEffect, typingSpeed);
    }

    typeEffect();
}



function initOrbitAnimations() {
    const planets = document.querySelectorAll('.random-orbit');

    planets.forEach((planet, index) => {
        const startAngle = Math.random() * 360;
        const radius = 120 + (index * 40);

        const duration = 15 + Math.random() * 15;
        const direction = Math.random() > 0.5 ? 'normal' : 'reverse';
        const delay = 0;

        planet.style.transform = `rotate(${startAngle}deg) translateX(${radius}px) rotate(-${startAngle}deg)`;

        const animationName = `orbit${index}`;
        const keyframes = `
            @keyframes ${animationName} {
                from {
                    transform: rotate(${startAngle}deg) translateX(${radius}px) rotate(-${startAngle}deg);
                }
                to {
                    transform: rotate(${startAngle + 360}deg) translateX(${radius}px) rotate(-${startAngle + 360}deg);
                }
            }
        `;

        const styleSheet = document.createElement('style');
        styleSheet.textContent = keyframes;
        document.head.appendChild(styleSheet);

        planet.style.animation = `${animationName} ${duration}s linear infinite ${direction}`;
        planet.style.animationDelay = `${delay}s`;

        planet.addEventListener('mouseenter', () => {
            planet.style.animationPlayState = 'paused';
        });

        planet.addEventListener('mouseleave', () => {
            planet.style.animationPlayState = 'running';
        });
    });
}

function initSunPhotoModal() {
    const sun = document.querySelector('.sun-core');
    const modal = document.getElementById('photo-modal');
    const closeBtn = document.querySelector('.close');
    const randomPhoto = document.getElementById('random-photo');

    if (sun && modal && closeBtn && randomPhoto) {
        sun.addEventListener('click', () => {
            const randomId = Math.floor(Math.random() * 1000) + 1;
            randomPhoto.src = `https://picsum.photos/600/400?random=${randomId}`;
            modal.style.display = 'block';
        });

        closeBtn.addEventListener('click', () => {
            modal.style.display = 'none';
        });

        window.addEventListener('click', (e) => {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.style.display === 'block') {
                modal.style.display = 'none';
            }
        });
    }
}

function initSmoothScroll() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();

            const targetId = this.getAttribute('href').substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

function initSectionAnimations() {
    const elements = document.querySelectorAll('.slide-in-left, .slide-in-right, .slide-in-up');

    const elementObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                if (entry.target.classList.contains('slide-in-left')) {
                    entry.target.style.transform = 'translateX(0)';
                } else if (entry.target.classList.contains('slide-in-right')) {
                    entry.target.style.transform = 'translateX(0)';
                } else {
                    entry.target.style.transform = 'translateY(0)';
                }
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(element => elementObserver.observe(element));
}

function initDownloadCV() {
    const downloadButton = document.querySelector('.glow-genz-button');

    if (downloadButton) {
        downloadButton.addEventListener('click', function() {
            const link = document.createElement('a');
            link.href = 'cv.fito.jpg';
            link.download = 'CV_Alfito_Pasaribu.jpg';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        });
    }
}

function initSkillsAnimation() {
    const skillsSection = document.querySelector('.skills');
    const progressFills = document.querySelectorAll('.progress-fill');

    const skillsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                progressFills.forEach(fill => {
                    const percentage = fill.getAttribute('data-percentage');
                    fill.style.width = percentage + '%';
                });
            }
        });
    }, {
        threshold: 0.5,
        rootMargin: '0px 0px -100px 0px'
    });

    if (skillsSection) {
        skillsObserver.observe(skillsSection);
    }
}











// FormSubmit Contact Form - Send emails directly to Gmail
function initContactForm() {
    const contactForm = document.getElementById('contact-form');

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Prevent default form submission

            // Show loading state
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            submitBtn.textContent = 'Sending...';
            submitBtn.disabled = true;

            // Prepare form data
            const formData = new FormData(contactForm);

            // Send form data to FormSubmit
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    console.log('SUCCESS! Form submitted');
                    // Store message locally
                    storeContactMessage(formData);
                    alert('✅ Pesan berhasil dikirim! Terima kasih atas pesannya.');
                    contactForm.reset();
                } else {
                    throw new Error('Form submission failed');
                }
            })
            .catch(error => {
                console.log('FAILED...', error);
                alert('❌ Gagal mengirim pesan. Silakan coba lagi atau hubungi langsung via email/WhatsApp.');
            })
            .finally(() => {
                // Reset button state
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            });
        });
    }
}

// Initialize contact form when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initNavbar();
    initTypingEffect();
    initOrbitAnimations();
    initSunPhotoModal();
    initSmoothScroll();
    initSectionAnimations();
    initDownloadCV();
    initSkillsAnimation();
    initContactForm(); // Add contact form initialization
    initInbox(); // Add inbox initialization
});

// Inbox functionality
function initInbox() {
    const loginBtn = document.getElementById('login-btn');
    const loginModal = document.getElementById('login-modal');
    const inboxModal = document.getElementById('inbox-modal');
    const closeLogin = document.getElementById('close-login');
    const closeInbox = document.getElementById('close-inbox');
    const submitLogin = document.getElementById('submit-login');
    const logoutBtn = document.getElementById('logout-btn');
    const messagesList = document.getElementById('messages-list');

    // Show login modal
    loginBtn.addEventListener('click', () => {
        loginModal.style.display = 'block';
    });

    // Close login modal
    closeLogin.addEventListener('click', () => {
        loginModal.style.display = 'none';
    });

    // Close inbox modal
    closeInbox.addEventListener('click', () => {
        inboxModal.style.display = 'none';
    });

    // Close modals when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target === loginModal) {
            loginModal.style.display = 'none';
        }
        if (e.target === inboxModal) {
            inboxModal.style.display = 'none';
        }
    });

    // Handle login
    submitLogin.addEventListener('click', () => {
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        if (username === 'bes4you' && password === '741000Ai') {
            loginModal.style.display = 'none';
            inboxModal.style.display = 'block';
            loadMessages();
        } else {
            alert('Username atau password salah!');
        }
    });

    // Handle logout
    logoutBtn.addEventListener('click', () => {
        inboxModal.style.display = 'none';
        document.getElementById('username').value = '';
        document.getElementById('password').value = '';
    });

    // Load messages from localStorage
    function loadMessages() {
        const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
        messagesList.innerHTML = '';

        if (messages.length === 0) {
            messagesList.innerHTML = '<div class="no-messages">Belum ada pesan masuk.</div>';
            return;
        }

        messages.forEach((message, index) => {
            const messageDiv = document.createElement('div');
            messageDiv.className = 'message-item';
            messageDiv.innerHTML = `
                <h4>${message.name}</h4>
                <p><strong>Email:</strong> ${message.email}</p>
                <p><strong>Subject:</strong> ${message.subject}</p>
                <p><strong>Pesan:</strong> ${message.message}</p>
                <small>Dikirim pada: ${new Date(message.timestamp).toLocaleString('id-ID')}</small>
            `;
            messagesList.appendChild(messageDiv);
        });
    }
}

// Store contact form messages
function storeContactMessage(formData) {
    const messages = JSON.parse(localStorage.getItem('contactMessages') || '[]');
    const messageData = {
        name: formData.get('name'),
        email: formData.get('email'),
        subject: formData.get('subject'),
        message: formData.get('message'),
        timestamp: new Date().toISOString()
    };
    messages.push(messageData);
    localStorage.setItem('contactMessages', JSON.stringify(messages));
}

console.log('🚀 alfito Portfolio loaded successfully!');
