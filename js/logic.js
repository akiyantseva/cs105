counter = 0;
num = 0;
var intervalMS = 60000;
questions_num = Q.order.length;

mobamount = [];

topic = [];
response = [];
mob = [];
time = [];
sensitivity = [];

mobMode = 1;
timeMode = 1;

$(function() {
if (mobMode !== 1) {
    $(".mob-info").hide();
}
else {
    $(".mob-info").show();
    setMob();
}

if (timeMode !== 1) {
    $(".time-info").hide();
}
else {
    $(".time-info").show();
    setTimer();
}

});

var setTimer = function() {
    $(".time-info").html("You have <strong>" + 6 + "</strong> seconds left to answer.")
    autotimer = setInterval(function(){
            $(".time-info").html("You have <strong>" + intervalMS/10000 + "</strong> seconds left to answer.")
            intervalMS -= 10000;
    },1000);

    autoadvance = setInterval(function(){
        $("#current-form").submit();
        intervalMS = 60000;
    }, 7000);
};

var setMob = function() {
    mobamount[counter] = Math.floor((Math.random()*100)+1); 
    $(".mob-info").html("<strong>" + mobamount[counter] + "</strong> other people have answered this field.");
};

var beginSurvey = function() {
        num = parseInt(Q.order[counter],10);
        $("#current-form").html($("#"+num));
        if (timeMode === 1) {
            window.clearInterval(autoadvance);
            window.clearInterval(autotimer);
            intervalMS = 60000;
            setTimer();
        }
        if (mobMode === 1) {
            setMob();
        }
        $("#"+num + " input").focus();
};

$("#current-form").submit(function( event ) {
       
    completed = new Boolean;

    if ( $("#current-form input").val() !== "" ) {
        completed = 1;
    }
    else {
        completed = 0;
    }
    
    num = parseInt(Q.order[counter],10);

    topic[counter] = num;
    response[counter] = completed;
    mob[counter] = mobMode;
    time[counter] = timeMode;
    if (Q.current_sequence == 'Ascend') {
        sensitivity[counter] = 'a';
    }
    if (Q.current_sequence == 'Descend') {
        sensitivity[counter] = 'd';
    }
    if (Q.current_sequence == 'Random') {
        sensitivity[counter] = 'r';
    }

    if (counter < Q.order.length) {
        event.preventDefault();
        num = parseInt(Q.order[counter+1],10);
        $("#current-form").html($("#"+num));
        if (timeMode === 1) {
            window.clearInterval(autoadvance);
            window.clearInterval(autotimer);
            intervalMS = 60000;
            setTimer();
        }
        // fixed timeMode statement follows
        // if (timeMode === 1 && counter < Q.order.length - 1) {
        //     window.clearInterval(autoadvance);
        //     window.clearInterval(autotimer);
        //     intervalMS = 60000;
        //     setTimer();
        // }
        if (mobMode === 1) {
            setMob();
        }
        $("#"+num + " input").focus();
    }
    else {
        event.preventDefault();
        $("#current-form").html($("#finish-survey"));
    }
    counter++;

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
       $.ajax({
            type: "POST",
            url: "survey.php",
            data: "topic=" + topic 
            + "\u0026response=" + response
            + "\u0026mob=" + mob 
            + "\u0026time=" + time
            + "\u0026mobamount=" + mobamount
            + "\u0026sensitivity=" + sensitivity
            + "\u0026questions_num=" + questions_num,
        })

    $(".container").replaceWith($("#debrief"));

    outputdata = "";

    for(var formid in response){
        outputdata += formid + ': ' + response[formid]+'; ';
    }
    $("#formdata").append(outputdata);
});

/*$('#erase').click(function(){
    $('#erase').css("color","gray");
});*/

/*$('#submit_email').click(function(){
    var email = $('#entered_email').val();
    $.ajax({
        type: "POST",
        url: "debrief.php",
        data: "email=" + email,
        })
}); */

