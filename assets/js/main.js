const spaces = document.querySelectorAll('button');
let turn = 'X';
const modal = document.querySelector('.modal');
const container_modal = document.querySelector('.container_modal');
let x  = 0, o = 0;
const playerX = document.querySelector('.x');
const playerO = document.querySelector('.o');

let tablero = [
    null, null, null,
    null, null, null,
    null, null, null,
];

const combinaciones = [
    // HORIZONTALES
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],

    //VERTICALES
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],

    //DIAGONAL
    [0, 4, 8],
    [2, 4, 6]

];

spaces.forEach((item, index) => {
    item.addEventListener("click", () => {
        if (!tablero[index]) {
            item.innerText = turn;
            tablero[index] = turn;

            if (isWin()) {
                container_modal.innerHTML = `
                                            <h1>The player</h1>
                                            <h1>${turn}</h1>
                                            <h1>won</h1>
                                            `;
                container_modal.classList.add('active');
                if (turn === 'X') {
                    x++; 
                    playerX.textContent = x;
                }else{
                    o++; playerO.textContent = o;
                }
                
                modal.style.display = "flex";
                turn = '';
            } else if (tablero.every(cell => cell !== null)) {
                container_modal.innerHTML = `
                                            <h1>¡empate!</h1>
                                            `;
                container_modal.classList.add('active');
                modal.style.display = "flex";
            } else {
                turn = (turn === 'X') ? 'O' : 'X';
            }
        }
    })
});

function isWin() {
    for (const combinacion of combinaciones) {
        const [a, b, c] = combinacion;

        if (tablero[a] && tablero[a] === tablero[b] && tablero[a] === tablero[c]) {
            for (let i = 0; i < spaces.length; i++) {
                if (i == a) {
                    spaces[a].setAttribute("disabled", true);
                } else if (i == b) {
                    spaces[b].setAttribute("disabled", true);
                } else if (i == c) {
                    spaces[c].setAttribute("disabled", true);
                }
            }
            return true;
        }
    }
    return false;
}

function reload() {
    tablero = [
        null, null, null,
        null, null, null,
        null, null, null,
    ];

    spaces.forEach(space => {
        space.innerText = '';
        space.removeAttribute("disabled");
    });

    modal.style.display = "none";
    inner = '';
    container_modal.classList.remove('active');
}

modal.addEventListener("click", reload);
