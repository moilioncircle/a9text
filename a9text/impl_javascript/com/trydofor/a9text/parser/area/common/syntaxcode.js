/**
UTF8(BOM)  GPL  trydofor.com  May.2007
===========================================================
void parse(a9dom)
*/

var AreaSyntaxCodeParser = function()
{
    A9Dom.type.area_syntax_code = {
        line_physical: "area_syntax_code.line_physical",
        pair_$serial: "area_syntax_code.pair_$serial",
        word_literal: "area_syntax_code.word_literal"
    };

    var __obj_mulquot__ = []; // mul-line quote, with escape char
    var __obj_onequot__ = []; // one-line quote, with escape char
    var __obj_keyword__ = []; // in-line
    var __obj_pairing__ = []; // in-line


    this.putMulQuote = function(type,head,foot,isin,escc)
    {
        if(typeof(type) != 'string') throw "MultiQuote's type should be string";
        if(isin == null) isin = true;
        var obj = {
            'type':type,
            'head':head,
            'foot':foot,
            'isin':isin,
            'escc':escc
        };
        
        __obj_mulquot__.push(obj);
    }
    
    this.putOneQuote = function(type,head,isin,escc)
    {
        if(typeof(type) != 'string') throw "OnelnQuote's type should be string";
        if(isin == null) isin = true;
        var obj = {
            'type':type,
            'head':head,
            'isin':isin,
            'escc':escc
        };
        
        __obj_onequot__.push(obj);
    }
    
    this.putKeyword = function(type,keys)
    {
        if(typeof(type) != 'string') throw "Pairing's type should be string";
        if(!(keys instanceof Array || keys instanceof String)) throw "Keyword's keys should be Array or String";
        
        var obj = {
            'type':type,
            'keys':(keys instanceof Array)?keys:[keys]
        };
        
        __obj_keyword__.push(obj);
    }
        
    this.putPairing = function(type,head,foot)
    {
        if(typeof(type) != 'string') throw "Pairing's type should be string";
                        
        var obj = {
            'type':type,
            'head':head,
            'foot':foot,
            'seqh':0,
            'seqf':0
        };
        
        __obj_pairing__.push(obj);
    }

    /**
     * parse lines
     * multi-line > one-line > in-line
     */
    this.parse = function(a9dom)
    {
        //
        var text = a9dom.getText();
        if(text == null || text == "") return;
        
        text = A9Util.valueBlank(text);
        var lines = text.split(a9dom.getInfo(A9Dom.type.area$crlf));
        
        var curMulquot = null;
        var curOnequot = null;
        
        for(var i=0; i<lines.length; i++)
        {
            var lineDom  = a9dom.newChild(A9Dom.type.area_syntax_code.line_physical);
            var line = lines[i];

            while(line != null && line != "")
            {
                // parser multi-comment if not end;
                if(curMulquot != null)
                {
                    var mqFoot = curMulquot['foot'];
                    var posMqf = -1;
                    
                    var offset = 0;
                    if(mqFoot instanceof RegExp)
                    {
                        var tmp = line.substr(offset);
                        while(tmp != '')
                        {
                            posMqf = tmp.search(mqFoot);
                            
                            // the head or escape
                            if(posMqf == 0 ||(posMqf > 0 && curMulquot['escc'] != null && A9Util.isEscape(tmp,posMqf-1,curMulquot['escc'])))
                            {
                                var relpos = posMqf+RegExp.$1.length;
                                tmp = tmp.substr(relpos);
                                offset += relpos;
                            }
                            else
                            {
                                break;
                            }
                        }
                        if(posMqf>=0) posMqf+=offset;
                    }
                    else
                    {
                        posMqf = line.indexOf(mqFoot,offset);
                        while(posMqf>=0)
                        {
                            // the head or escape
                            if(posMqf == 0 ||(posMqf > 0 && curMulquot['escc'] != null && A9Util.isEscape(line,posMqf-1,curMulquot['escc'])))
                            {
                                offset += (posMqf+mqFoot.length);
                                posMqf = line.indexOf(mqFoot,offset);
                            }
                            else
                            {
                                break;
                            }
                        }
                    }
                    
                    //
                    if(posMqf < 0) // not end
                    {
                        var wordDom = lineDom.newChild(curMulquot['type']);
                        wordDom.setText(line);
                        break;
                    }
                    else // end in the line.
                    {
                        var lenFoot = 0;
                        if(mqFoot instanceof RegExp)
                            lenFoot = RegExp.$1.length;
                        else
                            lenFoot = mqFoot.length;
                        
                        var wordDom = lineDom.newChild(curMulquot['type']);
                        wordDom.setText(line.substring(0,curMulquot['isin']?(posMqf+lenFoot):posMqf));
                        
                        line = line.substr(posMqf+lenFoot);
                        curMulquot = null;
                        continue;
                    }
                }
                
                var posOqh = -1; // position of the onequote
                var lenOqh = 0;
                for(var m=0;m<__obj_onequot__.length;m++)
                {
                    var p = -1;
                    var oqHead = __obj_onequot__[m]['head'];
                    
                    var offset = 0;
                    if(oqHead instanceof RegExp)
                    {
                        var tmp = line.substr(offset);
                        while(tmp != '')
                        {
                            p = tmp.search(oqHead);
                            // escape
                            if(p > 0 && __obj_onequot__[m]['escc'] != null && A9Util.isEscape(tmp,p-1,__obj_onequot__[m]['escc']))
                            {
                                var relpos = p+RegExp.$1.length;
                                tmp = tmp.substr(relpos);
                                offset += relpos;
                            }
                            else
                            {
                                break;
                            }
                        }
                        
                        if(p>=0)
                        {
                            p+=offset;
                            lenOqh = RegExp.$1.length;
                        }

                    }
                    else
                    {
                        p = line.indexOf(oqHead,offset);
                        while(p>=0)
                        {
                            // escape
                            if(p > 0 && __obj_onequot__[m]['escc'] != null && A9Util.isEscape(line,p-1,__obj_onequot__[m]['escc']))
                            {
                                offset += (p+oqHead.length);
                                p = line.indexOf(oqHead,offset);
                            }
                            else
                            {
                                break;
                            }
                        }
                        lenOqh = oqHead.length;
                    }
                    
                    if(p>=0 && (posOqh<0 || p<posOqh))
                    {
                        posOqh = p;
                        curOnequot = __obj_onequot__[m];
                    }
                }
                
                var posMqh = -1; // postition of the mulquote
                var lenMqh = 0;
                
                for(var m=0;m<__obj_mulquot__.length;m++)
                {
                    var p = -1;
                    var mqHead = __obj_mulquot__[m]['head'];
                    
                    var offset = 0;
                    if(mqHead instanceof RegExp)
                    {
                        var tmp = line.substr(offset);
                        while(tmp != '')
                        {
                            p = tmp.search(mqHead);
                            // escape
                            if(p > 0 && __obj_mulquot__[m]['escc'] != null && A9Util.isEscape(tmp,p-1,__obj_mulquot__[m]['escc']))
                            {
                                var relpos = p+RegExp.$1.length;
                                tmp = tmp.substr(relpos);
                                offset += relpos;
                            }
                            else
                            {
                                break;
                            }
                        }
                        if(p>=0)
                        {
                            p+=offset;
                            lenMqh = RegExp.$1.length;
                        }

                    }
                    else
                    {
                        p = line.indexOf(mqHead,offset);
                        while(p>=0)
                        {
                            // escape
                            if(p > 0 && __obj_mulquot__[m]['escc'] != null && A9Util.isEscape(line,p-1,__obj_mulquot__[m]['escc']))
                            {
                                offset += (p+mqHead.length);
                                p = line.indexOf(mqHead,offset);
                            }
                            else
                            {
                                break;
                            }
                        }
                        lenMqh = mqHead.length;
                    }
                        
                    if(p>=0 && (posMqh<0 || p<posMqh))
                    {
                        posMqh     = p;
                        curMulquot = __obj_mulquot__[m];
                    }
                }

                // mulquote before onequote or only mulquote
                if(posMqh >=0 && (posOqh < 0 || posOqh > posMqh)) 
                {
                    if(posMqh>0)
                    {
                        __parseNonquot__(line.substring(0,posMqh),lineDom);
                    }
                    
                    line = line.substr(curMulquot['isin']?posMqh:(posMqh+lenMqh));
                    continue;
                }
                
                // nonquote
                if(posOqh != 0)
                {
                    __parseNonquot__((posOqh<0?line:line.substring(0,posOqh)),lineDom);
                }
                
                // onequote
                if(posOqh >= 0)
                {
                    var wordDom = lineDom.newChild(curOnequot['type']);
                    wordDom.setText(posOqh>0?line.substr(curOnequot['isin']?posOqh:(posOqh+lenOqh)):line);
                }
                
                break;
            }
        }
    }
    
    function __parseNonquot__(line,lineDom)
    {
        var wordDom = lineDom.newChild(A9Dom.type.area_syntax_code.word_literal);
        wordDom.setText(line);
        return; // TODO
        
//        var __obj_keyword__ = []; // in-line
//        var __obj_pairing__ = []; // in-line  
        //
        if(line == null || line == '') return;
        
        var parts = []; // hold parts divide by ' '
        
        var inBlank = false;
        var lastPos = 0;
        for(var i = 0; i<line.length; i++)
        {
            var c = line.charAt(i);
            if(c == ' ')
            {
                if(!inBlank && i>lastPos)
                {
                    parts.push(line.substring(lastPos,i));
                    lastPos = i;
                }
                inBlank = true;
            }
            else
            {
                if(inBlank) // end blank
                {
                    parts.push(line.substring(lastPos,i));
                    lastPos = i;
                    inBlank = false;
                }
            }
        }
        parts.push(line.substr(lastPos)); // last part
    }

}