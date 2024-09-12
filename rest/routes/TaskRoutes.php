<?php

Flight::route("POST /addTask", function() {

      $payload = Flight::request()->data->getData();
      $user_id = Flight::get('user')->id;
      $taskService = new TaskService();
      $result = $taskService->addTask($payload, $user_id);
   

      Flight::json([
         'result' => $result
      ]);
});

Flight::route("GET /getAllTasks", function(){

      $taskService = new TaskService();
      $result = $taskService->get_all();
   
      Flight::json([
         'result' => $result
      ]);
});

Flight::route("GET /getTaskById/@id", function($id){

      $taskService = new TaskService();
      $result = $taskService->get_by_id($id);

      Flight::json([
         'result' => $result
      ]);
});

Flight::route("GET /getTaskByUserId", function(){

     $taskService = new TaskService();
     $result = $taskService->getTaskByUserId(Flight::get('user')->id);

     Flight::json([
     'result' => $result
     ]);
 });

Flight::route("POST /getTaskByUserIdAndDate", function(){

     $taskService = new TaskService();
     $requestData = Flight::request()->data->getData();
     $userId = Flight::get('user')->id; 
     $date = $requestData['task_date']; 

     $result = $taskService->getTaskByUserIdAndDate($userId, $date);
     
     Flight::json([
     'result' => $result
     ]);
  });

Flight::route("PUT /editTask/@id", function($id){

      $payload = Flight::request()->data->getData();
      $taskService = new TaskService();
      $result = $taskService->update($payload,$id);

      Flight::json([
         'result' => $result
      ]);
});

Flight::route("DELETE /deleteTask/@id", function($id){

      Flight::task_service()->delete($id);
 });
?>