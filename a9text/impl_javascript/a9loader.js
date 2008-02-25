/**
UTF8(BOM)  GPL  trydofor.com  Feb.2008
===========================================================

*/

var __A9Loader__ = function()
{
    var __selfConf__ = {name:"a9loader.js",path:"",ball:'.js',info:"__info__.js"};
    
    function __tagImportScript__(url)
    {
        try
        {
            var element=document.createElement('SCRIPT'); 
            element.setAttribute('src', url); 
            var parrent = document.getElementsByTagName("head").item(0)||document.body;
            parrent.appendChild(element);
        }catch(e){
            document.write("<script type='text/javascript' src='"+url+"'></script>");
            document.close();
        }
    }
    
    function __syncImportClass__(clzz)
    {
        
    }
    
    function __asyncImportClass__()
    {
        
    }
    
    
    function __syncLoadText__()
    {
        var xhr = __newXHRequest__();
        var resText = null;
        try
        {
            xhr.open("GET",url,false);
            xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
            xhr.send(null);
            resText = xhr.responseText;
        }
        finally
        {
            xhr.abort();
            delete xhr;
        }
        return resText;
    }
    
    function __asyncLoadText__()
    {
        
    }
    
    function __newXHRequest__()
    {
        if(window.XMLHttpRequest)// Gecko
        {
            return new XMLHttpRequest() ;
        }
        else if(window.ActiveXObject) // IE
        {
            var activeXo = ['MSXML2.XMLHTTP','Microsoft.XMLHTTP'] ;
            for(var i=0;i<activeXo.length;i++)
                try {return new ActiveXObject(activeXo[i]);}catch (e){};
        }
        else
        {
            throw "can not create XMLHttpRequest on your browser";
        }
    }
    
    function __init__()
    {
        // PATH
        var scriptTags = document.getElementsByTagName("SCRIPT");
        for(var i=0;i<scriptTags.length;i++)
        {
            var src = scriptTags[i].src;
            var pos = src.lastIndexOf(__selfConf__['name']);
            if( pos == (src.length - __selfConf__['name'].length))
            {
                __selfConf__['path'] = src.substring(0,pos);
                break;
            }
        }
    }
    // init
    __init__();
    
    // export public members
    this.path = __selfConf__['path'];
    this.tagImportScript  = __tagImportScript__;
    this.syncImportClass  = __syncImportClass__;
    this.asyncImportClass = __asyncImportClass__;
    this.syncLoadText     = __syncLoadText__;
    this.asyncLoadText    = __asyncLoadText__;
}

// init instance
if(typeof(A9Loader) == 'undefined' || !(A9Loader instanceof __A9Loader__))
{
    A9Loader = new __A9Loader__();
}
