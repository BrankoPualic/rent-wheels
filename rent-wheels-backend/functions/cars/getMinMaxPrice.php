<?php
    require_once '../../header/header.php';
    if($_SERVER['REQUEST_METHOD'] == 'GET'){
        include '../functions.php';
        header('Content-type: application/json');
        try{
            $data = getMinMaxPrice();

            if($data){
                echo json_encode($data);
                http_response_code(200);
            }
            else{
                $msg = ['message'=>'There was an error while trying to get min and max price values.'];
                echo json_encode($msg);
                http_response_code(200);
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