---
title: "Back Propagation"
date: "2016-12-13T00:00:00.000Z"
tags:
  - JavaScript
  - Machine Learning
---

This time, I will explain about Back Propagation by making a simple program.

#### **What is Back Propagation?**
In machine learning, it is a supervised learning algorithm for learning a neural network.

The following article is good for understanding it.

[Neural networks and deep learning](http://neuralnetworksanddeeplearning.com/chap2.html)

#### **Question**
First, prepare a data set of pairs of input and output.

For example, it is the following data.

The first three of each row are input data, the last one is the correct output data.

```bash
$ cat data.txt
1 1 1 1
1 1 0 1
1 0 1 1
1 0 0 0
0 1 1 1
0 1 0 0
0 0 1 0
0 0 0 0
```

Let's learn the neural network by giving the above data to back propagation.

#### **Program**
The program of back propagation is like below.

Internally, this uses Neuron class which is created in [Neuron]({{ site.url }}/2016/11/29/neuron.html).

```js
const random = require('../lib/random');
const Neuron = require('../05-neuron/neuron');

class BackPropagation {

  constructor(e, alpha, limit, inNum, midNum, f) {
    this.e = e;
    this.alpha = alpha;
    this.limit = limit;
    this.in = inNum;
    this.mid = midNum;
    this.error = 100;
    this.mid = [];

    for (let i = 0; i < midNum; i++) {
      let w = [], v = random.get(-1, 1, false);
      for (let j = 0; j < inNum; j++) {
        w.push(random.get(-1, 1, false));
      }
      this.mid.push(new Neuron(w, v, f));
    }

    let w = [], v = random.get(-1, 1, false);
    for (let i = 0; i < midNum; i++) {
      w.push(random.get(-1, 1, false));
    }
    this.out = new Neuron(w, v, f);
  }

  learn() {
    while (this.error > this.limit) {
      this.error = 0.0;
      for (let i = 0; i < this.e.length; i++) {
        const teacher = this.e[i][this.in];
        const output = this.forward(this.e[i].slice(0, this.in), this.mid, this.out);
        this.oLearn(teacher, output, this.mid, this.out);
        this.hLearn(teacher, output, this.mid, this.out, this.e[i].slice(0, this.in));
        this.error += (teacher - output) * (teacher - output);
      }
    }
  }

  oLearn(teacher, output, mid, out) {
    const d = (teacher - output) * output * (1 - output);
    for (let i = 0; i < mid.length; i++) {
      out.setW(i, out.getW(i) + this.alpha * mid[i].getO() * d);
    }
    out.setV(out.getV() + this.alpha * (-1.0) * d);
  }

  hLearn(teacher, output, mid, out, e) {
    for (let i = 0; i < mid.length; i++) {
      const d = mid[i].getO() * (1 - mid[i].getO()) * out.getW(i) * (teacher - output) * output * (1 - output);
      for (let j = 0; j < this.in; j++) {
        mid[i].setW(j, mid[i].getW(j) + this.alpha * e[j] * d);
      }
      mid[i].setV(mid[i].getV() + this.alpha * (-1.0) * d);
    }
  }

  forward(e, mid, out) {
    const eo = [];
    mid.forEach(m => {
      eo.push(m.forward(e));
    });
    return out.forward(eo);
  }

  result() {
    for (let i = 0; i < this.e.length; i++) {
      console.log(this.e[i], this.forward(this.e[i].slice(0, this.in), this.mid, this.out));
    }
  }

}

module.exports = BackPropagation;
```

#### **Result**

Then, let's use the above back propagation.

```js
const fs = require('fs');
const BackPropagation = require('./back-propagation');

const ALPHA =   10;
const LIMIT = 0.01;
const IN    =    3;
const MID   =    3;

const data = fs.readFileSync('data.txt');
const e = initInput(data);
const bp = new BackPropagation(e, ALPHA, LIMIT, IN, MID, sigmoid);

bp.learn();
bp.result();

function sigmoid(u) {
  return 1.0 / (1.0 + Math.exp(-u));
}

function initInput(data) {
  let lines = data.toString().split('\n'),
      inputs = [], input, tmp, i;

  for (i = 0; i < lines.length - 1; i++) {
    tmp = lines[i].split(' ');
    input = [];
    tmp.forEach(i => {
      input.push(parseInt(i));
    });
    inputs.push(input);
  }
  return inputs;
}
```

When executed, the result is as follows.

```bash
$ node example.js
[ 1, 1, 1, 1 ] 0.9975867553861153
[ 1, 1, 0, 1 ] 0.995497018073595
[ 1, 0, 1, 1 ] 0.9905236193610647
[ 1, 0, 0, 0 ] 0.03232665554956693
[ 0, 1, 1, 1 ] 0.9931934488128437
[ 0, 1, 0, 0 ] 0.046925698005279876
[ 0, 0, 1, 0 ] 0.02273183453262245
[ 0, 0, 0, 0 ] 0.01607439769599071
```

We will understand that the neural network learned correctly.

#### **Finally**

I introduced an example of implementation of Back propagation.

I opensourced this program on GitHub, please star this.

[Back Propagation (GitHub)](https://github.com/saitoxu/ml-kitchen-sink/tree/master/07-back-propagation)
