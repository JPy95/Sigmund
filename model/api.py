from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from datetime import datetime
from sqlalchemy import create_engine
from json import dumps
import pandas as pd
import ml #Algoritmo de Clusterização

model = ml.SigmindMl()
db_connect = create_engine('postgresql://sigmund:Unibh2020@db1-sigmund.cdrfdxumcxao.us-east-1.rds.amazonaws.com:5432/sigmund')
app = Flask(__name__)
api = Api(app)

class Projects(Resource):

  conn,nameProject,date,idProjeto,qtdAlunos=None,None,None,None,None
  def __init__(self):
    self.conn = db_connect.connect()
    self.nameProject = request.json['nameProject']
    self.qtdAlunos = request.json['qtdAlunos']
    self.date = str(datetime.now())[:str(datetime.now()).find('.')]

  def post(self):
    self.conn.execute("insert into sigmundi.projetos values('{0}',DEFAULT, '{1}')".format(self.date,self.nameProject))
    return self.get()

  def get(self):
    query = self.conn.execute("select * from sigmundi.projetos where nomeProjeto = '{0}' and date_trunc('second',datainclusao) = '{1}' ".format(self.nameProject,self.date))
    result = [dict(zip(tuple(query.keys()), i)) for i in query.cursor]
    return jsonify(result)

class ProjectsId(Resource):
  def get(self,id):
    if(self.check_project(id) == 0):
      result = dumps({'success':False})
    else:
      conn = db_connect.connect()
      query = conn.execute("select count(idAluno) - qtdAlunos as total_alunos from sigmundi.grupos a "+
                          "inner join sigmundi.projetos b on b.idProjeto = a.idProjeto "+
                          "where a.idProjeto = {}".format(id))
      result = [dict(zip(tuple(query.keys()), i)) for i in query.cursor]
      result = jsonify(result)
    return result

  def check_project(self, id):
    '''
      Verifica se o projeto existe
    '''
    conn = db_connect.connect()
    query = conn.execute('select * from sigmundi.projetos where idProjeto = {}'.format(id))
    return query.cursor.rowcount 
  


class Students(Resource):

  conn,nameStudent,email,idProjeto,profile = None,None,None,None,None
  
  def __init__(self):
    self.conn = db_connect.connect()
    self.nameStudent = request.json['nameStudent']
    self.email = request.json['email']
    self.idProjeto = request.json['idProjeto']
    self.perfil = request.json['profile']

  def post(self):
    if(self.check_student(self.email) == 0):
      self.conn.execute("insert into sigmundi.alunos values(now(), DEFAULT,'{0}','{1}')".format(self.nameStudent,self.email))
      self.get()
    else:
      return self.get()

  def check_student(self,email):
    '''
      Verifica se o aluno já está cadastrado no banco;
      returno 0 ou retorno > 0;
    '''
    query = self.conn.execute("select * from sigmundi.alunos where email = '{0}' ".format(self.email))
    return query.cursor.rowcount

  def get(self):
    query = self.conn.execute("select idaluno from sigmundi.alunos where nomeAluno = '{0}' and email = '{1}' ".format(self.nameStudent,self.email))
    result = [dict(zip(tuple(query.keys()), i)) for i in query.cursor]
    self.conn.execute("insert into sigmundi.grupos values(now(),{0},null,{1},'{2}','{3}')".format(self.idProjeto, result[0]['idaluno'],self.nameStudent,self.perfil))
    return jsonify(result)

class Quiz(Resource):

  conn,ansewrs,idaluno = None,None,None

  def __init__(self):
    self.conn = db_connect.connect()
    self.respostas = request.json['respostas']
    self.idaluno = request.json['idaluno']

  def post(self):
    self.conn.execute('insert into sigmundi.questionarios values(DEFAULT,{0},{1})'.format(self.respostas,self.idaluno))
    return dumps({'success':True})

class Groups(Resource):
  
  conn,idProjeto = None,None

  def __init__(self):
    self.conn = db_connect.connect()
    self.idProjeto = request.json['idProjeto']

  def get(self):
    #Busca questionarios
    query = '''select a.* from sigmundi.questionarios a inner join sigmundi.grupos b on b.idaluno = a.idaluno where b.idprojeto = {}'''.format(self.idProjeto)
    exect = self.conn.execute(query)

    #salva base de questionarios em DataFrame
    base = pd.DataFrame([dict(zip(tuple(exect.keys()), i)) for i in exect.cursor])
    return self.generateGroup(base)

  def buildPuts(self,base):
    '''
      Função elabora query de atualização dos dados na tabela Grupos com base a quantidade de registros na base;
    '''
    
    query = ''
    for i in range(0,len(base)):
      query+='update sigmundi.grupos set num_grupo = '+str(base['grupos'][i])+' where idprojeto = '+str(self.idProjeto)+' and idaluno = '+str(base['idaluno'][i])+';'
    return query
  
  def generateGroup(self,base):
    '''
      Função envia base para ordenação de grupos;
    '''
    
    result = model.fit(base)
    self.conn.execute(self.buildPuts(result))
    return dumps({'success':True})

api.add_resource(Projects, '/projects')
api.add_resource(ProjectsId, '/projects/<id>')
api.add_resource(Students, '/students')
api.add_resource(Quiz, '/quiz')
api.add_resource(Groups, '/grupos')

if __name__ == '__main__':
    app.run(port='5002')