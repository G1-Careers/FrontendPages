/**
 * G1Careers - Shared Component Loader
 * Injects shared header and footer into every page.
 * Also sets the "current" active nav link based on the current page filename.
 */
(function () {
    const BASE = 'shared/';

    // Determine current page filename
    function currentPage() {
        const path = window.location.pathname;
        const file = path.split('/').pop();
        return file || 'index.html';
    }

    // Inject HTML string into a placeholder element
    function inject(placeholderId, html) {
        const el = document.getElementById(placeholderId);
        if (el) el.outerHTML = html;
    }

    // Mark the active nav link
    function setActiveNav() {
        const page = currentPage();
        document.querySelectorAll('#main-nav li a').forEach(function (link) {
            const href = link.getAttribute('href');
            if (href === page) {
                link.parentElement.classList.add('current');
            }
        });
    }

    // Fetch a shared partial and inject it
    function loadPartial(url, placeholderId, callback) {
        fetch(url)
            .then(function (r) { return r.text(); })
            .then(function (html) {
                inject(placeholderId, html);
                if (callback) callback();
            })
            .catch(function (err) {
                console.warn('G1Careers: Could not load partial ' + url, err);
            });
    }

    document.addEventListener('DOMContentLoaded', function () {
        loadPartial(BASE + 'header.html', 'header-placeholder', setActiveNav);
        loadPartial(BASE + 'footer.html', 'footer-placeholder');
    });
})();
