function openChristmasTreePopup() {
    const popupWindow = window.open('', 'Christmas Tree', 'width=420,height=640');
    if (popupWindow) {
        popupWindow.document.write(`
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Colorful Sparkling Christmas Tree</title>
    <style>
        body {
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            background-color: #000;
        }
        canvas {
            border: 1px solid #fff;
        }
    </style>
</head>
<body>
    <canvas id="christmasTreeCanvas" width="500" height="700"></canvas>
    <script>{{{SCRIPT}}}</script>
</body>
</html>
                `.replace("{{{SCRIPT}}}",
`
const canvas = document.getElementById('christmasTreeCanvas');
const ctx = canvas.getContext('2d');

const levels = 30;
// dark green, dark green, dark cyan, red, white
const colors = ['#006400', '#006400', '#006400', '#008B8B', '#008B8B', '#FF0000', '#FFFFFF'];
const maxLevel = levels;
const trunkHeight = 5;
const trunkWidth = 3;
const trunkColor = '#FFFF00';
const sparkleColor = '#FFFFFF';

function drawTreeLine(level, maxLevel) {
    const stars = 2 * level - 1;
    const x = canvas.width / 2 - stars * 5 / 2;
    const y = canvas.height - trunkHeight * 20 - maxLevel * 10 + level * 10;

    for (let i = 0; i < stars; i++) {
        const color = colors[Math.floor(Math.random() * colors.length)];
        ctx.fillStyle = color;
        ctx.fillRect(x + i * 5, y, 5, 5);
    }
}

function drawTrunk(maxLevel) {
    const x = canvas.width / 2 - trunkWidth * 5 / 2;
    const y = canvas.height - trunkHeight * 20;

    ctx.fillStyle = trunkColor;
    for (let i = 0; i < trunkHeight; i++) {
        ctx.fillRect(x, y + i * 10, trunkWidth * 5, 5);
    }
}

function drawSparkles() {
    ctx.fillStyle = sparkleColor;
    for (let i = 0; i < 10; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        ctx.fillRect(x, y, 2, 2);
    }
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function drawTree() {
    clearCanvas();
    for (let level = 1; level <= levels; level++) {
        drawTreeLine(level, maxLevel);
    }
    drawTrunk(maxLevel);
    drawSparkles();
}

function animateTree() {
    drawTree();
    setTimeout(animateTree, 100); // Adjust the timeout for faster or slower sparkles
}

animateTree();
`));
        popupWindow.document.close();
    } else {
        alert('Popup blocked! Please allow popups for this website.');
    }
}

openChristmasTreePopup();

