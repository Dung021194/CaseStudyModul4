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

function displayProductsDetail() {
    $.ajax({
        headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        url: `http://localhost:8080/home/products-detail/{id}`,
        type: "GET",
        success: function (data) {
            let context = ""
              context += `
<!--               	<div class="row">-->
			<div class="col-lg-7">
				<div class="single_product_pics">
					<div class="row">
						<div class="col-lg-3 thumbnails_col order-lg-1 order-2">
							<div class="single_product_thumbnails">
								<ul>
									<li><img src="${data.imagePath}" alt="" data-image="images/single_1.jpg"></li>
									<li class="active"><img src="${data.imagePath}" alt="" data-image="images/single_2.jpg"></li>
									<li><img src="${data.imagePath}" alt="" data-image="images/single_3.jpg"></li>
								</ul>
							</div>
						</div>
						<div class="col-lg-9 image_col order-lg-2 order-1">
							<div class="single_product_image">
								<div class="single_product_image_background" style="background-image:url(${data.imagePath})"></div>
							</div>
						</div>
					</div>
				</div>
			</div>
			<div class="col-lg-5">
				<div class="product_details">
					<div class="product_details_title">
						<h2>${data.name}</h2>
						<p>${data.description}</p>
					</div>
					<div class="free_delivery d-flex flex-row align-items-center justify-content-center">
						<span class="ti-truck"></span><span>free delivery</span>
					</div>
					<div class="original_price">${data.price}</div>
					<div class="product_price">${data.price}/20%</div>
					<ul class="star_rating">
						<li><i class="fa fa-star" aria-hidden="true"></i></li>
						<li><i class="fa fa-star" aria-hidden="true"></i></li>
						<li><i class="fa fa-star" aria-hidden="true"></i></li>
						<li><i class="fa fa-star" aria-hidden="true"></i></li>
						<li><i class="fa fa-star-o" aria-hidden="true"></i></li>
					</ul>
					<div class="product_color">
						<span>Select Color:</span>
						<ul>
							<li style="background: #e54e5d"></li>
							<li style="background: #252525"></li>
							<li style="background: #60b3f3"></li>
						</ul>
					</div>
					<div class="quantity d-flex flex-column flex-sm-row align-items-sm-center">
						<span>${data.content[i].quantity}</span>
						<div class="quantity_selector">
							<span class="minus"><i class="fa fa-minus" aria-hidden="true"></i></span>
							<span id="quantity_value">1</span>
							<span class="plus"><i class="fa fa-plus" aria-hidden="true"></i></span>
						</div>
						<div class="red_button add_to_cart_button"><a href="#">add to cart</a></div>
						<div class="product_favorite d-flex flex-column align-items-center justify-content-center"></div>
					</div>
				</div>
			</div>
		</div>
	</div>`
        }
    })
    document.getElementById("products-all").innerHTML = context;
}