<?php

$server = "localhost";
$user = "root";//"id15949507_root";
$password = "";//"root235711ROOT!";
$db = "cake";


$connection = mysqli_connect($server, $user, $password, $db);

$id = $_POST["id"];

$rtn = mysqli_fetch_array(mysqli_query($connection, "SELECT cart FROM user WHERE id='$id'"));
echo $rtn[0];

?>