<?php
    include '../../config/connection.php';
    // function getRecommendedCars(){

    //     global $connection;
        
    //     $qst = 'SELECT c.*, ci.image_src, ci.image_alt
    //     FROM car c 
    //     JOIN (
    //         SELECT car_id, MIN(image_src) AS image_src, image_alt
    //         FROM car_image
    //         GROUP BY car_id
    //     ) ci ON c.car_id = ci.car_id 
    //     WHERE c.recommended = 1';


    //     $data = $connection->query($qst)->fetchAll();
    //     return $data;
    // }

    function sendMessage($username, $email, $msg, $date){
        global $connection;

        $qst = 'INSERT into `message`(user_name, email, message_text, message_date) VALUES(:u, :e, :m, :d)';
        $insert = $connection->prepare($qst);
        $insert->bindParam(':u', $username);
        $insert->bindParam(':e', $email);
        $insert->bindParam(':m', $msg);
        $insert->bindParam(':d', $date);

        $status = $insert->execute();
        return $status;
    }

    function emailExist($email){
        global $connection;

        $qst = 'SELECT * FROM news_subscription WHERE email = :e';
        $select = $connection->prepare($qst);
        $select->bindParam(':e', $email);
        $select->execute();
        $data = $select->fetch();

        return $data;
    }

    function subscription($email, $date){
        global $connection;

        $qst = 'INSERT into news_subscription(email, sub_date) VALUES(:e, :d)';
        $insert = $connection->prepare($qst);
        $insert->bindParam(':e',$email);
        $insert->bindParam(':d',$date);
        $status = $insert->execute();

        return $status;
    }

    function getCarsType(){
        global $connection;

        $qst = 'SELECT * FROM car_type ORDER BY type_name ASC';
        $select = $connection->query($qst)->fetchAll();
        return $select;
    }

    function getLocations(){
        global $connection;

        $qst = 'SELECT * FROM `location` ORDER BY city ASC';
        $select = $connection->query($qst)->fetchAll();
        return $select;
    }

    function uploadImage($src, $alt){
        global $connection;

        $qst = 'INSERT into user_image(image_src, image_alt) VALUES(:s, :a)';
        $insert = $connection->prepare($qst);
        $insert->bindParam(':s', $src);
        $insert->bindParam(':a', $alt);
        $status = $insert->execute();

        return $status;
    }

    function registerUser($name, $hashedPassword, $email, $imageId, $currentDate){
        global $connection;

        $qst = 'INSERT into user(full_name, email, user_password, role_id, user_image_id, register_date) VALUES(:n, :e, :p, 2, :img, :d)';
        $insert = $connection->prepare($qst);
        $insert->bindParam(':n', $name);
        $insert->bindParam(':e', $email);
        $insert->bindParam(':p', $hashedPassword);
        $insert->bindParam(':img', $imageId);
        $insert->bindParam(':d', $currentDate);
        $status = $insert->execute();

        return $status;
    }

    function getUserOnLogin($email){
        global $connection;

        $qst = 'SELECT * FROM user u JOIN user_image ui ON u.user_image_id = ui.user_image_id JOIN `role` r ON u.role_id = r.role_id WHERE u.email = :e';
        $select = $connection->prepare($qst);
        $select->bindParam(':e', $email);
        $select->execute();
        $user = $select->fetch();

        return $user;
    }

    function getUserPassword($email){
        global $connection;

        $qst = 'SELECT user_password FROM user WHERE email = :e';
        $select = $connection->prepare($qst);
        $select->bindParam(':e', $email);
        $select->execute();
        $user = $select->fetch();

        return $user;
    }

    function getHomePageReviews(){
        global $connection;

        $qst = "SELECT r.*, COUNT(r.rating_id) AS reviewCount, u.user_id, ui.image_src AS userImageSrc, ui.image_alt AS userImageAlt, u.register_date, u.full_name
          FROM rating r
          JOIN user u ON r.user_id = u.user_id
          JOIN user_image ui ON u.user_image_id = ui.user_image_id
          GROUP BY r.user_id
          ORDER BY r.rating DESC";

        $select = $connection->query($qst)->fetchAll();
        return $select;
    }

    function getMinMaxPrice(){
        global $connection;

        $qst = 'SELECT MAX(price) AS maxPrice, MIN(price) AS minPrice FROM car';

        $select = $connection->query($qst)->fetch();
        return $select;

    }

    function getCarList($search, $brandId, $typeId, $year, $locationId, $minPrice, $maxPrice, $transmission, $new, $recommended){
        global $connection;
        if($minPrice === 0){
            $minPrice = $connection->query('SELECT MIN(price) FROM car')->fetchColumn();
        }
        if($maxPrice === 0){
            $maxPrice = $connection->query('SELECT MAX(price) FROM car')->fetchColumn();
        }
        $new = $new ? 1 : 0;
        $recommended = $recommended ? 1 : 0;

        $qst = 'SELECT c.*, ci.image_src AS carImageSrc, ci.image_alt AS carImageAlt, t.type_name,
        b.brand_name, l.city, trans.transmission_type
        FROM car c
        JOIN (
          SELECT car_id, MIN(image_id) AS min_image_id
          FROM car_image
          WHERE image_alt LIKE "%1"
          GROUP BY car_id
        ) AS min_images ON c.car_id = min_images.car_id
        JOIN car_image ci ON c.car_id = ci.car_id AND min_images.min_image_id = ci.image_id
        JOIN car_type t ON t.type_id = c.type_id
        JOIN brand b ON b.brand_id = c.brand_id
        JOIN `location` l ON l.location_id = c.location_id
        JOIN transmission trans ON trans.transmission_id = c.transmission_id
        WHERE (c.heading LIKE CONCAT("%", :search, "%") OR :search = "")
        AND (c.brand_id = :b OR :b = 0)
        AND (c.type_id = :t OR :t = 0)
        AND (c.year = :y OR :y = 0)
        AND (c.location_id = :l OR :l = 0)
        AND (c.price BETWEEN :min AND :max)
        AND (c.transmission_id = :transmission OR :transmission = 0)
        AND (c.new_car = :new OR :new = 0)
        AND (c.recommended = :rec OR :rec = 0)';


        $select = $connection->prepare($qst);
        $select->bindParam(':search', $search);
        $select->bindParam(':b', $brandId);
        $select->bindParam(':t', $typeId);
        $select->bindParam(':y', $year);
        $select->bindParam(':l', $locationId);
        $select->bindParam(':min', $minPrice);
        $select->bindParam(':max', $maxPrice);
        $select->bindParam(':transmission', $transmission);
        $select->bindParam(':new', $new);
        $select->bindParam(':rec', $recommended);

        $select->execute();
        $cars = $select->fetchAll();
        return $cars;
    
    }

    function getBrands(){
        global $connection;

        $qst = 'SELECT * FROM `brand` ORDER BY brand_name ASC';
        $select = $connection->query($qst)->fetchAll();
        return $select;
    }

    function getYears(){
        global $connection;

        $qst = 'SELECT DISTINCT `year` FROM car ORDER BY `year` ASC';
        $select = $connection->query($qst)->fetchAll();
        return $select;
    }

    function getCarById($id){
        global $connection;

        $qst = 'SELECT c.*, l.city, ct. type_name, b.brand_name, t.transmission_type
        FROM car c JOIN `location` l ON c.location_id = l.location_id
        JOIN car_type ct ON c.type_id = ct.type_id
        JOIN brand b ON c.brand_id = b.brand_id
        JOIN transmission t ON c.transmission_id = t.transmission_id
        WHERE car_id = :id';
        $select = $connection->prepare($qst);
        $select->bindParam(':id', $id);
        $select->execute();
        $car = $select->fetch();

        return $car;
    }

    function getCarImages($id){
        global $connection;

        $qst = 'SELECT * FROM car_image WHERE car_id = :id';
        $select = $connection->prepare($qst);
        $select->bindParam(':id', $id);
        $select->execute();
        $images = $select->fetchAll();

        return $images;
    }

    function getSameTypeCars($car_id){
        global $connection;

        $qst = 'SELECT c.*, ci.image_src, ci.image_alt 
        FROM car c
        JOIN (
            SELECT car_id, MIN(image_src) AS image_src, image_alt
            FROM car_image
            GROUP BY car_id
        ) ci ON c.car_id = ci.car_id
        WHERE c.type_id = (
            SELECT type_id
            FROM car
            WHERE car_id = :cId
        ) AND c.car_id != :cId
        ORDER BY c.car_id DESC
        LIMIT 4';

        $select = $connection->prepare($qst);
        $select->bindParam(':id', $type_id);
        $select->bindParam(':cId', $car_id);
        $select->execute();
        $cars = $select->fetchAll();

        return $cars;
    
    }

    function postReview($user, $car, $rating, $review, $date){
        global $connection;

        $qst = 'INSERT INTO rating(user_id, car_id, rating, review, rating_date) 
        VALUES(:u, :c, :r, :t, :d)';
        $insert = $connection->prepare($qst);
        $insert->bindParam(':u',$user);
        $insert->bindParam(':c', $car);
        $insert->bindParam(':r', $rating);
        $insert->bindParam(':t', $review);
        $insert->bindParam(':d', $date);

        $state = $insert->execute();
        return $state;
    }

    function rentACar($user_id, $car_id, $total, $date_from, $date_to){
        global $connection;

        $qst = 'INSERT INTO rental(user_id, car_id, `start_date`, `end_date`, total_cost)
        VALUES(:u, :c, :s, :e, :t)';

        $insert = $connection->prepare($qst);
        $insert->bindParam(':u', $user_id);
        $insert->bindParam(':c', $car_id);
        $insert->bindParam(':s', $date_from);
        $insert->bindParam(':e', $date_to);
        $insert->bindParam(':t', $total);

        $status = $insert->execute();
        return $status;
    }

    function getUserProfile($id){
        global $connection;

        $qst = 'SELECT u.full_name, u.email, u.register_date, ui.image_src, 
        ui.image_alt, COUNT(r.rating_id) AS reviews, AVG(r.rating) AS avg_rating
        FROM user u JOIN user_image ui ON u.user_image_id = ui.user_image_id
        JOIN rating r ON u.user_id = r.user_id
        WHERE u.user_id = :id';
        
        $select = $connection->prepare($qst);
        $select->bindParam(':id', $id);
        $select->execute();

        $user = $select->fetch();
        return $user;
    }

    function getUserLatestRental($id){
        global $connection;

        $qst = 'SELECT r.*, c.heading, ci.image_src, ci.image_alt, l.city
        FROM rental r JOIN car c ON r.car_id = c.car_id
        JOIN (
          SELECT car_id, MIN(image_id) AS min_image_id
          FROM car_image
          WHERE image_alt LIKE "%1"
          GROUP BY car_id
        ) AS min_images ON r.car_id = min_images.car_id
        JOIN car_image ci ON r.car_id = ci.car_id AND min_images.min_image_id = ci.image_id
        JOIN `location` l ON c.location_id = l.location_id
        WHERE r.user_id = :id
        ORDER BY r.start_date DESC
        LIMIT 1';

        $select = $connection->prepare($qst);
        $select->bindParam(':id', $id);
        $select->execute();

        $rental = $select->fetch();

        return $rental;

    }

    function getUserReviews($id){
        global $connection;

        $qst = 'SELECT r.rating_id, r.rating, r.rating_date, r.review, ci.image_src, ci.image_alt, c.heading
        FROM rating r JOIN car c ON r.car_id = c.car_id
        JOIN (
          SELECT car_id, MIN(image_id) AS min_image_id
          FROM car_image
          WHERE image_alt LIKE "%1"
          GROUP BY car_id
        ) AS min_images ON r.car_id = min_images.car_id
        JOIN car_image ci ON r.car_id = ci.car_id AND min_images.min_image_id = ci.image_id
        WHERE r.user_id = :id
        ORDER BY r.rating_id DESC';

        $select = $connection->prepare($qst);
        $select->bindParam(':id',$id);
        $select->execute();

        $reviews = $select->fetchAll();

        return $reviews;
    }
    
    function getUserRentals($id){
        global $connection;

        $qst = 'SELECT r.*, ci.image_src, ci.image_alt, c.heading, l.city
        FROM rental r JOIN car c ON r.car_id = c.car_id
        JOIN (
          SELECT car_id, MIN(image_id) AS min_image_id
          FROM car_image
          WHERE image_alt LIKE "%1"
          GROUP BY car_id
        ) AS min_images ON r.car_id = min_images.car_id
        JOIN car_image ci ON r.car_id = ci.car_id AND min_images.min_image_id = ci.image_id
        JOIN `location` l ON c.location_id = l.location_id
        WHERE r.user_id = :id
        ORDER BY r.rental_id DESC';

        $select = $connection->prepare($qst);
        $select->bindParam(':id',$id);
        $select->execute();

        $rentals = $select->fetchAll();

        return $rentals;
    }

    function getCarReviews($id){
        global $connection;

        $qst = 'SELECT r.*, ui.image_src, ui.image_alt, u.full_name, u.register_date, u.user_id
        FROM rating r
        JOIN user u ON r.user_id = u.user_id
        JOIN user_image ui ON u.user_image_id = ui.user_image_id
        WHERE r.car_id = :id
        GROUP BY r.user_id
        ORDER BY r.rating DESC';
        $select = $connection->prepare($qst);
        $select->bindParam(':id', $id);
        $select->execute();
        $reviews = $select->fetchAll();


        $qst2 = 'SELECT (SUM(rating)/COUNT(car_id)) AS avg_rating FROM rating WHERE car_id = :id';
        $select = $connection->prepare($qst2);
        $select->bindParam(':id', $id);
        $select->execute();
        $avg = $select->fetch();

        $data = ['reviews'=>$reviews, 'avg'=>$avg];

        return $data;
    }
?>
