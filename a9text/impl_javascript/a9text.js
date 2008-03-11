try{
    var bodyHtml = document.body?document.body.innerHTML:"";
    var iframeMap = [];
    var a9PreText = [];
    var a9PreObjs = [];
    var preTags = document.getElementsByTagName("PRE");
    for(var i=0; i<preTags.length;i++){
        if(/a9text/i.test(preTags[i].getAttribute("title"))){
            var preText = preTags[i].innerText || preTags[i].textContent;
            if (preText != ""){
                a9PreText.push(preText);
                a9PreObjs.push(preTags[i]);
            }
        }
    }
    if(a9PreText.length >0){
        A9Loader.syncLoadClass('com.trydofor.a9js.ui.pgbar');
        var pgbar = new ProgressBar(window.document);
        pgbar.show();
        pgbar.work(20,"loading a9text class");
        
        A9Loader.asyncLoadClass('com.trydofor.a9text.parser.a9text');
        A9Loader.asyncLoadClass('com.trydofor.a9text.render.html.a9text');
        
        A9Loader.runAfterClassLoaded(function(){
            pgbar.done();
            for(var i=0; i<a9PreText.length;i++){
                var a9dom = new A9Dom(null,A9Dom.type.root); //com.trydofor.a9text.A9Dom
                a9dom.setText(a9PreText[i]);
                a9dom.putInfo(A9Dom.type.root$path,A9Loader.getPagePath());
                var ifr=document.createElement('IFRAME');
                ifr.setAttribute('id','a9text_'+a9dom.getId());
                ifr.setAttribute('src','about:blank');
                ifr.setAttribute('frameborder','0',0);
                ifr.setAttribute('frameSpacing','0');
                ifr.setAttribute('scrolling','no');
                ifr.setAttribute('width','100%');
                ifr.setAttribute('height',a9PreObjs[i].scrollHeight+20);
                a9PreObjs[i].parentNode.replaceChild(ifr,a9PreObjs[i]);
                var ifrDoc = ifr.contentWindow.document;
                ifrDoc.open();
                ifrDoc.write("<body BGCOLOR='#DEDEDE'><pre>"+a9PreText[i]+"</pre></body>");
                ifrDoc.close();
                iframeMap[a9dom.getId()]=ifr;
                var ifrpgb = new ProgressBar(ifrDoc);
                ifrpgb.show();
                ifrpgb.work(10,'parsing a9text ...');
                //
                var a9Parser = new A9TextParser();
                a9Parser.setProgressBar(ifrpgb);
                a9Parser.parse(a9dom,function(prdom){
                    var a9Render = new A9TextRender();
                    ifrpgb.work(10,'rendering a9text ...');
                    a9Render.setProgressBar(ifrpgb);
                    a9Render.render(prdom,function(rrdom){
                        ifrpgb.done();
                        var data = rrdom.getData();
                        var linkCss = "";
                        for(var i =0; i< data['linkcss'].length; i++)
                            linkCss += "<link href='"+data['linkcss'][i]+"' rel='stylesheet' type='text/css' />";
                        var linkJs = "";
                        for(var i =0; i< data['linkjs'].length; i++)
                            linkJs += "<script type='text/javascript' src='"+data['linkjs'][i]+"'></script>";
                        var a9htm = linkCss+linkJs+data['htmltext'];
                        var ifr = iframeMap[rrdom.getId()];
                        var doc = ifr.contentWindow.document;
                        doc.open();
                        doc.write("<body>"+a9htm+"</body>");
                        doc.close();
                        window.setTimeout(function(){
                            ifr.setAttribute('height',doc.body.scrollHeight+20);
                        },500);
                    });
                });
            }
        });
    }
}catch(e){
    alert("failed to do a9text: "+e);
}