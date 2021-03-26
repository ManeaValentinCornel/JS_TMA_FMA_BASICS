//collection used to encapsule form details data
const PEOPLE_DETAILS = () =>  [{
        firstname: "Harold",
        lastname: "Mullins",
        birthdate: "07/04/1864",
        deathdate: "09/11/1891"
    }, {
        firstname: "Sarah",
        lastname: "Houseman",
        birthdate: "09/04/1864",
        deathdate: "10/04/1866"
    }, {
        firstname: "Alice",
        lastname: "Davis",
        birthdate: "11/12/1864",
        deathdate: "04/10/1866"
    }, {
        firstname: "Maud",
        lastname: "Adams",
        birthdate: "08/04/1864",
        deathdate: "09/11/1908"
    }, {
        firstname: "Seamus",
        lastname: "O'Brien",
        birthdate: "10/12/1864",
        deathdate: "09/11/1901"
    }];

//function used to calculate and return  age of death base on birth date and death date.
//@param [birthDate]
//@param [deathDate]
//@returns a Number and -1 if any of the parameter has an invalid format
function calculateAgeOfDeath(birthDate, deathDate) {
	//number of milliseconds since 1970/01/01 
	const bDateMilisec=(new Date(birthDate)).getTime();
	const dDateMilisec=(new Date(deathDate)).getTime();
	//seconds lived by the person.division by 1000 to change miliseconds in seconds
	const diffSeconds = (  dDateMilisec-bDateMilisec)/1000 ;
	//days lived by the person 
	const days = diffSeconds /(60 * 60 * 24); 
	//365.25 because each 4 years will be a leap year -> 0.25 days each year, so each 4 years 1 day
	const years= Math.abs(Math.trunc(days/365.25));
	return years;
   }

//function used to create a table and fill it with rows based on the [peopleDetails] list,lately 
//append it to a parent container element with the id of [tableParentId].
//@param - [tableParentId] expects a String represeting a valid field id attribute 
//@param - [peopleDetails] expects a List of Objects
function createPeopleTable(tableParentId,peopleDetails) {
    //create table header
    const table = $("<table><tr><th>First Name</th><th>Last Name</th><th>Born</th><th>Died</th><th>Age At Death</th></tr></table>");
    //loop through each list element and add its details to as a new row for the current table
    $.each(peopleDetails, (index) => {
        const firstName = peopleDetails[index].firstname;
        const lastName = peopleDetails[index].lastname;
        const birthDate = peopleDetails[index].birthdate;
        const deathDate = peopleDetails[index].deathdate;
        const ageOfDeath = calculateAgeOfDeath(birthDate,deathDate);
        table.append(
            "<tr><td>" + firstName +
            "</td><td>" + lastName +
            "</td><td>" + birthDate +
            "</td><td>" + deathDate +
            "</td><td>" + ageOfDeath +
            "</td></tr>");
    });
	//append table to its div parent
	try{	
		$(tableParentId).append(table);
	}
	catch(error){
		if (error.name === "TypeError") {
			alert("Unexpected table id  attribute, contact the administrator");
		}
	}
}

//function used to calculate the death average if a list of people and wrap it into paraghraph element
//the recent created paragraph will be appended to de [averageDivId] node
//@param - [averageDivId] expects a String represeting a valid field id attribute 
//@param - [peopleDetails]  expects a List of Objects
function createDeathAverage(averageDivId, peopleDetails) {
	const AVG_HEADLINE = "Average age of death = ";
    let ageSum = 0;
    let count = 0;
    $.each(peopleDetails, (index) => {
        let ageOfDeath = calculateAgeOfDeath(peopleDetails[index].birthdate, peopleDetails[index].deathdate);
        //-1 age of death is consider invalid and will be exluded from the overall average
        if (ageOfDeath != -1) {
            ageSum += ageOfDeath;
            count++;
        }
    });
    //avoid division LBYL
    let average = (count === 0) ? 0 : Math.floor(ageSum / count);
    try {
        $(averageDivId).append("<br><p>" +AVG_HEADLINE + average + " </p>");
    } catch (error) {
            alert("Unexpected average paragraph id, contact the administrator");
    }
}

//function initialisez all data required to create and display the peope details table and death average paragraph.
//initizalises the required constants and calls the functions createPeopleTable(),createDeathAverage()
function displayPeopleInfo() {
	const TALBE_ID="#censusdata";
	const AVERAGE_ID="#averageageatdeath";
	let list=PEOPLE_DETAILS();
    createPeopleTable(TALBE_ID,list);
    createDeathAverage(AVERAGE_ID,list);  
}

$(document).ready( displayPeopleInfo);//starts the program by automatically calling the displayPeopleInfo method when the DOM was fully loaded