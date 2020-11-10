---
title: PRMLの式のまとめ
date: "2020-11-30T00:00:00.000Z"
tags:
  - Pattern Recognition
  - Machine Learning
---

TODO

## 第1章

$$
\tag{1.1}
y(x,\mathbf{w}) = w_0 + w_1x + w_2x^2 + \dots + w_Mx^M = \sum_{j=0}^M w_jx^j
$$

$$
\tag{1.2}
E(\mathbf{w}) = \frac{1}{2}\sum_{n=1}^N {y(x_n,\mathbf{w}) - t_n}^2
$$

$$
\tag{1.3}
E_{\text{RMS}} = \sqrt{2E(\mathbf{w}^*)/N}
$$

$$
\tag{1.4}
\tilde{E}(\mathbf{w}) = \frac{1}{2}\sum_{n=1}^{N}\{y(x_n,\mathbf{w})-t_n\}^2 + \frac{\lambda}{2}||\mathbf{w}||^2
$$

$$
\tag{1.5}
p(X = x_i, Y = y_j) = \frac{n_{ij}}{N}
$$

$$
\tag{1.6}
p(X = x_i) = \frac{c_i}{N}
$$

$$
\tag{1.7}
p(X = x_i) = \sum_{j=1}^{L}p(X = x_i, Y = y_j)
$$

$$
\tag{1.8}
p(Y = y_j | X = x_i) = \frac{n_{ij}}{c_i}
$$

<!-- $$
\tag{1.9}
$$

$$
\tag{1.10}
$$ -->
