$(document).ready(function(){
    $("#vehicle1").click(function(){
        let value=$(this).attr("value");
        if(value===""){
            $(this).attr("value","2");
        }else{
            $(this).attr("value","");
        }
    });
});

function validatePhoneNumber(phone) {
    const phonePattern = /^0[0-9]{8,9}$/;
    return phonePattern.test(phone);
}
function register() {
    let flag = true;
    let username = $("#name").val();
    let email = $("#email").val();
    let phone = $("#phone").val();
    let password = $("#pass").val();
    let rePass   = $("#re_pass").val();
    let roleId   = $("#vehicle1").val();

    // kiểm tra email có hợp lệ hay không
    if (!validateEmail(email)) {
        alert("Email không hợp lệ.");
        flag = false;
    }
    function validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    // kiểm tra số điện thoại có hợp lệ hay không
    if (!validatePhoneNumber(phone)) {
        alert("Số điện thoại không hợp lệ.")
        flag = false;
    }

    // kiểm tra mật khẩu mới có trống hay không
    if (password === "") {
        alert("Mật khẩu mới không được trống.")
        flag = false;
    }

    // kiểm tra nhập lại mật khẩu mới có trống hay không
    if (rePass === "") {
        alert("Nhập lại mật khẩu mới không được trống.")
        flag = false;
    }

    // kiểm tra mật khẩu mới và nhập lại mật khẩu mới có giống nhau hay không
    if (password !== rePass) {
        alert("Mật khẩu mới và nhập lại mật khẩu mới không giống nhau.")
        flag = false;
    }

    let roles = null;
    if ($("#role1").prop("checked") && $("#role2").prop("checked")) {
        roleId = 2;
    } else if ($("#role1").prop("checked") || $("#role2").prop("checked")) {
        roleId = 3;
    }

    if (flag) {
        let user = {
            "username": username,
            "email": email,
            "phone": phone,
            "password": password,
            "roleIdStr": [{
                "id": Number(roleId)
            }]
        };

        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "POST",
            url: "http://localhost:8080/api/register",
            data: JSON.stringify(user),
            success: function (data) {
                sessionStorage.setItem("token", data.accessToken)
                window.location.href = "login.html"
            },
            error: function (error) {
                alert(error.responseJSON.message);
            }
        });
    }

    event.preventDefault();
}


