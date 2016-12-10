---
layout: post
title: "Neural Network"
date: 2016-11-30
tags: JavaScript MachineLearning
---
Previously, I realized logical AND by creating a neuron.

[Neuron]({{ site.baseurl }}/2016/11/29/neuron.html)

At this time, by using a neural network that combines neurons,
I will make XOR.

#### **Program**
I use a neuron class which is created before.

```js
const fs = require('fs');
const Neuron = require('neuron');
const data = fs.readFileSync('data.txt');
const x = initInput(data);
const w1 = [ -2, 3 ], w2 = [ -2, 1 ], w3 = [ -60, 94 ];
const v1 = -1, v2 = 0.5, v3 = -1;
const neuron1 = new Neuron(w1, v1, f);
const neuron2 = new Neuron(w2, v2, f);
const neuron3 = new Neuron(w3, v3, f);

for (let i = 0; i < x.length; i++) {
  let z1 = neuron1.forward([x[i][0], x[i][1]]);
  let z2 = neuron2.forward([x[i][0], x[i][1]]);
  console.log(x[i], neuron3.forward([z1, z2]));
}

function f(u) {
  return u >= 0 ? 1 : 0;
}

function initInput(data) {
  let lines = data.toString().split('\n'),
      input = [];

  for (let i = 0; i < lines.length - 1; i++) {
    const inputs = lines[i].split(' ');
    input.push([ parseInt(inputs[0]), parseInt(inputs[1]) ]);
  }
  return input;
}
```

#### **Usage**
Usage is as follows.

```bash
$ cat data.txt
0 0
0 1
1 0
1 1

$ node example.js
[ 0, 0 ] 0
[ 0, 1 ] 1
[ 1, 0 ] 1
[ 1, 1 ] 0
```

I uploaded whole code on GitHub, please refer it.

[Neural Network (GitHub)](https://github.com/saitoxu/ml-kitchen-sink/tree/master/06-neural-network)
