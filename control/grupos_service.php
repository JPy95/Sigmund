<?php
$url  = 'http://127.0.0.1:5000/grupos';
$ch   = curl_init($url);

curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$result = json_decode(curl_exec($ch),true);

var_dump($result);
?>