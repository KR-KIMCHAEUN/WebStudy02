
document.addEventListener("DOMContentLoaded",function(){

   calForm.addEventListener("submit", function(event){
      event.preventDefault();

      let url = event.target.action;
      let method = event.target.method;
      let formData = new FormData(calForm);
      let urlSearchParams = new URLSearchParams(formData);
      let fetchPromise = fetch(url, {
         method : method,
         headers : {
            "Content-Type" : event.target.enctype,
			"Accept" : "text/html"
         }, body : urlSearchParams
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
