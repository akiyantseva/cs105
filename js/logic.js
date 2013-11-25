counter = 0;
num = 0;
completedForms = new Object();

topic = [];
response = [];
mob = [];
time = [];

mobMode = 1;
timeMode = 1;

/*// on enter
$('form').keypress(function (e) {
    if (e.which == 13) {

    // ajax send info to php
    $.ajax({
            type: "POST",
            url: "survey.php",
            data: "topic=" + $('#current-form .info').attr("topic") 
            + "\u0026response=" + $('#current-form .response').val() 
            + "\u0026mob=" + $('#current-form .info').attr("mob") 
            + "\u0026time=" + $('#current-form .info').attr("time"),
            success: nextForm
        })
    };
});*/


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

$("#current-form").submit(function( event ) {
//function nextForm() {
    completed = new Boolean;

    if ( $("#current-form input").val() !== "" ) {
        completed = true;
    }
    else {
        completed = false;
    }
    
    num = parseInt(Q.order[counter],10);

    completedForms[num] = completed;

    topic[num] = $("#"+num).attr("topic");
    response[num] = completedForms[num];
    mob[num] = mobMode;
    time[num] = timeMode; 

    if (counter < Q.order.length - 1 ) {
        event.preventDefault();
        counter++;
        num = parseInt(Q.order[counter],10);
        $("#current-form *").replaceWith($("#"+num));
        $("#"+num + " input").focus();            
    }
    else {
        event.preventDefault();
        $("#current-form *").replaceWith($("#finish-survey"));
    }

});

$('#finish-submit-button').click(function( event ) {
    $.ajax({
            type: "POST",
            url: "survey.php",
            data: "topic=" + $topic 
            + "\u0026response=" + $response
            + "\u0026mob=" + $mob 
            + "\u0026time=" + $time,
        })
});


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

    outputdata = "";

    for(var formid in completedForms){
        outputdata += formid + ': ' + completedForms[formid]+'; ';
    }
    $("#formdata").append(outputdata);
});

