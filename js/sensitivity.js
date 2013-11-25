Q = new Object();

Q.not_sensitive = {
  
  "First Name": '1',  
  "Birth Month": '4'

}

Q.somewhat_sensitive = {
  
  "Last Name":'2',  
  "Birth Year":'5'

}

Q.very_sensitive = {
  
  "Email Address":'3',  
  "Birth Date":'6'

}

Q.sequence = shuffle(['Ascend','Descend','Random']);
Q.current_sequence = Q.sequence[0];

var x = 1;
var extract = new Array();

for (var i = 0; i < x; i++)
{
    var not_sensitive = fetch_random(Q.not_sensitive);
    extract.push(not_sensitive);
    var somewhat_sensitive = fetch_random(Q.somewhat_sensitive);
    extract.push(somewhat_sensitive);
    var very_sensitive = fetch_random(Q.very_sensitive);
    extract.push(very_sensitive);
}

Q.order = new Array();


if (Q.current_sequence == 'Ascend') {
	for (var i = 0; i < x * 3 - 2; i += 3)
	{ 
		// not sensitive ones appear first and every third thereafter
		Q.order[i] = extract[i];
	}

	for (var j = 1; j < x * 3 - 1; j += 3)
	{
		// somewhat sensitive ones appear second and every third thereafter
		Q.order[j] = extract[j];
	}

	for (var k = 2; k < x * 3; k += 3)
	{
		// very sensitive ones appear third and every third thereafter
		Q.order[k] = extract[k];
	}

}

if (Q.current_sequence == 'Descend' || 'Random') {
	for (var k = 2, i = 0; k < x * 3; i += 3, k += 3)
	{
		// very sensitive ones appear first and every third thereafter
		Q.order[i] = extract[k];
	}

	for (var j = 1; j < x * 3 - 1; j += 3)
	{
		// somewhat sensitive ones appear second and every third thereafter
		Q.order[j] = extract[j];
	}

	for (var i = 0, k = 2; i < x * 3 - 2; i += 3, k += 3)
	{
		// not sensitive ones appear third and every third thereafter
		Q.order[k] = extract[i];
	}

	if (Q.current_sequence == 'Random') {
		shuffle(Q.order);
	}

}


function fetch_random(obj) {
    var temp_key, keys = [];
    for(temp_key in obj) {
       if(obj.hasOwnProperty(temp_key)) {
           keys.push(temp_key);
       }
    }
    return obj[keys[Math.floor(Math.random() * keys.length)]];
}

function shuffle(array) {
  var currentIndex = array.length
    , temporaryValue
    , randomIndex
    ;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}