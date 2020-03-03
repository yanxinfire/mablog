var websocket = null;
var app_name = document.getElementById("app_name").innerHTML;
var deploy_version = document.getElementById("deploy_version").innerHTML || "Demo";
var env_name = document.getElementById("env_name").innerHTML || "Demo";
var operation_no = document.getElementById("operation_no").innerHTML || "Demo";
if('WebSocket' in window){
    var messageContainer = document.getElementById("logoutput");
    var percentContainer = document.getElementById("procPer");
    var hostname = window.location.hostname;
    var port = window.location.port || 8888;
    console.log(hostname,port);
    websocket = new WebSocket("ws://" + hostname + ":" + port + "/channels_ws/");
}
else{
    alert('Not support websocket')
}

websocket.onerror = function(){
    console.log("error");
}
websocket.onopen = function(evt){
    console.log("open");
}
websocket.onmessage = function(evt){
    console.log("new msg is: ", evt.data);
    if (evt.data.length != 0) {
        var temp_array = evt.data.split("\n");
        for (temp_item in temp_array) {
            if  (temp_array[temp_item].indexOf("[ERROR]") > 0 ) {
                    temp_array[temp_item] = "<font color='red'>" +  temp_array[temp_item] + "</font>"
            }
            temp_array[temp_item] = temp_array[temp_item].replace(/\\n/g,"</br>");//.replace(/</g, "&lt;").replace(/>/g, "&gt;");;
            temp_array[temp_item] = temp_array[temp_item] +  "</br>";
            messageContainer.innerHTML += temp_array[temp_item];
        }
    }
    var d = messageContainer.scrollHeight;
    messageContainer.scrollTop = d;
    var ans = messageContainer.innerHTML.match(/\w+.\w+.\w+.\w+,\sdeploy\sprogress\s\d+/g);
    var dic = {};
    for (item in ans){
        dic_key = ans[item].split(',')[0];
        dic_value = ans[item].split(',')[1].split(" ")[3];
        dic[dic_key] = dic_value;
    }
    for (key in dic) {
        if(document.getElementById(key + "label") == undefined){
            var span=document.createElement('span');
            span.setAttribute("id", key + "label");
            percentContainer.appendChild(span);
            document.getElementById(key + "label").innerHTML =
            key + ":" + dic[key] + "%" + "<br>";
        } else {
            document.getElementById(key + "label").innerHTML =
            key + ":" + dic[key] + "%" + "<br>";
        }
        $('#jqmeter-container').jQMeter({
            goal:'100',
            raised: dic[key],
            width:'200px',
            height:'30px',
                bgColor: '#CCCCCC',
                barColor: '#FF0000'
        });
    }
}

websocket.onclose = function(){
    console.log("close");
}

window.onbeforeunload = function(){
    websocket.close();
}

function closeWebSocket(){
    websocket.close();
}

setInterval(
    function send(){
        var message = {
            "deploy_version": deploy_version,
            "app_name": app_name,
            "env_name": env_name,
            "operation_no": operation_no
        }
        websocket.send(JSON.stringify(message));
    },
2000)