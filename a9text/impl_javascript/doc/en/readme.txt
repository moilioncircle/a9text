a9engine
^^^^^^^^
- author   : Shi Rongjiu(trydofor.com)
- license  : creativecommons
- created  : 2007-02-12
- modified : 2007-06-06

======================================================================

1. What is a9engine?
^^^^^^^^^^^^^^^^^^^^
a9engine is a lightweight engine to provide a smart js management in web R&D.
I would like to share my experience and works,but a9engine is NOT a production.

1.1. What can a9engine do?
^^^^^^^^^^^^^^^^^^^^^^^^^^
  1) load when need
     'require' function can sync load js into the appointed scope.
  2) manage js dependence.
     __info__.js describes js member and dependence,
     the dependences is loaded before js.
  3) less namescape conflict in separate context.
     Func in a.js and b.js,use a.Func and b.Func to call them.
  4) merge dependent scripts
     export script in one namescape whit it's dependences.

1.2. What can not a9engine do?
^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
  1) userinterface,feel&look,arithmetic and logic.
  2) real broswer independence.

1.3. any substitute?
^^^^^^^^^^^^^^^^^^^^
  as far as I know,JSI is a good performance.
  but it seems too heavyweight for my website.

2. a9engine structure:
^^^^^^^^^^^^^^^^^^^^^^
|  readme.txt           reading now
|  config.js            configuration
|  a9engine.js          core script
|
+- __testdemo__         test and demo
+- doc                  document
+- com/trydofor/a9text  a9text,a wiki-like
+- com/trydofor/a9js
|   +- http
|   |      __info__.js  package description
|   |      xhr.js       XmlHttpRequest class
|   +- code
|   |      __info__.js  package description
|   |      des.js       Des class
|   |      md5.js       Md5 class
|   |      encoder.js   en/decode class
|   +- format
|   |      __info__.js  package description
|   |      date.js      like java's DateFormat
|   +- util
|   |      __info__.js  package description
|   |      task.js      task manager

3. a9engine rules
^^^^^^^^^^^^^^^^^
  *) UTF8(BOM) encoding to avoid non-ascii char error.
  *) space(0x20) not tab(0x09) to indent.
  *) 'var' to declare members in script.
  *) python & java like naming rule.
  *) lowercase alphanumeric in package.
  *) '__' surrounding means private.

================================================================================
more in (*.js) doc/ testdemo/