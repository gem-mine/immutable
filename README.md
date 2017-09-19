# zero-immutable

[![Build Status](https://travis-ci.org/caolvchong/zero-immutable.svg?branch=master)](https://travis-ci.org/caolvchong/zero-immutable)
[![Dependencies](https://david-dm.org/caolvchong/zero-immutable/status.svg)](https://david-dm.org/caolvchong/zero-immutable)

<img src="https://caolvchong.github.io/images/immutable.gif" />

## immutable的作用
* 为了更舒服的写 compare，例如 react 中 shouldComponentUpdate（如果使用 react-redux，这一步其实在 connect 时默认会处理）
* 更方便操作深层次级别的state结构，例如 redux reducer 中繁琐的 spread 操作
* 提高性能
* 不要去拍扁数据，基本和服务端一致

## imuutable 带来的问题
* 侵入式，访问 immutable 数据结构，需要 getIn 等新语法，例如 view 层数据访问，如果以后不需要或者换方案，重构代价大
* 体积大，其实你大部分只需要 fromJS，toJS，Map，List 等简单接口（当然也有seamless-immutable比较小，但不兼容 IE8，github上的图是不兼容 IE11，未深究）
* 新语法，需要学习一套新的 API 来操作 immutable 数据结构
* 思维负担，需要认清哪个对象是 immutable object，哪个对象是 native object

## zero-immutable 功能和优势
* 对深层级的 state 提供方便的操作
* 使用 native object，最大程度降低侵入式带来的问题，也不需要去分辨对象是否是 immutable
* 体积微乎其微
* 主API（setIn）一个，附加数组操作 push/pop/shift/unshift/splice，一共6个
* 兼容IE8 

安装：npm install zero-immutable --save

```javascript
// 例如有个 state 结构如下：
const state = {
  loading: false,
  offset: 0,
  limit: 20,
  data: [{
    id: 1,
    name: 'tom',
    address: {
      city: {
        id: 350100,
        name: '福州'
      }
    }
  }]
}

// 现在要将 state.data[0].address.city 改成 {id: 350200, name: '厦门'}

// 原先做法：
const newState = {
  ...state,
  data: [...data]
};
const item = {...newState.data[0]};
item.address = {...item.address};
item.address.city = {id: 350200, name: '厦门'};
newState.data[0] = item;

// 现在做法：
const newState = setIn(state, {
  'data.address.city': {id: 350200, name: '厦门'}
})
```

## API
* setIn(object, data)
* push(object, path, data)
* pop(object, path)
* unshift(object, path, data)
* shift(object, path)
* splice(object, path, deleteCount, ...add)

使用参见 test 目录下的代码，so easy!
