/**
UTF8(BOM)  GPL  trydofor.com  May.2007
===========================================================
String render(a9Dom)
*/
var AreaTTYRender = function()
{
    var __const_htm__= {};
    __const_htm__.tty = ["<table style='margin-left:","$tier","ex;' border='0' cellspacing='0' cellpadding='0'>","infostr","<tr><td><pre style='padding:6px;border:1px dashed #666699;'>","$text","</pre></td></tr></table>"];
    __const_htm__.tty$info = ["<tr><td><span style='background-color:#999999;color:#FFFFFF;'>&nbsp;&nbsp;","infostr","&nbsp;&nbsp;</span></td></tr>"];
        
    var __render_htm__ = [];
    var txt2htm = '<>';
    
    // public
    this.render = function(a9dom)
    {
        a9dom.nowChild(0);
        if(a9dom.hasNext())
            __table__(a9dom)
        else
            throw "no ready";
            
        return __render_htm__.join('');
    }
    
    function __table__(a9dom)
    {
        var info = a9dom.getInfo(A9Dom.type.area$info);
        if(info!=null && info != "")
        {
            __const_htm__.tty$info[1] = a9dom.getTier();
            __const_htm__.tty$info[3] = A9Util.txt2htm(info,txt2htm);
            __render_htm__.push(__const_htm__.tty$info.join(''));
        }
        
        __const_htm__.tty$head[3]=a9dom.getTier();
                
        var wh = "";
        if(a9dom.getInfo(A9Dom.type.area_table.$width)) // width
            wh += " widht='"+a9dom.getInfo(A9Dom.type.area_table.$width)+"'";
        if(a9dom.getInfo(A9Dom.type.area_table.$height)) // height
            wh += " height='"+a9dom.getInfo(A9Dom.type.area_table.$height)+"'";
            
        __const_htm__.tty$head[3]=wh;

        if(a9dom.getInfo(A9Dom.type.area_table.$border)) // border
            __const_htm__.tty$head[5] = a9dom.getInfo(A9Dom.type.area_table.$border);
        
        __render_htm__.push(__const_htm__.tty$head.join(''));        
        
        a9dom.nowChild(0);
        
        while(a9dom.hasNext())
        {
            var tr = a9dom.nextChild();
            __render_htm__.push(__const_htm__.tty$tr_head);
            
            while(tr.hasNext())
            {
                var td = tr.nextChild();
                
                var span = "";
                if(td.getInfo(A9Dom.type.area_table.td$colspan)) // colspan
                    span += " colspan='"+td.getInfo(A9Dom.type.area_table.td$colspan)+"'";
                if(td.getInfo(A9Dom.type.area_table.td$rowspan)) // rowspan
                    span += " rowspan='"+td.getInfo(A9Dom.type.area_table.td$rowspan)+"'";
                
                var style = "";
                if(td.getInfo(A9Dom.type.area_table.td$bold)) // bold
                    style += "font-weight: bold;";
                if(td.getInfo(A9Dom.type.area_table.td$left)) // left
                    style += "text-align: left;";
                if(td.getInfo(A9Dom.type.area_table.td$center)) // center
                    style += "text-align: center;";
                if(td.getInfo(A9Dom.type.area_table.td$right)) // right
                    style += "text-align: right;";
                
                if(style != "") style = " style='" + style + "'";
                __const_htm__.tty$td_head[1] = span + style;
                
                __render_htm__.push(__const_htm__.tty$td_head.join(''));
                __render_htm__.push(A9Util.txt2htm(td.getText(),txt2htm));
                __render_htm__.push(__const_htm__.tty$td_foot);
            }
            
            __render_htm__.push(__const_htm__.tty$tr_foot);
        }
        __render_htm__.push(__const_htm__.tty$foot);
    }
}