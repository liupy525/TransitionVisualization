const storageKey = 'BEZIER'
const currentKey = 'CURRENT'
const compareKey = 'COMPARE'
const INIT_DATA = [{name:'ease', params:[0.25,0.1,0.25,1]},
                  {name:'linear', params:[0,0,1,1]},
                  {name:'ease-in', params:[0.42,0,1,1]},
                  {name:'ease-out', params:[0,0,0.58,1]},
                  {name:'ease-in-out', params:[0.42,0,0.58,1]}]

let storage = getLocalStorage()

function getLocalStorage() {
    if (localStorageSupported()) {
        return window.localStorage
    } else {
        return { // 不支持LocalStorage时，仿造一个
            _data: {},
            setItem(id, val) {
                return this._data[id] = String(val)
            },
            getItem(id) {
                return this._data.hasOwnProperty(id) ? this._data[id] : undefined
            },
            removeItem(id) {
                return delete this._data[id]
            },
            clear() {
                return this._data = {}
            }
        }
    }
}

function localStorageSupported() {
    let testKey = 'test',
        storage = window.localStorage

    try {
        storage.setItem(testKey, '1')
        storage.removeItem(testKey)
        return true
    } catch (error) {
        return false
    }
}

function saveTile(item, type='all') {
  if (type==='current') {
    storage.setItem(currentKey, JSON.stringify(item))
  } else {
    let tiles = getTiles()
    tiles.push(item)
    storage.setItem(storageKey, JSON.stringify(tiles))
  }
}

function getTiles(type='all') {
  if (type==='current') {
    let data = storage.getItem(currentKey)
    return data ? JSON.parse(data) : data
  } else {
    let data = storage.getItem(storageKey)
    if (data) {
      return JSON.parse(data)
    } else {
      storage.setItem(storageKey, JSON.stringify(INIT_DATA))
      return INIT_DATA
    }
  }
}

function removeTile(index) {
  let tiles = getTiles()
  tiles.splice(index, 1)
  storage.setItem(storageKey, JSON.stringify(tiles))
}

export default { saveTile, getTiles, removeTile }
