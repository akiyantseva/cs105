<?php
    
    // connect to database
    /*mysql_connect("localhost", "cs105") or die(mysql_error()); 
    mysql_select_db("cs105") or die(mysql_error()); 
*/
    mysql_connect("mysql.sharonzhou.me", "survey_105", "surveysare2cool") or die(mysql_error()); 
    mysql_select_db("sharonzhou_db") or die(mysql_error()); 

    var_dump($_POST);

    $uid = $_SESSION["id"];
        $topic = $_POST["topic"];
        $response = $_POST["response"];
        $mob = $_POST["mob"];
        $mobamount = $_POST["mobamount"];
        $time = $_POST["time"];
        $sensitivity = $_POST["sensitivity"]; 
    $query = "INSERT INTO question (uid, topic, mob, time, response, sensitivity, mobamount) VALUES ('$uid', '$topic', '$mob', '$time', '$response', '$sensitivity', '$mobamount');";
    $result = mysql_query($query);
    // store ajax post variables
  /*  $total_topic = explode(',', $_POST["topic"]);
    $total_response = explode(',', $_POST["response"]);
    $total_mob = explode(',', $_POST["mob"]);
    $total_mobamount = explode(',', $_POST["mobamount"]);
    $total_time = explode(',', $_POST["time"]);
    $total_sensitivity = explode(',', $_POST["sensitivity"]);
    $num = $_POST["questions_num"];

    $index = 0;
    foreach ($total_topic as $i)
    {
        $topic[$index] = intval($i);
        $index++;
    }

    $index = 0;
    foreach ($total_response as $i)
    {
        $response[$index] = intval($i);
        $index++;
    }

    $index = 0;
    foreach ($total_mob as $i)
    {
        $mob[$index] = intval($i);
        $index++;
    }

    $index = 0;
    foreach ($total_mobamount as $i)
    {
        $mobamount[$index] = intval($i);
        $index++;
    }

    $index = 0;
    foreach ($total_time as $i)
    {
        $time[$index] = intval($i);
        $index++;
    }

    $index = 0;
    foreach ($total_sensitivity as $i)
    {
        $sensitivity[$index] = intval($i);
        $index++;
    }
    
    for ($i = 0; $i < $num; $i++)
    {
        $query = "INSERT INTO question (uid, topic, mob, time, response, sensitivity, mobamount) VALUES ('$uid', '$topic', '$mob', '$time', '$response', '$sensitivity', '$mobamount');";
        $result = mysql_query($query);
    } */

    /*$topic = intval($total_topic[$i]);
        $response = intval($total_response[$i]);
        $mob = intval($total_mob[$i]);
        $mobamount = intval($total_mobamount[$i]);
        $time = intval($total_time[$i]);
        $sensitivity = $total_sensitivity[$i];        
        $query = "INSERT INTO question (uid, topic, mob, time, response, sensitivity, mobamount) VALUES ('$uid', '$topic', '$mob', '$time', '$response', '$sensitivity', '$mobamount');";
        $result = mysql_query($query); */

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



