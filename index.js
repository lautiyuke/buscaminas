class minas {
	constructor(descubierto, numero, id) {
		this.descubierto = descubierto;
		this.numero = numero;
		this.id = id;
	}
}
document.addEventListener("contextmenu", function (event) {
	event.preventDefault();
});

const troleaste = () => {
	let tablero = document.getElementById("tablero");
	tablero.style.display = "none";
	let perdido = document.createElement("div");
	perdido.id = "perdido";
	perdido.innerText = "PERDISTE";
	document.body.appendChild(perdido);
	setTimeout(() => {
		location.reload();
	}, 4000);
};

function ganaste() {
	let tablero = document.getElementById("tablero");
	tablero.style.display = "none";
	let ganado = document.createElement("div");
	ganado.id = "ganado";
	ganado.innerText = "GANASTE";
	document.body.appendChild(ganado);
	setTimeout(() => {
		location.reload();
	}, 4000);
}

const dropBombas = () => {
	let posBombas = [];
	let i = 10;

	while (i !== 0) {
		let num = getRandomInt(99);
		if (!posBombas.includes(num)) {
			posBombas.push(num);
			i -= 1;
		}
	}
	return posBombas;
};

const crearTablero = () => {
	const tablero = document.createElement("div");
	tablero.id = "tablero";
	document.body.appendChild(tablero);
};

crearTablero();

var casillas = [];
for (let x = 0; x < 10; x++) {
	casillas[x] = [];
}

let posBombas = dropBombas();
console.log(posBombas);

let clickeadas = [];
let todas = [];
let i = -1;
let num = 0;
let clicks = [];

for (let x = 0; x < 10; x++) {
	for (let y = 0; y < 10; y++) {
		i++;
		casillas[x][y] = new minas(1, 1, i);
		if (!todas.includes(i)) {
			todas.push(i);
		}

		let cuadro = document.createElement("div");
		cuadro.id = num;
		num++;
		cuadro.className = "cuadro";
		clickeadas.push(cuadro.id);

		cuadro.addEventListener("mousedown", (event) => {
			if (clicks.length == clickeadas.length - posBombas.length - 1) {
				ganaste();
			} else {
				if (posBombas.includes(casillas[x][y].id)) {
					if (event.button === 0) {
						mostrarBombas(casillas, posBombas, cuadro, i);
						setTimeout(() => {
							troleaste();
						}, 2000);
					} else if (event.button === 2) {
						bandera(cuadro);
					}
				} else {
					if (event.button === 0) {
						if (!clicks.includes(cuadro.id)) {
							clicks.push(cuadro.id);
						}
						casillas[x][y].numero = checkBombas(casillas, x, y);
						cuadro.innerText = casillas[x][y].numero;
						cuadro.style.backgroundColor = "#7bb426";
					} else if (event.button === 2) {
						bandera(cuadro);
					}
				}
			}
		});
		tablero.appendChild(cuadro);
	}
}

const checkBombas = (casillas, x, y) => {
	let cont = 0,
		contA = 0,
		contB = 0,
		cA = 3,
		cB = 3;
	for (let a = x - 1; contA < cA; a++) {
		if (a > 9) {
			a = x - 1;
			contA++;
			continue;
		}
		for (let b = y - 1; contB < cB; b++) {
			if (a < 0) {
				a = 0;
				cA--;
			}
			if (b < 0) {
				b = 0;
				cB--;
			}
			if (b > 9) {
				b = y - 1;
				contB++;
				continue;
			}
			if (posBombas.includes(casillas[a][b].id)) {
				cont++;
			}
			contB++;
		}
		contA++;
		contB = 0;
		cB = 3;
	}
	return cont;
};

function getRandomInt(max) {
	return Math.floor(Math.random() * max);
}

function bandera(cuadro) {
	if (cuadro.innerText === "🚩") {
		cuadro.innerText = "";
	} else {
		cuadro.innerText = "🚩";
	}
}

function mostrarBombas(casillas, posBombas, cuadro) {
	let i = 0;
	for (let x = 0; x < 10; x++) {
		for (let y = 0; y < 10; y++) {
			if (posBombas.includes(casillas[x][y].id)) {
				cuadro = document.getElementById(i);
				console.log(cuadro);
				cuadro.innerText = "💣";
				cuadro.style.backgroundColor = "red";
			}
			i++;
		}
	}
}

function ganar() {}
