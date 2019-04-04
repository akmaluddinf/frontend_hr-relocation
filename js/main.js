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

function logout() {
    eraseCookie("token")
    eraseCookie("npk")
    eraseCookie("record_id")
    eraseCookie("task_id")

    var getcookie = getCookie("npk")
    alert("berhasil logout", getcookie)
}

// function eraseCookie(name) {   
//     document.cookie = name+'=; Max-Age=-99999999;';  
// }


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

//====================================================================create cookie
// function createCookie(name, value, days) {
//     var expires;
//     if (days) {
//         var date = new Date();
//         date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
//         expires = "; expires=" + date.toGMTString();
//     }
//     else {
//         expires = "";
//     }
//     document.cookie = name + "=" + value + expires + "; path=/";
// }

function createCookie(name,value,days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days*24*60*60*1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "")  + expires + "; path=/";
}

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

//====================================================================get cookie
// function getCookie(c_name) {
//     if (document.cookie.length > 0) {
//         c_start = document.cookie.indexOf(c_name + "=");
//         if (c_start != -1) {
//             c_start = c_start + c_name.length + 1;
//             c_end = document.cookie.indexOf(";", c_start);
//             if (c_end == -1) {
//                 c_end = document.cookie.length;
//             }
//             return unescape(document.cookie.substring(c_start, c_end));
//         }
//     }
//     return "";
// }


// ====================================================================get cookie NPK
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
        $("#requester-name").val(result.data.nama)
        $("#requester-npk").val(result.data.npk)
        $("#requester-position").val(result.data.posisi_name)
        $("#requester-position-code").val(result.data.posisi_id)
        $("#requester-role-code").val(result.data.role_id)

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


