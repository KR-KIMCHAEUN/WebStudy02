<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>08/cacheControl.jsp</title>
</head>
<body>
<h4>캐시 제어</h4>
<h4>캐싱하지 않는 방법</h4>
<pre>
	Cache : 자원이 네트원크를 통해 전송되는 동안 발생하는 부하와 latency time을 줄이기 위한 저장 데이터 형태.
	
	: Pragma(http 1.0), Cache-Control(http 1.1), Expires(version 무관, Date(long)).. 응답 헤더로 캐시 제어.
	response.setHeader(name,value),getIntHeader(name,int value),setDateHeader(name,long value)
	response.addHeader(name,value),getIntHeader(name,int value),setDateHeader(name,long value)
	<%
		response.setHeader("Pragma", "no-cache");
		response.setHeader("Cache-Control", "no-cache"); //매번 나한테 물어봐
		response.addHeader("Cache-Control", "no-store"); //아예 저장하지 마!
		response.setDateHeader("Expires", 0);
	%>
</pre>
</body>
</html>