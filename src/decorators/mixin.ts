/**
 * @desc mixin decorator
 * @param {Array<Function>} mixins
 * @returns
 * @author ssruoyan
 */
function mixin(mixins: Array<Function>): Function {
  if (!mixins.length) {
    throw new SyntaxError('mixin decorator requires at least one mixin as an argument')
  }
  return function handleMixin(target) {
    for(let i = 0, len = mixins.length; i < len; i ++) {
      let pNames = Object.getOwnPropertyNames(mixins[i])

      // Symbol 类型的键值
      let sNames = Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(mixins[i]) : []
      let keys = pNames.concat(sNames)
      let descriptors = Object.getOwnPropertyDescriptors(mixins[i])

      for(let j = 0; j < keys.length; j ++) {
        const key = keys[j]
        !hasOwnProperty(key, target.prototype) && Object.defineProperty(target.prototype, key, descriptors[key])
      }
    }
  }
}

export default mixin