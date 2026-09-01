document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('.nav-link');
    const pageViews = document.querySelectorAll('.page-view');

    function switchView(targetId) {
        const targetView = document.getElementById(targetId) ? targetId : 'home';

        pageViews.forEach(view => {
            if (view.id === targetView) {
                view.classList.add('active');
            } else {
                view.classList.remove('active');
            }
        });

        navLinks.forEach(link => {
            const href = link.getAttribute('href').replace('#', '');
            if (href === targetView) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        window.scrollTo({ top: 0, behavior: 'instant' });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            const targetId = link.getAttribute('href').replace('#', '');
            switchView(targetId);
        });
    });

    const initialHash = window.location.hash.replace('#', '');
    if (initialHash) {
        switchView(initialHash);
    }
});