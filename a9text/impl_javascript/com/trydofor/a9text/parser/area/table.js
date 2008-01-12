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
        if(a9dom == null || A9Dom.type.area.table.type != a9dom.getInfo(A9Dom.type.area$type))
            return;
        
        //
        var text = a9dom.setText();
        if(text == null || text == "") return;
        
        __crlf__  = a9dom.getInfo(A9Dom.type.area$crlf);
        __lines__ = text.split(__crlf__);
        
        /*
        dom.putInfo(A9Dom.type.area$type,type);
        dom.putInfo(A9Dom.type.area$info,info);
        dom.putInfo(A9Dom.type.area$args,args);
        dom.putInfo(A9Dom.type.area$crlf,__crlf__);
        */
    }
    
    function __parseSimple__()
    {
        
    }
    
    function __parseStandard__()
    {
        
    }
}