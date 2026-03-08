// static/js/games.js

// ===== VARIABLES GLOBALES =====
let currentGame = 1;
let currentExample = {};
let score = 0;
let level = 1;
let streak = 0;

// ===== FUNCIONES DE UTILIDAD =====

/**
 * Muestra un mensaje en el contenedor especificado
 */
function showMessage(containerId, message, isSuccess) {
    const container = document.getElementById(containerId);
    if (container) {
        const alertClass = isSuccess ? 'alert-success' : 'alert-danger';
        container.innerHTML = `
            <div class="alert ${alertClass} fade-in" role="alert">
                <i class="bi ${isSuccess ? 'bi-check-circle' : 'bi-exclamation-triangle'} me-2"></i>
                ${message}
            </div>
        `;
        
        // Auto-ocultar después de 3 segundos
        setTimeout(() => {
            container.innerHTML = '';
        }, 3000);
    }
}

/**
 * Limpia el mensaje de un contenedor
 */
function clearMessage(containerId) {
    const container = document.getElementById(containerId);
    if (container) {
        container.innerHTML = '';
    }
}

/**
 * Anima un elemento
 */
function animateElement(elementId, animationClass) {
    const element = document.getElementById(elementId);
    if (element) {
        element.classList.add(animationClass);
        setTimeout(() => {
            element.classList.remove(animationClass);
        }, 500);
    }
}

/**
 * Actualiza la puntuación en la interfaz
 */
function updateScoreDisplay(score, level, streak) {
    document.getElementById('score-display').textContent = score;
    document.getElementById('level-display').textContent = level;
    document.getElementById('streak-display').textContent = streak;
}

/**
 * Envía la puntuación al servidor
 */
async function updateScore(correct, gameId) {
    try {
        const response = await fetch('/api/update_score', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                correct: correct,
                game_id: gameId
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            updateScoreDisplay(data.score, data.level, data.streak);
            
            if (correct && data.points_earned > 0) {
                showMessage('message', `¡Correcto! Has ganado ${data.points_earned} puntos.`, true);
            }
        }
        
        return data;
    } catch (error) {
        console.error('Error:', error);
    }
}

// ===== JUEGO 1: CONSTRUYE LA ORACIÓN =====

/**
 * Carga un ejemplo aleatorio para el juego 1
 */
async function loadExampleGame1() {
    try {
        const response = await fetch('/api/random_example');
        const data = await response.json();
        
        currentExample = data;
        document.getElementById('example-sentence').textContent = data.sentence;
        document.getElementById('example-explanation').textContent = data.explanation;
        document.getElementById('user-input').value = '';
        clearMessage('message');
    } catch (error) {
        console.error('Error:', error);
    }
}

/**
 * Verifica la oración del usuario en el juego 1
 */
function checkSentence() {
    const userInput = document.getElementById('user-input').value.trim();
    
    if (!userInput) {
        showMessage('message', 'Por favor escribe una oración', false);
        animateElement('user-input', 'pulse');
        return;
    }
    
    const hasSi = userInput.toLowerCase().includes('si ') || userInput.includes('Si ');
    const hasComma = userInput.includes(',');
    
    if (hasSi && hasComma) {
        showMessage('message', '¡Correcto! Buena construcción condicional.', true);
        updateScore(true, 1);
        animateElement('game-container', 'fade-in');
    } else {
        showMessage('message', 'Recuerda usar "si" y una coma para separar condición y consecuencia', false);
        updateScore(false, 1);
    }
}

// ===== JUEGO 2: CLASIFICA EL TIPO =====

/**
 * Carga un ejemplo aleatorio para el juego 2
 */
async function loadExampleGame2() {
    try {
        const response = await fetch('/api/random_example');
        const data = await response.json();
        
        currentExample = data;
        document.getElementById('example-sentence').textContent = data.sentence;
        clearMessage('message');
    } catch (error) {
        console.error('Error:', error);
    }
}

/**
 * Verifica la categoría seleccionada en el juego 2
 */
function checkCategory(selectedCategory) {
    if (selectedCategory === currentExample.category) {
        showMessage('message', `¡Correcto! ${currentExample.explanation}`, true);
        updateScore(true, 2);
    } else {
        showMessage('message', `Incorrecto. Es una oración ${currentExample.category}`, false);
        updateScore(false, 2);
    }
}

// ===== JUEGO 3: COMPLETA LOS HUECOS =====

let blankAnswers = [];
let blankInputs = [];

/**
 * Configura el juego de completar huecos
 */
