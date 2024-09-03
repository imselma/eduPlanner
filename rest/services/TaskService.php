<?php
require_once 'BaseService.php';
require_once __DIR__."/../dao/TaskDao.php";

class TaskService extends BaseService{
    public function __construct(){
        parent::__construct(new TaskDao);
    }

    public function addTask($data){

        $task = [
            'task_name' => $data['task_name'],
            'task_description' => $data['task_description'],
            'task_deadline' => $data['task_deadline'],
            'user_id' => $data['user_id']
        ];
        return $this->add($task);//calling the add() method on previous instantiated BaseDao object 
    }
    
    public function getTaskByUserId($user_id) {
        return $this->dao->getTaskByUserId($user_id); 
    }

}
?>