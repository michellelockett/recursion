// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:

var getElementsByClassName = function(className) {
	//an array to store the elements that do contain the class name
	var elementArray = [];

	//a helper function to check if an element contains the class name and if so, push onto return array
	var hasClassName = function(element) {
		if(element.classList && element.classList.contains(className)) {
			elementArray.push(element);
		}
	}
  	
  	//a recursive function to walk the dom
  	function walkTheDOM(node, func) {
  		//call the passed in function on the inital node
  		func(node);
  		//loop through each of its children, calling this function recursively on each child, and all of its children
  		for (node = node.firstChild; node !== null; node = node.nextSibling) {
  			walkTheDOM(node, func);
  		}
  		
  	}

  	walkTheDOM(document.body, hasClassName);

	return elementArray;

};
