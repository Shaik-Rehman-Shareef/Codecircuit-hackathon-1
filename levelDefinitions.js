// Function to generate themed shapes and patterns
function generateThemedImage(theme, item, size = 100) {
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');

    // Set up the context for high-quality rendering
    ctx.imageSmoothingEnabled = true;
    ctx.imageSmoothingQuality = 'high';    const themeKey = theme.toLowerCase().split(' ')[0];
    
    // Handle mixed challenge level
    if (themeKey === 'mixed') {
        const level = levelDefinitions.find(l => l.theme.toLowerCase().includes('mixed'));
        if (level && level.itemThemes && level.itemThemes[item]) {
            const itemTheme = level.itemThemes[item];
            switch (itemTheme) {
                case 'animals': drawAnimal(ctx, item, size); break;
                case 'fruits': drawFruit(ctx, item, size); break;
                case 'vehicles': drawVehicle(ctx, item, size); break;
                case 'shapes': drawShape(ctx, item, size); break;
                case 'emoji': drawEmoji(ctx, item, size); break;
            }
            return canvas.toDataURL();
        }
    }

    // Handle regular themes
    switch (themeKey) {
        case 'animals': drawAnimal(ctx, item, size); break;
        case 'fruits': drawFruit(ctx, item, size); break;
        case 'vehicles': drawVehicle(ctx, item, size); break;
        case 'shapes': drawShape(ctx, item, size); break;
        case 'emojis': drawEmoji(ctx, item, size); break;
        case 'space': drawSpace(ctx, item, size); break;
        case 'sports': drawSports(ctx, item, size); break;
        case 'music': drawMusic(ctx, item, size); break;
        case 'food': drawFood(ctx, item, size); break;
        case 'nature': drawNature(ctx, item, size); break;
        // Add more themes...
    }

    return canvas.toDataURL();
}

// Helper drawing functions for each theme
function drawAnimal(ctx, animal, size) {
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    
    const center = size / 2;
    const radius = size / 3;
    
    switch(animal) {
        case 'lion':
            // Draw lion face
            ctx.beginPath();
            ctx.arc(center, center, radius, 0, Math.PI * 2);
            ctx.fill();
            // Draw mane
            for(let i = 0; i < 12; i++) {
                const angle = (i / 12) * Math.PI * 2;
                ctx.beginPath();
                ctx.moveTo(center + Math.cos(angle) * radius,
                          center + Math.sin(angle) * radius);
                ctx.lineTo(center + Math.cos(angle) * (radius * 1.5),
                          center + Math.sin(angle) * (radius * 1.5));
                ctx.stroke();
            }
            break;
            
        case 'elephant':
            // Body
            ctx.beginPath();
            ctx.ellipse(center, center + 10, radius, radius * 0.8, 0, 0, Math.PI * 2);
            ctx.fill();
            // Trunk
            ctx.beginPath();
            ctx.moveTo(center, center);
            ctx.quadraticCurveTo(center + 20, center + 20, center, center + 40);
            ctx.stroke();
            break;
            
        case 'giraffe':
            // Long neck
            ctx.fillRect(center - 5, center - 20, 10, 40);
            // Small head
            ctx.beginPath();
            ctx.arc(center, center - 25, 10, 0, Math.PI * 2);
            ctx.fill();
            // Spots
            for(let i = 0; i < 5; i++) {
                ctx.beginPath();
                ctx.arc(center + (i%2)*15 - 7, center + (i%3)*10, 3, 0, Math.PI * 2);
                ctx.stroke();
            }
            break;
            
        case 'penguin':
            // Body
            ctx.beginPath();
            ctx.ellipse(center, center, radius * 0.6, radius, 0, 0, Math.PI * 2);
            ctx.fill();
            // White belly
            ctx.fillStyle = 'black';
            ctx.beginPath();
            ctx.ellipse(center, center + 5, radius * 0.4, radius * 0.7, 0, 0, Math.PI * 2);
            ctx.fill();
            break;
            
        default:
            // Default animal shape
            ctx.beginPath();
            ctx.arc(center, center, radius, 0, Math.PI * 2);
            ctx.fill();
    }
}

