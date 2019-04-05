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

// ========================================================REGISTER=============================================
function register(){
    var nama = document.getElementById('nama').value
    var email = document.getElementById('email').value
    var password = document.getElementById('password').value
    var posisi_id = document.getElementById('listPosisiRegister').value
    var role_id = document.getElementById('listRoleRegister').value

    $.ajax({
        url: 'http://10.10.100.152:4869/user',
        method: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({
            nama: nama,
            email: email,
            password: password,
            role_id: role_id,
            posisi_id: posisi_id
        }),
        success: function(){
            alert("Anda berhasil bergabung")
            window.location.href = 'index.html'
        },
        error: function(){
            alert("Andah gagal bergabung")
        },
        complete: function(){
            console.log("mantul")
        }
    })
}

// =============================================get All Posisi ===== pilih posisi pas REGISTER
$.ajax({
    url: 'http://10.10.100.152:4869/master/posisi/getAll',
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
        listPosisi = ""
        console.log(result)
        $("#listPosisiRegister").append("<option value="+0+">"+"Pilih Posisi"+"</option>")
        for (let i=0; i<result.data.length; i++){
            $("#listPosisiRegister").append("<option value="+result.data[i].posisi_id+">"+result.data[i].posisi_name+"</option>")
        }

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


$.ajax({
    url: 'http://10.10.100.152:4869/master/role/getAll',
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
        listPosisi = ""
        console.log(result)
        $("#listRoleRegister").append("<option value="+0+">"+"Pilih Role"+"</option>")
        for (let i=0; i<result.data.length; i++){
            $("#listRoleRegister").append("<option value="+result.data[i].role_id+">"+result.data[i].role_name+ " " + result.data[i].posisi_name+"</option>")
        }

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