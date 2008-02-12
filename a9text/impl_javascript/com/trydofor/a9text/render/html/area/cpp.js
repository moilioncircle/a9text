/**
UTF8(BOM)  GPL  trydofor.com  May.2007
===========================================================
String render(a9Dom)
*/
var AreaCppRender = function()
{
    var __ascr__ = new AreaSyntaxCodeRender();
    {
        __ascr__.putHighlight(A9Dom.type.area_cpp.word_preinst,'#006633');
        __ascr__.putHighlight(A9Dom.type.area_cpp.word_comment,'#CCCCCC');
        __ascr__.putHighlight(A9Dom.type.area_cpp.type_string,'#003399');
        __ascr__.putHighlight(A9Dom.type.area_cpp.type_char,'#003399');
        __ascr__.putHighlight(A9Dom.type.area_cpp.word_keyword,'#660033',true);
        __ascr__.putHighlight(A9Dom.type.area_cpp.word_type,'#660033',true);
        __ascr__.putHighlight(A9Dom.type.area_cpp.word_exts,'#660033',true);
        
        __ascr__.putPairing(A9Dom.type.area_cpp.bracket_sm,'sm');
        __ascr__.putPairing(A9Dom.type.area_cpp.bracket_md,'md');
        __ascr__.putPairing(A9Dom.type.area_cpp.bracket_bg,'bg');

    }
    
    // public
    this.render = function(a9dom)
    {
        return __ascr__.render(a9dom);
    }
}