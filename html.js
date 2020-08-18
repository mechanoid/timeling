/* global DocumentFragment */

const renderFragment = fragment => {
  return fragment.innerHTML
}

const renderArg = arg => {
  if (arg instanceof DocumentFragment) {
    const res = renderFragment(arg)
    console.log(res)
    return res
  } else if (arg instanceof Array) {
    return arg.map(renderArg).join('')
  }
  return arg
}

const renderTemplate = args => (val, index) => {
  const arg = args[index]
  return [val, renderArg(arg)]
}

export const html = (strings, ...args) => {
  const templateString = strings.flatMap(renderTemplate(args))
  return document.createRange().createContextualFragment(templateString.join(''))
}
