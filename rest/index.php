<?php
require_once dirname(__FILE__) . '/vendor/autoload.php'; 

use Symfony\Component\Dotenv\Dotenv;
if (!in_array('LIVE', $_ENV)) {
    $dotenv = new Dotenv();
    $dotenv->load(__DIR__.'/.env');
}

print_r($_ENV); die;

require_once "./services/BaseService.php";
require_once "./services/UserService.php";
require_once "./services/ExamService.php";
require_once "./services/TaskService.php";
require_once "./services/ResponseService.php";


header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS, PATCH');

Flight::register('base_services', "BaseService");
Flight::register('user_service', "UserService");
Flight::register('exam_service', "ExamService");
Flight::register('task_service', "TaskService");
Flight::register('generate_response_service', "ResponseService");

require './routes/MiddlewareRoutes.php';
require './routes/UserRoutes.php';
require './routes/ExamRoutes.php';
require './routes/TaskRoutes.php';
require './routes/ResponseRoutes.php';

Flight::start();
?>
