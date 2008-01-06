//UTF8(BOM)  GPL  trydofor.com  Dec.2007
/* property name is lowercase, class name is uppercase*/
var A9Conf = new XmlReaderClass();

A9Conf.loadFormFile(CORE_PATH+"com/trydofor/a9text/a9conf.xml");

A9Conf.__EnvPath__ = {
    "$PAGE_PATH/":   PAGE_PATH,
    "$CORE_PATH/":   CORE_PATH,
    "${PAGE_PATH}/": PAGE_PATH,
    "${CORE_PATH}/": CORE_PATH
};

//
A9Conf.getConf = function(xpath)
{
    var str = A9Conf.getNodeTextOrAttr(xpath);
    if(str == null || str == "") return "";
    
    for(var key in A9Conf.__EnvPath__)
    {
        if(str.indexOf(key)>=0)
        {
            str = str.replace(key,A9Conf.__EnvPath__[key]);
        }
    }
    
    return str;
}