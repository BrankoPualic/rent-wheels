<?php
    require_once '../../header/header.php';
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        include '../functions.php';
        header('Content-type: application/json');
        try{
            $json = file_get_contents("php://input");
            $data = json_decode($json, true);

            $search = $data['search'];
            $brand = $data['brand'];
            $type = $data['type'];
            $year = $data['year'];
            $location = $data['location'];
            $minPrice = $data['price']['minPrice'] ?? 0;
            $maxPrice = $data['price']['maxPrice'] ?? 0;
            $transmission = $data['transmission'] ?? 0;
            $newCar = $data['newCar'];
            $recCar = $data['recCar'];

            $cars = getCarList($search, $brand, $type, $year, $location, $minPrice, $maxPrice, $transmission, $newCar, $recCar);



            if($cars){
                echo json_encode($cars);
                http_response_code(200);
            }
            else{
                $msg = ['message'=>'There are no cars for this type of filtering.'];
                echo json_encode($msg);
                http_response_code(200);
            }

        }
        catch(PDOException $e){
            $msg = ["message"=>"There was an error on the server. Try again later.", "e"=>$e];
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