export function removeComments(stylesheet) {
  return stylesheet.replace(/\/\*!.*\*\//g, "").trim();
}

export function splitOnNewLine(stylesheet) {
  return stylesheet.replace(/}/g, `}\n`).split("\n")
}

export function removeIfNotACssClass(maybeClassArray) {
  return maybeClassArray.filter(maybeClass => maybeClass.indexOf(".") !== -1)
}

export function handleRulesWithCommas(rules) {
  return rules.reduce((acc, selector, idx) => {
    const selectors = selector.replace(/(.*)({.*})/, "$1")

    if (selectors.search(",") === -1) {
      return acc + selector
    }
    else {
      const rule = selector.replace(/(.*)({.*})/, "$2")
      const splittedSelectors = selectors.split(",")
      return acc + splittedSelectors.map(s => `${s}${rule}`)
    }
  }, "")
}

export function transformToJsObject(cssRule) {
  const cssToObj = cssRule
    .replace(/,/g, ``) // remove commas
    .replace(/}/g, `}\n`) // add newline
    .replace(/\.(.*{)/g, '"$1') // remove point
    .replace(/({)(.*)(})/g, '": "$2;",') // add semicolon with value and comma
    .replace(/^\"/g,"{\"") // add opening {
    .replace(/\n/gm, "") // remove newline
    .replace(/,$/, "}"); // add closing }

  return JSON.parse(cssToObj)
}
