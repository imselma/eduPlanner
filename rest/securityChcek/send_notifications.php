<?php
require __DIR__ . '/../vendor/autoload.php';

use Symfony\Component\Dotenv\Dotenv;
$dotenv = new Dotenv();
$dotenv->load(__DIR__.'/../.env');

require_once __DIR__ . '/../services/UserService.php';  

$userService = new UserService();
$usersWithNotifications = $userService->getUsersWithNotificationsOn();

foreach ($usersWithNotifications as $user) {
    $userService->sendUpcomingEventEmails($user['id']);

    echo "Email sent to user ID: {$user['id']} ({$user['email']})\n"; 
}

echo "Script completed\n";
