<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        include '../functions.php';
        header('Content-type: application/json');
        try{
            $json = file_get_contents("php://input");
            $data = json_decode($json, true);

            $email = $data['email'];

            $err = 0;
            if(!preg_match('/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i', $email)){
                $err++;
            }
            if($err==0){
                $emailExist = emailExist($email);
                if($emailExist){
                    $msg = ["message"=>"You are already subscribed with this email."];
                    http_response_code(200);
                    echo json_encode($msg);
                }
                else{
                    $currentDate = date('Y-m-d H:i:s', time());
                    $insert = subscription($email, $currentDate);

                    if($insert){
                        http_response_code(201);
                        $msg=['message'=>'Successfully subscribed.'];
                        echo json_encode($msg);
                    }
                    else{
                        http_response_code(200);
                        $msg=['message'=>'Unsuccessfully subscribed.'];
                        echo json_encode($msg);
                    }
                }
            }
            if($err>0){
                $msg=["message"=>"Email is not in the right format. Please use full declaration."];
                http_response_code(200);
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