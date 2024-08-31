<?php
require_once dirname(__FILE__) . '/vendor/autoload.php'; 
require_once "./services/BaseService.php";
require_once "./services/UserService.php";


header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: PUT, GET, POST, DELETE, OPTIONS, PATCH');

Flight::register('base_services', "BaseService");
Flight::register('user_service', "UserService");

require './routes/MiddlewareRoutes.php';
require './routes/UserRoutes.php';

Flight::start();
?>
