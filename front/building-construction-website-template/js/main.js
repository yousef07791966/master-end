(function ($) {
  "use strict";

  // Spinner
  var spinner = function () {
    setTimeout(function () {
      if ($("#spinner").length > 0) {
        $("#spinner").removeClass("show");
      }
    }, 1);
  };
  spinner(0);

  // Initiate the wowjs
  new WOW().init();

  // Sticky Navbar
  $(window).scroll(function () {
    if ($(this).scrollTop() > 200) {
      $(".sticky-top").addClass("shadow-sm").css("top", "0px");
    } else {
      $(".sticky-top").removeClass("shadow-sm").css("top", "-200px");
    }
  });

  // testimonial carousel
  $(".testimonial-carousel").owlCarousel({
    autoplay: true,
    smartSpeed: 1500,
    center: false,
    dots: true,
    loop: true,
    margin: 25,
    nav: true,
    navText: [
      '<i class="fa fa-angle-right"></i>',
      '<i class="fa fa-angle-left"></i>',
    ],
    responsiveClass: true,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 1,
      },
      768: {
        items: 1,
      },
      992: {
        items: 2,
      },
      1200: {
        items: 2,
      },
    },
  });

  // Facts counter
  $('[data-toggle="counter-up"]').counterUp({
    delay: 5,
    time: 2000,
  });

  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 300) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  $("document").ready(function () {
    const isLoggedIn = localStorage.getItem("isLoggedIn");

    if (isLoggedIn) {
      $("a[href$='login.html'], a[href$='register.html']").hide();
      $("#logout, a[href$='my-account.html']").show();
    } else {
      $("a[href$='login.html'], a[href$='register.html']").show();
      $("#logout, a[href$='my-account.html']").hide();
    }
  });

  var products = [];
  document.addEventListener("DOMContentLoaded", function () {
    const urlParams = new URLSearchParams(window.location.search);
    const categoryId = urlParams.get("categoryId");

    async function fetchCategories() {
      try {
        const response = await fetch(
          `https://localhost:44350/api/Products/GetProductByCategoryID${categoryId}`, // Added missing "/"
          {
            method: "get",
          }
        );

        if (response.ok) {
          products = await response.json();
        } else {
          console.error("Failed response:", response);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }

    fetchCategories();
  });

  $(document).on("click", ".addToCart", function (e) {
    e.preventDefault();
    addToCart($(e.target).attr("data-id"));
  });

  async function addToCart(id) {
    alert("تم اضافه المنتج بنجاح");

    // debugger
    let Allproducts = localStorage.getItem("products");
    if (!Allproducts) {
      Allproducts = [];
    } else {
      Allproducts = JSON.parse(Allproducts);
    }
    const product = products.find((p) => p.productId === parseInt(id));
    const index = Allproducts.findIndex(
      (p) => p.productId === product.productId
    );
    if (index === -1) {
      product["quantity"] = 1;
      Allproducts.push(product);
      localStorage.setItem("products", JSON.stringify(Allproducts));
      let userId = localStorage.getItem("userId");
      userId = JSON.parse(userId);

      try {
        const response = await fetch(
          `https://localhost:44350/api/Cart/AddCartItem/${userId}`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            mode: "cors",
            body: JSON.stringify({
              productId: product.productId,
              quantity: 6,
            }),
            
          }
          
        );

        if (response.ok) {
          const categories = await response.json();

          // categories.forEach((category) => {
          //   const categoryItem = document.createElement("a");
          //   categoryItem.href = `feature.html?categoryId=${category.categoryId}`;
          //   categoryItem.className = "dropdown-item";
          //   categoryItem.textContent = category.name;

          //   categoryContainer.appendChild(categoryItem);
          // });
        } else {
          console.error("Failed response:", response);
        }
      } catch (error) {
        console.error("Error:", error);
      }

      Swal.fire({
        icon: "success",
        text: "تمت اضافة المنتج الى سلة المشتر يات",
      });
    } else {
      Allproducts[index].quantity++;
      // alert("هذا المنتج تمت اضافته سابقا");
      Swal.fire({
        icon: "error",
        text: "هذا المنتج تمت اضافته سابقا",
      });
    }
  }

  $("#logout").on("click", function (e) {
    e.preventDefault();
    localStorage.removeItem("isLoggedIn");
    window.location.href = "login.html";
    $("a[href$='login.html'], a[href$='register.html']").show();
    $("#logout, a[href$='my-account.html']").hide();
    localStorage.setItem('isVoucherUsed', false);
  });
})(jQuery);
