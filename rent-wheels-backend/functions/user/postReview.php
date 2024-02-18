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
            $rating = $data['rating'];
            $review = $data['text'];

            if($rating>0 && $rating<6){
                if($review !== ''){
                    $currentDate = date('Y-m-d H:i:s', time());

                    $posted = postReview($user_id, $car_id, $rating, $review, $currentDate);
                    if($posted){
                        $msg = ["message"=>"You successfully posted review."];
                        echo json_encode($msg);
                        http_response_code(201);
                    }
                    else{
                        $msg = ["message"=>"There was an error while trying to insert review into database."];
                        echo json_encode($msg);
                        http_response_code(200);
                    }
                }else{
                    $msg = ["message"=>"You sent us an empty review!"];
                    echo json_encode($msg);
                    http_response_code(200);
                }
            }
            else{
                $msg = ["message"=>"Rating can not be 0 or above 5."];
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