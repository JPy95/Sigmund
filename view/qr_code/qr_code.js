function QrCode(){

  this.init = function(){
    this.projeto = document.getElementsByTagName('h3')[0];
    this.alunos = document.getElementById('aluno');
    this.url = 'http://projetosacademico.com.br:5000/projects/'+localStorage.getItem('chave');
  }

  this.bind = function(){
    window.addEventListener('load',() => {
      this.loadNameProject();
      this.checkAlunos();
    })
  }

  this.loadNameProject = function(){
    this.projeto.innerHTML = localStorage.getItem('nomeProjeto');
    this.alunos.innerHTML = localStorage.getItem('alunosProjeto');
  }

  this.checkAlunos = function(){
    var totalAlunos = localStorage.getItem('alunosProjeto');
    var _this = this;
    setInterval(function(){
      $.ajax({
        url: _this.url,
        method: 'GET', // or GET
        success: function(result){
          console.log(result);
          var req = JSON.parse(result);
          if(req[1]['success']){
            console.log(req);
            qtdAlunos = totalAlunos-req[0]['qtdalunos'];
            if(qtdAlunos == 0){
              alert('Todos Responderam');
            } else {
              _this.alunos.innerHTML = qtdAlunos;
            }
          } 
        }
      });
    },5000)
  }
}

var qrCode = new QrCode();
qrCode.init();
qrCode.bind();