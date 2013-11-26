<?php
    
    // connect to database
    mysql_connect("localhost", "cs105") or die(mysql_error()); 
    mysql_select_db("cs105") or die(mysql_error()); 

    var_dump($_POST);

    $uid = $_SESSION["id"];
    // store ajax post variables
    $total_topic = $_POST["topic"];
    $total_mobamount = $_POST["mobamount"];
    $total_response = $_POST["response"];
    $total_mob = $_POST["mob"];
    $total_time = $_POST["time"];
    $total_sensitivity = $_POST["sensitivity"];
    $num = $_POST["questions_num"];

    for ($i = 0; $i < $num; $i++)
    {
        $topic = intval($total_topic[$i]);
        $response = intval($total_response[$i]);
        $mobamount = intval($total_mobamount[$i]);
        $mob = intval($total_mob[$i]);
        $time = intval($total_time[$i]);
        $sensitivity = $total_sensitivity[$i];        
        $query = "INSERT INTO question (uid, topic, mob, time, response, sensitivity, mobamount) VALUES ('$uid', '$topic', '$mob', '$time', '$response', '$sensitivity', '$mobamount');";
        $result = mysql_query($query); 
    }
    /*// if didn't respond 
    if (strlen($response) == NULL)
    {
            echo "empty";
            // store in database as 0
            $queryempty = "INSERT INTO question (uid, topic, answered, mob, time, response) VALUES ('$uid', '$topic', 0, '$mob', '$time', '$response');";
            $result = mysql_query($queryempty); 
    }

    // if responded
    else
    {
            echo "filled";
            // store in database as 1
            $queryfilled = "INSERT INTO question (uid, topic, answered, mob, time) VALUES ('$uid', '$topic', 1, '$mob', '$time', '$response');";
            $result = mysql_query($queryfilled);  
    }*/

?>



