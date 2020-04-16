import { removeComments, splitOnNewLine, removeIfNotACssClass, handleRulesWithCommas, rebuildStylesheet, transformToJsObject, pickStylesFrom } from '../src/index.js'

describe('transformToObject should', () => {
  xtest('transform css classes to a JavaScript object', () => {
    const stylesheet = `
.ma0 { margin: 0; }
.ma1 { margin: .25rem; }
.ma2 { margin: .5rem; }
.ma3 { margin: 1rem; }
.ma4 { margin: 2rem; }
.ma5 { margin: 4rem; }
.ma6 { margin: 8rem; }
`

const actual = transformToObject(stylesheet);

const expected = {
  ma0: "margin: 0;",
  ma1: "margin: .25rem;",
  ma2: "margin: .5rem;",
  ma3: "margin: 1rem;",
  ma4: "margin: 2rem;",
  ma5: "margin: 4rem;",
  ma6: "margin: 8rem;"
}

expect(actual).toEqual(expected)
  })
})

describe('pickStylesFrom should', () => {
  xtest('return the value of the object representing css class', () => {
    const stylesheet = `
.ma0 { margin: 0; }
.ma1 { margin: .25rem; }
.ma2 { margin: .5rem; }
.ma3 { margin: 1rem; }
.ma4 { margin: 2rem; }
.ma5 { margin: 4rem; }
.ma6 { margin: 8rem; }
`
const actual = pickStylesFrom('ma0', stylesheet)

expect(actual).toEqual("margin: 0;")
   });

  xtest('return the values of the object representing css classes', () => {
    const stylesheet = `
.ma0 { margin: 0; }
.ma1 { margin: .25rem; }
.ma2 { margin: .5rem; }
.ma3 { margin: 1rem; }
.ma4 { margin: 2rem; }
.ma5 { margin: 4rem; }
.ma6 { margin: 8rem; }
`
const actual = pickStylesFrom('ma0 ma3 ma6', stylesheet)

expect(actual).toEqual(`"margin: 0;"\n"margin: 1rem;"\n"margin: 8rem;"`)
   });
});





describe('removeComments should', () => {
  test('remove all comments from css file', () => {
    const css = `
    /*! TACHYONS v4.9.1 | http://tachyons.io */
/*! normalize.css v8.0.0 | MIT License | github.com/necolas/normalize.css */html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace,monospace;font-size:1em}a{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;-webkit-text-decoration:underline dotted;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details{display:block}summary{display:list-item}[hidden],template{display:none}.border`

    const expected = `html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace,monospace;font-size:1em}a{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;-webkit-text-decoration:underline dotted;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details{display:block}summary{display:list-item}[hidden],template{display:none}.border`
  const actual = removeComments(css)

  expect(actual).toEqual(expected)
});
});

describe('splitOnNewLine should', () => {
  test('return an array containing all the styles', () => {
    const css = `html{line-height:1.15;-webkit-text-size-adjust:100%}body{margin:0}h1{font-size:2em;margin:.67em 0}hr{box-sizing:content-box;height:0;overflow:visible}pre{font-family:monospace,monospace;font-size:1em}a{background-color:transparent}abbr[title]{border-bottom:none;text-decoration:underline;-webkit-text-decoration:underline dotted;text-decoration:underline dotted}b,strong{font-weight:bolder}code,kbd,samp{font-family:monospace,monospace;font-size:1em}small{font-size:80%}sub,sup{font-size:75%;line-height:0;position:relative;vertical-align:baseline}sub{bottom:-.25em}sup{top:-.5em}img{border-style:none}button,input,optgroup,select,textarea{font-family:inherit;font-size:100%;line-height:1.15;margin:0}button,input{overflow:visible}button,select{text-transform:none}[type=button],[type=reset],[type=submit],button{-webkit-appearance:button}[type=button]::-moz-focus-inner,[type=reset]::-moz-focus-inner,[type=submit]::-moz-focus-inner,button::-moz-focus-inner{border-style:none;padding:0}[type=button]:-moz-focusring,[type=reset]:-moz-focusring,[type=submit]:-moz-focusring,button:-moz-focusring{outline:1px dotted ButtonText}fieldset{padding:.35em .75em .625em}legend{box-sizing:border-box;color:inherit;display:table;max-width:100%;padding:0;white-space:normal}progress{vertical-align:baseline}textarea{overflow:auto}[type=checkbox],[type=radio]{box-sizing:border-box;padding:0}[type=number]::-webkit-inner-spin-button,[type=number]::-webkit-outer-spin-button{height:auto}[type=search]{-webkit-appearance:textfield;outline-offset:-2px}[type=search]::-webkit-search-decoration{-webkit-appearance:none}::-webkit-file-upload-button{-webkit-appearance:button;font:inherit}details{display:block}summary{display:list-item}[hidden],template{display:none}`

    const actual = splitOnNewLine(css)

    expect(Array.isArray(actual)).toBe(true)
  });
});

