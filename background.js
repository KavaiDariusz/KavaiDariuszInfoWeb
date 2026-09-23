let Mat = [];
let size = 75;

for(let i = 0; i<size; i++){
    Mat[i]=[];
    for(let j = 0; j<size; j++){
        Mat[i][j] = 0;
        if((i*23+j*9)%2==0)
            Mat[i][j]=1;
    }
}

let matrixDiv = document.getElementById("matrix");
// Tell CSS how many columns the grid has
matrixDiv.style.gridTemplateColumns = `repeat(${size}, 1fr)`;

for (let i = 0; i < size; i++) 
    for (let j = 0; j < size; j++) {
        let cell = document.createElement("div");

        cell.classList.add("cell");

        if (Mat[i][j] === 1) 
            cell.style.backgroundColor = "white";
        else 
            cell.style.backgroundColor = "black";
        
            matrixDiv.appendChild(cell);
        }

function UpdateGrid(){
    let cells = matrixDiv.children;

    for (let i = 0; i < size; i++) 
        for (let j = 0; j < size; j++) {
            let cell = cells[i*size + j];

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
            if(i+ii< 0 || i+ii>=size || j+jj<0 || j+jj>=size || (ii==0 && jj==0))
                continue;
            sum+=Mat[i+ii][j+jj];
        }
    return sum;
}

function UpdateLife(){
    let Mat2 = [];

    for(let i = 0; i<size; i++){
        Mat2[i]=[];
        for(let j = 0; j<size; j++)
            Mat2[i][j] = 0;
    }

    for(let i = 0; i<size; i++)
        for(let j = 0; j<size; j++){
            let neighbours = CalculateNeighbours(i,j);
                if(Mat[i][j]==0 && neighbours==3)
                    Mat2[i][j]=1;
                else if(Mat[i][j] && (neighbours == 2 || neighbours==3))
                    Mat2[i][j]=1;
        }

    for(let i = 0; i<size; i++)
        for(let j = 0; j<size; j++)
            Mat[i][j]=Mat2[i][j];
}

function update() {
    UpdateGrid();
    UpdateLife();

    setTimeout(update, 500);
}
setTimeout(update, 500);