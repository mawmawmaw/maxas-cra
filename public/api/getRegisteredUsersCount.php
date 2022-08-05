<?php
include_once "cors.php";
include_once "functions.php";
$count = getRegisteredUsersCount();
echo json_encode($count);