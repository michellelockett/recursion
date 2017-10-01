function parseJSON(input) {
	//input = input.replace(/ /g,'');
  //keep track of where we are in the input
	var index = 0;
  //keep track of what character we are evaluating
	var char = input.charAt(index);

	//function to move the tracker ahead and get the value of the next 
	//character to evaluate

	var next = function() {
		console.log("the character was ", char, "and now it is ");
		index+= 1;
		char = input.charAt(index);
		console.log(char);
		return char;
	}

	//while evaluating a string, need to check for excape characters

	var escapes = {
		//store all the various escape keys for parsing a string
		'b': '\b',
	  'n': '\n',
	  't': '\t',
	  'r': '\r',
	  'f': '\f',
	  '\"': '\"',
	  '\\': '\\'
	}



	var obj = function() {
		console.log('We have called the object function ', char);
		next();
		
		var object = {};
		var returned = false;

		var getPair = function() {

			var key = string();
			//console.log('this call of next is inside the getPair funciton');
			while (char !== ":") {
				next();
			}
			//skip the colon
			next();
			//console.log('the key is now ', key);
			//skip white space
			while (char === " ") {
				next();
			}
			object[key] = value();
			//console.log('added a pair to the object.  object is now ', object);
	  }
		//check for an empty object
		if (char === '}') {
			console.log('exiting the object function');
			next();
			return object;
		} else {
			while (!returned && index < input.length) {
				//get the first pair
				getPair();
				if (char === '}') {
					returned = true;
					console.log('exiting the object function ', object);
					next();
					return object;
				}
				while (char === ' ' || char === ',') {
				
					next();
				}
			}
		}	
		console.log('exiting the object function ', object);
		next();
		return object;
	}

//[{"a":"b"}, {"c":"d"}]

	var array = function() {
		console.log('we have entered the array function');
		var returnArr = [];
		next();
		//check to see if it's an empty array.  if so return an empty array and move to the next string element
		if (char === ']') {
			
			console.log('exiting the array function');
			next();
			return returnArr;
		} else {
			while (char && index < input.length) {
				//check to see if we've reached the end of the array
				if (char === ']') {console.log('exiting the array function'); next(); return returnArr;}
				//skip all white space in the array
				if (char === ' ') {next();}
				//get the first value
				returnArr.push(value());
				//next();
				console.log('we pushed a value into the array, the array is now,', returnArr);
				//if there are more values in the array, get them
				if (char === ','){
				  next();
				}
				//console.log('the array is now', returnArr, 'and the character is now ', char);
				
			}
			console.log('we are exiting the array function and teh array is ', returnArr);

			return returnArr;		
		} 
	}


	var falsy = function() {
		switch (char) {
			case 't' : 
				next();
				next();
				next();
				next();
				next();
				return true;
				break;
			case 'f' : 
				next();
			  next();
				next();
				next();
				next();
				next();
				return false;
				break;
		  case 'n' : 
		  	next();
				next();
				next();
				next();
				next();
				return null;
				break;
		}
	}

	var number = function() {
		var numStr = "";

		if (char === '-') {numStr += char; next();}
		while (char && char >= 0 && char <= 9) {numStr += char; next();}
		if (char === '.') {
			numStr += char;
			next();
			while (char && char >= 0 && char <= 9) {numStr += char; next();}
			return parseFloat(numStr);

		} else {
			console.log('the numstring is ', numStr)
			return parseInt(numStr);
		}
	}

	var string = function() {
		console.log("we called the string function", char);
		var charStr = "";

		//going to return a string that skips escape characters
		//skip the inital quotation mark
		next();
		while (char) {
			if (char === "\"") {

				console.log('exiting the string function');
				next();
				return charStr;
			}
			
			if (char === "\\") {
				next();
				if (escapes.hasOwnProperty(char)) {
					charStr += escapes[char];					
				}
			} else {
				charStr += char;
			}
			next();
		}
		console.log("within the string funciton, the charString is ", charStr, ' now exiting the string function');
		
		return charStr;
	}

	var value = function() {
		console.log("we have called the value funciton and the character is ", char);
		switch (char) {
			case '{':
				return obj();
			case '[':
				return array();
			case '\"':
				return string();
			case 't':
			case 'f':
			case 'n':
				return falsy();
				default:
				if (char === '-' || (char && char >= 0 && char <= 9)) {
					return number();
				} else {
					console.log('bad syntax', char)
					throw undefined;
				}
				break;
		}
	}	
	return value();
}



