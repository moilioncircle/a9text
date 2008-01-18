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
        td$bold  :"bold",
        td$left  :"left",
        td$center:"center",
        td$right :"right"
    };
    
    var __super__ = null; // top a9dom
    var __crlf__  = "\r\n";
    var __lines__ = [];

    
    ////
    this.parse = function(a9dom)
    {
        if(a9dom == null || 'table' != a9dom.getInfo(A9Dom.type.area$type))
            return;
        
        //
        var text = a9dom.getText();
        if(text == null || text == "") return;
        
        text = A9Util.valueBlank(text);
        __super__ = a9dom;
        __crlf__  = a9dom.getInfo(A9Dom.type.area$crlf);
        __lines__ = text.split(__crlf__);
        
        /*
        // TODO set para of table
        dom.putInfo(A9Dom.type.area$type,type);
        dom.putInfo(A9Dom.type.area$info,info);
        dom.putInfo(A9Dom.type.area$args,args);
        dom.putInfo(A9Dom.type.area$crlf,__crlf__);
        */
        
        if(__isSimple__(__lines__[0]))
            __parseSimple__();
        else
            __parseStandard__();
        
    }
    
    function __parseSimple__()
    {
        var trs = [];
        var tdc = 0;
        
        // orgnize tds
        for(var i=0; i<__lines__.length; i++) 
        {
            var parts = __lines__[i].split(/ {3,}/);
            
            var tds = [];
            for(var j=0; j<parts.length; j++) 
            {
            	if(parts[j] != "") tds.push(parts[j]);
            }
            
            if(tds.length == 0) continue;
            
            trs.push(tds);
            if(tdc < tds.length) tdc = tds.length;
        }
        
        // make doms
        for(var i=0; i<trs.length; i++)
        {
            var trDom = __super__.newChild(A9Dom.type.area_table.tr);
            var tds = trs[i];
            for(var j=0; j<tdc; j++)
            {
                var tdDom = trDom.newChild(A9Dom.type.area_table.td);
                if(i == 0) tdDom.putInfo(A9Dom.type.area_table.td$bold,true);
                if(tds[j]) tdDom.setText(tds[j]);
            }
        }
    }
    
    function __parseStandard__()
    {
        
    }
    
    function __isSimple__(text)
    {
        if(text == null) return true;
        
        text = A9Util.trimLeft(text);
        var c = text.charAt(0);
        return c != "!" && c != "|";
    }
}