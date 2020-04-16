const app = (() => {
  let stylesheet = "";

  function loadTachyonsStylesheet() {    
    fetch("https://unpkg.com/tachyons@4.10.0/css/tachyons.min.css")
      .then(r => r.text())
      .then(tachyonsStyles => {
        stylesheet = tachyonsStyles
      })
      .catch(e => window.alert("failed to load tachyons styles.\nPlease refresh the browser"));
  }

  function transformToObject(stylesheet) {
    const a = removeComments(stylesheet)
    const b = splitOnNewLine(a)
    const c = removeIfNotACssClass(b)
    const d = handleRulesWithCommas(c)
    const f = transformToJsObject(d)
    console.log({ f })


    //return JSON.parse(f);
  }

  function checkValidityOf(expectedClassName, actualClassName) {
    if (typeof expectedClassName === 'undefined') {
      return `The class ${actualClassName} doesn't exist in Tachyons stylesheet`;
    } else {
      return expectedClassName;
    };
  }

  function pickStylesFrom(classnames, stylesheet) {
    if (classnames === "") return "";

    const stylesMap = transformToObject(stylesheet);
    const styles = classnames.split(" ").filter(d => d !== '');

    if (styles.length > 1) {
      return styles.reduce((acc, style, i) => {
        return `${acc}${checkValidityOf(stylesMap[style], style)}${i === styles.length - 1 ? "" : "\n"}`
      }, "");
    };
    return checkValidityOf(stylesMap[styles]);
  }

  function handleInput() {
    document.getElementById("new-rules").textContent = '';

    const classesToTranslate = document.getElementById("translate").value;
    const rules = pickStylesFrom(classesToTranslate, stylesheet);
    rules.split("\n").map(rule => {
      return document.getElementById("new-rules").innerHTML += `<span class="db mv2 ph3">${rule.replace(/"/g, "")}</span>`;
    });

    copyToClipboard(`.tachyonsIsAwesome {
    ${rules}
    }`)
  }

  function copyToClipboard(classes) {
    navigator.clipboard.writeText(classes)
  }

  loadTachyonsStylesheet()

function removeComments(stylesheet) {
  return stylesheet.replace(/\/\*!.*\*\//g, "").trim();
}

function splitOnNewLine(stylesheet) {
  return stylesheet.replace(/}/g, `}\n`).split("\n")
}

function removeIfNotACssClass(maybeClassArray) {
  return maybeClassArray.filter(maybeClass => maybeClass.indexOf(".") !== -1)
}

function handleRulesWithCommas(rules) {
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

function transformToJsObject(cssRule) {
  const cssToObj = cssRule
    .replace(/,/g, ``) // remove commas
    //.replace(/}/g, `}\n`) // add newline
    //.replace(/\.(.*{)/g, '"$1') // remove point
    //.replace(/({)(.*)(})/g, '": "$2;",') // add semicolon with value and comma
    //.replace(/^\"/g,"{\"") // add opening {
    //.replace(/\n/gm, "") // remove newline
    //.replace(/,$/, "}"); // add closing }
  console.log({ cssToObj })

    //return JSON.parse(cssToObj)
}

  return {
    handleInput,
  }
})()
