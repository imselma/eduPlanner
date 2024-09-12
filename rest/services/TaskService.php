<?php
require_once 'BaseService.php';
require_once __DIR__."/../dao/TaskDao.php";

class TaskService extends BaseService{
    public function __construct(){
        parent::__construct(new TaskDao);
    }

    public function addTask($data, $user_id){

        $task = [
            'task_name' => $data['task_name'],
            'task_description' => $data['task_description'],
            'task_date' => $data['task_date'],
            'user_id' => $user_id,
            'task_time' => $data['task_time'],
            'task_type' => $data['task_type']
        ];
        return $this->add($task);//calling the add() method on previous instantiated BaseDao object 
    }
    
    public function getTaskByUserId($user_id) {
        return $this->dao->getTaskByUserId($user_id); 
    }

    public function getTaskByUserIdAndDate($user_id, $task_date) {
        return $this->dao->getTaskByUserIdAndDate($user_id, $task_date); 
    }

    
    public function getTasksForToday($user_id) {
        return $this->dao->getTasksForToday($user_id); 
    }

}
?>