var tests = ['{\r\n' +
    '          "glossary": {\n' +
    '              "title": "example glossary",\n\r' +
    '      \t\t"GlossDiv": {\r\n' +
    '                  "title": "S",\r\n' +
    '      \t\t\t"GlossList": {\r\n' +
    '                      "GlossEntry": {\r\n' +
    '                          "ID": "SGML",\r\n' +
    '      \t\t\t\t\t"SortAs": "SGML",\r\n' +
    '      \t\t\t\t\t"GlossTerm": "Standard Generalized ' +
    'Markup Language",\r\n' +
    '      \t\t\t\t\t"Acronym": "SGML",\r\n' +
    '      \t\t\t\t\t"Abbrev": "ISO 8879:1986",\r\n' +
    '      \t\t\t\t\t"GlossDef": {\r\n' +
    '                              "para": "A meta-markup language,' +
    ' used to create markup languages such as DocBook.",\r\n' +
    '      \t\t\t\t\t\t"GlossSeeAlso": ["GML", "XML"]\r\n' +
    '                          },\r\n' +
    '      \t\t\t\t\t"GlossSee": "markup"\r\n' +
    '                      }\r\n' +
    '                  }\r\n' +
    '              }\r\n' +
    '          }\r\n' +
    '      }\r\n'];
  /*  
  '{\r\n' +
    '          "glossary": {\n' +
    '              "title": "example glossary",\n\r' +
    '      \t\t"GlossDiv": {\r\n' +
    '                  "title": "S",\r\n' +
    '      \t\t\t"GlossList": {\r\n' +
    '                      "GlossEntry": {\r\n' +
    '                          "ID": "SGML",\r\n' +
    '      \t\t\t\t\t"SortAs": "SGML",\r\n' +
    '      \t\t\t\t\t"GlossTerm": "Standard Generalized ' +
    'Markup Language",\r\n' +
    '      \t\t\t\t\t"Acronym": "SGML",\r\n' +
    '      \t\t\t\t\t"Abbrev": "ISO 8879:1986",\r\n' +
    '      \t\t\t\t\t"GlossDef": {\r\n' +
    '                              "para": "A meta-markup language,' +
    ' used to create markup languages such as DocBook.",\r\n' +
    '      \t\t\t\t\t\t"GlossSeeAlso": ["GML", "XML"]\r\n' +
    '                          },\r\n' +
    '      \t\t\t\t\t"GlossSee": "markup"\r\n' +
    '                      }\r\n' +
    '                  }\r\n' +
    '              }\r\n' +
    '          }\r\n' +
    '      }\r\n'
]

*/



/*

'{"a":{"b":"c"}}',
  '{"a":["b", "c"]}',
  '[{"a":"b"}, {"c":"d"}]',
  '{"a":[],"c": {}, "b": true}',
  '[[[["foo"]]]]',

  '[]',
  '{"foo": ""}',
  '{}',
  '{"foo": "bar"}',
  '["one", "two"]',
  '{"a": "b", "c": "d"}',
  '[null,false,true]',
  '{"foo": true, "bar": false, "baz": null}',
  '[1, 0, -1, -0.3, 0.3, 1343.32, 3345, 0.00011999999999999999]',
  '{"boolean, true": true, "boolean, false": false, "null": null }',
*/

