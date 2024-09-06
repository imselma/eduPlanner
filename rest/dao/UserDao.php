<?php
require_once "BaseDao.php";

class UserDao extends BaseDao {

    public function __construct(){
        parent::__construct("users");
    } 

    public function getUserById($id) {
        return $this->query_unique("SELECT * FROM users WHERE id = :id", ["id" => $id]);
    }

    public function turnNotificationOn($id) {
        return $this->query("UPDATE users SET notification_flag = 1 WHERE id = :id", ["id" => $id]);
    }

    public function turnNotificationOff($id) {
        return $this->query("UPDATE users SET notification_flag = 0 WHERE id = :id", ["id" => $id]);
    }
}
?>