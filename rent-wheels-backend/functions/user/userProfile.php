<?php
    require_once '../../header/header.php';
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        include '../functions.php';
        header('Content-type: application/json');
        try{
            $json = file_get_contents("php://input");
            $number = json_decode($json, true);

            $userId = $number;
            $user = getUserProfile($userId);

            if($user){
                echo json_encode($user);
                http_response_code(200);
            }
            else{
                $msg = ['message'=>'There was an error while getting the user from database!'];
                echo json_encode($msg);
                http_response_code(200);
            }

        }
        catch(PDOException $e){
            $msg = ["message"=>"There was an error on the server. Try again later.", 'e'=>$e];
            echo json_encode($msg);
            http_response_code(200);
        }
    }
    else{
        $msg = ["message"=>"Page doesn't exist."];
        echo json_encode($msg);
        http_response_code(200);
    }
?>