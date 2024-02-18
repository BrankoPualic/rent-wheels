<?php
    require_once '../../header/header.php';
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        include '../functions.php';
        header('Content-type: application/json');
        try{
            $json = file_get_contents("php://input");
            $data = json_decode($json, true);

            $user_id = $data['user_id'];
            $car_id = $data['car_id'];
            $total = $data['total_cost'];
            $date_from = $data['date_from'];
            $date_to = $data['date_to'];

            $status = rentACar($user_id, $car_id, $total, $date_from, $date_to);

            if($status){
                $msg = ["message"=>"You have successfully rented this car!"];
                echo json_encode($msg);
                http_response_code(200);
            }
            else{
                $msg = ["message"=>"There was an error while trying to insert data into database!"];
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