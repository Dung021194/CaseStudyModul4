function login() {
    let flag = true;
    let username = $("#your_name").val();
    let password = $("#your_pass").val();

    // kiểm tra tên đăng nhập có trống hay không
    if (username === "") {
        let error = createError("Tên đăng nhập không được trống.");
        showError(error);
        flag = false;
    }

    // kiểm tra mật khẩu có trống hay không
    if (password === "") {
        let error = createError("Mật khẩu không được trống.");
        showError(error);
        flag = false;
    }

    if (flag) {
        let user = {
            "username": username,
            "password": password
        };
        $.ajax({
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            type: "POST",
            url: "http://localhost:8080/api/login",
            data: JSON.stringify(user),
            success: function (data) {
                sessionStorage.setItem("token", data.accessToken);
                window.location.href = "index.html";

            },
            error: function () {
                alert("Tên đăng nhập hoặc mật khẩu không chính xác.")
            }
        });
    }
    event.preventDefault();
}
