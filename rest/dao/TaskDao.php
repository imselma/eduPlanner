<?php
require_once "BaseDao.php";

class TaskDao extends BaseDao {

    public function __construct(){
        parent::__construct("tasks");
    }

    public function getTaskByUserId($user_id) {
        return $this->query("SELECT * FROM tasks WHERE user_id = :user_id", ["user_id" => $user_id]);
    }
}
?>