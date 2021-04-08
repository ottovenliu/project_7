function formDatabox() {
    var req = new XMLHttpRequest();
    req.open("get", "/api/users");
    req.onload = function () {
        alert("已成功聯繫伺服器");
        const form = document.forms['searchForm'];
        const name = form.elements.searchName.value;
        var req_username = new XMLHttpRequest();
        var search_url = "/api/users?username=" + name
        req_username.open("get", search_url)
        req_username.onload = function () {
            alert("已成功讀取資料")
            var contextArea = JSON.parse(req_username.responseText)
            console.log(contextArea)
            var box = document.getElementById('searchresult');
            box.textContent = contextArea["name"] + "(" + contextArea["username"] + ")"
        };
        req_username.send()
    };
    req.send();
}