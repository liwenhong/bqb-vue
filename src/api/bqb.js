'use strict'
import request from '@/utils/request'
import qs from 'qs'
import axios from 'axios'

const base_url = 'http://120.77.250.76:3000/api/' // 阿里云环境
// const base_url = 'http://127.0.0.1:3000/api/' // 本地环境
// const base_url = 'http://120.77.250.76:3000/api/'

/**
 * 上传图片
 * @param {} params 上传到参数
 */
export function addImage(data) {
  // return request({
  //   url:'file/addImg',
  //   method:'post',
  //   data:qs.stringify(data)
  // })
  return new Promise((resolve, reject) => {
    axios.post(base_url + 'file/addImg', qs.stringify(data))
      .then(function(response) {
        resolve(response)
      })
      .catch(function(response) {
        reject(response)
      })
  })
}

/**
 *
 * @param {删除图片--根据图片名称} f
 */
export function delImage(f) {
  return new Promise((resolve, reject) => {
    axios.post(base_url + 'file/delImg', qs.stringify({ id: f.uid, name: f.name })).then(res => {
      resolve(res)
    }).catch(err => {
      reject(err)
    })
  })
}

export function addImgType(name, ishot, istop) {
  return new Promise((resolve, reject) => {
    axios.post(base_url + 'imgtype/addImgType', qs.stringify({ name: name, ishot: ishot, istop: istop })).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}

/**
 * 增加关键词
 * @param {*} obj
 */
export function addSearchKey(obj) {
  return new Promise((resolve, reject) => {
    axios.post(base_url + 'search/addKeyWord', qs.stringify(obj)).then(res => {
      resolve(res)
    }).catch((error) => {
      reject(error)
    })
  })
}

/**
 * 获取关键字
 * @param {关键字类型} type
 * @param {数量} pagesize
 */
export function getKeyWord(type, pagesize) {
  return new Promise((resolve, reject) => {
    axios.get(base_url + 'search/getkeyword', { params: { typeId: type, pageSize: pagesize }}).then(res => {
      if (res.status == 200) {
        resolve(res.data)
      }
    }).catch(error => {
      reject(error)
    })
  })
}

export function delKeyWord(arr) {
  return new Promise((resolve, reject) => {
    axios.post(base_url + 'search/delKeyWord', qs.stringify({ arr: arr })).then(res => {
      if (res.status === 200) {
        resolve(res.data)
      }
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * 获取置顶数据
 * @param {当前页} curpage
 * @param {数量大小} pagesize
 */
export function getTopData(curpage, pagesize) {
  return new Promise((resolve, reject) => {
    axios.get(base_url + 'imgtype/getTopData', { params: { curpage: curpage, pagesize: pagesize }}).then(res => {
      if (res.status === 200) {
        resolve(res.data)
      } else {
        reject(res)
      }
    }).catch(error => {
      reject(error)
    })
  })
}

/**
 * 获取热门数据
 * @param {当前页} curpage
 * @param {数量大小} pagesize
 */
export function getHotData(curpage, pagesize) {
  return new Promise((resolve, reject) => {
    axios.get(base_url + 'imgtype/getHotData', { params: { curpage: curpage, pagesize: pagesize }}).then(res => {
      if (res.status === 200) {
        resolve(res.data)
      } else {
        reject(res)
      }
    }).catch(error => {
      reject(error)
    })
  })
}

/**
 * 获取置顶数据
 * @param {当前页} curpage
 * @param {数量大小} pagesize
 */
export function getNewData(curpage, pagesize) {
  return new Promise((resolve, reject) => {
    axios.get(base_url + 'file/getNewImg', { params: { curpage: curpage, pagesize: pagesize }}).then(res => {
      if (res.status === 200) {
        resolve(res.data)
      } else {
        reject(res)
      }
    }).catch(error => {
      reject(error)
    })
  })
}

/**
 * 添加素材类型（一级）
 * @param {素材一级名称} typename
 */
export function addImgSourceType(typename) {
  return new Promise((resolve, reject) => {
    axios.post(base_url + 'imgsourcetype/addImgSourceType', qs.stringify({ typename: typename })).then(res => {
      if (res.status === 200) {
        resolve(res.data)
      } else {
        reject(res.data)
      }
    }).catch(error => {
      reject(error)
    })
  })
}

/**
 * 添加素材
 * @param {*} object
 */
export function addImgSource(object) {
  return new Promise((resolve, reject) => {
    axios.post(base_url + 'imgsource/addImgSource', qs.stringify(object)).then(res => {
      if (res.status === 200) {
        resolve(res.data)
      } else {
        reject(res.data)
      }
    }).catch(error => {
      reject(error)
    })
  })
}

/**
 * 获取素材类型
 */
export function getSourceType() {
  return new Promise((resolve, reject) => {
    axios.get(base_url + 'imgsourcetype/getSourceTypeList').then(res => {
      if (res.status === 200) {
        resolve(res.data)
      } else {
        reject(res.data)
      }
    }).catch(error => {
      reject(error)
    })
  })
}

/**
 * 根据ID删除素材类型
 * @param {素材类型id } id
 */
export function delSourceType(id) {
  return new Promise((resolve, reject) => {
    axios.get(base_url + 'imgsourcetype/delSourceType', { params: { id: id }}).then(res => {
      if (res.status === 200) {
        resolve(res.data)
      }
    }).catch(error => {
      reject(error)
    })
  })
}

/**
 * 更改素材类型
 * @param {素材类型ID} id
 * @param {更改名称} newname
 */
export function updateSourceType(id, newname) {
  return new Promise((resolve, reject) => {
    axios.post(base_url + 'imgsourcetype/updateSourceType', qs.stringify({ id: id, newname: newname })).then(res => {
      if (res.status === 200) {
        resolve(res.data)
      } else {
        reject(res.data)
      }
    }).catch(error => {
      reject(error)
    })
  })
}

/**
 * 获得素材
 * @param {*} pagesize
 * @param {*} curpage
 */
export function getSourceList(pagesize, curpage) {
  return new Promise((resolve, reject) => {
    axios.get(base_url + 'imgsource/getSource', { params: { pagesize: pagesize, curpage: curpage }}).then(res => {
      if (res.status == 200) {
        resolve(res.data)
      } else {
        reject(res.data)
      }
    }).catch(error => {
      reject(error)
    })
  })
}

/**
 * 通过ID删除素材
 * @param {素材ID} id
 */
export function delSource(id) {
  return new Promise((resolve, reject) => {
    axios.post(base_url + 'imgsource/delSource', qs.stringify({ id: id })).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}

/**
 * 修改素材
 * @param {素材对象} obj
 */
export function updateSource(obj) {
  return new Promise((resolve, reject) => {
    axios.post(base_url + 'imgsource/updateSource', qs.stringify({ obj: obj })).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}

export function getGifLists(params) {
  return new Promise((resolve, reject) => {
    axios.get(base_url + 'gif/getGifSource', qs.stringify(params)).then(res => {
      resolve(res)
    }).catch(error => {
      reject(error)
    })
  })
}
