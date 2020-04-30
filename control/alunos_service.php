<?php
$urlAlunos  = 'http://localhost:5000/students';

$answers = explode(",", $_POST['answers']);
$answers = array_count_values($answers);
$maxAnswer = array_search(max($answers), $answers);

if($maxAnswer == 1){
    $profile = 'Analista';
} elseif($maxAnswer== 2){
    $profile = 'Comunicador';
} elseif($maxAnswer == 3){
    $profile = 'Planejador';
} else {
    $profile = 'Executor';
}

$dataAluno = json_encode(array(
    'nameStudent'   => strval($_POST['nomeAluno']),
    'email'         => $_POST['emailAluno'], 
    'chaveProjeto'  => $_POST['chaveProjeto'],
    'profile'       => $profile,
    'answers'       => explode(",", $_POST['answers'])
));
$ch = curl_init($urlAlunos);
curl_setopt($ch, CURLOPT_POSTFIELDS, $dataAluno);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$result = json_decode(curl_exec($ch));


$response = json_encode(array('profile' => $maxAnswer, 'aluno' => $result));

echo ($response);
?>