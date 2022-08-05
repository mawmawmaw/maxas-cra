<?php
function registerUser($user){
    /*
    // ERROR codes:
    // Code E1: Values are not set
    // Code E2: Pre-registration is full
    // Code E3: General Error
    */
    if  (isset($user->userName) && $user->userName!='' &&
         isset($user->userEmail) && $user->userEmail!='' &&
         isset($user->phoneNumber) && $user->phoneNumber!=''){
            try{
                $db = getDBconnection();
                $count = $db->query('select count(*) from tbl_PreMintRegistrations')->fetchColumn();
                if ($count < 1000){
                    $query = $db->prepare("INSERT INTO tbl_PreMintRegistrations(userName,userEmail,phoneNumber) VALUES (?,?,?)");
                    return $query->execute([$user->userName, $user->userEmail, $user->phoneNumber]);
                }else{
                    return 'E2';
                }
            }catch (Exception $e) {
                return 'E3~'. $e->getMessage();
            }
    }else{
        return 'E1';
    }
}
function getRegisteredUsersCount(){
    try{
        $db = getDBconnection();
        $count = $db->query('select count(*) from tbl_PreMintRegistrations')->fetchColumn();
        return $count;
    }catch (Exception $e) {
        echo 'Error: ',  $e->getMessage(), "\n";
        return false;
    }
}
function getEnvVariable($key){
    if (defined("_ENV_CACHE")) {
        $vars = _ENV_CACHE;
    } else {
        $file = "env.php";
        if (!file_exists($file)) {
            throw new Exception("El archivo de las variables de entorno ($file) no existe. Favor de crearlo");
        }
        $vars = parse_ini_file($file);
        define("_ENV_CACHE", $vars);
    }
    if (isset($vars[$key])) {
        return $vars[$key];
    } else {
        throw new Exception("La clave especificada (" . $key . ") no existe en el archivo de las variables de entorno");
    }
}
function getDBconnection(){ 
    $dbName = getEnvVariable("MYSQL_DATABASE_NAME");
    $user = getEnvVariable("MYSQL_USER");
    $password = getEnvVariable("MYSQL_PASSWORD");
    $database = new PDO('mysql:host=mysql.maxas.xyz;dbname='. $dbName , $user, $password);
    return $database;
}