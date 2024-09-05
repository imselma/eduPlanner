<?php
require_once dirname(__FILE__) . '/vendor/autoload.php'; 
require_once "./services/BaseService.php";
require_once "./services/UserService.php";
require_once "./services/ExamService.php";
require_once "./services/TaskService.php";


header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS, PATCH');

Flight::register('base_services', "BaseService");
Flight::register('user_service', "UserService");
Flight::register('exam_service', "ExamService");
Flight::register('task_service', "TaskService");

require './routes/MiddlewareRoutes.php';
require './routes/UserRoutes.php';
require './routes/ExamRoutes.php';
require './routes/TaskRoutes.php';

Flight::start();
?>
