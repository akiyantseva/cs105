Q = new Object();

Q.not_sensitive = {
  
  "First Name": '1',  
  "Birth Month": '4',
  "Name of Elementary School":'8',
  "Name of University":'9',
  "Name of Current Country":'10',
  "Father's First Name":'12',
  "Mother's First Name":'13',
  "Your Initials":'16',
  "Mother's Initials":'19',
  "Father's Initials":'20',
  "Nationality":'22',
  "Name of First Employer":'25',
  "Current Operating System":'28',
  "Favorite Clothing Brand":'29',
  "Favorite Food":'30',
  "Current Date":'36',
  "Gender":'39',
  "Favorite City":'40'

}

Q.somewhat_sensitive = {
  
  "Last Name":'2',  
  "Birth Year":'5',
  "Current Age":'7',
  "Hometown Name":'11',
  "Health Insurance Provider":'14',
  "City of Birth":'17',
  "Country of Birth":'18',
  "Racial or Ethnic Identification":'21',
  "Approximate Hourly Income":'23',
  "Approximate Yearly Income":'24',
  "Name of Current Employer":'26',
  "Current Job Title":'27',
  "Location of Previous Residence":'33'

}

Q.very_sensitive = {
  
  "Email Address":'3',  
  "Birth Date":'6',
  "Mother's Maiden Name":'15',
  "Zip Code":'31',
  "Street Name of Current Residence":'32',
  "Cell Phone Number":'34',
  "Home Phone Number":'35',
  "Last Four Digits of Credit Card Number":'37',
  "Credit Card Expiration Date":'38'

}

Q.sequence = shuffle(['Ascend','Descend','Random']);
Q.current_sequence = Q.sequence[0];

var x = 5;
var extract = new Array();

for (var i = 0; i < x; i++)
{
    var keys_not = Object.keys(Q.not_sensitive), length_not = keys_not.length;
    var key_not = keys_not[Math.floor(Math.random() * length_not)];
    while (key_not == undefined) {
      key_not = keys_not[Math.floor(Math.random() * length_not)];
    }
    extract.push(Q.not_sensitive[key_not]);
    delete Q.not_sensitive[key_not]; 

    var keys_somewhat = Object.keys(Q.somewhat_sensitive), length_somewhat = keys_somewhat.length;
    var key_somewhat = keys_somewhat[Math.floor(Math.random() * length_somewhat)];
    while (key_somewhat == undefined) {
      key_somewhat = keys_somewhat[Math.floor(Math.random() * length_somewhat)];
    }
    extract.push(Q.somewhat_sensitive[key_somewhat]);
    delete Q.somewhat_sensitive[key_somewhat]; 
   
    var keys_very = Object.keys(Q.very_sensitive), length_very = keys_very.length;
    var key_very = keys_very[Math.floor(Math.random() * length_very)];
    while (key_very == undefined) {
      keys_very = Object.keys(Q.very_sensitive), length_very = keys_very.length;
    }
    extract.push(Q.very_sensitive[key_very]);
    delete Q.very_sensitive[key_very]; 

    /*var not = fetch_random(Q.not_sensitive);
    delete Q.not_sensitive[not]; 
    extract.push(not);
    var somewhat = fetch_random(Q.somewhat_sensitive);
    delete Q.somewhat_sensitive[somewhat]; 
    extract.push(somewhat);
    var very = fetch_random(Q.very_sensitive);
    delete Q.very_sensitive[very]; 
    extract.push(very);*/
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