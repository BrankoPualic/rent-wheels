<?php
    require_once '../../header/header.php';
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        include '../functions.php';
        header('Content-type: application/json');
        try{
            $json = file_get_contents("php://input");
            $number = json_decode($json, true);

            $carId = $number;
            $data = getCarReviews($carId);

            if($data){
                echo json_encode($data);
                http_response_code(200);
            }
            else{
                $msg = ['message'=>'There was an error while tryign to fetch data from database or there are not any to fetch!'];
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