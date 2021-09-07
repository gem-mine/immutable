import { getIn } from '../src'

const obj = {
  user: {
    data: {
      name: 'tom',
      age: 22
    }
  }
}

console.log(getIn(obj, 'user.data.age'))// 22
console.log(getIn(obj, 'user.data.color')) // undefined
console.log(getIn(obj, 'user.info.name')) // undefined
