export function removeComments(stylesheet) {
  return stylesheet.replace(/\/\*!.*\*\//g, "").trim();
}

export function splitOnNewLine(stylesheet) {
  return stylesheet.replace(/}/g, `}\n`).split("\n")
}

export function transformStylesheetToMap(rules) {

  return rules.reduce((acc, rule) => {
    const selectors = rule.replace(/(.*)({.*})/, "$1");
    const declarations =  rule.replace(/(.*)({.*})/, "$2");
    const isCssClass = selectors.indexOf(".") !== -1;
    const isJustOneClass = selectors.search(",") === -1;

    // ".b-white{border-color: white})}
    if (isJustOneClass && isCssClass) {
      return {
        ...acc,
        [selectors.replace(/(\.)(.*)/, '$2')]: declarations.replace(/({)(.*)(})/, '$2'),
      }
    }
    else {
      const declaration = rule.replace(/(.*)({.*})/, "$2")
      const splittedSelectors = selectors.split(",")
      // .border-box
      const onlyClass = splittedSelectors.filter(s => s.indexOf(".") !== -1)
      const parsedRule = onlyClass.reduce((accu, s) => {
        const o = Object.assign({}, {[s.replace(/(\.)(.*)/, '$2')]: declaration.replace(/({)(.*)(})/, '$2')});
        return {
          ...accu,
          ...o
        }
      }, {})
      return { ...acc, ...parsedRule }
    }
  }, {})
}

function checkValidityOf(expectedClassName, actualClassName) {
  if (typeof expectedClassName === 'undefined') {
    return `The class ${actualClassName} doesn't exist in Tachyons stylesheet`;
  } else {
    return expectedClassName;
  };
}

export function pickStylesFrom(classes, mapOfClasses) {
  if (classes === "") return "";
  const styles = classes.split(" ").filter(d => d !== '');

  if (styles.length > 1) {
    return styles.reduce((acc, style, idx) => {
      return `${acc}${checkValidityOf(mapOfClasses[style], style)}${idx === styles.length - 1 ? '' : '\n'}`;
    }, ``);
  }

  return checkValidityOf(mapOfClasses[styles]);
}
