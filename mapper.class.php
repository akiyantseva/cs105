<?php

require_once ('db.class.php');

// interface
interface MapperInterface
{
  public function __construct($object);
  public function order($column, $dir);
  public function filter($condition, $param, $index, $operator);
  public function join($tableObject, $joinCondition);
  public function ljoin($tableObject, $joinCondition);
  public function group($condition);
  public function get($id);
  static public function getStatic($objectName, $id);
  static public function add($object);
  static public function update($object, $objectid);
  static public function delete($object, $objectid);
}

class Mapper implements MapperInterface {

  private $objectname = null;

  private $joins = '';

  private $where = Array();

  private $order = '';

  private $param = Array();

  private $objects = Array();

  private $group = '';


  public function __construct($object) {
    $this->objectname = $this->_getName($object);
    $this->objects[] = $this->objectname;
    $this->where[] = '';
  }

  static private function _getName($object) {
    if (gettype($object) == 'string') {
      $name = $object;
    } else {
      $name = get_class($object);
    }
    return $name;
  }


  private function _getWhere() {
    // if we have applied a filter
    // count($this->where) should be >= 2
    $count = count($this->where);
    if ($count < 2) {
      return '';
    } else {
      // base case
      $wherecondition = ' WHERE ( ('.$this->where[1].' ) ';

      // add other filters
      for ($i = 2; $i < $count && $count >= 3; $i++) {
        $wherecondition .= $this->where[0].' ('.$this->where[$i].' ) ';
      }

      // finish query
      $wherecondition .= ' )';
      return $wherecondition;
    }
  }

  private function _getParam() {
    // return null if we dont use prepared statements
    if ($this->param == null) {
      return null;
    }
    // else return nice prepared statements
    else {
      $param = Array();
      foreach ($this->param as $filter) {
        foreach ($filter as $condition) {
          $param[] = $condition;
        }
      }
      return $param;
    }
  }

  public function order($column, $dir = 1) {
    $this->order .= ' ORDER BY '.$column;
    if($dir == 1){
      $this->order .= ' DESC';
    }
    else{
      $this->order .= ' ASC';
    }
  }

  // advanced
  public function filter($condition, $param, $index = 1, $operator = 'AND') {
    // dont need the "AND" statement for the first condition
    $count = count($this->where);
    if ($index >= $count) {
      $this->where[] = '';
    } else {
      $this->where[$index] .= ' '.$operator.' ';
    }

    // update the condition string
    $this->where[$index] .= strtolower($condition);

    // deal with the parameters
    if ($index > 0) {
      if ($param != '') {
        if ($index > count($this->param)) {
          $this->param[] = Array();
        }
        $this->param[$index - 1][] = $param;
      }
    }

    return $this;
  }


  public function join($tableObject, $joinCondition = '') {
    $tableName = $this->_getName($tableObject);

    // default join condition
    if (empty($joinCondition)) {
      $joinCondition = strtolower($tableName).'.id ='.strtolower($this->objectname).'.'.strtolower($tableName).'_id';
    }

    // update the join string
    $this->joins .= ' JOIN '.strtolower($tableName).' ON '.strtolower($joinCondition);
    // store table name in array for conveniency to return objects
    $this->objects[] = $tableName;

    return $this;
  }

  public function ljoin($tableObject, $joinCondition = '') {
    $tableName = $this->_getName($tableObject);

    // default join condition
    if (empty($joinCondition)) {
      $joinCondition = strtolower($tableName).'.id ='.strtolower($this->objectname).'.'.strtolower($tableName).'_id';
    }

    // update the join string
    $this->joins .= ' LEFT JOIN '.strtolower($tableName).' ON '.strtolower($joinCondition);
    // store table name in array for conveniency to return objects
    $this->objects[] = $tableName;

    return $this;
  }


  public function group($condition) {
    $this->group = ' GROUP BY '.strtolower($condition);

    return $this;
  }


