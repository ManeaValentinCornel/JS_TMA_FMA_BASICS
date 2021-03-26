//collection used to dollat echange rate details(each key must match with the html dropdown box menu options) 
const DOLLAR_EXHANGE_RATES = () => {
    return {
        "UK Pounds": {
            rate: 0.74
        },
        "Euros": {
            rate: 0.83
        },
        "Yen": {
            rate: 103.81
        },
        "Yuan": {
            rate: 6.57
        },
        "Swiss Francs": {
            rate: 0.90
        },
        "Canadian Dollars": {
            rate: 1.29
        }
    };
};

//function concatenates into a string a key of a collection(ratesList) with its corresponding value pair value(rate), based on the key value(currency)
//@param [currency] expect a String
//@param [ratesList]expects a nested Object collection that contains key:key/value pairs
//@returns  String
function getExchangeRate(currency, ratesList) {
    let exchangeRate = ratesList[currency].rate;
    let dollarExchangeRate = "One US Dollar buys you " + exchangeRate + " " + currency;
    return dollarExchangeRate;
}

//function wraps a string(dollarExchangeRate) into a node text element,and further appends it to a paragraph element based on its id(paragraphID)
//@param [paragraphID] - expects a valid id attribute
//@param [dollarExchangeRate] - expects a String
function showExchangeRate(paragraphID, dollarExchangeRate) {
    let paragraphElement = document.getElementById(paragraphID);
    let newTxtNode = document.createTextNode(dollarExchangeRate); //create a text element based on a string
    //if the paragraph doesn't have any child, insert a txt node within
    if (paragraphElement.childNodes.length === 0) {
        paragraphElement.appendChild(newTxtNode);
    } else {
        paragraphElement.replaceChild(newTxtNode, paragraphElement.childNodes[0]);
    }
}

//function used to remove an dropdown box option based on its value
//@param [selectMenu] - expect a valid dropdown menu element
//@param [optionValue] - expects a String(the option value we want to remove)
//@returns boolean(true) if the HINT has been successfully removed, and false otherwise.
function removeOption(selectMenu, optionValue) {
    for (let i = 0; i < selectMenu.options.length; i++) {
        if (selectMenu.options[i].value === optionValue) {
            selectMenu.removeChild(selectMenu.children[i]);
            return true;
        }
    }
    return false;
}

//function listens any selection change of selectbox menu and based on that creates an exchage rate variable by calling getExchangeRate()
//displays exchage rate value previosuly obtained by calling showExchangeRate()
//removes the hint element based on its value(SELECT_HINT_OPTION) after the first success selection change made by calling removeOption()
//@param [selectBoxID] - expect a valid id attribute of a selectbox element
//@param [exchangeRateId] - expects a valid id of a paragraph
//@param [ratesList] expects a nested Object collection that contains key:key/value pairs
//@returns boolean(true) if the HINT has been successfully removed, and false otherwise.
function setupSelectBox(selectBoxID, exchangeRateId, ratesList) {
    const SELECT_HINT_OPTION = "Select a Currency";
    //the hint will be disabled only once
    let isHintActive = true;
    let selectMenu = document.getElementById(selectBoxID);
    selectMenu.addEventListener("change", () => {
        //get selected option value
        let currency = selectMenu.options[selectMenu.selectedIndex].value;
        let exchangeRate = getExchangeRate(currency, ratesList);
        showExchangeRate(exchangeRateId, exchangeRate);
        //disable hint
        if (isHintActive) {
            isHintActive = removeOption(selectMenu, SELECT_HINT_OPTION);
        }
    }, false);
}

//function initialisez all data required to setup the selectBox menu and calls setupSelectBox(), function resposible for all selectBox functionality implementation
function initConvertor() {
    const SELECTBOX_ID = "currencies";
    const EXCHANGE_RESULT_ID = "exchangerate";
    let ratesList = DOLLAR_EXHANGE_RATES();
    setupSelectBox(SELECTBOX_ID, EXCHANGE_RESULT_ID, ratesList);
}

window.onload = initConvertor; // starts the program by automatically calling the initConvertor() method