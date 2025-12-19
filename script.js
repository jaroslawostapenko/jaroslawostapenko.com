/**
 * ============================================================================
 * Yaroslav.dev - Core Application Logic
 * ============================================================================
 */

// Initialize Lucide Icons
if (typeof lucide !== 'undefined') {
    lucide.createIcons();
}

class NavigationController {
    constructor() {
        // Elements defined in index.html
        this.header = document.getElementById('main-header');
        this.mobileBtn = document.getElementById('mobile-menu-btn');
        this.mobileMenu = document.getElementById('mobile-menu');
        this.logoText = document.getElementById('logo-text');
        this.menuIcon = document.getElementById('menu-icon');
        
        this.init();
    }

    init() {
        this.bindScroll();
        this.bindMobileMenu();
        this.bindSmoothScroll();
    }

    bindScroll() {
        if (!this.header) return;

        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;

            if (currentScrollY > 20) {
                // Scrolled State: White background, shadow, smaller padding
                this.header.classList.add('bg-white/90', 'backdrop-blur-md', 'shadow-sm', 'py-4');
                this.header.classList.remove('bg-transparent', 'py-6');
                
                // Change logo text color for visibility on white background
                if (this.logoText) {
                    this.logoText.classList.remove('lg:text-white');
                    this.logoText.classList.add('text-slate-900');
                }
                
                // Change menu icon color
                if (this.menuIcon) {
                    this.menuIcon.classList.remove('lg:text-white');
                    this.menuIcon.classList.add('text-slate-900');
                }

            } else {
                // Top State: Transparent background, larger padding
                this.header.classList.remove('bg-white/90', 'backdrop-blur-md', 'shadow-sm', 'py-4');
                this.header.classList.add('bg-transparent', 'py-6');

                // Revert text colors
                if (this.logoText) {
                    this.logoText.classList.add('lg:text-white');
                }
                
                if (this.menuIcon) {
                    this.menuIcon.classList.add('lg:text-white');
                }
            }
        });
    }

    bindMobileMenu() {
        if (!this.mobileBtn || !this.mobileMenu) return;

        this.mobileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.mobileMenu.classList.toggle('hidden');
            
            // Optional: Toggle icon between menu and x
            // const isHidden = this.mobileMenu.classList.contains('hidden');
            // if (this.menuIcon) {
            //     this.menuIcon.setAttribute('data-lucide', isHidden ? 'menu' : 'x');
            //     lucide.createIcons();
            // }
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.mobileMenu.classList.contains('hidden') && 
                !this.mobileMenu.contains(e.target) && 
                !this.mobileBtn.contains(e.target)) {
                this.mobileMenu.classList.add('hidden');
            }
        });

        // Close menu when a link is clicked
        const mobileLinks = this.mobileMenu.querySelectorAll('a');
        mobileLinks.forEach(link => {
            link.addEventListener('click', () => {
                this.mobileMenu.classList.add('hidden');
            });
        });
    }

    bindSmoothScroll() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                
                if (targetElement) {
                    // Offset for fixed header
                    const headerOffset = 80;
                    const elementPosition = targetElement.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.scrollY - headerOffset;
    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: "smooth"
                    });
                }
            });
        });
    }
}

class ContactForm {
    constructor() {
        this.form = document.getElementById('contact-form');
        this.submitBtn = document.getElementById('submit-btn');
        this.init();
    }

    init() {
        if (!this.form || !this.submitBtn) return;

        this.form.addEventListener('submit', (e) => {
            e.preventDefault();
            this.handleSubmit();
        });
    }

    handleSubmit() {
        const originalContent = this.submitBtn.innerHTML;
        
        // Loading State
        this.submitBtn.innerHTML = `
            <div class="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
            <span>Wysyłanie...</span>
        `;
        this.submitBtn.disabled = true;

        // Simulate API call
        setTimeout(() => {
            // Success State
            this.submitBtn.innerHTML = `
                <span>Wysłano!</span>
                <i data-lucide="check" width="18" height="18"></i>
            `;
            if (typeof lucide !== 'undefined') lucide.createIcons();
            
            this.form.reset();

            // Reset button after delay
            setTimeout(() => {
                this.submitBtn.innerHTML = originalContent;
                this.submitBtn.disabled = false;
                if (typeof lucide !== 'undefined') lucide.createIcons();
            }, 3000);
        }, 1500);
    }
}

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
    new NavigationController();
    new ContactForm();
    console.log("Portfolio System Online");
});