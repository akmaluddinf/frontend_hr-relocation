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

// =============================REVISE FORM==========View Task
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


// =================================================PROPOSED===========get All Posisi ===== pilih posisi
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