<?php
require_once "BaseDao.php";

class TaskDao extends BaseDao {

    public function __construct(){
        parent::__construct("tasks");
    }

    public function getTaskByUserId($user_id) {
        return $this->query("SELECT * FROM tasks WHERE user_id = :user_id", ["user_id" => $user_id]);
    }

    public function getTaskByUserIdAndDate($user_id, $task_date) {
        return $this->query("SELECT * FROM tasks WHERE user_id = :user_id AND task_date = :task_date" , ["user_id" => $user_id, "task_date" => $task_date]);
    }

    public function getTasksForToday($user_id){
        $today = date('Y-m-d');
        return $this->query("SELECT * FROM tasks WHERE task_date = :today AND user_id = :user_id", ['today' => $today, 'user_id' => $user_id]);
    }
}
?>