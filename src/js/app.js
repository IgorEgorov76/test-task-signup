import * as flsFunctions from "./modules/functions.js";
flsFunctions.isWebp();

// Список годов для даты

let listYears = document.querySelector('#years')
for (let i = 1970; i < 2023; i++) {
	let element = document.createElement('option');
	element.innerHTML = i;
	listYears.appendChild(element)
}

// Список месяцев для даты

let months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
let listMonths = document.querySelector('#months')
let listDays = document.querySelector('#days')
for (let i = 0; i < months.length; i++) {
	let element = document.createElement('option');
	element.innerHTML = months[i];
	listMonths.appendChild(element)
}

// Список чисел для даты
for (let i = 1; i <= 31; i++) {
	let element = document.createElement('option');
	element.innerHTML = i;
	listDays.appendChild(element)
}
function removeChildren() {
	while (listDays.firstChild) {
		listDays.removeChild(listDays.firstChild)
	}
}
listMonths.addEventListener('change', () => {
	function addElement(i) {
		let element = document.createElement('option');
		element.innerHTML = i;
		listDays.appendChild(element)
	}
	if (listMonths.value === ('January')
		|| (listMonths.value === 'March') || (listMonths.value === 'May')
		|| (listMonths.value === 'July') || (listMonths.value === 'August')
		|| (listMonths.value === 'October') || (listMonths.value === 'December')) {
		removeChildren()
		for (let i = 1; i <= 31; i++) {
			addElement(i)
		}
	}
	if ((listMonths.value === 'April') || (listMonths.value === 'June')
		|| (listMonths.value === 'September') || (listMonths.value === 'November')) {
		removeChildren()
		for (let i = 1; i <= 30; i++) {
			addElement(i)
		}
	}
	if (listMonths.value === 'February' && (listYears.value % 4 === 0)) {
		removeChildren()
		for (let i = 1; i <= 29; i++) {
			addElement(i)
		}
	}
	else if (listMonths.value === 'February') {
		removeChildren()
		for (let i = 1; i <= 28; i++) {
			addElement(i)
		}
	}
})