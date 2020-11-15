---
title: PRMLの式のまとめ
date: "2020-11-30T00:00:00.000Z"
tags:
  - PRML
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

$$
\tag{1.9}
\begin{aligned}
p(X = x_i, Y = y_j) &= \frac{n_{ij}}{N} = \frac{n_{ij}}{c_i} \cdot \frac{c_i}{N} \\
&= p(Y = y_j | X = x_i)p(X = x_i)
\end{aligned}
$$

$$
\tag{1.10}
p(X) = \sum_{Y}p(X, Y)
$$

$$
\tag{1.11}
p(X, Y) = p(Y|X)p(X)
$$

$$
\tag{1.12}
p(Y|X) = \frac{p(X|Y)p(Y)}{p(X)}
$$

$$
\tag{1.13}
p(X) = \sum_{Y}p(X|Y)p(Y)
$$

$$
\tag{1.14}
p(B=r) = 4/10
$$

$$
\tag{1.15}
p(B=b) = 6/10
$$

$$
\tag{1.16}
p(F=a|B=r) = 1/4
$$

$$
\tag{1.17}
p(F=o|B=r) = 3/4
$$

$$
\tag{1.18}
p(F=a|B=b) = 3/4
$$

$$
\tag{1.19}
p(F=o|B=b) = 1/4
$$

$$
\tag{1.20}
p(F=a|B=r) + p(F=o|B=r) = 1
$$

$$
\tag{1.21}
p(F=a|B=b) + p(F=o|B=b) = 1
$$

$$
\tag{1.22}
\begin{aligned}
p(F=a) &= p(F=a|B=r)p(B=r)+p(F=a|B=b)p(B=b) \\
&=\frac{1}{4} \times \frac{4}{10} + \frac{3}{4} \times \frac{6}{10} = \frac{11}{20}
\end{aligned}
$$

$$
\tag{1.23}
p(B=r|F=o) = \frac{p(F=o|B=r)p(B=r)}{p(F=o)} = \frac{3}{4} \times \frac{4}{10} \times \frac{20}{9} = \frac{2}{3}
$$

$$
\tag{1.24}
p(x \in(a,b)) = \int_{a}^{b}p(x)\text{d}x
$$

$$
\tag{1.25}
p(x) \geqslant 0
$$

$$
\tag{1.26}
\int_{-\infin}^{\infin}p(x)\text{d}x = 1
$$

$$
\tag{1.27}
\begin{aligned}
p_y(y) &= p_x(x) \left| \frac{\text{d}x}{\text{d}y} \right| \\
&= p_x(g(y))|g\rq(y)|
\end{aligned}
$$

$$
\tag{1.28}
P(z) = \int_{-\infin}^{z}p(x)\text{d}x
$$

$$
\tag{1.29}
p(\mathbf{x}) \geqslant 0
$$

$$
\tag{1.30}
\int p(\mathbf{x})\text{d}\mathbf{x} = 1
$$

$$
\tag{1.31}
p(x) = \int p(x, y) \text{d}y
$$

$$
\tag{1.32}
p(x, y) = p(y|x)p(x)
$$

$$
\tag{1.33}
\mathbb{E}[f] = \sum_z p(x)f(x)
$$

$$
\tag{1.34}
\mathbb{E}[f] = \int p(x)f(x) \text{d}x
$$

$$
\tag{1.35}
\mathbb{E}[f] \simeq \frac{1}{N} \sum_{n=1}^N f(x_n)
$$

$$
\tag{1.36}
\mathbb{E}_x[f(x, y)]
$$

$$
\tag{1.37}
\mathbb{E}_x[f|y] = \sum_x p(x|y)f(x)
$$

$$
\tag{1.38}
\text{var}[f] = \mathbb{E}[(f(x) - \mathbb{E}[f(x)])^2]
$$

$$
\tag{1.39}
\text{var}[f] = \mathbb{E}[f(x)^2] - \mathbb{E}[f(x)]^2
$$

$$
\tag{1.40}
\text{var}[x] = \mathbb{E}[x^2] - \mathbb{E}[x]^2
$$

$$
\tag{1.41}
\begin{aligned}
\text{cov}[x,y] &= \mathbb{E}_{x,y}[\{x - \mathbb{E}[x]\}\{y - \mathbb{E}[y]\}] \\
&= \mathbb{E}_{x,y}[xy] - \mathbb{E}[x]\mathbb{E}[y]
\end{aligned}
$$

$$
\tag{1.42}
\begin{aligned}
\text{cov}[\mathbf{x},\mathbf{y}] &= \mathbb{E}_{\mathbf{x},\mathbf{y}}[\{\mathbf{x} - \mathbb{E}[\mathbf{x}]\}\{\mathbf{y}^{\text{T}} - \mathbb{E}[\mathbf{y}^{\text{T}}]\}] \\
&= \mathbb{E}_{\mathbf{x},\mathbf{y}}[\mathbf{x}\mathbf{y}^{\text{T}}] - \mathbb{E}[\mathbf{x}]\mathbb{E}[\mathbf{y}^{\text{T}}]
\end{aligned}
$$

$$
\tag{1.43}
p(\mathbf{w}|\mathcal{D}) = \frac{p(\mathcal{D}|\mathbf{w})p(\mathbf{w})}{p(\mathcal{D})}
$$

$$
\tag{1.44}
\text{posterior} \propto \text{likelihood} \times \text{prior}
$$

$$
\tag{1.45}
p(\mathcal{D}) = \int p(\mathcal{D}|\mathbf{w})p(\mathbf{w}) \text{d}\mathbf{w}
$$

$$
\tag{1.46}
\mathcal{N}(x|\mu, \sigma^2) = \frac{1}{(2\pi \sigma^2)^{1/2}} \exp \left\{ -\frac{1}{2\sigma^2}(x - \mu)^2 \right\}
$$

$$
\tag{1.47}
\mathcal{N}(x|\mu, \sigma^2) > 0
$$

$$
\tag{1.48}
\int_{-\infin}^{\infin} \mathcal{N}(x|\mu, \sigma^2) \text{d}x = 1
$$

$$
\tag{1.49}
\mathbb{E}[x] = \int_{-\infin}^{\infin} \mathcal{N}(x|\mu, \sigma^2)x \text{d}x = \mu
$$

$$
\tag{1.50}
\mathbb{E}[x^2] = \int_{-\infin}^{\infin} \mathcal{N}(x|\mu, \sigma^2)x^2 \text{d}x = \mu^2 + \sigma^2
$$

$$
\tag{1.51}
\text{var}[x] = \mathbb{E}[x^2] - \mathbb{E}[x]^2 = \sigma^2
$$

$$
\tag{1.52}
\mathcal{N}(\mathbf{x} | \boldsymbol{\mu}, \mathbf{\Sigma}) = \frac{1}{(2\pi)^{D/2}}\frac{1}{|\mathbf{\Sigma}|^{1/2}} \exp \left\{ - \frac{1}{2}(\mathbf{x} - \boldsymbol{\mu})^\text{T}
\mathbf{\Sigma}^{-1}(\mathbf{x} - \boldsymbol{\mu}) \right\}
$$

$$
\tag{1.53}
p(\textsf{\textbf{x}}|\mu, \sigma^2)= \prod_{n=1}^{N}\mathcal{N}(x_n|\mu,\sigma^2)
$$
