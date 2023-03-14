function getAllProducts() {
    $.ajax({
        headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        type: "GET",
        url: "http://localhost:8080/product",
        success: function (data) {
            displayProduct(data)
        }
    });
}