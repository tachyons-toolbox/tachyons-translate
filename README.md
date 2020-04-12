# Tachyons Translate
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
tachyons stylesheet, but don't worry, here it comes *tachyons translate*.


## How to use it

Once you're in tacyonstranslate, you just have to type the tachyons classes that
you want to translate and the name of the new css class that you want to
extract, and that's all.
You can already paste the new style in your code.


## How it works

At the moment, we are using a heavy combination of regex to extract and parse
all the information needed, it's probably not the best way to go, and it could
fail in some cases; if you have some improvements a PR is always welcomed ;)


## License
MIT
