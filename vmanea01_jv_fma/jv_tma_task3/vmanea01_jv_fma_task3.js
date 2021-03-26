//collection used to encapsule form details data
const FORM = () => ({
        id: "regsiterdetails",
        checkboxId: "showpasswords",
        verifiableFields: {
            username: {
                id: "username",
                span: "usererror",
                error: "User requires to be a valid meail address"
            },
            password: {
                id: "password",
                span: "passworderror",
                error: "Password must contains a small letter , capital letter and digit"
            },
            retypedpassword: {
                id: "retypedpassword",
                span: "passwordmatcherror",
                error: "Reyped password does't match"
            }
        }
    });

//function comutes the type of a given field from password to text, and the other way around based on the [showFlag] parameter
//@param - [elementId] expects a String represeting a valid field id attribute(text/password) type
//@param - [showFlag] expects a Boolean 
function comuteTextPassword(elementId, showFlag) {
    let field = document.getElementById(elementId);
    if (!(field.type === "text" || field.type === "password")) { // the field must be text or password in order to comute
        return;
    }
    if (showFlag === true) { //if the flag that mention the field must be shown is true show field by changing it to text
        field.type = "text";
    } else {
        field.type = "password";
    }
}

//function sets a listener to a checkbox element based on its id, and comutes on each state change the fields with the ids in [passwordListId] by calling comuteTextPassword()
//@param - [id] expects a String represeting a valid checkBox id attribute.
//@param - [passwordListId] expect a list of String represint valid password field ids attributes
function setupCheckBox(id, passwordListId) {
    let checkBox = document.getElementById(id);
	//on page refresh checkBox must be false
	checkBox.checked=false;
    checkBox.addEventListener("change", () => {
        let showFlag = checkBox.checked;
        passwordListId.forEach((currentId)  => {
            comuteTextPassword(currentId, showFlag);
        });
    }, false);
}

//function show and element, change it display style to block to be seen
function showElement(element) {
    element.style.display = "block";
}

//function change an element from style to none, won't be seen on the screen anymore
function hideElement(element) {
    element.style.display = "none";
}

//function used to create span nodes after each field.Each span node element is situated as the last element of the field's parent whom represents
//Each span elemenent id and inner text is build upon each verifiable fields details[verifiableFields].Lately class attribute ERROR is added to each span for further CSS customization
//Each span element is filled them with html text, and and lately hiden by calling hideError() function, in order to be shown only when is required
//@param - [verifiableFields] expects a nested Object collection that contains key:key/value pairs.
function createSpanErrors(verifiableFields) {
	const ERROR_CLASS="error";
    for (const key in verifiableFields) {
        const field = verifiableFields[key];
        const currentElement = document.getElementById(field.id);
        const parentElement = currentElement.parentElement;
        let lastElement = parentElement.lastElementChild;
        //because there is already an span element with the required id(passwordmatcherror),we must avoid creating same element twice
        if (lastElement.id !== field.span) {
            lastElement = document.createElement("span");
            lastElement.id = field.span;
            parentElement.appendChild(lastElement);
        }
        let paragraph = document.createElement("p");
        lastElement.appendChild(paragraph);
        lastElement.className = ERROR_CLASS;
        let errotText = document.createTextNode(field.error);
        paragraph.appendChild(errotText);
        hideElement(lastElement);
    }
}

