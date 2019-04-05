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

// ==============================================VIEW TASK============get list task
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

// ============================================VIEW TASK==============approve task
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
