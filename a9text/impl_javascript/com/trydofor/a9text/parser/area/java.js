/**
UTF8(BOM)  GPL  trydofor.com  May.2007
===========================================================
void parse(a9dom)
*/

var AreaJavaParser = function()
{
    A9Dom.type.area_java = {
        comment_single:   "area_java.comment_single",
        comment_multi:   "area_java.comment_multi",
        type_string:  "area_java.type_string",
        type_char: "area_java.type_char"
    };

    var __ascp__ = new AreaSyntaxCodeParser();
    {
        __ascp__.putMulQuote(A9Dom.type.area_java.comment_multi,'/*','*/');
        __ascp__.putMulQuote(A9Dom.type.area_java.type_string,'"','"',true,'\\');
        __ascp__.putMulQuote(A9Dom.type.area_java.type_char,"'","'",true,'\\');
        __ascp__.putOneQuote(A9Dom.type.area_java.comment_single,'//');
    }
    ////
    this.parse = function(a9dom)
    {
        __ascp__.parse(a9dom);
    }
}