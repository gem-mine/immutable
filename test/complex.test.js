import { setIn, getIn, push, pop, shift, unshift, splice } from '../index'

const o1 = {
  a: {
    b: {
      c: 1,
      d: [2, 6, 9],
      e: 'tom'
    },
    f: {
      t: false
    }
  },
  g: 'jerry',
  h: 10,
  i: [
    {
      name: 'lucy',
      age: 22,
      address: {
        province: {
          id: 110000,
          name: '北京'
        },
        city: {
          id: 110000,
          name: '北京'
        }
      }
    },
    {
      name: 'jim',
      age: 25,
      address: {
        province: {
          id: 350000,
          name: '福建'
        },
        city: {
          id: 350100,
          name: '福州'
        }
      }
    },
    {
      name: 'miky',
      age: 18
    }
  ]
}

const o2 = setIn(o1, {
  'a.b.c': 2,
  'a.b.d.1': 5,
  g: 'poly',
  'i.1.address.city': {
    id: 350200,
    name: '厦门'
  },
  'j.k.l.m.n': 'inner',
  'i.2.age': v => v + 1
})

describe('setIn', () => {
  it('返回的是一个新对象', () => {
    expect(o1).not.toBe(o2)
  })
  it('a.b.c 的值由 1 被修改为 2', () => {
    expect(1).toBe(o1.a.b.c)
    expect(2).toBe(o2.a.b.c)
  })

  it('深层数组修改 a.b.d.1 值由 6 改为 5', () => {
    expect(6).toBe(o1.a.b.d[1])
    expect(5).toBe(o2.a.b.d[1])
    expect(o1.a.b.d).not.toBe(o2.a.b.d)
  })

  it('没被修改的内部对象保留原来的引用', () => {
    expect(o1.a.f).toBe(o2.a.f)
  })

  it('一个浅层值被修改 g 的值由 jery 改为 poly', () => {
    expect('jerry').toBe(o1.g)
    expect('poly').toBe(o2.g)
  })

  it('一个很深层次的对象被修改 i.1.address.city 对象被修改', () => {
    expect(350100).toBe(o1.i[1].address.city.id)
    expect(350200).toBe(o2.i[1].address.city.id)
    expect(o1.i[1].address.city).not.toBe(o2.i[1].address.city)
    expect(o1.i).not.toBe(o2.i)
    expect(o1.i[1]).not.toBe(o2.i[1])
    expect(o1.i[1].address).not.toBe(o2.i[1].address)
    expect(o1.i[1].address.province).toBe(o2.i[1].address.province)
    expect(o1.i[0]).toBe(o2.i[0])
    expect(o1.i[0].address).toBe(o2.i[0].address)
    expect(o1.i[0].address.city).toBe(o2.i[0].address.city)
  })

  it('一个很深层次的对象，且原先不存在，该节点会创建', () => {
    expect(o2.j.k.l.m.n).toBe('inner')
  })

  it('值使用函数的情况，将会被执行，并用返回值作为新的值', () => {
    expect(o1.i[2].age).toBe(18)
    expect(o2.i[2].age).toBe(19)
  })
})
