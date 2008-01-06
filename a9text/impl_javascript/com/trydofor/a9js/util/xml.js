/**
UTF8(BOM)  GPL  trydofor.com  Jan.2008
===========================================================
xml file (dom) reader

void loadFormFile(file)
    load a xml from file

void loadFromText(text)
    load a xml from string

Node[] selectNodes(xpath, node)
    select the node[] by xpath from node
    xpath: 'node/@attr','node1/node2'，(NOT null)
    node : contextNode，null means this

Node selectSingleNode(xpath, node)
    select the first node by xpath from node
    xpath: 'node/@attr','node1/node2'，(NOT null)
    node : contextNode，null means this

String getNodeTextOrAttr(xpath, node)
    get the attribute or text by xpath from node
    xpath: 'node/@attr','node1/node2'，(NOT null)
    node : contextNode，null means this
    
String getNodeAttribute(node, name)
    get the attribute of node by name
    name: attribute name，(NOT null)
    node : contextNode，(NOT null)
    
String getNodeText(node)
    select the attribute or text by xpath from node
    node : contextNode，(NOT null)
*/

var XmlReaderClass = function()
{
    var __root__  = null;
    var __msxml__ = [ 'MSXML2.DOMDocument', 'Microsoft.XmlDom' ];
    
    function __loadFormFile__(file)
    {
        if(file == null) throw "para[file] is null";
        
        if (window.ActiveXObject) // IE
        {
            for (var i=0;i<__msxml__.length;i++)
                try { __root__ = new ActiveXObject( __msxml__[i] );break;}catch(e){};
            //
            __root__.async=false;
            __root__.load(file);
        }
        else // Mozilla, Firefox, Opera, etc.
        {
            __root__=document.implementation.createDocument("","",null);
            __root__.async=false;
            __root__.load(file);
        }
        
        if(__root__ == null) throw "your browser do not support xml dom !";
    }
    
    function __loadFromText__(text)
    {
        if(text == null) throw "para[text] is null";
        
        if (window.ActiveXObject)// IE
        {
            for (var i=0;i<__msxml__.length;i++)
                try{ __root__ = new ActiveXObject( __msxml__[i] );break;}catch(e){};
            
            __root__.async=false;
            __root__.loadXML(text);
        }
        else // Mozilla, Firefox, Opera, etc.
        {
            var parser = new DOMParser();
            var __root__ = parser.parseFromString(text,"text/xml");
        }
        
        if(__root__ == null) throw "your browser do not support xml dom !";
    }

    function __selectNodes__(xpath, node)
    {
        if(xpath == null) throw "para[xpath] is null";
        if(node  == null) node = __root__;
        
        if (window.ActiveXObject)// IE
        {
              return node.selectNodes(xpath) ;
        }
        else // Mozilla, Firefox, Opera, etc.
        {
            var nodeArray = [];
            
            var xPathResult = node.evaluate( xpath, node, null, XPathResult.ORDERED_NODE_ITERATOR_TYPE, null) ;
            if (xPathResult)
            {
                var aNode = xPathResult.iterateNext() ;
                while(aNode)
                {
                    nodeArray[nodeArray.length] = aNode ;
                    aNode = xPathResult.iterateNext();
                }
            }
            return nodeArray ;
        }
        
        return null;
    }

    function __selectSingleNode__(xpath, node)
    {
        if(xpath == null) throw "para[xpath] is null";
        if(node  == null) node = __root__;

        if (window.ActiveXObject)// IE
        {
            return node.selectSingleNode(xpath) ;
        }
        else  // Mozilla, Firefox, Opera, etc.
        {
            var xPathResult = node.evaluate( xpath, node ,null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
            if ( xPathResult && xPathResult.singleNodeValue )
                return xPathResult.singleNodeValue ;
            else
                return null ;
        }
        
        return null;
    }
    
    function __getNodeTextOrAttr__(xpath,node)
    {
        var node = __selectSingleNode__(xpath, node);
        if(node == null) return "";
        else return __getNodeText__(node);
    }
    
    function __getNodeAttribute__(node,name)
    {
        if(node ==null || name == null)
            throw "param [node] or [name] is null!";
        //
        return node.attributes.getNamedItem(name).value;
    }
    
    function __getNodeText__(node)
    {
        if(node ==null)
            throw "param [node]  is null!";
         return node.text ? node.text : node.textContent
    }
    
    //
    this.getThisDocument = function(){return __root__;};
    
    this.loadFormFile = __loadFormFile__;
    this.loadFromText = __loadFromText__;
    this.selectNodes = __selectNodes__;
    this.selectSingleNode = __selectSingleNode__;
    this.getNodeTextOrAttr = __getNodeTextOrAttr__;
    this.getNodeAttribute = __getNodeAttribute__;
    this.getNodeText = __getNodeText__;
}
