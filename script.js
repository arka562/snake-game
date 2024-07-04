const board = document.getElementById('game-board');
const instructionText=document.getElementById('instruction-text');
const logo=document.getElementById('logo');
let snake = [{ x: 10, y: 10 }];
let food = generateFood();
// let gridSize = 20; 
let direction = 'right';
let gameInterval;
let time=200; 
let gameStarted=false;


function draw() {
    clearBoard();
    drawThings();
    drawFood();
}

function clearBoard() {
    const snakeSegments = document.querySelectorAll('.snake');
    snakeSegments.forEach(segment => segment.remove());

    const foodElement = document.querySelector('.food');
    if (foodElement) {
        foodElement.remove();
    }
}

function drawThings() {
    snake.forEach(segment => {
        const snakeElement = createSnakeElement('div', 'snake');
        setPosition(snakeElement, segment);
        board.appendChild(snakeElement);
    });
}

function createSnakeElement(tag, className) {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

function setPosition(element, position) {
    element.style.gridColumn = position.x;
    element.style.gridRow = position.y;
}

function drawFood() {
    const foodElement = createSnakeElement('div', 'food');
    setPosition(foodElement, food);
    board.appendChild(foodElement);
}

function generateFood() {
    let gridSize=20;
    const x = Math.floor(Math.random() * gridSize) + 1;
    const y = Math.floor(Math.random() * gridSize) + 1;
    return {x, y};
}

function move() {
    let head = { ...snake[0] };
    switch (direction) {
        case 'right':
            head.x++;
            break;
        case 'left':
            head.x--;
            break;
        case 'up':
            head.y--;
            break;
        case 'down':
            head.y++;
            break;
    }
    snake.unshift(head);
    
        
    const snakeElement = board.querySelector('.snake');
    if (snakeElement) {
        setPosition(snakeElement, head);
    }
    
    if (head.x === food.x && head.y === food.y) {
        food = generateFood();
        clearInterval(gameInterval); 
        gameInterval = setInterval(() => { 
            move();
            draw();
        }, 200);
    } else {
        snake.pop();
    }
}

document.addEventListener('keydown', (event) => {
    switch (event.key) {
        case 'ArrowUp':
            if (direction !== 'down') direction = 'up';
            break;
        case 'ArrowDown':
            if (direction !== 'up') direction = 'down';
            break;
        case 'ArrowLeft':
            if (direction !== 'right') direction = 'left';
            break;
        case 'ArrowRight':
            if (direction !== 'left') direction = 'right';
            break;
    }
});

        
draw();


// gameInterval = setInterval(() => {
//     move();
//     draw();
// }, time);
 
function gameStart(){
    gameStarted=true;
    // instructionText.style.display=none;
    // logo.style.display=none;
    gameInterval = setInterval(() => {
        move();
        // createCollision();
        draw();
    }, time);
} 
gameStart();

// function handleKeyPress(event){
//     if((!gameStarted && event.code ==='Space')|| (!gameStarted && event.key==='')){
//         gameStart();
//     }
//     else{
//         switch(event.key){
//             case 'ArrowUp':
//                 direction=up;
//                 break;
//             case 'ArrowDown':
//                 direction=down;
//                 break;
//             case 'ArrowRight':
//                 direction=right;
//                 break;
//             case 'ArrowLeft':
//                 direction=left;
//                 break;            
//         }
//     }

// }
// handleKeyPress();

// document.addEventListener('keydown',handleKeyPress);


// setInterval(() => {
//     move();
//     draw();
// }, 200);

// document.addEventListener('keydown', (event) => {
//     switch (event.key) {
//         case 'ArrowUp':
//             if (direction !== 'down') direction = 'up';
//             break;
//         case 'ArrowDown':
//             if (direction !== 'up') direction = 'down';
//             break;
//         case 'ArrowLeft':
//             if (direction !== 'right') direction = 'left';
//             break;
//         case 'ArrowRight':
//             if (direction !== 'left') direction = 'right';
//             break;
//     }
// });
// // move();
// draw();


