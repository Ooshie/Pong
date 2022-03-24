// Load Game
window.onload = function (){
    canvasObj = document.getElementById('gc');
    canvasArea = canvasObj.getContext("2d");
    setInterval(update, 1000/30);
    canvasObj.addEventListener("mousemove", function(e){
        myPaddleY = e.clientY - paddleHeight/2;
    });
}

var myPaddleY = 40,
    aiPaddleY = 40,
    paddleThickness = 10,
    paddleHeight = 100,
    ballXvelocity = 50,
    ballYvelocity = 50,
    ballDimension = 6,
    xVelocity = 4,
    yVelocity = 4,
    aiPaddle = 2,
    canvasObj = document.getElementById('gc'),
    canvasArea = canvasObj.getContext("2d");

// Reset Game
function reset(){
    ballXvelocity = canvasObj.width/2;
    ballYvelocity = canvasObj.height/2;
    xVelocity = -xVelocity;
    yVelocity = 3;
}

// Restarts game and scores
function restartGame(){
    reset();
    localStorage.myScore = 0;
    localStorage.aiScore = 0;
}

// Updates Game
function update(){
    // Moving Ball
    ballXvelocity += xVelocity;
    ballYvelocity += yVelocity;

    // Checks

    // Left
    if(ballYvelocity < 0 && yVelocity < 0){
        yVelocity = -yVelocity;
    }
    
    if(ballYvelocity > canvasObj.height && yVelocity > 0){
        yVelocity = -yVelocity;
    }

    if(ballXvelocity < 0){
        if(ballYvelocity > myPaddleY && ballYvelocity < myPaddleY + paddleHeight){
            xVelocity = -xVelocity
            deltaY = ballYvelocity - (myPaddleY + paddleHeight/2);
            yVelocity = deltaY * 0.3;
        } else {
            localStorage.aiScore = Number(localStorage.aiScore) + 1;
            reset();
        }
    }

    // Right
    if(ballXvelocity > canvasObj.width){
        if(ballYvelocity > aiPaddleY && ballYvelocity < aiPaddleY + paddleHeight){
            xVelocity = -xVelocity
            deltaY = ballYvelocity - (aiPaddleY + paddleHeight/2);
            yVelocity = deltaY * 0.3;
        } else {
            localStorage.myScore = Number(localStorage.myScore) + 1;
            reset();
        }
    }

    // AI Movement
    if(aiPaddleY + paddleHeight/2 < ballYvelocity){
        aiPaddleY += aiPaddle;
    } else {
        aiPaddleY -= aiPaddle;
    }

    // Drawing Everything
    canvasArea.fillStyle = "#C94C79";
    canvasArea.fillRect(0, 0,canvasObj.width,canvasObj.height);
    canvasArea.fillStyle = "white";
    canvasArea.fillRect(0, myPaddleY, paddleThickness, paddleHeight);
    canvasArea.fillRect(canvasObj.width - paddleThickness, aiPaddleY, paddleThickness, paddleHeight);
    canvasArea.fillRect(ballXvelocity - ballDimension/2, ballYvelocity - ballDimension/2, ballDimension, ballDimension);
    canvasArea.font = "20px sans-serif";
    canvasArea.fillText(localStorage.myScore, 100, 100);
    canvasArea.fillText(localStorage.aiScore, canvasObj.width - 100, 100);
}