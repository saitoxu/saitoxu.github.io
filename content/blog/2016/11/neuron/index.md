---
title: "Neuron"
date: "2016-11-29T00:00:00.000Z"
tags:
  - JavaScript
  - Machine Learning
---

I made artificial neurons and realized a logical AND.

[Neuron (GitHub)](https://github.com/saitoxu/ml-kitchen-sink/tree/master/05-neuron)

#### **What's Neuron?**

Neurons are components of neural networks that mimic neurons of the brain.

It receives one or more inputs and generates output (synapse) from the sum of them.

Normally, the sum of each node is weighted and passed to a nonlinear function called a transfer function.

Please see the following link for more detail.

[Neural Network](https://en.wikipedia.org/wiki/Artificial_neural_network)

#### **Program**

```js
class Neuron {
  constructor(w, v, f) {
    this.w = w
    this.v = v
    this.f = f
    this.o = null
  }

  forward(input) {
    let sum = 0
    for (let i = 0; i < input.length; i++) {
      sum += input[i] * this.w[i]
    }
    this.o = this.f(sum - this.v)
    return this.o
  }

  getO() {
    return this.o
  }

  getW(i) {
    return this.w[i]
  }

  getV() {
    return this.v
  }

  setW(i, value) {
    this.w[i] = value
  }

  setV(value) {
    this.v = value
  }
}

module.exports = Neuron
```

Use this as below.

```js
const fs = require("fs")
const Neuron = require("./neuron")
const data = fs.readFileSync("data.txt")
const input = initInput(data)
const w = [1, 1]
const v = 1.5
const neuron = new Neuron(w, v, u => {
  return u >= 0 ? 1 : 0
})

for (let i = 0; i < input.length; i++) {
  console.log(input[i], neuron.forward(input[i]))
}

function initInput(data) {
  const lines = data.toString().split("\n")
  let input = []

  for (let i = 0; i < lines.length - 1; i++) {
    const inputs = lines[i].split(" ")
    input.push([parseInt(inputs[0]), parseInt(inputs[1])])
  }
  return input
}
```

```bash
$ cat data.txt
0 0
0 1
1 0
1 1

$ node example.js
[ 0, 0 ] 0
[ 0, 1 ] 0
[ 1, 0 ] 0
[ 1, 1 ] 1
```
