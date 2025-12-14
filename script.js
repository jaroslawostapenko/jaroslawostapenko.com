/**
 * ============================================================================
 * Yaroslav.dev - Core Application Logic
 * ============================================================================
 * Handles:
 * 1. Navigation System (Sticky Header, Mega Menu, Mobile Drawer)
 * 2. Theme Management (Light/Dark/System)
 * 3. Global Search System
 * 4. User Preferences (Font Size, Motion)
 * 5. Scroll Interaction & Observers
 * 6. Contact Form Logic
 */

// Initialize Lucide Icons
lucide.createIcons();

/**
 * ============================================================================
 * MODULE: THEME MANAGER
 * Handles Light/Dark mode switching and persistence
 * ============================================================================
 */
class ThemeManager {
    constructor() {
        this.html = document.documentElement;
        this.buttons = document.querySelectorAll('.theme-opt');
        this.quickToggle = document.getElementById('theme-toggle-quick');
        this.currentTheme = localStorage.getItem('theme') || 'system';
        
        this.init();
    }

    init() {
        this.applyTheme(this.currentTheme);
        this.bindEvents();
    }

    bindEvents() {
        // Settings Panel Buttons
        this.buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const theme = btn.dataset.value;
                this.setTheme(theme);
            });
        });

        // Header Quick Toggle
        if (this.quickToggle) {
            this.quickToggle.addEventListener('click', () => {
                const isDark = this.html.classList.contains('dark');
                this.setTheme(isDark ? 'light' : 'dark');
            });
        }

        // System Preference Listener
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (this.currentTheme === 'system') {
                this.applyTheme('system');
            }
        });
    }

    setTheme(theme) {
        this.currentTheme = theme;
        localStorage.setItem('theme', theme);
        this.applyTheme(theme);
    }

    applyTheme(theme) {
        // Update UI State
        this.buttons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.value === theme);
        });

        // Apply Class
        if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            this.html.classList.add('dark');
        } else {
            this.html.classList.remove('dark');
        }
    }
}

/**
 * ============================================================================
 * MODULE: NAVIGATION CONTROLLER
 * Handles Sticky Header, Scroll Direction, and Mobile Drawer
 * ============================================================================
 */
class NavigationController {
    constructor() {
        this.header = document.getElementById('main-nav-wrapper');
        this.navbar = document.getElementById('main-navbar');
        this.topBar = document.getElementById('top-utility-bar');
        
        // Mobile Elements
        this.drawer = document.getElementById('mobile-drawer');
        this.trigger = document.getElementById('mobile-menu-trigger');
        this.closeBtn = document.getElementById('mobile-close-btn');
        this.backdrop = document.getElementById('mobile-backdrop');
        this.hamburgerIcon = this.trigger?.querySelector('.hamburger-icon');
        
        this.lastScrollY = window.scrollY;
        this.init();
    }

    init() {
        this.bindScroll();
        this.bindMobileMenu();
    }

    bindScroll() {
        window.addEventListener('scroll', () => {
            const currentScrollY = window.scrollY;
            
            // 1. Sticky/Appearance Change
            if (currentScrollY > 20) {
                this.navbar.classList.add('bg-white/90', 'dark:bg-slate-900/90', 'shadow-md');
                this.navbar.classList.remove('bg-white/5', 'border-white/10');
                
                // Hide top bar on scroll
                if (this.topBar) {
                    this.topBar.style.height = '0';
                    this.topBar.style.opacity = '0';
                    this.topBar.style.padding = '0';
                    this.topBar.style.overflow = 'hidden';
                }
            } else {
                this.navbar.classList.remove('bg-white/90', 'dark:bg-slate-900/90', 'shadow-md');
                this.navbar.classList.add('bg-white/5', 'border-white/10');
                
                if (this.topBar) {
                    this.topBar.style.height = '';
                    this.topBar.style.opacity = '';
                    this.topBar.style.padding = '';
                }
            }

            // 2. Hide/Show on Scroll Direction (Smart Header)
            if (currentScrollY > this.lastScrollY && currentScrollY > 100) {
                // Scrolling Down -> Hide
                this.header.style.transform = 'translateY(-100%)';
            } else {
                // Scrolling Up -> Show
                this.header.style.transform = 'translateY(0)';
            }
            
            this.lastScrollY = currentScrollY;
        });
    }

    bindMobileMenu() {
        const toggleMenu = () => {
            const isOpen = this.drawer.classList.contains('drawer-open');
            if (isOpen) {
                this.drawer.classList.remove('drawer-open');
                this.hamburgerIcon.classList.remove('hamburger-active');
                document.body.style.overflow = '';
            } else {
                this.drawer.classList.add('drawer-open');
                this.hamburgerIcon.classList.add('hamburger-active');
                document.body.style.overflow = 'hidden';
            }
        };

        this.trigger?.addEventListener('click', toggleMenu);
        this.closeBtn?.addEventListener('click', toggleMenu);
        this.backdrop?.addEventListener('click', toggleMenu);

        // Close on link click
        document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.addEventListener('click', () => {
                if (this.drawer.classList.contains('drawer-open')) {
                    toggleMenu();
                }
            });
        });
    }
}

