<?php
$url  = 'http://127.0.0.1:5002/projects';
$data = json_encode(array('nameProject' => $_POST['name'],'qtdAlunos'=> $_POST['alunos']));
$ch   = curl_init($url);

curl_setopt($ch,CURLOPT_POSTFIELDS,$data);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);

$result = json_decode(curl_exec($ch),true)[0];

header("Location: ../view/qr_code/qr_code.php?projeto=".$result['idprojeto']."&nome=".$result['nomeprojeto'].'&');
?>

