// var req = new XMLHttpRequest();
// req.open("get", "/api/users", false)
// req.onload = function () {
//     alert("已成功聯繫伺服器");
// };
// req.send(null);
// var contextArea = JSON.parse(req.responseText);
// console.log(contextArea["data"])

function formDatabox() {
    var req = new XMLHttpRequest();
    req.open("get", "/api/users", false)
    req.onload = function () {
        alert("已成功聯繫伺服器");
    };
    req.send(null);
    var contextArea = JSON.parse(req.responseText);
    console.log(contextArea);
    const form = document.forms['searchForm'];
    const name = form.elements.searchName.value;
    console.log(name);
    console.log(typeof (name));
    var usernamebox = []
    if (name.length > 0) {
        for (var i = 0; i < contextArea["data"].length; i++) {
            usernamebox.push(contextArea["data"][i]["username"])
        }
        var userindex = usernamebox.indexOf(name)
        if (userindex > 0) {
            var box = document.getElementById('searchresult');
            box.textContent = contextArea["data"][userindex]["name"] + "(" + contextArea["data"][userindex]["username"] + ")";
            // document.getElementById("searchresult").innerHTML = contextArea["data"]["name"];
            // alert(contextArea["data"][userindex]["name"])
        }
        else {
            var box = document.getElementById('searchresult');
            box.textContent = "沒有這個使用者";
            // alert("沒有這個使用者")
        }
    }
    else {
        var box = document.getElementById('searchresult');
        box.textContent = "輸入值為空,請重新輸入查詢帳號";
        alert("輸入值為空,請重新輸入查詢帳號")
    }

    // if (contextArea["data"]["username"].indexOf(name) >= 0) {
    //     var box = document.getElementById('searchresult');
    //     box.textContent = contextArea["data"]["name"] + "(" + contextArea["data"]["username"] + ")";
    // document.getElementById("searchresult").innerHTML = contextArea["data"]["name"];
    //     alert(contextArea["data"]["name"])
    // }
    // else {
    //     var box = document.getElementById('searchresult');
    //     box.textContent = "沒有這個使用者喔\n或是你還沒有權限";
    //     alert("沒有這個使用者喔\n或是你還沒有權限")
    // }
}