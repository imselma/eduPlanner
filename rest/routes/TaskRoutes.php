<?php

/**
     * @OA\Post(
     *      path="/addTask",
     *      tags={"tasks"},
     *      summary="Add task data to the database.",
     *      security={
     *         {"ApiKey": {}}
     *      },
     *      @OA\Response(
     *           response=200,
     *           description="Study task data, or exception if task is not added properly."
     *      ),
     *      @OA\RequestBody(
     *          description="Task data payload.",
     *          @OA\JsonContent(
     *              required={"task_name","task_description","task_deadline"},
     *              @OA\Property(property="task_name", type="string", example="Web - milestone #4", description="Name"),
     *              @OA\Property(property="task_description", type="string", example="Finish backen and add QopenAPI and JWT.", description="Description"),
     *              @OA\Property(property="task_deadline", type="string", example="2024-10-02 23:59", description="Deadline")
     *          )
     *      )
     * )
     */
Flight::route("POST /addTask", function() {

      $payload = Flight::request()->data->getData();
      $payload['user_id']= Flight::get('user')->id;
      $taskService = new TaskService();
      $result = $taskService->addTask($payload);
   

      Flight::json([
         'result' => $result
      ]);
});

/**
     * @OA\Get(
     *      path="/getAllTasks",
     *      tags={"tasks"},
     *      summary="Get all tasks.",
     *      security={
     *         {"ApiKey": {}}
     *      },
     *      @OA\Response(
     *           response=200,
     *           description="Array of all tasks in the database."
     *      )
     * )
     */
Flight::route("GET /getAllTasks", function(){

      $taskService = new TaskService();
      $result = $taskService->get_all();
   
      Flight::json([
         'result' => $result
      ]);
});

/**
     * @OA\Get(
     *      path="/getTaskById/{id}",
     *      tags={"tasks"},
     *      summary="Get task by id.",
     *      security={
     *         {"ApiKey": {}}
     *      },
     *      @OA\Response(
     *           response=200,
     *           description="Task data, or false if task does not exist."
     *      ),
     *      @OA\Parameter(@OA\Schema(type="number"), in="path", name="id", example="1", description="Task ID")
     * )
     */
Flight::route("GET /getTaskById/@id", function($id){

      $taskService = new TaskService();
      $result = $taskService->get_by_id($id);

      Flight::json([
         'result' => $result
      ]);
});

/**
     * @OA\Get(
     *      path="/getTaskByUserId",
     *      tags={"tasks"},
     *      summary="Get task by user id.",
     *      security={
     *         {"ApiKey": {}}
     *      },
     *      @OA\Response(
     *           response=200,
     *           description="Get task data or 500 status code exception otherwise"
     *      )
     * )
     */
    Flight::route("GET /getTaskByUserId", function(){

      $taskService = new TaskService();
      $result = $taskService->getTaskByUserId(Flight::get('user')->id);
 
      Flight::json([
         'result' => $result
      ]);
 });

/**
    * @OA\Put(
    *     path="/editTask/{id}",
    *     tags={"tasks"},
    *     summary="Edit task data.",
    *      security={
    *         {"ApiKey": {}}
    *      },
    *     @OA\Parameter(
    *         name="id",
    *         in="path",
    *         required=true,
    *         description="Task ID",
    *         @OA\Schema(type="integer", example=1)
    *     ),
    *     @OA\RequestBody(
    *         required=true,
    *         description="Request body containing current data",
    *         @OA\JsonContent(
    *              @OA\Property(property="task_name", type="string", example="Mobile Development - milestone #4", description="Name"),
    *              @OA\Property(property="task_description", type="string", example="Finish backend.", description="Description"),
    *              @OA\Property(property="task_deadline", type="string", example="2024-11-02 23:59", description="Deadline")
    *         )
    *     )
    * )
    */
Flight::route("PUT /editTask/@id", function($id){

      $payload = Flight::request()->data->getData();
      $taskService = new TaskService();
      $result = $taskService->update($payload,$id);

      Flight::json([
         'result' => $result
      ]);
});

 /**
     * @OA\Delete(
     *      path="/deleteTask/{id}",
     *      tags={"tasks"},
     *      summary="Delete task by id.",
     *      security={
     *         {"ApiKey": {}}
     *      },
     *      @OA\Response(
     *           response=200,
     *           description="Deleted task data or 500 status code exception otherwise."
     *      ),
     *      @OA\Parameter(@OA\Schema(type="number"), in="path", name="id", example="1", description="Task ID")
     * )
     */
Flight::route("DELETE /deleteTask/@id", function($id){

      Flight::task_service()->delete($id);
 });
?>