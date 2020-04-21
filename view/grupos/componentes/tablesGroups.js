function TablesGroups(){
  this.groups = [{
    nomeProjeto:'Teste de Grupos',
    grupos: [{
      num_grupo: 1,
      alunos: [ ['João Pedro','Executor'],
                ['Cleiton Ribeiro','Planejador'],
                ['Ricarte Elias','Executor'],
                ['Victor Boroni','Comunicador'],
                ['Higor Barbosa','Analista']],
    }, {
      num_grupo: 2,
      alunos: [ ['João Pedro','Executor'],
                ['Cleiton Ribeiro','Planejador'],
                ['Ricarte Elias','Executor'],
                ['Victor Boroni','Comunicador'],
                ['Higor Barbosa','Analista']],
    }, {
      num_grupo: 3,
      alunos: [ ['João Pedro','Executor'],
                ['Cleiton Ribeiro','Planejador'],
                ['Ricarte Elias','Executor'],
                ['Victor Boroni','Comunicador'],
                ['Higor Barbosa','Analista']],
    }, {
      num_grupo: 4,
      alunos: [ ['João Pedro','Executor'],
                ['Cleiton Ribeiro','Planejador'],
                ['Ricarte Elias','Executor'],
                ['Victor Boroni','Comunicador'],
                ['Higor Barbosa','Analista']],
    }, {
      num_grupo: 5,
      alunos: [ ['João Pedro','Executor'],
                ['Cleiton Ribeiro','Planejador'],
                ['Ricarte Elias','Executor'],
                ['Victor Boroni','Comunicador'],
                ['Higor Barbosa','Analista']],
    }, {
      num_grupo: 6,
      alunos: [ ['João Pedro','Executor'],
                ['Cleiton Ribeiro','Planejador'],
                ['Ricarte Elias','Executor'],
                ['Victor Boroni','Comunicador']],
    }]
  }];

  this.init = function(){
    this.nomeProjeto = document.getElementsByTagName('h3')[0];
    this.grupos = $('.group-squad');
  }

  this.bind = function(){
    window.addEventListener('load',() => {this.createTable();})
  }
  
  this.createTable = function(){
    if(this.groups[0]['grupos'].length%3==0){
      var countRows = this.groups[0]['grupos'].length/3;
      var controler = 3;
      var j = 0;
      for(var i=0;i < countRows;i++){
        var divGroupTables = $('<div>', {class:'tables-group'});
        for(j; j < controler;j++){
          var divTable = $('<div>', {class: 'mb-3 mr-4'});
          divTable.append('<span>Grupo '+(j+1)+'<span>');
          table = $('<table>')
          values = '<tr><th class="th-squad">Nome</th><th class="th-squad">Perfil</th></tr>'
          for(var z = 0; z < this.groups[0]['grupos'][j]['alunos'].length;z++){
            values+='<tr><td class="td-squad">'+this.groups[0]['grupos'][j]['alunos'][z][0]+'</td><td class="td-squad">'+this.groups[0]['grupos'][j]['alunos'][z][1]+'</td></tr>'
          }
          this.grupos.append(divGroupTables.append(divTable.append(table.append(values))));
        }
        j = 3;
        controler *= 2;
      } 
    } else if(this.groups[0]['grupos'].length%3!=0){
      var countRows = parseInt(this.groups[0]['grupos'].length/3)+1;
      var controler = 3;
      var j = 0;
      for(var i=0;i < countRows;i++){
        var divGroupTables = $('<div>', {class:'tables-group'});
        for(j; j < controler;j++){
          var divTable = $('<div>', {class: 'mb-3 mr-4'});
          divTable.append('<span>Grupo '+(j+1)+'<span>');
          table = $('<table>')
          values = '<tr><th class="th-squad">Nome</th><th class="th-squad">Perfil</th></tr>'
          for(var z = 0; z < this.groups[0]['grupos'][j]['alunos'].length;z++){
            values+='<tr><td class="td-squad">'+this.groups[0]['grupos'][j]['alunos'][z][0]+'</td><td class="td-squad">'+this.groups[0]['grupos'][j]['alunos'][z][1]+'</td></tr>'
          }
          this.grupos.append(divGroupTables.append(divTable.append(table.append(values))));
        }
        j = 3;
        controler *= 2;
      }
    } else {
      var countRows = parseInt(this.groups[0]['grupos'].length/3)+1;
      var controler = this.groups[0]['grupos'].length;
      var j = 0;
      for(var i=0;i < countRows;i++){
        var divGroupTables = $('<div>', {class:'tables-group'});
        for(j; j < controler;j++){
          var divTable = $('<div>', {class: 'mb-3 mr-4'});
          divTable.append('<span>Grupo '+(j+1)+'<span>');
          table = $('<table>')
          values = '<tr><th class="th-squad">Nome</th><th class="th-squad">Perfil</th></tr>'
          for(var z = 0; z < this.groups[0]['grupos'][j]['alunos'].length;z++){
            values+='<tr><td class="td-squad">'+this.groups[0]['grupos'][j]['alunos'][z][0]+'</td><td class="td-squad">'+this.groups[0]['grupos'][j]['alunos'][z][1]+'</td></tr>'
          }
          this.grupos.append(divGroupTables.append(divTable.append(table.append(values))));
        }
      }
    }
    return this.grupos;
  }
}

var tablesGroups = new TablesGroups();
tablesGroups.init();
tablesGroups.bind();
