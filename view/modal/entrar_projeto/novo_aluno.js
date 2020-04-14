function ValidarAluno() {
  this.init = function(){
    this.nomeAluno = document.getElementById('nome');
    this.email = document.getElementById('email');
    this.projeto = document.getElementById('projeto');
    this.btn = document.getElementById('btn-subimt');
  }

  this.bind = function(){
    this.btn.addEventListener('click',() => {
      this.validarProjeto(); 
      //this.setLocalStorage()
         
    });
  }

  this.setLocalStorage = function() {
    localStorage.setItem('nomeAluno',this.nomeAluno.value);
    localStorage.setItem('email',this.email.value);
    localStorage.setItem('projeto',this.projeto.value);
    window.location.replace('view/quiz/quiz.php')
  }

  this.validarProjeto = function(){
    alert(this.projeto.value);
    var request = 'http://127.0.0.1:5002/projects/'+this.projeto.value;
    $.ajax({
      url: request,
      method: 'GET', // or GET
      success: function(result){
        alert(result);
        //window.location.replace("../result/result.php?perfil="+result);
      }
    });
  }
}

var validarAluno = new ValidarAluno();
validarAluno.init();
validarAluno.bind();