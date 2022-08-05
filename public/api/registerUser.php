<?php
include_once "cors.php";
include_once "functions.php";
$user = json_decode(file_get_contents('php://input'));
$registered = registerUser($user);
echo json_encode($registered);