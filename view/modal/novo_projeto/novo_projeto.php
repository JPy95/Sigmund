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
      <div class="modal-body">
        <div class="form-group">
          <label for="nome">Qual é o nome do Projeto?</label>
          <input id="newProjeto" type="name" class="form-control" id="nome" name='name' placeholder="Nome do projeto">
          <p id="erroNewProjeto">Nome do Projeto não pode ser nulo.</p>
        </div>
        <div class="form-group">
          <label for="alunos">Quantidade de alunos neste projeto?</label>
          <input id="alunos" type="number" class="form-control w-35" id="alunos" name='alunos' min='16'>
          <p id="erroAlunos">Quantidade de Alunos não pode ser nulo.</p>
        </div>
      </div>
      <!--Footer-->
      <div class="modal-footer">
        <button id="btn-subimt-projeto" type="submit" class="btn-sigmund-style" style="background-color: #930394; box-shadow: none; margin: 0; width: 60%;">Criar Projeto</button>
      </div>
    </div>
  </div>
</div>