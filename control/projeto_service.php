<?php
$url  = 'http://127.0.0.1:5002/projects';
$ch   = curl_init($url);

$text = 'sigmund';
$chave = $text[random_int(0, 6)];
$chave = $chave.$text[random_int(0, 6)];
$chave = $chave.$text[random_int(0, 6)];
$chave = $chave.random_int(100000, 999999);

$data = json_encode(array(
    'nameProject' => $_POST['projeto'],
    'chave' => $chave
));

curl_setopt($ch,CURLOPT_POSTFIELDS,$data);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$result = json_decode(curl_exec($ch),true)[0];

echo $result['chave'];
?>
