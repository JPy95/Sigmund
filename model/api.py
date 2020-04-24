#!/usr/bin/env python
# -*- coding: utf-8 -*- 

from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from flask_cors import CORS
from datetime import datetime
from sqlalchemy import create_engine
from json import dumps
import pandas as pd
import numpy as np
import ml #Algoritmo de Clusterizacao

model = ml.SigmindMl()
db_connect = create_engine('postgresql://sigmund:Unibh2020@db1-sigmund.cdrfdxumcxao.us-east-1.rds.amazonaws.com:5432/sigmund')
app = Flask(__name__)
api = Api(app)
CORS(app)


@app.route("/")
class Projects(Resource):

  conn,nameProject,date,idProjeto,qtdAlunos,chave=None,None,None,None,None,None
  def __init__(self):
    self.conn = db_connect.connect()
    self.nameProject = request.json['nameProject'].encode('utf-8')
    self.chave = request.json['chave']
    self.qtdAlunos = request.json['qtdAlunos']
    self.date = str(datetime.now())[:str(datetime.now()).find('.')]

  def post(self):
    self.conn.execute("insert into sigmundi.projetos values('{0}','{1}',DEFAULT,'{2}',{3})".format(self.date,self.chave,self.nameProject,self.qtdAlunos))
    return self.get()

  def get(self):
    query = self.conn.execute("select chave from sigmundi.projetos where nomeProjeto = '{0}' and date_trunc('second',datainclusao) = '{1}' ".format(self.nameProject,self.date))
    result = [dict(zip(tuple(query.keys()), i)) for i in query.cursor]
    return jsonify(result)

class ProjectsId(Resource):
  def get(self,chave):
    if(self.check_project(chave) == 0):
      result = {'success':False}
    else:
      conn = db_connect.connect()
      query = conn.execute("select count(idaluno) as qtdAlunos from sigmundi.grupos a inner join sigmundi.projetos b on b.idprojeto = a.idprojeto where b.chave = '{}'".format(chave))
      result = [dict(zip(tuple(query.keys()), i)) for i in query.cursor]
      result.append({'success':True})
    return dumps(result)

  def check_project(self, chave):
    '''
      Verifica se o projeto existe
    '''
    conn = db_connect.connect()
    query = conn.execute("select * from sigmundi.projetos where chave = '{}'".format(chave))
    return query.cursor.rowcount 
  
class Students(Resource):

  conn,nameStudent,email,chaveProjeto,profile,ansewrs = None,None,None,None,None,None
  
  def __init__(self):
    self.conn = db_connect.connect()
    self.nameStudent = request.json['nameStudent'].encode('utf-8')
    self.email = request.json['email'].encode('utf-8')
    self.chaveProjeto = request.json['chaveProjeto']
    self.perfil = request.json['profile'].encode('utf-8')
    self.ansewrs = request.json['ansewrs']

  def post(self):
    if(self.check_student(self.email) == 0):
      self.conn.execute("insert into sigmundi.alunos values(now(), DEFAULT,'{0}','{1}')".format(self.nameStudent,self.email))
      self.get()
    else:
      return self.get()

  def check_student(self,email):
    '''
      Verifica se o aluno ja esta cadastrado no banco;
      returno 0 ou retorno > 0;
    '''
    query = self.conn.execute("select * from sigmundi.alunos where email = '{0}' ".format(self.email))
    return query.cursor.rowcount

  def get(self):
    if(self.checkSizeGrupo()):
      query = self.conn.execute("select idaluno from sigmundi.alunos where email = '{}' ".format(self.email))
      idAluno = [dict(zip(tuple(query.keys()), i)) for i in query.cursor]
      self.insertAlunoTableGrupos(idAluno[0]['idaluno'])
      self.insertAnsewrsTableQuiz(idAluno[0]['idaluno'])
      result = {'success':True} 
    else:
      result = {'success':False} 
    return dumps(result)    

  def insertAlunoTableGrupos(self,idAluno):
    query = self.conn.execute("select idprojeto from sigmundi.projetos where chave = '{}' ".format(self.chaveProjeto))
    idProjeto = [dict(zip(tuple(query.keys()), i)) for i in query.cursor]
    self.conn.execute("insert into sigmundi.grupos values(now(),{0},null,{1},'{2}','{3}')".format(idProjeto[0]['idprojeto'], idAluno,self.nameStudent,self.perfil)) 

  def insertAnsewrsTableQuiz(self,idAluno):
    self.conn.execute('insert into sigmundi.questionarios values(now(),DEFAULT,{0},{1})'.format(idAluno,','.join(self.ansewrs)))

  def checkSizeGrupo(self):
    query = '''
            select 
              a.qtdalunos as qtdAlunosP,
              count(b.idaluno) as qtdAlunosG
            from sigmundi.projetos a
            inner join sigmundi.grupos b on b.idprojeto = a.idprojeto
            where chave = '{}'
            group by 1'''.format(self.chaveProjeto)
    exect = self.conn.execute(query)
    base = [dict(zip(tuple(exect.keys()), i)) for i in exect.cursor][0]

    if(base['qtdalunosp'] != base['qtdalunosg']):
      result = True
    else:
      result = False
    return result

