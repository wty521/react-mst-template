import { observable, autorun, whyRun, action, toJS, } from 'mobx';
import React from 'react';

const obj = observable({
  a: 1,
  b: 2,
});
const ary = observable([
  1, 2, 3, 4, 5,
]);

const a = obj.a;

autorun(() => {
  console.log('nothing');
});

autorun(() => {
  console.log(obj.a, 'obj.a');
  whyRun();
});

autorun(() => {
  console.log(a, '-> a');
  whyRun();
});

autorun(() => {
  console.log(obj, 'obj');
});

// autorun(() => {
//   console.log(toJS(obj), 'mobx.toJS'); // toJS 创建了深克隆
// });

// autorun(() => {
//   console.log(JSON.stringify(obj), 'JSON- stringify');
// });

autorun(() => {
  console.log({ ...obj }, 'spread');
});

autorun(() => {
  setTimeout(() => {
    console.log(obj.a, 'async');
  }, 1000);
});

// if 判断
autorun(() => {
  console.log('if');
  if (obj.a === 2) {
    console.log(obj.b, 'if ---> bb');
    whyRun();
  }
});

autorun(() => {
  console.log(...ary);
});


// 1. 首先所有的 autorun 默认执行一遍，收集依赖。
// 2. 同步收集依赖，异步的没用。即 mobx 初始化的时候，没有收集到异步里的依赖
// 3. JSON 序列号，浅拷贝（对象拓展运算符号），toJS 创建深拷贝。数组的拓展运算符。都会触发 mobx 响应。
// 4. 出现 if 嵌套判断。如果判断条件跟 observable 的数据无关，不成立直接 pass。
// 5. 如果 if 语句中有依赖，比如 obj.a，那此函数在 obj.a 改变的时候，会执行。
// 6. 初始化的时候 if 判断，obj.a === 2 返回 false, obj.b 不执行。当触发 action，此函数会执行，obj.a === 2 的时候，
//    obj.b 访问。这种情况也会被收集依赖。因为每次 obj.a 改变，函数执行，当 if 语句通过，obj.b 访问会重新收集到。
//    从而我们可以得出，autorun 里面的函数，每次执行后是会计算依赖的，如果没有依赖，就剔除了。

const addA = () => {
  obj.a += 1;
};

const addB = () => {
  obj.b += 1;
};

const changeAry = () => {
  ary[0] += 1;
};

export default () => (
  <div>
    <div onClick={action(addA)}>Add-A</div>
    <div onClick={action(addB)}>Add-B</div>
    <div onClick={action(changeAry)}>CHANGE-ARY-0</div>
  </div>
);