/**
 * ============================================================================
 * MODULE: SEARCH SYSTEM
 * Indexes page content and provides a real-time filter modal
 * ============================================================================
 */
class SearchSystem {
    constructor() {
        this.container = document.getElementById('search-modal-container');
        this.trigger = document.getElementById('search-trigger');
        this.closeBtn = document.getElementById('close-search');
        this.input = document.getElementById('global-search-input');
        this.resultsContainer = document.getElementById('results-list');
        this.backdrop = document.getElementById('search-backdrop');
        
        // Content to Index
        this.index = [
            { title: 'Start', url: '#hero', type: 'Sekcja' },
            { title: 'O mnie', url: '#about', type: 'Sekcja' },
            { title: 'Umiejętności', url: '#skills', type: 'Sekcja' },
            { title: 'Projekty', url: '#projects', type: 'Sekcja' },
            { title: 'Doświadczenie', url: '#experience', type: 'Sekcja' },
            { title: 'Kontakt', url: '#contact', type: 'Sekcja' },
            { title: 'AI Ping Pong', url: 'pong.html', type: 'Gra' },
            { title: 'Russian Checkers AI', url: 'checkers.html', type: 'Gra' },
            { title: '2D City Taxi', url: 'taxi.html', type: 'Gra' },
            { title: 'Loto Blast', url: 'loto.html', type: 'Gra' },
            { title: 'Monopoly Web', url: 'monopoly/index.html', type: 'Gra' },
            { title: 'JavaScript', url: '#skills', type: 'Technologia' },
            { title: 'React', url: '#skills', type: 'Technologia' },
            { title: 'PHP & MySQL', url: '#skills', type: 'Technologia' },
            { title: 'Tailwind CSS', url: '#skills', type: 'Narzędzie' }
        ];

        this.init();
    }

    init() {
        this.bindEvents();
    }

    bindEvents() {
        // Open
        this.trigger?.addEventListener('click', () => this.open());
        
        // Close
        this.closeBtn?.addEventListener('click', () => this.close());
        this.backdrop?.addEventListener('click', () => this.close());
        
        // Keyboard Shortcuts
        document.addEventListener('keydown', (e) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                this.open();
            }
            if (e.key === 'Escape' && this.isOpen()) {
                this.close();
            }
        });

        // Search Input Logic
        this.input?.addEventListener('input', (e) => this.handleSearch(e.target.value));

        // Suggestions Click
        document.querySelectorAll('.search-suggestion').forEach(btn => {
            btn.addEventListener('click', () => {
                this.input.value = btn.dataset.term;
                this.handleSearch(btn.dataset.term);
            });
        });
    }

    open() {
        this.container.classList.remove('hidden');
        // Small delay to allow transition
        setTimeout(() => {
            this.container.classList.add('visible');
            this.container.style.opacity = '1';
        }, 10);
        this.input.focus();
        document.body.style.overflow = 'hidden';
    }

    close() {
        this.container.style.opacity = '0';
        setTimeout(() => {
            this.container.classList.remove('visible');
            this.container.classList.add('hidden');
            this.input.value = '';
            this.resultsContainer.innerHTML = '';
            this.resultsContainer.classList.add('hidden');
        }, 200);
        document.body.style.overflow = '';
    }

    isOpen() {
        return !this.container.classList.contains('hidden');
    }

    handleSearch(query) {
        if (!query) {
            this.resultsContainer.innerHTML = '';
            this.resultsContainer.classList.add('hidden');
            return;
        }

        const normalizedQuery = query.toLowerCase();
        const results = this.index.filter(item => 
            item.title.toLowerCase().includes(normalizedQuery) ||
            item.type.toLowerCase().includes(normalizedQuery)
        );

        this.renderResults(results);
    }

    renderResults(results) {
        this.resultsContainer.innerHTML = '';
        this.resultsContainer.classList.remove('hidden');

        if (results.length === 0) {
            this.resultsContainer.innerHTML = `
                <li class="p-4 text-center text-slate-500">
                    Brak wyników dla "${this.input.value}"
                </li>
            `;
            return;
        }

        results.forEach(result => {
            const li = document.createElement('li');
            li.innerHTML = `
                <a href="${result.url}" class="flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors group">
                    <div class="flex items-center gap-3">
                        <div class="p-2 bg-slate-100 dark:bg-slate-600 text-slate-500 dark:text-slate-300 rounded-lg group-hover:bg-blue-100 dark:group-hover:bg-blue-900 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                            <i data-lucide="${this.getIconForType(result.type)}" width="16" height="16"></i>
                        </div>
                        <span class="font-medium text-slate-700 dark:text-slate-200">${result.title}</span>
                    </div>
                    <span class="text-xs text-slate-400 border border-slate-200 dark:border-slate-600 px-2 py-0.5 rounded-full">${result.type}</span>
                </a>
            `;
            
            // Add click listener to close modal
            li.querySelector('a').addEventListener('click', () => this.close());
            
            this.resultsContainer.appendChild(li);
        });
        
        // Re-initialize icons for new elements
        lucide.createIcons();
    }

    getIconForType(type) {
        switch(type) {
            case 'Sekcja': return 'hash';
            case 'Gra': return 'gamepad-2';
            case 'Technologia': return 'code-2';
            default: return 'arrow-right';
        }
    }
}

