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

      // TODO: Symbol 类型的键值
      // let sNames: Symbol[] = Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(mixins[i]) : []
      let keys = [].concat.call(pNames)

      for(let j = 0; j < keys.length; j ++) {
        const key = keys[j]
        !target.prototype.hasOwnProperty(key) && Object.defineProperty(target.prototype, key, Object.getOwnPropertyDescriptor(mixins[i], key))
      }
    }
  }
}

export default mixin