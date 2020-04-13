<!doctype html>
<html lang="pt-br">
  <?php include_once('view/head/head.php')?>
  <link rel="stylesheet" href="view/index/style/index.css">
  <body>
    <?php include_once('view/modal/entrar_projeto/entrar_projeto.php')?>
    <?php include_once('view/modal/novo_projeto/novo_projeto.php')?>
    <?php include_once('view/navbar/navbar-index.php')?>
    <div class='logo-sigmund'>
      <img src="view/index/img/Logo.png">
    </div>
    <div id="web" class="container col-8 mt-5">
      <div class="col-12 services-group mt-5 pb-5">
        <img class="services-img" src="view/index/img/grupos.jpg">
        <div class='services-resume'>
          <h5>Formação de Grupos para Projetos Acadêmicos</h5>
          <p>
            Nesse tópico você pode criar seu projeto para que o Sigmund distribua os 
            alunos em grupos de maneira lógica de acordo com o perfil traçado no questionário comportamental!
          </p>
          <div style="width: 30%;">
            <a data-toggle="modal" data-target="#novoProjeto"><button class="btn-sigmund-style"style="background-color: #930394;">Criar Projeto</button></a>
          </div>
        </div>
      </div>
      <div class="col-12 services-group mt-5 pb-5">
        <div class='services-resume'>
          <h5>Entrar em Projetos Acadêmicos</h5>
          <p>
            Por aqui você pode acessar um projeto para então responder o questionário comportamental, 
            onde o Sigmund irá utilizar este questionário para te colocar em um grupo de pessoas que mais combinam com você.
          </p>
          <div style="width: 30%;">
            <a data-toggle="modal" data-target="#entrarProjeto"><button class="btn-sigmund-style"style="background-color: #410987;">Entrar em Projeto</button></a>
          </div>
        </div>
        <img class="services-img" src="view/index/img/alunos.png">
      </div>
      <div class="col-12 services-group mt-5 pb-5" style="border:none;">
        <img class="services-img" src="view/index/img/comportamental.jpg">
        <div class='services-resume'>
          <h5>Questionário Comportamental</h5>
          <p>
            É rápido!
            Respondendo essas perguntas você saberá logo em seguida qual o seu perfil comportamental predominante! Vamos lá?? 
          </p>
          <div style="width: 35%;">
          <a href="view/quiz/quiz.php"><button class='btn-sigmund-style '>Responder Questionário</button></a>
          </div>
        </div>
      </div>
    </div>
    <div id="mobile" class='btn-index'>
      <a data-toggle="modal" data-target="#novoProjeto"><button class="btn-sigmund-style"style="background-color: #930394;">Criar Projeto</button></a>
      <a data-toggle="modal" data-target="#entrarProjeto"><button class="btn-sigmund-style"style="background-color: #410987;">Entrar em Projeto</button></a>
      <a href="view/quiz/quiz.html"><button class='btn-sigmund-style '>Responder Questionário</button></a>
    </div>
    <!-- Optional JavaScript -->
    <!-- jQuery first, then Popper.js, then Bootstrap JS -->
    <script src="https://code.jquery.com/jquery-3.4.1.slim.min.js" integrity="sha384-J6qa4849blE2+poT4WnyKhv5vZF5SrPo0iEjwBvKU7imGFAV0wwj1yYfoRSJoZ+n" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/js/bootstrap.min.js" integrity="sha384-wfSDF2E50Y2D1uUdj0O3uMBJnjuUD4Ih7YwaYd1iqfktj0Uod8GCExl3Og8ifwB6" crossorigin="anonymous"></script>
  </body>
</html>