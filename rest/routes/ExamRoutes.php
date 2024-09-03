<?php

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

/**
     * @OA\Post(
     *      path="/addExam",
     *      tags={"exams"},
     *      summary="Add exam data to the database.",
     *      security={
     *         {"ApiKey": {}}
     *      },
     *      @OA\Response(
     *           response=200,
     *           description="Exam data, or exception if exam is not added properly."
     *      ),
     *      @OA\RequestBody(
     *          description="exam data payload",
     *          @OA\JsonContent(
     *              required={"exam_name","exam_date_time","exam_place","user_id"},
     *              @OA\Property(property="exam_name", type="string", example="CO Final exam", description="Exam Name"),
     *              @OA\Property(property="exam_date_time", type="string", example="YY-MM-DD hh:mm", description="Date and Time of exam"),
     *              @OA\Property(property="exam_place", type="string", example="LAB128, Building B", description="Location details"),
     *              @OA\Property(property="user_id", type="integer", example=1, description="Id of the logged User")
     *          )
     *      )
     * )
     */

Flight::route("POST /addExam", function() {

      $payload = Flight::request()->data->getData();
      $payload['user_id']= Flight::get('user')->id;
      $examService = new ExamService();
      $result = $examService->addExam($payload);

      Flight::json([
         'result' => $result
      ]);
});

/**
     * @OA\Get(
     *      path="/getAllExams",
     *      tags={"exams"},
     *      summary="Get all exams.",
     *      security={
     *         {"ApiKey": {}}
     *      },
     *      @OA\Response(
     *           response=200,
     *           description="Array of all exams in the database."
     *      )
     * )
     */

Flight::route("GET /getAllExams", function(){

      $examService = new ExamService();
      $result = $examService->get_all();

      Flight::json([
         'result' => $result
      ]);
});

/**
     * @OA\Get(
     *      path="/getExamById/{id}",
     *      tags={"exams"},
     *      summary="Get exam by id.",
     *      security={
     *         {"ApiKey": {}}
     *      },
     *      @OA\Response(
     *           response=200,
     *           description="Exam data, or false if exam does not exist."
     *      ),
     *      @OA\Parameter(@OA\Schema(type="number"), in="path", name="id", example="1", description="Exam ID")
     * )
     */

Flight::route("GET /getExamById/@id", function($id){

      $examService = new ExamService();
      $result = $examService->get_by_id($id);

      Flight::json([
         'result' => $result
      ]);
 });

/**
     * @OA\Get(
     *      path="/getExamByUserId",
     *      tags={"exams"},
     *      summary="Get exam by user id.",
     *      security={
     *         {"ApiKey": {}}
     *      },
     *      @OA\Response(
     *           response=200,
     *           description="Get exam data or 500 status code exception otherwise"
     *      )
     * )
     */

    Flight::route("GET /getExamByUserId", function(){

     $examService = new ExamService();
     $result = $examService->getExamByUserId(Flight::get('user')->id);

     Flight::json([
        'result' => $result
     ]);
});

/**
    * @OA\Put(
    *     path="/editExam/{id}",
    *     tags={"exams"},
    *     summary="Edit exam data.",
    *     security={
    *         {"ApiKey": {}}
    *      },
    *     @OA\Parameter(
    *         name="id",
    *         in="path",
    *         required=true,
    *         description="Exam ID",
    *         @OA\Schema(type="integer", example=1)
    *     ),
    *     @OA\RequestBody(
    *         required=true,
    *         description="Request body containing current data.",
    *         @OA\JsonContent(
    *              @OA\Property(property="title", type="string", example="Web Engineering Final Exam", description="New title"),
    *              @OA\Property(property="details", type="string", example="Building B - ITLab128", description="New details")
    *         )
    *     )
    * )
    */

Flight::route("PUT /editExam/@id", function($id){

      $payload = Flight::request()->data->getData();
      $examService = new ExamService();
      $result = $examService->update($payload,$id);

      Flight::json([
         'result' => $result
      ]); 
 });

/**
     * @OA\Delete(
     *      path="/deleteExam/{id}",
     *      tags={"exams"},
     *      summary="Delete exam by id.",
     *      security={
     *         {"ApiKey": {}}
     *      },
     *      @OA\Response(
     *           response=200,
     *           description="Deleted exam data or 500 status code exception otherwise."
     *      ),
     *      @OA\Parameter(@OA\Schema(type="number"), in="path", name="id", example="1", description="Task ID")
     * )
     */

Flight::route("DELETE /deleteExam/@id", function($id){
      Flight::exam_service()->delete($id);
  
  });
?>