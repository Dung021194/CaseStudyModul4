//
// $.ajax({
//         headers: {
//             Authorization: "Bearer " + sessionStorage.getItem("token"),
//         },
//         type: "GET",
//         url: "http://localhost:8080/api/find-user",
//         success: function (data1) {
//             let content = `<a href="#">
//                         ${data1.username}
//                         <i class="fa fa-angle-down"></i>
//                     </a>  <ul class="menu_selection">
//                         <li><a href="#"><i class="fa fa-user-plus" aria-hidden="true"></i>Log Out</a></li>
//                     </ul>
// `
//             document.getElementById("account").innerText = content
//         }
// })
function displayPage(data){
    let content = `<button class="btn btn-primary" id="backup" onclick="isPrevious(${data.pageable.pageNumber})">Previous</button>
    <span>${data.pageable.pageNumber+1} | ${data.totalPages}</span>
    <button class="btn btn-primary" id="next" onclick="isNext(${data.pageable.pageNumber})">Next</button>`
    document.getElementById('page').innerHTML = content;
}

    function getAllProductsPage(page) {
        $.ajax({
            headers: {
             Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
            url: "http://localhost:8080/products/page?page=" + page + "&size=5",
            type: "GET",
            dataType: "json",
            success: function (data) {
                displayProducts(data.content)
                displayPage(data)
                //điều kiện bỏ nút previous
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
    function displayProducts() {
        $.ajax({
            headers: {
                Authorization: "Bearer " + sessionStorage.getItem("token"),
            },
                url: "http://localhost:8080/home/products?size=7",
            type: "GET",
            success: function (data) {
                console.log()
                let context = ""
                for (let i = 0; i < data.content.length; i++) {
                    context += `
                    <div class="product-item women">
                                    <div class="product product_filter">
                                        <div class="product_image">
                                            <img src=" ${data.content[i].imagePath} " alt="">
                                        </div>
                                        <div class="favorite"></div>
                                        <div class="product_bubble product_bubble_left product_bubble_green d-flex flex-column align-items-center"> 
                                            <span>new</span></div>
                                        <div class="product_info">
                                            <h6 class="product_name"><a href="single.html">${data.content[i].name}</a></h6>
                                            <div class="product_price">${data.content[i].price}</div>
                                        </div>
                                    </div>
                                    <div class="red_button add_to_cart_button"><a href="#" onclick="addToCart(${data.content[i].id})">add to cart</a></div>
                                </div>`
                }
                document.getElementById("products-all").innerHTML = context;

            }
            })
        }
        function addToCart(id){
            $.ajax({
                headers: {
                    Authorization: "Bearer " + sessionStorage.getItem("token"),
                },
                url: "http://localhost:8080/home/addToCart/"+id,
                type: "GET",
                dataType: "json",
                success: function (data) {
                    if (data.user!=null){
                        checkOutNumberAdd()
                        getAllProductsPage(0)
                    }
                }
            })
            event.preventDefault()
        }
function checkOutNumberAdd(){
    let quantity = sessionStorage.getItem("checkOut")
    if (quantity === null){
        sessionStorage.setItem("checkOut", "1")
    }else {
        let update = parseInt(quantity) + 1
        sessionStorage.setItem("checkOut", update.toString())
    }
    $("#checkout_items").val(sessionStorage.getItem("checkOut"))
}
function checkOutNumberSub(){
    let quantity = sessionStorage.getItem("checkOut")
    if (quantity === null ){
        sessionStorage.setItem("checkOut","0")
    }else {
        let update = parseInt(quantity) - 1
        sessionStorage.setItem("checkOut", update.toString())
    }
    $("#checkout_items").val(sessionStorage.getItem("checkOut"))
}