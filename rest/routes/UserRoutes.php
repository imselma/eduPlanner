<?php

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

Flight::route('GET /connection-check', function(){
    $dao = new BaseDao("users");
});

Flight::route("POST /register", function() {
   $payload = Flight::request()->data->getData(); // Getting data from the request payload.
   $userService = new UserService(); // Making an instance of UserService
   
   $result = $userService->register($payload); // Add user to db
   
   if (is_array($result) && isset($result['error'])) {
       Flight::json($result, 400); // Return the error and messages with a 400 status code
   } else {
       Flight::json(['message' => 'User registered successfully!']);
   }
});

   Flight::route("POST /login", function() {

         $payload = Flight::request()->data->getData();
         $userService = new UserService();
      
         $fatchedUser = $userService->login($payload);
      
         if(!$fatchedUser) {
            Flight::json(['message' => 'Login failed due to wrong credentials!'], 500);
         }
      
         unset($fatchedUser['password']);
      
         $jwt_payload = [
            'user' => $fatchedUser,
            "issued_at" => time(),
            "exp" => time() + (60 * 60 * 24) //Valid one day
         ];
      
         //create token
         $token = JWT::encode(
            $jwt_payload, //payload
            JWT_SECRET, //secret created in config
            'HS256' //algorithm used to create token (SHA256)
         );
      
         Flight::json(array_merge($fatchedUser, ['token' => $token]));
   });
      

   /*Implementing stateless authentication. Not keeping state of our sessions, only way to authenticate users is
   for every request we will send the authentication header with the jwt token and we will check the token, try decode it, check if it valid and only if it is valid we can execute the request.*/

   /*User needs to be authenticated to triger some routes. In order to force that we use security and it will be secured using authentication mechanism*/

   Flight::route('POST /authLogout', function() {

      try{
         $token = Flight::request()->getHeader("Authentication");
         if(!$token){
            Flight::json(['message' => "Missing authentication header!"], 401);
         }
         $decoded_token = JWT::decode($token, new Key(Config::JWT_SECRET(), 'HS256')); //If I add something it would fail because I am trying to decode jwt token signed with one secret, with another

         Flight::json([
            'jwt_decoded' => $decoded_token,
            'user' => $decoded_token->user
         ]);
      }catch(\Exception $e){
         Flight::json(['message'=> $e->getMessage()], 401); //401 -> means unauthenticated user
      }
   });


?>