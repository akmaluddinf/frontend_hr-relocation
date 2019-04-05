// ========================================================LOGIN=============================================

function login() {
    var email = document.getElementById('email-form').value
    var password = document.getElementById('password-form').value
    $.ajax({
        url:'http://10.10.100.152:4869/user/login',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            email: email,
            password: password

        }),
        success: function(response) {
            alert(response.message)
            window.location.href = 'home.html'
            createCookie("token", response.data.token, 7)
            createCookie("npk", response.data.npk, 7)

        },
        error: function(error){
            console.log(error)
        },
        

        // complete: function() {

        // }
    })
}

// ======================================================CREATE COOKIE=====================================
function createCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}