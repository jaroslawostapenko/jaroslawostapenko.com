/**
 * ============================================================================
 * CONTACT_OS: HIGH-PERFORMANCE INTERACTIVE ENGINE
 * ============================================================================
 * 
 * A dedicated physics and rendering engine for the Contact Section.
 * Features:
 * 1. 3D Wireframe Globe Rendering (Orthographic Projection)
 * 2. Particle Physics System (Verlet Integration)
 * 3. Fluid Input Reactivity
 * 4. Perlin Noise Field Generation
 * 
 * Author: Yaroslav Ostapenko (AI Generated)
 * License: MIT
 */

// ============================================================================
// MODULE 1: MATHEMATICAL CORE (LINEAR ALGEBRA & UTILS)
// ============================================================================

const CMath = {
    PI: Math.PI,
    TWO_PI: Math.PI * 2,
    HALF_PI: Math.PI / 2,
    
    // Clamp a value between min and max
    clamp: (v, min, max) => Math.max(min, Math.min(max, v)),
    
    // Linear Interpolation
    lerp: (v0, v1, t) => v0 * (1 - t) + v1 * t,
    
    // Map a value from one range to another
    map: (value, start1, stop1, start2, stop2) => {
        return start2 + (stop2 - start2) * ((value - start1) / (stop1 - start1));
    },
    
    // Distance between two points (2D)
    dist: (x1, y1, x2, y2) => Math.hypot(x2 - x1, y2 - y1),
    
    // Random float between min and max
    random: (min, max) => Math.random() * (max - min) + min,
    
    // Random integer
    randomInt: (min, max) => Math.floor(CMath.random(min, max)),
    
    // Degrees to Radians
    degToRad: (deg) => deg * (CMath.PI / 180),
    
    // Radians to Degrees
    radToDeg: (rad) => rad * (180 / CMath.PI)
};

/**
 * 2D Vector Class for Physics Calculations
 */
class Vec2 {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    // Set values
    set(x, y) { this.x = x; this.y = y; return this; }
    
    // Copy another vector
    copy(v) { this.x = v.x; this.y = v.y; return this; }
    
    // Clone this vector
    clone() { return new Vec2(this.x, this.y); }
    
    // Add
    add(v) { this.x += v.x; this.y += v.y; return this; }
    
    // Subtract
    sub(v) { this.x -= v.x; this.y -= v.y; return this; }
    
    // Multiply by scalar
    mult(s) { this.x *= s; this.y *= s; return this; }
    
    // Divide by scalar
    div(s) { if (s !== 0) { this.x /= s; this.y /= s; } return this; }
    
    // Magnitude
    mag() { return Math.sqrt(this.x * this.x + this.y * this.y); }
    
    // Normalize
    normalize() {
        const m = this.mag();
        if (m > 0) this.div(m);
        return this;
    }
    
    // Limit magnitude
    limit(max) {
        if (this.mag() > max) {
            this.normalize();
            this.mult(max);
        }
        return this;
    }
    
    // Static methods
    static add(v1, v2) { return new Vec2(v1.x + v2.x, v1.y + v2.y); }
    static sub(v1, v2) { return new Vec2(v1.x - v2.x, v1.y - v2.y); }
    static mult(v, s) { return new Vec2(v.x * s, v.y * s); }
    static dist(v1, v2) { return Math.hypot(v2.x - v1.x, v2.y - v1.y); }
}

/**
 * 3D Vector Class for Globe Rendering
 */
class Vec3 {
    constructor(x = 0, y = 0, z = 0) {
        this.x = x;
        this.y = y;
        this.z = z;
    }
    
    rotateX(theta) {
        const sinTheta = Math.sin(theta);
        const cosTheta = Math.cos(theta);
        const y = this.y * cosTheta - this.z * sinTheta;
        const z = this.z * cosTheta + this.y * sinTheta;
        this.y = y;
        this.z = z;
        return this;
    }
    
    rotateY(theta) {
        const sinTheta = Math.sin(theta);
        const cosTheta = Math.cos(theta);
        const x = this.x * cosTheta - this.z * sinTheta;
        const z = this.z * cosTheta + this.x * sinTheta;
        this.x = x;
        this.z = z;
        return this;
    }
    
    rotateZ(theta) {
        const sinTheta = Math.sin(theta);
        const cosTheta = Math.cos(theta);
        const x = this.x * cosTheta - this.y * sinTheta;
        const y = this.y * cosTheta + this.x * sinTheta;
        this.x = x;
        this.y = y;
        return this;
    }
    
    project(viewWidth, viewHeight, fov, viewDistance) {
        const factor = fov / (viewDistance + this.z);
        const x = this.x * factor + viewWidth / 2;
        const y = this.y * factor + viewHeight / 2;
        return new Vec3(x, y, this.z);
    }
}

