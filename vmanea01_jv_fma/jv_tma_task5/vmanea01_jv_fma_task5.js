//function used to spin and html element node based of a unit on a desired angle. The turn degree parameter represent the amount of degree the element has to spin
//@param - [elementNode] - valid html element node
//@param - [turnDegree]  - Number representing the degree that the element has to rotate
//@param - [callback]  - calback function used to call another function when the element completed its rotation
function turnElement(elementNode,turnDegree,callback){
	let i=0;
	const animate=setInterval(function(){
		$(elementNode).css({'transform' : 'rotate('+ i +'deg)'});
		i++;
		if(i===turnDegree){
			clearInterval(animate);		
			if(callback!== undefined && typeof callback === 'function' ){
				callback();			
			}
		}		
	},20);
}

//function used to fade out an element
function fadeElement(elementNode){
	$(elementNode).fadeOut();
}

//function used to spin and html element node based of a unit of time represented in miliseconds[rotationTime]
//the element can rotate forward or backwards based on [rotateForward] parameter
//after a the rotaion complete the element can be reversed by spining to its original angle[spinBack]
//@param - [elementNode] - valid html element node
//@param - [rotationTime]  - Number, rotaton time represented in miliseconds
//@param - [currentDegree]  - Number current rotaion degree of an element 
//@param - [spinBack] Boolean - after a complete rotation the element will spin back
//@param - [rotateForward]  Boolean - direction of the rotation
function rotateElement(elementNode,rotationTime,currentDegree=0,spinBack=false,rotateForward=true){
	let degree=currentDegree;
	const rotate=setInterval(function(){
		
		$(elementNode).css({'transform' : 'rotate('+ degree +'deg)'});
		if(rotateForward){
			degree++;
		}
		else{
			degree--;
		}
	},10);
	setTimeout(function(){
		clearInterval(rotate);	
		if(spinBack){
			rotateElement(elementNode,rotationTime,currentDegree,!spinBack,!rotateForward);
		}	
		else{
			fadeElement(elementNode);
		}	
	},rotationTime);
}

//function used to display the whole animation 
//elements change theier color, traverse a section and after that start the required rotation
function displayAnimation(){
	//the triks was to make both element to have same distance from a margin... for example th
	//distance that need to be traverse is =(1200(background)-100px(total margins)-(100(half of the square size)))/2
	//distance =500px
	 	$(".square").animate({backgroundColor: '#FF0000', borderColor: '#FF0000'}, 5000).animate({left: '500px'}, 5000,function() {	
			turnElement("#leftSquare",45,function(){		
				const rotationTime=10000;
				rotateElement("#leftSquare",rotationTime,45,true);
				rotateElement("#rightSquare",rotationTime,0,true);			
		});
	});
	
}

$(document).ready(displayAnimation);