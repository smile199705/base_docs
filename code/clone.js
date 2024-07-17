function shallowClone(obj){
     if(typeof obj !== 'object' || obj === null){         return obj
     }
     let clone = Array.isArray(obj) ? [] : {}
     for(let key in obj){
         if(obj.hasOwnProperty(key)){
             clone[key] = obj[key]
         }
     }
     return clone

}


function deepClone(obj){
    if(typeof obj !== 'object' && obj === null) {
        return obj
    }
    const cloneObj = Array.isArray(obj) ? [] : {}
    for (const objKey in obj) {
        if(obj.hasOwnProperty(objKey)){
            cloneObj[objKey] = deepClone(obj[objKey])
        }
    }
    return cloneObj
}
