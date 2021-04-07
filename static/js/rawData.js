var req = new XMLHttpRequest();
req.open("get", "/api/users", false)
req.onload = function () {
    alert("已成功聯繫伺服器");
};
req.send(null);
var contextArea = JSON.parse(req.responseText);
console.log(contextArea["data"])

function formDatabox() {
    const form = document.forms['searchForm'];
    const name = form.elements.searchName.value;
    if (contextArea["data"]["username"].indexOf(name) >= 0) {
        var box = document.getElementById('searchresult');
        box.textContent = contextArea["data"]["name"];
        // document.getElementById("searchresult").innerHTML = contextArea["data"]["name"];
        alert(contextArea["data"]["name"])
    }
    else {
        var box = document.getElementById('searchresult');
        box.textContent = "沒有這個使用者喔\n或是你還沒有權限";
        alert("沒有這個使用者喔\n或是你還沒有權限")
    }
}