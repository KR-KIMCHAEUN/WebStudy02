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
$(document).ready(function() {
    let cPath = $("body").data("contextPath");

    var fnResolveEntrySet = function(jsonObj) {
        let mapArray = jsonObj.entrySet;
        let options = "";
        options += $.map(mapArray, function(associativeArray) {
            console.log(associativeArray);
            let option = "";
            $.each(associativeArray, function(propName, entryValue) {
               let entryKey = propName;
                option += '<option value="' + entryKey + '">' + entryValue + '</option>';
            });
            return option;
        }).join("\n");
        $("[name='type']").html(options);
    };

    var fnResolveEntryMap = function(jsonObj) {
        let associativeArray = jsonObj.entryMap;
        let options = "";
        $.each(associativeArray, function(entryKey, entryValue) {
            options += '<option value="' + entryKey + '">' + entryValue + '</option>';
        });
        $("[name='type']").html(options);
    };

    var fnOptionLoad = function(event) {
        fetch(`${cPath}/10/mbti`, {
            method: "get",
            headers: {
                "Accept": "application/json"
            }
        }).then(function(resp) {
            if (resp.ok) {
                return resp.json();
            } else {
                throw new Error('상태코드 ' + resp.status, { cause: resp });
            }
        }).then(fnResolveEntryMap).catch(function(err) {
            console.error(err);
        });
    };

    var fnMbtiLoad = function(event) {
        if (event.target.tagName !== "FORM") return false;

        let form = event.target;
        event.preventDefault();
        let formData = new FormData(form);
        let urlSearchParams = new URLSearchParams(formData);
        fetch(`${form.action}?${urlSearchParams}`, {
            method: form.method,
            headers: {
                "Accept": "text/html"
            }
        }).then(function(resp) {
            if (resp.ok) {
                return resp.text();
            } else {
                throw new Error('상태코드 ' + resp.status, { cause: resp });
            }
        }).then(function(html) {
            if (!$('#resultArea').length) {
                let div = $('<div id="resultArea"></div>');
                form.after(div);
            }
            let newDoc = $.parseHTML(html);
            let preTag = $(newDoc).find('body').html();
            $('#resultArea').html(preTag);
        }).catch(function(err) {
            console.error(err);
        });
    };

    $(document).on("DOMContentLoaded", fnOptionLoad);
    $(document).on("submit", fnMbtiLoad);
});
