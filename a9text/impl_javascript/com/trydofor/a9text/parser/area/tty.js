/**
UTF8(BOM)  GPL  trydofor.com  May.2007
===========================================================
void parse(a9dom)
*/

var AreaTTYParser = function()
{
    A9Dom.type.area_tty = {
        stdin:   "area_tty.stdin",
        sdtout:  "area_tty.sdtout",
        sdterr:  "area_tty.sdterr",
        comment: "area_tty.comment",
        crlf: "area_tty.crlf"
    };
    
    var __super__ = null; // top a9dom
    var __crlf__  = "\r\n";
    var __lines__ = [];

    ////
    this.parse = function(a9dom)
    {
        if(a9dom == null || 'tty' != a9dom.getInfo(A9Dom.type.area$type))
            return;
        
        //
        var text = a9dom.getText();
        if(text == null || text == "") return;
        
        text = A9Util.valueBlank(text);
        __super__ = a9dom;
        __crlf__  = a9dom.getInfo(A9Dom.type.area$crlf);
        __lines__ = text.split(__crlf__);
        
        for(var i=0; i<__lines__.length; i++)
        {
            var line = __lines__[i];
            
        }
    }
}