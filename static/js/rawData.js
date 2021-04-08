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
        // var contextArea = JSON.parse(req.responseText);
        // console.log(contextArea);
        // const form = document.forms['searchForm'];
        // const name = form.elements.searchName.value;
        // var usernamebox = []
        // if (name.length > 0) {
        //     for (var i = 0; i < contextArea["data"].length; i++) {
        //         usernamebox.push(contextArea["data"][i]["username"])
        //     }
        //     var userindex = usernamebox.indexOf(name)
        //     if (userindex > 0) {
        //         var box = document.getElementById('searchresult');
                // box.textContent = contextArea["data"][userindex]["name"] + "(" + contextArea["data"][userindex]["username"] + ")";
    //             box.textContent = "{{userInfo_json}}";
    //         }
    //         else {
    //             var box = document.getElementById('searchresult');
    //             // box.textContent = "沒有這個使用者";
    //             box.textContent = "{{userInfo_json}}";
    //         }
    //     }
    //     else {
    //         var box = document.getElementById('searchresult');
    //         box.textContent = "輸入值為空,請重新輸入查詢帳號";
    //         alert("輸入值為空,請重新輸入查詢帳號")
    //     }


//     };
// req.send(null);
// }