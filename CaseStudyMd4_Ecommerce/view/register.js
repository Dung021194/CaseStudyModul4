function register() {
    let flag = true;
    let username =$("#name").val()
    let password =$("#pass").val()
    let rePass =$("#re_pass").val()

    // kiểm tra mật khẩu mới có trống hay không
    if (password === "") {
        let error = createError("Mật khẩu mới không được trống.");
        alert(error)
        showError(error);
        flag = false;
    }

    // kiểm tra nhập lại mật khẩu mới có trống hay không
    if (rePass === "") {
        let error = createError("Nhập lại mật khẩu mới không được trống.");
        alert(error)
        showError(error);
        flag = false;
    }

    // kiểm tra mật khẩu mới và nhập lại mật khẩu mới có giống nhau hay không
    if (password !== rePass) {
        let error = createError("Mật khẩu mới và nhập lại mật khẩu mới không giống nhau.");
        alert(error)
        showError(error);
        flag = false;
    }
    if (flag) {
        let user = {
            "username": username,
            "password": password
        }
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
            error: function () {
                alert(" Username is exist, choose another username ")
            }
        })
    }
    event.preventDefault();
}
