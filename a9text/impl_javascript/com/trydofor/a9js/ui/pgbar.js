//UTF8(BOM)  GPL  trydofor.com  Mar. 2008
/* property name is lowercase, class name is uppercase*/
var ProgressBar = function(doc)
{
	if(doc == null) throw "para[doc] is null";
	
	ProgressBar.__counter__++;
	var __barId__  = ProgressBar.__counter__;
	var __divObj__ = null;
	var __infoObj__ = null;
	var __percObj__ = null;
	var __worked__ = 0;
	function __show__(){
		if(__divObj__ == null){
			var divHTML = ""+
			//"<div id='"+id+"' style='position:absolute; left:34px; top:0px; width:200px; z-index:1; padding:1px; border: 1px solid #000000; font-size:12px'>"+
			"  <table width='200' height='30' border='0' cellpadding='1' cellspacing='1' bgcolor='#FFFFFF'>"+
			"    <tr><td width='200' height='16'><div id='"+__barId__+"_info' style='font-size:12px; height:16px; width:200px; overflow:hidden'>loading...</div></td></tr>"+
			"    <tr><td width='200' height='14' style='border:1px solid #000000;'><div id='"+__barId__+"_perc' style='font-size:12px;width:"+__worked__+"%;height:14px; background-color:#3366CC; color:#FFFFFF; text-align:center; overflow:hidden'>"+
			"    "+__worked__+"%"+
			"    </div></td></tr>"+
			"  </table>";
			//"</div>";
			
			__divObj__ = document.createElement('DIV');
		    __divObj__.setAttribute('id',__barId__);
		    __divObj__.setAttribute('style','position:absolute; left:34px; top:0px; width:210px;height:30px; z-index:1; border: 1px solid #000000; font-size:12px');
		    __divObj__.innerHTML=divHTML;
			doc.body.appendChild(__divObj__);
		}else{
			__divObj__.style.display='';
		}
	}
	
	function __work__(w,info){
		if(w == null) return;
		__worked__ += w;
		if(__worked__ >100) __worked__ =100;
		if(__worked__ <0) __worked__ = 0;
		
		if(__infoObj__ == null) __infoObj__ = doc.getElementById(__barId__+"_info");
		if(__percObj__ == null) __percObj__ = doc.getElementById(__barId__+"_perc");
		
		if(info != null)__infoObj__.innerHTML = info;
		__percObj__.style.width=__worked__+"%";
		__percObj__.innerHTML=__worked__+"%";
	}
	
	function __done__(){
		__worked__ = 0;
		__divObj__.style.display='none';
	}
	
	this.done = __done__;
	this.work = __work__;
	this.show = __show__;
}
ProgressBar.__counter__ = 0;
