counter = 1;
completedForms = new Object();

mobMode = 1;
timeMode = 1;

// on enter
$('form').keypress(function (e) {
    if (e.which == 13) {

    // ajax send topic and response to php
    $.ajax({
            type: "GET",
            url: "survey.php",
            data: "topic=" + $('#current-form .info').attr("topic") 
            + "\u0026response=" + $('#current-form .response').val() 
            + "\u0026mob=" + $('#current-form .info').attr("mob") 
            + "\u0026time=" + $('#current-form .info').attr("time"),
            success: nextForm
        })
    }
});


$(function() {
if (mobMode !== 1) {
    $(".mob-info").hide();
}
else {
    $(".mob-info").show();
}

if (timeMode !== 1) {
    $(".time-info").hide();
}
else {
    $(".time-info").show();
}

});

//$("#current-form").submit(function( event ) {
function nextForm() {
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

    if (counter != 40 ) {
        event.preventDefault();
        $("#current-form *").replaceWith($("#"+counter));
        $("#"+counter + " input").focus();            
    }
    else {
        event.preventDefault();
        $("#current-form *").replaceWith($("#finish-survey"));
    }

}

$('.consent-box input').click(function(){
    if ($("#consent-box").is (':checked'))
    {
        $("#start-button").fadeIn(300);
    }
    else {
        $("#start-button").fadeOut(300);
    }
});

$('#continue-debrief').click(function(){
    $(".container").replaceWith($("#debrief"));

    formdata = JSON.stringify(completedForms);
    outputdata = "";

    for(var formid in completedForms){
        outputdata += formid + ': ' + completedForms[formid]+'; ';
    }
    $("#formdata").append(outputdata);
});

