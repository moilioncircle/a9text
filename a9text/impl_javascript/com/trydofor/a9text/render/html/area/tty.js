/**
UTF8(BOM)  GPL  trydofor.com  May.2007
===========================================================
String render(a9Dom)
*/
var AreaTTYRender = function()
{
    var __const_htm__= {};
    __const_htm__.tty = ["<table style='margin-left:","$tier","ex;' border='0' cellspacing='0' cellpadding='0'>","infostr","<tr><td><pre style='padding:6px;border:1px dashed #666699;'>","$text","</pre></td></tr></table>"];
    __const_htm__.tty$info = ["<tr><td><span style='background-color:#999999;color:#FFFFFF;'>","infostr","&nbsp;</span></td></tr>"];
    __const_htm__.tty_word$stdin   = ["<font color='#EFEFEF'>","","</font>"];
    __const_htm__.tty_word$stdout  = ["<font color='#EFEFEF'>","","</font>"];
    __const_htm__.tty_word$stderr  = ["<font color='#EFEFEF'>","","</font>"];
    __const_htm__.tty_word$comment = ["<font color='#EFEFEF'>","","</font>"];
    __const_htm__.tty_line$number  = ["<font color='#EFEFEF'>","","</font>"];
    
    var __render_htm__ = [];
    var txt2htm = '<>';
    
    // public
    this.render = function(a9dom)
    {
        var infoStr = "&lt;<b>"+A9Util.txt2htm(type,'<>')+"</b>&gt; ";
        var info = dom.getInfo(A9Dom.type.area$info);
        if(info!=null && info != "") infoStr += A9Util.txt2htm(info,'<>');
        __const_htm__.tty$info[1] = infoStr;
        
        //
        __const_htm__.area[1] = dom.getTier();
        __const_htm__.area[3] = __const_htm__.tty$info.join('');
        __const_htm__.area[5] = A9Util.txt2htm(dom.getText());
        
        
        a9dom.nowChild(0);
        
        var seq = 1;
        while(a9dom.hasNext())
        {
            var line_seq = (seq>1?"\n000":"000")+seq;
            __const_htm__.tty_line$number = line_seq.substr(line_seq.length - 3)+" ";
            __render_htm__.push(__const_htm__.tty_line$number.join(''));
            
            var lineDom = a9dom.nextChild();
            while(lineDom.hasNext())
            {
                var wordDom = lineDom.nextChild();
                var type = wordDom.getInfo();
            }
            
            //
            seq++;
        }
        
       return __const_htm__.area.join('');
    }
}