// ============================================================================
// MODULE 2: NOISE GENERATOR (PERLIN-LIKE)
// ============================================================================

class NoiseGenerator {
    constructor(seed = Math.random()) {
        this.p = new Uint8Array(512);
        this.permutation = new Uint8Array(256);
        for (let i = 0; i < 256; i++) this.permutation[i] = i;
        
        // Shuffle
        for (let i = 255; i > 0; i--) {
            const r = Math.floor(seed * (i + 1));
            seed = (seed * 9301 + 49297) % 233280 / 233280;
            [this.permutation[i], this.permutation[r]] = [this.permutation[r], this.permutation[i]];
        }
        
        for (let i = 0; i < 512; i++) {
            this.p[i] = this.permutation[i & 255];
        }
    }
    
    fade(t) { return t * t * t * (t * (t * 6 - 15) + 10); }
    lerp(t, a, b) { return a + t * (b - a); }
    grad(hash, x, y, z) {
        const h = hash & 15;
        const u = h < 8 ? x : y;
        const v = h < 4 ? y : h === 12 || h === 14 ? x : z;
        return ((h & 1) === 0 ? u : -u) + ((h & 2) === 0 ? v : -v);
    }
    
    noise(x, y, z) {
        const X = Math.floor(x) & 255;
        const Y = Math.floor(y) & 255;
        const Z = Math.floor(z) & 255;
        
        x -= Math.floor(x);
        y -= Math.floor(y);
        z -= Math.floor(z);
        
        const u = this.fade(x);
        const v = this.fade(y);
        const w = this.fade(z);
        
        const A = this.p[X] + Y, AA = this.p[A] + Z, AB = this.p[A + 1] + Z;
        const B = this.p[X + 1] + Y, BA = this.p[B] + Z, BB = this.p[B + 1] + Z;
        
        return this.lerp(w, this.lerp(v, this.lerp(u, this.grad(this.p[AA], x, y, z),
            this.grad(this.p[BA], x - 1, y, z)),
            this.lerp(u, this.grad(this.p[AB], x, y - 1, z),
            this.grad(this.p[BB], x - 1, y - 1, z))),
            this.lerp(v, this.lerp(u, this.grad(this.p[AA + 1], x, y, z - 1),
            this.grad(this.p[BA + 1], x - 1, y, z - 1)),
            this.lerp(u, this.grad(this.p[AB + 1], x, y - 1, z - 1),
            this.grad(this.p[BB + 1], x - 1, y - 1, z - 1))));
    }
}

// ============================================================================
// MODULE 3: PHYSICS ENGINE
// ============================================================================

class Particle {
    constructor(x, y, type = 'default') {
        this.pos = new Vec2(x, y);
        this.vel = new Vec2(CMath.random(-1, 1), CMath.random(-1, 1));
        this.acc = new Vec2(0, 0);
        this.maxSpeed = type === 'spark' ? 6 : 2;
        this.maxForce = 0.1;
        this.life = type === 'spark' ? 255 : -1; // -1 means immortal
        this.type = type;
        this.color = this.generateColor();
        this.size = CMath.random(1, 3);
    }
    
    generateColor() {
        if (this.type === 'spark') {
            const hues = [210, 260, 45]; // Blue, Purple, Gold
            const h = hues[Math.floor(Math.random() * hues.length)];
            return `hsla(${h}, 100%, 60%,`;
        }
        return `rgba(148, 163, 184,`; // Slate-400
    }
    
    applyForce(force) {
        this.acc.add(force);
    }
    
    update() {
        this.vel.add(this.acc);
        this.vel.limit(this.maxSpeed);
        this.pos.add(this.vel);
        this.acc.mult(0); // Reset acceleration
        
        if (this.type === 'spark') {
            this.life -= 5;
            this.vel.mult(0.95); // Friction
        }
    }
    
    isDead() {
        return this.type === 'spark' && this.life <= 0;
    }
    
    render(ctx) {
        if (this.type === 'spark') {
            ctx.fillStyle = `${this.color} ${this.life / 255})`;
            ctx.beginPath();
            ctx.arc(this.pos.x, this.pos.y, this.size, 0, CMath.TWO_PI);
            ctx.fill();
        } else {
            // Network node rendering handled by network manager
        }
    }
}

class NetworkSystem {
    constructor(width, height, count) {
        this.width = width;
        this.height = height;
        this.particles = [];
        this.mouse = new Vec2(-1000, -1000);
        this.init(count);
    }
    
    init(count) {
        for (let i = 0; i < count; i++) {
            this.particles.push(new Particle(
                CMath.random(0, this.width),
                CMath.random(0, this.height),
                'network'
            ));
        }
    }
    
    setMouse(x, y) {
        this.mouse.set(x, y);
    }
    
