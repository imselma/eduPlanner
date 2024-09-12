<?php

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

Flight::route("POST /addExam", function() {

      $payload = Flight::request()->data->getData();
      $user_id= Flight::get('user')->id;
      $examService = new ExamService();
      $result = $examService->addExam($payload, $user_id);

      Flight::json([
         'result' => $result
      ]);
});


Flight::route("GET /getAllExams", function(){

      $examService = new ExamService();
      $result = $examService->get_all();

      Flight::json([
         'result' => $result
      ]);
});


Flight::route("GET /getExamById/@id", function($id){

      $examService = new ExamService();
      $result = $examService->get_by_id($id);

      Flight::json([
         'result' => $result
      ]);
 });


Flight::route("GET /getExamByUserId", function(){

     $examService = new ExamService();
     $result = $examService->getExamByUserId(Flight::get('user')->id);

     Flight::json([
          'result' => $result
     ]);
});


Flight::route("POST /getExamByUserIdAndDate", function(){

     $examService = new ExamService();
     $requestData = Flight::request()->data->getData();
     $userId = Flight::get('user')->id; 
     $date = $requestData['exam_date']; 
     
     $result = $examService->getExamByUserIdAndDate($userId, $date);
     
     Flight::json([
          'result' => $result
     ]);
     });

Flight::route("PUT /editExam/@id", function($id){

      $payload = Flight::request()->data->getData();
      $examService = new ExamService();
      $result = $examService->update($payload,$id);

      Flight::json([
         'result' => $result
      ]); 
 });


Flight::route("DELETE /deleteExam/@id", function($id){
      Flight::exam_service()->delete($id);
  
  });
?>