describe('removeIfNotACssClass should', () => {
  test('remove an element from the array if it not start with the dot', () => {
    const splittedClasses = [".ma1{ margin: .5rem; }", "img"]
    const actual = removeIfNotACssClass(splittedClasses)

    expect(actual).toEqual([".ma1{ margin: .5rem; }"])
  });
});

describe('handleRulesWithCommas should', () => {
  xtest('disaggregate selectors separated by comma', () => {
    const example = [
      ".ma1{margin: .5rem}",
      ".button-reset::-moz-focus-inner,.input-reset::-moz-focus-inner{border:0;padding:0}",
      ".border-box,a,article,aside,blockquote,body,code,dd,div,dl,dt,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,html,input[type=email],input[type=number],input[type=password],input[type=tel],input[type=text],input[type=url],legend,li,main,nav,ol,p,pre,section,table,td,textarea,th,tr,ul{box-sizing:border-box}",
      ".aspect-ratio{height:0;position:relative}",
      ".aspect-ratio--16x9{padding-bottom:56.25%}",
      ".aspect-ratio--9x16{padding-bottom:177.77%}",
      ".aspect-ratio--4x3{padding-bottom:75%}",
      ".aspect-ratio--3x4{padding-bottom:133.33%}",
    ]

    const actual = handleRulesWithCommas(example)

    expect(actual).toEqual(
      ".ma1{margin: .5rem}.button-reset::-moz-focus-inner{border:0;padding:0}.input-reset::-moz-focus-inner{border:0;padding:0}.border-box{box-sizing:border-box},a{box-sizing:border-box},article{box-sizing:border-box},aside{box-sizing:border-box},blockquote{box-sizing:border-box},body{box-sizing:border-box},code{box-sizing:border-box},dd{box-sizing:border-box},div{box-sizing:border-box},dl{box-sizing:border-box},dt{box-sizing:border-box},fieldset{box-sizing:border-box},figcaption{box-sizing:border-box},figure{box-sizing:border-box},footer{box-sizing:border-box},form{box-sizing:border-box},h1{box-sizing:border-box},h2{box-sizing:border-box},h3{box-sizing:border-box},h4{box-sizing:border-box},h5{box-sizing:border-box},h6{box-sizing:border-box},header{box-sizing:border-box},html{box-sizing:border-box},input[type=email]{box-sizing:border-box},input[type=number]{box-sizing:border-box},input[type=password]{box-sizing:border-box},input[type=tel]{box-sizing:border-box},input[type=text]{box-sizing:border-box},input[type=url]{box-sizing:border-box},legend{box-sizing:border-box},li{box-sizing:border-box},main{box-sizing:border-box},nav{box-sizing:border-box},ol{box-sizing:border-box},p{box-sizing:border-box},pre{box-sizing:border-box},section{box-sizing:border-box},table{box-sizing:border-box},td{box-sizing:border-box},textarea{box-sizing:border-box},th{box-sizing:border-box},tr{box-sizing:border-box},ul{box-sizing:border-box}.aspect-ratio{height:0;position:relative}.aspect-ratio--16x9{padding-bottom:56.25%}.aspect-ratio--9x16{padding-bottom:177.77%}.aspect-ratio--4x3{padding-bottom:75%}.aspect-ratio--3x4{padding-bottom:133.33%}.aspect-ratio--6x4{padding-bottom:66.6%}.aspect-ratio--4x6{padding-bottom:150%}.aspect-ratio--8x5{padding-bottom:62.5%}.aspect-ratio--5x8{padding-bottom:160%}.aspect-ratio--7x5{padding-bottom:71.42%}.aspect-ratio--5x7{padding-bottom:140%}.aspect-ratio--1x1{padding-bottom:100%}.aspect-ratio--object{position:absolute;top:0;right:0;bottom:0;left:0;width:100%;height:100%;z-index:100}")
  }); 
}); 

describe('transformToJsObject should', () => {
  test('transform a CSS class into a JS object', () => {
    const css = `.order-1{order:1},.order-2{order:2},.order-3{order:3},.order-4{order:4},.order-5{order:5},.order-6{order:6},.order-7{order:7},.order-8{order:8},`
    const actual = transformToJsObject(css)

    expect(actual).toEqual({
      "order-1": "order:1;",
      "order-2": "order:2;", 
      "order-3": "order:3;", 
      "order-4": "order:4;", 
      "order-5": "order:5;", 
      "order-6": "order:6;",
      "order-7": "order:7;",
      "order-8": "order:8;",
    })
  });
});
