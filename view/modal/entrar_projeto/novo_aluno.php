<!--Modal-->
<div class="modal fade" id="entrarProjeto" tabindex="-1" role ="dialog">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <!--Header-->
      <div class="modal-header">
        <h5 class="modal-title">Olá Aluno</h5>
        <button type="button" class="close" data-dismiss="modal">
            <span>&times;</span>
        </button>
      </div>
      <!--Body-->
      <div class="alert alert-danger" role="alert">
        Você já está participando deste grupo!
      </div>
      <div class="modal-body">
        <div class="form-group">
          <label for="nomeAluno">Qual o seu nome?</label>
          <input type="nomeAluno" class="form-control w-75" id="nomeAluno" name='name' placeholder="Digite seu nome">
          <p id="erroNome">Nome não pode ser nulo.</p>
        </div>
        <div class="form-group">
          <label for="emailAluno">E o seu e-mail?</label>
          <input type="email" class="form-control w-75" id="emailAluno" name='email' placeholder="Digite seu email">
          <p id="erroEmail">E-mail não pode ser nulo.</p>
        </div>
        <div class="form-group">
          <label for="chaveProjeto">Qual a chave do projeto que você irá participar?</label>
          <input type="text" class="form-control w-25" id="chaveProjeto" name='projeto'>
          <p id="erroProjeto"></p>
        </div>
      </div>
      <!--Footer-->
      <div class="modal-footer">
        <button id="btn-subimt" type="submit" class="btn-sigmund-style" style="background-color: #410987; box-shadow: none; margin: 0; width: 60%;">Ir para questionário</button>
      </div>
    </div>
  </div>
</div>
