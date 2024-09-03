<?php

require __DIR__ . '/../../../vendor/autoload.php';



/*if($_SERVER['SERVER_NAME'] == 'localhost' || $_SERVER['SERVER_NAME'] == '127.0.0.1'){
    define('BASE_URL', 'http://localhost:80/eduPlanner/rest/');
} else {
    define('BASE_URL', 'https://dolphin-app-imkza.ondigitalocean.app/rest/');
}*/

define('BASE_URL', 'http://localhost:80/eduPlanner/rest/');


error_reporting(0);
$openapi = \OpenApi\Generator::scan(['../../../routes', './'], ['pattern' => '*.php']);
// $openapi = \OpenApi\Util::finder(['../../../rest/routes', './'], NULL, '*.php');
// $openapi = \OpenApi\scan(['../../../rest', './'], ['pattern' => '*.php']);

header('Content-Type: application/x-yaml');
echo $openapi->toYaml();
?>
