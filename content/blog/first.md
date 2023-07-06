+++
title = "Principal Component Analysis"
date = 2023-06-30
+++

On this article we will be talking about principal component analysis or PCA for short.

#### What is PCA?

PCA is a very useful technique in which we transform the avaiable data, reducing its dimensions to simplify the analysis and machine learning process, keeping the most information provided by the different variables of the data set. We achieve this by studying the covariance matrix of the data and its eigenvectors and eigenvalues. So lets begin.

### Steps

- Standardize the data
- Calculate the covariance matrix
- Calculate the eigenvectors and eigenvalues of the covariance matrix (Those will be the principal components)
- Sort them in descending order
- Choose which eigenvectors to keep
- re cast the data onto the new axis

#### Standardizing the data

We will be using the traditional Iris dataset. To begin with, we import the data assigning the corresponding columns as the initial features.

```python
col_names = ['Sepal_Length','Sepal_Width','Petal_Length','Petal_Width','Class']
df = pd.read_csv("/content/iris.data", names = col_names)
```
