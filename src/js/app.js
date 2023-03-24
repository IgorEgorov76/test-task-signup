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

document.addEventListener('DOMContentLoaded', function () {
	const form = document.getElementById('form');
	const formBody = document.getElementById('form-body')
	const password = document.getElementById('password')
	const passwordConf = document.getElementById('password-conf')

	form.addEventListener('submit', formSend);

	async function formSend(e) {
		e.preventDefault();
		let error = formValidate(form);
		let formData = new FormData(form);

		if (error === 0) {
			const data = Object.fromEntries(formData);
			console.log(data);
			formBody.classList.add('_sending');
			form.reset();
			formBody.classList.remove('_sending');
			alert('Регистрация прошла успешно!')
		}
		else {
			alert('Заполните обязательные поля')
		}
	}

	function formValidate(form) {
		let error = 0;
		let formReq = document.querySelectorAll('._req')

		for (let index = 0; index < formReq.length; index++) {
			const input = formReq[index];
			formRemoveError(input);

			if (input.classList.contains('_password')) {
				if (passwordTest(input)) {
					if (password.value === passwordConf.value) {
					}
					else {
						formAddError(input);
						error++;
						alert('Пароли должны совпадать');
					}
				}
				else {
					formAddError(input);
					error++;
					alert('Пароль должен содержать как минимум 8 символом, 1 заглавную, 1 строчную букву и один спец. символ');
				}
			}
			else if (input.classList.contains('_email')) {
				if (emailTest(input)) {
					formAddError(input);
					error++;
				}
			}
			else {
				if (input.value === '') {
					formAddError(input);
					error++;
				}
			}
		}
		console.log(`error = ${error}`)
		return error;
	}
	function formAddError(input) {
		input.parentElement.classList.add('_error');
		input.classList.add('_error')
	}
	function formRemoveError(input) {
		input.parentElement.classList.remove('_error');
		input.classList.remove('_error');
	}

	// Тест email
	function emailTest(input) {
		return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value)
	}
	// Тест password
	function passwordTest(input) {
		return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/g.test(input.value)
	}
})