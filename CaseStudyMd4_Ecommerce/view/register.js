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

function register() {
    let flag = true;
    let username = $("#name").val();
    let password = $("#pass").val();
    let rePass   = $("#re_pass").val();
    let roleId   = $("#vehicle1").val();

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

    if (flag) {
        let user = {
            "username": username,
            "password": password,
            "roles": [{
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
