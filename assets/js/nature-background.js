/*!
 * Nature Header Background
 * Twilight/night scene on dark theme; sunny day scene on light theme.
 * Switches automatically when the user toggles the site theme.
 */
(function () {
    'use strict';

    var canvas, ctx, W, H, headerEl;
    var time = 0, animId;
    var isMobile = false;
    var prefersReducedMotion = false;

    var birds = [], deer = [], rabbits = [], clouds = [], fireflies = [], trees = [];
    var hillPoints1 = [], hillPoints2 = [];
    var HILL_STEP = 8;

    // ── Palette (swapped on theme change) ───────────────────────────
    var P = {};

    function isDark() {
        return document.documentElement.getAttribute('data-theme') !== 'light';
    }

    function applyPalette() {
        if (isDark()) {
            P = {
                sky: [
                    [0,    '#06090f'],
                    [0.22, '#0b1a30'],
                    [0.50, '#122840'],
                    [0.72, '#1a3d30'],
                    [1,    '#152b21']
                ],
                horizonGlow:  'rgba(255, 140, 50, 0.07)',
                horizonGlow2: 'rgba(220, 80, 20, 0.03)',
                groundTop: '#152b21', groundBot: '#0a1a10',
                hillFar:  '#0f2218', hillNear: '#182e22',
                trees:    '#0c1c12', animals:  '#0b1a10',
                cloud:    [170, 195, 230], cloudAlpha: 1.0,
                birdColor: 'rgba(210, 225, 255, 0.72)',
                vignette:  'rgba(6, 9, 15, 0.52)',
                moon: true, sun: false, stars: true, flies: true
            };
        } else {
            P = {
                sky: [
                    [0,    '#1565a8'],
                    [0.28, '#4aaee0'],
                    [0.60, '#87ceeb'],
                    [0.78, '#c6e8f5'],
                    [1,    '#4a8c3f']
                ],
                horizonGlow:  'rgba(255, 220, 140, 0.14)',
                horizonGlow2: 'rgba(255, 180, 80, 0.07)',
                groundTop: '#4a8c3f', groundBot: '#3a7030',
                hillFar:  '#4a7a3a', hillNear: '#5a9148',
                trees:    '#2d5a22', animals:  '#1a3d12',
                cloud:    [255, 255, 255], cloudAlpha: 3.2,
                birdColor: 'rgba(20, 50, 100, 0.68)',
                vignette:  'rgba(0, 20, 60, 0.06)',
                moon: false, sun: true, stars: false, flies: false
            };
        }
    }

    // ── Stars ────────────────────────────────────────────────────────
    var STAR_DATA = [
        [0.04,0.04,1.3],[0.11,0.09,0.9],[0.18,0.03,1.1],[0.26,0.07,0.8],
        [0.33,0.13,1.2],[0.40,0.02,0.9],[0.47,0.08,1.0],[0.54,0.05,1.3],
        [0.61,0.11,0.8],[0.68,0.04,1.1],[0.76,0.09,0.9],[0.83,0.03,1.2],
        [0.90,0.07,0.8],[0.96,0.13,1.0],[0.08,0.19,0.9],[0.20,0.22,1.1],
        [0.35,0.18,0.8],[0.50,0.21,1.2],[0.65,0.17,0.9],[0.78,0.23,1.0],
        [0.92,0.20,0.8],[0.14,0.29,0.9],[0.43,0.27,1.1],[0.72,0.30,0.8]
    ];

    // ── Init ────────────────────────────────────────────────────────
    function init() {
        canvas = document.getElementById('nn-canvas');
        if (!canvas) return;
        ctx = canvas.getContext('2d');
        headerEl = canvas.parentElement;
        isMobile = window.innerWidth < 768;
        prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        applyPalette();
        resize();
        buildAll();
        bindEvents();
        prefersReducedMotion ? drawFrame() : animate();
    }

    function resize() {
        var r   = headerEl.getBoundingClientRect();
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
        buildDeer();
        buildRabbits();
        buildClouds();
        buildFireflies();
    }

    // ── Hills ────────────────────────────────────────────────────────
    function buildHills() {
        hillPoints1 = []; hillPoints2 = [];
        for (var x = 0; x <= W + HILL_STEP; x += HILL_STEP) {
            hillPoints1.push(H*0.67 + Math.sin(x*0.005+0.8)*44 + Math.sin(x*0.016+1.5)*20);
            hillPoints2.push(H*0.78 + Math.sin(x*0.008+2.8)*32 + Math.sin(x*0.022+0.3)*16);
        }
    }

    function getHillY(x) {
        var idx = x / HILL_STEP;
        var i0  = Math.max(0, Math.floor(idx));
        var i1  = Math.min(hillPoints1.length - 1, i0 + 1);
        var f   = idx - Math.floor(idx);
        return hillPoints1[i0] * (1-f) + hillPoints1[i1] * f;
    }

    // ── Trees ────────────────────────────────────────────────────────
    function buildTrees() {
        trees = [];
        var count = isMobile ? 10 : 22, pts = hillPoints1.length;
        for (var i = 0; i < count; i++) {
            var xi    = Math.floor((i / count) * (pts - 1));
            var baseX = xi * HILL_STEP + (Math.random() - 0.5) * 50;
            var baseY = hillPoints1[Math.max(0, Math.min(pts-1, xi))];
            trees.push({ x:baseX, y:baseY, h:22+Math.random()*38, w:8+Math.random()*12, pine:Math.random()<0.65 });
        }
    }

    // ── Birds ────────────────────────────────────────────────────────
    function buildBirds() {
        birds = [];
        var count = isMobile ? 7 : 14;
        for (var i = 0; i < count; i++) {
            birds.push({
                x: Math.random()*W*1.4 - W*0.2,
                y: H*0.06 + Math.random()*H*0.32,
                speed: 0.35 + Math.random()*1.1,
                size:  4 + Math.random()*7,
                wingPhase: Math.random()*Math.PI*2,
                wingSpeed: 0.055 + Math.random()*0.045
            });
        }
    }

    // ── Deer ─────────────────────────────────────────────────────────
    function buildDeer() {
        deer = [];
        var count = isMobile ? 2 : 4;
        for (var i = 0; i < count; i++) {
            var x = (i+0.5)*(W/count) + (Math.random()-0.5)*W*0.12;
            x = Math.max(60, Math.min(W-60, x));
            deer.push({
                x: x, y: getHillY(x),
                dir: (Math.random()<0.5)?1:-1,
                speed: 0.12 + Math.random()*0.22,
                scale: 0.80 + Math.random()*0.35,
                hasAntlers: Math.random()<0.55,
                moving: true,
                pauseTimer: Math.floor(Math.random()*200),
                pauseDur: 200 + Math.floor(Math.random()*300)
            });
        }
    }

    // ── Rabbits ──────────────────────────────────────────────────────
    function buildRabbits() {
        rabbits = [];
        var count = isMobile ? 3 : 5;
        for (var i = 0; i < count; i++) {
            var x = Math.random()*(W-80)+40;
            rabbits.push({
                x: x, y: getHillY(x),
                dir: (Math.random()<0.5)?1:-1,
                speed: 0.3 + Math.random()*0.7,
                scale: 0.55 + Math.random()*0.25,
                hopPhase: Math.random()*Math.PI*2, hopY: 0,
                moving: true,
                pauseTimer: Math.floor(Math.random()*150),
                pauseDur: 80 + Math.floor(Math.random()*200)
            });
        }
    }

    // ── Clouds ───────────────────────────────────────────────────────
    function buildClouds() {
        clouds = [];
        var count = isMobile ? 4 : 8;
        for (var i = 0; i < count; i++) {
            clouds.push({
                x: Math.random()*W*1.6 - W*0.3,
                y: H*0.07 + Math.random()*H*0.28,
                speed: 0.07 + Math.random()*0.14,
                scale: 0.45 + Math.random()*0.85,
                alpha: 0.10 + Math.random()*0.13
            });
        }
    }

    // ── Fireflies ────────────────────────────────────────────────────
    function buildFireflies() {
        fireflies = [];
        var count = isMobile ? 12 : 28;
        for (var i = 0; i < count; i++) {
            fireflies.push({
                x: Math.random()*W, y: H*0.54 + Math.random()*H*0.42,
                vx: (Math.random()-0.5)*0.28, vy: (Math.random()-0.5)*0.28,
                glowPhase: Math.random()*Math.PI*2,
                glowSpeed: 0.018 + Math.random()*0.028,
                r: 0.8 + Math.random()*1.4
            });
        }
    }

    // ── Events ───────────────────────────────────────────────────────
    function bindEvents() {
        // Watch for theme changes on <html data-theme>
        if (window.MutationObserver) {
            new MutationObserver(function (mutations) {
                for (var i = 0; i < mutations.length; i++) {
                    if (mutations[i].attributeName === 'data-theme') {
                        applyPalette();
                        break;
                    }
                }
            }).observe(document.documentElement, { attributes: true });
        }

        var rto;
        window.addEventListener('resize', function () {
            clearTimeout(rto);
            rto = setTimeout(function () {
                isMobile = window.innerWidth < 768;
                resize(); buildAll();
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
            if (b.x > W + 70) { b.x = -70; b.y = H*0.06 + Math.random()*H*0.32; b.speed = 0.35+Math.random()*1.1; }
        });

        deer.forEach(function (d) {
            d.pauseTimer++;
            if (d.moving) {
                d.x += d.speed * d.dir;
                d.y = getHillY(d.x);
                if (d.x < 30)     d.dir =  1;
                if (d.x > W - 30) d.dir = -1;
            }
            if (d.pauseTimer >= d.pauseDur) {
                d.moving     = !d.moving;
                d.pauseTimer = 0;
                d.pauseDur   = d.moving ? (250+Math.floor(Math.random()*400)) : (80+Math.floor(Math.random()*180));
                if (!d.moving && Math.random() < 0.35) d.dir *= -1;
            }
        });

        rabbits.forEach(function (r) {
            r.pauseTimer++;
            if (r.moving) {
                r.x += r.speed * r.dir;
                r.y = getHillY(r.x);
                r.hopPhase += 0.18;
                r.hopY = -Math.abs(Math.sin(r.hopPhase)) * 9 * r.scale;
                if (r.x < 20)     r.dir =  1;
                if (r.x > W - 20) r.dir = -1;
            } else {
                r.hopY *= 0.8;
            }
            if (r.pauseTimer >= r.pauseDur) {
                r.moving     = !r.moving;
                r.pauseTimer = 0;
                r.pauseDur   = r.moving ? (120+Math.floor(Math.random()*250)) : (60+Math.floor(Math.random()*160));
                if (!r.moving && Math.random() < 0.4) r.dir *= -1;
            }
        });

        clouds.forEach(function (c) { c.x += c.speed; if (c.x > W+220) c.x = -220; });

        fireflies.forEach(function (f) {
            f.x += f.vx; f.y += f.vy;
            f.glowPhase += f.glowSpeed;
            if (f.x < 0 || f.x > W) f.vx *= -1;
            if (f.y < H*0.54 || f.y > H) f.vy *= -1;
        });
    }

    // ── Draw ─────────────────────────────────────────────────────────
    function drawBackground() {
        var sky = ctx.createLinearGradient(0, 0, 0, H*0.78);
        P.sky.forEach(function (s) { sky.addColorStop(s[0], s[1]); });
        ctx.fillStyle = sky;
        ctx.fillRect(0, 0, W, H);

        var hy = H * 0.66;
        var hg = ctx.createRadialGradient(W*0.5, hy, 0, W*0.5, hy, W*0.55);
        hg.addColorStop(0,   P.horizonGlow);
        hg.addColorStop(0.5, P.horizonGlow2);
        hg.addColorStop(1,   'rgba(0,0,0,0)');
        ctx.fillStyle = hg;
        ctx.fillRect(0, hy - H*0.18, W, H*0.36);

        var grd = ctx.createLinearGradient(0, H*0.72, 0, H);
        grd.addColorStop(0, P.groundTop); grd.addColorStop(1, P.groundBot);
        ctx.fillStyle = grd;
        ctx.fillRect(0, H*0.72, W, H);
    }

    function drawStars() {
        for (var i = 0; i < STAR_DATA.length; i++) {
            var s = STAR_DATA[i];
            var a = 0.25 + 0.55 * Math.abs(Math.sin(time*0.011 + i*1.7));
            ctx.beginPath(); ctx.arc(s[0]*W, s[1]*H, s[2], 0, Math.PI*2);
            ctx.fillStyle = 'rgba(210,225,255,' + a + ')'; ctx.fill();
        }
    }

    function drawMoon() {
        var mx = W*0.83, my = H*0.13;
        var g = ctx.createRadialGradient(mx,my,0,mx,my,90);
        g.addColorStop(0,   'rgba(220,215,170,0.10)');
        g.addColorStop(0.4, 'rgba(200,195,140,0.04)');
        g.addColorStop(1,   'rgba(0,0,0,0)');
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(mx,my,90,0,Math.PI*2); ctx.fill();
        ctx.fillStyle = '#ddd8a8'; ctx.beginPath(); ctx.arc(mx,my,19,0,Math.PI*2); ctx.fill();
        ctx.fillStyle = '#0b1a30'; ctx.beginPath(); ctx.arc(mx+7,my-3,15,0,Math.PI*2); ctx.fill();
    }

    function drawSun() {
        var sx = W*0.80, sy = H*0.11;
        // Rays glow
        var g = ctx.createRadialGradient(sx,sy,0,sx,sy,130);
        g.addColorStop(0,   'rgba(255,230,100,0.40)');
        g.addColorStop(0.35,'rgba(255,195,60,0.14)');
        g.addColorStop(0.65,'rgba(255,160,30,0.05)');
        g.addColorStop(1,   'rgba(255,140,0,0)');
        ctx.fillStyle = g; ctx.beginPath(); ctx.arc(sx,sy,130,0,Math.PI*2); ctx.fill();
        // Disc
        ctx.fillStyle = '#FFD050'; ctx.beginPath(); ctx.arc(sx,sy,22,0,Math.PI*2); ctx.fill();
        // Bright core
        ctx.fillStyle = '#FFF2B0'; ctx.beginPath(); ctx.arc(sx,sy,13,0,Math.PI*2); ctx.fill();
    }

    function drawCloud(c) {
        var col = P.cloud;
        ctx.save();
        ctx.translate(c.x, c.y); ctx.scale(c.scale, c.scale*0.58);
        var a = Math.min(1, c.alpha * P.cloudAlpha);
        ctx.fillStyle = 'rgba(' + col[0]+','+col[1]+','+col[2]+',' + a + ')';
        [[0,0,26],[30,-7,21],[56,2,24],[82,-5,19],[18,9,17],[62,9,17]].forEach(function(b) {
            ctx.beginPath(); ctx.arc(b[0],b[1],b[2],0,Math.PI*2); ctx.fill();
        });
        ctx.restore();
    }

    function drawHills() {
        ctx.fillStyle = P.hillFar;
        ctx.beginPath(); ctx.moveTo(0,H);
        for (var i=0; i<hillPoints2.length; i++) ctx.lineTo(i*HILL_STEP, hillPoints2[i]);
        ctx.lineTo(W,H); ctx.closePath(); ctx.fill();

        ctx.fillStyle = P.hillNear;
        ctx.beginPath(); ctx.moveTo(0,H);
        for (var j=0; j<hillPoints1.length; j++) ctx.lineTo(j*HILL_STEP, hillPoints1[j]);
        ctx.lineTo(W,H); ctx.closePath(); ctx.fill();
    }

    function drawTrees() {
        ctx.fillStyle = P.trees;
        trees.forEach(function (t) {
            if (t.pine) {
                ctx.beginPath(); ctx.moveTo(t.x,t.y-t.h); ctx.lineTo(t.x-t.w*0.5,t.y); ctx.lineTo(t.x+t.w*0.5,t.y); ctx.closePath(); ctx.fill();
                ctx.fillRect(t.x-1.5, t.y, 3, t.h*0.22);
            } else {
                ctx.beginPath(); ctx.arc(t.x, t.y-t.h*0.58, t.w*0.52, 0, Math.PI*2); ctx.fill();
                ctx.fillRect(t.x-2, t.y-t.h*0.18, 4, t.h*0.28);
            }
        });
    }

    function drawDeer(d) {
        var s = d.scale;
        ctx.save(); ctx.translate(d.x, d.y);
        if (d.dir < 0) ctx.scale(-1, 1);
        ctx.fillStyle = ctx.strokeStyle = P.animals;
        ctx.lineCap = 'round';

        ctx.beginPath(); ctx.ellipse(0,-s*9, s*15,s*7, 0.08,0,Math.PI*2); ctx.fill();
        ctx.lineWidth = s*5;
        ctx.beginPath(); ctx.moveTo(s*9,-s*13); ctx.lineTo(s*13,-s*21); ctx.stroke();
        ctx.beginPath(); ctx.ellipse(s*15,-s*23, s*5,s*4, 0.35,0,Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(s*20,-s*22, s*3,s*2.2, 0.1,0,Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(s*13,-s*27, s*2,s*4, -0.3,0,Math.PI*2); ctx.fill();
        ctx.lineWidth = s*2.8;
        ctx.beginPath(); ctx.moveTo(s*5, -s*3); ctx.lineTo(s*3,  s*10); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(s*9, -s*3); ctx.lineTo(s*11, s*10); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(-s*4,-s*3); ctx.lineTo(-s*6, s*10); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(-s*9,-s*3); ctx.lineTo(-s*7, s*10); ctx.stroke();
        ctx.beginPath(); ctx.ellipse(-s*14,-s*10, s*3,s*2, 0.2,0,Math.PI*2); ctx.fill();

        if (d.hasAntlers) {
            ctx.lineWidth = s*1.8;
            ctx.beginPath(); ctx.moveTo(s*12,-s*26); ctx.lineTo(s*9, -s*36); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(s*10,-s*31); ctx.lineTo(s*6, -s*35); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(s*15,-s*26); ctx.lineTo(s*19,-s*35); ctx.stroke();
            ctx.beginPath(); ctx.moveTo(s*17,-s*31); ctx.lineTo(s*21,-s*34); ctx.stroke();
        }
        ctx.restore();
    }

    function drawRabbit(r) {
        var s = r.scale;
        ctx.save(); ctx.translate(r.x, r.y + r.hopY);
        if (r.dir < 0) ctx.scale(-1, 1);
        ctx.fillStyle = P.animals;
        ctx.beginPath(); ctx.ellipse(0,  -s*5,  s*6,  s*7,  0.12,0,Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(s*6,-s*10, s*4.5,s*4,  0,   0,Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(s*4.5,-s*17,s*1.6,s*5.5,-0.1,0,Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(s*7.5,-s*16,s*1.6,s*5.5, 0.18,0,Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.arc(-s*6,-s*5, s*2.8,0,Math.PI*2); ctx.fill();
        ctx.beginPath(); ctx.ellipse(-s*2,s*1,s*4,s*2.5,-0.25,0,Math.PI*2); ctx.fill();
        ctx.restore();
    }

    function drawFireflies() {
        fireflies.forEach(function (f) {
            var a = 0.35 + 0.65*Math.abs(Math.sin(f.glowPhase));
            var g = ctx.createRadialGradient(f.x,f.y,0,f.x,f.y,f.r*6);
            g.addColorStop(0,'rgba(170,255,90,'+(a*0.55)+')');
            g.addColorStop(1,'rgba(170,255,90,0)');
            ctx.beginPath(); ctx.arc(f.x,f.y,f.r*6,0,Math.PI*2); ctx.fillStyle=g; ctx.fill();
            ctx.beginPath(); ctx.arc(f.x,f.y,f.r,0,Math.PI*2);
            ctx.fillStyle='rgba(200,255,130,'+a+')'; ctx.fill();
        });
    }

    function drawBird(b) {
        var wy = Math.sin(b.wingPhase)*b.size*0.88;
        ctx.strokeStyle = P.birdColor; ctx.lineWidth = 1.2; ctx.lineCap = 'round';
        ctx.beginPath();
        ctx.moveTo(b.x,b.y); ctx.quadraticCurveTo(b.x-b.size*0.62,b.y-wy, b.x-b.size*1.28,b.y+wy*0.18);
        ctx.moveTo(b.x,b.y); ctx.quadraticCurveTo(b.x+b.size*0.62,b.y-wy, b.x+b.size*1.28,b.y+wy*0.18);
        ctx.stroke();
    }

    function drawVignette() {
        var cx=W/2, cy=H/2, outerR=Math.sqrt(cx*cx+cy*cy);
        var g = ctx.createRadialGradient(cx,cy,outerR*0.28,cx,cy,outerR);
        g.addColorStop(0,'rgba(0,0,0,0)'); g.addColorStop(1, P.vignette);
        ctx.fillStyle = g; ctx.fillRect(0,0,W,H);
    }

    // ── Main loop ────────────────────────────────────────────────────
    function drawFrame() {
        ctx.clearRect(0, 0, W, H);
        drawBackground();
        if (P.stars) drawStars();
        if (P.moon)  drawMoon();
        if (P.sun)   drawSun();
        clouds.forEach(drawCloud);
        drawHills();
        drawTrees();
        deer.forEach(drawDeer);
        rabbits.forEach(drawRabbit);
        if (P.flies) drawFireflies();
        birds.forEach(drawBird);
        drawVignette();
    }

    function animate() {
        drawFrame(); update();
        animId = requestAnimationFrame(animate);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
