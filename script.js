// 🎬 Part 2: JavaScript Functions — Scope, Parameters & Return Values

// Global variables
let selectedStitch = 'sc'; // Default stitch
let animationInterval;

// DOM Content Loaded event
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
});

// Initialize the application
function initializeApp() {
    createPatternGrid();
    setupEventListeners();
}

// Create the pattern grid
function createPatternGrid() {
    const grid = document.getElementById('pattern-grid');
    grid.innerHTML = '';
    
    for (let i = 0; i < 100; i++) {
        const cell = document.createElement('div');
        cell.classList.add('grid-cell');
        cell.dataset.index = i;
        grid.appendChild(cell);
    }
}

// Set up event listeners
function setupEventListeners() {
    // Card flip buttons
    document.querySelectorAll('.flip-btn').forEach(button => {
        button.addEventListener('click', function(e) {
            e.stopPropagation();
            const card = this.closest('.card');
            card.classList.toggle('flipped');
        });
    });
    
    // Stitch selection
    document.querySelectorAll('.stitch').forEach(stitch => {
        stitch.addEventListener('click', function() {
            selectStitch(this.dataset.stitch);
        });
    });
    
    // Pattern grid cells
    document.querySelectorAll('.grid-cell').forEach(cell => {
        cell.addEventListener('click', function() {
            applyStitchToCell(this);
        });
    });
    
    // Clear button
    document.getElementById('clear-btn').addEventListener('click', clearPattern);
    
    // Animate button
    document.getElementById('animate-btn').addEventListener('click', animatePattern);
    
    // Calculate button
    document.getElementById('calculate-btn').addEventListener('click', calculateYarn);
}

// Select a stitch type
function selectStitch(stitchType) {
    selectedStitch = stitchType;
    
    // Update UI to show selected stitch
    document.querySelectorAll('.stitch').forEach(stitch => {
        stitch.classList.remove('selected');
        if (stitch.dataset.stitch === stitchType) {
            stitch.classList.add('selected');
        }
    });
}

// Apply selected stitch to a cell
function applyStitchToCell(cell) {
    // Remove any existing stitch classes
    cell.classList.remove('sc', 'dc', 'hdc');
    
    // Add the selected stitch class
    if (selectedStitch) {
        cell.classList.add(selectedStitch);
    }
}

// Clear the pattern grid
function clearPattern() {
    document.querySelectorAll('.grid-cell').forEach(cell => {
        cell.classList.remove('sc', 'dc', 'hdc');
    });
}

// Animate the pattern
function animatePattern() {
    // Clear any existing animation
    if (animationInterval) {
        clearInterval(animationInterval);
    }
    
    const cells = document.querySelectorAll('.grid-cell');
    let index = 0;
    
    // Remove any existing animation classes
    cells.forEach(cell => cell.classList.remove('animated'));
    
    // Set up animation interval
    animationInterval = setInterval(() => {
        if (index < cells.length) {
            // Remove animation from previous cell
            if (index > 0) {
                cells[index - 1].classList.remove('animated');
            }
            
            // Add animation to current cell if it has a stitch
            if (cells[index].classList.contains('sc') || 
                cells[index].classList.contains('dc') || 
                cells[index].classList.contains('hdc')) {
                cells[index].classList.add('animated');
            }
            
            index++;
        } else {
            // Stop animation when we reach the end
            clearInterval(animationInterval);
            animationInterval = null;
        }
    }, 100);
}

// 🧮 Yarn calculation functions

// Calculate yarn needed based on project parameters
function calculateYarnNeeded(projectType, size, gauge) {
    // These are simplified calculations for demonstration
    let yarnNeeded = 0;
    
    switch(projectType) {
        case 'scarf':
            yarnNeeded = size * gauge * 0.2; // yards
            break;
        case 'hat':
            yarnNeeded = Math.PI * Math.pow(size/4, 2) * gauge * 0.1; // yards
            break;
        case 'blanket':
            yarnNeeded = size * size * gauge * 0.05; // yards
            break;
        default:
            yarnNeeded = 0;
    }
    
    return Math.round(yarnNeeded);
}

// Format the result message based on project type and yarn amount
function formatResultMessage(projectType, yarnAmount) {
    const messages = {
        scarf: `You'll need approximately ${yarnAmount} yards of yarn for your scarf.`,
        hat: `Your hat will require about ${yarnAmount} yards of yarn.`,
        blanket: `Plan for around ${yarnAmount} yards of yarn for your blanket.`
    };
    
    return messages[projectType] || "Calculation completed.";
}

// Calculate and display yarn requirements
function calculateYarn() {
    const projectType = document.getElementById('project-type').value;
    const size = parseInt(document.getElementById('size').value);
    const gauge = parseInt(document.getElementById('gauge').value);
    
    // Validate inputs
    if (isNaN(size) || isNaN(gauge) || size <= 0 || gauge <= 0) {
        showResult("Please enter valid numbers for size and gauge.");
        return;
    }
    
    // Calculate yarn needed (demonstrating function with parameters and return value)
    const yarnNeeded = calculateYarnNeeded(projectType, size, gauge);
    
    // Format result message
    const resultMessage = formatResultMessage(projectType, yarnNeeded);
    
    // Display result
    showResult(resultMessage);
}

// Show result with animation
function showResult(message) {
    const resultBox = document.getElementById('result');
    resultBox.innerHTML = `<p>${message}</p>`;
    resultBox.classList.add('highlight');
    
    // Remove highlight class after animation completes
    setTimeout(() => {
        resultBox.classList.remove('highlight');
    }, 1000);
}

// 🎨 Part 3: Combining CSS Animations with JavaScript

// Function to trigger CSS animations via JavaScript
function triggerAnimation(element, animationName) {
    element.style.animation = 'none';
    setTimeout(() => {
        element.style.animation = `${animationName} 1s`;
    }, 10);
}

// Enhanced flip card function with animation
function flipCard(cardId) {
    const card = document.getElementById(cardId);
    card.classList.toggle('flipped');
    triggerAnimation(card, 'flip');
}

// Initialize card flip functionality
document.querySelectorAll('.card').forEach(card => {
    card.addEventListener('click', function() {
        flipCard(this.id);
    });
});

// Additional utility function to demonstrate scope
function createCounter() {
    // Demonstrating closure and function scope
    let count = 0; // This variable is in the closure scope
    
    return function() {
        count++;
        console.log(`Counter: ${count}`);
        return count;
    };
}

// Create a counter instance
const counter = createCounter();

// Add click counter to buttons for demonstration
document.querySelectorAll('button').forEach(button => {
    button.addEventListener('click', function() {
        const count = counter();
        // You could use this count for analytics or other purposes
    });
});