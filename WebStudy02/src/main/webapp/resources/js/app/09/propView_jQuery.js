/**
 * 
 */
/*
1. document 완성 + script 처리 완료 이벤트 처리
2. 비동기 요청
3. json content 수신
4. ul 태그 구성
*/
const cPath = $("body").data("contextPath");
const baseURI = `${cPath}/09/property`;

function fnCommFetch(url, options, fnResolve) {
   $.ajax({
      url: url,
      method: options.method,
      headers: options.headers,
      data: options.body ,
      contentType: "application/json",
      success: fnResolve,
      error: function(jqXHR, textStatus, errorThrown) {
         console.error(`상태코드 ${jqXHR.status} 수신`);
      }
   });
}

var fnRefreshDataLiTags = function(jsonObj) {
   let keyArray = jsonObj.keySet;
   let ulTag = $("<ul>").addClass("list-group");
   
   let liTags = keyArray.map(k => `
      <li class="list-group-item">
         <span class="delBtn">삭제</span>
         <span class="property-name" data-bs-toggle="modal" data-bs-target="#exampleModal">${k}</span>
      </li>
   `).join("\n");
   
   ulTag.html(liTags);
   ulTag.addClass("list-group");
   $("body").append(ulTag);
};

var fnReadProperties = function() {
   fnCommFetch(baseURI, {
      headers: {
         "Accept": "application/json"
      }
   }, fnRefreshDataLiTags);
};

var fnReadProperty = function(event) {
   if (!$(event.relatedTarget).hasClass("property-name")) return false;
   
   let propertyNameTag = $(event.relatedTarget);
   let propertyName = propertyNameTag.text();
   let modal = $(event.target);
   
   fnCommFetch(`${baseURI}/${propertyName}`, {
      headers: {
         "Accept": "application/json"
      }
   }, function(jsonObj) {
      let propertyValue = jsonObj.propertyValue;
      updateForm.propertyName.value = propertyName;
      updateForm.propertyValue.value = propertyValue;
   });

   $("li.active")?.toggleClass("active");
   propertyNameTag.parent().toggleClass("active");
};

var fnAddProperty = function(event) {
   event.preventDefault();
   let form = $(event.target);
   let data = {
      propertyName: form.find("[name='propertyName']").val(),
      propertyValue: form.find("[name='propertyValue']").val()
   };
   let body = JSON.stringify(data);
   fnCommFetch(baseURI, {
      method: "post",
      headers: {
         "Accept": "application/json",
         "Content-Type": "application/json"   
      },
      body: body
   }, function(jsonObj) {
      $("ul").remove();
      fnRefreshDataLiTags(jsonObj);
      form[0].reset();
   });

   return false;
};

var fnRemoveProperty = function(event) {
   if (!$(event.target).hasClass("delBtn")) return false;
   
   let propertyNameTag = $(event.target).next();
   let propertyName = propertyNameTag.text();
   
   fnCommFetch(`${baseURI}/${propertyName}`, {
      method: "delete",
      headers: {
         "accept": "application/json"
      }
   }, function(jsonObj) {
      if (jsonObj.success) {
         propertyNameTag.parent().remove();
      }
   });
};

var fnModifyProperty = function(event) {
   event.preventDefault();
   let form = $(event.target);
   let data = {
      propertyName: form.find("[name='propertyName']").val(),
      propertyValue: form.find("[name='propertyValue']").val()
   };
	let body = JSON.stringify(data);
   fnCommFetch(`${baseURI}/${data.propertyName}`, {
      method: "put",
      headers: {
         "Accept": "application/json",
         "Content-Type": "application/json"   
      },
      body: body
   }, function(jsonObj) {
      if (jsonObj.success) {
         let modalInstance = new bootstrap.Modal(document.getElementById('exampleModal'));
         modalInstance.hide();
         let modalToggler = $("li.active")[0].children[1];
         setTimeout(function() {
            modalInstance.show(modalToggler);            
         }, 1000);
      }
   });
   return false;
};

$(document).ready(function() {
   fnReadProperties();

   $(document).on("show.bs.modal", fnReadProperty);

   $(document).on("hidden.bs.modal", function(event) {
      $(event.target).find("form").trigger("reset");
   });

   $("#insertForm").on("submit", fnAddProperty);

   $("#updateForm").on("submit", fnModifyProperty);

   $(document).on("click", fnRemoveProperty);
});












