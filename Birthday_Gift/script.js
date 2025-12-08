// Simple confetti burst on button click (no libraries)
const canvas = document.getElementById('confetti');
const ctx = canvas.getContext('2d');
let particles = [];
let running = false;

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.addEventListener('resize', resize);

function makeConfetti(x, y, count = 120) {
    const colors = ['#ff6fa5', '#ffd166', '#06d6a0', '#6a5acd', '#f94144'];
    for (let i = 0; i < count; i++) {
        particles.push({
            x, y,
            vx: (Math.random() - 0.5) * 6,
            vy: (Math.random() - 0.5) * 6 - 3,
            g: 0.08 + Math.random() * 0.04,
            size: 2 + Math.random() * 3,
            color: colors[Math.floor(Math.random() * colors.length)],
            life: 90 + Math.random() * 60
        });
    }
    if (!running) {
        running = true;
        requestAnimationFrame(tick);
    }
}

function tick() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
        p.vy += p.g;
        p.x += p.vx;
        p.y += p.vy;
        p.life--;
    });
    particles = particles.filter(p => p.life > 0 && p.y < canvas.height + 10);

    particles.forEach(p => {
        ctx.fillStyle = p.color;
        ctx.fillRect(p.x, p.y, p.size, p.size);
    });

    if (particles.length > 0) {
        requestAnimationFrame(tick);
    } else {
        running = false;
    }
}

document.getElementById('celebrateBtn').addEventListener('click', (e) => {
    const rect = e.target.getBoundingClientRect();
    makeConfetti(rect.left + rect.width / 2, rect.top + window.scrollY);
});