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