    update() {
        this.particles.forEach(p => {
            // Mouse repulsion
            const mouseDist = Vec2.dist(p.pos, this.mouse);
            if (mouseDist < 150) {
                const repulse = Vec2.sub(p.pos, this.mouse);
                repulse.normalize();
                repulse.mult(2);
                p.applyForce(repulse);
            }
            
            // Bounds check
            if (p.pos.x < 0 || p.pos.x > this.width) p.vel.x *= -1;
            if (p.pos.y < 0 || p.pos.y > this.height) p.vel.y *= -1;
            
            p.update();
        });
    }
    
    render(ctx) {
        ctx.strokeStyle = 'rgba(148, 163, 184, 0.15)'; // faint line
        ctx.lineWidth = 1;
        
        for (let i = 0; i < this.particles.length; i++) {
            const pA = this.particles[i];
            
            // Draw Point
            ctx.fillStyle = 'rgba(59, 130, 246, 0.5)';
            ctx.beginPath();
            ctx.arc(pA.pos.x, pA.pos.y, 2, 0, CMath.TWO_PI);
            ctx.fill();
            
            // Draw Connections
            for (let j = i + 1; j < this.particles.length; j++) {
                const pB = this.particles[j];
                const d = Vec2.dist(pA.pos, pB.pos);
                
                if (d < 100) {
                    ctx.beginPath();
                    ctx.moveTo(pA.pos.x, pA.pos.y);
                    ctx.lineTo(pB.pos.x, pB.pos.y);
                    ctx.stroke();
                }
            }
        }
    }
}

// ============================================================================
// MODULE 4: 3D GLOBE RENDERER
// ============================================================================

class Globe3D {
    constructor(radius, points) {
        this.radius = radius;
        this.points = [];
        this.basePoints = []; // Store original for rotation
        this.rotation = new Vec3(0, 0, 0);
        this.initPoints(points);
    }
    
    initPoints(count) {
        const phi = (1 + Math.sqrt(5)) / 2; // Golden ratio
        for (let i = 0; i < count; i++) {
            const y = 1 - (i / (count - 1)) * 2; // y goes from 1 to -1
            const radiusAtY = Math.sqrt(1 - y * y);
            const theta = phi * i;
            
            const x = Math.cos(theta) * radiusAtY;
            const z = Math.sin(theta) * radiusAtY;
            
            const point = new Vec3(x * this.radius, y * this.radius, z * this.radius);
            this.points.push(point);
            this.basePoints.push(new Vec3(point.x, point.y, point.z));
        }
    }
    
    update(dt) {
        this.rotation.y += 0.005; // Auto rotate
        this.rotation.x = Math.sin(Date.now() * 0.001) * 0.2;
    }
    
    render(ctx, centerX, centerY) {
        const projectedPoints = [];
        
        // 1. Rotate Points
        this.points.forEach((p, i) => {
            const base = this.basePoints[i];
            // Reset to base
            p.x = base.x; p.y = base.y; p.z = base.z;
            
            // Apply rotations
            p.rotateY(this.rotation.y);
            p.rotateX(this.rotation.x);
            p.rotateZ(0.1); // Slight tilt
            
            // 2. Project 3D to 2D
            // Simple Orthographic projection with scaling based on Z
            const scale = 300 / (300 - p.z);
            const x2d = p.x * scale + centerX;
            const y2d = p.y * scale + centerY;
            
            projectedPoints.push({ x: x2d, y: y2d, z: p.z, scale: scale });
        });
        
        // 3. Draw Connections (Nearest Neighbors on Sphere)
        // Optimization: Only draw connections if distance is small
        ctx.strokeStyle = 'rgba(59, 130, 246, 0.15)';
        
        projectedPoints.forEach((p1, i) => {
            // Draw Node
            const alpha = CMath.map(p1.z, -this.radius, this.radius, 0.1, 0.8);
            const size = Math.max(0.5, p1.scale * 1.5);
            
            ctx.fillStyle = `rgba(59, 130, 246, ${alpha})`;
            ctx.beginPath();
            ctx.arc(p1.x, p1.y, size, 0, CMath.TWO_PI);
            ctx.fill();
            
            // Draw Lines (simplified: connect to next few points in array)
            // Since points are generated via Fibonacci sphere, neighbors in array are somewhat close spatially
            for (let j = 1; j <= 3; j++) {
                const nextIdx = (i + j) % projectedPoints.length;
                const p2 = projectedPoints[nextIdx];
                const d = CMath.dist(p1.x, p1.y, p2.x, p2.y);
                
                if (d < 50) {
                    ctx.lineWidth = Math.max(0.1, (1 - d/50));
                    ctx.beginPath();
                    ctx.moveTo(p1.x, p1.y);
                    ctx.lineTo(p2.x, p2.y);
                    ctx.stroke();
                }
            }
        });
    }
}

