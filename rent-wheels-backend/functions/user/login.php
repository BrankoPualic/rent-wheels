<?php
header("Access-Control-Allow-Origin: http://localhost:4200");
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
    if($_SERVER['REQUEST_METHOD'] == 'POST'){
        include '../functions.php';
        include_once '../../config/config.php';
        require_once '../../vendor/autoload.php';
        header('Content-type: application/json');
        try{
            $json = file_get_contents("php://input");
            $data = json_decode($json, true);

            $email = $data['email'];
            $password = $data['password'];

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

            $storedPassword = getUserPassword($email);
            if(password_verify($password, $storedPassword->user_password)){
                
                $user = getUserOnLogin($email);

                if($user){
                    $payload = [
                        'user_id' => $user->user_id,
                        'name' => $user->full_name,
                        'email' => $user->email,
                        'role' => $user->role,
                        'image_src' => $user->image_src,
                        'image_alt' => $user->image_alt,
                        'reg_date' => $user->register_date
                    ];

                    $jwtToken = \Firebase\JWT\JWT::encode($payload, JWT_SECRET_KEY, 'HS256');


                    header('Authorization: Bearer ' . $jwtToken);


                    http_response_code(200);
                    echo json_encode([
                        'message'=>'Login successful',
                        'token' => $jwtToken
                    ]);
                }
                else{
                    $msg = ['message'=>'User not found!'];
                    http_response_code(200);
                    echo json_encode($msg);
                }
            }
            else{
                http_response_code(200);
                echo json_encode(['message'=>'No match for given password!']);
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