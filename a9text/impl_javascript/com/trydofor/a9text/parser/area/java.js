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

    ////
    this.parse = function(a9dom)
    {
        var asp = new AreaSyntaxCodeParser();
        asp.putMulQuote(A9Dom.type.area_java.comment_multi,'/*','*/');
        asp.putMulQuote(A9Dom.type.area_java.type_string,'"','"','\\');
        asp.putMulQuote(A9Dom.type.area_java.type_char,"'","'",'\\');
        asp.putOneQuote(A9Dom.type.area_java.comment_single,'//');
        
        asp.parse(a9dom);
    }
}