/**
 * ============================================================================
 * MODULE: SETTINGS MANAGER
 * Handles Font Size and Reduced Motion preferences
 * ============================================================================
 */
class SettingsManager {
    constructor() {
        this.container = document.getElementById('settings-modal-container');
        this.trigger = document.getElementById('settings-trigger');
        this.closeBtn = document.getElementById('close-settings');
        this.backdrop = document.getElementById('settings-backdrop');
        this.resetBtn = document.getElementById('reset-settings');
        
        // Inputs
        this.fontRange = document.getElementById('font-size-range');
        this.fontLabel = document.getElementById('font-size-label');
        this.motionToggle = document.getElementById('reduce-motion-toggle');
        
        this.init();
    }

    init() {
        this.loadSettings();
        this.bindEvents();
    }

    bindEvents() {
        // Toggle Panel
        const toggle = () => {
            this.container.classList.toggle('hidden');
            // Slight delay for animation classes
            if (!this.container.classList.contains('hidden')) {
                setTimeout(() => this.container.classList.add('visible'), 10);
            } else {
                this.container.classList.remove('visible');
            }
        };

        this.trigger?.addEventListener('click', toggle);
        this.closeBtn?.addEventListener('click', toggle);
        this.backdrop?.addEventListener('click', toggle);

        // Font Size Change
        this.fontRange?.addEventListener('input', (e) => {
            this.setFontSize(e.target.value);
        });

        // Motion Toggle
        this.motionToggle?.addEventListener('change', (e) => {
            this.setMotion(e.target.checked);
        });
        
        // Reset
        this.resetBtn?.addEventListener('click', () => this.reset());
    }

    loadSettings() {
        // Font Size
        const savedSize = localStorage.getItem('fontSize') || '2';
        this.fontRange.value = savedSize;
        this.setFontSize(savedSize);

        // Motion
        const savedMotion = localStorage.getItem('reduceMotion') === 'true';
        this.motionToggle.checked = savedMotion;
        this.setMotion(savedMotion); // Initial apply handled by CSS media query usually, but we can force class
    }

    setFontSize(val) {
        // Remove old classes
        document.body.classList.remove('text-scale-1', 'text-scale-2', 'text-scale-3');
        // Add new
        document.body.classList.add(`text-scale-${val}`);
        
        // Update label
        const labels = { '1': 'Mały', '2': 'Normalny', '3': 'Duży' };
        if (this.fontLabel) this.fontLabel.textContent = labels[val];
        
        localStorage.setItem('fontSize', val);
    }

    setMotion(reduced) {
        if (reduced) {
            document.documentElement.classList.add('motion-reduce');
        } else {
            document.documentElement.classList.remove('motion-reduce');
        }
        localStorage.setItem('reduceMotion', reduced);
    }
    
    reset() {
        this.setFontSize('2');
        this.fontRange.value = '2';
        this.setMotion(false);
        this.motionToggle.checked = false;
        
        // Reset theme too (optional)
        // localStorage.removeItem('theme');
        // window.location.reload(); 
    }
}

/**
 * ============================================================================
 * MODULE: CONTACT FORM HANDLER
 * ============================================================================
 */
const initContactForm = () => {
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            const originalContent = submitBtn.innerHTML;
            submitBtn.innerHTML = `
                <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Wysyłanie...
            `;
            submitBtn.disabled = true;

            setTimeout(() => {
                submitBtn.innerHTML = `<span>Wysłano!</span> <i data-lucide="check" width="18" height="18"></i>`;
                lucide.createIcons();
                submitBtn.classList.remove('bg-blue-600', 'hover:bg-blue-700');
                submitBtn.classList.add('bg-green-500', 'hover:bg-green-600');
                
                contactForm.reset();

                setTimeout(() => {
                    submitBtn.innerHTML = originalContent;
                    lucide.createIcons();
                    submitBtn.disabled = false;
                    submitBtn.classList.add('bg-blue-600', 'hover:bg-blue-700');
                    submitBtn.classList.remove('bg-green-500', 'hover:bg-green-600');
                }, 3000);
            }, 1500);
        });
    }
};


/**
 * ============================================================================
 * APP INITIALIZATION
 * ============================================================================
 */
document.addEventListener('DOMContentLoaded', () => {
    // 1. Init Theme
    const themeApp = new ThemeManager();
    
    // 2. Init Navigation
    const navApp = new NavigationController();
    
    // 3. Init Search
    const searchApp = new SearchSystem();
    
    // 4. Init Settings
    const settingsApp = new SettingsManager();
    
    // 5. Init Contact Form
    initContactForm();

    console.log("Yaroslav.dev System Online");
});