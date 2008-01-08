jseclipse-1.5.5 user library
^^^^^^^^^^^^^^^^^^^^^^^^^^^^

this folder contains user library of code completion in jseclipse.
download jseclipse from http://labs.adobe.com/technologies/jseclipse

In Eclipse, open a js file with jseclipse,choose the menu "jsEclipse->add library",
choose one xml file in the lib folder. then eclipse will create a folder 
named "user_library" under path "$workspace/.metadata/.plugins/com.interaktonline.jseclipse/".

or, you can do it youself.
make dir "$workspace/.metadata/.plugins/com.interaktonline.jseclipse/user_library/"
and copy all lib file *.xml to the the folder.



