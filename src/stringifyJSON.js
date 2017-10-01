// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:

//https://stackoverflow.com/questions/22333101/recursive-json-stringify-implementation

var stringifyJSON = function(obj) {
	var type = typeof obj;
	console.log(type);
	//helper function to stringify arrays
	var stringifyArray = function() {
		if (obj.length === 0) {
  		return '[]';
  	} else if (obj.length === 1) {
  		return '[' + stringifyJSON(obj[0]) + ']';
  	} else {
  		var result = '[';
  		obj.forEach(function(element) {
  			if (obj.indexOf(element) === obj.length - 1) {
  				result += stringifyJSON(element);
  			} else {
  				result += stringifyJSON(element) + "," ;
  			}
  		});
  		result += ']';
  		return result;
  	}
	}
	//helper function to stringify objects
	var stringifyObect = function() {
		var result = '{';
  	if (Object.keys(obj).length === 0) {
  		return '{}';
  	} else if (Object.keys(obj).length === 1) {
  		for (var key in obj) {
  			result += '\"' + key.toString() + "\":";
  			result += stringifyJSON(obj[key]);
  		}
  	} else {		
  		for (var key in obj) {			
	  		if (typeof obj[key] !== 'function' && obj[key] !== undefined) {	
	  			result += '\"' + key.toString() + "\":";
	  			result += stringifyJSON(obj[key]);
	  			if (key !== (Object.keys(obj)[Object.keys(obj).length - 1])) {
	  				result += ",";
	  			}
  			}	  		
  		}
  	}
  	result += '}';
  	return result;
	}

	switch (type) {
		case 'boolean':
			if(obj === true) {
				return 'true';
			} else {
				return 'false';
			}
			break;
		case 'undefined':
			return;
			break;
		case 'number':
			return obj.toString();
			break;
		case 'string':
			return '\"' + obj + '"';
			break;
		case 'function':
			return;
			break;
		case 'object':
			if(obj === null) {
				return 'null';
			} else if (Array.isArray(obj)) {
				return stringifyArray();
			} else {
				return stringifyObect();
			}
			break;
		default:
			return;
	}

}

