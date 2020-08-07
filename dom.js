/* global DocumentFragment */

const renderFragment = fragment => {
  const container = document.createElement('div')
  container.appendChild(fragment)
  return container.innerHTML
}

const renderArg = arg => {
  if (arg instanceof DocumentFragment) {
    return renderFragment(arg)
  } else if (arg instanceof Array) {
    return arg.map(renderArg).join('')
  }
  return arg
}

const renderTemplate = args => (val, index) => {
  const arg = args[index]
  return [val, renderArg(arg)]
}

export const dom = (strings, ...args) => {
  const templateString = strings.flatMap(renderTemplate(args))

  return document.createRange().createContextualFragment(templateString.join(''))
}
