<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page isErrorPage="true"%>
<%@ page import="org.apache.commons.httpclient.HttpStatus"%>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="icon" href="resources/duck.png">
    <link rel="stylesheet" href="assets/css/styleError.css"/>
    <title>Error</title>
</head>
<body>
<header>
    <div class="header">
        <% if (exception != null) { %>
        <p><%= exception.getClass().getName() %></p>
        <% } else { %>
        <% int status = response.getStatus();%>
        <p><%= status + " " + HttpStatus.getStatusText(status) %></p>
        <% } %>
    </div>
</header>
<div class="img-container">
    <img src="resources/loading-cat.gif" alt="???" width=""/>
    <a href="/weblab2">Main page</a>
</div>
</body>
</html>