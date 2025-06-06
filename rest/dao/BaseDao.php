<?php
require_once __DIR__."/../Config.php";
 class BaseDao {
    private $conn; 

    private $table_name;

    //Class constructor used to establish connection to db
    public function __construct($table_name){
        try {
          $this->table_name = $table_name;
          $db_info = array(
            'host' => DB_HOST,
            'port' => DB_PORT,
            'name' => DB_NAME,
            'user' => DB_USERNAME,
            'pass' => DB_PASSWORD
            );

          $options = [];
          if (DB_HOST !== '127.0.0.1') {
              $options = array(
                PDO::MYSQL_ATTR_SSL_CA => MYSQL_ATTR_SSL_CA,
                PDO::MYSQL_ATTR_SSL_VERIFY_SERVER_CERT => false,
            );
          }

          $this->conn = new PDO( 'mysql:host=' . $db_info['host'] . ';port=' . $db_info['port'] . ';dbname=' . $db_info['name'], $db_info['user'], $db_info['pass'], $options);
          // set the PDO error mode to exception

          $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
         // echo "Connected successfully";
        } catch(PDOException $e) {
         // echo "Connection failed: " . $e->getMessage();
        }
    }


    //Method used to get all entities from database 
    public function get_all(){
        $stmt = $this->conn->prepare("SELECT * FROM " . $this->table_name);
        $stmt->execute();
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }


    //Method used to get entity by id from database
    public function get_by_id($id){
        $stmt = $this->conn->prepare("SELECT * FROM " . $this->table_name . " WHERE id=:id");
        $stmt->execute(['id' => $id]);
        return $stmt->fetchAll();
    }


    //Method used to get entity by id from database
    public function get_by_email($email){

        //This is returning an array of users, even if there is one single user
        $stmt = $this->conn->prepare("SELECT * FROM " . $this->table_name . " WHERE email=:email");
        $stmt->execute(['email' => $email]);
        return $stmt->fetchAll();
    }
    

    //Method used to get add entity to database string $first_name: First name is the first name of the course
    public function add($entity){
        $query = "INSERT INTO " . $this->table_name . " (";
        foreach($entity as $column => $value){
            $query.= $column . ', ';
        }
        $query = substr($query, 0, -2);
        $query.= ") VALUES (";
        foreach($entity as $column => $value){
            $query.= ":" . $column . ', ';
        }
        $query = substr($query, 0, -2);
        $query.= ")";
        
        $stmt = $this->conn->prepare($query);
        $stmt->execute($entity);
        $entity['id'] = $this->conn->lastInsertId();
        return $entity;
    }

    
    //Method used to update entity in database
    public function update($entity, $id, $id_column = "id"){
        $query = "UPDATE " . $this->table_name . " SET ";
        foreach($entity as $column => $value){
            $query.= $column . "=:" . $column . ", ";
        }
        $query = substr($query, 0, -2);
        $query.= " WHERE {$id_column} = :id";
        $stmt = $this->conn->prepare($query);
        $entity['id'] = $id;
        $stmt->execute($entity);
        return $entity;
    }


    // Method used to delete entity from database
    public function delete($id){
        $stmt = $this->conn->prepare("DELETE FROM " . $this->table_name . " WHERE id = :id");
        $stmt->bindParam(':id', $id); #prevent SQL injection
        $stmt->execute();
    }

    public function query($query, $params){
        $stmt = $this->conn->prepare($query);
        $stmt->execute($params);
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
    
    public function query_unique($query, $params){
        $results = $this->query($query, $params);
        return reset($results);
    }

    public function query_without_params($query){
        $stmt = $this->conn->prepare($query);
        $stmt->execute(); 
        return $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
 }

?>