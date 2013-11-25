<?php

class DB {

  private static $instance = null;

  private $link = null;

  private function __construct() {

    $link = new mysqli(SQL_HOST, SQL_USERNAME, SQL_PASSWORD, SQL_DATABASE);

    if ($link->connect_errno) {

      throw new Exception('Failed to connect to database: '.$link->connect_error);

    }

    // store the link
    $this->link = $link;

  }

  public static function getInstance() {

    if (!self::$instance) {

      // first call, create an instance
      self::$instance = new DB();

    }

    // return the new or existing instance
    return self::$instance;

  }

  public function lock($tablename, $type) {
    return $this->link->query('LOCK TABLES '.$tablename.' '.$type.';');
  }

  public function unlock() {
    return $this->link->query('UNLOCK TABLES;');
  }

  public function execute($query, $variables=null) {

    //echo $query;

    $link = $this->link;

    // prepare the query
    if (!($statement = $link->prepare($query))) {

      throw new Exception('Failed to prepare query: '.$link->error);

    }

    // bind the parameters
    if ($variables != null) {
      $types = '';
      $temp = array();
      foreach($variables as $variable) {
        // detect the type and store the first letter
        // i for integer
        // d for double
        // s for string etc.
        $type = gettype($variable);
        $types .= $type{0};
      }

      // bind_names[0] == 'sssid'
      $bind_names[] = $types;
      // update bind_names[1], bind_names[2] with corresponding value
      for ($i=0; $i<count($variables);$i++) {
        $bind_names[] = &$variables[$i];
      }

      call_user_func_array(array($statement,'bind_param'),$bind_names);
    }

    // execute the query
    $statement->execute();

    // -1 = select because select doesnt affect rows
    $queryType = $statement->affected_rows;

    // return last inserted
    // returns 0 for update and delete
    if($queryType >= 0)
    {
      return $statement->insert_id;
    }

    // grab the meta data of the query
    $result = $statement->result_metadata();
    // check which fields are expected
    $fields = array();
    $resultFields = array();
    $count = 0;
    while ($field = $result->fetch_field()) {

      $tmp_field = $field->name;

      if (in_array($tmp_field, $fields)) {
        $tmp_field .= '-'.$count;
        $count++;
      }

      $fields[] = $tmp_field;
      $resultFields[] = &${
        $tmp_field};
    }

    // call $statement->bind_result for each of the expected fields
    call_user_func_array(array($statement, 'bind_result'), $resultFields);

    // grab the results
    $results = array();
    $i = 0; // results counter
    while ($statement->fetch()) {
      $j = 0;
      // loop through all fields for each result
      foreach($fields as $field){

        // save field name
        $results[$i][$j][0] = $field;
        //save field value
        $results[$i][$j][1] = ${
          $field};
          $j++;
      }
      $i++;
    }

    // return the results
    return $results;

  }

}

?>