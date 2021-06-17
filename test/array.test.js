import assert from 'assert'
import { setIn, getIn, push, pop, shift, unshift, splice } from '../index'

const o1 = [
  {
    name: 'lucy',
    age: 22
  },
  {
    name: 'jim',
    age: 25
  },
  {
    name: 'lily',
    age: 13,
    friends: [
      {
        name: 'poly',
        age: 3
      },
      {
        name: 'jerry',
        age: 14
      },
      {
        name: 'miky',
        age: 14
      }
    ]
  }
]

const n1 = [1, 2, 3]

const obj = {
  a: 1,
  b: 2,
}

const OUTER_LENGTH = o1.length
const INNER_LENGTH = o1[2].friends.length

describe('数组的操作 - setIn', () => {
  it('修改数组中的某个值', () => {
    const o2 = setIn(o1, { '1.age': 30 })
    assert.equal(o1[1].age, 25)
    assert.equal(o2[1].age, 30)
  })
  it('修改深层级的数组中的某个值', () => {
    const o2 = setIn(o1, { '2.friends.0.age': 4 })
    assert.equal(o1[2].friends[0].age, 3)
    assert.equal(o2[2].friends[0].age, 4)
  })
  it('同时修改数组中的多个值', () => {
    const o2 = setIn(o1, { '1.age': 30, '2.friends.0.age': 4 })
    assert.equal(o1[1].age, 25)
    assert.equal(o2[1].age, 30)
    assert.equal(o1[2].friends[0].age, 3)
    assert.equal(o2[2].friends[0].age, 4)
  })
  it('修改number数组中的某个值', () => {
    const n2 = setIn(n1, { '0': 30 })
    assert.equal(n1[0], 1)
    assert.equal(n2[0], 30)
  })
  it('修改对象中的某个值', () => {
    const obj2 = setIn(obj, { 'a': 10 })
    assert.equal(obj['a'], 1)
    assert.equal(obj2['a'], 10)
  })
})

describe('数组的操作 - getIn', () => {
  it('获取数组中的某个值', () => {
    const value = getIn(obj, 'a')
    console.log(value)
  })
})

describe('数组的操作 - push', () => {
  it('往数组 push 一个值', () => {
    const o2 = push(o1, '', {
      name: 'green',
      age: 28,
      admin: true
    })
    assert.equal(o1.length, OUTER_LENGTH)
    assert.equal(o2.length, OUTER_LENGTH + 1)
    assert.equal(o2[3].admin, true)
    assert.equal(o2[3].age, 28)
  })
  it('往深层级的数组 push 一个值', () => {
    const o2 = push(o1, '2.friends', {
      name: 'blue',
      age: 11
    })
    assert.equal(o1[2].friends.length, INNER_LENGTH)
    assert.equal(o2[2].friends.length, INNER_LENGTH + 1)
    assert.equal(o2[2].friends[INNER_LENGTH].age, 11)
  })
})

describe('数组的操作 - pop', () => {
  it('往数组 pop 一个值', () => {
    const o2 = pop(o1)
    assert.equal(o1.length, OUTER_LENGTH)
    assert.equal(o2.length, OUTER_LENGTH - 1)
  })
  it('往深层级的数组 pop 一个值', () => {
    const o2 = pop(o1, '2.friends')
    assert.equal(o1[2].friends.length, INNER_LENGTH)
    assert.equal(o2[2].friends.length, INNER_LENGTH - 1)
    assert.equal(o1[2].friends[0], o2[2].friends[0])
  })
})

describe('数组的操作 - unshift', () => {
  it('往数组 unshift 一个值', () => {
    const o2 = unshift(o1, '', { name: 'yellow' })
    assert.equal(o1.length, OUTER_LENGTH)
    assert.equal(o2.length, OUTER_LENGTH + 1)
    assert.equal(o2[0].name, 'yellow')
    assert.equal(o1[0], o2[1])
  })
  it('往深层级的数组 unshift 一个值', () => {
    const o2 = unshift(o1, '2.friends', { name: 'pink' })
    assert.equal(o1[2].friends.length, INNER_LENGTH)
    assert.equal(o2[2].friends.length, INNER_LENGTH + 1)
    assert.equal(o2[2].friends[0].name, 'pink')
    assert.equal(o1[2].friends[0], o2[2].friends[1])
  })
})

