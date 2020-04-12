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
    const parsedStyles = stylesheet
      .replace(/\/\*!.*\*\//g, "")
      .replace(/}/g, `}\n`)
      .replace(/\.(.*{)/g, '"$1')
      .replace(/({)(.*)(})/g, '": "$2;",')
      .replace(/^(?!\").*\",*/gm, "")
      .replace(/"cf:after,.cf:before": "content:" ";display:table;",/, "")
      .replace(/.*content:"".*,/, "")
      .replace(/{/g, "")
      .replace(/}/g, "")
      .replace(/^\s*\n/gm, "")
      .replace(/^\"/,"{\"")
      .replace(/("v-btm-l": "vertical-align:bottom;"),/, "$1}");

    return JSON.parse(parsedStyles);
  }

  function checkValidityOf(expectedClassName, actualClassName) {
    if (typeof expectedClassName === 'undefined') {
      return `The class ${actualClassName} doesn't exist in Tachyons stylesheet`;
    } else {
      return expectedClassName;
    };
  }

  function pickStylesFrom(classnames, stylesheet) {
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

  return {
    handleInput,
  }
})()
