/**
UTF8(BOM)  GPL  trydofor.com  May.2007
===========================================================
void parse(a9dom)
*/

var AreaTTYParser = function()
{
    A9Dom.type.area_tty = {
        line: "area_tty.line",
        word: "area_tty.word",
        word$stdin:   "area_tty.word$stdin",
        word$sdtout:  "area_tty.word$sdtout",
        word$sdterr:  "area_tty.word$sdterr",
        word$comment: "area_tty.word$comment"
    };

    ////
    this.parse = function(a9dom)
    {
        if(a9dom == null || 'tty' != a9dom.getInfo(A9Dom.type.area$type))
            return;
        
        //
        var text = a9dom.getText();
        if(text == null || text == "") return;
        
        text = A9Util.valueBlank(text);
        var lines = text.split(a9dom.getInfo(A9Dom.type.area$crlf));
        
        for(var i=0; i<lines.length; i++)
        {
            var dom = a9dom.newChild(A9Dom.type.area_tty.line);
            __parseLine__(lines[i],dom);
        }
    }
    
    ///
    function __parseLine__(line,dom)
    {
        
    }
}