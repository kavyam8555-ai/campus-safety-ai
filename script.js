document.addEventListener('DOMContentLoaded', () => {
    // 1. Navbar Scroll Effect
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const mobileToggle = document.querySelector('.mobile-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (mobileToggle) {
        mobileToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileToggle.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // 3. Smooth Scrolling for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            // Close mobile menu if open
            if (navLinks && navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = mobileToggle.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }

            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: "smooth"
                });
            }
        });
    });

    // 4. Dashboard Simulator Logic

    // Simulate event counter increasing
    const eventCounter = document.getElementById('event-counter');
    let currentEvents = 14204;

    setInterval(() => {
        // Randomly increase events 1-5
        const increase = Math.floor(Math.random() * 5) + 1;
        currentEvents += increase;

        // Format with comma
        if (eventCounter) {
            eventCounter.innerText = currentEvents.toLocaleString();
        }
    }, 3000);

    // Simulate Agentic Threat Detection
    const simulateBtn = document.getElementById('simulate-alert-btn');
    const alertList = document.getElementById('alert-list');
    const aiBoxes = document.querySelectorAll('.ai-box');
    const statusIndicator = document.querySelector('.status-indicator');
    let threatActive = false;

    if (simulateBtn) {
        simulateBtn.addEventListener('click', () => {
            if (threatActive) return; // Prevent multiple clicks

            threatActive = true;
            simulateBtn.innerText = "System Executing Lockdown...";
            simulateBtn.classList.replace('btn-secondary-sm', 'btn-primary-sm');
            simulateBtn.style.background = "var(--danger)";
            simulateBtn.style.border = "none";

            // Change Status Indicator
            if (statusIndicator) {
                statusIndicator.classList.remove('safe');
                statusIndicator.classList.add('alert');
                statusIndicator.innerHTML = '<span class="pulse"></span> THREAT DETECTED - L4';
            }

            // Show AI Bounding Box in Feed 1
            if (aiBoxes.length > 0) {
                const box1 = aiBoxes[0];
                box1.style.width = '120px';
                box1.style.height = '180px';
                box1.style.top = '30%';
                box1.style.left = '40%';
                box1.classList.add('threat');
            }

            // Create new Alert Item
            const newAlert = document.createElement('li');
            newAlert.className = 'alert-item danger';
            newAlert.innerHTML = `
                <i class="fa-solid fa-radiation"></i>
                <div class="alert-info">
                    <h4>CONCEALED WEAPON DETECTED</h4>
                    <p>Main Gate - Agentic Lock Initiated</p>
                </div>
            `;

            // Add to top of list
            if (alertList) {
                alertList.prepend(newAlert);

                // Keep only top 3
                if (alertList.children.length > 3) {
                    alertList.removeChild(alertList.lastElementChild);
                }
            }

            // Reset after 8 seconds
            setTimeout(() => {
                threatActive = false;
                simulateBtn.innerText = "Simulate AI Threat Detection";
                simulateBtn.classList.replace('btn-primary-sm', 'btn-secondary-sm');
                simulateBtn.style.background = "transparent";
                simulateBtn.style.border = "1px solid var(--border-glass)";

                if (statusIndicator) {
                    statusIndicator.classList.remove('alert');
                    statusIndicator.classList.add('safe');
                    statusIndicator.innerHTML = '<span class="pulse"></span> Campus State: Secure';
                }

                if (aiBoxes.length > 0) {
                    aiBoxes[0].classList.remove('threat');
                }

                // Change the alert status visually
                newAlert.className = 'alert-item resolved';
                newAlert.innerHTML = `
                    <i class="fa-solid fa-shield-check"></i>
                    <div class="alert-info">
                        <h4>THREAT RESOLVED</h4>
                        <p>Main Gate - Authorities on scene</p>
                    </div>
                `;
            }, 8000);
        });
    }

    // Contact Form Submission (Prevent Default)
    const form = document.getElementById('inquiry-form');
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;

            btn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Sending...';
            btn.disabled = true;

            // Simulate network request
            setTimeout(() => {
                btn.innerHTML = '<i class="fa-solid fa-check"></i> Request Received';
                btn.classList.add('btn-success');
                btn.style.background = 'var(--success)';
                form.reset();

                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3000);
            }, 1500);
        });
    }
});
