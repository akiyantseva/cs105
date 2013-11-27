<?php

class Object {

  public $id = 0;

  public function __construct() {
  }


  public function __toString() {
    $objectname = get_class($this);

    $output = $objectname."\n";

    // make a fancy line (======)
    for ($i = 0; $i < strlen($objectname); $i++) {

      $output .= '=';

    }
    $output .= "\n";

    // get all attributes
    foreach ($this as $key => $value) {

      $output .= $key.': '.$value."\n";

    }

    return $output;

  }

  public function equals($object) {

    if (get_class($this) != get_class($object)) {
      throw new Exception('You are trying to compare 2 different type of objects:  \''.get_class($this).'\' vs \''.get_class($object).'\'');
    }

    $localAttr = get_object_vars($this);
    $externAttr = get_object_vars($object);

    $diff = array_diff($localAttr, $externAttr);

    if (empty($diff)) {
      return true;

    } else {
      return $diff;
    }

  }

}
?>