function drawFruit(ctx, fruit, size) {
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    
    const center = size / 2;
    const radius = size / 3;
    
    switch(fruit) {
        case 'apple':
            // Apple body
            ctx.beginPath();
            ctx.arc(center, center + 5, radius, 0, Math.PI * 2);
            ctx.fill();
            // Stem
            ctx.beginPath();
            ctx.moveTo(center, center - radius + 5);
            ctx.lineTo(center, center - radius - 10);
            ctx.stroke();
            // Leaf
            ctx.beginPath();
            ctx.moveTo(center, center - radius - 10);
            ctx.quadraticCurveTo(center + 10, center - radius - 15, 
                               center + 5, center - radius - 20);
            ctx.stroke();
            break;
            
        case 'banana':
            // Banana curve
            ctx.beginPath();
            ctx.arc(center, center - 10, radius, 0.1 * Math.PI, 0.9 * Math.PI);
            ctx.arcTo(center + radius, center + radius, 
                     center - radius, center + radius, radius);
            ctx.closePath();
            ctx.fill();
            break;
            
        case 'orange':
            // Orange circle
            ctx.beginPath();
            ctx.arc(center, center, radius, 0, Math.PI * 2);
            ctx.fill();
            // Segments
            for(let i = 0; i < 8; i++) {
                const angle = (i / 8) * Math.PI * 2;
                ctx.beginPath();
                ctx.moveTo(center, center);
                ctx.lineTo(center + Math.cos(angle) * radius,
                          center + Math.sin(angle) * radius);
                ctx.stroke();
            }
            break;
            
        default:
            // Default fruit shape
            ctx.beginPath();
            ctx.arc(center, center, radius, 0, Math.PI * 2);
            ctx.fill();
    }
}

function drawVehicle(ctx, vehicle, size) {
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    
    const center = size / 2;
    const radius = size / 3;
    
    switch(vehicle) {
        case 'car':
            // Car body
            ctx.fillRect(center - radius, center - radius/2, radius * 2, radius);
            // Roof
            ctx.beginPath();
            ctx.moveTo(center - radius/2, center - radius/2);
            ctx.lineTo(center + radius/2, center - radius/2);
            ctx.lineTo(center + radius/3, center - radius);
            ctx.lineTo(center - radius/3, center - radius);
            ctx.closePath();
            ctx.fill();
            // Wheels
            ctx.beginPath();
            ctx.arc(center - radius/2, center + radius/2, radius/4, 0, Math.PI * 2);
            ctx.arc(center + radius/2, center + radius/2, radius/4, 0, Math.PI * 2);
            ctx.fill();
            break;
            
        case 'bike':
            // Wheels
            ctx.beginPath();
            ctx.arc(center - radius, center, radius/3, 0, Math.PI * 2);
            ctx.arc(center + radius, center, radius/3, 0, Math.PI * 2);
            ctx.stroke();
            // Frame
            ctx.beginPath();
            ctx.moveTo(center - radius, center);
            ctx.lineTo(center, center - radius/2);
            ctx.lineTo(center + radius, center);
            ctx.lineTo(center, center + radius/2);
            ctx.closePath();
            ctx.stroke();
            break;
            
        case 'plane':
            // Body
            ctx.beginPath();
            ctx.moveTo(center - radius, center);
            ctx.lineTo(center + radius, center);
            ctx.stroke();
            // Wings
            ctx.beginPath();
            ctx.moveTo(center, center - radius);
            ctx.lineTo(center, center + radius);
            ctx.stroke();
            // Tail
            ctx.beginPath();
            ctx.moveTo(center + radius/2, center - radius/3);
            ctx.lineTo(center + radius/2, center + radius/3);
            ctx.stroke();
            break;
            
        default:
            // Default vehicle shape
            ctx.strokeRect(center - radius, center - radius/2, radius * 2, radius);
    }
}

function drawShape(ctx, shape, size) {
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    const center = size / 2;
    const radius = size / 3;
    
    switch(shape) {
        case 'triangle':
            ctx.beginPath();
            ctx.moveTo(center, center - radius);
            ctx.lineTo(center + radius, center + radius);
            ctx.lineTo(center - radius, center + radius);
            ctx.closePath();
            ctx.fill();
            break;
        case 'star':
            drawStar(ctx, center, center, 5, radius, radius/2);
            break;
        case 'heart':
            drawHeart(ctx, center, center, radius);
            break;
        case 'diamond':
            ctx.beginPath();
            ctx.moveTo(center, center - radius);
            ctx.lineTo(center + radius, center);
            ctx.lineTo(center, center + radius);
            ctx.lineTo(center - radius, center);
            ctx.closePath();
            ctx.fill();
            break;
    }
}

