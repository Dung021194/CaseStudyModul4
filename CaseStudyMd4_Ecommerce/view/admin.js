let arr;
function banUser(id) {
    if (confirm("Are you sure to ban this user?")) {
        $.ajax({
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
            url: `http://localhost:8080/home/banUser/`+id,
            type: "DELETE",
            success() {
                findAllUser()
            }
        })
    }
}
function banShop(id) {
    if (confirm("Are you sure to ban this shop?")) {
        $.ajax({
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
            url: `http://localhost:8080/home/banUser/${id}`,
            type: "DELETE",
            success() {
                findAllShop()
            }
        })
    }
}



// function deleteProductByQuantity() {
//     if (confirm("Are you sure to delete this product?")) {
//         $.ajax({
//             headers: {
//                 Authorization: "Bearer " + sessionStorage.getItem("token"),
//             },
//             url: "http://localhost:8080/home" + id,
//             type: "DELETE",
//             success() {
//                 findAllProduct()
//             }
//         })
//     }
// }

function findAllUser(page) {
    $.ajax({
        headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        type: "GET",
        url: "http://localhost:8080/home/user/page?page=" + page + "&size=5",
        success: function (data) {
            displayUser(data.content)
            displayPage(data)
            //điều kiện bỏ nút previous
            if (data.pageable.pageNumber === 0) {
                $("#backup").hide()
            }
            //điều kiện bỏ nút next
            if (data.pageable.pageNumber + 1 === data.totalPages) {
                $("#next").hide()
            }
            document.getElementById("title").innerHTML="List Users"
            $("#list_user").show()
            document.getElementById("action").setAttribute("onclick",`findAllShop()`)
            document.getElementById("action").innerHTML="List Shop"
            $("#form1").hide()
            event.preventDefault()
        }
    });
}

function displayUser(data) {
    let content = `<table class="table table-striped"><tr><th>Username</th><th>PhoneNumber</th>
                    <th>Email</th><th>Address</th><th colspan="2">Action</th></tr>`;
    for (let j = 0; j < data.length; j++) {
        content += `<tr><td >${data[j].username}</td><td >${data[j].phoneNumber}</td><td >${data[j].email}</td>
                    <td >${data[j].address}</td>
                    <td><button class="btn btn-danger" onclick="banUser(${data[j].id})">Ban</button></td></tr>`;
    }
    content += '</table>'
    document.getElementById('list_user').innerHTML = content;
    // }
}
function displayShop(data){
    let content = `<table class="table table-striped"><tr><th>Username</th><th>PhoneNumber</th>
                    <th>Email</th><th>Address</th><th colspan="2">Action</th></tr>`;
    for (let i = 0; i < data.length; i++) {
        content += `<tr><td >${data[i].user.username}</td><td >${data[i].user.phoneNumber}</td><td >${data[i].user.email}</td>
                        <td >${data[i].user.address}</td>
                        <td><button class="btn btn-danger" onclick="banShop(${data[i].user.id})">Ban</button></td></tr>`;
    }
    content += '</table>'
    document.getElementById('list_user').innerHTML = content;
}

function displayPage(data) {
    let content = `<button class="btn btn-primary" id="backup" onclick="isPrevious(${data.pageable.pageNumber})">Previous</button>
    <span id="abc">${data.pageable.pageNumber + 1} | ${data.totalPages}</span>
    <button class="btn btn-primary" id="next" onclick="isNext(${data.pageable.pageNumber})">Next</button>`
    document.getElementById('page').innerHTML = content;
}

function isPrevious(pageNumber) {
    findAllUser(pageNumber - 1)
}

//hàm tiến page
function isNext(pageNumber) {
    findAllUser(pageNumber + 1)
}

function back() {
    $("#list_shop").hide()
    $("#list_category").hide()
    $("#list_user").show()
    $("#form1").hide()
    $("#title").show()
    $("#next").show()
    $("#action").show()
    $("#btn-create").show()
    $("#action1").show()
    $("#abc").show()
    event.preventDefault();
}
function findAllShop(page){
    $.ajax({
        headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        type: "GET",
        url: "http://localhost:8080/home/shops/page?page=" + page + "&size=5",
        success: function (data) {
            console.log(data.content)
            displayShop(data.content)
            displayPage(data)
            //điều kiện bỏ nút previous
            if (data.pageable.pageNumber === 0) {
                $("#backup").hide()
            }
            //điều kiện bỏ nút next
            if (data.pageable.pageNumber + 1 === data.totalPages) {
                $("#next").hide()
            }
            document.getElementById("title").innerHTML="List Shops"
            $("#list_shop").show()
            document.getElementById("action").setAttribute("onclick",`findAllUser()`)
            document.getElementById("action").innerHTML="List Users"
            $("#form1").hide()
            event.preventDefault()
        }
    });
}

function getAllCategory(data1){
    let content2 = `<button class="btn btn-primary" id="backup" onclick="isPrevious(${data1.pageable.pageNumber})">Previous</button>
    <span>${data1.pageable.pageNumber + 1} | ${data1.totalPages}</span>
    <button class="btn btn-primary" id="next" onclick="isNext(${data1.pageable.pageNumber})">Next</button>`
    document.getElementById('page1').innerHTML = content2;
}
function findAllCategory(page){
    $.ajax({
        headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        url: "http://localhost:8080/home/categories/page?page=" + page + "&size=5",
        type: "GET",
        success(data1) {
            // getAllCategory(data1)
            let arr = data1.content
            //điều kiện bỏ nút previous
            if (data1.pageable.pageNumber === 0) {
                $("#backup").hide()
            }
            //điều kiện bỏ nút next
            if (data1.pageable.pageNumber + 1 === data1.totalPages) {
                $("#next").hide()
            }
            let context1 = `<table border="1" class="table table-striped">
 <h2>List <b>Category</b></h2><tr>
                            <th>STT</th>
                            <th>Name</th>
                            <th colspan="2">Action</th>
                            </tr>`
            for (let j = 0; j < arr.length; j++) {
                context1 += `<tr>
                            <td>${j + 1}</td>
                            <td>${arr[j].name}</td>
                            <td><button class="btn btn-danger" onclick="deleteCategory(${arr[j].id})">Delete</button></td
                            </tr>`
            }
            context1 += `</table> <button onclick="back()">Back</button>`
            document.getElementById("list_category").innerHTML = context1
            $("#form").hide()
            $("#form1").hide()
            $("#list_category").show()
            $("#list_user").hide()
            $("#btn-create").hide()
            $("#action1").hide()
            $("#title").hide()
            $("#next").hide()
            $("#abc").hide()
            $("#action").hide()
        }
    })
}
function deleteCategory(id){
    if (confirm("Are You Sure To Delete This Category?")) {
        $.ajax({
            headers: {

                Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
            url: `http://localhost:8080/home/categories/` + id ,
            type: "DELETE",
            success() {
                findAllCategory()
            }
        })
    }
}
function createCategory(){
    let category = {
        name: $("#name").val(),
    }
    $.ajax({
        headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        url: "http://localhost:8080/home/categories",
        type: "POST",
        contentType: "application/json",
        accept: "application/json",
        data: JSON.stringify(category),
        success() {
            findAllCategory()
        }
    })
    event.preventDefault()
}
function createForm() {
    $("#list_category").hide()
    $("#list_user").hide()
    $("#btn-create").hide()
    $("#title").hide()
    $("#next").hide()
    $("#action").hide()
    $("#abc").hide()
    $("#form1").show().css("width", "300px").css("margin", "auto")
}