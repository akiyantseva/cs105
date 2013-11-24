    var counter = 1;
    var completedForms = new Object();

        // on enter
        $('form').keypress(function (e) {
            if (e.which == 13) {

        // ajax send topic and response to php
        $.ajax({
            type: "GET",
            url: "survey.php",
            data: "topic=" + $('#current-form .topic').attr("topic") + "\u0026response=" + $('#current-form .response').val(),
            success: nextForm
        })
    }
});

    function nextForm() {

        // check if true? doesn't work for the first one.. not necessary code
        completed = new Boolean;

        if ( $("#current-form input").val() !== "" ) {

            completed = true;
        }
        else {       
            
            completed = false;

            }

        completedForms[counter] = completed;
        console.log(completedForms[counter]);

        // next forms
        counter++;

        if (counter != 16 ) {
            event.preventDefault();
            $("#current-form *").replaceWith($("#"+counter));
            $("#"+counter + " input").focus();            
        }
        else {
            event.preventDefault();
            $("#current-form *").replaceWith($("#finish-survey"));
        }

    // close function
    }