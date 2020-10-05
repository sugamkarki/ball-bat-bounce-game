//ANCHOR canvas
var canvas = document.querySelector("canvas");
canvas.height = 400;
canvas.width = 600;
var c = canvas.getContext("2d");
var interval = 0;
var ballInterval;
var canvasMidWidth = canvas.width / 2;
var canvasHeight = canvas.height;
var batHeightLeft = canvasHeight - 50;
var batHeightRight = canvasHeight - 50;
var ballRow = 80;
var ballColumn = 500;
var ballVSpeed = 10;
var ballHSpeed = 10;
var score = 0,
	lives = 5;
function first() {
	board();
	batLeft();
	batRight();
	ball();
	// scoreCounter();
	// livesCounter();
}
function scoreCounter() {
	c.font = "16px Moon Flower";
	c.fillStyle = "#6c5ce7";
	c.fillText("Score: " + score, 15, 20);
	// c.fillText(arguments)
}
function livesCounter() {
	c.font = "16px Moon Flower";
	c.fillStyle = "#6c5ce7";
	c.fillText("Lives: " + lives, 500, 20);
}
function ball() {
	ballMake();
	ballInterval = setInterval(ballMovement, 50);
}
function ballMake() {
	scoreCounter();
	livesCounter();
	c.beginPath();
	c.fillStyle = "#fd79a8";
	c.fill();
	c.fillRect(ballColumn, ballRow, 8, 8);
	c.stroke();
	c.closePath();
}
function ballDestroy(colour) {
	c.beginPath();
	c.fillStyle = colour;
	c.fill();
	c.fillRect(ballColumn, ballRow, 8, 8);
	c.stroke();
	c.closePath();
}
function ballCondition() {
	if (
		ballColumn == 10 &&
		ballRow >= batHeightLeft &&
		ballRow <= batHeightLeft + 50
	) {
		score += 1;
		// c.fillText("Lives: " + lives, 500, 20);\
		c.fillRect(15, 10, 100, 20);

		ballHSpeed = -ballHSpeed;
	}

	if (
		ballColumn == 580 &&
		ballRow >= batHeightRight &&
		ballRow <= batHeightRight + 50
	) {
		ballHSpeed = -ballHSpeed;
	}
	if (ballColumn <= 0) {
		c.fillRect(500, 10, 50, 20);
		if (lives == 0) {
			alert("GAME OVER");
			document.location.reload();
		}
		lives--;
		ballRow = 80;
		ballColumn = 500;
	}
	if (ballRow == 0) ballVSpeed = -ballVSpeed;
	if (ballRow == 390) ballVSpeed = -ballVSpeed;
	if (ballColumn >= 280 && ballColumn < 320) {
		ballDestroy("#636e72");
	}
}
function ballMovement() {
	ballDestroy("#2d3436");
	ballCondition();

	ballColumn += ballHSpeed;
	ballRow += ballVSpeed;
	//ANCHOR
	ballMake();
}
function board() {
	for (var i = 0; i <= canvasHeight; i = i + 10) {
		c.beginPath();
		c.fillStyle = "#636e72";
		c.fillRect(canvasMidWidth - 20, i, 40, 8);
		c.closePath();
	}
}
function batRight() {
	batMovement();
	interval = setInterval(batRightCheckMovement, 1);
}
function batRightCheckMovement() {
	if (ballRow - 100 > batHeightRight) {
		clearInterval(interval);
		interval = setInterval(batRightDownMovement, 1);
	}
	if (ballRow + 0 < batHeightRight) {
		clearInterval(interval);
		interval = setInterval(batRightUpMovement, 1);
	}
}

function batRightUpMovement() {
	c.beginPath();
	c.fillStyle = "#2d3436";
	c.fill();
	c.fillRect(590, batHeightRight, 10, 50);
	batHeightRight = ballRow - 25;
	c.closePath();
	batMovement();
	batRightCheckMovement();
}
function batRightDownMovement() {
	c.beginPath();
	c.fillStyle = "#2d3436";
	c.fill();
	c.fillRect(590, batHeightRight, 10, 50);
	batHeightRight = ballRow + 25;
	c.closePath();
	batMovement();
	batRightCheckMovement();
}
function batLeft() {
	c.beginPath;
	c.fillStyle = "#d63031";
	c.fill();
	c.fillRect(0, batHeightLeft, 10, 50);
	c.closePath();
}
function batMovement() {
	c.beginPath();
	c.fillStyle = "#d63031";
	c.fill();
	c.fillRect(590, batHeightRight, 10, 50);
	c.closePath();
	c.stroke();
}
canvas.addEventListener("mousemove", (e) => {
	let relativeY = e.clientY;
	c.fillStyle = "#2d3436";
	c.fill();
	c.fillRect(0, batHeightLeft, 10, 50);
	batHeightLeft = relativeY;
	if (batHeightLeft >= 0 && batHeightLeft <= 400) {
		batLeft();
	}
});
first();
