import { removeComments, splitOnNewLine, transformStylesheetToMap , pickStylesFrom } from './utils';

window.addEventListener('load', function() {
  let stylesheet = "";

  function loadTachyonsStylesheet() {
    fetch("https://unpkg.com/tachyons@4.10.0/css/tachyons.min.css")
      .then(r => r.text())
      .then(tachyonsStyles => {
        stylesheet =  transformStylesheetToMap(splitOnNewLine(removeComments(tachyonsStyles)));
      })
      .catch(e => console.error("failed to load tachyons styles.\nPlease refresh the browser", e));
  }

  loadTachyonsStylesheet();

  function copyToClipboard(classes) {
    navigator.clipboard.writeText(classes);
  }

  document.getElementById("translate").addEventListener("keyup", function() {
    document.getElementById("new-rules").textContent = '';
    const classesToTranslate = document.getElementById("translate").value;
    const rules = pickStylesFrom(classesToTranslate, stylesheet);

    rules.split("\n").map(rule => {
      return document.getElementById("new-rules").innerHTML += `<span class="db mv2 ph3">${rule}</span>`;
    });

    copyToClipboard(`.tachyonsIsAwesome {
    ${rules}
    }`);
  });
})
