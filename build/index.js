'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function isArray(obj) {
  if (Array.isArray) {
    return Array.isArray(obj);
  }
  if (Object.prototype.toString.call(obj) === '[object Array]') {
    return true;
  }
  return false;
}

function shadowClone(source) {
  if (isArray(source)) {
    return source.slice();
  }
  return _extends({}, source);
}

function setIn(obj, data) {
  var result = shadowClone(obj);
  var cache = {};
  if (data) {
    Object.keys(data).forEach(function (keys) {
      var arr = keys.split('.');
      var last = arr.pop();
      var len = arr.length;
      var value = data[keys];
      var pointer = void 0;
      var origin = void 0;
      if (len) {
        var prev = void 0;
        var cacheKey = void 0;
        for (var i = 0; i < len; i += 1) {
          var key = arr[i];
          if (i === 0) {
            cacheKey = key;
            if (cache[cacheKey] === undefined) {
              origin = shadowClone(result[key]);
              cache[cacheKey] = origin;
            } else {
              origin = cache[cacheKey];
            }
            pointer = origin;
            prev = pointer;
          } else {
            cacheKey += '.' + key;
            if (cache[cacheKey] === undefined) {
              pointer = shadowClone(pointer[key]);
              cache[cacheKey] = pointer;
            } else {
              pointer = shadowClone(pointer[key]);
            }
            prev[key] = pointer;
            prev = pointer;
          }
        }
        if (typeof value === 'function') {
          value = value(prev[last]);
        }
        pointer[last] = value;
        result[arr[0]] = origin;
      } else {
        if (typeof value === 'function') {
          value = value(result[keys]);
        }
        result[keys] = value;
      }
    });
  }
  return result;
}

function getIn(obj, path) {
  var result = obj;
  if (path) {
    var arr = path.split('.');
    for (var i = 0; i < arr.length; i += 1) {
      var key = arr[i].trim();
      if (result === undefined) {
        return result;
      }
      result = result[key];
    }
  }
  return result;
}

function getArray(obj, path) {
  var arr = getIn(obj, path);
  if (!isArray(arr)) {
    throw new Error(obj + ' ' + path + ' is not an array');
  }
  arr = shadowClone(arr);
  return arr;
}

function setArray(obj, path, arr) {
  if (!path) {
    return arr;
  }
  var data = _defineProperty({}, path, arr);
  return setIn(obj, data);
}

function push(obj, path, data) {
  var arr = getArray(obj, path);
  arr.push(data);
  return setArray(obj, path, arr);
}

function pop(obj, path) {
  var arr = getArray(obj, path);
  arr.pop();
  return setArray(obj, path, arr);
}

function shift(obj, path) {
  var arr = getArray(obj, path);
  arr.shift();
  return setArray(obj, path, arr);
}

function unshift(obj, path, data) {
  var arr = getArray(obj, path);
  arr.unshift(data);
  return setArray(obj, path, arr);
}

function splice(obj, path, start, deleteCount) {
  var arr = getArray(obj, path);
  if (deleteCount === undefined) {
    deleteCount = arr.length - start;
  }

  for (var _len = arguments.length, add = Array(_len > 4 ? _len - 4 : 0), _key = 4; _key < _len; _key++) {
    add[_key - 4] = arguments[_key];
  }

  arr.splice.apply(arr, [start, deleteCount].concat(add));
  return setArray(obj, path, arr);
}

exports.setIn = setIn;
exports.getIn = getIn;
exports.push = push;
exports.pop = pop;
exports.shift = shift;
exports.unshift = unshift;
exports.splice = splice;