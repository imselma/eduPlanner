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
            'exam_date' => $data['exam_date'],
            'exam_place' =>$data['exam_place'],
            'user_id' => $data['user_id'],
            'exam_time' => $data['exam_time'],
            'exam_type' => $data['exam_type']
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
        return $this->dao->getExamsInNext24Hours($user_id); 
    }
}
?>
