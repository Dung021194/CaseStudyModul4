function displayUser() {
    if (sessionStorage.getItem("usernameDisplay") != null) {
        let userDisplay = sessionStorage.getItem("usernameDisplay");
        $("#logout").text( "Hello" + "  " + userDisplay)
        document.getElementById("logout").style.color = "#1e1e27";
        document.getElementById("logout").style.background = "white";
        document.getElementById("logout").style.padding = "10px 10px";
        document.getElementById("logout").style.marginTop = "12px";
        document.getElementById("logout").style.borderRadius = "3px";
        document.getElementById("logout").style.cursor = "pointer";
        document.getElementById("signin").style.display = "none";
        document.getElementById("signin").style.value = "none";
        document.getElementById("linksign").href = "login.html";
        $("#getout").attr("onclick", "logout()");
        document.getElementById("span1").textContent = "Log out";

    }
}
function logout() {
    sessionStorage.removeItem("usernameDisplay");
    window.location.href = "login.html";
}
function displayPage(data) {
    let content = `<button class="btn btn-primary" id="backup" onclick="isPrevious(${data.pageable.pageNumber})">Previous</button>
    <span>${data.pageable.pageNumber + 1} | ${data.totalPages}</span>
    <button class="btn btn-primary" id="next" onclick="isNext(${data.pageable.pageNumber})">Next</button>`
    document.getElementById('page').innerHTML = content;
}
//hàm lùi page
    function isPrevious(pageNumber) {
        getAllCustomerPage(pageNumber-1)
    }

//hàm tiến page
    function isNext(pageNumber) {
        getAllCustomerPage(pageNumber+1)
    }
    // hiện modal tìm kiếm



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
            displayNewProducts(data.content)
            displayClothes(data.content)
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
}function displayProducts() {
    displayUser()
    $.ajax({
        headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        url: "http://localhost:8080/home/products?size=5",
        type: "GET",
        success: function (data) {
            console.log()
            let context = ""
            for (let i = 0; i < data.content.length; i++) {
                context += `
                    <div class="product-item women">
                                    <div class="product product_filter">
                                        <div class="product_image">
                                            <img src=" ${data.content[i].image} " alt="">
                                        </div>
                                        <div class="favorite"></div>
                                        <div class="product_bubble product_bubble_left product_bubble_green d-flex flex-column align-items-center"> 
                                            <span>new</span></div>
                                        <div class="product_info">
                                            <h6 class="product_name"><a href="single.html">${data.content[i].name}</a></h6>
                                            <div class="product_price">${data.content[i].price}</div>
                                        </div>
                                    </div>
                                    <div class="red_button add_to_cart_button"><a href="#">add to cart</a></div>
                                </div>`
            }
            document.getElementById("products-all").innerHTML = context;
        }
    })
}
function displayClothes() {
    $.ajax({
        headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        url: "http://localhost:8080/home/cate-names-shirt",
        type: "GET",
        success: function (data) {
            console.log()
            let context = ""
            for (let i = 0; i < data.content.length; i++) {
                context += `
                    <div class="product-item women">
                                    <div class="product product_filter">
                                        <div class="product_image">
                                            <img src=" ${data.content[i].image} " alt="">
                                        </div>
                                        <div class="favorite"></div>
                                        <div class="product_bubble product_bubble_left product_bubble_green d-flex flex-column align-items-center"> 
                                            <span>new</span></div>
                                        <div class="product_info">
                                            <h6 class="product_name"><a href="single.html">${data.content[i].name}</a></h6>
                                            <div class="product_price">${data.content[i].price}</div>
                                        </div>
                                    </div>
                                    <div class="red_button add_to_cart_button"><a href="#">add to cart</a></div>
                                </div>`
            }
            document.getElementById("products-all").innerHTML = context;
        }
    })

}
function displayNewProducts() {
    $.ajax({
        headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        url: "http://localhost:8080/home/cate?size=4",
        type: "GET",
        success: function (data) {
            console.log()
            let context = ""
            for (let i = 0; i < data.content.length; i++) {
                context += `
                    <div class="product-item women">
                                    <div class="product product_filter">
                                        <div class="product_image">
                                            <img src=" ${data.content[i].image} " alt="">
                                        </div>
                                        <div class="favorite"></div>
                                        <div class="product_bubble product_bubble_left product_bubble_green d-flex flex-column align-items-center"> 
                                            <span>new</span></div>
                                        <div class="product_info">
                                            <h6 class="product_name"><a href="single.html">${data.content[i].name}</a></h6>
                                            <div class="product_price">${data.content[i].price}</div>
                                        </div>
                                    </div>
                                    <div class="red_button add_to_cart_button"><a href="#">add to cart</a></div>
                                </div>`
            }
            document.getElementById("products-all").innerHTML = context;
        }
    })

}
