
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
    node = node.firstChild;
    //continue calling the function on each first child.  If there is no first child, it will call the funciton on its next
    //sibling, therefore traversing the entire DOM
    while (node) {
      walkTheDOM(node, func);
      node = node.nextSibling;
    }
    
  }

  walkTheDOM(document.body, hasClassName);

  return elementArray;

};
