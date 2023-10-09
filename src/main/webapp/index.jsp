<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@ page import="java.util.List" %>
<%@ page import="servlets.ResultObject" %>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Weblab #2</title>
    <link rel="icon" href="resources/duck.png">
    <link rel="stylesheet" href="assets/css/style.css"/>
</head>

<body>

<header>
    <div class="header">
        <div class="themes-container">
            <button id="theme-toggle-button">
                To the dark side
            </button>
            <button id="ugly-theme-button">
                No please
            </button>
        </div>
<%--        <img src="resources/ipaddress.jpg" width="60" height="60" alt="???"/>--%>
    </div>
    <div class="info">
        <p>Romanenko Mikhail Romanovich</p>
        <p>Group P3211</p>
        <p>Variant 3101</p>
    </div>
</header>

<div id="container">

    <div class="canvas-container section-container">
        <canvas id="graph-canvas" width="500" height="500">Canvas isn't supported by your browser</canvas>
        <span id="canvas-error-label" class="error-label margin"></span>
    </div>

    <div class="form-container section-container">
        <form action="${pageContext.request.contextPath}/controllerServlet" method="POST" id="main-form">

            <div class="x-container">
                <div class="input-container">
                    <label for="x-input" class="margin">Enter X:</label>
                    <input id="x-input" class="field" type="text" name="x" maxlength="15" placeholder="In the interval (-5; 3)" required/>
                </div>
                <span id="x-error-label" class="error-label margin"></span>
            </div>

            <div class="y-container multi-choice">
                <label class="margin">Select Y:</label>
                <div class="choice-group">

                    <div class="choice-container">
                        <input type="radio" class="chb" id="-4" value="-4" name="y"/>
                        <label for="-4">-4</label>
                    </div>

                    <div class="choice-container">
                        <input type="radio" class="chb" id="-3" value="-3" name="y"/>
                        <label for="-3">-3</label>
                    </div>

                    <div class="choice-container">
                        <input type="radio" class="chb" id="-2" value="-2" name="y"/>
                        <label for="-2">-2</label>
                    </div>

                    <div class="choice-container">
                        <input type="radio" class="chb" id="-1" value="-1" name="y"/>
                        <label for="-1">-1</label>
                    </div>

                    <div class="choice-container">
                        <input type="radio" class="chb" id="0" value="0" name="y"/>
                        <label for="0">0</label>
                    </div>

                    <div class="choice-container">
                        <input type="radio" class="chb" id="1" value="1" name="y"/>
                        <label for="1">1</label>
                    </div>

                    <div class="choice-container">
                        <input type="radio" class="chb" id="2" value="2" name="y"/>
                        <label for="2">2</label>
                    </div>

                    <div class="choice-container">
                        <input type="radio" class="chb" id="3" value="3" name="y"/>
                        <label for="3">3</label>
                    </div>

                    <div class="choice-container">
                        <input type="radio" class="chb" id="4" value="4" name="y"/>
                        <label for="4">4</label>
                    </div>

                </div>
                <span id="y-error-label" class="error-label margin"></span>
            </div>

            <div class="r-container">
                <div class="input-container">
                    <label for="r-input" class="margin">Select R:</label>
                    <select id="r-input" class="field" name="r">
                        <option value="" selected></option>
                        <option value="1">1</option>
                        <option value="1.5">1.5</option>
                        <option value="2">2</option>
                        <option value="2.5">2.5</option>
                        <option value="3">3</option>
                    </select>
                </div>
                <span id="r-error-label" class="error-label margin"></span>
            </div>

            <div class="buttons-container">
                <input type="submit" value="Submit">
                <button id="clear-button">Clear table</button>
            </div>
        </form>
    </div>

    <div class="table-container section-container">
        <table id="result-table">
            <thead>
            <tr>
                <th>Result</th>
                <th>X</th>
                <th>Y</th>
                <th>R</th>
                <th>Exec time</th>
                <th>Executed at</th>
            </tr>
            </thead>
            <tbody>
            <jsp:useBean id="resultBean" scope="application" class="servlets.ResultBean"/>
            <%
                List<ResultObject> previousResults = resultBean.getPreviousResults();
                for (ResultObject item : previousResults) {
            %>
            <tr>
                <td><%= item.getResult() %></td>
                <td><%= item.getX() %></td>
                <td><%= item.getY() %></td>
                <td><%= item.getR() %></td>
                <td><%= item.getExecTime() %></td>
                <td><%= item.getCurrentTime() %></td>
            </tr>
            <%
                }
            %>
            </tbody>
        </table>
    </div>
</div>

<script type="text/javascript" src="assets/js/Drawer.js"></script>
<script type="text/javascript" src="assets/js/script.js"></script>

</body>
</html>
