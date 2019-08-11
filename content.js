var PageCount=0;//总页数
var CurPageCount=0;//当前所在页
var PageArray;//克隆控制数组
var PageArrayFinish;//对照组
var Clone=false;//克隆开关
var PageID="";//页面ID
var SCSDivID;//显示克隆状态的DIV的ID
var ThisScroll;//循环执行对象
var CloneDivObject;//克隆的DIV对象

document.addEventListener("copy", function (event) {event.stopPropagation();}, true);

window.onload = function(){
	//获取总页数
	PageCount=parseInt($(".page-count").text().replace("/",""));

	//创建克隆控制数组 和 对照组
	CloneDivObject=Array(PageCount);
	PageArray = Array(PageCount).fill("Yes");
	PageArrayFinish = Array(PageCount).fill("No");
};

$(document).ready(function(){
	//展开所有页
	$(".down-arrow.goBtn").click();
	//回到页面顶端
	window.setTimeout(function(){window.scroll(0,0);}, 500);
});

ThisScroll=setInterval(BaiDuClone, 250);
//$(document).scroll(function(){});
//window.addEventListener('scroll',throttle(BaiDuClone,1,250));

chrome.runtime.onMessage.addListener(
	function(msg, sender, sendResponse) {
		//
		if (msg.message == 'Go') {
			//
			Clone=true;

			//$(".main").wrap("<center></center>"); 
			$(".main").attr("align","center");
			$(".main").css("margin-right","0px");

			$("#hd").remove();
			$("#doc-header-test").remove();
			$("#lastcell-dialog").remove();
			$("#ft").remove();
			$("#doc_bottom_wrap").hide();//*
			$("#next_doc_box").remove();
			$("#view-like-recom").remove();
			$("#guess-like-doc").remove();
			$("#fc-left").remove();

			$(".crubms-wrap").remove();
			$(".wk-other-new-cntent").remove();
			$(".doc-tag-wrap.super-vip").remove();
			$(".aside.aside-v3").remove();
			$(".fix-searchbar-wrap").remove();
			$(".reader-back2top-wrap").remove();
			$(".banner-ad.banner-wrap").remove();
			$(".ft").remove();
			$(".wkfc-wrap").remove();
			$(".aside").remove();
			$(".fc-inner").remove();
			$('a[title="全屏显示"]').remove();

			$(".reader-tools-bar-wrap.tools-bar-small").hide();//*
			//$(".reader-tools-bar-center.clearfix").css("margin-right","0px");

			ShowCloneState();
			}
		//
		if (msg.message == 'Refresh') {
			window.location.reload();
		}
		sendResponse();
	}
);

function BaiDuClone(){
	//克隆开始
	if(Clone==true)
	{
		//
		CurPageCount=parseInt($(".page-input").val());
		//
		if(PageArray[CurPageCount-1]=="Yes")
		{
			//
			PageArray[CurPageCount-1]="No";
			//
			PageID="#pageNo-"+CurPageCount;
			//
			CloneDivObject[CurPageCount-1] = $(PageID).clone();
			//
			SCSDivID="#SCSCloneDiv"+CurPageCount;
			$(SCSDivID).css("background-color","#66CD00");
		}
		//
		if(PageArray.toString()===PageArrayFinish.toString()){
			//
			Clone=false;
			//
			clearInterval(ThisScroll);
			//
			$('div[id*="pageNo"]').each(function(i){
				CloneDivObject[i].replaceAll($(this).parent());
			});
			//
			window.setTimeout(function(){
				$('div[id*="CloneDiv"]').each(function(i){
					$(this).hide();
				});
			}, 3000);
		}
	}
}

function ShowCloneState(){
	//
	var ThisDivStyle;
	var ThisTopJi=50;
	var ThisTopOu=50;
	var ThisDivName;
	//
	for (var i=1;i<=PageCount;i++)
	{
		//
		ThisDivName="SCSCloneDiv"+i;
		//
		if(i%2==1){
			//
			ThisDivStyle="<div id="+ThisDivName+" style=\"position:fixed; top:"+ThisTopJi+"px; right:50px; width:15px; height:15px; background-color:#FFCC00;\"></div>";
			//
			ThisTopJi+=25;
		}
		else{
			//
			ThisDivStyle="<div id="+ThisDivName+" style=\"position:fixed; top:"+ThisTopOu+"px; right:25px; width:15px; height:15px; background-color:#FFCC00;\"></div>";
			//
			ThisTopOu+=25;
		}
		//
		$("body").append(ThisDivStyle);
	}
}