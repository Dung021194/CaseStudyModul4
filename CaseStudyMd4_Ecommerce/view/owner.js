let arr;
window.onload = getCategories();
function displayProduct(data) {
    let content = `<table class="table table-striped"><tr><th>Name</th><th>Price</th>
                    <th>Quantity</th><th>Description</th><th>Image</th><th>Category</th><th colspan="2">Action</th></tr>`;
    for (let i = 0; i < data.length; i++) {
        content += `<tr><td >${data[i].name}</td><td >${data[i].price}</td><td >${data[i].quantity}</td>
                    <td >${data[i].description}</td><td><img src="${data[i].imagePath}" alt=""></td>
                    <td>${data[i].category.name}</td>
                   <td><button class="btn btn-warning" onclick="updateForm(${data[i].id})">Update</button></td>
                    <td><button class="btn btn-danger" onclick="deleteProduct(${data[i].id})">Delete</button></td></tr>`;
    }
    content += '</table>'
    document.getElementById('list_product').innerHTML = content;
}
function getAllProduct(page) {
    $("#formUpdate").hide()
    $("#list_product").show()
    $("#page").show()

    $.ajax({
        type: "GET",
        url: "http://localhost:8080/home?page=" + page + "&size=3",
        success: function (data) {
            displayProduct(data.content)
            displayPage(data)

            if (data.pageable.pageNumber === 0) {
                $("#backup").hide()
            }
            //điều kiện bỏ nút next
            if (data.pageable.pageNumber + 1 === data.totalPages) {
                $("#next").hide()
            }
        }
    });
}
function displayPage(data){
    let content = `<button class="btn btn-primary" id="backup" onclick="isPrevious(${data.pageable.pageNumber})">Previous</button>
    <span>${data.pageable.pageNumber+1} | ${data.totalPages}</span>
    <button class="btn btn-primary" id="next" onclick="isNext(${data.pageable.pageNumber})">Next</button>`
    document.getElementById('page').innerHTML = content;
}
function isPrevious(pageNumber) {
    getAllProduct(pageNumber-1)
}
function isNext(pageNumber) {
    getAllProduct(pageNumber+1)
}
function getCategories() {
    $.ajax({
        url: "http://localhost:8080/home/categories",
        type: "GET",
        success(data) {
            arr = data.content
        }
    })
}
function createForm() {
    let content = `<label><select id="category"></label>`
    for (let i = 0; i < arr.length; i++) {
        content += `<option value="${arr[i].id}">${arr[i].name}</option>`
    }
    content += `</select>`
    document.getElementById("cate").innerHTML = content
    $("#name").val("")
    $("#price").val("")
    $("#description").val("")
    $("#quantity").val("")
}
function createP() {
    let file = document.getElementById("file");
    let name = $("#name").val()
    let price = $("#price").val()
    let quantity = $("#quantity").val()
    let description = $("#description").val()
    let imagePath = $("#imagePath").val()

    let newProduct = {
        name: name,
        price: price,
        quantity: quantity,
        description:description,
        imagePath: imagePath,
        category: {
            id: $("#category").val()
        }
    }
    let formData = new FormData();
    formData.append("file", file.files[0])
    formData.append("product", new Blob([JSON.stringify(newProduct)]
        , {type: 'application/json'}))
    $.ajax({
        headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        contentType: false,
        processData: false,
        type: "POST",
        url: "http://localhost:8080/home",
        data: formData,
        success: function () {
            getAllProduct(0)
            alert("Create successfully!")
        },
        error:function (){
            alert("Add product fail!")
        }
    })
    event.preventDefault();
}
function updateForm(id) {
    $("#formUpdate").show()
    $("#list_product").hide()
    $("#page").hide()

    let content = `<label><select id="categoryUpdate"></label>`
    for (let i = 0; i < arr.length; i++) {
        content += `<option value="${arr[i].id}">${arr[i].name}</option>`
    }
    content += `</select>`
    document.getElementById("cateUpdate").innerHTML = content
    sessionStorage.setItem("update",id)
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/home/" + id,
        success: function (data) {
            $("#nameUpdate").val(data.name)
            $("#priceUpdate").val(data.price)
            $("#quantityUpdate").val(data.quantity)
            $("#descriptionUpdate").val(data.description)
            $("#shopId").val(data.shop.id)
            $("#imagePath").val(data.imagePath)
        }
    });
}
function back() {
    $("#formUpdate").hide()
    $("#list_product").show()
    $("#page").show()
    event.preventDefault();
}
function update() {
    let file = document.getElementById("fileUpdate");
    let id = sessionStorage.getItem("update")
    let name = $("#nameUpdate").val()
    let price = $("#priceUpdate").val()
    let quantity = $("#quantityUpdate").val()
    let description = $("#descriptionUpdate").val()
    let newProduct = {
        id: id,
        name: name,
        price: price,
        quantity: quantity,
        description:description,
        shop:{
          id: $("#shopId").val()
        },
        category: {
            id: $("#categoryUpdate").val()
        }
    }
    let formData = new FormData();
    formData.append("file", file.files[0])
    formData.append("product", new Blob([JSON.stringify(newProduct)]
        , {type: 'application/json'}))
    $.ajax({
        headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        contentType: false,
        processData: false,
        type: "POST",
        url: "http://localhost:8080/home",
        data: formData,
        success: function () {
            alert("Update successfully!")
            getAllProduct(0)
        },
        error: function (){
            alert("Update fail")
        }
    })
    event.preventDefault();
}
function deleteProduct(id) {
    if (confirm("Are you sure you want to delete?")) {
        $.ajax({
            type: "DELETE",
            url: "http://localhost:8080/home/" + id,
            success: function () {
                getAllProduct(0)
                alert("Delete successfully!")
            }
        });
    }
}

