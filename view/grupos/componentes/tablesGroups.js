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
                ['Victor Boroni','Comunicador'],
                ['Higor Barbosa','Analista']],
    }]
  }];

  this.init = function(){
    this.nomeProjeto = document.getElementsByTagName('h3')[0];
    this.grupos = $('.group-squad');
  }

  this.bind = function(){
    window.addEventListener('load',() => {this.createTable();})
  }

  this.createStru

  this.createTable = function(){
    var div = $('<div>', {
      class: 'mb-3 mr-4'
    });
    table = $('<table>')
    values = '<tr><th class="th-squad">Nome</th><th class="th-squad">Perfil</th></tr>'
    for(var i = 0; i < this.groups[0]['grupos'][0]['alunos'].length;i++){
      values+='<tr><td class="td-squad">'+this.groups[0]['grupos'][0]['alunos'][i][0]+'</td><td class="td-squad">'+this.groups[0]['grupos'][0]['alunos'][i][1]+'</td></tr>'
    }
    return this.grupos.append(div.append(table.append(values)));
  }
}

var tablesGroups = new TablesGroups();
tablesGroups.init();
tablesGroups.bind();
