function TablesGroups(){

  this.init = function(){
    this.nomeProjeto = document.getElementsByTagName('h3')[0];
    this.grupos = $('.group-squad');
  }

  this.bind = function(){
    window.addEventListener('load',() => {this.getBase();})
  }
  
  this.createTable = function(base){
    if(this.base[0]['grupos'].length%3==0){
      var countRows = this.base[0]['grupos'].length/3;
      var controler = 3;
      var j = 0;
      for(var i=0;i < countRows;i++){
        var divGroupTables = $('<div>', {class:'tables-group'});
        for(j; j < controler;j++){
          var divTable = $('<div>', {class: 'mb-3 mr-4'});
          divTable.append('<span>Grupo '+(j+1)+'<span>');
          table = $('<table>')
          values = '<tr><th class="th-squad">Nome</th><th class="th-squad">Perfil</th></tr>'
          for(var z = 0; z < this.base[0]['grupos'][j]['alunos'].length;z++){
            values+='<tr><td class="td-squad">'+this.base[0]['grupos'][j]['alunos'][z][0]+'</td><td class="td-squad">'+this.base[0]['grupos'][j]['alunos'][z][1]+'</td></tr>'
          }
          this.grupos.append(divGroupTables.append(divTable.append(table.append(values))));
        }
        j = 3;
        controler *= 2;
      } 
    } else if(this.base[0]['grupos'].length%3!=0){
      var countRows = parseInt(this.base[0]['grupos'].length/3)+1;
      var controler = 3;
      var j = 0;
      for(var i=0;i < countRows;i++){
        var divGroupTables = $('<div>', {class:'tables-group'});
        for(j; j < controler;j++){
          var divTable = $('<div>', {class: 'mb-3 mr-4'});
          divTable.append('<span>Grupo '+(j+1)+'<span>');
          table = $('<table>')
          values = '<tr><th class="th-squad">Nome</th><th class="th-squad">Perfil</th></tr>'
          for(var z = 0; z < this.base[0]['grupos'][j]['alunos'].length;z++){
            values+='<tr><td class="td-squad">'+this.base[0]['grupos'][j]['alunos'][z][0]+'</td><td class="td-squad">'+this.base[0]['grupos'][j]['alunos'][z][1]+'</td></tr>'
          }
          this.grupos.append(divGroupTables.append(divTable.append(table.append(values))));
        }
        j = 3;
        controler *= 2;
      }
    } else {
      var countRows = parseInt(this.base[0]['grupos'].length/3)+1;
      var controler = this.base[0]['grupos'].length;
      var j = 0;
      for(var i=0;i < countRows;i++){
        var divGroupTables = $('<div>', {class:'tables-group'});
        for(j; j < controler;j++){
          var divTable = $('<div>', {class: 'mb-3 mr-4'});
          divTable.append('<span>Grupo '+(j+1)+'<span>');
          table = $('<table>')
          values = '<tr><th class="th-squad">Nome</th><th class="th-squad">Perfil</th></tr>'
          for(var z = 0; z < this.base[0]['grupos'][j]['alunos'].length;z++){
            values+='<tr><td class="td-squad">'+this.base[0]['grupos'][j]['alunos'][z][0]+'</td><td class="td-squad">'+this.base[0]['grupos'][j]['alunos'][z][1]+'</td></tr>'
          }
          this.grupos.append(divGroupTables.append(divTable.append(table.append(values))));
        }
      }
    }
    return this.grupos;
  }

  this.getBase = function(){
    var chave = localStorage.getItem('chave');
    var _this = this;
    $.ajax({
      data: 'chave='+chave,
      url: 'http://projetosacademico.com.br:5000/grupos',
      method: 'GET', // or GET
      success: function(result){
        console.log(result);
        //_this.createTable(result);
      }
    });
  }
}

var tablesGroups = new TablesGroups();
tablesGroups.init();
tablesGroups.bind();
