let Mat = [];

const Size = 16;
const cols = Math.floor(window.innerWidth / Size);
const rows = Math.floor(window.innerHeight / Size);

for(let i = 0; i<rows; i++){
    Mat[i]=[];
    for(let j = 0; j<cols; j++)
        Mat[i][j] = 0;
}

const presets = [
    [
        [0,0,0],
        [1,1,1],
        [0,0,0]
    ],
    [
        [0,0,1],
        [1,0,1],
        [0,1,1]
    ],
    [
        [0,0,1,1,0],
        [1,1,0,1,1],
        [1,1,1,1,0],
        [0,1,1,0,0]
    ],
    [
        [1,1,0],
        [1,0,1],
        [0,1,0]
    ],
    [
        [0,0,0,0,1,1,0],
        [1,1,1,1,0,1,1],
        [1,1,1,1,1,1,0],
        [0,1,1,1,1,0,0]
    ],
    [
        [0,0,1,1,1,0,0,0,1,1,1,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0],
        [1,0,0,0,0,1,0,1,0,0,0,0,1],
        [1,0,0,0,0,1,0,1,0,0,0,0,1],
        [1,0,0,0,0,1,0,1,0,0,0,0,1],
        [0,0,1,1,1,0,0,0,1,1,1,0,0],
        [0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,1,1,1,0,0,0,1,1,1,0,0],
        [1,0,0,0,0,1,0,1,0,0,0,0,1],
        [1,0,0,0,0,1,0,1,0,0,0,0,1],
        [1,0,0,0,0,1,0,1,0,0,0,0,1],
        [0,0,0,0,0,0,0,0,0,0,0,0,0],
        [0,0,1,1,1,0,0,0,1,1,1,0,0],
    ],
    [
        [1,1,1],
        [1,0,1],
        [1,1,1],
        [1,1,1],
        [1,1,1],
        [1,1,1],
        [1,0,1],
        [1,1,1],
    ],
    [
        [1,1,1],
        [1,1,1],
        [1,1,1]
    ]
];

let matrixDiv = document.getElementById("matrix");
//  Tell CSS how many columns the grid has
matrixDiv.style.gridTemplateColumns = `repeat(${cols}, 1fr)`;
matrixDiv.style.gridTemplateRows = `repeat(${rows}, 1fr)`;

//  Setting up the background
for (let i = 0; i < rows; i++) 
    for (let j = 0; j < cols; j++) {
        let cell = document.createElement("div");

        cell.classList.add("cell");

        if (Mat[i][j] === 1) 
            cell.style.backgroundColor = "white";
        else 
            cell.style.backgroundColor = "black";
        
            matrixDiv.appendChild(cell);
        }

//k = which preset
function CheckPreset(k,i,j){
    for(let ii = 0; ii<presets[k].length; ii++)
        for(let jj = 0; jj<presets[k][ii].length; jj++)
            if(i+ii>=rows || j+jj>=cols)
                return 0;
    return 1;
}
function DrawPreset(k,i,j){  
    for(let ii = 0; ii<presets[k].length; ii++)
        for(let jj = 0; jj<presets[k][ii].length; jj++)
            Mat[i+ii][j+jj]=presets[k][ii][jj];
}

function UpdateGrid(){
    let cells = matrixDiv.children;

    for (let i = 0; i < rows; i++) 
        for (let j = 0; j < cols; j++) {
            let cell = cells[i*cols + j];

            if (Mat[i][j] === 1) 
                cell.style.backgroundColor = "white";
            else 
                cell.style.backgroundColor = "black";
        }
}

function CalculateNeighbours(i,j){
    let sum = 0;
    for(let ii = -1; ii<=1; ii++)
        for(let jj = -1; jj<=1; jj++){
            if(i+ii< 0 || i+ii>=rows || j+jj<0 || j+jj>=cols || (ii==0 && jj==0))
                continue;
            sum+=Mat[i+ii][j+jj];
        }
    return sum;
}

function UpdateLife(){
    let Mat2 = [];

    for(let i = 0; i<rows; i++){
        Mat2[i]=[];
        for(let j = 0; j<cols; j++)
            Mat2[i][j] = 0;
    }

    for(let i = 0; i<rows; i++)
        for(let j = 0; j<cols; j++){
            let neighbours = CalculateNeighbours(i,j);
                if(Mat[i][j]==0 && neighbours==3)
                    Mat2[i][j]=1;
                else if(Mat[i][j] && (neighbours == 2 || neighbours==3))
                    Mat2[i][j]=1;
        }

    for(let i = 0; i<rows; i++)
        for(let j = 0; j<cols; j++)
            Mat[i][j]=Mat2[i][j];
}

function DrawRandomlyPresets(amount){
    for(let i = 0; i<amount; i++){
        let ii = Math.floor(Math.random() * rows);
        let jj = Math.floor(Math.random() * cols);
        let k = Math.floor(Math.random() * presets.length);
        if(CheckPreset(k,ii,jj))
            DrawPreset(k,ii,jj);
        else
            i--;
    }
}

DrawRandomlyPresets(30);

function update() {
    UpdateGrid();
    UpdateLife();

    setTimeout(update, 500);
}
setTimeout(update, 500);