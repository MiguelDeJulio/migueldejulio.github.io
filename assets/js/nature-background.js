/*!
 * Nature Header Background
 * Twilight countryside scene for Miguel De Julio's portfolio.
 * Canvas-based: dark sky, stars, moon, rolling hills, trees,
 * drifting clouds, flying birds, butterflies and fireflies.
 */
(function () {
    'use strict';

    var canvas, ctx, W, H, headerEl;
    var time = 0, animId;
    var isMobile = false;
    var prefersReducedMotion = false;

    var birds = [], butterflies = [], clouds = [], fireflies = [], trees = [];
    var hillPoints1 = [], hillPoints2 = [];

    // ── Stars (fixed positions, computed once) ──────────────────────
    var STAR_DATA = [
        [0.04, 0.04, 1.3], [0.11, 0.09, 0.9], [0.18, 0.03, 1.1], [0.26, 0.07, 0.8],
        [0.33, 0.13, 1.2], [0.40, 0.02, 0.9], [0.47, 0.08, 1.0], [0.54, 0.05, 1.3],
        [0.61, 0.11, 0.8], [0.68, 0.04, 1.1], [0.76, 0.09, 0.9], [0.83, 0.03, 1.2],
        [0.90, 0.07, 0.8], [0.96, 0.13, 1.0], [0.08, 0.19, 0.9], [0.20, 0.22, 1.1],
        [0.35, 0.18, 0.8], [0.50, 0.21, 1.2], [0.65, 0.17, 0.9], [0.78, 0.23, 1.0],
        [0.92, 0.20, 0.8], [0.14, 0.29, 0.9], [0.43, 0.27, 1.1], [0.72, 0.30, 0.8]
    ];

    // ── Init ────────────────────────────────────────────────────────
    function init() {
        canvas = document.getElementById('nn-canvas');
        if (!canvas) return;
        ctx = canvas.getContext('2d');
        headerEl = canvas.parentElement;
        isMobile = window.innerWidth < 768;
        prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        resize();
        buildAll();
        bindEvents();
        prefersReducedMotion ? drawFrame() : animate();
    }

    function resize() {
        var r = headerEl.getBoundingClientRect();
        var dpr = window.devicePixelRatio || 1;
        canvas.width  = r.width  * dpr;
        canvas.height = r.height * dpr;
        canvas.style.width  = r.width  + 'px';
        canvas.style.height = r.height + 'px';
        ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        W = r.width;
        H = r.height;
    }

    function buildAll() {
        buildHills();
        buildTrees();
        buildBirds();
        buildButterflies();
        buildClouds();
        buildFireflies();
    }

    // ── Hills (pre-computed sine wave points) ───────────────────────
    function buildHills() {
        hillPoints1 = [];
        hillPoints2 = [];
        for (var x = 0; x <= W + 10; x += 8) {
            hillPoints1.push(H * 0.67 + Math.sin(x * 0.005 + 0.8) * 44 + Math.sin(x * 0.016 + 1.5) * 20);
            hillPoints2.push(H * 0.78 + Math.sin(x * 0.008 + 2.8) * 32 + Math.sin(x * 0.022 + 0.3) * 16);
        }
    }

    // ── Trees (silhouettes along the near hill) ──────────────────────
    function buildTrees() {
        trees = [];
        var count = isMobile ? 10 : 22;
        var pts = hillPoints1.length;
        for (var i = 0; i < count; i++) {
            var frac = i / count;
            var xi = Math.floor(frac * (pts - 1));
            var baseX = xi * 8 + (Math.random() - 0.5) * 50;
            var baseY = hillPoints1[Math.max(0, Math.min(pts - 1, xi))];
            trees.push({
                x: baseX,
                y: baseY,
                h: 22 + Math.random() * 38,
                w: 8  + Math.random() * 12,
                pine: Math.random() < 0.65
            });
        }
    }

    // ── Birds ────────────────────────────────────────────────────────
    function buildBirds() {
        birds = [];
        var count = isMobile ? 7 : 14;
        for (var i = 0; i < count; i++) {
            birds.push({
                x:         Math.random() * W * 1.4 - W * 0.2,
                y:         H * 0.06 + Math.random() * H * 0.32,
                speed:     0.35 + Math.random() * 1.1,
                size:      4 + Math.random() * 7,
                wingPhase: Math.random() * Math.PI * 2,
                wingSpeed: 0.055 + Math.random() * 0.045
            });
        }
    }

    // ── Butterflies ─────────────────────────────────────────────────
    function buildButterflies() {
        butterflies = [];
        var count = isMobile ? 4 : 8;
        var colors = ['#FF6B9D', '#FFD93D', '#6BCB77', '#4D96FF', '#FF9F1C', '#C77DFF', '#80FFDB', '#FF6348'];
        for (var i = 0; i < count; i++) {
            butterflies.push({
                x:            Math.random() * W,
                y:            H * 0.48 + Math.random() * H * 0.38,
                speedX:       (Math.random() - 0.5) * 0.75,
                speedY:       (Math.random() - 0.5) * 0.38,
                wingPhase:    Math.random() * Math.PI * 2,
                wingSpeed:    0.075 + Math.random() * 0.055,
                size:         6 + Math.random() * 6,
                color:        colors[i % colors.length],
                bobPhase:     Math.random() * Math.PI * 2,
                turnTimer:    0,
                turnInterval: 80 + Math.random() * 130
            });
        }
    }

    // ── Clouds ───────────────────────────────────────────────────────
    function buildClouds() {
        clouds = [];
        var count = isMobile ? 4 : 8;
        for (var i = 0; i < count; i++) {
            clouds.push({
                x:     Math.random() * W * 1.6 - W * 0.3,
                y:     H * 0.07 + Math.random() * H * 0.28,
                speed: 0.07 + Math.random() * 0.14,
                scale: 0.45 + Math.random() * 0.85,
                alpha: 0.10 + Math.random() * 0.13
            });
        }
    }

    // ── Fireflies ────────────────────────────────────────────────────
    function buildFireflies() {
        fireflies = [];
        var count = isMobile ? 12 : 28;
        for (var i = 0; i < count; i++) {
            fireflies.push({
                x:         Math.random() * W,
                y:         H * 0.54 + Math.random() * H * 0.42,
                vx:        (Math.random() - 0.5) * 0.28,
                vy:        (Math.random() - 0.5) * 0.28,
                glowPhase: Math.random() * Math.PI * 2,
                glowSpeed: 0.018 + Math.random() * 0.028,
                r:         0.8 + Math.random() * 1.4
            });
        }
    }

    // ── Events ───────────────────────────────────────────────────────
    function bindEvents() {
        var rto;
        window.addEventListener('resize', function () {
            clearTimeout(rto);
            rto = setTimeout(function () {
                isMobile = window.innerWidth < 768;
                resize();
                buildAll();
            }, 200);
        });
        document.addEventListener('visibilitychange', function () {
            if (prefersReducedMotion) return;
            document.hidden ? cancelAnimationFrame(animId) : animate();
        });
    }

    // ── Update ───────────────────────────────────────────────────────
    function update() {
        time++;

        birds.forEach(function (b) {
            b.x += b.speed;
            b.wingPhase += b.wingSpeed;
            if (b.x > W + 70) {
                b.x = -70;
                b.y = H * 0.06 + Math.random() * H * 0.32;
                b.speed = 0.35 + Math.random() * 1.1;
            }
        });

        butterflies.forEach(function (bf) {
            bf.x += bf.speedX;
            bf.y += bf.speedY + Math.sin(bf.bobPhase) * 0.22;
            bf.wingPhase += bf.wingSpeed;
            bf.bobPhase  += 0.038;
            bf.turnTimer++;
            if (bf.turnTimer >= bf.turnInterval) {
                bf.speedX       = (Math.random() - 0.5) * 0.75;
                bf.speedY       = (Math.random() - 0.5) * 0.38;
                bf.turnTimer    = 0;
                bf.turnInterval = 80 + Math.random() * 130;
            }
            if (bf.x < -25) bf.x = W + 25;
            if (bf.x > W + 25) bf.x = -25;
            if (bf.y < H * 0.42) bf.speedY = Math.abs(bf.speedY) + 0.08;
            if (bf.y > H * 0.89) bf.speedY = -Math.abs(bf.speedY) - 0.08;
        });

        clouds.forEach(function (c) {
            c.x += c.speed;
            if (c.x > W + 220) c.x = -220;
        });

        fireflies.forEach(function (f) {
            f.x += f.vx;
            f.y += f.vy;
            f.glowPhase += f.glowSpeed;
            if (f.x < 0 || f.x > W) f.vx *= -1;
            if (f.y < H * 0.54 || f.y > H) f.vy *= -1;
        });
    }

    // ── Draw helpers ─────────────────────────────────────────────────
    function drawBackground() {
        var sky = ctx.createLinearGradient(0, 0, 0, H * 0.78);
        sky.addColorStop(0,    '#06090f'); // near-black top — keeps text white & readable
        sky.addColorStop(0.22, '#0b1a30'); // deep navy
        sky.addColorStop(0.50, '#122840'); // dark blue
        sky.addColorStop(0.72, '#1a3d30'); // dark teal-green transition to ground
        sky.addColorStop(1,    '#152b21');
        ctx.fillStyle = sky;
        ctx.fillRect(0, 0, W, H);

        // Subtle warm horizon glow (sunset remnant)
        var hy = H * 0.66;
        var hg = ctx.createRadialGradient(W * 0.5, hy, 0, W * 0.5, hy, W * 0.55);
        hg.addColorStop(0,   'rgba(255, 140, 50, 0.07)');
        hg.addColorStop(0.5, 'rgba(220, 80, 20, 0.03)');
        hg.addColorStop(1,   'rgba(0, 0, 0, 0)');
        ctx.fillStyle = hg;
        ctx.fillRect(0, hy - H * 0.18, W, H * 0.36);

        // Ground fill
        var grd = ctx.createLinearGradient(0, H * 0.72, 0, H);
        grd.addColorStop(0, '#152b21');
        grd.addColorStop(1, '#0a1a10');
        ctx.fillStyle = grd;
        ctx.fillRect(0, H * 0.72, W, H);
    }

    function drawStars() {
        for (var i = 0; i < STAR_DATA.length; i++) {
            var s = STAR_DATA[i];
            var alpha = 0.25 + 0.55 * Math.abs(Math.sin(time * 0.011 + i * 1.7));
            ctx.beginPath();
            ctx.arc(s[0] * W, s[1] * H, s[2], 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(210, 225, 255, ' + alpha + ')';
            ctx.fill();
        }
    }

    function drawMoon() {
        var mx = W * 0.83, my = H * 0.13;
        // Outer glow
        var g = ctx.createRadialGradient(mx, my, 0, mx, my, 90);
        g.addColorStop(0,   'rgba(220, 215, 170, 0.10)');
        g.addColorStop(0.4, 'rgba(200, 195, 140, 0.04)');
        g.addColorStop(1,   'rgba(0, 0, 0, 0)');
        ctx.fillStyle = g;
        ctx.beginPath(); ctx.arc(mx, my, 90, 0, Math.PI * 2); ctx.fill();

        // Moon disc
        ctx.fillStyle = '#ddd8a8';
        ctx.beginPath(); ctx.arc(mx, my, 19, 0, Math.PI * 2); ctx.fill();

        // Crescent cutout
        ctx.fillStyle = '#0b1a30';
        ctx.beginPath(); ctx.arc(mx + 7, my - 3, 15, 0, Math.PI * 2); ctx.fill();
    }

    function drawCloud(c) {
        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.scale(c.scale, c.scale * 0.58);
        ctx.fillStyle = 'rgba(170, 195, 230, ' + c.alpha + ')';
        var blobs = [[0, 0, 26], [30, -7, 21], [56, 2, 24], [82, -5, 19], [18, 9, 17], [62, 9, 17]];
        for (var i = 0; i < blobs.length; i++) {
            ctx.beginPath(); ctx.arc(blobs[i][0], blobs[i][1], blobs[i][2], 0, Math.PI * 2); ctx.fill();
        }
        ctx.restore();
    }

    function drawHills() {
        var step = 8;

        // Far hill — darkest
        ctx.fillStyle = '#0f2218';
        ctx.beginPath(); ctx.moveTo(0, H);
        for (var i = 0; i < hillPoints2.length; i++) ctx.lineTo(i * step, hillPoints2[i]);
        ctx.lineTo(W, H); ctx.closePath(); ctx.fill();

        // Near hill — slightly lighter, trees sit on this
        ctx.fillStyle = '#182e22';
        ctx.beginPath(); ctx.moveTo(0, H);
        for (var j = 0; j < hillPoints1.length; j++) ctx.lineTo(j * step, hillPoints1[j]);
        ctx.lineTo(W, H); ctx.closePath(); ctx.fill();
    }

    function drawTrees() {
        ctx.fillStyle = '#0c1c12';
        trees.forEach(function (t) {
            if (t.pine) {
                ctx.beginPath();
                ctx.moveTo(t.x, t.y - t.h);
                ctx.lineTo(t.x - t.w * 0.5, t.y);
                ctx.lineTo(t.x + t.w * 0.5, t.y);
                ctx.closePath(); ctx.fill();
                ctx.fillRect(t.x - 1.5, t.y, 3, t.h * 0.22);
            } else {
                ctx.beginPath(); ctx.arc(t.x, t.y - t.h * 0.58, t.w * 0.52, 0, Math.PI * 2); ctx.fill();
                ctx.fillRect(t.x - 2, t.y - t.h * 0.18, 4, t.h * 0.28);
            }
        });
    }

    function drawFireflies() {
        fireflies.forEach(function (f) {
            var alpha = 0.35 + 0.65 * Math.abs(Math.sin(f.glowPhase));
            var g = ctx.createRadialGradient(f.x, f.y, 0, f.x, f.y, f.r * 6);
            g.addColorStop(0, 'rgba(170, 255, 90, ' + (alpha * 0.55) + ')');
            g.addColorStop(1, 'rgba(170, 255, 90, 0)');
            ctx.beginPath(); ctx.arc(f.x, f.y, f.r * 6, 0, Math.PI * 2);
            ctx.fillStyle = g; ctx.fill();
            ctx.beginPath(); ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2);
            ctx.fillStyle = 'rgba(200, 255, 130, ' + alpha + ')'; ctx.fill();
        });
    }

    function drawBird(b) {
        var wingY = Math.sin(b.wingPhase) * b.size * 0.88;
        ctx.strokeStyle = 'rgba(210, 225, 255, 0.72)';
        ctx.lineWidth = 1.2;
        ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(b.x, b.y);
        ctx.quadraticCurveTo(b.x - b.size * 0.62, b.y - wingY, b.x - b.size * 1.28, b.y + wingY * 0.18);
        ctx.moveTo(b.x, b.y);
        ctx.quadraticCurveTo(b.x + b.size * 0.62, b.y - wingY, b.x + b.size * 1.28, b.y + wingY * 0.18);
        ctx.stroke();
    }

    function drawButterfly(bf) {
        var s    = bf.size;
        var open = Math.abs(Math.sin(bf.wingPhase));
        ctx.save();
        ctx.translate(bf.x, bf.y);

        // Upper wings
        ctx.globalAlpha = 0.82;
        ctx.fillStyle = bf.color;
        ctx.beginPath(); ctx.ellipse(-s * open * 0.88, -s * 0.32, s * open, s * 0.52, -0.22, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.ellipse( s * open * 0.88, -s * 0.32, s * open, s * 0.52,  0.22, 0, Math.PI * 2); ctx.fill();

        // Lower wings (slightly smaller)
        ctx.globalAlpha = 0.58;
        ctx.beginPath(); ctx.ellipse(-s * open * 0.62, s * 0.28, s * open * 0.52, s * 0.36, 0.28, 0, Math.PI * 2); ctx.fill();
        ctx.beginPath(); ctx.ellipse( s * open * 0.62, s * 0.28, s * open * 0.52, s * 0.36, -0.28, 0, Math.PI * 2); ctx.fill();

        // Body
        ctx.globalAlpha = 1;
        ctx.fillStyle = '#2a1500';
        ctx.beginPath(); ctx.ellipse(0, 0, 1.5, s * 0.42, 0, 0, Math.PI * 2); ctx.fill();

        ctx.restore();
    }

    function drawVignette() {
        var cx = W / 2, cy = H / 2;
        var outerR = Math.sqrt(cx * cx + cy * cy);
        var g = ctx.createRadialGradient(cx, cy, outerR * 0.28, cx, cy, outerR);
        g.addColorStop(0, 'rgba(6, 9, 15, 0)');
        g.addColorStop(1, 'rgba(6, 9, 15, 0.52)');
        ctx.fillStyle = g;
        ctx.fillRect(0, 0, W, H);
    }

    // ── Main loop ────────────────────────────────────────────────────
    function drawFrame() {
        ctx.clearRect(0, 0, W, H);
        drawBackground();
        drawStars();
        drawMoon();
        clouds.forEach(drawCloud);
        drawHills();
        drawTrees();
        drawFireflies();
        birds.forEach(drawBird);
        butterflies.forEach(drawButterfly);
        drawVignette();
    }

    function animate() {
        drawFrame();
        update();
        animId = requestAnimationFrame(animate);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
