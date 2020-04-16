function ValidarAluno() {
  this.init = function(){
    this.nomeAluno = document.getElementById('nomeAluno');
    this.erroNome = document.getElementById('erroNome');
    this.email = document.getElementById('emailAluno');
    this.erroEmail = document.getElementById('erroEmail');
    this.chaveProjeto = document.getElementById('chaveProjeto');
    this.erroProjeto = document.getElementById('erroProjeto');
    this.btn = document.getElementById('btn-subimt');
    this.alert = document.getElementsByClassName('alert');
  }

  this.bind = function(){
    this.btn.addEventListener('click',() => {this.validacaoForm();});
    this.nomeAluno.addEventListener('blur',() => {this.validacaoNome();});
    this.email.addEventListener('blur',() => {this.validacaoEmail();});
    this.chaveProjeto.addEventListener('blur',() => {this.validacaoProjeto();});
  }

  this.setLocalStorage = function() {
    localStorage.setItem('nomeAluno',this.nomeAluno.value);
    localStorage.setItem('emailAluno',this.email.value);
    localStorage.setItem('chaveProjeto',this.chaveProjeto.value);
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
    if (this.chaveProjeto.value == "") {
      this.chaveProjeto.style.borderColor = 'red';
      this.erroProjeto.innerHTML = 'Projeto não pode ser nulo.';
      this.erroProjeto.style.display = 'block';
    } else {
      this.chaveProjeto.removeAttribute("style");
      this.erroProjeto.style.display = 'none';
    }
  }

  this.validacaoForm = function(){
    const newLocal = 'http://127.0.0.1:5002/projects/';
    var request = newLocal+this.chaveProjeto.value;
    var _this = this;

    if(this.nomeAluno.value == "" || this.email.value == "" || this.chaveProjeto.value == ""){
      this.validacaoNome();
      this.validacaoEmail();
      this.validacaoProjeto();
    } else {
      const request = 'http://127.0.0.1:5002/login';
      var _this = this;
      $.ajax({
        data: 'email='+_this.email.value+'&chave='+_this.chaveProjeto.value,
        url: request,
        method: 'GET',
        success: function(result){
          if(result['success']){
            _this.setLocalStorage();
          } else {
            _this.alert[0].style.display = 'block'
            _this.alert[0].innerHTML = result['warning'];
          }
        }
      })
    }
  }
}

var validarAluno = new ValidarAluno();
validarAluno.init();
validarAluno.bind();