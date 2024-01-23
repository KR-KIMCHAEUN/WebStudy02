//case2 : parameter 전송 후 json 응답 수신

let fnOwner = {
	fnHtml : function(html){
		resultArea.innerHTML=html;
	},
	fnJson : function(jsonObj){
		resultArea.innerHTML=jsonObj.calculator.expression;
	}
}


document.addEventListener("DOMContentLoaded",function(){

   calForm.addEventListener("submit", function(event){
      event.preventDefault();

      let url = event.target.action;
      let method = event.target.method;
	  let acceptRdo=document.querySelector("[name='accept']:checked");

	  let accept =acceptRdo?.value ?? "text/html";
	  let fnName =acceptRdo?.dataset.fnName ?? "fnHtml";

      let formData = new FormData(calForm);
      let urlSearchParams = new URLSearchParams(formData);
      let fetchPromise = fetch(url, {
         method : method,
         headers : {
            "Content-Type" : event.target.enctype,
			"Accept" : accept
         }, body : urlSearchParams
      });

      fetchPromise.then(resp => {
         if(resp.ok){
			let respContentType=resp.headers.get("Content-Type");
			if(respContentType.indexOf("json")>0){
				return resp.json();
			}else{
				return resp.text();
			}
         }else{
			throw new Error(`상태코드 :${resp.status}발생`,{cause:resp});
		}
      }).then(fnOwner[fnName]).catch(err=>{
			console.error(err.message);	
			if(err.cause){
				let resp = err.cause;
				resp.text().then(ep=>resultArea.innerHTML=ep);
			}
		});
	  return false;
      
   });

});
