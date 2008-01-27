/**
UTF8(BOM)  GPL  trydofor.com  May.2007
===========================================================
String render(a9Dom)
*/
var AreaTTYRender = function()
{
    var __const_htm__= {};
    __const_htm__.tty = ["<table style='margin-left:","$tier","ex;' border='0' cellspacing='0' cellpadding='0'>","infostr",
                         "<tr><td style='border:1px dashed #666699;'><table border='0' cellspacing='2' cellpadding='1'><tr><td style='background-color:#DDDDDD;color:#990000;text-align: center;' valign='top'><pre>","$num","</pre></td><td valign='top'><pre>","$text","</pre></td></tr></table></td></tr></table>"];
    __const_htm__.tty$info = ["<tr><td><span style='background-color:#999999;color:#FFFFFF;'>","infostr","&nbsp;</span></td></tr>"];
    __const_htm__.word_stdin   = ["<b>","","</b>"];
    __const_htm__.word_stdout  = ["<font color='#333399'>","","</font>"];
    __const_htm__.word_stderr  = ["<font color='#993333'>","","</font>"];
    __const_htm__.word_comment = ["<font color='#339933'>","","</font>"];
    __const_htm__.line$number  = ["<span style='color: #FFFFFF; background-color:#DEDEDE'}>","","</span> "];
    
    var txt2htm = '<>';
    var __render_htm__ = [];
    var __render_seq__ = [];
    
    // public
    this.render = function(a9dom)
    {
        a9dom.nowChild(0);
        var seq = 0;
        while(a9dom.hasNext())
        {
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
                    __const_htm__.word_stdin[1] = A9Util.txt2htm(wordDom.getText(),txt2htm);
                    __render_htm__.push(__const_htm__.word_stdin.join(''));
                }
            }
            
            seq++;
            var line_seq = "000"+seq;
            __render_seq__.push(line_seq.substr(line_seq.length - 3));
        }
        
        var infoStr = "&lt;<b>tty</b>&gt; ";
        var info = a9dom.getInfo(A9Dom.type.area$info);
        if(info!=null && info != "") infoStr += A9Util.txt2htm(info,txt2htm);
        __const_htm__.tty$info[1] = infoStr;
        
        //
        __const_htm__.tty[1] = a9dom.getTier();
        __const_htm__.tty[3] = __const_htm__.tty$info.join('');
        __const_htm__.tty[5] = __render_seq__.join('\n');        
        __const_htm__.tty[7] = __render_htm__.join('');
        
        return __const_htm__.tty.join('');
    }
}