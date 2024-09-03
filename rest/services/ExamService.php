<?php
require_once 'BaseService.php';
require_once __DIR__."/../dao/ExamDao.php";

class ExamService extends BaseService{
    public function __construct(){
        parent::__construct(new ExamDao);
    } 

    public function addExam($data){

        $exam = [
            'exam_name' => $data['exam_name'],
            'exam_date_time' => $data['exam_date_time'],
            'exam_place' =>$data['exam_place'],
            'user_id' => $data['user_id']
        ];
        return $this->add($exam);//calling the add() method on previous instantiated BaseDao object 
    }

    public function getExamByUserId($user_id) {
        return $this->dao->getExamByUserId($user_id); 
    }
}
?>
