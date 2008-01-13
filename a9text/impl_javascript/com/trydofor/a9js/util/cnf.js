/**
UTF8(BOM)  GPL  trydofor.com  Sep.2007
===========================================================
config file (properties) reader

void loadFormFile(file)
    load a xml from file

void loadFromText(text)
    load a xml from string

String getValue(key)
    get the value by key
    key : (NOT null)

*/

var CnfReaderClass = function()
{
    var __kvMap__ = {};
    
    function __loadFormFile__(file)
    {
        var __xmlhttp__ = ['MSXML2.XMLHTTP','Microsoft.XMLHTTP'];
        var xmlhttp = null;
        if (window.ActiveXObject) // IE
        {
            for (var i=0;i<__xmlhttp__.length;i++)
                try { xmlhttp = new ActiveXObject( __xmlhttp__[i] );break;}catch(e){};
        }
        else // Mozilla, Firefox, Opera, etc.
        {
            xmlhttp =new XMLHttpRequest();
        }
        
        if(xmlhttp == null) throw "your browser do not support XMLHttpRequest!";
        
        xmlhttp.open("get",file,false);
        xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
        xmlhttp.send(null);
        
        __loadFromText__(xmlhttp.responseText);
        delete xmlhttp;
    }
    
    function __loadFromText__(text)
    {
        if(text == null || text == "") return;
        
        var __regexp_comment__ = /^[ \t]*#/;
        var __regexp_keyval__ = /^[ \t]*([^= \t]+)[ \t]*=[ \t]*([^ \t]+)[ \t]*$/;
        
        var lines = text.split(/[\r\n]+/);
        for(var i=0;i<lines.length;i++)
        {
            if(__regexp_comment__.test(lines[i])) continue;
            if(__regexp_keyval__.test(lines[i]))
            {
                __kvMap__[RegExp.$1] = RegExp.$2
            }
        }
    }
    
    //
    this.loadFromText = __loadFromText__;
    this.loadFormFile = __loadFormFile__;
    
    this.getValue = function(key)
    {
        if(key == null) return "";
        return __kvMap__[key];
    }
}
