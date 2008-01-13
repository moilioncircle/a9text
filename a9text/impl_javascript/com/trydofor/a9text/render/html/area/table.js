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
        var infoStr = "";
        var info = a9dom.getInfo(A9Dom.type.area$info);
        if(info!=null && info == "")
        {
            __const_htm__.area$info[1]=A9Util.txt2htm(info,'<>');
            infoStr = __const_htm__.area$info.join('');
        }
        
        __const_htm__.area[1] = a9dom.getTier();
        __const_htm__.area[3] = infoStr + A9Util.txt2htm(a9dom.getText());
        __render_htm__.push(__const_htm__.area.join(''));
        return __render_htm__.join('');
    }
}