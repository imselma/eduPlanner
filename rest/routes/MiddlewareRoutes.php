<?php

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

//Middleware for authentiaction

Flight::route('/*', function() {
    if(
        strpos(Flight::request()->url, '/login') === 0 ||
        strpos(Flight::request()->url, '/register') === 0 ||
        strpos(Flight::request()->url, '/connection-check') === 0){

            return TRUE;
        } else {
            try{
                $token = Flight::request()->getHeader("Authentication");
                if(!$token){
                   Flight::json(['message' => "Missing authentication header!"], 401);
                }
                $decoded_token = JWT::decode($token, new Key(Config::JWT_SECRET(), 'HS256')); 
          
                //Seting the token and user from decoded token globaly, so that we are able to use it in all other routes.
                Flight::set('user', $decoded_token->user);
                Flight::set('jwt_token',$token );
                return TRUE;
             }catch(\Exception $e){
                Flight::json(['message' => $e->getMessage()], 401); //401 -> means unauthenticated user
             }
        }
});


/*//Middleware for errors 
Flight::map('error', function(Exception $e) {

    file_put_contents('logs.txt', $e->getMessage() . PHP_EOL . $e->getTraceAsString() . PHP_EOL, FILE_APPEND | LOCK_EX);
    $code = ($e->getCode() > 0 && $e->getCode() < 600) ? $e->getCode() : 500;
    Flight::json(['message' => $e->getMessage()], $code);
});*/
