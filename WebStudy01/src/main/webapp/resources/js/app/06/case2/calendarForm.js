/**
 * 
 */
	calForm.querySelectorAll("[name]").forEach((el, idx)=>{
	/*	data-init-value 속성으로부터 엘리먼트 초기값 로딩.*/        
	/*data-* 속성의 키값 규칙성, 카멜 표기법을 표현할 때 '-'으로 대체함.
		ex) data-role : key(role)
			data-init-value : key(initValue)*/
		let name = el.name;
		calForm[name].value= el.dataset.initValue;
	});
	calForm.addEventListener("change", (event)=>{
		console.log(event);
		event.target.form.requestSubmit();
	});
	
// 	$(selector).on("click",function(){}) //정적 엘리먼트
// 	$(parent).on("click",selector, function(){}) //동적 엘리먼트 : 이벤트 버블링 구조 활용 
// 	$(document).on("click","control-a", function(){}) //동적 엘리먼트 : 이벤트 버블링 구조 활용 
	
// 	document.querySelectorAll(".control-a").forEach((el, idx)=>{
		document.addEventListener("click", (event)=>{
			if(event.target.classList.contains("control-a")){
//				console.log(event.target);
				let el = event.target;
				calForm.year.value = el.dataset.year;
				calForm.month.value = el.dataset.month;
				calForm.requestSubmit();
				
			}
		});
// 	});
	
	calForm.addEventListener("submit",(event)=>{
		event.preventDefault();
		let url = event.target.action;
		let method = event.target.method;
		let formData=new FormData(calForm);
		let urlSearchParams = new URLSearchParams(formData);
		let fetchPromise=fetch(url, {
			method: method,
			headers:{
				"Content-Type" : calForm.enctype
			}, body : urlSearchParams
		});
		fetchPromise.then(resp=>{
			if(resp.ok){
				return resp.text();
			}else{
				throw new Error(`상태코드 \${resp.status}이 응답으로 전송됨.`,{cause:resp});
			}
		}).then(html=>{
			calArea.innerHTML = html;
		}).catch(err=>{
			console.log(err);
			console.log(err.cause);
		}).finally(()=>{
			
		});
	});
	
	calForm.requestSubmit();
