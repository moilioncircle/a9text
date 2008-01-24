/**
UTF8(BOM)  GPL  trydofor.com  May.2007
===========================================================
String render(a9Dom)
*/
var A9TextRender = function()
{
    var __const_var__= {};
    __const_var__.join_$index = "$INDEX";
    
    var __const_htm__= {};
    
    __const_htm__.index_item = ["<div class='a9text_breakall' style='margin-left:","$tier","ex'><strong>","$flag","</strong>&nbsp;<a class='a9text_link' target='_self' href='#","$flag","'>","$title","</a></div>"];
    
    __const_htm__.root = ["<div class='a9text_root'>","$title","</div>"];
    __const_htm__.info_head = "<div class='a9text_info'>";
    __const_htm__.info_foot = "</div>";
    
    __const_htm__.sect = ["<a name='","$flag","'></a><div class='a9text_sect_","$level","'>","$flag","  ","$title","</div>"];
    __const_htm__.sect_head = "<div class='a9text_sect_head'>";
    __const_htm__.sect_foot = "</div>";
    __const_htm__.dict_head = ["<div class='a9text_breakall' style='margin-left:","$tier","ex'><strong>","$key","</strong> "];
    __const_htm__.dict_foot = "</div>";
    __const_htm__.para_head = ["<div class='a9text_breakall' style='margin-left:","$tier","ex'>"];
    __const_htm__.para_foot = "</div>";
    __const_htm__.area = ["<table style='margin-left:","$tier","ex;' border='0' cellspacing='0' cellpadding='0'>","infostr","<tr><td><pre style='padding:6px;border:1px dashed #666699;'>","$para","</pre></td></tr></table>"];
    __const_htm__.area$info = ["<tr><td><span style='background-color:#999999;color:#FFFFFF;'>&nbsp;&nbsp;","infostr","&nbsp;&nbsp;</span></td></tr>"];
    __const_htm__.area_text = ["<table style='margin-left:","$tier","ex;' border='0' cellspacing='0' cellpadding='0'>","infostr","<tr><td><pre style='padding:6px;border:","0","px dashed #666699;'>","$para","</pre></td></tr></table>"];
    __const_htm__.text = ["<pre style='margin-left:","$tier","ex'>","$para","</pre>"];
    
    __const_htm__.list_head = ["<div class='a9text_breakall' style='margin-left:","$tier","ex'>"];;
    __const_htm__.list_foot = "</div>";
    __const_htm__.list_item_head   = "<ul>";
    __const_htm__.list_step_head = "<ol>";
    __const_htm__.list_item_foot  = "</ul>";
    __const_htm__.list_step_foot  = "</ol>";
    __const_htm__.list_entry_head = ["<li type='","$type","'>"];
    __const_htm__.list_entry_foot = "</li>";
    __const_htm__.list_line_token = "<br />";
    
    __const_htm__.mode_link = ["<a href='","$addr","' class='a9text_link'>","$name","</a>"];
    __const_htm__.mode_anchor = ["<a name='","$name","'></a>"];
    __const_htm__.mode_join = ["<span>","$value","</span>"];
    
    __const_htm__.mode_trig_st_head = "<strong>"; // !
    __const_htm__.mode_trig_em_head = "<em>"; // /
    __const_htm__.mode_trig_ul_head = "<u>"; // _
    __const_htm__.mode_trig_de_head = "<del>"; // -
    __const_htm__.mode_trig_sb_head = "<sub>"; //,
    __const_htm__.mode_trig_sp_head = "<sup>";  //'
    __const_htm__.mode_trig_fg_head = ["<span style='color:#","$color","'>"];  //#
    __const_htm__.mode_trig_bg_head = ["<span style='background-color:#","$color","'>"]; //& 
    __const_htm__.mode_trig_sz_head = ["<span style='font-size: ","$size","%'>"]; //%

    __const_htm__.mode_trig_st_foot = "</strong>"; // !
    __const_htm__.mode_trig_em_foot = "</em>"; // /
    __const_htm__.mode_trig_ul_foot = "</u>"; // _
    __const_htm__.mode_trig_de_foot = "</del>"; // -
    __const_htm__.mode_trig_sb_foot = "</sub>"; //,
    __const_htm__.mode_trig_sp_foot = "</sup>";  //'
    __const_htm__.mode_trig_fg_foot = "</span>";  //#
    __const_htm__.mode_trig_bg_foot = "</span>"; //& 
    __const_htm__.mode_trig_sz_foot = "</span>"; //%
    
    //               
    __const_htm__.line0 = "<br/>";
    __const_htm__.linex = ["<hr align='left' size='","$size","' noshade='noshade' style='margin-left:","$tier","ex; width:","$lgth","ex'/>"];
    //__const_htm__.linex = ["<div style='height:","$size","px; margin-left:","$tier","ex;width:","$lgth","ex; background-color:#333333;margin-bottom:2ex'></div>"];
                     
    var __render_htm__ = [];
    var __render_css__ = [];
    var __render_js__  = [];
    
    var __root__ = null;
    var __last_dom__ = null;
    
    // public
    this.render = function(a9dom)
    {
        __domManager__(a9dom);
        
        __render_css__.push(A9Conf.getConf("/root/render/html/common/css/@path"));
        
        //"<link href='"+renderCss+"' rel='stylesheet' type='text/css' />"
        var linkCss = "";
        for(var i =0; i< __render_css__.length; i++)
            linkCss += "<link href='"+__render_css__[i]+"' rel='stylesheet' type='text/css' />";
            
        var linkJs = "";
        for(var i =0; i< __render_js__.length; i++)
            linkJs += "<script type='text/javascript' src='"+__render_js__[i]+"'></script>";
        
        var html = linkCss+linkJs+
                   __render_htm__.join('');
        
        // dispose
        __last_dom__ = null;
        __render_htm__ = [];
        __render_css__ = [];
        __render_js__  = [];
        
        return html;
    }
    
    // private
    function __domManager__(dom)
    {
        switch(dom.getType())
        {
            case A9Dom.type.root:
               __root2htm__(dom);
               break;

            case A9Dom.type.info:
               __info2htm__(dom);
               break;
               
            case A9Dom.type.sect:
               __sect2htm__(dom);
               break;
               
            case A9Dom.type.dict:
               __dict2htm__(dom);
               break;
               
            case A9Dom.type.list:
               __list2htm__(dom,__last_dom__);
               break;
               
            case A9Dom.type.para_text:
               __para2htm__(dom);
               break;
            case A9Dom.type.para_line:
               __line2htm__(dom);
               break;
               
            case A9Dom.type.mode_text:
            case A9Dom.type.mode_trig_head:
            case A9Dom.type.mode_trig_foot:
            case A9Dom.type.mode_join:
            case A9Dom.type.mode_link:
            case A9Dom.type.mode_$htm:
               __mode2htm__(dom);
               break;
            
            case A9Dom.type.area:
               __area2htm__(dom);
               break;
           
            default:
               __text2htm__(dom);
        }
        __last_dom__ = dom;
    }
    
    //
    function __root2htm__(dom)
    {
        __root__ = dom;
        
        //
        dom.nowChild(0);
        __const_htm__.root[1] = dom.getInfo(A9Dom.type.root$name);
        __render_htm__.push(__const_htm__.root.join(''));
        while(dom.hasNext())
        {
            var c = dom.nextChild();
            __domManager__(c);
        }
    }
    
    function __info2htm__(dom)
    {
        dom.nowChild(0);
        __render_htm__.push(__const_htm__.info_head);
        while(dom.hasNext())
        {
            var c = dom.nextChild();
            __domManager__(c);
        }
        __render_htm__.push(__const_htm__.info_foot);
    }
    
    function __sect2htm__(dom)
    {
        var flag = dom.getInfo(A9Dom.type.sect$flag);
        var le = flag.split('.').length;
        
        __const_htm__.sect[1] = flag;
        __const_htm__.sect[3] = le>5?5:le;
        __const_htm__.sect[5] = flag;
        __const_htm__.sect[7] = A9Util.txt2htm(dom.getInfo(A9Dom.type.sect$title));
        
        __render_htm__.push(__const_htm__.sect.join(''));
        
        //
        dom.nowChild(0);
        __render_htm__.push(__const_htm__.sect_head);
        while(dom.hasNext())
        {
            var c = dom.nextChild();
            __domManager__(c);
        }
        __render_htm__.push(__const_htm__.sect_foot);
    }
    
    function __dict2htm__(dom)
    {
        __const_htm__.dict_head[1] = dom.getTier();
        __const_htm__.dict_head[3] = dom.getInfo(A9Dom.type.dict$key);
        __render_htm__.push(__const_htm__.dict_head.join(''));

        //
        dom.nowChild(0);
        if(dom.getInfo(A9Dom.type.dict$line) && dom.hasNext())
        {
            paraDom = dom.nextChild();
            paraDom.nowChild(0);
            while(paraDom.hasNext())
            {
                var c = paraDom.nextChild();
                __domManager__(c);
            }
        }
        
        while(dom.hasNext())
        {
            var c = dom.nextChild();
            __domManager__(c);
        }
        
        __render_htm__.push(__const_htm__.dict_foot);
    }
    
    function __list2htm__(dom,ldom,thiz)
    {
        var type  = __getListType__(dom);
        var ltype = __getListType__(ldom);

        var headStr = "";
        if(thiz == null && type != ltype) // out and not same, indent
        {
            __const_htm__.list_head[1] = dom.getTier();
            headStr = __const_htm__.list_head.join('');
        }
        
        if(thiz == null && ltype != -1 && type == ltype) __render_htm__.pop();
        
        // check
        if(type == ltype && dom.getTier() == ldom.getTier())
        {
            __render_htm__.pop();
        }
        else 
        {
            if(type == 1)
                __render_htm__.push(headStr+__const_htm__.list_item_head);
            else if (type == 2)
                __render_htm__.push(headStr+__const_htm__.list_step_head);
        }
    
       // check type
        var liVal = dom.getInfo(A9Dom.type.list$type);
        if(/[0-9]/.test(liVal)) __const_htm__.list_entry_head[1]="1";
        else if (/[a-z]/.test(liVal)) __const_htm__.list_entry_head[1]="a";
        else if (/[A-Z]/.test(liVal)) __const_htm__.list_entry_head[1]="A";
        else if ('#' == liVal) __const_htm__.list_entry_head[1]="1";
        else if ('*' == liVal) __const_htm__.list_entry_head[1]="disc";
        else if ('+' == liVal) __const_htm__.list_entry_head[1]="square";
        else if ('-' == liVal) __const_htm__.list_entry_head[1]="circle";
        else __const_htm__.list_entry_head[1]="disc";
                   
        //
        dom.nowChild(0);
        var entry = 0;
        var needBr = false;
        var llist = dom;
        while(dom.hasNext())
        {
            var child = dom.nextChild();
            switch(child.getType())
            {
                case A9Dom.type.list:
                   if(entry == 1)
                   {
                       __render_htm__.push(__const_htm__.list_entry_foot);
                       entry = 0;
                   }
                   __list2htm__(child,llist,true);
                   llist = child;
                   needBr = false;
                   break;
                   
                case A9Dom.type.para_line:
                   if(entry == 0)
                   {
                       __render_htm__.push(__const_htm__.list_entry_head.join(''));
                       entry = 1;
                   }
                   if(needBr) __render_htm__.push(__const_htm__.list_line_token);
                   
                   needBr = true;
                   break;
                   
                default:
                   if(entry == 0)
                   {
                       __render_htm__.push(__const_htm__.list_entry_head.join(''));
                       entry = 1;
                   }
                   if(needBr) __render_htm__.push(__const_htm__.list_line_token);
                   child.nowChild(0);
                   while(child.hasNext())
                   {
                       __mode2htm__(child.nextChild());
                   }
                   needBr = true;
            }
        }
        
        if(entry == 1) __render_htm__.push(__const_htm__.list_entry_foot);
       
        // foot
        if(type == 1)
            __render_htm__.push(__const_htm__.list_item_foot);
        else if (type == 2)
            __render_htm__.push(__const_htm__.list_step_foot);

        
        if(thiz == null)
            __render_htm__.push(__const_htm__.list_foot);
    }
    
    function __para2htm__(dom)
    {
        __const_htm__.para_head[1] = dom.getTier();
        __render_htm__.push(__const_htm__.para_head.join(''));
        
        //
        dom.nowChild(0);
        while(dom.hasNext())
        {
            var c = dom.nextChild();
            __domManager__(c);
        }
        __render_htm__.push(__const_htm__.para_foot);
    }
    
    function __line2htm__(dom)
    {
        // TODO
        var size = dom.getInfo(A9Dom.type.para_line$size);
        if(size > 0)
        {
            __const_htm__.linex[1] = dom.getInfo(A9Dom.type.para_line$size);
            __const_htm__.linex[3] = dom.getTier();
            __const_htm__.linex[5] = dom.getInfo(A9Dom.type.para_line$lgth);
            
            __render_htm__.push(__const_htm__.linex.join(''));
        }
        else
        {
            __render_htm__.push(__const_htm__.line0);
        }
    }
    
    function __mode2htm__(dom) //TODO
    {
        switch(dom.getType())
        {
            case A9Dom.type.mode_text:
                 __render_htm__.push(A9Util.txt2htm(dom.getText()));
                 break;
            case A9Dom.type.mode_trig_head:
                 if(dom.getInfo(A9Dom.type.mode_trig$flag_st))
                    __render_htm__.push(__const_htm__.mode_trig_st_head);
                 if(dom.getInfo(A9Dom.type.mode_trig$flag_em))
                    __render_htm__.push(__const_htm__.mode_trig_em_head);
                 if(dom.getInfo(A9Dom.type.mode_trig$flag_ul))
                    __render_htm__.push(__const_htm__.mode_trig_ul_head);
                 if(dom.getInfo(A9Dom.type.mode_trig$flag_de))
                    __render_htm__.push(__const_htm__.mode_trig_de_head);
                 if(dom.getInfo(A9Dom.type.mode_trig$flag_sb))
                    __render_htm__.push(__const_htm__.mode_trig_sb_head);
                 if(dom.getInfo(A9Dom.type.mode_trig$flag_sp))
                    __render_htm__.push(__const_htm__.mode_trig_sp_head);
                   
                 if(dom.getInfo(A9Dom.type.mode_trig$flag_fg))
                 {
                    __const_htm__.mode_trig_fg_head[1] = dom.getInfo(A9Dom.type.mode_trig$flag_fg);
                    __render_htm__.push(__const_htm__.mode_trig_fg_head.join(''));
                 }
                 if(dom.getInfo(A9Dom.type.mode_trig$flag_bg))
                 {
                    __const_htm__.mode_trig_bg_head[1] = dom.getInfo(A9Dom.type.mode_trig$flag_bg);
                    __render_htm__.push(__const_htm__.mode_trig_bg_head.join(''));
                 }
                 if(dom.getInfo(A9Dom.type.mode_trig$flag_sz))
                 {
                    __const_htm__.mode_trig_sz_head[1] = dom.getInfo(A9Dom.type.mode_trig$flag_sz);
                    __render_htm__.push(__const_htm__.mode_trig_sz_head.join(''));
                 }
                 break;
            case A9Dom.type.mode_trig_foot:
                 if(dom.getInfo(A9Dom.type.mode_trig$flag_sz))
                    __render_htm__.push(__const_htm__.mode_trig_sz_foot);
                 if(dom.getInfo(A9Dom.type.mode_trig$flag_bg))
                    __render_htm__.push(__const_htm__.mode_trig_bg_foot);
                 if(dom.getInfo(A9Dom.type.mode_trig$flag_fg))
                    __render_htm__.push(__const_htm__.mode_trig_fg_foot);
                 if(dom.getInfo(A9Dom.type.mode_trig$flag_sp))
                    __render_htm__.push(__const_htm__.mode_trig_sp_foot);
                 if(dom.getInfo(A9Dom.type.mode_trig$flag_sb))
                    __render_htm__.push(__const_htm__.mode_trig_sb_foot);
                 if(dom.getInfo(A9Dom.type.mode_trig$flag_de))
                    __render_htm__.push(__const_htm__.mode_trig_de_foot);
                 if(dom.getInfo(A9Dom.type.mode_trig$flag_ul))
                    __render_htm__.push(__const_htm__.mode_trig_ul_foot);
                 if(dom.getInfo(A9Dom.type.mode_trig$flag_em))
                    __render_htm__.push(__const_htm__.mode_trig_em_foot);
                 if(dom.getInfo(A9Dom.type.mode_trig$flag_st))
                    __render_htm__.push(__const_htm__.mode_trig_st_foot);
                 break;
            case A9Dom.type.mode_join:
                var text = dom.getText();
                if(text == __const_var__.join_$index)
                {
                    __render_htm__.push(__genIndex__());
                }
                else if(text.charAt(0)== '$')
                {
                    var key = text.substr(1);
                    var dicts = __root__.getInfo(A9Dom.type.root$dict);
                    var dict = dicts[key];
                    
                    if(dict != null)
                    {
                        dict.nowChild(0);
                        if(dict.getInfo(A9Dom.type.dict$line) && dict.hasNext())
                        {
                            paraDom = dict.nextChild();
                            paraDom.nowChild(0);
                            while(paraDom.hasNext())
                            {
                                var c = paraDom.nextChild();
                                __domManager__(c);
                            }
                        }
                        
                        while(dict.hasNext())
                        {
                            var c = dict.nextChild();
                            __domManager__(c);
                        }
                    }
                }
                else
                {
                     __const_htm__.mode_join[1] = A9Util.txt2htm(dom.getText());
                     __render_htm__.push(__const_htm__.mode_join.join(''));
                }
                 break;
            case A9Dom.type.mode_link:
                 if(dom.getInfo(A9Dom.type.mode_link$addr) == null) //anchor
                 {
                      __const_htm__.mode_anchor[1] = dom.getInfo(A9Dom.type.mode_link$name);
                      __render_htm__.push(__const_htm__.mode_anchor.join(''));
                 }
                 else
                 {
                      __const_htm__.mode_link[1] = dom.getInfo(A9Dom.type.mode_link$addr);
                      __const_htm__.mode_link[3] = A9Util.txt2htm(dom.getInfo(A9Dom.type.mode_link$name));
                      if(__const_htm__.mode_link[3] == null || __const_htm__.mode_link[3] == '')
                         __const_htm__.mode_link[3] = __const_htm__.mode_link[1];
                         
                      //if(__const_htm__.mode_link[3].charAt(0)== '#') // link to anchor
                      //    __const_htm__.mode_link[3] = __const_htm__.mode_link[3].substr(1);
                      
                      __render_htm__.push(__const_htm__.mode_link.join(''));
                 }

                 break;
            case A9Dom.type.mode_$htm:
                 __render_htm__.push(dom.getText());
                 break;
            default:
                 __render_htm__.push(A9Util.txt2htm(dom.getText()));
        }
    }
    
    function __text2htm__(dom)
    {
        __const_htm__.text[1] = dom.getTier();
        __const_htm__.text[3] = A9Util.txt2htm(dom.getText(),"<>");
        __render_htm__.push(__const_htm__.text.join(''));
    }
    
    function __area$text2htm__(dom)
    {
        //area_text
        var border = 0;
        var infoStr = "";
        var info = dom.getInfo(A9Dom.type.area$info);
        if(info != null && info != "")
        {
            border = 1;
            __const_htm__.area$info[1]=A9Util.txt2htm(info,'<>');
            infoStr = __const_htm__.area$info.join('');
        }
        
        __const_htm__.area_text[1] = dom.getTier();
        __const_htm__.area_text[3] = infoStr;
        __const_htm__.area_text[5] = border;
        __const_htm__.area_text[7] = A9Util.txt2htm(dom.getText());
        __render_htm__.push(__const_htm__.area_text.join(''));
    }
    
    function __area2htm__(dom)
    {
        var type = dom.getInfo(A9Dom.type.area$type);
        if(type == 'text')
        {
            __area$text2htm__(dom)
            return;
        }
        
        // ext parser
        var extBall = A9Conf.getConf("/root/render/html/area/"+type+"/@ball");
        if(extBall != null && extBall != "")
        {
            try
            {
                var extClzz = A9Conf.getConf("/root/render/html/area/"+type+"/@clzz");
                A9Util.progressInfo("loading area render:"+type);
                require(extBall);
                eval("var extRender = new "+extClzz+"()");
                
                __render_htm__.push(extRender.render(dom));
                return;
            }
            catch(e)
            {
                // TODO
                throw e;
                A9Util.progressInfo("failed to load area render:"+type);
            };
        }
        
        var infoStr = "";
        var info = dom.getInfo(A9Dom.type.area$info);
        if(info!=null && info != "")
        {
            __const_htm__.area$info[1]=A9Util.txt2htm(info,'<>');
            infoStr = __const_htm__.area$info.join('');
        }
        __const_htm__.area[1] = dom.getTier();
        __const_htm__.area[3] = infoStr;
        __const_htm__.area[5] = A9Util.txt2htm(dom.getText());
        __render_htm__.push(__const_htm__.area.join(''));
    }
    
    // helper
    function __getListType__(dom)
    {
        var type = -1;
        
        if(dom != null && dom.getType() == A9Dom.type.list)
        {
            var flag = dom.getInfo(A9Dom.type.list$type);
            if (/[\*\+\-]/.test(flag)) // item
               type = 1;
            else // step
               type = 2;
        }
        return type;
    }
    
    function __genIndex__()
    {
        var buffer = [];
        var max = 0;
        var sects = __root__.getInfo(A9Dom.type.root$sect);
        for(var k in sects)
        {
            if(max < k.length) max = k.length;
            __const_htm__.index_item[1] = (sects[k].getInfo(A9Dom.type.sect$level)-1)*2;
            __const_htm__.index_item[3] = k;
            __const_htm__.index_item[5] = k;
            __const_htm__.index_item[7] = sects[k].getInfo(A9Dom.type.sect$title);
            buffer.push(__const_htm__.index_item.join(''));
        }
        
        return buffer.join('');
    }
    
}