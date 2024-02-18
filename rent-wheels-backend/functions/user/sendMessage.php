<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        include '../functions.php';
        header('Content-type: application/json');
        try{
            $json = file_get_contents("php://input");
            $data = json_decode($json, true);

            $user = $data['username'];
            $email = $data['email'];
            $message = $data['message'];

            $err = 0;
            if($user == ''){
                $err++;
            }
            if(!preg_match('/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i', $email)){
                $err++;
            }
            if($message == ''){
                $err++;
            }
            
            if($err == 0){
                $currentDate = date('Y-m-d H:i:s', time());
                $insert = sendMessage($user, $email, $message, $currentDate);
                if($insert){
                    http_response_code(201);
                    $msg=['message'=>'Message successfully sent.'];
                    echo json_encode($msg);
                }
                else{
                    http_response_code(200);
                    $msg=['message'=>'Message unsuccessfully sent.'];
                    echo json_encode($msg);
                }
            }
            else{
                http_response_code(200);
                $msg=['message'=>"There was a $err errors. Please provide correct values for insert fields."];
                echo json_encode($msg);
            }

        }
        catch(PDOException $e){
            $msg = ["message"=>"There was an error on the server. Try again later."];
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