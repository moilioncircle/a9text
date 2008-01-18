/**
UTF8(BOM)  GPL  trydofor.com  May.2007
===========================================================
String render(a9Dom)
*/
var AreaTableRender = function()
{
    var __const_htm__= {};
    __const_htm__.area = ["<pre style='margin-left:","$tier","ex;padding:6px;border:1px dashed #666699;'>","$para","</pre>"];
    __const_htm__.area$info = ["<span style='background-color:#999999; color:#FFFFFF'> ","$info"," </span><br />"];
    __const_htm__.area_text = ["<pre style='margin-left:","$tier","ex;padding:6px;border:","$border","px dashed #666699;'>","$para","</pre>"];

    var __render_htm__ = [];
    // public
    this.render = function(a9dom)
    {
        a9dom.nowChild(0);
        if(a9dom.hasNext())
            __table__(a9dom)
        else
            __text__(a9dom)
            
        return __render_htm__.join('');
    }
    
    function __text__(a9dom)
    {
        var infoStr = "";
        var info = a9dom.getInfo(A9Dom.type.area$info);
        if(info!=null && info != "")
        {
            __const_htm__.area$info[1]=A9Util.txt2htm(info,'<>');
            infoStr = __const_htm__.area$info.join('');
        }
        
        __const_htm__.area[1] = a9dom.getTier();
        __const_htm__.area[3] = infoStr + A9Util.txt2htm(a9dom.getText());
        __render_htm__.push(__const_htm__.area.join(''));
    }
    
    function __table__(a9dom)
    {
        var infoStr = "";
        var info = a9dom.getInfo(A9Dom.type.area$info);
        if(info!=null && info != "")
        {
            infoStr=A9Util.txt2htm(info,'<>');
            __render_htm__.push("<table border='0' cellpadding='2' cellspacing='0'><tr><td style='background-color:#666699; color:#FFFFFF'><b>&nbsp;"+infoStr+"&nbsp;&nbsp;</b></td></tr></table>");
            //__render_htm__.push("<div style='height:1.5em;width:"+info.length+"em;background-color:#999999; color:#FFFFFF'> "+infoStr+" </div>");
        }
        
        
        a9dom.nowChild(0);
        
        __render_htm__.push("<table  border='0' cellspacing='0' cellpadding='1'>");
        __render_htm__.push("<tr><td valign='top' bgcolor='#666699'><table width='100%' border='0' cellspacing='1' cellpadding='5'>");        
        
        while(a9dom.hasNext())
        {
            var tr = a9dom.nextChild();
            __render_htm__.push("<tr bgcolor='#FFFFFF'>");
            
            while(tr.hasNext())
            {
                var td = tr.nextChild();
                var isBold = td.getInfo(A9Dom.type.area_table.td$bold);
                __render_htm__.push("<td>");
                if(isBold) __render_htm__.push("<b>");
                __render_htm__.push(A9Util.txt2htm(td.getText(),'<>'));
                if(isBold) __render_htm__.push("</b>");
                __render_htm__.push("</td>");
            }
            
            __render_htm__.push("</tr>");
        }
        __render_htm__.push("</table></td></tr></table>");
    }
}