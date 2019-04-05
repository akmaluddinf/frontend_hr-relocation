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

//=====================================APPROVE FORM===========get All keputusan=====pilih keputusan
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


// =============================APPROVE FORM==========View Task
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

// ====================================APPROVE FORM=============Submit Task
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
            "keputusan_id" : keputusan_id,
            
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
            alert("Anda gagal submit task")
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