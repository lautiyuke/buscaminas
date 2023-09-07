class Casilla {
	constructor(descubierta, numero, id) {
		this.descubierta = descubierta;
		this.numero = numero;
		this.id = id;
	}
}

function ocultarTablero() {
	const tablero = document.getElementById("tablero");
	tablero.style.display = "none";
}

function mostrarResultado(mensaje) {
	const resultado = document.createElement("div");
	resultado.id = "resultado";
	resultado.innerText = mensaje;
	document.body.appendChild(resultado);

	setTimeout(() => {
		location.reload();
	}, 4000);
}

function dropBombas() {
	const posBombas = new Set();
	while (posBombas.size < 10) {
		posBombas.add(getRandomInt(100));
	}
	return Array.from(posBombas);
}

function crearTablero() {
	const tablero = document.createElement("div");
	tablero.id = "tablero";
	document.body.appendChild(tablero);
}

function checkBombas(casillas, x, y, posBombas) {
	let cont = 0;
	for (let a = Math.max(0, x - 1); a <= Math.min(9, x + 1); a++) {
		for (let b = Math.max(0, y - 1); b <= Math.min(9, y + 1); b++) {
			const casillaId = casillas[a][b].id;
			if (posBombas.includes(casillaId)) {
				cont++;
			}
		}
	}
	return cont;
}

function mostrarCasillasVacias(casillas, x, y) {
	const visitadas = new Set();
	const faltantes = [{ x, y }];

	while (faltantes.length > 0) {
		const { x, y } = faltantes.pop();
		visitadas.add(`${x}-${y}`);

		for (let a = Math.max(0, x - 1); a <= Math.min(9, x + 1); a++) {
			for (let b = Math.max(0, y - 1); b <= Math.min(9, y + 1); b++) {
				const casilla = casillas[a][b];
				const casillaId = casilla.id;
				const casillaKey = `${a}-${b}`;
				if (!visitadas.has(casillaKey) && !casilla.descubierta) {
					casilla.descubierta = true;
					const cuadro = document.getElementById(casillaId);
					cuadro.innerText = checkBombas(casillas, a, b, posBombas);
					cuadro.style.backgroundColor = "#7bb426";
					if (cuadro.innerText === "0") {
						faltantes.push({ x: a, y: b });
					}
				}
			}
		}
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
	for (let x = 0; x < 10; x++) {
		for (let y = 0; y < 10; y++) {
			const casillaId = casillas[x][y].id;
			if (posBombas.includes(casillaId)) {
				const cuadro = document.getElementById(casillaId);
				cuadro.innerText = "💣";
				cuadro.style.backgroundColor = "red";
			}
		}
	}
}

crearTablero();

const casillas = Array.from({ length: 10 }, () => Array.from({ length: 10 }));
const posBombas = dropBombas();

for (let x = 0; x < 10; x++) {
	for (let y = 0; y < 10; y++) {
		const casillaId = x * 10 + y;
		casillas[x][y] = new Casilla(false, 1, casillaId);
		const cuadro = document.createElement("div");
		cuadro.id = casillaId;
		cuadro.className = "cuadro";

		cuadro.addEventListener("mousedown", (event) => {
			event.preventDefault();
			const casilla = casillas[x][y];
			if (casilla.descubierta) return;
			if (event.button === 0) {
				if (posBombas.includes(casillaId)) {
					mostrarBombas(casillas, posBombas);
					setTimeout(() => {
						mostrarResultado("PERDISTE");
					}, 2000);
				} else {
					casilla.descubierta = true;
					cuadro.innerText = checkBombas(casillas, x, y, posBombas);
					cuadro.style.backgroundColor = "#7bb426";
					if (cuadro.innerText === "0") {
						mostrarCasillasVacias(casillas, x, y);
					}
				}
			} else if (event.button === 2) {
				bandera(cuadro);
			}
		});

		cuadro.addEventListener("contextmenu", (event) => {
			event.preventDefault();
		});

		tablero.appendChild(cuadro);
	}
}
