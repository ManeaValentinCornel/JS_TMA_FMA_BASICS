/*
function writes to the console a string(ISBN)
@param isbn - expects a sequence of characters or numbers
*/
function writeToConsole(isbn) {
	console.log("The ISBN is " + isbn);
}
/*
function writes to the console the length of the string(ISBN) without hyphens
@param isbn - expects a string
*/
function writeLength(isbn) {
	const HYPHEN = '-';
	let count = 0;
	for (let i = 0; i < isbn.length; i++) {
		if (isbn[i] == HYPHEN)
			continue;
		count++;
	}
	console.log("This is a " + count + " digit ISBN ");
}

/*
function writes to the console the last digit of a string(ISBN)
@param isbn - expects a string with the length of at least 1 character
*/
function writeCheckDigit(isbn) {
	if (isbn.length > 1) { //simple validation
		let lastDigit = isbn[isbn.length - 1];
		console.log("The ISBN check digit is " + lastDigit);
	} else {
		console.log("Inserted ISBN has to be longer than 1 digit");
	}
}

/*
function writes to the console the first three digits of the string(ISBN)
@param isbn - expects a string with the length of at least 3 character
*/
function writeRegistrationDigit(isbn) {
	if (isbn.length > 3) { //simple validation
		let groupPrefix = isbn[0] + isbn[1] + isbn[2];
		console.log("The ISBN registration group prefix is " + groupPrefix)
	} else {
		console.log("Inserted isbn has to be longer than 3 digits");
	}
}

/*
function bound to the window.onload event,used to avoid global scope and to be launched when the js is bonded to the html
initiliazes the ISBN number and call the writeToConsole,writeLength,writeCheckDigit,writeRegistrationDigit methods
*/
function init() {
	const ISBN = "978-0-545-01022-1";
	writeToConsole(ISBN);
	writeLength(ISBN);
	writeCheckDigit(ISBN);
	writeRegistrationDigit(ISBN);
}

window.onload = init; // starts the program, by automatically calling the init() method