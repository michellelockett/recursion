// this is what you would do if you liked things to be easy:
// var stringifyJSON = JSON.stringify;

// but you don't so you're going to write it from scratch:


var stringifyJSON = function(obj) {

  if (obj === null || obj === undefined) {
  	return 'null';
  } else if (obj === true) {
  	return 'true';
  } else if (obj === false) {
  	return 'false';
  } else if (typeof obj === 'number') {
  	return obj.toString();
  } else if (typeof obj === 'string') {
  	return '\"' + obj + '"'
  } else if (Array.isArray(obj)) {
  	if (obj.length === 0) {
  		return '[]';
  	} else if (obj.length === 1) {
  		return '[' + stringifyJSON(obj[0]) + ']';
  	} else {
  		var result = '['
  		obj.forEach(function(element) {
  			if (obj.indexOf(element) === obj.length - 1) {
  				result += stringifyJSON(element);
  			} else {
  				result += stringifyJSON(element) + "," ;
  			}

  		})
  		result += ']'
  		return result;
  	}
  } else if (typeof obj === 'function') {
  	return;
  } else if (typeof obj === 'object') {
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
	  				result += ","
	  			}
  			}
	  		
  		}
  	}
  	result += '}';
  	return result;
  }
};
