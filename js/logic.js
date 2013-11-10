    var counter = 1;
    var completedForms = new Object();

    $("#current-form" ).submit(function( event ) {
        var completed = new Boolean;

        if ( $("#current-form input").val() !== "" ) {
            completed = true;
        }
        else {
            completed = false;
        }

        completedForms[counter] = completed;

        counter ++;

        if (counter != 16 ) {
            $("#current-form *").replaceWith($("#"+counter));
            $("#"+counter + " input").focus();            
        }
        else {
            $("#current-form *").replaceWith($("#finish-survey"));
        }

    });