/**
UTF8(BOM)  GPL  trydofor.com  May.2007
===========================================================
void parse(a9dom)
*/

var AreaTableParser = function()
{
    A9Dom.type.area_table = {
        $border:"border",
        $cellpadding:"cellpadding",
        $cellspacing:"cellpadding",
        $width:"width",
        $height:"height",
        tr:"tr",
        td:"td",
        td$colspan  :"tdcolspan",
        td$rowspan  :"rowspan",
        td$blod   :"blod",
        td$left  :"left",
        td$center:"center",
        td$right :"right"
    };
    
    var __super__ = null; // top a9dom
    var __basic__ = null; // parent a9dom
    var __crlf__  = "\r\n";
    var __lines__ = [];

    
    ////
    this.parse = function(a9dom)
    {
        if(a9dom == null || 'table' != a9dom.getInfo(A9Dom.type.area$type))
            return;
        
        //
        var text = a9dom.setText();
        if(text == null || text == "") return;
        
        __super__ = a9dom;
        __basic__ = a9dom;
        
        __crlf__  = a9dom.getInfo(A9Dom.type.area$crlf);
        __lines__ = text.split(__crlf__);
        
        /*
        // TODO set para of table
        dom.putInfo(A9Dom.type.area$type,type);
        dom.putInfo(A9Dom.type.area$info,info);
        dom.putInfo(A9Dom.type.area$args,args);
        dom.putInfo(A9Dom.type.area$crlf,__crlf__);
        */
        
        if(__isSimple__(__lines__[__index__]))
            __parseSimple__();
        else
            __parseStandard__();
        
    }
    
    function __parseSimple__()
    {
        var __super__ = new A9Dom();
        
        var trs = [];
        var tdc = 0;
        // guess tds
        for(var i=0; i<__lines__.length; i++) 
        {
            var parts = __lines__[i].split(/[ 　\t]+/);
            var tds = [];
            for(var j=0; j<parts.length; j++) 
            {
            	if(parts[j] != "")
            	   tds.push(parts[j]);
            }
        }
        
        //
                    
        __basic__ = __super__.newChild(A9Dom.type.area_table.tr);
        
    }
    
    function __parseStandard__()
    {
        
    }
    
    function __isSimple__(text)
    {
        var text = "";
        if(text == null) return true;
        
        text = A9Util.trimLeft(text);
        var c = text.charAt(0);
        return c == "!" || c == "|";
    }
}