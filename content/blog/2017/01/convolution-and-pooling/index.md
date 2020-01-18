---
title: "Easy Implementation of Convolution and Pooling Layer in Deep Learning"
date: "2017-01-01T00:00:00.000Z"
tags:
  - JavaScript
  - Machine Learning
  - Deep Learning
---

I implemented a sample of part of CNN (Convolutional Neural Network), Convolutional Layer and Pooling Layer.

This is easy to understand, so it'll help you to understand convolutional layer and pooling layer in deep learning.

#### **What's CNN?**

CNN (Convolutional Neural Network) is one of neural networks, and it has convolutional layer and pooling layer.
This is often used for visual recognition.

| Layer               | Description                                                       |
| :------------------ | :---------------------------------------------------------------- |
| Convolutional layer | A layer to filter input images and detect a pattern in the image. |
| Pooling layer       | A layer to reduce the amount of parameters and computation.       |

The following article is good for understanding CNN.

[CS231n Convolutional Neural Networks for Visual Recognition](http://cs231n.github.io/convolutional-networks/)

#### **Implementation**

#### _Description_

Input image is 11 pixels \* 11 pixels, each pixel is 0 or 1.

In convolutional layer, a filter (in example, it is 3 pixels _ 3 pixels array) is adapted and 9 pixels _ 9 pixels image is outputed.

Pooling layer receives the image and adapt `max()` function. Finally, 3 pixels \* 3 pixels image is generated.

![convlution-and-pooling]({{ site.baseurl }}/images/2017-01-01-convolution-and-pooling.png)

#### _Source code_

This is convolutional layer class.

```js
class ConvolutionalLayer {
  constructor(e, filter) {
    this.e = e
    this.filter = filter
  }

  calc() {
    let convOut = [],
      row,
      filterSize = this.filter.length

    for (let i = 0; i < this.e.length - (filterSize - 1); i++) {
      convOut.push((row = []))
      for (let j = 0; j < this.e[i].length - (filterSize - 1); j++) {
        row.push(this._sum(this.e, this.filter, i, j))
      }
    }
    this.layer = convOut
  }

  _sum(e, filter, i, j) {
    let sum = 0

    for (let m = 0; m < filter.length; m++) {
      for (let n = 0; n < filter[m].length; n++) {
        sum += e[i + m][j + n] * filter[m][n]
      }
    }
    return sum
  }
}

module.exports = ConvolutionalLayer
```

`calc()` method is to adapt filter and generate an image (array).
And, this is pooling layer class.

```js
class PoolingLayer {
  constructor(size, convLayer) {
    this.size = size
    this.convLayer = convLayer
  }

  calc() {
    let poolOut = [],
      row

    for (let i = 0; i < this.size; i++) {
      poolOut.push((row = []))
      for (let j = 0; j < this.size; j++) {
        row.push(this._max(this.convLayer.layer, i, j))
      }
    }
    this.layer = poolOut
  }

  _max(convOut, i, j) {
    let max = 0

    for (let m = 0; m < this.size; m++) {
      for (let n = 0; n < this.size; n++) {
        if (max < convOut[i * this.size + m][j * this.size + n]) {
          max = convOut[i * this.size + m][j * this.size + n]
        }
      }
    }
    return max
  }
}

module.exports = PoolingLayer
```

This is an example to use these program.

```js
const fs = require("fs")
const POOLSIZE = 3
const data = fs.readFileSync("sample.dat")
const ConvolutionalLayer = require("./convolutional-layer")
const PoolingLayer = require("./pooling-layer")
const e = inputData(data.toString())
const filter = [
  [0, 1, 0],
  [0, 1, 0],
  [0, 1, 0],
]

const conv = new ConvolutionalLayer(e, filter)
const pool = new PoolingLayer(POOLSIZE, conv)

conv.calc()
pool.calc()

for (row of pool.layer) {
  console.log(row)
}

function inputData(d) {
  let e = [],
    lines = d.split("\n"),
    line

  for (let i = 0; i < lines.length - 1; i++) {
    line = lines[i].split(" ")
    e.push(line)
  }
  return e
}
```

All programs are hosted [here](https://github.com/saitoxu/ml-kitchen-sink/tree/master/08-convolution-and-pooling) in GitHub.

#### _Output_

This is a sample use.

```bash
$ cat sample.dat
0 0 0 0 0 1 0 0 0 0 0
0 0 0 0 0 1 0 0 0 0 0
0 0 0 0 0 1 0 0 0 0 0
0 0 0 0 0 1 0 0 0 0 0
0 0 0 0 0 1 0 0 0 0 0
0 0 0 0 0 1 0 0 0 0 0
0 0 0 0 0 1 0 0 0 0 0
0 0 0 0 0 1 0 0 0 0 0
0 0 0 0 0 1 0 0 0 0 0
0 0 0 0 0 1 0 0 0 0 0
0 0 0 0 0 1 0 0 0 0 0
$ node example.js
[ 0, 3, 0 ]
[ 0, 3, 0 ]
[ 0, 3, 0 ]
```

#### **Summary**

I introduced an easy Implementation of convolution and pooling layer.
Please refer this to study deep learning!

Finally, I hosted sample programs related to machine learning and artificial intelligence in this GitHub repository.

[ml-kitchen-sink (GitHub)](https://github.com/saitoxu/ml-kitchen-sink)

If you like, please star this!
