<?php
    
    // connect to database
    mysql_connect("localhost", "cs105") or die(mysql_error()); 
    mysql_select_db("cs105") or die(mysql_error()); 

    $uid = $_SESSION["id"];
    
    // store ajax post variables
    $total_topic = $_POST["topic"];
    $total_response = $_POST["response"];
    $total_mob = intval($_POST["mob"]);
    $total_time = intval($_POST["time"]);

    for ($i = 1; $i <= 16; $i++)
    {
        $topic = $total_topic[$i];
        $response = $total_response[$i];
        $mob = $total_mob[$i];
        $time = $total_time[$i];        
        $query = "INSERT INTO question (uid, topic, answered, mob, time, response) VALUES ('$uid', '$topic', 0, '$mob', '$time', '$response');";
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



