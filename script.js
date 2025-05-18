let currentLevel = 0;
let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let score = 0;
let timer;
let timeLeft;
let isGameActive = false;
let levelScores = [];

// Menu handling
const menuToggle = document.getElementById('menu-toggle');
const sideMenu = document.getElementById('side-menu');

menuToggle.addEventListener('click', () => {
    menuToggle.classList.toggle('active');
    sideMenu.classList.toggle('active');
});

function updateLevelMenu() {
    const levelsList = document.getElementById('levels-list');
    levelsList.innerHTML = '';
    
    levelDefinitions.forEach((level, index) => {
        const levelItem = document.createElement('div');
        levelItem.className = `level-item ${index > currentLevel ? 'locked' : ''}`;
        
        const stars = levelScores[index] ? '★'.repeat(levelScores[index].stars) : '';
        
        levelItem.innerHTML = `
            <div>
                <div>Level ${index + 1}: ${level.theme}</div>
                <div class="stars">${stars}</div>
            </div>
            ${index > currentLevel ? '<span class="lock">🔒</span>' : ''}
        `;
        
        if (index <= currentLevel) {
            levelItem.addEventListener('click', () => {
                currentLevel = index;
                initializeGame();
                menuToggle.classList.remove('active');
                sideMenu.classList.remove('active');
            });
        }
        
        levelsList.appendChild(levelItem);
    });
}

function initializeGame() {
    const level = levelDefinitions[currentLevel];
    document.body.style.background = level.background;
    document.getElementById('current-level').textContent = currentLevel + 1;
    document.getElementById('theme-name').textContent = level.theme;
    
    // Remove previous floating images if they exist
    const oldFloating = document.querySelector('.floating-images');
    if (oldFloating) {
        oldFloating.remove();
    }
    
    // Add new floating images
    document.body.appendChild(createFloatingImages(level));
    
    resetGameState();
    createCards();
    updateStars(3);
    updateLevelMenu();
}

function resetGameState() {
    clearInterval(timer);
    flippedCards = [];
    matchedPairs = 0;
    moves = 0;
    isGameActive = false;
    timeLeft = levelDefinitions[currentLevel].timeLimit;
    
    document.getElementById('moves').textContent = moves;
    document.getElementById('score').textContent = score;
    document.getElementById('timer').textContent = formatTime(timeLeft);
    document.getElementById('timer-progress').style.width = '100%';
}

function createCards() {
    const level = levelDefinitions[currentLevel];
    const cardsGrid = document.getElementById('cards-grid');
    cardsGrid.innerHTML = '';
    cardsGrid.style.setProperty('--card-gradient', level.cardGradient);
    cardsGrid.setAttribute('data-cards', level.cardCount);
    
    // Select only the items we need for this level's pairs
    const pairCount = level.cardCount / 2;
    const selectedItems = level.items.slice(0, pairCount);
    const cards = [...selectedItems, ...selectedItems];
    shuffleArray(cards);
    
    cards.forEach(item => {
        const card = document.createElement('div');
        card.className = 'card';
        card.dataset.item = item;
        
        const image = generateThemedImage(level.theme, item);
        card.innerHTML = `
            <div class="card-front">
                <img src="${image}" alt="${item}">
            </div>
            <div class="card-back"></div>
        `;
        
        card.addEventListener('click', () => flipCard(card));
        cardsGrid.appendChild(card);
    });
}

function flipCard(card) {
    if (!isGameActive) {
        startTimer();
        isGameActive = true;
    }
    
    if (flippedCards.length === 2 || card.classList.contains('flipped') || 
        card.classList.contains('matched')) return;
    
    card.classList.add('flipped');
    flippedCards.push(card);
    
    if (flippedCards.length === 2) {
        moves++;
        document.getElementById('moves').textContent = moves;
        checkMatch();
    }
}

function checkMatch() {
    const [card1, card2] = flippedCards;
    const match = card1.dataset.item === card2.dataset.item;
    
    if (match) {
        matchedPairs++;
        card1.classList.add('matched');
        card2.classList.add('matched');
        score += calculateScore();
        document.getElementById('score').textContent = score;
        
        if (matchedPairs === levelDefinitions[currentLevel].cardCount / 2) {
            setTimeout(levelComplete, 500);
        }
    } else {
        setTimeout(() => {
            card1.classList.remove('flipped');
            card2.classList.remove('flipped');
        }, 1000);
    }
    
    flippedCards = [];
}

