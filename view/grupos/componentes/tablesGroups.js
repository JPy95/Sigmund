function TablesGroups(){

  this.init = function(){
    this.nomeProjeto = document.getElementsByTagName('h3')[0];
    this.grupos = $('.group-squad');
  }

  this.bind = function(){
    window.addEventListener('load',() => {this.getBase();})
  }
  
  this.createTable = function(base){
    if(base['grupos'].length%3==0){
      this.nomeProjeto.innerHTML = base['nomeProjeto'];
      var countRows = base['grupos'].length/3;
      var controler = 3;
      var j = 0;
      for(var i=0;i < countRows;i++){
        var divGroupTables = $('<div>', {class:'tables-group'});
        for(j; j < controler;j++){
          var divTable = $('<div>', {class: 'mb-3 mr-4'});
          divTable.append('<span>Grupo '+(j+1)+'<span>');
          table = $('<table>')
          values = '<tr><th class="th-squad">Nome</th><th class="th-squad">Perfil</th></tr>'
          for(var z = 0; z < base['grupos'][j]['alunos'].length;z++){
            values+='<tr><td class="td-squad">'+base['grupos'][j]['alunos'][z][0]+'</td><td class="td-squad">'+base['grupos'][j]['alunos'][z][1]+'</td></tr>'
          }
          this.grupos.append(divGroupTables.append(divTable.append(table.append(values))));
        }
        j = 3;
        controler *= 2;
      } 
    } else if(base['grupos'].length%3!=0){
      var countRows = parseInt(base['grupos'].length/3)+1;
      var controler = 3;
      var j = 0;
      for(var i=0;i < countRows;i++){
        var divGroupTables = $('<div>', {class:'tables-group'});
        for(j; j < controler;j++){
          var divTable = $('<div>', {class: 'mb-3 mr-4'});
          divTable.append('<span>Grupo '+(j+1)+'<span>');
          table = $('<table>')
          values = '<tr><th class="th-squad">Nome</th><th class="th-squad">Perfil</th></tr>'
          for(var z = 0; z < base['grupos'][j]['alunos'].length;z++){
            values+='<tr><td class="td-squad">'+base['grupos'][j]['alunos'][z][0]+'</td><td class="td-squad">'+base['grupos'][j]['alunos'][z][1]+'</td></tr>'
          }
          this.grupos.append(divGroupTables.append(divTable.append(table.append(values))));
        }
        j = 3;
        controler *= 2;
      }
    } else {
      var countRows = parseInt(base['grupos'].length/3)+1;
      var controler = base['grupos'].length;
      var j = 0;
      for(var i=0;i < countRows;i++){
        var divGroupTables = $('<div>', {class:'tables-group'});
        for(j; j < controler;j++){
          var divTable = $('<div>', {class: 'mb-3 mr-4'});
          divTable.append('<span>Grupo '+(j+1)+'<span>');
          table = $('<table>')
          values = '<tr><th class="th-squad">Nome</th><th class="th-squad">Perfil</th></tr>'
          for(var z = 0; z < base['grupos'][j]['alunos'].length;z++){
            values+='<tr><td class="td-squad">'+base['grupos'][j]['alunos'][z][0]+'</td><td class="td-squad">'+base['grupos'][j]['alunos'][z][1]+'</td></tr>'
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
      method: 'GET',
      success: function(result){
        //console.log(JSON.parse(result)['grupos'][0]['alunos'][0]);
        _this.createTable(JSON.parse(result));
      }
    });
  }
}

var tablesGroups = new TablesGroups();
tablesGroups.init();
tablesGroups.bind();
