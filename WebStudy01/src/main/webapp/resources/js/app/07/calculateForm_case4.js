
document.addEventListener("DOMContentLoaded",function(){

   calForm.addEventListener("submit", function(event){
      event.preventDefault();

	  let form = event.target
	  let contentType = "application/json";
      let url = event.target.action;
      let method = event.target.method;
      let formData = new FormData(calForm);
	  let nativeData = {
			leftOp:parseFloat(formData.get("left")),
			rightOp:parseFloat(formData.get("right")),
			operatorType:formData.get("operator")
	  };
	  let jsonStr =JSON.stringify(nativeData) ;// marshalling
      let fetchPromise = fetch(url, {
         method : method,
         headers : {
            "Content-Type" : contentType,
			"Accept" : "text/html"
         }, body : jsonStr
      });

      fetchPromise.then(resp => {
         if(resp.ok){
            return resp.text();
         }else{
			throw new Error(`상태코드 :${resp.status}발생`,{cause:resp});
		}
      }).then(text => {
        	resultArea.innerHTML=text;
      }).catch(err=>{
			console.log(err.message);	
			if(err.cause){
				let resp = err.cause;
				resp.text().then(ep=>resultArea.innerHTML=ep);
			}
		});
	  return false;
      
   });

});
