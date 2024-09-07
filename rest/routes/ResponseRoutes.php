<?php
Flight::route("POST /generateResponse", function() {

    $data = Flight::request()->data->getData();
    $responseService = new ResponseService();
    $result = $responseService->generateResponse($data);

    // Always ensure a valid JSON response is sent back
    Flight::json([
        'result' => $result ? $result : 'No response from AI'
    ]);
});

?>