describe('数组的操作 - shift', () => {
  it('往数组 shift 一个值', () => {
    const o2 = shift(o1)
    assert.equal(o1.length, OUTER_LENGTH)
    assert.equal(o2.length, OUTER_LENGTH - 1)
    assert.equal(o1[1], o2[0])
  })
  it('往深层级的数组 shift 一个值', () => {
    const o2 = shift(o1, '2.friends')
    assert.equal(o1[2].friends.length, INNER_LENGTH)
    assert.equal(o2[2].friends.length, INNER_LENGTH - 1)
    assert.equal(o1[2].friends[1], o2[2].friends[0])
  })
})

describe('数组的操作 - splice', () => {
  it('对数组 splice 操作（只删除）', () => {
    const o2 = splice(o1, '', 1)
    assert.equal(o1.length, OUTER_LENGTH)
    assert.equal(o2.length, 1)
    assert.equal(o1[0], o2[0])

    const o3 = splice(o1, '', 1, 1)
    assert.equal(o1.length, OUTER_LENGTH)
    assert.equal(o3.length, OUTER_LENGTH - 1)
    assert.equal(o1[0], o3[0])
    assert.equal(o1[2], o3[1])
  })
  it('对数组 splice 操作（有删除，有插入）', () => {
    const o2 = splice(o1, '', 1, 1, { name: 'black' }, { name: 'white' })
    assert.equal(o1.length, OUTER_LENGTH)
    assert.equal(o2.length, OUTER_LENGTH + 1)
    assert.equal(o1[0], o2[0])
    assert.equal(o1[2], o2[3])
    assert.equal(o2[1].name, 'black')
    assert.equal(o2[2].name, 'white')
  })
  it('对数组 splice 操作（只插入）', () => {
    const o2 = splice(o1, '', 1, 0, { name: 'black' }, { name: 'white' })
    assert.equal(o1.length, OUTER_LENGTH)
    assert.equal(o2.length, OUTER_LENGTH + 2)
    assert.equal(o1[0], o2[0])
    assert.equal(o1[1], o2[3])
    assert.equal(o2[1].name, 'black')
    assert.equal(o2[2].name, 'white')
  })
  it('对深层级数组 splice 操作（只删除）', () => {
    const o2 = splice(o1, '2.friends', 1)
    assert.equal(o1[2].friends.length, INNER_LENGTH)
    assert.equal(o2[2].friends.length, INNER_LENGTH - 2)
    assert.equal(o1[2].friends[0], o2[2].friends[0])

    const o3 = splice(o1, '2.friends', 1, 1)
    assert.equal(o1[2].friends.length, INNER_LENGTH)
    assert.equal(o3[2].friends.length, INNER_LENGTH - 1)
    assert.equal(o1[2].friends[0], o3[2].friends[0])
    assert.equal(o1[2].friends[2], o3[2].friends[1])
  })
  it('对深层次数组 splice 操作（有删除，有插入）', () => {
    const o2 = splice(o1, '2.friends', 1, 1, { name: 'black' }, { name: 'white' })
    assert.equal(o1[2].friends.length, INNER_LENGTH)
    assert.equal(o2[2].friends.length, INNER_LENGTH + 1)
    assert.equal(o1[2].friends[0], o2[2].friends[0])
    assert.equal(o1[2].friends[2], o2[2].friends[3])
    assert.equal(o2[2].friends[1].name, 'black')
    assert.equal(o2[2].friends[2].name, 'white')
  })
  it('对深层次数组 splice 操作（只插入）', () => {
    const o2 = splice(o1, '2.friends', 1, 0, { name: 'black' }, { name: 'white' })
    assert.equal(o1[2].friends.length, INNER_LENGTH)
    assert.equal(o2[2].friends.length, INNER_LENGTH + 2)
    assert.equal(o1[2].friends[0], o2[2].friends[0])
    assert.equal(o1[2].friends[1], o2[2].friends[3])
    assert.equal(o2[2].friends[1].name, 'black')
    assert.equal(o2[2].friends[2].name, 'white')
  })
})
