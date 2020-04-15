function ValidarAluno() {
  this.init = function(){
    this.nomeAluno = document.getElementById('nome');
    this.erroNome = document.getElementById('erroNome');
    this.email = document.getElementById('email');
    this.erroEmail = document.getElementById('erroEmail');
    this.projeto = document.getElementById('projeto');
    this.erroProjeto = document.getElementById('erroProjeto');
    this.btn = document.getElementById('btn-subimt');
  }

  this.bind = function(){
    this.btn.addEventListener('click',() => {this.validacaoForm();});
    this.nomeAluno.addEventListener('blur',() => {this.validacaoNome();});
    this.email.addEventListener('blur',() => {this.validacaoEmail();});
    this.projeto.addEventListener('blur',() => {this.validacaoProjeto();});
  }

  this.setLocalStorage = function() {
    localStorage.setItem('nomeAluno',this.nomeAluno.value);
    localStorage.setItem('email',this.email.value);
    localStorage.setItem('projeto',this.projeto.value);
    window.location.replace('view/quiz/quiz.php');
  }

  this.validacaoNome = function() {
    if (this.nomeAluno.value == "") {
      this.nomeAluno.style.borderColor = 'red';
      this.erroNome.style.display = 'block';
    } else {
      this.nomeAluno.removeAttribute("style");
      this.erroNome.style.display = 'none';
    }
  }

  this.validacaoEmail = function() {
    if (this.email.value == "") {
      this.email.style.borderColor = 'red';
      this.erroEmail.style.display = 'block';
      result = false;
    } else {
      this.email.removeAttribute("style");
      this.erroEmail.style.display = 'none';
    }
  }

  this.validacaoProjeto = function() {
    if (this.projeto.value == "") {
      this.projeto.style.borderColor = 'red';
      this.erroProjeto.innerHTML = 'Projeto não pode ser nulo.';
      this.erroProjeto.style.display = 'block';
    } else {
      this.projeto.removeAttribute("style");
      this.erroProjeto.style.display = 'none';
    }
  }

  this.validacaoForm = function(){
    var request = 'http://127.0.0.1:5002/projects/'+this.projeto.value;
    var _this = this;

    if(this.nomeAluno.value == "" || this.email.value == "" || this.projeto.value == ""){
      this.validacaoNome();
      this.validacaoEmail();
      this.validacaoProjeto();
    } else {
      $.ajax({
        url: request,
        method: 'GET', // or GET
        success: function(result){
          var req = JSON.parse(result);
          if(req['success']){
            console.log('asdf');
            _this.setLocalStorage();
          } else {
            _this.projeto.style.borderColor = 'red';
            _this.erroProjeto.innerHTML = 'Este projeto não exite.';
            _this.erroProjeto.style.display = 'block';
          }
        }
      });
    }
  }
}

var validarAluno = new ValidarAluno();
validarAluno.init();
validarAluno.bind();