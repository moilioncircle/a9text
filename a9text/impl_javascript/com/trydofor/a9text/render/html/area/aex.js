/**
UTF8(BOM)  LGPL  trydofor.com  Mar. 2008
===========================================================
*/
var AreaAexRender = function()
{
    var __const_htm__= {};
    __const_htm__.b64_box = ["<table id='AREA_","area_id","' style='margin-left:","$tier","ex;' class='a9text_area_syntax' border='0' cellspacing='0' cellpadding='0'>","infostr",
                         "<tr><td class='a9text_area_syntax_border' style='padding:5px' valign='top'><pre class='a9text_autoscroll' title='click to decrypt it' onclick='__A9TEXT_AAES__.decrypt(this,true)'>","$text","</pre></td></tr></table>"];
    __const_htm__.b64_box$info = ["<tr><td><span class='a9text_area_syntax_info'>","infostr","&nbsp;</span></td></tr>"];
        
    var txt2htm = '<>';
    
    var __linkjs__ = [];
    for(var i=1;;i++){
        var path = A9Conf.getConf("render.html.common.js.aes-"+i);
        if(path == null) break;
        __linkjs__.push(path);
    }

    // public
    this.render = function(a9dom,func)
    {
        if(a9dom == null) return;
        
        var infoStr = "&lt;<b>amg</b>&gt; ";
        var info = a9dom.getInfo(A9Dom.type.area$info);
        if(info!=null && info != "") infoStr += A9Util.txt2htm(info,txt2htm);
        __const_htm__.b64_box$info[1] = infoStr;
        
        __const_htm__.b64_box[1] = a9dom.getId();
        __const_htm__.b64_box[3] = a9dom.getTier();
        __const_htm__.b64_box[5] = __const_htm__.b64_box$info.join('');
        __const_htm__.b64_box[7] = a9dom.getText();
        
        a9dom.setData({'htmltext':__const_htm__.b64_box.join(''),'linkjs':__linkjs__,'linkcss':null});
        
        if(func instanceof Function)
        try{func(a9dom)}catch(e){};
    }
}