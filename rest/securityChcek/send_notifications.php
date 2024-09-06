<?php
require __DIR__ . '/../vendor/autoload.php';
require_once __DIR__ . '/../services/UserService.php';  

$userService = new UserService();
$usersWithNotifications = $userService->getUsersWithNotificationsOn();

foreach ($usersWithNotifications as $user) {
    $userService->sendUpcomingEventEmails($user['id']);

    echo "Email sent to user ID: {$user['id']} ({$user['email']})\n"; 
}

echo "Script completed\n";
