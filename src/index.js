import { removeComments, splitOnNewLine, removeIfNotACssClass, handleRulesWithCommas, transformToJsObject } from './utils'

window.addEventListener('load', function () {

let stylesheet = "";
function loadTachyonsStylesheet() {    
  fetch("https://unpkg.com/tachyons@4.10.0/css/tachyons.min.css")
    .then(r => r.text())
    .then(tachyonsStyles => {
      stylesheet = tachyonsStyles
    })
    .catch(e => window.alert("failed to load tachyons styles.\nPlease refresh the browser"));
}

loadTachyonsStylesheet()


function transformToObject(stylesheet) {
  const a = removeComments(stylesheet)
  const b = splitOnNewLine(a)
  const c = removeIfNotACssClass(b)
  const d = handleRulesWithCommas(c)
  const f = transformToJsObject(d)
  console.log({ f })
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


function copyToClipboard(classes) {
  navigator.clipboard.writeText(classes)
}

document.getElementById("translate").addEventListener("keyup", function() {
  document.getElementById("new-rules").textContent = '';

  const classesToTranslate = document.getElementById("translate").value;
  const rules = pickStylesFrom(classesToTranslate, stylesheet);
  rules.split("\n").map(rule => {
    return document.getElementById("new-rules").innerHTML += `<span class="db mv2 ph3">${rule.replace(/"/g, "")}</span>`;
  });

  copyToClipboard(`.tachyonsIsAwesome {
    ${rules}
    }`)
}); 

})
