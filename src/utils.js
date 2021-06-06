export function removeComments(stylesheet) {
  return stylesheet.replace(/\/\*!.*\*\//g, "").trim();
}

export function splitOnNewLine(stylesheet) {
  return stylesheet.replace(/}/g, `}\n`).split("\n");
}

export function transformStylesheetToMap(rules) {

  return rules.reduce((acc, rule) => {
    const selectors = rule.replace(/(.*)({.*})/, "$1");
    const declarations =  rule.replace(/(.*)({.*})/, "$2");
    const isJustOneClass = selectors.search(",") === -1;
    const isCssClass = selectors => selectors.indexOf(".") !== -1;

    // ".b-white{border-color: white})}
    if (isJustOneClass && isCssClass(selectors)) {
      return {
        ...acc,
        [removeDotFrom(selectors)]: removeBracketsFrom(declarations),
      }
    }
    else {
      const splittedSelectors = selectors.split(",");
      // .border-box
      const cssClasses = splittedSelectors.filter(s => isCssClass(s));
      const parsedRule = cssClasses.reduce((accu, s) => {
        const o = Object.assign({}, {[removeDotFrom(s)]: removeBracketsFrom(declarations)});
        return {
          ...accu,
          ...o,
        };
      }, {});
      return { ...acc, ...parsedRule };
    }
  }, {});
}

function checkValidityOf(expectedClassName, actualClassName) {
  if (typeof expectedClassName === 'undefined') {
    return `The class ${actualClassName} doesn't exist in Tachyons stylesheet`;
  }

  return expectedClassName;
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

function removeDotFrom(selector) {
  return selector.replace('.', "");
}

function removeBracketsFrom(declaration) {
  return declaration.replace(/({)(.*)(})/, '$2;');
}
