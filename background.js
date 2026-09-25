let Mat = [];
let updating = false;

const BaseSize = 16;
let Size = 0;
let cols;
let rows;

let resizeTimeout;

const presets = [
    [
        [0, 0, 0],
        [1, 1, 1],
        [0, 0, 0]
    ],
    [
        [0, 0, 1],
        [1, 0, 1],
        [0, 1, 1]
    ],
    [
        [0, 0, 1, 1, 0],
        [1, 1, 0, 1, 1],
        [1, 1, 1, 1, 0],
        [0, 1, 1, 0, 0]
    ],
    [
        [0, 1, 1, 0, 0],
        [1, 1, 0, 1, 1],
        [0, 1, 1, 1, 1],
        [0, 0, 1, 1, 0]
    ],
    [
        [1, 1, 0],
        [1, 0, 1],
        [0, 1, 0]
    ],
    [
        [0, 0, 0, 0, 1, 1, 0],
        [1, 1, 1, 1, 0, 1, 1],
        [1, 1, 1, 1, 1, 1, 0],
        [0, 1, 1, 1, 1, 0, 0]
    ],
    [
        [0, 1, 1, 0, 0, 0, 0],
        [1, 1, 0, 1, 1, 1, 1],
        [0, 1, 1, 1, 1, 1, 1],
        [0, 0, 1, 1, 1, 1, 0]
    ],
    [
        [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
        [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
        [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
        [1, 0, 0, 0, 0, 1, 0, 1, 0, 0, 0, 0, 1],
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [0, 0, 1, 1, 1, 0, 0, 0, 1, 1, 1, 0, 0],
    ],
    [
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1],
        [1, 0, 1],
        [1, 1, 1],
    ],
    [
        [1, 1, 1],
        [1, 1, 1],
        [1, 1, 1]
    ]
];

const canvas = document.getElementById("matrix");
const ctx = canvas.getContext("2d");

//k = which preset
function CheckPreset(k, i, j) {
    for (let ii = 0; ii < presets[k].length; ii++)
        for (let jj = 0; jj < presets[k][ii].length; jj++)
            if (i + ii >= rows || j + jj >= cols)
                return 0;
    return 1;
}
function DrawPreset(k, i, j) {
    for (let ii = 0; ii < presets[k].length; ii++)
        for (let jj = 0; jj < presets[k][ii].length; jj++)
            Mat[i + ii][j + jj] = presets[k][ii][jj];
}

function UpdateCanvas() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {

            if (Mat[i][j] === 1) {
                ctx.fillStyle = "white";
                ctx.fillRect(
                    j * Size,
                    i * Size,
                    Size,
                    Size
                );
            }
        }
    }
}

function CalculateNeighbours(i, j) {
    let sum = 0;
    for (let ii = -1; ii <= 1; ii++)
        for (let jj = -1; jj <= 1; jj++) {
            if (i + ii < 0 || i + ii >= rows || j + jj < 0 || j + jj >= cols || (ii == 0 && jj == 0))
                continue;
            sum += Mat[i + ii][j + jj];
        }
    return sum;
}

function UpdateLife() {
    let Mat2 = [];

    for (let i = 0; i < rows; i++) {
        Mat2[i] = [];
        for (let j = 0; j < cols; j++)
            Mat2[i][j] = 0;
    }

    for (let i = 0; i < rows; i++)
        for (let j = 0; j < cols; j++) {
            let neighbours = CalculateNeighbours(i, j);
            if (Mat[i][j] == 0 && neighbours == 3)
                Mat2[i][j] = 1;
            else if (Mat[i][j] && (neighbours == 2 || neighbours == 3))
                Mat2[i][j] = 1;
        }

    if (!updating)
        for (let i = 0; i < rows; i++)
            for (let j = 0; j < cols; j++)
                Mat[i][j] = Mat2[i][j];
}

function DrawRandomlyPresets(amount) {
    for (let i = 0; i < amount; i++) {
        let ii = Math.floor(Math.random() * rows);
        let jj = Math.floor(Math.random() * cols);
        let k = Math.floor(Math.random() * presets.length);
        if (CheckPreset(k, ii, jj))
            DrawPreset(k, ii, jj);
        else
            i--;
    }
}

function update() {
    UpdateCanvas();
    UpdateLife();

    setTimeout(update, 1000);
}


function GenerateBackground() {
    Mat = [];
    updating = true;

    let currentSize = BaseSize

    cols = Math.floor(window.innerWidth / currentSize);
    rows = Math.floor(window.innerHeight / currentSize);

    while (cols * rows < 5000) {
        currentSize /= 2;
        cols = Math.floor(window.innerWidth / currentSize);
        rows = Math.floor(window.innerHeight / currentSize);
    }

    while (cols * rows > 10000) {
        currentSize *= 2;
        cols = Math.floor(window.innerWidth / currentSize);
        rows = Math.floor(window.innerHeight / currentSize);
    }

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    Size = currentSize;

    for (let i = 0; i < rows; i++) {
        Mat[i] = [];
        for (let j = 0; j < cols; j++)
            Mat[i][j] = 0;
    }

    DrawRandomlyPresets(20);
    updating = false;
}

window.addEventListener("resize", () => {
    clearTimeout(resizeTimeout);

    resizeTimeout = setTimeout(() => {
        GenerateBackground();
    }, 200);
});

GenerateBackground();
setTimeout(update, 1000);
