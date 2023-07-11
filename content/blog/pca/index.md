+++
title = "Principal Component Analysis"
date = 2023-06-30
+++

On this article we will be talking about principal component analysis or PCA for short.

#### What is PCA?

PCA is a very useful technique in which we transform the avaiable data, reducing its dimensions to simplify the analysis and machine learning process, keeping the **most information** provided by the different variables of the data set. We achieve this by studying the **covariance matrix** of the data and its **eigenvectors** and **eigenvalues**. So lets begin.

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

To begin with, we will center the data by substracting its mean.

- Firstly, we transpose the data and remove the 'Class' column since that is what we are predicting.
- We calculate the mean across the rows and then substract the mean vector to each column.
- Finally we calulate the covariance matrix

```python
df_used = df.drop('Class', axis = 1).T

mean_df = np.mean(df_used,axis = 1)
norm_df = df_used.sub(mean_df,axis = 0)

cov_mat = (1/(df_used.shape[1]-1))*(norm_df@norm_df.T)
cov_mat
```

The resulting covariance matrix:

|                  | **Sepal_Length** | **Sepal_Width** | **Petal_Length** | **Petal_Width** |
| ---------------- | ---------------- | --------------- | ---------------- | --------------- |
| **Sepal_Length** | 0.685694         | -0.039268       | 1.273682         | 0.516904        |
| **Sepal_Width**  | -0.039268        | 0.188004        | -0.321713        | -0.117981       |
| **Petal_Length** | 1.273682         | -0.321713       | 3.113179         | 1.296387        |
| **Petal_Width**  | 0.516904         | -0.117981       | 1.296387         | 0.582414        |

Now that we have the covariance matrix which contains the variance of a feature in the diagonal and covariance between two features in the rest of the positions, since this is a **symmetric matrix** we can introduce an orthogonal P matrix to make a change of basis to orthogonally diagonalize the matrix.

This P matrix will be comprized of the covariance matrix's **eigenvectors** and the diagonal D matrix will contain its **eigenvalues**.
This new diagonal matrix D trace will be the total variance of the features, so by choosing the first N **eigenvectors** associated with this **eigenvalues** and performing a basis change with the features we will
have reduced the dimensionality of the dataset preserving (ideally) most of its information.

```python
eigvals,eigvecs = np.linalg.eigh(cov_mat)

P = np.flip(eigvecs, axis = 1)
D = np.diag(np.flip(eigvals))
```

We get the **eigenvectors** and **eigenvalues** and sort them in descending order since the highest **eigenvalues** will be the ones with the most variance. When we divide each value by the trace of the diagonal matrix D we can see what percentage of the total variance is explained by the associated **eigenvalue**.

```python
var = np.trace(D)
print(var)

First component: {D[0,0]*100 / var:.3f}%
Second component: {D[1,1]*100 / var:.3f}%
Third component: {D[2,2]*100 / var:.3f}%
Fourth component: {D[3,3]*100 / var:.3f}%
```

Output:

- First component: 92.462%
- Second component: 5.302%
- Third component: 1.719%
- Fourth component: 0.518%

To continue we just have to select our according first N **eigenvectors** to multiply our matrix P by the features.

```python
new_df = (P.T@norm_df).T.iloc[:,:2]
new_df['Class'] = df['Class']
```

Now our dataset dimension will be (150,2) instead of the original (150,4)
and our data is well distributed for clustering.

```python
sns.scatterplot(x =new_df[0], y = new_df[1], data = new_df, hue = new_df.Class )
```

Output:

![here](/images/first_scatter.png)
