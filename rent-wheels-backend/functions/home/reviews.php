<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept, Authorization");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
    if($_SERVER['REQUEST_METHOD'] == 'GET'){
        include '../functions.php';
        header('Content-type: application/json');
        try{
            $data = getHomePageReviews();

            if($data){
                echo json_encode($data);
                http_response_code(200);
            }
            else{
                $msg = ['message'=>'There are no reviews.'];
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