  public function get($id = -1) {
    if ($id != -1) {
      // append to existing - might be an issue?
      $this->filter(strtolower($this->objectname).'.id =?', $id);
    }

    // query the database
    $results = DB::getInstance()->execute('SELECT * FROM '.strtolower($this->objectname).strtolower($this->joins).strtolower($this->_getWhere()).strtolower($this->group).strtolower($this->order), $this->_getParam());
    
    // create an array to store the objects
    $objects = Array();

    // create one column per object (multpiple objects returned for joins)
    foreach ($this->objects as $object) {
      $objects[$object] = Array();
    }

    // create objects and map all the attributes
    if(gettype($results) == 'array'){
      foreach ($results as $result) {
        // localid
        $localid = 0;
        $object = null;

        // parse on result
        foreach ($result as $field) {
          // strip potential '-'
          $clean = explode('-', $field[0]);
          // if we reach a "id" field, create new object
          if ($clean[0] == 'id') {
            // if there is an object existing, push it to right location and update localid
            // we only push the object once it has been filled!
            if (!empty($object)) {
              $objects[$this->objects[$localid]][] = $object;
              ++$localid;
            }
            // create new object
            $object = new $this->objects[$localid]();
          }
          // update fields
          $object->$clean[0] = trim($field[1]);
        }
        // push last object to the right location
        // we only push the object once it has been filled!
        if (!empty($object)) {
          $objects[$this->objects[$localid]][] = $object;
        }
      }
    }
    return $objects;
  }

  static public function getStatic($objectName, $id = -1) {
    $objectName = Mapper::_getName($objectName);
    $where = '';
    $preparedValue = Array();

    if ($id != -1) {
      // append to existing - might be an issue?
      $where .=' WHERE id =? ';
      $preparedValue[] = $id;
    }

    // query the database
    $results = DB::getInstance()->execute('SELECT * FROM '.strtolower($objectName).strtolower($where), $preparedValue);

    // create an array to store the objects
    $objects = Array();
    $objects[$objectName] = Array();

    // create objects and map all the attributes
    foreach ($results as $result) {
      $object = null;

      // parse on result
      foreach ($result as $field) {
        // if we reach a "id" field, create new object
        if ($field[0] == 'id') {
          // if there is an object existing, push it to right location and update localid
          // we only push the object once it has been filled!
          if (!empty($object)) {
            $objects[$objectName][] = $object;
          }
          // create new object
          $object = new $objectName();
        }
        // update fields
        $object->$field[0] = $field[1];
      }
      // push last object to the right location
      // we only push the object once it has been filled!
      if (!empty($object)) {
        $objects[$objectName][] = $object;
      }
    }
    return $objects;
  }

  static public function add($object) {
    // get object properties
    $properties = get_object_vars($object);

    // loop through properties to create the "WHERE" condition
    $where = '';
    $insertcolumn ='';
    $inservalue = '';
    $preparedValue = Array();

    foreach ($properties as $key => $value){

        if($where != '')
        {
          $where .= ' AND ';
          $insertcolumn .=', ';
          $inservalue .= ', ';
        }
        $where .= ' ('.$key . '=?) ';
        $insertcolumn .= $key;
        $inservalue .= '?';
        $preparedValue[] = $value;
      }


    $insertcolumn = '('.$insertcolumn.')';
    $inservalue = '('.$inservalue.')';
    $id = DB::getInstance()->execute('INSERT INTO '.strtolower(get_class($object)).' '.strtolower($insertcolumn).' VALUES '.strtolower($inservalue), $preparedValue);

    // return id of the new inserted object
    return $id;
  }

 
  static public function delete($object, $objectid) {
    $objectName = Mapper::_getName($object);
    $preparedValue = Array();
    $preparedValue[] = $objectid;

    DB::getInstance()->execute('DELETE FROM '.strtolower($objectName).' WHERE id=?', $preparedValue);
  }

  static public function update($object, $objectid) {
    // get object properties
    $properties = get_object_vars($object);

    // loop through properties to create the "WHERE" and "SET" conditions
    $where = '';
    $set = '';
    $preparedValue = Array();

    foreach ($properties as $key => $value){
      if($key != 'id'){
        if($set != '')
        {
          $set .= ' , ';
          $where .= ' AND ';
        }
        $where .= ' ('.$key . '=?) ';
        $set .= ' '.$key . '=? ';
        $preparedValue[] = $value;
      }
    }


    $preparedValue[] = $objectid;
    $exists = DB::getInstance()->execute('UPDATE '.strtolower(get_class($object)).' SET '.strtolower($set).' WHERE id=?', $preparedValue);
    return $exists;
  }

}
?>