from sklearn.preprocessing import Normalizer
import pandas as pd
import numpy as np
import pickle


class SigmindMl():
  def fit(self, base):
    X = base.values[:,2:-1]

    # Gerando os dados normalizados
    scaler = Normalizer().fit(X)
    normalizedX = scaler.transform(X)

    # Carregando o arquivo
    modeloCluster = pickle.load(open('clustering/ClusteringModel.sav', 'rb'))
    modeloCluster.n_clusters = self.findBestCluster(len(X))

    #Inserindo dados de grupos
    while True:
      try:
        base['grupos'] = modeloCluster.fit(X).labels_
        break
      except IndexError:
        pass

    return base[['idaluno','grupos','idprojeto']]

  def findBestCluster(self,x):
    qtdStudent = x
    if(qtdStudent%2==0):
      qtdGroup = qtdStudent-2
      iterator = 2
    else:
      qtdGroup = qtdStudent-1
      iterator = 1
    
    while(qtdStudent/qtdGroup < 4):
      qtdGroup -= iterator
    return qtdGroup