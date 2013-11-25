Q = new Object();

Q.not_sensitive = {
  
  '1':"First Name",  
  '4':"Birth Month"

}

Q.somewhat_sensitive = {
  
  '2':"Last Name",  
  '5':"Birth Year"

}

Q.very_sensitive = {
  
  '3':"Email Address",  
  '5':"Birth Date"

}

Q.sequence = shuffle(['Ascend','Descend','Random']);
Q.current_sequence = Q.sequence[0];

var x = 1;
var extract = new Array();

for (var i = 0; i < x; i++)
{
    extract.push(fetch_random(Q.not_sensitive));
    extract.push(fetch_random(Q.somewhat_sensitive));
    extract.push(fetch_random(Q.very_sensitive));
}

Q.order = new Array();

if (Q.current_sequence == 'Ascend') {
	for (var i = 0; i < x; i+3)
	{
		// not sensitive ones appear first and every third thereafter
		Q.order.push(extract[i]);
	}
	for (var j = 1; j < x; j+3)
	{
		// somewhat sensitive ones appear second and every third thereafter
		Q.order.push(extract[j]);
	}
	for (var k = 2; k < x; k+3)
	{
		// very sensitive ones appear second and every third thereafter
		Q.order.push(extract[k]);
	}

}

if (Q.current_sequence == 'Descend' || 'Random') {
	for (var i = 0; i < x; i+3)
	{
		// very sensitive ones appear second and every third thereafter
		Q.order.push(extract[k]);
	}
	for (var j = 1; j < x; j+3)
	{
		// somewhat sensitive ones appear second and every third thereafter
		Q.order.push(extract[j]);
	}
	for (var k = 2; k < x; k+3)
	{
		// not sensitive ones appear first and every third thereafter
		Q.order.push(extract[i]);
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
    for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
    }
    return array;
}