class Login(Resource):

  conn, email, chave = None,None,None

  def __init__(self):
    self.conn = db_connect.connect()
    self.email =  request.args.get('email')
    self.chave = request.args.get('chave')

  def get(self):
    if(self.checkGruop() == 0):
      resp = {'warning': 'Este projeto não existe.'}
      resp['success'] = False
    else:
      resp = self.checkAluno()
    return resp

  def checkGruop(self):
    query = self.conn.execute("select * from sigmundi.projetos where chave = '{}'".format(self.chave))
    result = [dict(zip(tuple(query.keys()), i)) for i in query.cursor]
    return len(result)

  def checkAluno(self):
    query = self.conn.execute('''select 
                                    a.chave,
                                    qtdAlunos,
                                    b.nomealuno,
                                    b.perfilaluno,
                                    c.email
                                  from sigmundi.projetos a
                                  inner join sigmundi.grupos b on b.idprojeto = a.idprojeto
                                  inner join sigmundi.alunos c on c.idaluno = b.idaluno
                                  where chave = '{}' '''.format(self.chave))
    result = pd.DataFrame([dict(zip(tuple(query.keys()), i)) for i in query.cursor])

    if(len(result)==0):
      check = {'warning': False}
      check['success'] = True
    elif(result['qtdalunos'].unique()[0] <= len(result)):
      check = {'warning': 'Este projeto atingiu a quantidade máxima de alunos.'}
      check['success'] = False
    elif(len(result[result['email']==self.email]) > 0):
      check = {'warning': 'Você já esta participando deste projeto.'}
      check['success'] = False
    else:
      check = {'warning': False}
      check['success'] = True
    return check

class Groups(Resource):
  
  conn,chave = None,None

  def __init__(self):
    self.conn = db_connect.connect()
    self.chave = request.args.get('chave')

  def get(self):
    #Busca questionarios
    query = '''
      select 
        a.*,
        c.idprojeto
      from sigmundi.questionarios a
      inner join sigmundi.grupos b on b.idaluno = a.idaluno
      inner join sigmundi.projetos c on c.idprojeto = b.idprojeto
      where c.chave = '{}'
    '''.format(self.chave)
    exect = self.conn.execute(query)
    #salva base de questionarios em DataFrame
    base = pd.DataFrame([dict(zip(tuple(exect.keys()), i)) for i in exect.cursor])
    return self.generateGroup(base)

  def refreshDataBase(self,base):
    '''
      Função atualiza base com resultados do ML e retorna base atualizada.
    '''
    
    query = ''
    for i in range(0,len(base)):
      query+='update sigmundi.grupos set num_grupo = '+str(base['grupos'][i])+' where idprojeto = '+str(base['idprojeto'][i])+' and idaluno = '+str(base['idaluno'][i])+';'
    
    self.conn.execute(query)

    query = '''
            select 
              a.nomeprojeto,
              b.num_grupo,
              c.nomealuno,
              b.perfilaluno 
            from sigmundi.projetos a
            inner join sigmundi.grupos b on b.idprojeto = a.idprojeto
            inner join sigmundi.alunos c on c.idaluno = b.idaluno
            where chave = '{}' order by 2 '''.format(self.chave)
    return self.conn.execute(query)
  
  def generateGroup(self,base):
    '''
      Funcao gera grupos utilizando o algoritmo de ML K-means.
      Retorna: Json com grupos
    '''
    # ML Gera Grupos
    result = model.fit(base)
    exect = self.refreshDataBase(result)
    base = [dict(zip(tuple(exect.keys()), i)) for i in exect.cursor]

    #################### Criação do JSON ####################
    json = {}
    #Armazena lista com range de grupos, exemplo: [1,2,3,4,5]
    numGrupos = np.unique(np.array(list(map(lambda x : x['num_grupo'], base))))
    
    ################### Titulo do Projeto ###################
    json['nomeProjeto'] = base[0]['nomeprojeto']
    # remove titulo da base
    result = list(map(lambda x : x.pop('nomeprojeto',None), base))

    ######################### Grupos #########################
    controller = []
    for num in numGrupos:
        grupos = {}
        alunos = []
        for i in range(len(base)):
            dadosAlunos = []
            if(base[i]['num_grupo'] == num):
                dadosAlunos.append(base[i]['nomealuno'])
                dadosAlunos.append(base[i]['perfilaluno'])
                alunos.append(dadosAlunos)            
        grupos['num_grupo'] = num
        grupos['alunos'] = alunos
        controller.append(grupos)

    json['grupos'] = controller
    return dumps(json)

api.add_resource(Projects, '/projects')
api.add_resource(ProjectsId, '/projects/<chave>')
api.add_resource(Students, '/students')
api.add_resource(Login, '/login')
api.add_resource(Groups, '/grupos')

if __name__ == '__main__':
    app.run(host='0.0.0.0')