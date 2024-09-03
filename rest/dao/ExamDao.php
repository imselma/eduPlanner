<?php
require_once "BaseDao.php";

class ExamDao extends BaseDao {

    public function __construct(){
        parent::__construct("exams");
    }

    public function getExamByUserId($user_id) {
        return $this->query("SELECT * FROM exams WHERE user_id = :user_id", ["user_id" => $user_id]);
    }
}
?>