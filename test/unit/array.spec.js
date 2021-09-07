import {
  setIn, getIn, push, pop, shift, unshift, splice
} from '../../src'

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

const obj = {
  a: 1,
  b: 2,
}

const OUTER_LENGTH = o1.length
const INNER_LENGTH = o1[2].friends.length

describe('数组的操作 - setIn', () => {
  it('修改数组中的某个值', () => {
    const o2 = setIn(o1, { '1.age': 30 })
    expect(o1[1].age).toBe(25)
    expect(o2[1].age).toBe(30)
  })
  it('修改深层级的数组中的某个值', () => {
    const o2 = setIn(o1, { '2.friends.0.age': 4 })
    expect(o1[2].friends[0].age).toBe(3)
    expect(o2[2].friends[0].age).toBe(4)
  })
  it('同时修改数组中的多个值', () => {
    const o2 = setIn(o1, { '1.age': 30, '2.friends.0.age': 4 })
    expect(o1[1].age).toBe(25)
    expect(o2[1].age).toBe(30)
    expect(o1[2].friends[0].age).toBe(3)
    expect(o2[2].friends[0].age).toBe(4)
  })
})

describe('数组的操作 - getIn', () => {
  it('获取数组中的某个值', () => {
    const value = getIn(obj, 'a')
    expect(obj.a).toBe(value)
  })
})

describe('数组的操作 - push', () => {
  it('往数组 push 一个值', () => {
    const o2 = push(o1, '', {
      name: 'green',
      age: 28,
      admin: true
    })
    expect(o1.length).toBe(OUTER_LENGTH)
    expect(o2.length).toBe(OUTER_LENGTH + 1)
    expect(o2[3].admin).toBe(true)
    expect(o2[3].age).toBe(28)
  })
  it('往深层级的数组 push 一个值', () => {
    const o2 = push(o1, '2.friends', {
      name: 'blue',
      age: 11
    })
    expect(o1[2].friends.length).toBe(INNER_LENGTH)
    expect(o2[2].friends.length).toBe(INNER_LENGTH + 1)
    expect(o2[2].friends[INNER_LENGTH].age).toBe(11)
  })
})

describe('数组的操作 - pop', () => {
  it('往数组 pop 一个值', () => {
    const o2 = pop(o1)
    expect(o1.length).toBe(OUTER_LENGTH)
    expect(o2.length).toBe(OUTER_LENGTH - 1)
  })
  it('往深层级的数组 pop 一个值', () => {
    const o2 = pop(o1, '2.friends')
    expect(o1[2].friends.length).toBe(INNER_LENGTH)
    expect(o2[2].friends.length).toBe(INNER_LENGTH - 1)
    expect(o1[2].friends[0]).toBe(o2[2].friends[0])
  })
})

describe('数组的操作 - unshift', () => {
  it('往数组 unshift 一个值', () => {
    const o2 = unshift(o1, '', { name: 'yellow' })
    expect(o1.length).toBe(OUTER_LENGTH)
    expect(o2.length).toBe(OUTER_LENGTH + 1)
    expect(o2[0].name).toBe('yellow')
    expect(o1[0]).toBe(o2[1])
  })
  it('往深层级的数组 unshift 一个值', () => {
    const o2 = unshift(o1, '2.friends', { name: 'pink' })
    expect(o1[2].friends.length).toBe(INNER_LENGTH)
    expect(o2[2].friends.length).toBe(INNER_LENGTH + 1)
    expect(o2[2].friends[0].name).toBe('pink')
    expect(o1[2].friends[0]).toBe(o2[2].friends[1])
  })
})

