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

// =================================================================GET COOKIE NPK=====================
var getCookieNPK = getCookie("npk")
console.log(getCookieNPK)
$.ajax({
    url: 'http://10.10.100.152:4869/user/getUser/'+getCookieNPK,
    method : 'GET',
    async:true,
    headers: {
        'Authorization':'Bearer ' + getCookie("token"),
        // 'X-CSRF-TOKEN':'xxxxxxxxxxxxxxxxxxxx',
        // 'Content-Type':'application/json'
    },
    // type : 'GET',
    // data: [],{}, string, int, JSON.stringify([{}]) --> misalnya API butuh data dr user,
    success: function(result){
        console.log(result)
        console.log(result.data.npk)
        npk= result.data.npk
        console.log(npk)
        $("#nama").val(result.data.nama)

    },
    error : function(){
        // error handling
    },
    complete: function(){
        
    },
    statusCode: {
        403: function() {
            window.location.href = 'index.html'
        }
    }
})