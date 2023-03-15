function displayProduct(data) {
    let content = `<table class="table table-striped"><tr><th>Name</th><th>Price</th>
                    <th>Quantity</th><th>Description</th><th>Image</th><th>Category</th><th colspan="2">Action</th></tr>`;
    for (let i = 0; i < data.length; i++) {
        content += `<tr><td >${data[i].name}</td><td >${data[i].price}</td><td >${data[i].quantity}</td>
                    <td >${data[i].description}</td><td><img src="${data[i].imagePath}" alt=""></td>
                    <td>${data[i].category.name}</td>
                    // <td><button class="btn btn-warning" onclick="updateForm(${data[i].id})">Update</button></td>
                    // <td><button class="btn btn-danger" onclick="deleteProduct(${data[i].id})">Delete</button></td></tr>`;
    }
    content += '</table>'
    document.getElementById('list_product').innerHTML = content;
}
function getAllProduct(page) {
    $.ajax({
        type: "GET",
        url: "http://localhost:8080/home?page=" + page + "&size=3",
        success: function (data) {
            displayProduct(data.content)
            displayPage(data)

            if (data.pageable.pageNumber === 0) {
                document.getElementById("backup").hidden = true
            }
            //điều kiện bỏ nút next
            if (data.pageable.pageNumber + 1 === data.totalPages) {
                document.getElementById("next").hidden = true
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