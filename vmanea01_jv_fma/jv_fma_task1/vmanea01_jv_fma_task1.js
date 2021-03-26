/*
function creates a list of headlines(article summaries). Each headline is created upon the first
two cildren's text of the class elements[articleClass]
@param [articleClass] - expects a valid class name attribute
@return  a List of Strings
*/
function getSummaries(articleClass) {
	const summaries = Array();
    try {
        const articles = document.getElementsByClassName(articleClass);
        for (let i = 0; i < articles.length; i++) {
            const articleNodes = articles[i].children;
            //each article must have at least 2 nodes in order to create a headline(summary) out of it, if doesn't have is ignored
            if (articleNodes.length >= 2) {
                const articleSummary = articleNodes[0].innerHTML + "..." + articleNodes[1].innerHTML;
                summaries.push(articleSummary);
            }
        }
    } catch (error) {
        if (error.name === "TypeError") {
            alert("Unexpected article class attribute, please contact the administrator");
        }
    }
    return summaries;
}
/*
function creates a html unordered list element(ul) and populates it with list elements(li)
each li corresponds to an element of the [summaries] list.
the ul list is customised and appedend to the node element with the id id of [healinesId].
@param [summaries] - expects a list of Strings(headlines) 
@param [healinesId] - expects a valid id attribute
*/
function createHeadlines(summaries, healinesId) {
    try {
        const headlinesNode = document.getElementById(healinesId);
        const list = document.createElement("UL");
        //remove the ul default padding behaviour
        list.style.marginLeft = "0px";
        list.style.padding = "0px";
        headlinesNode.appendChild(list);
        for (let i = 0; i < summaries.length; i++) {
            const listElement = document.createElement("li");
            const textNode = document.createTextNode(summaries[i]);
            listElement.appendChild(textNode);
            //append the newly created list element to list
            list.appendChild(listElement);
        }
    } catch (error) {
        if (error.name === "TypeError") {
            alert("Unexpected healines node id,  please contact the administrator");
        }
    }
}
//function initialisez the html attributes as constants 
//calls and calls getSummaries() function resposible for optaining the headlines(summaries), 
//callsthe function required to create and display the headlines createHeadlines()
function displayHeadlines() {
    const ARTICLES = "newsarticle";
    const NEW_HEADLINES = "headlines";
    const summaries = getSummaries(ARTICLES);
    createHeadlines(summaries, NEW_HEADLINES);
}

window.onload = displayHeadlines; // starts the program by automatically calling the displayHeadlines() method