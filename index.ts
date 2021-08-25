type keys = string | number

type ObjectType = {
  [k in keys]?: any;
}

type ArrayType = {
  [index in keys]?: ObjectType | string | number;
}

type Source = ObjectType | ArrayType

function isArray(obj: Source): boolean {
  return Array.isArray(obj)
}

// 浅拷贝
function shadowClone(source: Source): Source {
  if (isArray(source)) {
    return source.slice()
  }
  return Object.assign({}, source)
}

function setIn(obj: Source, data: ObjectType): Source {
  const result: Source = shadowClone(obj)
  const cache: ObjectType = {}
  // data 不为空对象时
  if (data && Object.keys(data).length) {
    Object.keys(data).forEach((keys: string) => {
      const arr: Array<string> = keys.split('.')
      const last: string = arr.pop() || ''
      const len = arr.length
      let value = data[keys]
      let pointer
      let origin
      if (len) {
        let prev
        let cacheKey = ''
        for (let i = 0; i < len; i += 1) {
          const key: string = arr[i]
          if (i === 0) {
            cacheKey = key
            if (cache[cacheKey] === undefined) {
              origin = shadowClone(result[key])
              cache[cacheKey] = origin
            } else {
              origin = cache[cacheKey]
            }
            pointer = origin
            prev = pointer
          } else {
            cacheKey += `.${key}`
            if (cache[cacheKey] === undefined) {
              pointer = shadowClone(pointer[key])
              cache[cacheKey] = pointer
            } else {
              pointer = shadowClone(pointer[key])
            }
            prev[key] = pointer
            prev = pointer
          }
        }
        if (typeof value === 'function') {
          value = value(prev[last])
        }
        pointer[last] = value
        result[arr[0]] = origin
      } else {
        if (typeof value === 'function') {
          value = value(result[keys])
        }
        result[keys] = value
      }
    })
  }
  return result
}

function getIn(obj: Source, path: string): Source {
  let result = obj
  if (path) {
    const arr = path.split('.')
    for (const i in arr) {
      const key = arr[i].trim()
      if (result === undefined) {
        return result
      }
      result = result[key]
    }
  }
  return result
}


function getArray(obj: ArrayType, path: string) {
  let arr = getIn(obj, path)
  if (!isArray(arr)) {
    throw new Error(`${obj} ${path} is not an array`)
  }
  arr = shadowClone(arr)
  return arr
}

function setArray(obj: ArrayType, path: string, arr: ArrayType): ArrayType {
  if (!path) {
    return arr
  }
  const data = {
    [path]: arr
  }
  return setIn(obj, data)
}

function push(obj: ArrayType, path: string, data: ObjectType): ArrayType {
  const arr = getArray(obj, path)
  arr.push(data)
  return setArray(obj, path, arr)
}

function pop(obj: ArrayType, path: string): ArrayType {
  const arr = getArray(obj, path)
  arr.pop()
  return setArray(obj, path, arr)
}

function shift(obj: ArrayType, path: string): ArrayType {
  const arr = getArray(obj, path)
  arr.shift()
  return setArray(obj, path, arr)
}

function unshift(obj: ArrayType, path: string, data: ArrayType): ArrayType {
  const arr = getArray(obj, path)
  arr.unshift(data)
  return setArray(obj, path, arr)
}

function splice(
  obj: ArrayType,
  path: string,
  start: number,
  deleteCount: number,
  ...add: ObjectType[]
): ArrayType {
  const arr = getArray(obj, path)
  if (deleteCount === undefined) {
    deleteCount = arr.length - start
  }
  arr.splice(start, deleteCount, ...add)
  return setArray(obj, path, arr)
}

export { setIn, getIn, push, pop, shift, unshift, splice }
