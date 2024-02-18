<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        include '../functions.php';
        header('Content-type: application/json');
        try{

            $name = $_POST['name'];
            $email = $_POST['email'];
            $password = $_POST['password'];
            $image = $_FILES['image'];

            if($image['error'] === UPLOAD_ERR_OK){

                global $connection;
                $connection->beginTransaction();

                $imageName = $image['name'];
                $imageType = $image['type'];
                $imageSize = $image['size'];

                $allowedTypes = ['image/jpeg', 'image/jpg', 'image/png'];
                $maxFileSize = 2 * 1024 * 1024; // 2MB

                if(!in_array($imageType, $allowedTypes)){
                    $msg = ['message'=>'Image format is not allowed! Please use one of allowed formats png, jpeg and jpg.'];
                    http_response_code(200);
                    echo json_encode($msg);
                }
                if($imageSize > $maxFileSize){
                    $msg = ['message'=>'Image size must be lower than 2MB.'];
                    http_response_code(200);
                    echo json_encode($msg);
                }
                if(!preg_match('/^[A-Z][a-zA-Z]{2,}(?: [A-Z][a-zA-Z]{1,})+$/', $name)){
                    $msg = ['message'=>'Full name is in the wrong format! Exemple: Branko Pualic'];
                    http_response_code(200);
                    echo json_encode($msg);
                }
                if(!preg_match('/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/', $email)){
                    $msg = ['message'=>'Please use the full email format. Exemple: test@test.com'];
                    http_response_code(200);
                    echo json_encode($msg);
                }
                if(!preg_match('/^(?=.*[A-Z])(?=.*\d).{8,}$/', $password)){
                    $msg = ['message'=>'Password must be at least 8 characters long and must have at least one uppercase letter and one number!'];
                    http_response_code(200);
                    echo json_encode($msg);
                }

                $hashedPassword = password_hash($password, PASSWORD_ARGON2I);
                if(password_verify($password, $hashedPassword)){

                    $currentTime = time();
                    $extension = pathinfo($imageName, PATHINFO_EXTENSION);
                    $filenameWithoutExtension = pathinfo($image['name'], PATHINFO_FILENAME);
                    $newImageSrc = $filenameWithoutExtension . '_' .$currentTime .'.'. $extension;
    
                    $currentDate = date('Y-m-d H:i:s', time());

                    $imageAlt = "Profile picture of $name.";

                    $imageUpload = uploadImage($newImageSrc, $imageAlt);

                    $targetDirectory = '../../assets/img/users/';
                    $targetFile = $targetDirectory . basename($newImageSrc); 

                    move_uploaded_file($image['tmp_name'], $targetFile);




                    if($imageUpload){
                        $imageId = $connection->lastInsertId();

                        $regUser = registerUser($name, $hashedPassword, $email, $imageId, $currentDate);

                        if($regUser){
                            $connection->commit();
                            $msg = ['message'=>'Successfully registered! Click on login.'];
                            http_response_code(201);
                            echo json_encode($msg);
                        }
                        else{
                            $msg = ['message'=>'Error while trying to insert user.'];
                            http_response_code(200);
                            echo json_encode($msg);
                        }
                    }
                    else{
                        $msg = ['message'=>'Error while trying to upload image.'];
                        http_response_code(200);
                        echo json_encode($msg);
                    }
    
    
                    
                }
                else{
                    $msg = ['message'=>'Password is incorrect!'];
                    http_response_code(200);
                    echo json_encode($msg);
                }

                
            }
            else{
                $msg = ['message'=>'Error uploading the image. Please try again.'];
                    http_response_code(200);
                    echo json_encode($msg);
            }

        

        }
        catch(PDOException $e){
            $connection->rollBack();
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