    var counter = 1;
    var completedForms = new Object();

    $("#current-form" ).submit(function( event ) {
        completed = new Boolean;

        if ( $("#current-form input").val() !== "" ) {
            completed = true;
        }
        else {
            completed = false;
        }

        completedForms[counter] = completed;
        console.log(completedForms[counter]);

        counter ++;

        if (counter != 16 ) {
            event.preventDefault();
            $("#current-form *").replaceWith($("#"+counter));
            $("#"+counter + " input").focus();            
        }
        else {
            event.preventDefault();
            $("#current-form *").replaceWith($("#finish-survey"));
        }

    });