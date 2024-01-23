/**
 * 
 */
/*
1. 페이지가 완성되면,
2. 비동기 요청 (/10/mbti)을 전송하고,
3. json content 를 수신한 후,
4. select 의 option 태그를 동적 구성함.
*/
//WWD plugin 

//function resolve(){
//	
//}
//var resolve = function(){ 
//	
//};
var fnResolveEntrySet = (jsonObj)=>{
	let mapArray = jsonObj.entrySet;
	let options = "";
	options += mapArray.map((associativeArray)=>{
		console.log(associativeArray);
		let option = "";
		for(let propName in associativeArray){ // 1번 실행
			let entryKey = propName;
			let entryValue = associativeArray[entryKey];
			option += `<option value="${entryKey}">${entryValue}</option>`;
		}
		return option;
	}).join("\n");
	document.querySelector("[name='type']").innerHTML = options;
};
var findCookie  = (name) =>{
	let matches=document.cookie.match(`${name}=([^;]+)`);
	return matches ? matches[1] : undefined; 
}

const select = document.querySelector("[name='type']");

var fnResolveEntryMap = (jsonObj)=>{
	let associativeArray = jsonObj.entryMap;
//	console.log(associativeArray)
	let options = "";
	for(let propName in associativeArray){
		let entryKey = propName;
		let entryValue = associativeArray[entryKey];
		options += `<option value="${entryKey}">${entryValue}</option>`;
	}
	document.querySelector("[name='type']").innerHTML = options;
	
//	let savedType=findCookie("mbtiCookie");
 	let savedType= select.dataset.initValue;
	if(savedType){
		select.value =savedType;
		select.form.requestSubmit();
	}

//		console.log(options)
};

var fnOptionLoad = (event)=>{
	cPath = document.body.dataset.contextPath;
	
	fetch(`${cPath}/10/mbti`, {
		method:"get",
		headers:{
			"Accept":"application/json"	
		}
	}).then(resp=>{
		if(resp.ok){
			return resp.json();
		}else{
			throw new Error(`상태코드 ${resp.status}`, {cause:resp});
		}
	}).then(fnResolveEntryMap).catch(err=>console.error(err));
	};

var fnMbtiLoad = (event)=>{
	if(event.target.tagName !== "FORM") return false;
	
	let form = event.target;
	event.preventDefault();
	let formData = new FormData(form);
	let urlSearchParams = new URLSearchParams(formData);
	fetch(`${form.action}?${urlSearchParams}`,{
		method:form.method,
		headers:{
			"Accept":"text/html"
		},cache : "no-cache"
	}).then(resp=>{
		if(resp.ok){
			return resp.text();
		}else{
			throw new Error('상태코드 ${resp.status}',{cause:resp});
		}
	}).then(html=>{
		if(!window['resultArea']){
			let div = document.createElement("div");
			div.id = "resultArea";
			form.after(div)
		}
		let parser = new DOMParser();
		let newDoc=parser.parseFromString(html, "text/html");
		let preTag=newDoc.body.innerHTML;
		resultArea.innerHTML = preTag;
	}).catch(err=>console.error(err));
	
};

document.addEventListener("DOMContentLoaded", fnOptionLoad);

document.addEventListener("submit", fnMbtiLoad);
