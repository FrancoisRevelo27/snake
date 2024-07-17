const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');
const scoreDisplay = document.getElementById('score');

// Tamaño de cada celda
const cellSize = 20;
// Velocidad del juego (intervalo en milisegundos)
const gameSpeed = 105; 

// Variables del juego
let snake = [{ x: 200, y: 200 }];
let direction = { x: 0, y: 0 }; //Define la dirección inicial de la serpiente (sin movimiento).
let food = { x: 0, y: 0 };
let score = 0;
let gameInterval;

// Inicialización del juego
function init() {
    //Añade un evento para cambiar la dirección de la serpiente cuando se presiona una tecla.
    document.addEventListener('keydown', changeDirection);
    //Coloca la comida en una posición aleatoria.
    placeFood();
    gameInterval = setInterval(update, gameSpeed);
}

// Cambia la dirección de la serpiente basándose en las teclas presionadas
function changeDirection(event) {
    //Obtiene el código de la tecla presionada.
    const key = event.keyCode;
    if (key === 37 && direction.x === 0) {
        direction = { x: -cellSize, y: 0 }; // Izquierda
    } else if (key === 38 && direction.y === 0) {
        direction = { x: 0, y: -cellSize }; // Arriba
    } else if (key === 39 && direction.x === 0) {
        direction = { x: cellSize, y: 0 }; // Derecha
    } else if (key === 40 && direction.y === 0) {
        direction = { x: 0, y: cellSize }; // Abajo
    }
}

// Actualiza el estado del juego
function update() {
    // Mueve la serpiente
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);

    // Comprueba si la serpiente ha comido la comida
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        updateScore();
        placeFood();
    } else {
        snake.pop();
    }

    // Comprueba colisiones
    if (head.x < 0 || head.y < 0 || head.x >= canvas.width || head.y >= canvas.height || collision(head, snake.slice(1))) {
        clearInterval(gameInterval);
        alert(`Game Over! Your score: ${score}`);
        resetGame();
    }

    // Dibuja todo
    draw();
}

// Actualiza el puntaje mostrado en la pantalla
function updateScore() {
    scoreDisplay.textContent = `Score: ${score}`;
}

// Coloca la comida en una posición aleatoria
function placeFood() {
    food.x = Math.floor(Math.random() * canvas.width / cellSize) * cellSize;
    food.y = Math.floor(Math.random() * canvas.height / cellSize) * cellSize;
}

// Comprueba si la serpiente se ha chocado consigo misma
function collision(head, snake) {
    for (let i = 0; i < snake.length; i++) {
        if (head.x === snake[i].x && head.y === snake[i].y) {
            return true;
        }
    }
    return false;
}

// Dibuja el juego
function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'lime';
    for (let i = 0; i < snake.length; i++) {
        ctx.fillRect(snake[i].x, snake[i].y, cellSize, cellSize);
    }
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, cellSize, cellSize);
}

// Reinicia el juego
function resetGame() {
    snake = [{ x: 200, y: 200 }];
    direction = { x: 0, y: 0 };
    score = 0;
    updateScore();
    placeFood();
    gameInterval = setInterval(update, gameSpeed);
}

// Inicia el juego
init();