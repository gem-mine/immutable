## 概述

![immutable.gif](https://caolvchong.github.io/images/immutable.gif)

### 使用场景
1. 想快速获取深层级的 JSON 数据，但不想在链式上不断判断是否已经 undefined

```js
if (obj && typeof obj.user !== 'undefined' && typeof obj.user.data !== 'undefined') {
  // ...
}
```

2. 想快速使用 immutable 的能力，又考虑到引入库的大小、易用性、兼容性问题

[@gem-mine/immutable](https://github.com/gem-mine/immutable) 就非常适合以上场景，它可以被任意的 js 项目中引入使用

### immutable 的作用
- 为了更舒服的写 compare，例如 react 中 shouldComponentUpdate（如果使用 react-redux，这一步其实在 connect 时默认会处理）
- 更方便操作深层次级别的 state 结构，例如 redux reducer 中繁琐的 spread 操作
- 提高性能
- 不用去拍扁数据，基本和服务端一致

### immutable 带来的问题
- 侵入式。访问 immutable 数据结构，需要 getIn 等新语法，例如 view 层数据访问，如果以后不需要或者换方案，重构代价大
- 体积大。其实你大部分只需要 fromJS，toJS，Map，List 等简单接口
- 新语法。需要学习一套新的 API 来操作 immutable 数据结构
- 思维负担。需要认清哪个对象是 immutable object，哪个对象是 native object

### 功能和优势
- 对深层级的 state 提供方便的操作
- 使用 native object，最大程度降低侵入式带来的问题，也不需要去分辨对象是否是 immutable
- 体积微乎其微
- 主 API（getIn、setIn）仅两个，附加数组操作 push/pop/shift/unshift/splice，一共 7 个
- 兼容性好

## 安装

```shell
npm i @gem-mine/immutable -S // 安装
```

## 快速上手

```js
import { setIn } from '@gem-mine/immutable'
const state = {
  loading: false,
  offset: 0,
  limit: 20,
  data: [
    {
      id: 1,
      name: 'tom',
      address: {
        city: {
          id: 350100,
          name: '福州'
        }
      }
    }
  ]
}

// 现在要将 state.data[0].address.city 改成 {id: 350200, name: '厦门'}

// 原先做法：
const newState = {
  ...state,
  data: [...data]
}
const item = { ...newState.data[0] }
item.address = { ...item.address }
item.address.city = { id: 350200, name: '厦门' }
newState.data[0] = item

// 现在做法：
const newState = setIn(state, {
  'data.address.city': { id: 350200, name: '厦门' }
})
```
## API

API 的更详细用法可以查看单元测试用例：[@gem-mine/immutable 单元测试](https://github.com/gem-mine/immutable/tree/master/test/unit)

### getIn(object, keyPath)
从 object 中获取对应路径的值，只要中间取不到值就立即返回 undefined

```js
import { getIn } from '@gem-mine/immutable'

const obj = {
  user: {
    data: {
      name: 'tom',
      age: 22
    }
  }
}

getIn(obj, 'user.data.age') // 22
getIn(obj, 'user.data.color') // undefined
getIn(obj, 'user.info.name') // undefined
```

### setIn(object, data)
immutable 能力，设置 object 的值

```js
import { setIn } from '@gem-mine/immutable'

const obj = {
  user: {
    data: {
      name: 'tom',
      age: 22
    }
  }
}

const newObj1 = setIn(obj, {
  'user.data.name': 'jerry'
})

const newObj2 = setIn(obj, {
  'user.data': {
    name: 'poly',
    age: 25
  }
})
```
### 数组操作
数组操作相对来说使用频率较低，具体可以参见单元测试用例：
[@gem-mine/immutable 数组操作](https://github.com/gem-mine/immutable/tree/master/test/unit/array.spec.js)
- push(array, path, data)
- pop(array, path)
- unshift(array, path, data)
- shift(array, path)
- splice(array, path, deleteCount, ...add)


## 更新记录

### 2.0.0
`2021-09-07`
- refactor: typescript重构