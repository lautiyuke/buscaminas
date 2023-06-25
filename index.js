class Casilla {
	constructor(descubierta, numero, id) {
		this.descubierta = descubierta;
		this.numero = numero;
		this.id = id;
	}
}

function troleaste() {
	let tablero = document.getElementById("tablero");
	tablero.style.display = "none";

	let perdido = document.createElement("div");
	perdido.id = "perdido";
	perdido.innerText = "PERDISTE";
	document.body.appendChild(perdido);

	setTimeout(() => {
		location.reload();
	}, 4000);
}

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

function dropBombas() {
	let posBombas = [];
	let i = 10;

	while (i !== 0) {
		let num = getRandomInt(99);
		if (!posBombas.includes(num)) {
			posBombas.push(num);
			i--;
		}
	}
	return posBombas;
}

function crearTablero() {
	const tablero = document.createElement("div");
	tablero.id = "tablero";
	document.body.appendChild(tablero);
}

function checkBombas(casillas, x, y) {
	let cont = 0;
	let contA = 0;
	let contB = 0;
	let cA = 3;
	let cB = 3;

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
}

function mostrarCasillasVacias(casillas, x, y) {
	let contA = 0;
	let contB = 0;
	let cA = 3;
	let cB = 3;

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
			let cuadro = document.getElementById(casillas[a][b].id);
			if (!cuadro.innerText && cuadro.style.backgroundColor !== "#7bb426") {
				cuadro.innerText = checkBombas(casillas, a, b);
				cuadro.style.backgroundColor = "#7bb426";
				if (cuadro.innerText === "0") {
					mostrarCasillasVacias(casillas, a, b);
				}
			}
			contB++;
		}
		contA++;
		contB = 0;
		cB = 3;
	}
}

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

function mostrarBombas(casillas, posBombas) {
	let i = 0;

	for (let x = 0; x < 10; x++) {
		for (let y = 0; y < 10; y++) {
			if (posBombas.includes(casillas[x][y].id)) {
				let cuadro = document.getElementById(i);
				cuadro.innerText = "💣";
				cuadro.style.backgroundColor = "red";
			}
			i++;
		}
	}
}

crearTablero();

let casillas = [];
for (let x = 0; x < 10; x++) {
	casillas[x] = [];
}

let posBombas = dropBombas();
//console.log(posBombas);

let clickeadas = [];
let todas = [];
let num = 0;

for (let x = 0; x < 10; x++) {
	for (let y = 0; y < 10; y++) {
		casillas[x][y] = new Casilla(1, 1, num);
		if (!todas.includes(num)) {
			todas.push(num);
		}
		let cuadro = document.createElement("div");
		cuadro.id = num;
		num++;
		cuadro.className = "cuadro";
		clickeadas.push(cuadro.id);

		cuadro.addEventListener("mousedown", (event) => {
			if (posBombas.includes(casillas[x][y].id)) {
				if (event.button === 0) {
					mostrarBombas(casillas, posBombas);
					setTimeout(() => {
						troleaste();
					}, 2000);
				} else if (event.button === 2) {
					bandera(cuadro);
				}
			} else {
				if (event.button === 0) {
					cuadro.innerText = checkBombas(casillas, x, y);
					cuadro.style.backgroundColor = "#7bb426";
					if (cuadro.innerText === "0") {
						mostrarCasillasVacias(casillas, x, y);
					}
				} else if (event.button === 2) {
					bandera(cuadro);
				}
			}
		});
		tablero.appendChild(cuadro);
	}
}