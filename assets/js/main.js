/**
 * Nexora Digital - Interactive JavaScript
 * DigiMX Demo 5 Experience: Sticky Nav, Mobile Drawer, Pricing Switcher, FAQ Accordion, Lead Capture
 */

document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    // ==========================================
    // 1. Sticky Navigation Bar on Scroll
    // ==========================================
    const siteHeader = document.querySelector('.site-header');
    
    function handleScroll() {
        if (window.scrollY > 40) {
            siteHeader.classList.add('scrolled');
        } else {
            siteHeader.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    // ==========================================
    // 2. Mobile Menu Drawer & Toggle
    // ==========================================
    const mobileToggle = document.querySelector('.mobile-toggle');
    const mobileDrawerClose = document.getElementById('mobileDrawerClose');
    const navMenu = document.querySelector('.nav-menu');
    const navBackdrop = document.querySelector('.nav-menu-backdrop');
    const navLinks = document.querySelectorAll('.nav-link');

    function toggleMenu() {
        mobileToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
        navBackdrop.classList.toggle('active');
        document.body.style.overflow = navMenu.classList.contains('active') ? 'hidden' : '';
    }

    function closeMenu() {
        mobileToggle.classList.remove('active');
        navMenu.classList.remove('active');
        navBackdrop.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (mobileToggle) {
        mobileToggle.addEventListener('click', toggleMenu);
    }

    if (mobileDrawerClose) {
        mobileDrawerClose.addEventListener('click', closeMenu);
    }
    
    if (navBackdrop) {
        navBackdrop.addEventListener('click', closeMenu);
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            closeMenu();
        });
    });

    // ==========================================
    // 3. Active Nav Link on Scroll (Scrollspy)
    // ==========================================
    const sections = document.querySelectorAll('section[id]');

    function highlightNavOnScroll() {
        const scrollY = window.pageYOffset + 120;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop;
            const sectionId = current.getAttribute('id');
            const correspondingNavLink = document.querySelector(`.nav-menu a[href*="#${sectionId}"]`);

            if (correspondingNavLink) {
                if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                    correspondingNavLink.classList.add('active');
                } else {
                    correspondingNavLink.classList.remove('active');
                }
            }
        });
    }

    window.addEventListener('scroll', highlightNavOnScroll, { passive: true });

    // ==========================================
    // 4. FAQ Accordion Interaction
    // ==========================================
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close other open FAQs
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    otherItem.querySelector('.faq-answer').style.maxHeight = null;
                }
            });

            // Toggle current
            if (isActive) {
                item.classList.remove('active');
                answer.style.maxHeight = null;
            } else {
                item.classList.add('active');
                answer.style.maxHeight = answer.scrollHeight + 'px';
            }
        });
    });

    // Auto-open first FAQ by default
    if (faqItems.length > 0) {
        faqItems[0].classList.add('active');
        const firstAnswer = faqItems[0].querySelector('.faq-answer');
        firstAnswer.style.maxHeight = firstAnswer.scrollHeight + 'px';
    }

    // ==========================================
    // 6. Lead Capture Form Submission & WhatsApp Forward
    // ==========================================
    const contactForm = document.getElementById('leadContactForm');
    const successBanner = document.getElementById('formSuccessBanner');

    if (contactForm) {
        contactForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('leadName').value.trim();
            const email = document.getElementById('leadEmail').value.trim();
            const phone = document.getElementById('leadPhone').value.trim();
            const service = document.getElementById('leadService').value;
            const message = document.getElementById('leadMessage').value.trim();

            if (!name || !email || !phone) {
                alert('Please fill in your name, email and phone number.');
                return;
            }

            // Show success message
            successBanner.style.display = 'block';
            contactForm.reset();

            // Format WhatsApp text for seamless immediate client connection
            const waText = encodeURIComponent(
                `Hello Nexora Digital! 👋\n\nI just requested a consultation on your website:\n` +
                `*Name:* ${name}\n` +
                `*Phone:* ${phone}\n` +
                `*Email:* ${email}\n` +
                `*Service:* ${service}\n` +
                `*Notes:* ${message || 'Interested in growth strategy.'}`
            );

            // Optional direct redirect option
            setTimeout(() => {
                if (confirm('Thank you! Would you like to connect directly with our growth strategist on WhatsApp right now?')) {
                    window.open(`https://wa.me/917478368773?text=${waText}`, '_blank');
                }
            }, 600);
        });
    }

    // ==========================================
    // 7. Animated Statistics Counters
    // ==========================================
    const counterElements = document.querySelectorAll('.counter-val');
    let countersStarted = false;

    function runCounters() {
        if (countersStarted) return;

        const firstCounter = counterElements[0];
        if (!firstCounter) return;

        const rect = firstCounter.getBoundingClientRect();
        if (rect.top <= window.innerHeight * 0.9) {
            countersStarted = true;

            counterElements.forEach(counter => {
                const target = +counter.getAttribute('data-target');
                const duration = 1600; // ms
                const stepTime = 30;
                const steps = duration / stepTime;
                const increment = target / steps;
                let current = 0;

                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        counter.textContent = target;
                        clearInterval(timer);
                    } else {
                        counter.textContent = Math.ceil(current);
                    }
                }, stepTime);
            });
        }
    }

    window.addEventListener('scroll', runCounters, { passive: true });
    runCounters();

    // ==========================================
    // 7. Custom Proposal Request Modal Logic
    // ==========================================
    const pricingModal = document.getElementById('pricingModal');
    const modalCloseBtn = document.getElementById('modalCloseBtn');
    const modalPlanName = document.getElementById('modalPlanName');
    const modalHiddenPlan = document.getElementById('modalHiddenPlan');
    const modalWhatsAppBtn = document.getElementById('modalWhatsAppBtn');
    const modalUnlockForm = document.getElementById('modalUnlockForm');
    const modalSuccessBanner = document.getElementById('modalSuccessBanner');
    const modalSuccessText = document.getElementById('modalSuccessText');

    function openPricingModal(plan) {
        if (!pricingModal) return;
        modalPlanName.textContent = plan + ' Plan';
        modalHiddenPlan.value = plan;
        modalSuccessBanner.style.display = 'none';

        // Pre-fill WhatsApp link with specific plan proposal inquiry
        const waMsg = encodeURIComponent(
            `Hi Nexora Digital! 👋\nI'm exploring your growth services on your website and would like a custom proposal and quote for the *${plan} Plan*.\nCan you connect with me?`
        );
        modalWhatsAppBtn.href = `https://wa.me/917478368773?text=${waMsg}`;

        pricingModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }

    function closePricingModal() {
        if (!pricingModal) return;
        pricingModal.classList.remove('active');
        document.body.style.overflow = '';
    }

    // Attach click listeners to all proposal triggers and buttons
    document.querySelectorAll('.price-unlock-trigger, .unlock-plan-btn').forEach(elem => {
        elem.addEventListener('click', function (e) {
            e.preventDefault();
            const plan = this.getAttribute('data-plan') || 'Growth';
            openPricingModal(plan);
        });
    });

    if (modalCloseBtn) {
        modalCloseBtn.addEventListener('click', closePricingModal);
    }

    if (pricingModal) {
        pricingModal.addEventListener('click', function (e) {
            if (e.target === pricingModal) {
                closePricingModal();
            }
        });
    }

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && pricingModal && pricingModal.classList.contains('active')) {
            closePricingModal();
        }
    });

    // Handle automated proposal request form submission
    if (modalUnlockForm) {
        modalUnlockForm.addEventListener('submit', function (e) {
            e.preventDefault();

            const name = document.getElementById('modalName').value.trim();
            const phone = document.getElementById('modalPhone').value.trim();
            const email = document.getElementById('modalEmail').value.trim();
            const brand = document.getElementById('modalBrand').value.trim();
            const plan = modalHiddenPlan.value;

            // Show instant success inside the modal
            modalSuccessBanner.style.display = 'block';
            modalSuccessText.innerHTML = `<strong>Proposal Requested!</strong> We are preparing a custom scope for the <strong>${plan} Plan</strong>. Connecting you with our strategist...`;

            // Prepare pre-filled WhatsApp lead connection
            const waLeadMsg = encodeURIComponent(
                `Hello Nexora Digital! 🚀\n\nI just requested a custom proposal for the *${plan} Plan* on your site:\n` +
                `*Name:* ${name}\n` +
                `*Phone:* ${phone}\n` +
                `*Email:* ${email}\n` +
                `*Brand/Website:* ${brand || 'N/A'}\n` +
                `*Selected Plan:* ${plan}`
            );

            setTimeout(() => {
                closePricingModal();
                modalUnlockForm.reset();
                if (confirm(`Your proposal request for the ${plan} Plan has been received!\n\nWould you like to connect directly with our growth strategist on WhatsApp now?`)) {
                    window.open(`https://wa.me/917478368773?text=${waLeadMsg}`, '_blank');
                }
            }, 900);
        });
    }
});
