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

  conn,nameProject,date,idProjeto=None,None,None,None
  def __init__(self):
    self.conn = db_connect.connect()
    self.nameProject = request.args.get('nameProject')
    self.date = request.args.get('date')
    self.idProjeto = request.args.get('idProjeto')

  def post(self):
    self.conn.execute("insert into sigmundi.projetos values('{0}',DEFAULT, '{1}')".format(self.date,self.nameProject))
    return self.get()

  def get(self):
    if(self.idProjeto is None):
      query = self.conn.execute("select * from sigmundi.projetos where nomeProjeto = '{0}' and date_trunc('second',datainclusao) = '{1}' ".format(self.nameProject,self.date))
      result = [dict(zip(tuple(query.keys()), i)) for i in query.cursor]
    else:
      query = self.conn.execute("select * from sigmundi.projetos where idProjeto = {}".format(self.idProjeto))
      result = [dict(zip(tuple(query.keys()), i)) for i in query.cursor]
    
    return jsonify(result)

class Students(Resource):

  conn,nameStudent,email,idProjeto,profile = None,None,None,None,None
  
  def __init__(self):
    self.conn = db_connect.connect()
    self.nameStudent = request.args.get('nameStudent')
    self.email = request.args.get('email')
    self.idProjeto = request.args.get('idProjeto')
    self.perfil = request.args.get('profile')

  def post(self):
    if(self.check_student(self.email) == 0):
      self.conn.execute("insert into sigmundi.alunos values(now(), DEFAULT,'{0}','{1}')".format(self.nameStudent,self.email))
    
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
    self.respostas = request.args.get('respostas')
    self.idaluno = request.args.get('idaluno')

  def post(self):
    self.conn.execute('insert into sigmundi.questionarios values(DEFAULT,{0},{1})'.format(self.respostas,self.idaluno))
    return dumps({'success':True})

class Groups(Resource):
  
  conn,idProjeto = None,None

  def __init__(self):
    self.conn = db_connect.connect()
    self.idProjeto = request.args.get('idProjeto')

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
api.add_resource(Students, '/students')
api.add_resource(Quiz, '/quiz')
api.add_resource(Groups, '/grupos')

if __name__ == '__main__':
    app.run(port='5002')