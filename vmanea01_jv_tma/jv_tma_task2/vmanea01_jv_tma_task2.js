/*
function computes and returns the fuel efficiency in metric units(liter/km), based on the distance driven(KM) with the corresponding amount of fuel(in liters)
@param[fuel]= numeric value
@param[distance]= numeric value different of 0
@return a numeric value
*/
function calculateLitresPerKm(fuel, distance) {
	let fuelEfficiency = (fuel * 100 / distance);
	return fuelEfficiency;
}

/*
function computes and returns the fuel efficiency in imperial units(gallon/mile), based on the distance driven(km) with the corresponding amount of fuel(in liters)
@param[fuel]= numeric value
@param[distance]= numeric value different of 0
@return a numeric value
*/
function calculateGallonsPerMiles(fuel, distance) {
	const MILE_IN_KM = 0.62137119223733; //represent the numeric constant required to get miles from km
	const GALLON_IN_LITER = 0.21996923465436; //represent the numeric constant required to get gallon from liter
	let litrePerKm = calculateLitresPerKm(fuel, distance);
	let gallonPerMile = (litrePerKm * GALLON_IN_LITER) / MILE_IN_KM;
	return gallonPerMile;
}

/*
initializes the DISTANCE_KM and FUEL_LITER and calls the [calculateLitresPerKm] ,[calculateGallonsPerMiles] in order establishes the fuelEfficiency in metric and imperial units 
writes to the console the efficiencies
*/
function init() {
	const DISTANCE_KM = 500;
	const FUEL_LITER = 52.28;
	let efficiencyKmLiter = calculateLitresPerKm(FUEL_LITER, DISTANCE_KM).toFixed(2);
	let efficiencyImperialGallon = calculateGallonsPerMiles(FUEL_LITER, DISTANCE_KM).toFixed(2);
	console.log("Your car has a fuel economy of " + efficiencyKmLiter + " litres per jhundred kilometres.");
	console.log("Your car has a fuel economy of " + efficiencyImperialGallon + " gallons per hundred miles.");
}

window.onload = init; // starts the program, by automatically calling the init() method

