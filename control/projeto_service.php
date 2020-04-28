<?php
$url  = 'http://projetosacademico.com.br:5000/projects';
$ch   = curl_init($url);

$text = 'sigmund';
$chave = $text[random_int(0, 6)];
$chave = $chave.$text[random_int(0, 6)];
$chave = $chave.$text[random_int(0, 6)];
$chave = $chave.random_int(100000, 999999);

$data = json_encode(array(
    'nameProject' => $_POST['projeto'],
    'chave' => $chave,
    'qtdAlunos' => $_POST['alunos']
));

curl_setopt($ch, CURLOPT_POSTFIELDS,$data);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_exec($ch);

echo $chave;
?>
