import { removeComments, splitOnNewLine, transformStylesheetToMap, pickStylesFrom } from '../src/utils.js'
import { minCss, minCssWithoutComment } from './fixtures'

describe('removeComments should', () => {
  test('remove all comments from css file', () => {
    const actual = removeComments(minCss)

    expect(actual).toEqual(minCssWithoutComment)
  });
});

describe('splitOnNewLine should', () => {
  test('return an array containing all the styles', () => {
  const actual = splitOnNewLine(minCssWithoutComment)

  expect(Array.isArray(actual)).toBe(true)
});
});

describe('transformStylesheetToMap should', () => {
  test('disaggregate selectors separated by comma', () => {
    const example = [
      "details{display:block}",
      "summary{display:list-item}",
      "[hidden],template{display:none}",
      ".border-box,a,article,aside,blockquote,body,code,dd,div,dl,dt,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,html,input[type=email],input[type=number],input[type=password],input[type=tel],input[type=text],input[type=url],legend,li,main,nav,ol,p,pre,section,table,td,textarea,th,tr,ul{box-sizing:border-box}",
      ".ma1{margin: .5rem}",
      ".button-reset::-moz-focus-inner,.input-reset::-moz-focus-inner{border:0;padding:0}",
      ".aspect-ratio{height:0;position:relative}",
    ];

    const actual = transformStylesheetToMap(example);
    const expected = {"border-box": "box-sizing:border-box;","ma1": "margin: .5rem;","button-reset::-moz-focus-inner": "border:0;padding:0;","input-reset::-moz-focus-inner": "border:0;padding:0;","aspect-ratio": "height:0;position:relative;"};

    expect(actual).toMatchObject(expected);
  }); 
}); 

describe('pickStylesFrom should', () => {
  let mapOfClasses;
  beforeAll(()=> {
    mapOfClasses = transformStylesheetToMap(splitOnNewLine(removeComments(minCss)));
  })
  test('return a multiline string with the values of that classes', () => {
    const classes = "ba absolute-l";

    const actual = pickStylesFrom(classes, mapOfClasses);

    expect(actual).toEqual(`border-style:solid;border-width:1px;\nposition:absolute;`);
  });

  test('return a string with the value of the class', () => {
    const classes = "flex"

    const actual = pickStylesFrom(classes, mapOfClasses);

    expect(actual).toEqual(`display:flex;`);
  }); 

  test('return an empty string', () => {
    const classes = ""

    const actual = pickStylesFrom(classes, mapOfClasses);

    expect(actual).toEqual(``);
  }); 

  test('print a message if the provided class does not exist', () => {
    const classes = "flex asadf ba"

    const actual = pickStylesFrom(classes, mapOfClasses);

    expect(actual).toEqual(`display:flex;\nThe class asadf doesn't exist in Tachyons stylesheet\nborder-style:solid;border-width:1px;`);
  }); 
});










