<?php
    require_once '../../header/header.php';
    if($_SERVER['REQUEST_METHOD'] == 'GET'){
        include '../functions.php';
        header('Content-type: application/json');
        try{
            $locations = getLocations();
            $types = getCarsType();
            $brands = getBrands();
            $years = getYears();

            $allDdl = [$locations, $types, $brands, $years];

            if($allDdl){
                echo json_encode($allDdl);
                http_response_code(200);
            }
            else{
                $msg = ['message'=>'There are no drop down lists.'];
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