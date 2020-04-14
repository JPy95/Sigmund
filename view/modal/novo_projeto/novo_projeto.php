<!--Modal-->
<div class="modal fade" id="novoProjeto" tabindex="-1" role ="dialog">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <!--Header-->
      <div class="modal-header">
        <h5 class="modal-title">Olá Professor</h5>
        <button type="button" class="close" data-dismiss="modal">
            <span>&times;</span>
        </button>
      </div>
      <!--Body-->
      <form action="control/projeto_service.php" method="post">
        <div class="modal-body">
          <div class="form-group">
            <label for="nome">Qual é o nome do Projeto?</label>
            <input type="name" class="form-control" id="nome" name='name' placeholder="Nome do projeto">
          </div>
          <div class="form-group">
            <label for="alunos">E qual a quantidade de alunos?</label>
            <input type="number" class="form-control w-50" id="alunos" name='alunos' min='4'>
          </div>
        </div>
        <!--Footer-->
        <div class="modal-footer">
          <button type="submit" class="btn-sigmund-style" style="background-color: #930394; box-shadow: none; margin: 0; width: 60%;">Criar Projeto</button>
        </div>
      </form>
    </div>
  </div>
</div>