function drawSpace(ctx, item, size) {
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'white';
    const center = size / 2;
    const radius = size / 3;
    
    switch(item) {
        case 'rocket':
            drawRocket(ctx, center, center, radius);
            break;
        case 'planet':
            ctx.beginPath();
            ctx.arc(center, center, radius, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(center + radius/2, center - radius/2, radius/4, 0, Math.PI * 2);
            ctx.stroke();
            break;
        case 'star':
            drawStar(ctx, center, center, 5, radius, radius/2);
            break;
        case 'ufo':
            drawUFO(ctx, center, center, radius);
            break;
    }
}

function drawSports(ctx, item, size) {
    ctx.strokeStyle = 'white';
    ctx.fillStyle = 'white';
    const center = size / 2;
    const radius = size / 3;
    
    switch(item) {
        case 'ball':
            ctx.beginPath();
            ctx.arc(center, center, radius, 0, Math.PI * 2);
            ctx.fill();
            // Add some curved lines for detail
            ctx.beginPath();
            ctx.arc(center, center, radius * 0.7, 0, Math.PI);
            ctx.stroke();
            break;
        case 'racket':
            ctx.beginPath();
            ctx.ellipse(center, center - radius/2, radius/2, radius, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(center, center - radius/2);
            ctx.lineTo(center, center + radius);
            ctx.stroke();
            break;
    }
}

function drawMusic(ctx, item, size) {
    ctx.strokeStyle = 'white';
    ctx.fillStyle = 'white';
    const center = size / 2;
    const radius = size / 3;
    
    switch(item) {
        case 'note':
            ctx.beginPath();
            ctx.moveTo(center + radius/2, center - radius);
            ctx.lineTo(center + radius/2, center + radius/2);
            ctx.quadraticCurveTo(center, center + radius/2, center - radius/4, center);
            ctx.fill();
            break;
        case 'guitar':
            ctx.beginPath();
            ctx.ellipse(center, center + radius/2, radius/2, radius, 0, 0, Math.PI * 2);
            ctx.moveTo(center, center - radius);
            ctx.lineTo(center, center + radius/2);
            ctx.stroke();
            break;
    }
}

// Helper function to draw a star
function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius) {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    let step = Math.PI / spikes;

    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    for(let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;

        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
    }
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fill();
}

// Helper function to draw a heart
function drawHeart(ctx, x, y, size) {
    ctx.beginPath();
    ctx.moveTo(x, y + size / 4);
    ctx.quadraticCurveTo(x, y, x + size / 4, y);
    ctx.quadraticCurveTo(x + size / 2, y, x + size / 2, y + size / 4);
    ctx.quadraticCurveTo(x + size / 2, y + size / 2, x, y + size);
    ctx.quadraticCurveTo(x - size / 2, y + size / 2, x - size / 2, y + size / 4);
    ctx.quadraticCurveTo(x - size / 2, y, x - size / 4, y);
    ctx.quadraticCurveTo(x, y, x, y + size / 4);
    ctx.fill();
}

function drawEmoji(ctx, emoji, size) {
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'white';
    ctx.lineWidth = 2;
    const center = size / 2;
    const radius = size / 3;
    
    switch(emoji) {
        case 'smile':
            // Face
            ctx.beginPath();
            ctx.arc(center, center, radius, 0, Math.PI * 2);
            ctx.stroke();
            // Smile
            ctx.beginPath();
            ctx.arc(center, center, radius * 0.6, 0, Math.PI);
            ctx.stroke();
            // Eyes
            ctx.beginPath();
            ctx.arc(center - radius * 0.3, center - radius * 0.2, radius * 0.1, 0, Math.PI * 2);
            ctx.arc(center + radius * 0.3, center - radius * 0.2, radius * 0.1, 0, Math.PI * 2);
            ctx.fill();
            break;
            
        case 'heart-eyes':
            // Face
            ctx.beginPath();
            ctx.arc(center, center, radius, 0, Math.PI * 2);
            ctx.stroke();
            // Heart eyes
            drawHeart(ctx, center - radius * 0.3, center - radius * 0.2, radius * 0.3);
            drawHeart(ctx, center + radius * 0.3, center - radius * 0.2, radius * 0.3);
            // Smile
            ctx.beginPath();
            ctx.arc(center, center + radius * 0.2, radius * 0.4, 0, Math.PI);
            ctx.stroke();
            break;
            
        case 'wink':
            // Face
            ctx.beginPath();
            ctx.arc(center, center, radius, 0, Math.PI * 2);
            ctx.stroke();
            // Wink
            ctx.beginPath();
            ctx.moveTo(center - radius * 0.4, center - radius * 0.2);
            ctx.lineTo(center - radius * 0.2, center - radius * 0.1);
            ctx.lineTo(center - radius * 0.4, center);
            ctx.stroke();
            // Open eye
            ctx.beginPath();
            ctx.arc(center + radius * 0.3, center - radius * 0.2, radius * 0.1, 0, Math.PI * 2);
            ctx.fill();
            // Smile
            ctx.beginPath();
            ctx.arc(center, center + radius * 0.2, radius * 0.4, 0, Math.PI);
            ctx.stroke();
            break;
            
        case 'star-eyes':
            // Face
            ctx.beginPath();
            ctx.arc(center, center, radius, 0, Math.PI * 2);
            ctx.stroke();
            // Star eyes
            drawStar(ctx, center - radius * 0.3, center - radius * 0.2, 5, radius * 0.2, radius * 0.1);
            drawStar(ctx, center + radius * 0.3, center - radius * 0.2, 5, radius * 0.2, radius * 0.1);
            // Smile
            ctx.beginPath();
            ctx.arc(center, center + radius * 0.2, radius * 0.4, 0, Math.PI);
            ctx.stroke();
            break;
            
        case 'cool':
            // Face
            ctx.beginPath();
            ctx.arc(center, center, radius, 0, Math.PI * 2);
            ctx.stroke();
            // Sunglasses
            ctx.fillRect(center - radius * 0.5, center - radius * 0.3, radius * 0.4, radius * 0.2);
            ctx.fillRect(center + radius * 0.1, center - radius * 0.3, radius * 0.4, radius * 0.2);
            // Cool smile
            ctx.beginPath();
            ctx.arc(center, center + radius * 0.2, radius * 0.4, 0.1 * Math.PI, 0.9 * Math.PI);
            ctx.stroke();
            break;
    }
}

// Level definitions with 20 themes
const levelDefinitions = [
    {
        theme: 'Animals',
        items: ['lion', 'elephant', 'giraffe', 'penguin'],
        cardCount: 4,
        timeLimit: 30,
        background: 'linear-gradient(135deg, #4CAF50, #2196F3)',
        cardGradient: 'linear-gradient(135deg, #ff6b6b, #556270)'
    },
    {
        theme: 'Fruits',
        items: ['apple', 'banana', 'orange', 'banana'],
        cardCount: 6,
        timeLimit: 35,
        background: 'linear-gradient(135deg, #FF9800, #F44336)',
        cardGradient: 'linear-gradient(135deg, #4568DC, #B06AB3)'
    },
    {
        theme: 'Vehicles',
        items: ['car', 'bike', 'plane', 'truck'],
        cardCount: 8,
        timeLimit: 40,
        background: 'linear-gradient(135deg, #2196F3, #673AB7)',
        cardGradient: 'linear-gradient(135deg, #373B44, #4286f4)'
    },    {
        theme: 'Emojis',
        items: ['smile', 'heart-eyes', 'wink', 'star-eyes', 'cool', 'smile', 'heart-eyes', 'wink', 'star-eyes', 'cool'],
        cardCount: 10,
        timeLimit: 45,
        background: 'linear-gradient(135deg, #FFD700, #FFA500)',
        cardGradient: 'linear-gradient(135deg, #FFB6C1, #FF69B4)'
    },    {
        theme: 'Mixed Challenge',
        items: ['lion', 'heart-eyes', 'car', 'orange', 'bike', 'cool', 'lion', 'heart-eyes', 'car', 'orange', 'bike', 'cool'],
        cardCount: 12,
        timeLimit: 70,
        background: 'linear-gradient(135deg, #6A1B9A, #4A148C)',
        cardGradient: 'linear-gradient(135deg, #833AB4, #FD1D1D)',
        itemThemes: {
            'lion': 'animals',
            'penguin': 'animals',
            'car': 'vehicles',
            'orange': 'fruits',
            'bike': 'vehicles',
            'plane': 'vehicles'
        }
    }
];

// Create floating background images
function createFloatingImages(level) {
    const container = document.createElement('div');
    container.className = 'floating-images';
    container.style.position = 'fixed';
    container.style.top = '0';
    container.style.left = '0';
    container.style.width = '100%';
    container.style.height = '100%';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '-1';

    // Create 10 floating images
    for (let i = 0; i < 10; i++) {
        const img = document.createElement('div');
        const size = Math.random() * 60 + 40; // Random size between 40-100px
        const item = level.items[Math.floor(Math.random() * level.items.length)];
        
        img.style.position = 'absolute';
        img.style.width = size + 'px';
        img.style.height = size + 'px';
        img.style.left = Math.random() * 100 + '%';
        img.style.top = Math.random() * 100 + '%';
        img.style.background = `url(${generateThemedImage(level.theme, item, size)})`;
        img.style.backgroundSize = 'contain';
        img.style.opacity = '0.2';
        img.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
        
        container.appendChild(img);
    }

    return container;
}
