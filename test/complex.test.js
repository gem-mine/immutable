const assert = require('assert');
const ZI = require('../index');

const { setIn } = ZI;

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
    }
  ]
};

const o2 = setIn(o1, {
  'a.b.c': 2,
  'a.b.d.1': 5,
  g: 'poly',
  'i.1.address.city': {
    id: 350200,
    name: '厦门'
  },
  'j.k.l.m.n': 'inner'
});

describe('setIn', () => {
  it('返回的是一个新对象', () => {
    assert.notEqual(o1, o2);
  });
  it('a.b.c 的值由 1 被修改为 2', () => {
    assert.equal(1, o1.a.b.c);
    assert.equal(2, o2.a.b.c);
  });

  it('深层数组修改 a.b.d.1 值由 6 改为 5', () => {
    assert.equal(6, o1.a.b.d[1]);
    assert.equal(5, o2.a.b.d[1]);
    assert.notEqual(o1.a.b.d, o2.a.b.d);
  });

  it('没被修改的内部对象保留原来的引用', () => {
    assert.equal(o1.a.f, o2.a.f);
  });

  it('一个浅层值被修改 g 的值由 jery 改为 poly', () => {
    assert.equal('jerry', o1.g);
    assert.equal('poly', o2.g);
  });

  it('一个很深层次的对象被修改 i.1.address.city 对象被修改', () => {
    assert.equal(350100, o1.i[1].address.city.id);
    assert.equal(350200, o2.i[1].address.city.id);
    assert.notEqual(o1.i[1].address.city, o2.i[1].address.city);
    assert.notEqual(o1.i, o2.i);
    assert.notEqual(o1.i[1], o2.i[1]);
    assert.notEqual(o1.i[1].address, o2.i[1].address);
    assert.equal(o1.i[1].address.province, o2.i[1].address.province);
    assert.equal(o1.i[0], o2.i[0]);
    assert.equal(o1.i[0].address, o2.i[0].address);
    assert.equal(o1.i[0].address.city, o2.i[0].address.city);
  });

  it('一个很深层次的对象，且原先不存在，该节点会创建', () => {
    assert.equal(o2.j.k.l.m.n, 'inner');
  });
});
