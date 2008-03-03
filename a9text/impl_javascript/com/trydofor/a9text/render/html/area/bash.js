/**
UTF8(BOM)  GPL  trydofor.com  May.2007
===========================================================
String render(a9Dom)
*/
var AreaBashRender = function()
{
    var __ascr__ = new AreaSyntaxCodeRender();
    {
        __ascr__.putHighlight(A9Dom.type.area_bash.type_string,'#003399');
        __ascr__.putHighlight(A9Dom.type.area_bash.word_comment,'#006633');
        __ascr__.putHighlight(A9Dom.type.area_bash.word_keyword,'#660033',true);
        __ascr__.putHighlight(A9Dom.type.area_bash.word_builtin,'#660033',true);
        __ascr__.putHighlight(A9Dom.type.area_bash.word_command,'#000000',true);
                
        __ascr__.putPairing(A9Dom.type.area_bash.bracket_sm,'sm');
        __ascr__.putPairing(A9Dom.type.area_bash.bracket_md,'md');
        __ascr__.putPairing(A9Dom.type.area_bash.bracket_bg,'bg');

    }
    
    // public
    this.render = function(a9dom,func)
    {
        var data = __ascr__.render(a9dom);
        a9dom.setData(data)
        
        if(func instanceof Function)
        try{func(a9dom)}catch(e){};
    }
}