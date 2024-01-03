export class ValidatingFunctions {
	static notNull(value: any) {
		return value || value !== '' || Number.isInteger(Number.parseInt(value));
	}

	static cpf(value: any): boolean {
		return (
			ValidatingFunctions.notNull(value) && validateCPF(value) && value.split('').length === 11
		);
	}

	static cnpj(value: any): boolean {
		return (
			ValidatingFunctions.notNull(value) && validateCNPJ(value) && value.split('').length === 14
		);
	}

	static email(value: any): boolean {
		return(ValidatingFunctions.notNull(value) && validateEmail(value));
	}
}

function validateCPF(cpf: string): boolean {
	cpf = cpf.toString().replace(/[^\d]+/g, '');
	if (cpf == '') return false;
	if (
		cpf.length != 11 ||
		cpf == '00000000000' ||
		cpf == '11111111111' ||
		cpf == '22222222222' ||
		cpf == '33333333333' ||
		cpf == '44444444444' ||
		cpf == '55555555555' ||
		cpf == '66666666666' ||
		cpf == '77777777777' ||
		cpf == '88888888888' ||
		cpf == '99999999999'
	)
		return false;
	let add = 0;
	let rev = 0;
	for (let i = 0; i < 9; i++) add += parseInt(cpf.charAt(i)) * (10 - i);
	rev = 11 - (add % 11);
	if (rev == 10 || rev == 11) rev = 0;
	if (rev != parseInt(cpf.charAt(9))) return false;
	add = 0;
	for (let i = 0; i < 10; i++) add += parseInt(cpf.charAt(i)) * (11 - i);
	rev = 11 - (add % 11);
	if (rev == 10 || rev == 11) rev = 0;
	if (rev != parseInt(cpf.charAt(10))) return false;
	return true;
}

function validateCNPJ(cnpj: string): boolean {
	cnpj = cnpj.toString().replace(/[^\d]+/g, '');
	if (cnpj == '') return false;
	if (cnpj.length != 14) return false;
	if (
		cnpj == '00000000000000' ||
		cnpj == '11111111111111' ||
		cnpj == '22222222222222' ||
		cnpj == '33333333333333' ||
		cnpj == '44444444444444' ||
		cnpj == '55555555555555' ||
		cnpj == '66666666666666' ||
		cnpj == '77777777777777' ||
		cnpj == '88888888888888' ||
		cnpj == '99999999999999'
	)
		return false;

	let size = cnpj.length - 2;
	let numbers: any = cnpj.substring(0, size);
	let digits = cnpj.substring(size);
	let sum = 0;
	let pos = size - 7;
	for (let i = size; i >= 1; i--) {
		sum += numbers.charAt(size - i) * pos--;
		if (pos < 2) pos = 9;
	}
	let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
	if (result != Number.parseInt(digits.charAt(0))) return false;

	size = size + 1;
	numbers = cnpj.substring(0, size);
	sum = 0;
	pos = size - 7;
	for (let i = size; i >= 1; i--) {
		sum += numbers.charAt(size - i) * pos--;
		if (pos < 2) pos = 9;
	}
	result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
	if (result != Number.parseInt(digits.charAt(1))) return false;

	return true;
}

function validateEmail(email: string): boolean {
	return email.includes('@') && email.includes('.com')
}