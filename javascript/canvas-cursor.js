// Canvas Cursor Interactive Effect

// Configuration object
const E = {
    debug: true,
    friction: 0.5,
    trails: 20,
    size: 50,
    dampening: 0.25,
    tension: 0.98
};

// Global color management
const ColorManager = {
    baseHue: 0,
    hueIncrement: 1,
    lastMoveTime: 0,
    updateInterval: 500, // Update color every 500ms

    updateColor: function() {
        const now = Date.now();
        if (now - this.lastMoveTime > this.updateInterval) {
            this.baseHue = (this.baseHue + this.hueIncrement) % 360;
            this.lastMoveTime = now;
        }
    },

    getColor: function(index) {
        // Slight variation for different trails
        const hueVariation = index * 10;
        return `hsla(${(this.baseHue + hueVariation) % 360}, 70%, 50%, 0.2)`;
    }
};

// Node constructor
function Node() {
    this.x = 0;
    this.y = 0;
    this.vy = 0;
    this.vx = 0;
}

// Line constructor
function Line(options) {
    this.init(options || {});
}

Line.prototype = {
    init: function(options) {
        this.spring = options.spring + 0.1 * Math.random() - 0.02;
        this.friction = E.friction + 0.01 * Math.random() - 0.002;
        this.nodes = [];
        for (let i = 0; i < E.size; i++) {
            let node = new Node();
            node.x = pos.x;
            node.y = pos.y;
            this.nodes.push(node);
        }
        this.trailIndex = options.trailIndex || 0;
    },
    update: function() {
        let spring = this.spring;
        let firstNode = this.nodes[0];
        
        firstNode.vx += (pos.x - firstNode.x) * spring;
        firstNode.vy += (pos.y - firstNode.y) * spring;

        for (let i = 0; i < this.nodes.length; i++) {
            let currentNode = this.nodes[i];
            
            if (i > 0) {
                let prevNode = this.nodes[i - 1];
                currentNode.vx += (prevNode.x - currentNode.x) * spring;
                currentNode.vy += (prevNode.y - currentNode.y) * spring;
                currentNode.vx += prevNode.vx * E.dampening;
                currentNode.vy += prevNode.vy * E.dampening;
            }

            currentNode.vx *= this.friction;
            currentNode.vy *= this.friction;
            currentNode.x += currentNode.vx;
            currentNode.y += currentNode.vy;
            spring *= E.tension;
        }
    },
    draw: function() {
        let firstNode = this.nodes[0];
        ctx.beginPath();
        ctx.moveTo(firstNode.x, firstNode.y);

        for (let i = 1; i < this.nodes.length - 2; i++) {
            let currentNode = this.nodes[i];
            let nextNode = this.nodes[i + 1];
            let midX = 0.5 * (currentNode.x + nextNode.x);
            let midY = 0.5 * (currentNode.y + nextNode.y);
            ctx.quadraticCurveTo(currentNode.x, currentNode.y, midX, midY);
        }

        let lastSecondNode = this.nodes[this.nodes.length - 2];
        let lastNode = this.nodes[this.nodes.length - 1];
        ctx.quadraticCurveTo(lastSecondNode.x, lastSecondNode.y, lastNode.x, lastNode.y);
        
        // Use ColorManager to get dynamic color
        ctx.strokeStyle = ColorManager.getColor(this.trailIndex);
        ctx.stroke();
        ctx.closePath();
    }
};

// Global variables
let ctx, pos = {}, lines = [];

function onMousemove(e) {
    function initLines() {
        lines = [];
        for (let i = 0; i < E.trails; i++) {
            lines.push(new Line({ 
                spring: 0.4 + (i / E.trails) * 0.025,
                trailIndex: i
            }));
        }
    }

    function updatePosition(e) {
        if (e.touches) {
            pos.x = e.touches[0].pageX;
            pos.y = e.touches[0].pageY;
        } else {
            pos.x = e.clientX;
            pos.y = e.clientY;
        }
        
        // Update color based on movement
        ColorManager.updateColor();
        e.preventDefault();
    }

    document.removeEventListener("mousemove", onMousemove);
    document.removeEventListener("touchstart", onMousemove);
    document.addEventListener("mousemove", updatePosition);
    document.addEventListener("touchmove", updatePosition);
    document.addEventListener("touchstart", updatePosition);

    updatePosition(e);
    initLines();
    render();
}

function render() {
    if (ctx.running) {
        ctx.globalCompositeOperation = "source-over";
        ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
        ctx.globalCompositeOperation = "lighter";
        ctx.lineWidth = 1;

        for (let i = 0; i < E.trails; i++) {
            let line = lines[i];
            line.update();
            line.draw();
        }

        ctx.frame++;
        window.requestAnimationFrame(render);
    }
}

function resizeCanvas() {
    ctx.canvas.width = window.innerWidth - 20;
    ctx.canvas.height = window.innerHeight;
}

function initCanvas() {
    const canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");
    ctx.running = true;
    ctx.frame = 1;

    document.addEventListener("mousemove", onMousemove);
    document.addEventListener("touchstart", onMousemove);
    document.body.addEventListener("orientationchange", resizeCanvas);
    window.addEventListener("resize", resizeCanvas);
    
    window.addEventListener("focus", () => {
        if (!ctx.running) {
            ctx.running = true;
            render();
        }
    });

    window.addEventListener("blur", () => {
        ctx.running = false;
    });

    resizeCanvas();
}

// Initialize the canvas when the page loads
window.addEventListener('load', initCanvas);