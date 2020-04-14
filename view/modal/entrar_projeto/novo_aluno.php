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
      <div class="modal-body">
        <div class="form-group">
          <label for="nome">Qual o seu nome?</label>
          <input type="name" class="form-control w-75" id="nome" name='name' placeholder="Digite seu nome">
        </div>
        <div class="form-group">
          <label for="email">E o seu e-mail?</label>
          <input type="email" class="form-control w-75" id="email" name='email' placeholder="Digite seu email">
        </div>
        <div class="form-group">
          <label for="projeto">Qual o número do projeto que você irá participar?</label>
          <input type="number" class="form-control w-25" id="projeto" name='projeto'>
        </div>
      </div>
      <!--Footer-->
      <div class="modal-footer">
        <button onclick='setLocalStorage()' type="submit" class="btn-sigmund-style" style="background-color: #410987; box-shadow: none; margin: 0; width: 60%;">Ir para questionário</button>
      </div>
    </div>
  </div>
</div>
<script>
  function setLocalStorage() {
    localStorage.setItem('nomeAluno',document.getElementById('nome').value);
    localStorage.setItem('email',document.getElementById('email').value);
    localStorage.setItem('projeto',document.getElementById('projeto').value);
    window.location.replace('view/quiz/quiz.php')
  }
</script>