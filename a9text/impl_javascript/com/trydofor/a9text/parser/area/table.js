/**
UTF8(BOM)  GPL  trydofor.com  May.2007
===========================================================
void parse(a9dom)
*/

var AreaTableParser = function()
{
    A9Dom.type.area.table = {
        type:"table"
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