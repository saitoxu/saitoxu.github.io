---
title: "How to create C/C++ Addons of Node.js"
date: "2016-10-08T00:00:00.000Z"
tags:
  - JavaScript
  - Node.js
  - C
  - C++
---

We can create Node.js Addons written in C/C++.

See the following page for more detail.

[Addons \| Node.js v6.7.0 Documentation](https://nodejs.org/dist/latest-v6.x/docs/api/addons.html)

In this post, I'll introduce how to create factorial method addon.
Finally, we can use the method like this.

```js
console.log(addon.factorial(5)) // 120
```

#### **Step 1**

First, Set up npm project.

```sh
$ npm init
```

#### **Step 2**

Install following packages.

```sh
$ npm install -g node-gyp
$ npm install --save nan
$ npm install bindings # optional
```

`node-gyp` is a native addon build tool for Node.js.
Node.js addons depend on V8 JavaScript Engine, so
when V8 is updated, you may also need to update your addon.

`nan` module removes addon dependency on V8,
we don't need to consider backward compatibility.

`bindings` is helper module for loading your native module's .node file.

#### **Step 3**

Create a _binding.gyp_ file with the following content.
This is needed for build C/C++ program, and NAN needs _include_dirs_.

```json
{
  "targets": [
    {
      "target_name": "factorial",
      "sources": ["factorial.cc"],
      "include_dirs": ["<!(node -e \"require('nan')\")"]
    }
  ]
}
```

#### **Step 4**

Create `factorial.cc` like this.

```c++
#include <nan.h>

using namespace v8;

int factorial(int n);

NAN_METHOD(Factorial) {
  if (!info[0]->IsNumber() || info[0]->NumberValue() < 1) {
    Nan::ThrowTypeError("Wrong argument");
    return;
  }

  info.GetReturnValue().Set(factorial(info[0]->NumberValue()));
}

NAN_MODULE_INIT(init) {
  Nan::SetMethod(target, "factorial", Factorial);
}

NODE_MODULE(factorial, init)

int factorial(int n) {
  if (n == 1) {
    return 1;
  } else {
    return factorial(n - 1) * n;
  }
}
```

There are 3 important modules.

`NAN_METHOD` is an implementation of method.

`NAN_MODULE_INIT` registers the method.

`NODE_MODULE` is entry point for this addon,
the first argument must be same as `target_name` in _binding.gyp_.

#### **Step 5**

Build the code by the following command.

```sh
$ node-gyp configure build
```

Then _factorial.node_ is created in _build/Release_ directory.

#### **Step 6**

Write some JavaScript code.

```js
const addon = require("bindings")("factorial.node")
// const addon = require('./build/Release/addon'); // no bindings module

console.log(addon.factorial(10)) // 3628800
```

I put the above code on GitHub repository: [Node.js Addon Sample](https://github.com/saitoxu/nodejs-addon-sample)

Thanks for reading, following steps are written in here.

[nodejs/node-addon-examples: Node.js C++ addon examples from http://nodejs.org/docs/latest/api/addons.html](https://github.com/nodejs/node-addon-examples)