describe('数组的操作 - shift', () => {
  it('往数组 shift 一个值', () => {
    const o2 = shift(o1)
    expect(o1.length).toBe(OUTER_LENGTH)
    expect(o2.length).toBe(OUTER_LENGTH - 1)
    expect(o1[1]).toBe(o2[0])
  })
  it('往深层级的数组 shift 一个值', () => {
    const o2 = shift(o1, '2.friends')
    expect(o1[2].friends.length).toBe(INNER_LENGTH)
    expect(o2[2].friends.length).toBe(INNER_LENGTH - 1)
    expect(o1[2].friends[1]).toBe(o2[2].friends[0])
  })
})

describe('数组的操作 - splice', () => {
  it('对数组 splice 操作（只删除）', () => {
    const o2 = splice(o1, '', 1)
    expect(o1.length).toBe(OUTER_LENGTH)
    expect(o2.length).toBe(1)
    expect(o1[0]).toBe(o2[0])

    const o3 = splice(o1, '', 1, 1)
    expect(o1.length).toBe(OUTER_LENGTH)
    expect(o3.length).toBe(OUTER_LENGTH - 1)
    expect(o1[0]).toBe(o3[0])
    expect(o1[2]).toBe(o3[1])
  })
  it('对数组 splice 操作（有删除，有插入）', () => {
    const o2 = splice(o1, '', 1, 1, { name: 'black' }, { name: 'white' })
    expect(o1.length).toBe(OUTER_LENGTH)
    expect(o2.length).toBe(OUTER_LENGTH + 1)
    expect(o1[0]).toBe(o2[0])
    expect(o1[2]).toBe(o2[3])
    expect(o2[1].name).toBe('black')
    expect(o2[2].name).toBe('white')
  })
  it('对数组 splice 操作（只插入）', () => {
    const o2 = splice(o1, '', 1, 0, { name: 'black' }, { name: 'white' })
    expect(o1.length).toBe(OUTER_LENGTH)
    expect(o2.length).toBe(OUTER_LENGTH + 2)
    expect(o1[0]).toBe(o2[0])
    expect(o1[1]).toBe(o2[3])
    expect(o2[1].name).toBe('black')
    expect(o2[2].name).toBe('white')
  })
  it('对深层级数组 splice 操作（只删除）', () => {
    const o2 = splice(o1, '2.friends', 1)
    expect(o1[2].friends.length).toBe(INNER_LENGTH)
    expect(o2[2].friends.length).toBe(INNER_LENGTH - 2)
    expect(o1[2].friends[0]).toBe(o2[2].friends[0])

    const o3 = splice(o1, '2.friends', 1, 1)
    expect(o1[2].friends.length).toBe(INNER_LENGTH)
    expect(o3[2].friends.length).toBe(INNER_LENGTH - 1)
    expect(o1[2].friends[0]).toBe(o3[2].friends[0])
    expect(o1[2].friends[2]).toBe(o3[2].friends[1])
  })
  it('对深层次数组 splice 操作（有删除，有插入）', () => {
    const o2 = splice(o1, '2.friends', 1, 1, { name: 'black' }, { name: 'white' })
    expect(o1[2].friends.length).toBe(INNER_LENGTH)
    expect(o2[2].friends.length).toBe(INNER_LENGTH + 1)
    expect(o1[2].friends[0]).toBe(o2[2].friends[0])
    expect(o1[2].friends[2]).toBe(o2[2].friends[3])
    expect(o2[2].friends[1].name).toBe('black')
    expect(o2[2].friends[2].name).toBe('white')
  })
  it('对深层次数组 splice 操作（只插入）', () => {
    const o2 = splice(o1, '2.friends', 1, 0, { name: 'black' }, { name: 'white' })
    expect(o1[2].friends.length).toBe(INNER_LENGTH)
    expect(o2[2].friends.length).toBe(INNER_LENGTH + 2)
    expect(o1[2].friends[0]).toBe(o2[2].friends[0])
    expect(o1[2].friends[1]).toBe(o2[2].friends[3])
    expect(o2[2].friends[1].name).toBe('black')
    expect(o2[2].friends[2].name).toBe('white')
  })
})
