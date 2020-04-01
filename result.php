<!doctype html>
<html lang="pt-br">
  <head>
    <!-- Required meta tags -->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

    <!-- Bootstrap CSS -->
    <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
    <link rel="stylesheet" href="style/result/result.css">
  </head>
  <body>
    <div id='title'>
      <h4>Seu perfil é...</h4>
    </div>
    <div class="result">
      <div style="display: block;text-align: center;">
        <h2><?php
          if($_GET['perfil']==1){
            echo 'Analista';
          } elseif($_GET['perfil']==2){
            echo 'Comunicador';
          } elseif($_GET['perfil']==3){
            echo 'Executor';
          } else {
            echo 'Planejador';
          }
        ?></h2><br>
        <img id='perfil' src="img/perfil/<?php echo $_GET['perfil']?>.png">
      </div>
      <p>
        <?php
          if($_GET['perfil'] == 1){
            echo 'Você é uma pessoa detalhista e meticulosa, a pessoa analista é organizada, 
                  responsável e altamente conservadora, sendo hábil ao controlar processos e 
                  rotinas repetitivas.'
          } elseif($_GET['perfil'] == 2){
            echo 'Você é uma pessoa comunicativa e geralmente dotada de grande carisma e poder de persuasão 
                  e também uma pessoa sempre entusiasmada com projetos e novidades, tende a ser muito 
                  otimista e relaciona-se com facilidade.'
          } elseif($_GET['perfil'] == 3){
            echo 'Você é uma pessoa dotada de extrema autoconfiança, esse tipo de pessoa é dominante e em 
                  casos extremos, pode ser autoritária e ditatorial, aceita e se dá bem com desafios e 
                  dificuldades, possui senso de competitividade extremo e costuma ser corajoso em suas 
                  posturas e ao defender seus pontos de vista.'
          } else {
            echo 'Você é uma pessoa estável e paciente, de ritmo constante e alto grau de conservadorismo, 
                  dificilmente entra em pânico e tem uma pequena capacidade de improviso.'
          }
        ?>
      </p>
      <a href="quiz.php"><button class='btn-result-style'>Responder novamente?</button></a>
    </div>
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
  </body>
</html>