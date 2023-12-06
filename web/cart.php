<?php

$server = "localhost";
$user = "root";//"id15949507_root";
$password = "";//"root235711ROOT!";
$db = "cake";


$connection = mysqli_connect($server, $user, $password, $db);

$cart = $_POST["cart"];
$id = $_POST["id"];


mysqli_query($connection, "UPDATE user SET cart='$cart' WHERE id='$id'");

?>