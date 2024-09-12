<?php
require_once 'BaseService.php';
require_once __DIR__."/../dao/ExamDao.php";

class ExamService extends BaseService{
    public function __construct(){
        parent::__construct(new ExamDao);
    } 

    public function addExam($data, $user_id){

        $exam = [
            'exam_name' => $data['exam_name'],
            'exam_place' =>$data['exam_place'],
            'exam_time' => $data['exam_time'],
            'exam_date' => $data['exam_date'],
            'exam_type' => $data['exam_type'],
            'user_id' => $user_id
        ];
        return $this->add($exam);//calling the add() method on previous instantiated BaseDao object 
    }

    public function getExamByUserId($user_id) {
        return $this->dao->getExamByUserId($user_id); 
    }

    public function getExamByUserIdAndDate($user_id, $exam_date) {
        return $this->dao->getExamByUserIdAndDate($user_id, $exam_date); 
    }

    public function getExamsForToday($user_id) {
        return $this->dao->getExamsForToday($user_id); 
    }
}
?>
