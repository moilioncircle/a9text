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
    __const_htm__.word_stdout  = ["<font color='#333399'>","","</font>"];
    __const_htm__.word_stderr  = ["<font color='#993333'>","","</font>"];
    __const_htm__.word_comment = ["<font color='#339933'>","","</font>"];
    __const_htm__.line$number  = ["<span style='color: #FFFFFF; background-color:#DEDEDE'}>","","</span> "];
    
    var txt2htm = '<>';
    var __render_htm__ = [];
    
    // public
    this.render = function(a9dom)
    {
        a9dom.nowChild(0);
        var seq = 0;
        while(a9dom.hasNext())
        {
            /*
            seq++;
            var line_seq = "000"+seq;
            __const_htm__.line$number[1] = (seq>1?"\n":"")+line_seq.substr(line_seq.length - 3);
            __render_htm__.push(__const_htm__.line$number.join(''));
            */
            __render_htm__.push("\n");
            var lineDom = a9dom.nextChild();
            while(lineDom.hasNext())
            {
                var wordDom = lineDom.nextChild();
                var type = wordDom.getType();
                if(type == A9Dom.type.area_tty.word_stdout)
                {
                    __const_htm__.word_stdout[1] = A9Util.txt2htm(wordDom.getText(),txt2htm);
                    __render_htm__.push(__const_htm__.word_stdout.join(''));
                }
                else if (type == A9Dom.type.area_tty.word_stderr)
                {
                    __const_htm__.word_stderr[1] = A9Util.txt2htm(wordDom.getText(),txt2htm);
                    __render_htm__.push(__const_htm__.word_stderr.join(''));
                }
                else if (type == A9Dom.type.area_tty.word_comment)
                {
                    __const_htm__.word_comment[1] = A9Util.txt2htm(wordDom.getText(),txt2htm);
                    __render_htm__.push(__const_htm__.word_comment.join(''));
                }
                else // stdin
                {
                    __render_htm__.push(A9Util.txt2htm(wordDom.getText(),txt2htm));
                }
            }
        }
        
        var infoStr = "&lt;<b>tty</b>&gt; ";
        var info = a9dom.getInfo(A9Dom.type.area$info);
        if(info!=null && info != "") infoStr += A9Util.txt2htm(info,txt2htm);
        __const_htm__.tty$info[1] = infoStr;
        
        //
        __const_htm__.tty[1] = a9dom.getTier();
        __const_htm__.tty[3] = __const_htm__.tty$info.join('');
        __const_htm__.tty[5] = __render_htm__.join('');
        
        return __const_htm__.tty.join('');
    }
}