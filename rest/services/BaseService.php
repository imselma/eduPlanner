<?php

class BaseService {
    public $dao;
   
    public function __construct($dao){
        $this->dao = $dao;
    }

    public function get_all(){
        return $this->dao->get_all();
    }

    public function get_by_id($id){
        return $this->dao->get_by_id($id);
    }

    public function get_by_email($email){
        return $this->dao->get_by_email($email);
    }

    public function add($entity){
        return $this->dao->add($entity);
    }

    public function update($entity, $id){
        return $this->dao->update($entity, $id);
    }
    
    public function delete($id){
        return $this->dao->delete($id);
    }
}

?>