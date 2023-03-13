function login() {

    let username = $("#your_name").val()
    let password = $("#your_pass").val()
    let user = {
        username: username,
        password: password,
    }
    $.ajax({
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        type: "POST",
        url: "http://localhost:8005/api/login",
        data: JSON.stringify(user),
        success: function (data) {
            sessionStorage.setItem("token", data.accessToken)
            window.location.href = "index.html"
        }
    })
    event.preventDefault();
}