// ============================================================================
// MODULE 5: INPUT SPARK SYSTEM
// ============================================================================

class InputSparkSystem {
    constructor() {
        this.sparks = [];
    }
    
    emit(x, y) {
        for (let i = 0; i < 5; i++) {
            this.sparks.push(new Particle(x, y, 'spark'));
        }
    }
    
    update() {
        for (let i = this.sparks.length - 1; i >= 0; i--) {
            this.sparks[i].update();
            if (this.sparks[i].isDead()) {
                this.sparks.splice(i, 1);
            }
        }
    }
    
    render(ctx) {
        this.sparks.forEach(s => s.render(ctx));
    }
}

// ============================================================================
// MODULE 6: MAIN ENGINE CONTROLLER
// ============================================================================

class ContactEngine {
    constructor() {
        this.canvas = document.getElementById('contact-canvas');
        if (!this.canvas) return; // Guard clause
        
        this.ctx = this.canvas.getContext('2d');
        this.width = this.canvas.width = this.canvas.parentElement.offsetWidth;
        this.height = this.canvas.height = this.canvas.parentElement.offsetHeight;
        
        // Systems
        this.network = new NetworkSystem(this.width, this.height, 40);
        this.globe = new Globe3D(120, 100);
        this.sparks = new InputSparkSystem();
        this.noise = new NoiseGenerator();
        
        // State
        this.isRunning = false;
        this.scrollObserver = null;
        
        // Bindings
        this.bindEvents();
        this.initObserver();
    }
    
    bindEvents() {
        // Resize
        window.addEventListener('resize', () => {
            this.width = this.canvas.width = this.canvas.parentElement.offsetWidth;
            this.height = this.canvas.height = this.canvas.parentElement.offsetHeight;
            this.network.width = this.width;
            this.network.height = this.height;
        });
        
        // Mouse Move (Global for section)
        const section = document.getElementById('contact');
        section.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.network.setMouse(e.clientX - rect.left, e.clientY - rect.top);
        });
        
        // Input Typing Effects
        const inputs = document.querySelectorAll('#contact-form input, #contact-form textarea');
        inputs.forEach(input => {
            input.addEventListener('input', (e) => {
                // Get caret position approximation (simplified center of input)
                const rect = input.getBoundingClientRect();
                const canvasRect = this.canvas.getBoundingClientRect();
                
                // Randomly offset along the input width
                const x = (rect.left - canvasRect.left) + Math.random() * rect.width;
                const y = (rect.top - canvasRect.top) + rect.height / 2;
                
                this.sparks.emit(x, y);
            });
        });
    }
    
    initObserver() {
        this.scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    this.start();
                } else {
                    this.stop();
                }
            });
        }, { threshold: 0.1 });
        
        this.scrollObserver.observe(document.getElementById('contact'));
    }
    
    start() {
        if (!this.isRunning) {
            this.isRunning = true;
            this.loop();
        }
    }
    
    stop() {
        this.isRunning = false;
    }
    
    drawBackground() {
        // Subtle Noise Field Background
        const time = Date.now() * 0.0005;
        const cellSize = 50;
        const cols = Math.ceil(this.width / cellSize);
        const rows = Math.ceil(this.height / cellSize);
        
        this.ctx.fillStyle = 'rgba(241, 245, 249, 0.3)'; // Slate-100 very transparent
        
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const n = this.noise.noise(x * 0.1, y * 0.1, time);
                if (n > 0.6) {
                    this.ctx.fillRect(x * cellSize, y * cellSize, 2, 2);
                }
            }
        }
    }
    
    loop() {
        if (!this.isRunning) return;
        
        // Clear
        this.ctx.clearRect(0, 0, this.width, this.height);
        
        // 1. Render Background Noise
        // this.drawBackground(); // Performance check: disabled for smoothness
        
        // 2. Render Network (Background layer)
        this.network.update();
        this.network.render(this.ctx);
        
        // 3. Render Globe (Behind form roughly)
        // Position globe on the left side on desktop, center on mobile background
        let globeX = this.width * 0.25;
        let globeY = this.height * 0.5;
        
        if (this.width < 1024) {
            globeX = this.width * 0.5;
            globeY = this.height * 0.2; // Move up behind title
        }
        
        this.globe.update();
        this.globe.render(this.ctx, globeX, globeY);
        
        // 4. Render Sparks (Foreground)
        this.sparks.update();
        this.sparks.render(this.ctx);
        
        requestAnimationFrame(() => this.loop());
    }
}

// ============================================================================
// INITIALIZATION
// ============================================================================

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Check if we are on a page with the contact section
    if (document.getElementById('contact-canvas')) {
        const engine = new ContactEngine();
        console.log("ContactOS Engine Initialized v1.0");
    }
});