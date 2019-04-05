
// ========================================================LOGOUT=======
function logout() {
    eraseCookie("token")
    eraseCookie("npk")
    eraseCookie("record_id")
    eraseCookie("task_id")
    
    var getcookie = getCookie("npk")
    alert("berhasil logout", getcookie)
}

// ==================================================GET COOKIE==========================================
function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {   
    document.cookie = name+'=; Max-Age=-99999999;';  
}