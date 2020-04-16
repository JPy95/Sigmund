<?php
$urlAlunos  = 'http://127.0.0.1:5002/students';
$urlQuiz  = 'http://127.0.0.1:5002/quiz';
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
    'nameStudent' => $_POST['nomeAluno'],
    'email' => $_POST['email'], 
    'chaveProjeto' => $_POST['chaveProjeto'],
    'profile' => $profile
));
$ch = curl_init($urlAlunos);
curl_setopt($ch, CURLOPT_POSTFIELDS, $dataAluno);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
$result = json_decode(curl_exec($ch),true)[0];

$dataQuiz = json_encode(array(
    'respostas' => explode(",", $_POST['answers']),
    'idaluno'   => $result["idaluno"]
));
$ch = curl_init($urlQuiz);
curl_setopt($ch, CURLOPT_POSTFIELDS, $dataQuiz);
curl_setopt($ch, CURLOPT_HTTPHEADER, array('Content-Type:application/json'));
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_exec($ch);

echo($maxAnswer);
?>

