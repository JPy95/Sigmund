<!doctype html>
<html lang="pt-br">
  <?php include_once('../head/head.php')?>
  <link rel="stylesheet" href="../grupos/style/grupos.css">
  <!-- Chart.js -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.8.0/Chart.min.js"></script>
  <body>
    <!-- Navbar -->
    <?php include_once('../navbar/navbar.php')?>
    <!-- Conteudo -->
    <div class='container col-10 mt-3'>
      <div class="title mb-3">
        <h3>Nome do Projeto</h3>
      </div>
      <div class="painel_grupo col-12">
        <div class='col-6'>
          <div class="group-squad mb-5">
            <?php include_once('../grupos/componentes/tablesGroups.php')?>
          </div>
        </div>
        <div class="col-6">
          <div>
            <h5>Perfil Comportamental da Turma</h5>
            <div class="pieGraph">
              <canvas class="pie"></canvas>
              <?php include_once('../grupos/componentes/pieGraph.php')?>
            </div>
          </div>
        </div>
      </div>
  </body>
</html>