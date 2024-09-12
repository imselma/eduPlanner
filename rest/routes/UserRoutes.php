<?php

use Firebase\JWT\JWT;
use Firebase\JWT\Key;

Flight::route('GET /connection-check', function(){
    $dao = new BaseDao("users");
});

/**
 * @OA\Post(
 *      path="/register",
 *      tags={"users"},
 *      summary="Add user data to the database.",
 *      @OA\Response(
 *           response=200,
 *           description="User added successfully or failure message."
 *      ),
 *      @OA\RequestBody(
 *          description="User data payload",
 *          @OA\JsonContent(
 *              required={"user_type","first_name","last_name","username","email", "password", "phone_number"},
 *              @OA\Property(property="user_type", type="string", example="user", description="Update user type"),
 *              @OA\Property(property="first_name", type="string", example="Joe", description="User's first name"),
 *              @OA\Property(property="last_name", type="string", example="Smith", description="User's last name"),
 *              @OA\Property(property="username", type="string", example="joes", description="Username"),
 *              @OA\Property(property="email", type="string", example="example@user.com", description="User's email address"),
 *              @OA\Property(property="password", type="string", example="user12345", description="User's password"),
 *              @OA\Property(property="phone_number", type="string", example="+38761528067", description="User's phone number")
 *          )
 *      )
 * )
 */

Flight::route("POST /register", function() {
   $payload = Flight::request()->data->getData();
   $userService = new UserService(); 
   
   $result = $userService->register($payload);
   
   if (is_array($result) && isset($result['error'])) {
       Flight::json($result, 400);
   } else {
       Flight::json(['message' => 'User registered successfully!']);
   }
});

/**
 * @OA\Post(
 *      path="/login",
 *      tags={"users"},
 *      summary="Log in user to account using email and password.",
 *      @OA\Response(
 *           response=200,
 *           description="User data and JWT."
 *      ),
 *      @OA\RequestBody(
 *          description="Credentials",
 *          @OA\JsonContent(
 *              @OA\Property(property="email", type="string", example="example@user.com", description="User's email address"),
 *              @OA\Property(property="password", type="string", example="user12345", description="User's password"),
 *          )
 *      )
 * )
*/ 
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
            "exp" => time() + (60 * 60 * 24)
         ];
      
         $token = JWT::encode(
            $jwt_payload,
            JWT_SECRET, 
            'HS256' 
         );
      
         Flight::json(array_merge($fatchedUser, ['token' => $token]));
   });
      

   /*Implementing stateless authentication. Not keeping state of our sessions, only way to authenticate users is
   for every request we will send the authentication header with the jwt token and we will check the token, try decode it, check if it valid and only if it is valid we can execute the request.*/

   /*User needs to be authenticated to triger some routes. In order to force that we use security and it will be secured using authentication mechanism*/

Flight::route('POST /logout', function() {

   try{
      $token = Flight::request()->getHeader("Authentication");
      if(!$token){
         Flight::json(['message' => "Missing authentication header!"], 401);
      }
      $decoded_token = JWT::decode($token, new Key(JWT_SECRET, 'HS256')); //If I add something it would fail because I am trying to decode jwt token signed with one secret, with another

      Flight::json([
         'jwt_decoded' => $decoded_token,
         'user' => $decoded_token->user
      ]);
   }catch(\Exception $e){
      Flight::json(['message'=> $e->getMessage()], 401); 
   }
});

Flight::route('PUT /notificationOn', function() {

   $userId = Flight::get('user')->id; 
   $userService = new UserService();
   $result = $userService->turnNotificationOn($userId);

   Flight::json([
      'result' => $result
   ]);
});

Flight::route('PUT /notificationOff', function() {

   $userId = Flight::get('user')->id; 
   $userService = new UserService();
   $result = $userService->turnNotificationOff($userId);

   Flight::json([
      'result' => $result
   ]);
});

Flight::route("GET /getUserById", function(){

   $userService = new UserService();
   $result = $userService->getUserById(Flight::get('user')->id);

   Flight::json([
      'result' => $result
   ]);
});

Flight::route("PUT /editUser", function(){

   $payload = Flight::request()->data->getData();
   $userService = new UserService();
   $userId = Flight::get('user')->id;
   $result = $userService->editUser($payload,$userId);

   Flight::json([
      'result' => $result
   ]);
});

Flight::route("DELETE /deleteUser", function(){

   $userService = new UserService();
   $userId = Flight::get('user')->id;
   Flight::user_service()->delete($userId);

});

?>