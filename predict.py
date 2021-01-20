# evaluate an ARIMA model using a walk-forward validation
import sys
from pandas import read_csv
from datetime import datetime
from matplotlib import pyplot
from statsmodels.tsa.arima.model import ARIMA
from sklearn.metrics import mean_squared_error
from math import sqrt
# load dataset
history = list()
for x in sys.argv[3].split(','):
  history.append(float(x))
predictions = list()
# walk-forward validation
for t in range(int(sys.argv[1])):
  model = ARIMA(history, order=(10,1,0))
  model_fit = model.fit()
  output = model_fit.forecast()
  yhat = output[0]
  history.append(yhat)
  predictions.append(yhat)

print(predictions)



