/**
 * ============================================================================
 * Yaroslav.dev - Core Application Logic
 * ============================================================================
 */

lucide.createIcons();

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
        this.buttons.forEach(btn => {
            btn.addEventListener('click', () => {
                const theme = btn.dataset.value;
                this.setTheme(theme);
            });
        });
        if (this.quickToggle) {
            this.quickToggle.addEventListener('click', () => {
                const isDark = this.html.classList.contains('dark');
                this.setTheme(isDark ? 'light' : 'dark');
            });
        }
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
            if (this.currentTheme === 'system') this.applyTheme('system');
        });
    }
    setTheme(theme) {
        this.currentTheme = theme;
        localStorage.setItem('theme', theme);
        this.applyTheme(theme);
    }
    applyTheme(theme) {
        this.buttons.forEach(btn => btn.classList.toggle('active', btn.dataset.value === theme));
        if (theme === 'dark' || (theme === 'system' && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            this.html.classList.add('dark');
        } else {
            this.html.classList.remove('dark');
        }
    }
}

class NavigationController {
    constructor() {
        this.header = document.getElementById('main-nav-wrapper');
        this.navbar = document.getElementById('main-navbar');
        this.topBar = document.getElementById('top-utility-bar');
        this.drawer = document.getElementById('mobile-drawer');
        this.trigger = document.getElementById('mobile-menu-trigger');
        this.closeBtn = document.getElementById('mobile-close-btn');
        this.backdrop = document.getElementById('mobile-backdrop');
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
            if (currentScrollY > 20) {
                this.navbar?.classList.add('bg-white/90', 'dark:bg-slate-900/90', 'shadow-md');
                this.navbar?.classList.remove('bg-white/5', 'border-white/10');
            } else {
                this.navbar?.classList.remove('bg-white/90', 'dark:bg-slate-900/90', 'shadow-md');
                this.navbar?.classList.add('bg-white/5', 'border-white/10');
            }
            if (currentScrollY > this.lastScrollY && currentScrollY > 100) {
                if (this.header) this.header.style.transform = 'translateY(-100%)';
            } else {
                if (this.header) this.header.style.transform = 'translateY(0)';
            }
            this.lastScrollY = currentScrollY;
        });
    }
    bindMobileMenu() {
        const toggleMenu = () => {
            if (!this.drawer) return;
            const isOpen = this.drawer.classList.contains('drawer-open');
            if (isOpen) {
                this.drawer.classList.remove('drawer-open');
                document.body.style.overflow = '';
            } else {
                this.drawer.classList.add('drawer-open');
                document.body.style.overflow = 'hidden';
            }
        };
        this.trigger?.addEventListener('click', toggleMenu);
        this.closeBtn?.addEventListener('click', toggleMenu);
        this.backdrop?.addEventListener('click', toggleMenu);
    }
}

class SearchSystem {
    constructor() {
        this.container = document.getElementById('search-modal-container');
        this.trigger = document.getElementById('search-trigger');
        this.closeBtn = document.getElementById('close-search');
        this.input = document.getElementById('global-search-input');
        this.resultsContainer = document.getElementById('results-list');
        this.backdrop = document.getElementById('search-backdrop');
        this.index = [
            { title: 'Start', url: 'index.html#hero', type: 'Sekcja' },
            { title: 'O mnie', url: 'index.html#about', type: 'Sekcja' },
            { title: 'Umiejętności', url: 'index.html#skills', type: 'Sekcja' },
            { title: 'Projekty', url: 'index.html#projects', type: 'Sekcja' },
            { title: 'Kontakt', url: 'index.html#contact', type: 'Sekcja' },
            { title: 'Edytor Tekstu', url: 'editor.html', type: 'Narzędzie' },
            { title: 'HTML5', url: 'index.html#skills', type: 'Język' },
            { title: 'CSS3', url: 'index.html#skills', type: 'Język' },
            { title: 'JavaScript', url: 'index.html#skills', type: 'Język' },
            { title: 'PHP', url: 'index.html#skills', type: 'Język' },
            { title: 'MySQL', url: 'index.html#skills', type: 'Technologia' },
            { title: 'Python', url: 'index.html#skills', type: 'Język' },
            { title: 'C', url: 'index.html#skills', type: 'Język' },
            { title: 'C++', url: 'index.html#skills', type: 'Język' },
            { title: 'C#', url: 'index.html#skills', type: 'Język' },
            { title: 'AI Ping Pong', url: 'pong.html', type: 'Gra' },
            { title: 'Russian Checkers AI', url: 'checkers.html', type: 'Gra' },
            { title: '2D City Taxi', url: 'taxi.html', type: 'Gra' },
            { title: 'Loto Blast', url: 'loto.html', type: 'Gra' },
            { title: '2D Uno', url: 'uno.html', type: 'Gra' }
        ];
        this.init();
    }
    init() {
        this.trigger?.addEventListener('click', () => this.open());
        this.closeBtn?.addEventListener('click', () => this.close());
        this.backdrop?.addEventListener('click', () => this.close());
        this.input?.addEventListener('input', (e) => this.handleSearch(e.target.value));
    }
    open() {
        this.container.classList.remove('hidden');
        setTimeout(() => { this.container.style.opacity = '1'; }, 10);
        this.input.focus();
        document.body.style.overflow = 'hidden';
    }
    close() {
        this.container.style.opacity = '0';
        setTimeout(() => { this.container.classList.add('hidden'); }, 200);
        document.body.style.overflow = '';
    }
    handleSearch(query) {
        if (!query) { this.resultsContainer.innerHTML = ''; return; }
        const results = this.index.filter(item => item.title.toLowerCase().includes(query.toLowerCase()));
        this.renderResults(results);
    }
    renderResults(results) {
        this.resultsContainer.innerHTML = '';
        this.resultsContainer.classList.remove('hidden');
        results.forEach(res => {
            const li = document.createElement('li');
            li.innerHTML = `<a href="${res.url}" class="block p-3 hover:bg-blue-50 dark:hover:bg-slate-700 rounded-lg text-sm">${res.title} <span class="text-xs text-slate-400 float-right">${res.type}</span></a>`;
            li.addEventListener('click', () => this.close());
            this.resultsContainer.appendChild(li);
        });
    }
}

const initContactForm = () => {
    const contactForm = document.getElementById('contact-form');
    const submitBtn = document.getElementById('submit-btn');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const originalContent = submitBtn.innerHTML;
            submitBtn.innerHTML = `Wysyłanie...`;
            submitBtn.disabled = true;
            setTimeout(() => {
                submitBtn.innerHTML = `Wysłano! <i data-lucide="check" width="18" height="18"></i>`;
                lucide.createIcons();
                contactForm.reset();
                setTimeout(() => {
                    submitBtn.innerHTML = originalContent;
                    submitBtn.disabled = false;
                    lucide.createIcons();
                }, 3000);
            }, 1500);
        });
    }
};

document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    new NavigationController();
    new SearchSystem();
    initContactForm();
    console.log("Yaroslav.dev System Online");
});