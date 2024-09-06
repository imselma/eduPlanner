<?php

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

require_once 'BaseService.php';
require_once 'ExamService.php';
require_once 'TaskService.php';
require_once __DIR__."/../dao/UserDao.php";  
require_once __DIR__."/../securityChcek/security.php";

class UserService extends BaseService{

    private $security;

    public function __construct(){
        parent::__construct(new UserDao);
        $this->security = new Security();
    } 

    //Sending emails
    private function sendEmails ($recepientEmail, $recepientFirstName, $messageHtml, $nonHtmlMessage){
        //Create an instance; passing `true` enables exceptions
        $mail = new PHPMailer(true);
        //Server settings
        $mail->SMTPDebug = SMTP::DEBUG_OFF; //Enable verbose debug output
        $mail->isSMTP(); //Send using SMTP
        $mail->Host = SMTP_HOST; //Set the SMTP server to send through
        $mail->SMTPAuth = true; //Enable SMTP authentication
        $mail->Username = SMTP_USERNAME; //SMTP username
        $mail->Password = SMTP_PASSWORD; //SMTP password
        $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS; //Enable implicit TLS encryption
        $mail->Port = SMTP_PORT; //TCP port to connect to; use 587 if you have set `SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS`
        //Recipients
        $mail->setFrom('eduPlanner@gmail.com', 'EduPlanner - Your Ultimate Academic Organizerg');
        $mail->addAddress($recepientEmail, $recepientFirstName); //Add a recipient
        //Content
        $mail->isHTML(true); //Set email format to HTML
        $mail->Subject = 'EduPlanner Event Deadline';
        $mail->Body = $messageHtml;
        $mail->AltBody = $nonHtmlMessage;
        $mail->send();
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

    
    public function getUserById($id) {
        return $this->dao->getUserById($id);
    }

    public function turnNotificationOn($id) {
        return $this->dao->turnNotificationOn($id);
    }

    public function turnNotificationOff($id) {
        return $this->dao->turnNotificationOff($id);
    }

    public function getnNotificationFlag($id) {
        return $this->dao->getnNotificationFlag($id);
    }

    public function sendUpcomingEventEmails($id) {
        // Get upcoming exams and tasks for the user within the next 24 hours
        $examService = new ExamService();
        $taskService = new TaskService();
        $user = $this->getUserById($id);
        
        $upcomingExams = $examService->getExamsForToday($id);
        $upcomingTasks = $taskService->getTasksForToday($id);
    
        // If there are no upcoming events, don't send the email
        if (empty($upcomingExams) && empty($upcomingTasks)) {
            return;
        }
    
        // Prepare email content
        $messageHtml = "You have the following upcoming deadlines within the next 24 hours:";
        $nonHtmlMessage = "You have upcoming deadlines in the next 24 hours.";
    
        foreach ($upcomingExams as $exam) {
            $messageHtml .= "<br>Exam: " . $exam['exam_name'] . " on " . $exam['exam_date'] . " at " . $exam['exam_time'];
            $nonHtmlMessage .= "\nExam: " . $exam['exam_name'] . " on " . $exam['exam_date'] . " at " . $exam['exam_time'];
        }
    
        foreach ($upcomingTasks as $task) {
            $messageHtml .= "<br>Task: " . $task['task_name'] . " on " . $task['task_date'] . " at " . $task['task_time'];
            $nonHtmlMessage .= "\nTask: " . $task['task_name'] . " on " . $task['task_date'] . " at " . $task['task_time'];
        }
    
        // Call the sendEmails function
        $this->sendEmails($user['email'], $user['first_name'], $messageHtml, $nonHtmlMessage);
    }

    public function getUsersWithNotificationsOn() {
        return $this->dao->getUsersWithNotificationsOn();
    }
}
?>
