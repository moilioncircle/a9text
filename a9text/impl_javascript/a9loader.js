/**
UTF8(BOM)  GPL  trydofor.com  Feb.2008
===========================================================

*/

var __A9Loader__ = function()
{
    var __selfConf__ = {name:"a9loader.js",extn:'.js',info:"__info__.js"};
    var __pageInfo__ = {core:"",path:"",name:"",info:"",args:{}};
    var __consoleHandler__ = null;
    var __asyncTextTask__ = {num:0,map:{}};
    var __asyncClzzTask__ = {rcnt:0,clzz:[],func:[]};
    var __clzzInfoPools__ = {}; //{clzz,pubs,deps,text,impl}

    function __tagLoadScript__(url)
    {
        __checkType__(url,"string","url@__tagImportScript__");
        try
        {
            var element=document.createElement('SCRIPT'); 
            element.setAttribute('src', url); 
            var parrent = document.getElementsByTagName("head").item(0)||document.body;
            parrent.appendChild(element);
        }catch(e){
            document.write("<script type='text/javascript' src='"+url+"'></script>");
            document.close();
        }
    }
    
    function __syncImportClass__(clzz)
    {
        __checkType__(clzz,"string","clzz@__syncImportClass__");
        new __clzzTask__(clzz,false);
    }
    
    function __asyncImportClass__(clzz)
    {
        __checkType__(clzz,"string","clzz@__asyncImportClass__");
        new __clzzTask__(clzz,self.location.protocol.indexOf('file')<0);
    }
    
    function __runAfterImport__(func)
    {
        __checkType__(func,"Function","func@__runAfterImport__");
        if(__asyncClzzTask__.rcnt == 0) func();
        else __asyncClzzTask__.func.push(func);
    }
    
    function __syncLoadText__(url)
    {
        __checkType__(url,"string","url@__syncLoadText__");
        var xhr = __newXHRequest__();
        var resText = null;
        try
        {
            xhr.open("GET",url,false);
            xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
            xhr.send(null);
            resText = xhr.responseText;
        }
        finally
        {
            xhr.abort();
            delete xhr;
        }
        return resText;
    }

    /**
     * async load text by one or more url,
     * when all text is loaded,the func will be called back.
     * @param func <Function> function(<String|Array>urls,<String|Array>text)
     * @param urls <String|Array> 
     */
    function __asyncLoadText__(func,urls)
    {
        __checkType__(func,"Function","func@__asyncLoadText__");
        __checkType__(urls,"string","urls@__asyncLoadText__");
        
        
        __asyncTextTask__.num++;
        var task = {};
        task.id = __asyncTextTask__.num;
        task.func = func;
        task.urls = urls
        task.xhrs = [];
        
        if(typeof(urls) == 'string'){
            task.xhrs[0] = new __textTask__(urls,task.id);
        }else{
            for(var i=0;i<urls.length;i++){
                task.xhrs[i] = new __textTask__(urls[i],task.id);
            }
        }
        __asyncTextTask__.map[task.id] = task;

    }
    
    /////////////////// helper functions  ///////////////////
    
    function __clzzTask__(clzz,async)
    {
    	//(step,init:0,info:1,text:2,impl:3)
    	if(typeof(__clzzInfoPools__[clzz]) != 'undefined' 
    	   && __clzzInfoPools__[clzz]['text'] != null) return;
    	
    	if(async == null||async != false) async = true;
    	else async = false;
    	
    	if(typeof(__clzzInfoPools__[clzz]) == 'undefined'){
	    	__clzzInfoPools__[clzz] = {'clzz':clzz,'pubs':null,'deps':null,'text':'','impl':null};
    	}
    	
    	if(async){
    		__asyncClzzTask__.clzz.push(clzz);
    	}
    	
    	//document.body.innerHTML +="<br>"+clzz;
    	var clzzUri = __pageInfo__.core+clzz.replace(/\./g,'/')+__selfConf__.extn;
    	var infoUri = clzzUri.substring(0,clzzUri.lastIndexOf('/')+1)+__selfConf__.info;
    	
    	// get info (async|sync)
    	if(__clzzInfoPools__[clzz]['pubs'] == null){
	    	var xhrInfo = __newXHRequest__();
	    	if(async){
	    		__asyncClzzTask__.rcnt++;
		        xhrInfo.onreadystatechange = function(){
		            if(xhrInfo.readyState == 4){
		            	var infoText = null;
		                if (xhrInfo.status == 0 || xhrInfo.status == 200 || xhrInfo.status == 304 ){
				        	infoText=xhrInfo.responseText;
		                }else{
		                    // do something
		                }
		                xhrInfo.abort();
		                delete xhrInfo;
		                //
		                if(infoText != null)eval(infoText);
		                __asyncClzzTask__.rcnt--;
		            }
		        }
	        }
	        
	        xhrInfo.open('GET',infoUri,async);
	        xhrInfo.setRequestHeader('If-Modified-Since','0');
	        xhrInfo.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
	        xhrInfo.send(null);
	        
	        if(!async){
	        	var infoText=xhrInfo.responseText;
    			xhrInfo.abort();
                delete xhrInfo;
                if(infoText != null)eval(infoText);
	        }
    	}
        // get text (async|sync)
        var xhrClzz = __newXHRequest__();
        if(async){
        	__asyncClzzTask__.rcnt++;
	        xhrClzz.onreadystatechange = function(){
	            if(xhrClzz.readyState == 4){
	                if (xhrClzz.status == 0 || xhrClzz.status == 200 || xhrClzz.status == 304 ){
	                	__clzzInfoPools__[clzz]['text']=xhrClzz.responseText;
	                }else{
	                    // do something
	                }
	                xhrClzz.abort();
	                delete xhrClzz;
	                __asyncClzzTask__.rcnt--;
	                __clzzTaskCallback__(clzz);
	            }
	        }
        }
        
        xhrClzz.open('GET',clzzUri,async);
        xhrClzz.setRequestHeader('If-Modified-Since','0');
        xhrClzz.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
        xhrClzz.send(null);
        
        if(!async){
        	__clzzInfoPools__[clzz]['text']=xhrClzz.responseText;
			xhrClzz.abort();
            delete xhrClzz;
            __initAndExportClzz__(clzz);
        }
	        
        // inner function
    	function __info__(scriptName,publicMemeber,dependencs){
    		var clzzBall = clzz.substring(0,clzz.lastIndexOf('.')+1);
    		var clzzName = clzzBall + scriptName.substring(0,scriptName.lastIndexOf(__selfConf__.extn));
            
    		if(typeof(__clzzInfoPools__[clzzName]) == 'undefined'){
	    		__clzzInfoPools__[clzzName] = {'clzz':clzzName,'pubs':publicMemeber,'deps':dependencs,'text':null,'impl':null};
    		}else{
    			__clzzInfoPools__[clzzName]['pubs']=publicMemeber;
    			__clzzInfoPools__[clzzName]['deps']=dependencs;
    		}
    		
    		if(dependencs!= null){
    			for(var i=0;i<dependencs.length;i++){
    				if(dependencs[i].indexOf('.')<0) dependencs[i] = clzzBall+dependencs[i];
    				new __clzzTask__(dependencs[i],async);
    			}
    		}
    	}
    }
    
    function __clzzTaskCallback__(clzz)
    {
    	if(__asyncClzzTask__.rcnt > 0) return;
    	
		var clzzs = __asyncClzzTask__.clzz;
		var funcs = __asyncClzzTask__.func;
    	__asyncClzzTask__.rcnt = 0;
    	__asyncClzzTask__.clzz = [];
    	__asyncClzzTask__.func = [];
	
    	for(var i=0;i<clzzs.length;i++){
    		__initAndExportClzz__(clzzs[i]);
    	}
    	for(var i=0;i<funcs.length;i++){
    		try{
    			funcs[i]();
    		}catch(e){ __stdout__(e)};
    	}
    }
    
    function __initAndExportClzz__(clzz)
    {
    	if(typeof(__clzzInfoPools__[clzz]) == 'undefined' 
    	   || __clzzInfoPools__[clzz]['impl'] != null
    	   || __clzzInfoPools__[clzz]['text'] == null
    	   ) return;
    	
    	// deps check
    	var cip = __clzzInfoPools__[clzz];
    	cip['impl'] = 'ready'; // avoid looping deps
		for(var i=0;cip['deps']!=null && i<cip['deps'].length;i++){
			__initAndExportClzz__(cip['deps'][i]);
		}
    	// init clzz
    	var clzzScript = ["__clzzInfoPools__[clzz].impl = function(){\n"];
    	if(cip['pubs']!=null)
	        for(var i=0;i<cip['pubs'].length;i++)
	    		clzzScript.push("var " + cip['pubs'][i] + ";\n");
    	clzzScript.push(cip['text']);
        clzzScript.push("\nreturn { __$:function(s){return eval(s)}\n");
    	if(cip['pubs']!=null)
	        for(var i=0;i<cip['pubs'].length;i++)
            	clzzScript.push(","+cip['pubs'][i]+":"+cip['pubs'][i]+"\n");
        clzzScript.push("};\n");
        clzzScript.push("}();\n");
        
        try{
            eval(clzzScript.join(''));
        }catch(e){
            throw "bad clzz :"+clzz+" :\n"+e;
        }
        delete clzzScript;
        
        // export ball
        var ballScript = [];
        var ballPart = clzz.split('.');
        if(ballPart.length>1){
        	ballScript.push("if(typeof("+ballPart[0]+")=='undefined')"+ballPart[0]+"={};\n");
	        var ballCell = ballPart[0];
	        for(var i=1;i<ballPart.length-1;i++){
	            ballCell += "['"+ballPart[i]+"']";
	            ballScript.push("if(typeof("+ballCell+")=='undefined') "+ballCell+"={};\n");
	        }
        }
        
        ballScript.push("if(typeof("+clzz+")!= 'undefined'){ throw '"+clzz+" exists';}\n");
        ballScript.push("else{"+clzz+"=__clzzInfoPools__[clzz].impl;}\n");
        try{
            eval(ballScript.join(''));
        }catch(e){
        	throw "bad ball :"+clzz+" :\n"+e;
        }
        delete ballScript;
        
        // alias pubs
        var aliasScript = [];
        if(cip['pubs']!=null)
	        for(var i=0;i<cip['pubs'].length;i++){
	    		aliasScript.push("if(typeof("+cip['pubs'][i]+")!='undefined'){__stdout__('conflict:"+cip['pubs'][i]+"@"+clzz+"');}\n");
	    		aliasScript.push("else{"+cip['pubs'][i]+"=__clzzInfoPools__[clzz].impl['"+cip['pubs'][i]+"']}\n");
	        }
        eval(aliasScript.join(''));
		delete aliasScript;
    }
    /**
     * do xmlhttprequest as a thread of task group
     * @param url
     * @param taskid task group id
     */
    function __textTask__(url,taskid)
    {
        var text = null;
        var done = false;
        
        var xhr = __newXHRequest__();
        xhr.onreadystatechange = function(){
            if(xhr.readyState == 4){
                if (xhr.status == 0 || xhr.status == 200 || xhr.status == 304 ){
                    text = xhr.responseText;
                    done = true;
                    __textTaskCallback__(taskid);
                }else{
                    // do something
                }
                xhr.abort();
                delete xhr;
            }
        }
        xhr.open('GET',url,true);
        xhr.setRequestHeader('If-Modified-Since','0');
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded; charset=UTF-8');
        xhr.send(null);
        //
        this.isDone = function(){return done;}
        this.getUrl = function(){return url;}
        this.getText = function(){return text;}
    }
    
    function __textTaskCallback__(taskid)
    {
        if(typeof(__asyncTextTask__.map[taskid]) == 'undefined') return;
        
        var xhrs = __asyncTextTask__.map[taskid].xhrs;
        var isAllDone = true;
        for(var i=0;i<xhrs.length;i++){
            if(!xhrs[i].isDone()){
                isAllDone = false;
                break;
            }
        }
        
        //alert(taskid+"::"+xhrs.length+":"+isAllDone)
        if(isAllDone){
            var task = __asyncTextTask__.map[taskid];
            if(typeof(task.urls) == 'string'){
                task.func(task.xhrs[0].getUrl(),task.xhrs[0].getText());
            }else{
                var urls  = [];
                var texts = [];
                for(var i=0;i<xhrs.length;i++){
                    urls[i]  = xhrs[i].getUrl();
                    texts[i] = xhrs[i].getText();
                }
                task.func(urls,texts);
            }
            
            delete __asyncTextTask__.map[taskid];
        }
    }    
    
    function __newXHRequest__()
    {
        if(window.XMLHttpRequest) // Gecko
        {
            return new XMLHttpRequest() ;
        }
        else if(window.ActiveXObject) // IE
        {
            var activeXo = ['MSXML2.XMLHTTP','Microsoft.XMLHTTP'] ;
            for(var i=0;i<activeXo.length;i++)
                try {return new ActiveXObject(activeXo[i]);}catch (e){};
        }
        else
        {
            throw "can not create XMLHttpRequest on your browser";
        }
    }
    
    function __checkType__(para,type,info)
    {
        var mess = "para:"+para+" should be "+type+" ::"+info;
        if(para == null) throw mess;
        if(para instanceof Array && type != "Array"){
            for(var i=0; i<para.length; i++) {
            	if(typeof(para[i]) == type) continue;
            	try{
            	   if(eval("para[i] instanceof "+type)) continue;
            	}catch(e){};
                throw mess;
            }
            return;
        }else{
            if(typeof(para) == type || eval("para instanceof "+type)) return;
        }
        throw mess;
    }
    
    function __stdout__(info){
        if(__consoleHandler__ != null){
            try{ __consoleHandler__(info);}catch(e){alert(e)};
        }
    }
    
    function __init__()
    {
        // CORE
        var scriptTags = document.getElementsByTagName("SCRIPT");
        for(var i=0;i<scriptTags.length;i++)
        {
            var src = scriptTags[i].src;
            var pos = src.lastIndexOf(__selfConf__['name']);
            if( pos == (src.length - __selfConf__['name'].length))
            {
                __pageInfo__['core'] = src.substring(0,pos);
                break;
            }
        }
        
        // PAGE
        var theURL = self.location.href;
        var questPos = theURL.indexOf('?');
        var pureUrl = questPos<0?theURL:theURL.substring(0,questPos);
        var slashPos = pureUrl.lastIndexOf('/') + 1;
        
        __pageInfo__['path'] = theURL.substring(0,slashPos);
        __pageInfo__['name'] = questPos>slashPos ? theURL.substring(slashPos,questPos):theURL.substr(slashPos);
        
        // URL_ARGS
        if(questPos > slashPos)
        {
            var queryString = theURL.substr(questPos+1);
            var equalPos = 0;
            var keyValArray = queryString.split("&");
            for( var i = 0 ; i < keyValArray.length; i++)
            {
                equalPos = keyValArray[i].indexOf("=");
                if(equalPos > 0)
                    __pageInfo__['args'][keyValArray[i].substring(0,equalPos)] = keyValArray[i].substr(equalPos+1);
                else
                    __pageInfo__['args'][keyValArray[i]] = "";
            }
            
            __pageInfo__['info'] = queryString;
        }
    }
    
    // init
    __init__();
    
    // export public members
    this.tagLoadScript    = __tagLoadScript__;
    this.syncImportClass  = __syncImportClass__;
    this.asyncImportClass = __asyncImportClass__;
    this.runAfterImport   = __runAfterImport__;
    this.syncLoadText     = __syncLoadText__;
    this.asyncLoadText    = __asyncLoadText__;
    
    this.setConsole       = function(f){if(f instanceof Function)__consoleHandler__ = f;};
    
    this.__$              = function(s){return __clzzInfoPools__[s].impl;}
    this.getCorePath      = function(){ return __pageInfo__['core']; };
    this.getPagePath      = function(){ return __pageInfo__['path']; };
    this.getPageName      = function(){ return __pageInfo__['name']; };
    this.getPageInfo      = function(){ return __pageInfo__['info']; };
    this.getPageArgs      = function(){ var t={};for(var k in __pageInfo__['args'])t[k]=__pageInfo__['args'][k]; return t;};
}

// init instance
if(typeof(A9Loader) == 'undefined' || !(A9Loader instanceof __A9Loader__))
{
    A9Loader = new __A9Loader__();
}
