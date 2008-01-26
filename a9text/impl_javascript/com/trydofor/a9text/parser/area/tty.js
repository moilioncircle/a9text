/**
UTF8(BOM)  GPL  trydofor.com  May.2007
===========================================================
void parse(a9dom)
*/

var AreaTTYParser = function()
{
    A9Dom.type.area_tty = {
        line: "area_tty.line",
        word_stdin:   "area_tty.word_stdin",
        word_stdout:  "area_tty.word_stdout",
        word_stderr:  "area_tty.word_stderr",
        word_comment: "area_tty.word_comment"
    };

    var __regexp__ = {
        stdout:/(^ *> *)/,
        stderr:/(^ *@ *)/
    };
    var __strstr__ = {
        comment_s1 : "#",
        comment_s2 : "//",
        comment_ms : "/*",
        comment_me : "*/"
    }

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
        
        var onComment = false;
        for(var i=0; i<lines.length; i++)
        {
            var lineDom  = a9dom.newChild(A9Dom.type.area_tty.line);
            var line = lines[i];

            while(line != null && line != "")
            {
                // parser comment;
                if(onComment)
                {
                    var posme = line.indexOf(__strstr__.comment_me);
                    if(posme < 0)
                    {
                        var wordDom = lineDom.newChild(A9Dom.type.area_tty.word_comment);
                        wordDom.setText(line);
                        break;
                    }
                    else
                    {
                        posme += __strstr__.comment_me.length;
                        
                        var wordDom = lineDom.newChild(A9Dom.type.area_tty.word_comment);
                        wordDom.setText(line.substring(0,posme));
                        
                        line = line.substr(posme);
                        onComment = false;
                        continue;
                    }
                }
                
                var poss1 = line.indexOf(__strstr__.comment_s1);
                var poss2 = line.indexOf(__strstr__.comment_s2);
                
                var poss = poss1;
                if(poss < 0)
                    poss = poss2;
                else if(poss2 >= 0 && poss > poss2)
                    poss = poss2;
                
                var posm = line.indexOf(__strstr__.comment_ms);
                if(posm >=0 && (poss < 0 || poss > posm)) // multi-comment
                {
                    __parseStd__(line.substring(0,posm),lineDom);
                    
                    // leave
                    var part2 = line.substr(posm);
                    var posme = part2.indexOf(__strstr__.comment_me);
                    
                    if(posme < 0) 
                    {
                        var wordDom = lineDom.newChild(A9Dom.type.area_tty.word_comment);
                        wordDom.setText(part2);
                        
                        onComment = true;
                        line = null;
                    }
                    else // end inline
                    {
                        posme += __strstr__.comment_me.length;
                        var wordDom = lineDom.newChild(A9Dom.type.area_tty.word_comment);
                        wordDom.setText(part2.substring(0,posme));
                        
                        line = part2.substr(posme);
                    }
                    
                    continue;
                }
                
                var singleComment = null;
                if(poss >=0) // single-comment
                {
                    var singleComment = line.substr(poss);
                    line = line.substring(0,poss);
                }
                
                // normal
                __parseStd__(line,lineDom);
                
                //
                if(singleComment != null)
                {
                    var wordDom = lineDom.newChild(A9Dom.type.area_tty.word_comment);
                    wordDom.setText(singleComment);
                }
                
                break;
            }
        }
    }
    
    function __parseStd__(line,lineDom)
    {
        if(__regexp__.stdout.test(line))
        {
            var wordDom = lineDom.newChild(A9Dom.type.area_tty.word_stdout);
            wordDom.setText(line.substr(RegExp.$1.length));
        }
        else if (__regexp__.stderr.test(line))
        {
            var wordDom = lineDom.newChild(A9Dom.type.area_tty.word_stderr);
            wordDom.setText(line.substr(RegExp.$1.length));
        }
        else
        {
            var wordDom = lineDom.newChild(A9Dom.type.area_tty.word_stdin);
            wordDom.setText(line);
        }
    }
}