function startTimer() {
    const timerProgress = document.getElementById('timer-progress');
    const timerDisplay = document.getElementById('timer');
    
    timer = setInterval(() => {
        timeLeft--;
        timerDisplay.textContent = formatTime(timeLeft);
        
        const progress = (timeLeft / levelDefinitions[currentLevel].timeLimit) * 100;
        timerProgress.style.width = `${progress}%`;
        
        updateStars(getStarRating());
        
        if (timeLeft <= 0) {
            clearInterval(timer);
            // Handle time out
        }
    }, 1000);
}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
}

function getStarRating() {
    const level = levelDefinitions[currentLevel];
    const timePercent = timeLeft / level.timeLimit;
    
    if (timePercent >= 0.7) return 3;
    if (timePercent >= 0.4) return 2;
    return 1;
}

function calculateScore() {
    const baseScore = 10;
    const timeBonus = Math.floor(timeLeft / 10);
    const movePenalty = Math.floor(moves / 2);
    return Math.max(baseScore + timeBonus - movePenalty, 5);
}

function updateStars(count) {
    const stars = document.querySelectorAll('.star');
    stars.forEach((star, index) => {
        star.classList.toggle('active', index < count);
    });
}

function levelComplete() {
    clearInterval(timer);
    const stars = getStarRating();
    
    levelScores[currentLevel] = {
        stars: stars,
        moves: moves,
        time: levelDefinitions[currentLevel].timeLimit - timeLeft,
        score: score
    };
    
    const modal = document.getElementById('level-complete');
    modal.classList.add('active');
    
    document.getElementById('completion-time').textContent = 
        formatTime(levelDefinitions[currentLevel].timeLimit - timeLeft);
    document.getElementById('completion-moves').textContent = moves;
    document.getElementById('stars-earned').textContent = '★'.repeat(stars);
    
    document.getElementById('next-level').onclick = () => {
        modal.classList.remove('active');
        if (currentLevel < levelDefinitions.length - 1) {
            currentLevel++;
            initializeGame();
        } else {
            // Game complete - show celebration
            celebrateGameCompletion();
        }
    };
}

function celebrateGameCompletion() {
    // Create and show congratulations modal
    const modal = document.createElement('div');
    modal.style.position = 'fixed';
    modal.style.top = '50%';
    modal.style.left = '50%';
    modal.style.transform = 'translate(-50%, -50%)';
    modal.style.background = 'rgba(255, 255, 255, 0.95)';
    modal.style.padding = '2rem';
    modal.style.borderRadius = '15px';
    modal.style.textAlign = 'center';
    modal.style.zIndex = '2000';
    modal.style.color = '#333';
    modal.style.boxShadow = '0 0 20px rgba(0,0,0,0.3)';
    
    modal.innerHTML = `
        <h1 style="color: #4CAF50; margin-bottom: 1rem;">🎉 Congratulations! 🎉</h1>
        <p style="font-size: 1.2rem; margin-bottom: 1.5rem;">You've completed all 5 levels!</p>
        <button style="padding: 10px 20px; background: #4CAF50; color: white; border: none; border-radius: 5px; cursor: pointer;">Play Again</button>
    `;
    
    document.body.appendChild(modal);
    
    // Add click handler to Play Again button
    modal.querySelector('button').onclick = () => {
        document.body.removeChild(modal);
        currentLevel = 0;
        score = 0;
        levelScores = [];
        initializeGame();
    };
    
    // Trigger confetti animation
    const duration = 5000;
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 1999 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
            return clearInterval(interval);
        }

        const particleCount = 50 * (timeLeft / duration);
        
        // Burst from both sides
        confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        });
        confetti({
            ...defaults,
            particleCount,
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        });
    }, 250);
}

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Initialize game when page loads
window.onload = () => {
    initializeGame();
    updateLevelMenu();
};