//function verifies a regular expression representing an email pattern against a given string andd returns true
//if the pattern matches and false otherwise
//@param - [email] takes valid String value
//return boolean 
function isEmailValid(email) {
    //  PERSONALLY DESIGNED SOLUTION.THE SOLUTION SHOULD COVER ALMOST EVERY NON-FANCY EMAIL ADDRESSES.
    //  WARNING -> NEGATIVE LOOK BEHIND WAS USED IN THE LAST PART OF THE REGEX. WHICH MAY NOT BE FULLY SUPPORTED BY THE OLD VERSION OF THE BROWSERS.
    //  SOLUTION DOESN'T VALIDATE: SPACES WITHIN THE QUOTES, DOUBLE DOTS BETWEEN THE QUOTES, COMMENTS AND IP ADDRESSES AS DOMAINS.
    //  REGEX  :  ^(?!\.)([a-zA-Z0-9]|[!#=%&_'`/~\*\$\+\-\?\^\{\|\}]|\.(?!\.|@)){1,64}@(?!\-|,)(([a-zA-Z0-9]|\.(?!\.)|(\-|,)(?!\-|,))){1,256}(?<!\.|,|\-)$
    //	EACH EMAIL ADDRESS IS COMPUND BY 3 ELEMENTS-> [LOCAL-PART][@][DOMAIN-PART] 
    //  1 LOCAL-PART 
    //  ^(?!\.)([a-zA-Z0-9]|[!#=%&_'`/~\*\$\+\-\?\^\{\|\}]|\.(?!\.|@)){1,64}
    //  ^  :  beginning of the string
    // 	(?!\.)  :  first character cannot be dot.
    //  [a-zA-Z0-9]  :  lower case and uppercase letters a to z and A to Z, but also digits from 0 to 9 are allowed.
    //  [!#=%&_'`/~\*\$\+\-\?\^\{\|\}] : all printable characters allowed for a valid email local part. All java-script special characters were escaped by using backslash(\).
    //  .(?!.|@)  :  dot character cannot be followed by another dot(.) cahracter or at(@) character.Look ahead negative checks the following element in case the current element is dot(.) and validates true only if the following elements are not . or @.
    //  {1,64}  :  range specified must be between minimum one character maximum 64.
    //  2 @-PART
    //  @(?!\-|,)  :  At(@) character cannot be follow by - or , character. That is more a domain rules, handled here in advance, in order to not use negative look behind in domain part.
    //  3 DOMAIN-PART
    //  (([a-zA-Z0-9]|\.(?!\.)|(\-|,)(?!\-|,))){1,256}(?<!\.|,|\-)$ 
    //  [a-zA-Z0-9]  :  rage of character lower case and uppercase letters a to z and A to Z, but also digits from 0 to 9 are allowed.
    //  \.(?!\.)  :  dot can be used, but only if it is not followed by another dot. Negative look ahead assertion used.
    //  (\-|,)(?!\-|,)  :  Dash and comma can be used only if they are not followed by another dash or comma. Negative look ahead assertion used .
    const EMAIL_REGEX = /^(?!\.)([a-zA-Z0-9]|[!#=%&_'`/~\*\$\+\-\?\^\{\|\}]|\.(?!\.|@)){1,64}@(?!\-|,)(([a-zA-Z0-9]|\.(?!\.)|(\-|,)(?!\-|,))){1,256}(?<!\.|,|\-)$/;
    return EMAIL_REGEX.test(email);
}

//function verifies a regular expression representing a password pattern against a given string andd returns true if the pattern matches and false otherwise.
//The password must be 8 character length,include at least one upper-case,at least one lower-case, and at least one digit.
//@param - [email] takes valid String value
//@returns boolean 
function isPasswordValid(pssword) {
    //(?=.*[a-z]) positive look ahead used to check if there is at least one letter between a-z
    //(?=.*[A-Z])  positive look ahead used to check if there is at least one letter between A-Z
    //(?=.*[0-9]) positive look ahead used to check if there is at least one digit between 0-9
    //. usd to specify that the password can be of any type of characters , and {8} password range.
    const PASSWORD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9]).{8}$/;
    return PASSWORD_REGEX.test(pssword);
}

//function verifies if two given strings have the same value. Return true if they have and false oterwise.
//@param - [password] takes valid String value
//@param - [retypedPassword] takes valid String value
//@returns boolean 
function isPasswordMatched(password, retypedPassword) {
    if (password === retypedPassword) {
        return true;
    }
    return false;
}

//function validated a form created upon its[formId] id by setting a submit listener. 
//Each time an submit event is triggered the function will check the field that have to be validated within the [verifiableFields] param
//Fields are verified by calling isEmailValid(),isPasswordValid(),isPasswordMatched() functions... If a field isn't valid show a span error by calling showElement(),hideElement() methods.
//@param - [formId] expects a String represeting a valid field id attribute of a form 
//@param - [verifiableFields] expects a nested Object collection that contains key:key/value pairs.
function setupFormValidation( formId, verifiableFields) {
    let registerForm = document.getElementById(formId);
    registerForm.addEventListener("submit", (event) => {
		let stopSubmit = false;
        let passwordHolder;
        //interate through each element that has to be validated
        for (let i = 0; i < registerForm.elements.length; i++) {
            let element = registerForm.elements[i];
            let elementId = element.id;
			//important to trim all the values
            let elementValue = (element.value).trim();
            let isValid;
            //check only the elements which have to validated
            if (elementId in verifiableFields) {
                switch (elementId) {
                    case verifiableFields.username.id:
                        isValid = isEmailValid(elementValue);
                        break;
                    case verifiableFields.password.id:
                        isValid = isPasswordValid(elementValue);
                        passwordHolder = elementValue;
                        break;
                    case verifiableFields.retypedpassword.id:
                        isValid = isPasswordMatched(passwordHolder, elementValue);
                        break;
                    default:
                        isValid = true;
                }
				//if the field is valid hide the error,oterwise hide it
                const spanID = verifiableFields[elementId].span;
                const spanErrorElement = document.getElementById(spanID);
                if (isValid) {  
                    hideElement(spanErrorElement);
                } else {
                    showElement(spanErrorElement);
                    stopSubmit = true;
                }
            }
        }
		if(stopSubmit)
			event.preventDefault();
    }, false);	
}

//function initialisez all data required to setup the form and calls createSpanErrors(),setupCheckBoxfunction,setupFormValidation function that cover all form features
function initForm() {
    const formId = FORM().id;
    const checkboxId = FORM().checkboxId;
    const verifiableFields = FORM().verifiableFields;
    const passwordFields = [verifiableFields.password.id, verifiableFields.retypedpassword.id];
    createSpanErrors(verifiableFields);
    setupCheckBox(checkboxId, passwordFields);
    setupFormValidation(formId, verifiableFields);
}

window.onload = initForm;