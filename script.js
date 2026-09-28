document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('particle-canvas');
    const ctx = canvas.getContext('2d');
    const particles = [];

    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    class Particle {
        constructor() {
            this.reset();
        }

        reset() {
            this.x = Math.random() * canvas.width;
            this.y = Math.random() * canvas.height;
            this.size = Math.random() * 2 + 0.5;
            this.speedY = -(Math.random() * 0.5 + 0.1);
            this.speedX = (Math.random() - 0.5) * 0.2;
            this.color = Math.random() > 0.5 ? 'rgba(212, 175, 55, ' : 'rgba(0, 204, 136, ';
            this.opacity = Math.random() * 0.5 + 0.15;
        }

        update() {
            this.y += this.speedY;
            this.x += this.speedX;
            if (this.y < 0) this.reset();
        }

        draw() {
            ctx.fillStyle = this.color + this.opacity + ')';
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
            ctx.fill();
        }
    }

    for (let i = 0; i < 65; i += 1) {
        particles.push(new Particle());
    }

    function animateParticles() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        particles.forEach((particle) => {
            particle.update();
            particle.draw();
        });
        requestAnimationFrame(animateParticles);
    }

    animateParticles();

    const menuBtn = document.getElementById('mobile-menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    menuBtn.addEventListener('click', () => mobileMenu.classList.toggle('hidden'));

    const filterBtns = document.querySelectorAll('.filter-btn');
    const rosterCards = document.querySelectorAll('.roster-card');
    filterBtns.forEach((btn) => {
        btn.addEventListener('click', () => {
            filterBtns.forEach((filterBtn) => {
                filterBtn.classList.remove('btn-gold-shimmer', 'text-emerald-1000');
                filterBtn.classList.add('mythic-panel', 'text-gray-300');
            });

            btn.classList.add('btn-gold-shimmer', 'text-emerald-1000');
            btn.classList.remove('mythic-panel', 'text-gray-300');

            const filter = btn.getAttribute('data-filter');
            rosterCards.forEach((card) => {
                const categories = card.getAttribute('data-category').split(' ');
                card.style.display = filter === 'all' || categories.includes(filter) ? 'block' : 'none';
            });
        });
    });

    const recruitmentForm = document.getElementById('recruitment-form');
    const formToast = document.getElementById('form-toast');
    recruitmentForm.addEventListener('submit', (event) => {
        event.preventDefault();
        recruitmentForm.reset();
        formToast.classList.remove('hidden');
        setTimeout(() => formToast.classList.add('hidden'), 5000);
    });

    let isMuted = true;
    const audioToggle = document.getElementById('audio-toggle');
    const audioIcon = document.getElementById('audio-icon');

    function toggleAudio() {
        isMuted = !isMuted;
        const iconClass = isMuted
            ? 'fa-solid fa-volume-xmark text-sm'
            : 'fa-solid fa-volume-high text-sm text-emerald-400';
        audioIcon.className = iconClass;
        document.getElementById('audio-icon-mobile').className = iconClass;
    }

    audioToggle.addEventListener('click', toggleAudio);
    document.getElementById('audio-toggle-mobile').addEventListener('click', toggleAudio);
});

function openMemberModal(name, badge, role, img, weapon, details = '') {
    document.getElementById('modal-name').innerText = name;
    document.getElementById('modal-badge').innerText = badge;
    document.getElementById('modal-role').innerText = role;
    document.getElementById('modal-img').src = img;
    document.getElementById('modal-weapon').innerText = 'Favored Gear: ' + weapon;
    document.getElementById('modal-details').innerText = details || `${role} brings focused discipline and tactical expertise to the squad. Favored gear: ${weapon}.`;
    document.getElementById('member-modal').classList.remove('hidden');
}

function closeMemberModal() {
    document.getElementById('member-modal').classList.add('hidden');
}
