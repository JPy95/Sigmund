from sklearn.preprocessing import Normalizer
import pandas as pd
import numpy as np
import pickle


class SigmindMl():
  def fit(self, base):
    X = base.values[:,1:-1]

    # Gerando os dados normalizados
    scaler = Normalizer().fit(X)
    normalizedX = scaler.transform(X)

    # Carregando o arquivo
    modeloCluster = pickle.load(open('../clustering/ClusteringModel.sav', 'rb'))
    modeloCluster.n_clusters = self.findBestCluster(X)

    #Inserindo dados de grupos
    base['grupos'] = modeloCluster.fit(normalizedX).labels_
    return base[['idaluno','grupos']]

  def findBestCluster(self,x):
    qtdStudent = len(x)
    qtdGroup = qtdStudent-1
    
    while(qtdStudent/qtdGroup < 4):
      qtdGroup -= 1
    
    if(qtdStudent > 13):
      qtdGroup -= 1
    return qtdGroup