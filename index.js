function isArray(obj) {
  if (Array.isArray) {
    return Array.isArray(obj)
  }
  if (Object.prototype.toString.call(obj) === '[object Array]') {
    return true
  }
  return false
}

function shadowClone(source) {
  if (isArray(source)) {
    return source.slice()
  }
  return Object.assign({}, source)
}

function setIn(obj, data) {
  const result = shadowClone(obj)
  const cache = {}
  if (data) {
    Object.keys(data).forEach(keys => {
      const arr = keys.split('.')
      const last = arr.pop()
      const len = arr.length
      let value = data[keys]
      let pointer
      let origin
      if (len) {
        let prev
        let cacheKey
        for (let i = 0; i < len; i += 1) {
          const key = arr[i]
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

function getIn(obj, path) {
  let result = obj
  if (path) {
    const arr = path.split('.')
    for (let i = 0; i < arr.length; i += 1) {
      const key = arr[i].trim()
      if (result === undefined) {
        return result
      }
      result = result[key]
    }
  }
  return result
}

function getArray(obj, path) {
  let arr = getIn(obj, path)
  if (!isArray(arr)) {
    throw new Error(`${obj} ${path} is not an array`)
  }
  arr = shadowClone(arr)
  return arr
}

function setArray(obj, path, arr) {
  if (!path) {
    return arr
  }
  const data = {
    [path]: arr
  }
  return setIn(obj, data)
}

function push(obj, path, data) {
  const arr = getArray(obj, path)
  arr.push(data)
  return setArray(obj, path, arr)
}

function pop(obj, path) {
  const arr = getArray(obj, path)
  arr.pop()
  return setArray(obj, path, arr)
}

function shift(obj, path) {
  const arr = getArray(obj, path)
  arr.shift()
  return setArray(obj, path, arr)
}

function unshift(obj, path, data) {
  const arr = getArray(obj, path)
  arr.unshift(data)
  return setArray(obj, path, arr)
}

function splice(obj, path, start, deleteCount, ...add) {
  const arr = getArray(obj, path)
  if (deleteCount === undefined) {
    deleteCount = arr.length - start
  }
  arr.splice(start, deleteCount, ...add)
  return setArray(obj, path, arr)
}

exports.setIn = setIn
exports.getIn = getIn
exports.push = push
exports.pop = pop
exports.shift = shift
exports.unshift = unshift
exports.splice = splice