async function setupBlanksGame() {
    try {
        const response = await fetch('/api/random_example');
        const data = await response.json();
        
        currentExample = data;
        const words = data.sentence.split(' ');
        const numBlanks = Math.min(4, Math.max(2, Math.floor(words.length / 3)));
        
        // Seleccionar índices aleatorios
        const blankIndices = [];
        while (blankIndices.length < numBlanks) {
            const randomIndex = Math.floor(Math.random() * words.length);
            if (!blankIndices.includes(randomIndex)) {
                blankIndices.push(randomIndex);
            }
        }
        blankIndices.sort((a, b) => a - b);
        
        // Guardar respuestas
        blankAnswers = [];
        blankInputs = [];
        
        // Construir HTML
        let html = '<div class="text-center">';
        for (let i = 0; i < words.length; i++) {
            if (blankIndices.includes(i)) {
                const answer = words[i].replace(/[.,;!?]/g, '');
                blankAnswers.push(answer);
                
                const inputId = `blank-${blankInputs.length}`;
                blankInputs.push(inputId);
                
                html += `<input type="text" class="blank-input form-control d-inline-block mx-1" id="${inputId}" placeholder="_____" style="width: 100px;"> `;
            } else {
                html += `<span class="mx-1">${words[i]}</span> `;
            }
        }
        html += '</div>';
        
        document.getElementById('sentence-container').innerHTML = html;
        clearMessage('message');
    } catch (error) {
        console.error('Error:', error);
    }
}

/**
 * Verifica las respuestas del juego 3
 */
function checkBlanks() {
    let allCorrect = true;
    
    for (let i = 0; i < blankInputs.length; i++) {
        const input = document.getElementById(blankInputs[i]);
        const userAnswer = input.value.trim().toLowerCase();
        const correctAnswer = blankAnswers[i].toLowerCase();
        
        if (userAnswer === correctAnswer) {
            input.classList.remove('is-invalid');
            input.classList.add('is-valid');
        } else {
            input.classList.remove('is-valid');
            input.classList.add('is-invalid');
            allCorrect = false;
        }
    }
    
    if (allCorrect) {
        showMessage('message', `¡Correcto! ${currentExample.explanation}`, true);
        updateScore(true, 3);
    } else {
        showMessage('message', `Incorrecto. La oración correcta es: ${currentExample.sentence}`, false);
        updateScore(false, 3);
    }
}

// ===== JUEGO 4: ORDENA LAS PALABRAS =====

let shuffledWords = [];
let selectedWords = [];

/**
 * Configura el juego de ordenar palabras
 */
async function setupWordOrderGame() {
    try {
        const response = await fetch('/api/random_example');
        const data = await response.json();
        
        currentExample = data;
        
        // Dividir y mezclar palabras
        shuffledWords = data.sentence.split(' ');
        for (let i = shuffledWords.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffledWords[i], shuffledWords[j]] = [shuffledWords[j], shuffledWords[i]];
        }
        
        selectedWords = [];
        updateWordDisplay();
        clearMessage('message');
    } catch (error) {
        console.error('Error:', error);
    }
}

/**
 * Actualiza la visualización de palabras
 */
function updateWordDisplay() {
    // Palabras disponibles
    let availableHTML = '';
    shuffledWords.forEach(word => {
        availableHTML += `<span class="word-draggable" onclick="selectWord('${word.replace(/'/g, "\\'")}')">${word}</span>`;
    });
    document.getElementById('available-words').innerHTML = availableHTML;
    
    // Palabras seleccionadas
    let selectedHTML = '';
    selectedWords.forEach(word => {
        selectedHTML += `<span class="word-draggable" onclick="deselectWord('${word.replace(/'/g, "\\'")}')">${word}</span>`;
    });
    document.getElementById('selected-words').innerHTML = selectedHTML;
}

/**
 * Selecciona una palabra
 */
function selectWord(word) {
    selectedWords.push(word);
    
    const index = shuffledWords.indexOf(word);
    if (index > -1) {
        shuffledWords.splice(index, 1);
    }
    
    updateWordDisplay();
}

/**
 * Deselecciona una palabra
 */
function deselectWord(word) {
    const index = selectedWords.indexOf(word);
    if (index > -1) {
        selectedWords.splice(index, 1);
    }
    
    shuffledWords.push(word);
    updateWordDisplay();
}

/**
 * Verifica el orden en el juego 4
 */
function checkOrder() {
    const userSentence = selectedWords.join(' ');
    
    if (userSentence === currentExample.sentence) {
        showMessage('message', '¡Correcto! Orden perfecto.', true);
        updateScore(true, 4);
    } else {
        showMessage('message', `Incorrecto. La oración correcta es: ${currentExample.sentence}`, false);
        updateScore(false, 4);
    }
}

// ===== JUEGO 5: MEMORIA CONDICIONAL =====

let memoryCards = [];
let flippedCards = [];
let matchedPairs = 0;
let currentMemoryExamples = [];

/**
 * Configura el juego de memoria
 */
