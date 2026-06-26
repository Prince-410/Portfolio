// ==============================
// PORTFOLIO JAVASCRIPT — PRINCE LAKHANI
// ==============================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide Icons
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // ------ Cursor Glow Effect ------
    const cursorGlow = document.getElementById('cursorGlow');
    let mouseX = 0, mouseY = 0;
    let glowX = 0, glowY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorGlow.classList.add('active');
    });

    document.addEventListener('mouseleave', () => {
        cursorGlow.classList.remove('active');
    });

    function animateGlow() {
        glowX += (mouseX - glowX) * 0.08;
        glowY += (mouseY - glowY) * 0.08;
        cursorGlow.style.left = glowX + 'px';
        cursorGlow.style.top = glowY + 'px';
        requestAnimationFrame(animateGlow);
    }
    animateGlow();

    // ------ Particle Canvas ------
    const canvas = document.getElementById('particleCanvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    const PARTICLE_COUNT = 60;

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    class Particle {
        constructor() {
            this.reset();
        }
        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 1.8 + 0.4;
            this.speedX = (Math.random() - 0.5) * 0.3;
            this.speedY = (Math.random() - 0.5) * 0.3;
            this.opacity = Math.random() * 0.4 + 0.1;
            this.fadeDir = Math.random() > 0.5 ? 1 : -1;
        }
        update() {
            this.x += this.speedX;
            this.y += this.speedY;
            this.opacity += this.fadeDir * 0.003;
            if (this.opacity <= 0.05 || this.opacity >= 0.5) this.fadeDir *= -1;
            if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
                this.reset();
            }
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(129, 140, 248, ${this.opacity})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // draw connections
        for (let i = 0; i < particles.length; i++) {
            for (let j = i + 1; j < particles.length; j++) {
                const dx = particles[i].x - particles[j].x;
                const dy = particles[i].y - particles[j].y;
                const dist = Math.sqrt(dx * dx + dy * dy);
                if (dist < 140) {
                    ctx.beginPath();
                    ctx.moveTo(particles[i].x, particles[i].y);
                    ctx.lineTo(particles[j].x, particles[j].y);
                    ctx.strokeStyle = `rgba(129, 140, 248, ${0.06 * (1 - dist / 140)})`;
                    ctx.lineWidth = 0.5;
                    ctx.stroke();
                }
            }
        }

        particles.forEach(p => {
            p.update();
            p.draw();
        });
        requestAnimationFrame(animateParticles);
    }
    animateParticles();

    // ------ Navbar Scroll ------
    const navbar = document.getElementById('navbar');
    const sections = document.querySelectorAll('.section, .hero');
    const navLinks = document.querySelectorAll('.nav-link');

    function onScroll() {
        // Scrolled state
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Active section highlight
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            if (window.scrollY >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('data-section') === current) {
                link.classList.add('active');
            }
        });
    }
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();

    // ------ Mobile Menu ------
    const mobileToggle = document.getElementById('mobileToggle');
    const mobileOverlay = document.getElementById('mobileMenuOverlay');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');

    if (mobileToggle && mobileOverlay) {
        mobileToggle.addEventListener('click', () => {
            mobileToggle.classList.toggle('active');
            mobileOverlay.classList.toggle('active');
            document.body.style.overflow = mobileOverlay.classList.contains('active') ? 'hidden' : '';
        });

        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                mobileToggle.classList.remove('active');
                mobileOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // ------ Typewriter Effect ------
    const typewriterEl = document.getElementById('typewriterText');
    const phrases = [
        'scalable web applications.',
        'machine learning models.',
        'intelligent data pipelines.',
        'beautiful user interfaces.',
        'full-stack solutions.',
        'the future with AI.'
    ];
    let phraseIdx = 0;
    let charIdx = 0;
    let isDeleting = false;
    let typeSpeed = 80;

    function typewrite() {
        const current = phrases[phraseIdx];
        if (isDeleting) {
            typewriterEl.textContent = current.substring(0, charIdx - 1);
            charIdx--;
            typeSpeed = 40;
        } else {
            typewriterEl.textContent = current.substring(0, charIdx + 1);
            charIdx++;
            typeSpeed = 80;
        }

        if (!isDeleting && charIdx === current.length) {
            typeSpeed = 2000; // pause at end
            isDeleting = true;
        } else if (isDeleting && charIdx === 0) {
            isDeleting = false;
            phraseIdx = (phraseIdx + 1) % phrases.length;
            typeSpeed = 400; // pause before next word
        }

        setTimeout(typewrite, typeSpeed);
    }
    typewrite();

    // ------ Counter Animation ------
    const statNumbers = document.querySelectorAll('.stat-number');
    let counterStarted = false;

    function animateCounters() {
        if (counterStarted) return;
        counterStarted = true;

        statNumbers.forEach(el => {
            const target = parseInt(el.getAttribute('data-target'), 10);
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;

            function count() {
                current += step;
                if (current >= target) {
                    el.textContent = target;
                } else {
                    el.textContent = Math.floor(current);
                    requestAnimationFrame(count);
                }
            }
            count();
        });
    }

    // Trigger counters when hero stats are visible
    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) {
        const statsObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    statsObserver.disconnect();
                }
            });
        }, { threshold: 0.5 });
        statsObserver.observe(heroStats);
    }

    // ------ Scroll Reveal Animation ------
    const revealElements = document.querySelectorAll(
        '.section-header, .skill-category, .project-card, .about-content, ' +
        '.about-visual, .timeline-item, .cert-card, .contact-info-side, .contact-form-side'
    );

    revealElements.forEach(el => el.classList.add('reveal'));

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -60px 0px'
    });

    revealElements.forEach(el => revealObserver.observe(el));

    // ------ Stagger children animation ------
    const staggerContainers = document.querySelectorAll('.skills-categories, .cert-grid, .projects-grid');
    staggerContainers.forEach(container => {
        const children = container.children;
        Array.from(children).forEach((child, i) => {
            child.style.transitionDelay = `${i * 0.1}s`;
        });
    });

    // ------ Smooth Scroll for all anchor links ------
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ------ Contact Form (basic front-end only) ------
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = document.getElementById('submitBtn');
            const originalContent = submitBtn.innerHTML;

            submitBtn.innerHTML = '<span>Sending...</span>';
            submitBtn.disabled = true;
            submitBtn.style.opacity = '0.7';

            // Logic to save message to LocalStorage for Admin Panel
            const formData = new FormData(contactForm);
            const messages = JSON.parse(localStorage.getItem('portfolio_messages') || '[]');

            const newMessage = {
                id: Date.now(),
                name: formData.get('name'),
                email: formData.get('email'),
                subject: formData.get('subject'),
                message: formData.get('message'),
                date: new Date().toISOString(),
                status: 'unread'
            };

            messages.push(newMessage);
            localStorage.setItem('portfolio_messages', JSON.stringify(messages));

            // Send email quietly in the background using FormSubmit API
            const jsonBody = JSON.stringify(newMessage, null, 2);
            
            fetch("https://formsubmit.co/ajax/pl74117411@gmail.com", {
                method: "POST",
                headers: { 
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    _subject: "New Portfolio Message: " + (newMessage.subject || "Contact Request"),
                    _template: "box",
                    "Contact_Data_JSON": jsonBody
                })
            })
            .then(response => response.json())
            .then(data => {
                submitBtn.innerHTML = '<span>Message Sent! ✓</span>';
                submitBtn.style.background = 'linear-gradient(135deg, #34d399, #059669)';
                contactForm.reset();

                setTimeout(() => {
                    submitBtn.innerHTML = originalContent;
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                    submitBtn.style.background = '';
                    // Re-init lucide icons for the Send icon
                    if (typeof lucide !== 'undefined') {
                        lucide.createIcons();
                    }
                }, 3000);
            })
            .catch(error => {
                console.error("Email send failed:", error);
                submitBtn.innerHTML = '<span>Error Sending</span>';
                submitBtn.style.background = '#ef4444'; // Red error button
                
                setTimeout(() => {
                    submitBtn.innerHTML = originalContent;
                    submitBtn.disabled = false;
                    submitBtn.style.opacity = '1';
                    submitBtn.style.background = '';
                    if (typeof lucide !== 'undefined') {
                        lucide.createIcons();
                    }
                }, 3000);
            });
        });
    }

    // ------ Tilt Effect on Project Cards ------
    const tiltCards = document.querySelectorAll('[data-tilt]');
    tiltCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            const rotateX = (y - centerY) / 30;
            const rotateY = (centerX - x) / 30;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px)`;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateY(0px)';
        });
    });

    // ------ Academic Results Dashboard & Secure Viewer ------
    const academicData = {
        currentCGPA: 8.44,
        semesters: [
            {
                id: 1,
                title: "Semester 1",
                sgpa: 7.76,
                marksheetSrc: "assets/results/sem1.jpg",
                subjects: [
                    { code: "22EB6108", name: "Professional Communication", grade: "B+" },
                    { code: "22EB4107", name: "Computer Programing", grade: "A+" },
                    { code: "22EB4105", name: "Basic Electrical Engineering", grade: "A" },
                    { code: "22EB4204", name: "Basic Electronics", grade: "A" },
                    { code: "22EB2103", name: "Mathematics - 1", grade: "B+" },
                    { code: "22EB2102", name: "Environmental Science", grade: "B+" }
                ]
            },
            {
                id: 2,
                title: "Semester 2",
                sgpa: 7.82,
                marksheetSrc: "assets/results/sem2.jpg",
                subjects: [
                    { code: "22EB2201", name: "Mathematics - 2", grade: "B+" },
                    { code: "23EB6204", name: "Human Values", grade: "A" },
                    { code: "22EB3202", name: "Applied Physics", grade: "A" },
                    { code: "22EB7206", name: "Data Structures", grade: "A" },
                    { code: "23EB4203", name: "Front-end Web Development", grade: "A+" },
                    { code: "23EB4204", name: "Python Programming", grade: "B+" }
                ]
            },
            {
                id: 3,
                title: "Semester 3",
                sgpa: 8.81,
                marksheetSrc: "assets/results/sem3.jpg",
                subjects: [
                    { code: "ECSCI24201", name: "Analysis and Design of Algorithms", grade: "A+" },
                    { code: "ECSCI24202", name: "Database Management Systems", grade: "A+" },
                    { code: "EICCI24201", name: "Digital Fundamentals", grade: "A+" },
                    { code: "ELEAI24201", name: "Effective Technical Communication", grade: "A" },
                    { code: "ECSAJ24201", name: "Mind Mapping", grade: "A" },
                    { code: "EMABT24204", name: "Probability and Statistics", grade: "A+" }
                ]
            },
            {
                id: 4,
                title: "Semester 4",
                sgpa: 8.65,
                marksheetSrc: "assets/results/sem4.jpg",
                subjects: [
                    { code: "EICCI24203", name: "Data Communication & Computer Networks", grade: "A" },
                    { code: "EMSAT24201", name: "Engineering Economics", grade: "A" },
                    { code: "EMABT24202", name: "Discrete Mathematics & Graph Theory", grade: "A" },
                    { code: "ECSCI24204", name: "Operating System", grade: "A+" },
                    { code: "ECSCI24203", name: "Object Oriented Programming with Java", grade: "O" },
                    { code: "ECSAJ24204", name: "Ideation & Conceptualization", grade: "A" }
                ]
            },
            {
                id: 5,
                title: "Semester 5",
                sgpa: 8.90,
                marksheetSrc: "assets/results/sem5.jpg",
                subjects: [
                    { code: "EICET24304", name: "IOT and Automation", grade: "A+" },
                    { code: "ECSAJ24301", name: "Business Models Canvas", grade: "B+" },
                    { code: "ECSDI24302", name: "Data Security", grade: "A+" },
                    { code: "ECSCT24301", name: "Foundation of AI", grade: "A+" },
                    { code: "ECSCI24302", name: "Machine Learning Essentials", grade: "A+" },
                    { code: "ECSCI24303", name: "Theory of Computation", grade: "A+" }
                ]
            },
            {
                id: 6,
                title: "Semester 6",
                sgpa: 8.80,
                marksheetSrc: "assets/results/sem6.jpg",
                subjects: [
                    { code: "ECSAJ24303", name: "Prototype Modeling", grade: "A+" },
                    { code: "ECSEI24302", name: "Data Visualization", grade: "A+" },
                    { code: "ECSCI24304", name: "Agile Software Development and DevOps", grade: "A" },
                    { code: "ECSCI24305", name: "Deep Learning: Principles and Practices", grade: "A+" },
                    { code: "ECSDI24305", name: "Network Security", grade: "A+" },
                    { code: "ECSDI24306", name: "Web Application Development", grade: "A+" }
                ]
            }
        ]
    };

    // Initialize Dashboard
    const semDetailsCard = document.getElementById('semDetailsCard');
    const cgpaDisplay = document.getElementById('cgpaDisplay');
    const cgpaCircle = document.querySelector('.progress-ring__circle');
    const semTabs = document.querySelectorAll('.sem-tab:not(.sem-upcoming)');
    
    // Set CGPA
    if (cgpaDisplay) cgpaDisplay.textContent = academicData.currentCGPA;
    
    // Animate CGPA Circle on scroll
    if (cgpaCircle) {
        const radius = cgpaCircle.r.baseVal.value;
        const circumference = radius * 2 * Math.PI;
        cgpaCircle.style.strokeDasharray = `${circumference} ${circumference}`;
        cgpaCircle.style.strokeDashoffset = circumference;
        
        const setProgress = (percent) => {
            const offset = circumference - percent / 10 * circumference;
            cgpaCircle.style.strokeDashoffset = offset;
        };

        const resultsSection = document.getElementById('results');
        if (resultsSection) {
            const observer = new IntersectionObserver((entries) => {
                if (entries[0].isIntersecting) {
                    setTimeout(() => {
                        setProgress(academicData.currentCGPA);
                    }, 500);
                    observer.disconnect();
                }
            }, { threshold: 0.3 });
            observer.observe(resultsSection);
        }
    }

    // Render Semester Details
    function renderSemester(semId) {
        if (!semDetailsCard) return;
        const data = academicData.semesters.find(s => s.id === parseInt(semId));
        if (!data) return;

        let subjectsHtml = data.subjects.map(sub => {
            let safeGrade = sub.grade.replace('+', '-plus');
            return `
            <div class="subject-item">
                <div class="subject-header">
                    <span class="subject-code">${sub.code}</span>
                    <span class="grade-badge grade-${safeGrade}">${sub.grade}</span>
                </div>
                <div class="subject-name">${sub.name}</div>
            </div>
            `;
        }).join('');

        semDetailsCard.style.opacity = 0;
        
        setTimeout(() => {
            semDetailsCard.innerHTML = `
                <div class="sem-details-header">
                    <div>
                        <h3 class="sem-title">${data.title}</h3>
                        <p class="text-tertiary">Adani University — B.Tech CSE (AI-ML)</p>
                    </div>
                    <div class="sem-sgpa">SGPA: ${data.sgpa}</div>
                </div>
                <div class="subject-grid">
                    ${subjectsHtml}
                </div>
                <div class="view-marksheet-container">
                    <button class="view-marksheet-btn" onclick="openSecureViewer(${data.id})">
                        <i data-lucide="file-check-2"></i>
                        <span>View Official Marksheet (Secure)</span>
                    </button>
                </div>
            `;
            if (typeof lucide !== 'undefined') lucide.createIcons();
            semDetailsCard.style.opacity = 1;
        }, 300);
    }

    // Tab Listeners
    if (semTabs.length > 0) {
        semTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                semTabs.forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                renderSemester(tab.getAttribute('data-sem'));
            });
        });
        // Render initial
        renderSemester(1);
    }

    // ------ Secure Marksheet Viewer Logic (HTML Renderer — No Image Needed) ------
    const secureModal = document.getElementById('secureViewerModal');
    const secureRender = document.getElementById('secureMarksheetRender');
    const closeSecureBtn = document.getElementById('closeSecureViewer');
    const secureBackdrop = document.getElementById('secureViewerBackdrop');
    const secureOverlay = document.getElementById('secureDocumentOverlay');
    let secureViewerActive = false;

    // Grade point lookup
    const gradePointMap = { 'O': 10, 'A+': 9, 'A': 8, 'B+': 7, 'B': 6, 'C': 5 };

    // Semester credit totals from real marksheets
    const semMeta = {
        1: { credits: 21, cgpa: '7.76' },
        2: { credits: 22, cgpa: '7.79' },
        3: { credits: 21, cgpa: '8.13' },
        4: { credits: 20, cgpa: '8.25' },
        5: { credits: 20, cgpa: '8.38' },
        6: { credits: 20, cgpa: '8.44' }
    };

    function buildMarksheetHTML(semId) {
        const data = academicData.semesters.find(s => s.id === parseInt(semId));
        if (!data) return '<p>Data not found.</p>';
        const meta = semMeta[semId] || {};

        const subjectCredits = { 1: [3,4,4,4,4,2], 2: [4,2,4,4,4,4], 3: [4,5,4,3,1,4], 4: [4,2,4,5,4,1], 5: [4,1,4,3,4,4], 6: [1,3,4,4,4,4] };
        const credits = subjectCredits[semId] || data.subjects.map(() => 4);

        const rows = data.subjects.map((sub, i) => {
            const gp = gradePointMap[sub.grade] || '—';
            return `
            <tr>
                <td>SEMESTER - ${['I','II','III','IV','V','VI'][semId-1]}</td>
                <td>${sub.code} — ${sub.name}</td>
                <td style="text-align:center;">${gp}</td>
                <td class="ms-grade-cell" style="text-align:center;">${sub.grade}</td>
                <td style="text-align:center;">${credits[i]}</td>
                <td class="ms-pass" style="text-align:center;">Pass</td>
            </tr>`;
        }).join('');

        return `
        <div class="ms-header">
            <div class="ms-university">Adani University</div>
            <div class="ms-subtitle">B. Tech. in Computer Science and Engineering (AI-ML) — Official Grade Report</div>
            <div class="ms-student-info">
                <div class="ms-info-row"><span>Student Name:</span> Prince Lakhani</div>
                <div class="ms-info-row"><span>Reg. No.:</span> 1AUA23BCS145</div>
                <div class="ms-info-row"><span>Semester:</span> SEMESTER - ${['I','II','III','IV','V','VI'][semId-1]}</div>
                <div class="ms-info-row"><span>Gender:</span> Male</div>
            </div>
        </div>
        <table class="ms-table">
            <thead>
                <tr>
                    <th>Semester</th>
                    <th>Course Name</th>
                    <th style="text-align:center;">Grade Point</th>
                    <th style="text-align:center;">Grade</th>
                    <th style="text-align:center;">Credit</th>
                    <th style="text-align:center;">Result Status</th>
                </tr>
            </thead>
            <tbody>${rows}</tbody>
        </table>
        <div class="ms-footer">
            <div class="ms-footer-stat">
                <span class="fs-label">Credit Registered</span>
                <span class="fs-value">${meta.credits || '—'}</span>
            </div>
            <div class="ms-footer-stat">
                <span class="fs-label">Credit Completed</span>
                <span class="fs-value">${meta.credits || '—'}</span>
            </div>
            <div class="ms-footer-stat">
                <span class="fs-label">GPA</span>
                <span class="fs-value">${data.sgpa}</span>
            </div>
            <div class="ms-footer-stat">
                <span class="fs-label">CGPA</span>
                <span class="fs-value">${meta.cgpa || '—'}</span>
            </div>
        </div>
        <div class="ms-readonly-bar">
            🔒 READ-ONLY VIEW &nbsp;—&nbsp; Printing, downloading and copying are strictly disabled
        </div>`;
    }

    window.openSecureViewer = function(semId) {
        if (!secureModal || !secureRender) return;
        secureRender.innerHTML = buildMarksheetHTML(semId);
        secureModal.classList.add('active');
        document.body.style.overflow = 'hidden';
        secureViewerActive = true;
    };

    function closeSecureViewer() {
        if (!secureModal) return;
        secureModal.classList.remove('active');
        document.body.style.overflow = '';
        secureViewerActive = false;
        setTimeout(() => { secureRender.innerHTML = ''; }, 300);
    }

    if (closeSecureBtn) closeSecureBtn.addEventListener('click', closeSecureViewer);
    if (secureBackdrop) secureBackdrop.addEventListener('click', closeSecureViewer);

    // Block context menu & drag on the overlay shield
    if (secureOverlay) {
        secureOverlay.addEventListener('contextmenu', e => e.preventDefault());
        secureOverlay.addEventListener('dragstart', e => e.preventDefault());
    }

    // Block print dialog globally when modal is active
    window.addEventListener('beforeprint', e => {
        if (secureViewerActive) e.preventDefault();
    });

    // Keyboard Shortcut Interception
    document.addEventListener('keydown', function(e) {
        if (!secureViewerActive) return;
        if (e.key === 'Escape') { closeSecureViewer(); return; }
        if (
            (e.ctrlKey && ['s','p','u'].includes(e.key.toLowerCase())) ||
            (e.metaKey && ['s','p','u'].includes(e.key.toLowerCase())) ||
            e.key === 'F12' ||
            (e.ctrlKey && e.shiftKey && ['i','j','c'].includes(e.key.toLowerCase())) ||
            (e.metaKey && e.altKey && e.key.toLowerCase() === 'i')
        ) {
            e.preventDefault();
        }
    });

    // ------ Performance Analytics Chart (Chart.js) ------
    const chartCanvas = document.getElementById('performanceChart');
    if (chartCanvas && typeof Chart !== 'undefined') {
        const sgpaValues = academicData.semesters.map(s => s.sgpa);
        const cgpaValues = [7.76, 7.79, 8.13, 8.25, 8.38, 8.44]; // Cumulative CGPA per sem
        const labels = academicData.semesters.map(s => s.title);

        Chart.defaults.color = 'rgba(255,255,255,0.5)';
        Chart.defaults.font.family = "'Inter', 'Outfit', sans-serif";

        new Chart(chartCanvas, {
            type: 'bar',
            data: {
                labels,
                datasets: [
                    {
                        label: 'SGPA',
                        data: sgpaValues,
                        backgroundColor: [
                            'rgba(129,140,248,0.75)',
                            'rgba(129,140,248,0.75)',
                            'rgba(129,140,248,0.75)',
                            'rgba(129,140,248,0.75)',
                            'rgba(129,140,248,0.75)',
                            'rgba(167,139,250,0.75)'
                        ],
                        borderColor: [
                            'rgba(129,140,248,1)',
                            'rgba(129,140,248,1)',
                            'rgba(129,140,248,1)',
                            'rgba(129,140,248,1)',
                            'rgba(129,140,248,1)',
                            'rgba(167,139,250,1)'
                        ],
                        borderWidth: 2,
                        borderRadius: 8,
                        borderSkipped: false,
                        barPercentage: 0.55,
                        order: 2
                    },
                    {
                        label: 'CGPA Trend',
                        data: cgpaValues,
                        type: 'line',
                        borderColor: '#10b981',
                        backgroundColor: 'rgba(16,185,129,0.08)',
                        borderWidth: 2.5,
                        pointBackgroundColor: '#10b981',
                        pointBorderColor: '#fff',
                        pointBorderWidth: 2,
                        pointRadius: 6,
                        pointHoverRadius: 8,
                        tension: 0.4,
                        fill: true,
                        order: 1
                    }
                ]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                interaction: { mode: 'index', intersect: false },
                plugins: {
                    legend: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(15,15,25,0.95)',
                        borderColor: 'rgba(255,255,255,0.1)',
                        borderWidth: 1,
                        padding: 14,
                        titleFont: { size: 13, weight: '600' },
                        bodyFont: { size: 12 },
                        callbacks: {
                            label: ctx => ` ${ctx.dataset.label}: ${ctx.parsed.y.toFixed(2)}`
                        }
                    }
                },
                scales: {
                    x: {
                        grid: { color: 'rgba(255,255,255,0.04)', drawBorder: false },
                        ticks: { color: 'rgba(255,255,255,0.55)', font: { size: 12 } }
                    },
                    y: {
                        min: 6.5,
                        max: 10,
                        grid: { color: 'rgba(255,255,255,0.06)', drawBorder: false },
                        ticks: {
                            color: 'rgba(255,255,255,0.55)',
                            font: { size: 11 },
                            stepSize: 0.5
                        }
                    }
                }
            }
        });
    }

});

