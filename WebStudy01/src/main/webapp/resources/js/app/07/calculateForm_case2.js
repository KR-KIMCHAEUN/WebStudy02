//case2 : parameter 전송 후 json 응답 수신
document.addEventListener("DOMContentLoaded",function(){

   calForm.addEventListener("submit", function(event){
      event.preventDefault();

      let url = event.target.action;
      let method = event.target.method;
	  let accept = "application/JSON";
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
            return resp.json(); //내부적으로 언마샬링
         }else{
			throw new Error(`상태코드 :${resp.status}발생`,{cause:resp});
		}
      }).then(jsonObj => {
	
        	resultArea.innerHTML=jsonObj.expression; //expression으로 unmarshalling된 구체적인 데이터를 가져오기 

      }).catch(err=>{
			console.error(err.message);	
			if(err.cause){
				let resp = err.cause;
				resp.text().then(ep=>resultArea.innerHTML=ep);
			}
		});
	  return false;
      
   });

});
