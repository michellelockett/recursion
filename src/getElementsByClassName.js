// If life was easy, we could just do things the easy way:
// var getElementsByClassName = function (className) {
//   return document.getElementsByClassName(className);
// };

// But instead we're going to implement it from scratch:

//  NODE TREE https://dom.spec.whatwg.org/#concept-node

//document is at the root



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
  	function walkTheDOM(node) {
  		//check to see if the node has the target class Name
  		hasClassName(node);
  		//check its child
  		node = node.firstChild;
  		//if there is no 
  		while (node) {
  			walkTheDOM(node);
  			node = node.nextSibling;
  		}
  	}

  	walkTheDOM(document.body);
	
  //the return output is usually a nodelist but this is expecting the output to be an array
  //the array looks like this:  [body.targetClassName, div.targetClassName]
   //console.log(elementArray);
   return elementArray;

};
