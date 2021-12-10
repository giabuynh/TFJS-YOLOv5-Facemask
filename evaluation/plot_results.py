import pandas as pd
import matplotlib.pyplot as plt

df = pd.read_csv('./results.csv')
df.plot('recall', 'precision')
plt.show()