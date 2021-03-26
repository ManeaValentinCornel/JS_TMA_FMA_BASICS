/*
function calculates and returns the e ranking of a chess player based on his/her ranking points
@param[ratingPoints]= numeric value
@return a string
*/
function calculateRanking(ratingPoints) {
	let ranking;
	switch (true) {
		case (ratingPoints >= 2400):
			ranking = "Senior master";
			break;
		case (ratingPoints >= 2200):
			ranking = "National master";
			break;
		case (ratingPoints >= 2000):
			ranking = "Expert";
			break;
		case (ratingPoints >= 1800):
			ranking = "Class A";
			break;
		case (ratingPoints >= 1600):
			ranking = "Class B";
			break;
		default:
			break;
	}
	return ranking;
}

/*
function writes to the console the rank of a chess player
@param[ratingPoints]= numeric value
@returns a String
*/
function displayRanking(rank) {
	console.log(rank);
}

/*
initializes the POINTS, [calculateRanking] to establish the rank of a player, and displays the rank to the console by calling the[displayRanking] method
writes to the console the efficiencies
*/
function init() {
	const POINTS = 3000;
	let rank = calculateRanking(POINTS);
	displayRanking(rank);
}

window.onload = init; // starts the program, by automatically calling the init() method
