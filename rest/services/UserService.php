<?php

require_once 'BaseService.php';
require_once __DIR__."/../dao/UserDao.php";
require_once __DIR__."/../securityChcek/security.php";

class UserService extends BaseService{

    private $security;

    public function __construct(){
        parent::__construct(new UserDao);
        $this->security = new Security();
    } 

    public function register($data) {
        $errors = [];
    
        if (!$this->security->validateUsernameAlphanumeric($data['username'])) {
            $errors[] = "The username must be an alphanumeric value!";
        }
        
        if ($this->security->validateUsernameLength($data['username'])) {
            $errors[] = "The username should not be less than five characters!";
        }
        
        if (!$this->security->validateEmailFormat($data['email'])) {
            $errors[] = "Invalid email format!";
        }
        
        if ($this->security->validatePasswordLength($data['password'])) {
            $errors[] = "The password should not be less than six characters!";
        }
        
        if ($this->security->haveIBeenPawnd($data['password']) === 0) {
            $errors[] = "Your password is weak, please use another!";
        }
        
        if ($this->security->validatePhoneNumber($data['phone_number']) === 0) {
            $errors[] = "Invalid phone number format!";
        }
    
        if (!empty($errors)) {
            http_response_code(400);
            return ["error" => "Failed to register user!", "messages" => $errors];
        }
    
        $hashed_password = password_hash($data['password'], PASSWORD_DEFAULT);
    
        $user = [
            'user_type' => $data['user_type'],
            'first_name' => $data['first_name'],
            'last_name' => $data['last_name'],
            'username' => $data['username'],
            'email' => $data['email'],
            'password' => $hashed_password,
            'phone_number' => $data['phone_number']
        ];
    
        return $this->add($user); // Calling the add() method on the previously instantiated BaseDao object 
    }
    

    public function login($data){
        $email = $data['email'];
        $password = $data['password'];
        
        // Fetch user by email
        $user = $this->get_by_email($email);
        // Check if user exists with the provided email
        if (!empty($user)) {
         // Loop through each user to find the one with matching password
         foreach ($user as $user) {
             if (password_verify($password, $user['password'])){
             return $user; // User found and password is correct
            }
         }
       }
     } 
}
?>
