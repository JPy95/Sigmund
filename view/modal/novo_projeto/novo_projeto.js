function ValidarProjeto() {

  this.init = function(){
    this.newProjeto = document.getElementById('newProjeto');
    this.erroNewProjeto = document.getElementById('erroNewProjeto');
    this.alunos = document.getElementById('alunos');
    this.erroAlunos = document.getElementById('erroAlunos');
    this.btn = document.getElementById('btn-subimt-projeto');
  }

  this.bind = function(){
    this.btn.addEventListener('click',() => {this.validacaoForm();});
    this.newProjeto.addEventListener('blur',() => {this.validacaoProjeto();});
    this.alunos.addEventListener('blur',() => {this.validacaoAlunos();});
  }

  this.setLocalStorage = function(chave) {
    localStorage.setItem('nomeProjeto',this.newProjeto.value);
    localStorage.setItem('alunosProjeto',this.alunos.value);
    localStorage.setItem('chave',chave);
    window.location.replace('view/qr_code/qr_code.php?projeto='+chave);
  }

  this.validacaoProjeto = function() {
    if (this.newProjeto.value == "") {
      this.newProjeto.style.borderColor = 'red';
      this.erroNewProjeto.style.display = 'block';
    } else {
      this.newProjeto.removeAttribute("style");
      this.erroNewProjeto.style.display = 'none';
    }
  }

  this.validacaoAlunos = function() {
    if (this.alunos.value == "") {
      this.alunos.style.borderColor = 'red';
      this.erroAlunos.style.display = 'block';
      result = false;
    } else {
      this.alunos.removeAttribute("style");
      this.erroAlunos.style.display = 'none';
    }
  }

  this.validacaoForm = function(){
    var _this = this;
    if(this.newProjeto.value == "" || this.alunos.value == ""){
      this.validacaoProjeto();
      this.validacaoAlunos();
    } else {
      $.ajax({
        data: 'projeto='+_this.newProjeto.value+'&alunos='+_this.alunos.value,
        url: 'control/projeto_service.php',
        method: 'POST', // or GET
        success: function(result){
          _this.setLocalStorage(result);
        }
      });
    }
  }
}

var validarProjeto = new ValidarProjeto();
validarProjeto.init();
validarProjeto.bind();