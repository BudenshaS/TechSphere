
/* =========================================================
   TECHSPHERE | WEBSITE INTERACTIVITY & SEO UX
   ========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    // ========================================
    // 1. AUTOMATIC COPYRIGHT YEAR
    // ========================================

    const yearElement = document.getElementById("year");

    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }


    // ========================================
    // 2. MOBILE NAVIGATION
    // ========================================

    const menuToggle = document.getElementById("menu-toggle");
    const navMenu = document.getElementById("nav-menu");

    function closeMenu() {
        if (!menuToggle || !navMenu) return;

        menuToggle.classList.remove("open");
        navMenu.classList.remove("open");
        menuToggle.setAttribute("aria-expanded", "false");
    }

    if (menuToggle && navMenu) {

        menuToggle.addEventListener("click", () => {
            const isOpen = navMenu.classList.toggle("open");

            menuToggle.classList.toggle("open", isOpen);
            menuToggle.setAttribute("aria-expanded", String(isOpen));
        });

        navMenu.querySelectorAll("a").forEach(link => {
            link.addEventListener("click", closeMenu);
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 760) {
                closeMenu();
            }
        });
    }


    // ========================================
    // 3. NAVBAR SCROLL EFFECT
    // ========================================

    const navbar = document.getElementById("navbar");

    function updateNavbar() {
        if (!navbar) return;

        navbar.style.background = window.scrollY > 30
            ? "rgba(8,11,20,0.96)"
            : "rgba(8,11,20,0.82)";
    }

    window.addEventListener("scroll", updateNavbar, { passive: true });


    // ========================================
    // 4. SCROLL PROGRESS BAR
    // ========================================

    const progressBar = document.getElementById("scroll-progress");

    function updateProgress() {
        if (!progressBar) return;

        const scrollTop = window.scrollY;
        const documentHeight =
            document.documentElement.scrollHeight - window.innerHeight;

        const progress = documentHeight > 0
            ? (scrollTop / documentHeight) * 100
            : 0;

        progressBar.style.width =
            Math.min(100, Math.max(0, progress)) + "%";
    }

    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);


    // ========================================
    // 5. BACK TO TOP
    // ========================================

    const backToTop = document.getElementById("back-to-top");

    function updateBackToTop() {
        if (!backToTop) return;

        backToTop.classList.toggle("visible", window.scrollY > 400);
    }

    if (backToTop) {
        backToTop.addEventListener("click", () => {
            window.scrollTo({
                top: 0,
                behavior: window.matchMedia(
                    "(prefers-reduced-motion: reduce)"
                ).matches ? "instant" : "smooth"
            });
        });

        window.addEventListener("scroll", updateBackToTop, { passive: true });
    }


    // ========================================
    // 6. REVEAL ANIMATIONS
    // ========================================

    const revealElements = document.querySelectorAll(".reveal");

    if ("IntersectionObserver" in window) {

        const revealObserver = new IntersectionObserver(
            (entries, observer) => {

                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add("visible");
                        observer.unobserve(entry.target);
                    }
                });

            },
            {
                threshold: 0.12
            }
        );

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });

    } else {

        revealElements.forEach(element => {
            element.classList.add("visible");
        });
    }


    // ========================================
    // 7. SEARCH MODAL
    // ========================================

    const searchModal = document.getElementById("search-modal");
    const openSearchButton = document.getElementById("open-search");
    const openSearchArticles = document.getElementById("open-search-articles");
    const closeSearchButton = document.getElementById("close-search");
    const searchOverlay = document.getElementById("search-overlay");
    const searchInput = document.getElementById("site-search");
    const searchResults = document.getElementById("search-results");

    const searchData = [
        {
            title: "What Is Artificial Intelligence?",
            category: "Artificial Intelligence",
            description: "Explore AI concepts, applications and intelligent systems.",
            url: "articles/what-is-ai.html",
            keywords: "ai artificial intelligence intelligent systems neural networks"
        },
        {
            title: "Python for Beginners",
            category: "Programming",
            description: "Learn Python programming basics and coding fundamentals.",
            url: "articles/python-for-beginners.html",
            keywords: "python programming coding beginner variables loops functions"
        },
        {
            title: "Machine Learning Explained",
            category: "Machine Learning",
            description: "Discover algorithms, data and machine learning fundamentals.",
            url: "articles/machine-learning-for-beginners.html",
            keywords: "machine learning ml algorithms data supervised unsupervised"
        },
        {
            title: "Cybersecurity for Beginners",
            category: "Cybersecurity",
            description: "Explore digital security, protection and online safety.",
            url: "articles/cybersecurity-for-beginners.html",
            keywords: "cybersecurity cyber security safety privacy protection"
        },
        {
            title: "Web Development Fundamentals",
            category: "Web Development",
            description: "Learn about HTML, CSS, JavaScript and websites.",
            url: "articles/web-development-for-beginners.html",
            keywords: "web development html css javascript website frontend"
        },
        {
            title: "Future Technology",
            category: "Emerging Technology",
            description: "Discover innovations shaping the future.",
            url: "articles/future-technology-for-beginners.html",
            keywords: "future technology innovation robotics quantum emerging"
        }
    ];


    function openSearch() {

        if (!searchModal) return;

        searchModal.classList.add("active");
        searchModal.setAttribute("aria-hidden", "false");
        document.body.classList.add("search-open");

        if (searchInput) {
            searchInput.value = "";
            searchInput.focus();
        }

        if (searchResults) {
            searchResults.innerHTML =
                '<p class="search-hint">Search AI, Python, cybersecurity, machine learning...</p>';
        }
    }


    function closeSearch() {

        if (!searchModal) return;

        searchModal.classList.remove("active");
        searchModal.setAttribute("aria-hidden", "true");
        document.body.classList.remove("search-open");
    }


    if (openSearchButton) {
        openSearchButton.addEventListener("click", openSearch);
    }

    if (openSearchArticles) {
        openSearchArticles.addEventListener("click", openSearch);
    }

    if (closeSearchButton) {
        closeSearchButton.addEventListener("click", closeSearch);
    }

    if (searchOverlay) {
        searchOverlay.addEventListener("click", closeSearch);
    }


    // ========================================
    // 8. SEARCH RESULTS
    // ========================================

    function performSearch(query) {

        if (!searchResults) return;

        const normalizedQuery = query.trim().toLowerCase();

        if (!normalizedQuery) {
            searchResults.innerHTML =
                '<p class="search-hint">Search AI, Python, cybersecurity, machine learning...</p>';
            return;
        }

        const searchTerms = normalizedQuery.split(/\s+/);

        const results = searchData.filter(article => {

            const searchableText = (
                article.title + " " +
                article.category + " " +
                article.description + " " +
                article.keywords
            ).toLowerCase();

            return searchTerms.every(term => searchableText.includes(term));
        });


        if (results.length === 0) {

            searchResults.innerHTML = `
                <div class="no-results show">
                    <div class="no-results-icon">⌕</div>
                    <h3>No articles found</h3>
                    <p>Try another technology keyword.</p>
                </div>
            `;

            return;
        }


        searchResults.innerHTML = results.map(article => `
            <a class="search-result-item" href="${article.url}">
                <small>${article.category}</small>
                <strong>${article.title}</strong>
                <p>${article.description}</p>
            </a>
        `).join("");
    }


    if (searchInput) {

        searchInput.addEventListener("input", () => {
            performSearch(searchInput.value);
        });

        searchInput.addEventListener("keydown", event => {

            if (event.key === "Enter") {

                const firstResult = searchResults?.querySelector(
                    ".search-result-item"
                );

                if (firstResult) {
                    window.location.href = firstResult.href;
                }
            }
        });
    }


    // ========================================
    // 9. ESCAPE KEY
    // ========================================

    document.addEventListener("keydown", event => {

        if (event.key === "Escape") {
            closeSearch();
            closeMenu();
        }
    });


    // ========================================
    // 10. HOMEPAGE ARTICLE FILTER
    // ========================================

    const articleCards = document.querySelectorAll(".article-card");
    const articleCount = document.getElementById("article-count");
    const noResults = document.getElementById("no-results");

    function filterArticles(query) {

        let visibleCount = 0;

        articleCards.forEach(card => {

            const title = (card.dataset.title || "").toLowerCase();
            const content = card.textContent.toLowerCase();

            const match = query.split(/\s+/).every(term =>
                title.includes(term) || content.includes(term)
            );

            card.style.display = match ? "" : "none";

            if (match) {
                visibleCount++;
            }
        });

        if (articleCount) {
            articleCount.textContent = visibleCount;
        }

        if (noResults) {
            noResults.classList.toggle("show", visibleCount === 0);
        }
    }


    // ========================================
    // 11. FILTER HOMEPAGE ARTICLES
    // ========================================

    if (searchInput && articleCards.length > 0) {

        searchInput.addEventListener("input", () => {

            const query = searchInput.value.trim().toLowerCase();

            filterArticles(query);
        });
    }


    // ========================================
    // 12. ACTIVE NAVIGATION LINKS
    // ========================================

    const navLinks = document.querySelectorAll(".nav-link");

    navLinks.forEach(link => {

        link.addEventListener("click", () => {

            navLinks.forEach(navLink => {
                navLink.classList.remove("active");
            });

            link.classList.add("active");
        });
    });


    // ========================================
    // 13. IMAGE FALLBACK
    // ========================================

    document.querySelectorAll("img").forEach(image => {

        image.addEventListener("error", () => {
            image.style.opacity = "0.3";
        });
    });


    // ========================================
    // 14. INITIALIZATION
    // ========================================

    updateNavbar();
    updateProgress();
    updateBackToTop();

    console.log("TechSphere website initialized successfully.");

});
