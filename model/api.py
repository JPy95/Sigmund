from flask import Flask, request, jsonify
from flask_restful import Resource, Api
from datetime import datetime
from sqlalchemy import create_engine
from json import dumps
import ml
import pandas as pd

db_connect = create_engine('postgresql://sigmund:Unibh2020@db1-sigmund.cdrfdxumcxao.us-east-1.rds.amazonaws.com:5432/sigmund')
app = Flask(__name__)
api = Api(app)
model = ml.SigmindMl()


class Projects(Resource):
  
  conn,name,date, = '','',''
  def __init__(self):
    self.conn = db_connect.connect()
    self.name = request.json['name']
    self.date = str(datetime.now())[:str(datetime.now()).find('.')]
  
  def post(self):
    self.conn.execute("insert into sigmundi.projetos values('{0}',DEFAULT, '{1}')".format(self.date,self.name))
    return self.get()

  def get(self):
    query = self.conn.execute("select * from sigmundi.projetos "
                "where nomeProjeto = '{0}' and date_trunc('second',datainclusao) = '{1}' ".format(self.name,self.date))
    result = [dict(zip(tuple(query.keys()), i)) for i in query.cursor]
    return jsonify(result)


class Students(Resource):

  conn,name,email,idProjeto,perfil = '','','','',''
  def __init__(self):
    self.conn = db_connect.connect()
    self.name = request.json['name']
    self.email = request.json['email']
    self.idProjeto = request.json['idProjeto']
    self.perfil = request.json['perfil']
    
  def post(self):
    if(self.check_student() == 0):
      self.conn.execute("insert into sigmundi.alunos values(now(), DEFAULT,'{0}','{1}')".format(self.name,self.email))
      return self.get()
    else:
      return self.get()

  def get(self):
    query = self.conn.execute("select idaluno from sigmundi.alunos where nomeAluno = '{0}' and email = '{1}' ".format(self.name,self.email))
    result = [dict(zip(tuple(query.keys()), i)) for i in query.cursor]

    self.conn.execute("insert into sigmundi.grupos " +
        "values(now(),{0},null,{1},'{2}','{3}')".format(self.idProjeto, result[0]['idaluno'], self.name, self.perfil))

    return jsonify(result)

  def check_student(self):
    query = self.conn.execute("select * from sigmundi.alunos where email = '{0}' ".format(self.email))
    return query.cursor.rowcount

class Quiz(Resource):
  conn,ansewrs,idaluno = '','',''
  def __init__(self):
    self.conn = db_connect.connect()
    self.ansewrs = ','.join(list(map(str, request.json['ansewrs'])))
    self.idaluno = request.json['idaluno']

  def post(self):
    self.conn.execute('insert into questionarios values(DEFAULT,{0},{1})'.format(self.ansewrs,self.idaluno))

class Groups(Resource):
  
  conn,idProjeto = '',''
  def __init__(self):
    self.conn = db_connect.connect()
    self.idProjeto = request.json['idProjeto']

  def getDataBaseML(self):
    query = '''select 
                a.*
              from sigmundi.questionarios a 
              inner join sigmundi.grupos b on b.idaluno = a.idaluno 
              where b.idprojeto = {}
            '''.format(self.idProjeto)
    exect = self.conn.execute(query)
    result = [dict(zip(tuple(exect.keys()), i)) for i in exect.cursor]
    return pd.DataFrame(result)

  def get(self):
    query = '''select 
                a.*
              from sigmundi.questionarios a 
              inner join sigmundi.grupos b on b.idaluno = a.idaluno 
              where b.idprojeto = {}
            '''.format(self.idProjeto)
    exect = self.conn.execute(query)
    result = [dict(zip(tuple(exect.keys()), i)) for i in exect.cursor]
    return jsonify(result)

  def buildPuts(self,base):
    query = ''
    for i in range(0,len(base)):
      query+='update sigmundi.grupos set num_grupo = '+str(base['grupos'][i])+' where idprojeto = '+str(self.idProjeto)+' and idaluno = '+str(base['idaluno'][i])+';'
    return query
  
  def generateGroup(self):
    base = model.fit(self.getDataBaseML())
    self.conn.execute(self.buildPuts(base))
    return self.get()

api.add_resource(Projects, '/projects')
api.add_resource(Students, '/students')
api.add_resource(Quiz, '/quiz') 
api.add_resource(Groups, '/groups') 

if __name__ == '__main__':
    app.run()