async function setupMemoryGame() {
    try {
        matchedPairs = 0;
        flippedCards = [];
        memoryCards = [];
        currentMemoryExamples = [];
        
        // Obtener 4 ejemplos aleatorios
        for (let i = 0; i < 4; i++) {
            const response = await fetch('/api/random_example');
            const data = await response.json();
            currentMemoryExamples.push(data);
        }
        
        // Crear pares de cartas
        currentMemoryExamples.forEach(example => {
            if (example.sentence.includes(',')) {
                const parts = example.sentence.split(',');
                const condition = parts[0].trim();
                const consequence = parts.slice(1).join(',').trim();
                
                memoryCards.push({
                    text: condition,
                    type: 'condición',
                    example: example.sentence
                });
                
                memoryCards.push({
                    text: consequence,
                    type: 'consecuencia', 
                    example: example.sentence
                });
            }
        });
        
        // Mezclar cartas
        for (let i = memoryCards.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [memoryCards[i], memoryCards[j]] = [memoryCards[j], memoryCards[i]];
        }
        
        // Crear tablero
        let boardHTML = '';
        memoryCards.forEach((card, index) => {
            boardHTML += `
                <div class="col-3 mb-3">
                    <div class="memory-card card-back" onclick="flipCard(${index})" id="card-${index}">
                        <i class="bi bi-question-lg" style="font-size: 2rem;"></i>
                    </div>
                </div>
            `;
        });
        
        document.getElementById('memory-board').innerHTML = boardHTML;
        document.getElementById('pairs-count').textContent = '0';
        document.getElementById('message').innerHTML = '';
    } catch (error) {
        console.error('Error:', error);
    }
}

/**
 * Voltea una carta en el juego de memoria
 */
function flipCard(index) {
    if (flippedCards.length >= 2) return;
    
    const cardElement = document.getElementById(`card-${index}`);
    if (cardElement.classList.contains('card-matched')) return;
    
    cardElement.innerHTML = memoryCards[index].text;
    cardElement.classList.remove('card-back');
    cardElement.classList.add('card-front');
    
    flippedCards.push(index);
    
    if (flippedCards.length === 2) {
        setTimeout(checkMemoryPair, 1000);
    }
}

/**
 * Verifica si las cartas forman un par válido
 */
function checkMemoryPair() {
    const [index1, index2] = flippedCards;
    const card1 = memoryCards[index1];
    const card2 = memoryCards[index2];
    
    let validPair = card1.example === card2.example && card1.type !== card2.type;
    
    if (validPair) {
        document.getElementById(`card-${index1}`).classList.add('card-matched');
        document.getElementById(`card-${index2}`).classList.add('card-matched');
        
        matchedPairs++;
        document.getElementById('pairs-count').textContent = matchedPairs;
        
        if (matchedPairs === 4) {
            showMessage('message', '¡Felicidades! Has completado el juego de memoria.', true);
            updateScore(true, 5);
        } else {
            showMessage('message', '¡Par correcto!', true);
        }
    } else {
        document.getElementById(`card-${index1}`).innerHTML = '<i class="bi bi-question-lg" style="font-size: 2rem;"></i>';
        document.getElementById(`card-${index1}`).classList.remove('card-front');
        document.getElementById(`card-${index1}`).classList.add('card-back');
        
        document.getElementById(`card-${index2}`).innerHTML = '<i class="bi bi-question-lg" style="font-size: 2rem;"></i>';
        document.getElementById(`card-${index2}`).classList.remove('card-front');
        document.getElementById(`card-${index2}`).classList.add('card-back');
        
        showMessage('message', 'No es un par válido. Sigue intentando.', false);
    }
    
    flippedCards = [];
}

// ===== FUNCIONES DE NAVEGACIÓN =====

/**
 * Carga el siguiente ejemplo para el juego actual
 */
function nextExample(gameId) {
    switch(gameId) {
        case 1:
            loadExampleGame1();
            break;
        case 2:
            loadExampleGame2();
            break;
        case 3:
            setupBlanksGame();
            break;
        case 4:
            setupWordOrderGame();
            break;
        case 5:
            setupMemoryGame();
            break;
    }
}

// ===== INICIALIZACIÓN =====
document.addEventListener('DOMContentLoaded', function() {
    // Inicializar según la página actual
    const path = window.location.pathname;
    
    if (path.includes('/game/1')) {
        loadExampleGame1();
    } else if (path.includes('/game/2')) {
        loadExampleGame2();
    } else if (path.includes('/game/3')) {
        setupBlanksGame();
    } else if (path.includes('/game/4')) {
        setupWordOrderGame();
    } else if (path.includes('/game/5')) {
        setupMemoryGame();
    }
    
    // Tooltips de Bootstrap
    const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
    tooltipTriggerList.map(function(tooltipTriggerEl) {
        return new bootstrap.Tooltip(tooltipTriggerEl);
    });
});
