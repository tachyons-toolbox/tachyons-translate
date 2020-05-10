[![CircleCI](https://circleci.com/gh/tachyons-toolbox/tachyons-translate.svg?style=svg)](https://circleci.com/gh/tachyons-toolbox/tachyons-translate)

<p align="center">
   <img src="https://github.com/tachyons-toolbox/tachyons-translate/blob/master/img/TachyonsTranslateLogo.png" height="200"/>
</p>

#  :twisted_rightwards_arrows:  Tachyons Translate
> because tachyons is awesome, but sometimes you need to write css


## About this project

The idea behind this small site is to let you prototyping fast your apps, taking
advantage of the awesomeness of tachyons rules, but also provide you a fast way
to group a bunch of tachyons classes under a classic old css class, for when you
need it.

So for example, you just wrote this code:
```html
<h1 class="blue pa3 mh2 lh-copy">A cool title styled with tachyons</h1>
```

at some point, you realize that you want to encapsulate all these rules under
one rule but you're too lazy to go look what are the values of these classes in
tachyons stylesheet, but don't worry, here it comes [tachyons translate](http://tachyonstranslate.xyz/):

```
.tachyonsIsAwesome { 
  color:#357edd;
  padding:1rem;
  margin-left:.5rem;
  margin-right:.5rem;
  line-height:1.5; 
}
```


## How to use it

Once you're in tacyonstranslate, you just have to type the tachyons classes that
you want to translate and the name of the new css class that you want to
extract, and that's all.
You can already paste the new style in your code.

## License
MIT
