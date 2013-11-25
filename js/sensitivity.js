Q = {};

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
var extract = [];

for (var i = 0; i < x; i++)
{
	extract[i].not_sensitive = fetch_random(Q.not_sensitive);
	extract[i].somewhat_sensitive = fetch_random(Q.somewhat_sensitive);
	extract[i].very_sensitive = fetch_random(Q.very_sensitive);
}

Q.order = [];

if (Q.current_sequence == 'Ascend') {
	for (var i = 0; i < x; i++)
	{
		Q.order[i] = extract[i].not_sensitive;
	}
	for (var j = 0; j < x; j++)
	{
		Q.order[i + x] = extract[i].somewhat_sensitive;
	}
	for (var k = 0; k < x; k++)
	{
		Q.order[i + 2x] = extract[i].very_sensitive;
	}

}

if (Q.current_sequence == 'Descend' || 'Random') {
	for (var i = 0; i < x; i++)
	{
		Q.order[i] = extract[i].very_sensitive;
	}
	for (var j = 0; j < x; j++)
	{
		Q.order[i + x] = extract[i].somewhat_sensitive;
	}
	for (var k = 0; k < x; k++)
	{
		Q.order[i + 2x] = extract[i].not_sensitive;
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