//=============================================================get All User=====pilih pegawai
$.ajax({
    url: 'http://10.10.100.152:4869/user/getAll',
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
        listPegawai = ""
        console.log(result)
        $("#listPegawai").append("<option value="+0+">"+"Pilih Pegawai"+"</option>")
        for (let i=0; i<result.data.length; i++){
            $("#listPegawai").append("<option value="+result.data[i].npk+">"+result.data[i].nama+"</option>")
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

// =============================================================CURRENT==========
function getDetailPosisiPerNPK() {
    var npk = document.getElementById("listPegawai").value;
    $.ajax({
        url:'http://10.10.100.152:4869/user/getDetailedPosisi/'+npk,
        method: 'GET',
        async:true,
        headers: {
            'Authorization':'Bearer ' + getCookie("token"),
            // 'X-CSRF-TOKEN':'xxxxxxxxxxxxxxxxxxxx',
            // 'Content-Type':'application/json'
        },
        // contentType: 'application/json',
        // data: JSON.stringify({

        // }),
        success: function(result) {
            $("#position-code").val(result.data.posisi.posisi_id)
            $("#position").val(result.data.posisi.posisi_name)
            $("#company").val(result.data.posisi.company)
            $("#personal-area").val(result.data.posisi.area)
            $("#employee-group").val(result.data.posisi.posisi_type)
            $("#role-code").val(result.data.role_id)
        },
        error: function(error){
            // alert(error)
        },
        complete: function() {

        },
        statusCode: {
            403: function() {
                window.location.href = 'index.html'
            }
        }
    })
}

// =================================================================get All Posisi ===== pilih posisi
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
        $("#listPosisi").append("<option value="+0+">"+"Pilih Posisi"+"</option>")
        for (let i=0; i<result.data.length; i++){
            $("#listPosisi").append("<option value="+result.data[i].posisi_id+">"+result.data[i].posisi_name+"</option>")
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

// =============================================================PROPOSED==================
function getPosisiByIdPosisi() {
    var posisi_id = document.getElementById("listPosisi").value;
    $.ajax({
        url:'http://10.10.100.152:4869/master/posisi/getPosisiById/'+posisi_id,
        method: 'GET',
        async:false,
        headers: {
            'Authorization':'Bearer ' + getCookie("token"),
            // 'X-CSRF-TOKEN':'xxxxxxxxxxxxxxxxxxxx',
            // 'Content-Type':'application/json'
        },
        // contentType: 'application/json',
        // data: JSON.stringify({

        // }),
        success: function(result) {
            $("#company-proposed").val(result.data.company)
            $("#area-proposed").val(result.data.area)
            $("#employee-type").val(result.data.posisi_type)
            $("#receiver").val("Manager " + result.data.posisi_name)
        },
        error: function(error){
            // alert(error)
        },
        complete: function() {

        },
        statusCode: {
            403: function() {
                window.location.href = 'index.html'
            }
        }
    })
    $.ajax({
        url:'http://10.10.100.152:4869/master/role/getRoleManajerByPosisiId/'+posisi_id,
        method: 'GET',
        async:false,
        headers: {
            'Authorization':'Bearer ' + getCookie("token"),
            // 'X-CSRF-TOKEN':'xxxxxxxxxxxxxxxxxxxx',
            // 'Content-Type':'application/json'
        },
        // contentType: 'application/json',
        // data: JSON.stringify({

        // }),
        success: function(result) {
            $("#receiver-code").val(result.data.role_id)
            $("#receiver-name").val(result.data.role_name)
        },
        error: function(error){
            // alert(error)
        },
        complete: function() {

        },
        statusCode: {
            403: function() {
                window.location.href = 'index.html'
            }
        }

    })
}

// =============================================================SUBMIT REQUEST==================
function submitRequest() {
    var npk = document.getElementById("listPegawai").value;
    var posisi_id_awal = document.getElementById("position-code").value;
    var role_id_awal = document.getElementById("role-code").value;
    var posisi_id_tujuan = document.getElementById("listPosisi").value;
    var role_id_tujuan = document.getElementById("receiver-code").value;
    var behalf_name = document.getElementById("behalf-name").value;
    var behalf_position = document.getElementById("behalf-position").value;
    var effective_date = document.getElementById("date").value;
    var requester_npk = document.getElementById("requester-npk").value
    var requester_position_code = document.getElementById("requester-position-code").value
    var requester_role_code = document.getElementById("requester-role-code").value
    var comment = document.getElementById("justification").value

    $.ajax({
        url:'http://10.10.100.152:4869/request/submit',
        method: 'POST',
        async:true,
        headers: {
            'Authorization':'Bearer ' + getCookie("token"),
            // 'X-CSRF-TOKEN':'xxxxxxxxxxxxxxxxxxxx',
            // 'Content-Type':'application/json'
        },
        contentType: 'application/json',
        data: JSON.stringify({

              "process_id" : "ga usah diisi",
              "record_id" : "ga usah diisi",
              "comment" : comment,
              "data_pegawai_requested" : {
                "npk" : npk,
                "posisi_id_awal" : posisi_id_awal,
                "role_id_awal" : role_id_awal,
                "posisi_id_tujuan" : posisi_id_tujuan,
                "role_id_tujuan" : role_id_tujuan
                },
                "data_pegawai_requester" : {
                    "npk" : requester_npk,
                    "posisi_id" : requester_position_code,
                    "role_id" : requester_role_code,
                    "behalf_name" : behalf_name,
                    "behalf_posisi" : behalf_position
                },
                "effective_date" : effective_date,
                "action" : "submit",

                "user_login" : {
                    "npk" : getCookie("npk")
                }
        }),
        success: function(result) {
            console.log(result)
            alert("Anda berhasil submit")
        },
        error: function(error){
            alert("Submit error")
        },
        complete: function() {

        },
        statusCode: {
            403: function() {
                window.location.href = 'index.html'
            }
        }
    })
}

// =================================================================get All Posisi ===== pilih posisi di register
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


// ====================================================================get list task
var getCookieNPK = getCookie("npk")
console.log(getCookieNPK)
$.ajax({
    url: 'http://10.10.100.152:4869/task/getAll/'+getCookieNPK,
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
        var tabel =""
        for (let i=0; i<result.data.data.length; i++){
            $("#tabelListTask").append(
            `<tr>
                <td style="text-align: center;">`+(i+1)+`</td>
                <td>`+result.data.data[i].form_data.requester+`</td>
                <td hidden>Requester Posisi</td>
                <td>`+result.data.data[i].created_at+`</td>
                <td>`+result.data.data[i].variables.action+`</td>
                <td style="text-align: center;"><button type="button" class="btn btn-primary" onclick="approveTask('`+result.data.data[i].record_id+`','` +result.data.data[i].id+`','` +result.data.data[i].variables.action+`')">View Task</button></td>
            </tr>`
            )
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

// ====================================================================approve task
function approveTask(record_id, task_id, action) {
    console.log(record_id, task_id)
    createCookie("record_id", record_id, 7)
    createCookie("task_id", task_id, 7)

    if (action == "revise"){
        window.location.href = 'revise_form.html'
    }
    else if (action == "approve" || action == "submit" || action == "submitrevise"){
        window.location.href = 'approve_form.html'
    }

}

//=============================================================get All keputusan=====pilih keputusan
$.ajax({
    url: 'http://10.10.100.152:4869/master/keputusan/getAll',
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
        action = ""
        console.log(result)
        $("#action").append("<option value="+0+">"+"Pilih Action"+"</option>")
        for (let i=0; i<result.data.length; i++){
            $("#action").append("<option value="+result.data[i].keputusan_id+">"+result.data[i].keputusan_name+"</option>")
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


// ===============================================View Task
var task_info
var record_id = getCookie("record_id")
var task_id = getCookie("task_id")
$.ajax({
    url:'http://10.10.100.152:4869/task/getTaskPerRecordId/'+record_id,
    method: 'GET',
    async:true,
    headers: {
        'Authorization':'Bearer ' + getCookie("token"),
        // 'X-CSRF-TOKEN':'xxxxxxxxxxxxxxxxxxxx',
        // 'Content-Type':'application/json'
    },
    // contentType: 'application/json',
    // data: JSON.stringify({

    // }),
    success: function(result) {
        //requester information
        console.log(result)
        task_info = result.data
        $("#requester-name-view").val(result.data.requester_name)
        $("#requester-npk-view").val(result.data.requester_id)
        $("#requester-position-view").val(result.data.requester_name)
        $("#behalf-name-view").val(result.data.behalf_name)
        $("#behalf-position-view").val(result.data.behalf_posisi)
        $("#employee-name-view").val(result.data.requested_name)
        $("#employee-code-view").val(result.data.requested_id)
        // current
        $("#position-code-view").val(result.data.posisi_id_awal)
        $("#position-view").val(result.data.posisi_id_awal_name)
        $("#company-view").val(result.data.company_awal)
        $("#personal-area-view").val(result.data.area_awal)
        $("#employee-group-view").val(result.data.posisi_awal_type)
        //proposed
        $("#posisi-proposed-view").val(result.data.posisi_id_tujuan_name)
        $("#company-proposed-view").val(result.data.company_tujuan)
        $("#area-proposed-view").val(result.data.area_tujuan)
        $("#employee-type-view").val(result.data.posisi_tujuan_type)
        $("#receiver-view").val("Manager " + result.data.posisi_id_tujuan_name)
        $("#date-view").val(result.data.effective_data)
        $("#justification-view").val(result.data.comment)
        
    },
    error: function(error){
        // alert(error)
    },
    complete: function() {

    },
    statusCode: {
        403: function() {
            window.location.href = 'index.html'
        }
    }
})


// ===========================================================Submit Task
function submitTask(){
    console.log(task_info, "tes")
    var keputusan_id = document.getElementById("action").value;
    var action
    if (keputusan_id == 1){
        action = "approve"
    }    
    else if (keputusan_id == 2){
        action = "revise"
    }
    $.ajax({
        url: 'http://10.10.100.152:4869/task/submit',
        method: 'POST',
        headers: {
            'Authorization':'Bearer ' + getCookie("token"),
            // 'X-CSRF-TOKEN':'xxxxxxxxxxxxxxxxxxxx',
            // 'Content-Type':'application/json'
        },
        contentType: 'application/json',
        data: JSON.stringify({
            "process_id" : task_info.process_id,
            "record_id" : task_info.record_id,
            "task_id" : getCookie("task_id"),
            "comment" : task_info.comment,
            "data_pegawai_requested" : {
                "npk" : task_info.requested_id,
                "posisi_id_awal" : task_info.posisi_id_awal,
                "role_id_awal" : task_info.role_id_awal,
                "posisi_id_tujuan" : task_info.posisi_id_tujuan,
                "role_id_tujuan" : task_info.role_id_tujuan
            },

            "data_pegawai_requester" : {
                "npk" : task_info.requester_id,
                "email" : task_info.requester_email,
                "behalf_name" : task_info.behalf_name,
                "behalf_posisi" : task_info.behalf_posisi
            },
            "effective_date" : task_info.effective_data,
            "action" : action,
            "keputusan_id" : task_info.keputusan_id,
            
            "user_login" : {
                "npk" : getCookie("npk")
            }
        }),
        success: function(result){
            eraseCookie("record_id")
            eraseCookie("task_id")
            console.log(result)
            alert("Anda berhasil submit task")
            
        },
        error: function(){
            alert("Andah gagal submit task")
        },
        complete: function(){
            console.log("mantul")
        },
        statusCode: {
            403: function() {
                window.location.href = 'index.html'
            }
        }

    })
}


// =============================================================SUBMIT REVISE==================
function submitRevise() {
    var npk = document.getElementById("listPegawai").value;
    var posisi_id_awal = document.getElementById("position-code").value;
    var role_id_awal = document.getElementById("role-code").value;
    var posisi_id_tujuan = document.getElementById("listPosisi").value;
    var role_id_tujuan = document.getElementById("receiver-code").value;
    var behalf_name = document.getElementById("behalf-name").value;
    var behalf_position = document.getElementById("behalf-position").value;
    var effective_date = document.getElementById("date").value;
    var requester_npk = document.getElementById("requester-npk").value
    var requester_position_code = document.getElementById("requester-position-code").value
    var requester_role_code = document.getElementById("requester-role-code").value
    var comment = document.getElementById("justification").value

    $.ajax({
        url:'http://10.10.100.152:4869/task/submitrevise',
        method: 'POST',
        async:true,
        headers: {
            'Authorization':'Bearer ' + getCookie("token"),
            // 'X-CSRF-TOKEN':'xxxxxxxxxxxxxxxxxxxx',
            // 'Content-Type':'application/json'
        },
        contentType: 'application/json',
        data: JSON.stringify({

              "process_id" : task_info.process_id,
              "record_id" : task_info.record_id,
              "task_id" : getCookie("task_id"),
              "comment" : comment,
              "data_pegawai_requested" : {
                "npk" : npk,
                "posisi_id_awal" : posisi_id_awal,
                "role_id_awal" : role_id_awal,
                "posisi_id_tujuan" : posisi_id_tujuan,
                "role_id_tujuan" : role_id_tujuan
                },
                "data_pegawai_requester" : {
                    "npk" : requester_npk,
                    "posisi_id" : requester_position_code,
                    "role_id" : requester_role_code,
                    "behalf_name" : behalf_name,
                    "behalf_posisi" : behalf_position
                },
                "effective_date" : effective_date,
                "action" : "submitrevise",
                "keputusan_id" : 0,

                "user_login" : {
                    "npk" : getCookie("npk")
                }
        }),
        success: function(result) {
            eraseCookie("record_id")
            eraseCookie("task_id")
            console.log(result)
            alert("Anda berhasil submit revise")
        },
        error: function(error){
            alert("Submit error")
        },
        complete: function() {

        },
        statusCode: {
            403: function() {
                window.location.href = 'index.html'
            }
        }
    })
}