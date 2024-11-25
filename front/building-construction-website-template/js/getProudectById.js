let productDetails = {};
document.addEventListener("DOMContentLoaded", function () {
  const productcontainer = document.getElementById("product-container");

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get("productId");

  async function fetchCategories() {
    try {
      const response = await fetch(
        `https://localhost:44350/api/Products/GetProductByID/${productId}`,
        {
          method: "GET",
        }
      );
      console.log("Response status:", response);

      if (response.ok) {
        const product = await response.json();
        productDetails = product;
        console.log("Fetched product:", product);

        const productCard = document.createElement("div");
        productCard.classList.add("col-lg-12", "wow", "fadeInUp");
        productCard.setAttribute("data-wow-delay", "0.2s");

        //         productCard.innerHTML = `
        //     <div class="flex flex-col md:flex-row gap-8">
        //         <!-- Product Image Section -->
        //         <div class="md:w-5/12">
        //             <div class="product-image">
        //                 <img class="w-full h-auto rounded-lg" src="../images/Accessories/${product.image}" alt="Product">
        //                 <div class="grid grid-cols-4 gap-2 mt-4 previews"></div>
        //             </div>
        //         </div>

        //         <!-- Product Details Section -->
        //         <div class="md:w-7/12">
        //             <div class="space-y-6">
        //                 <!-- Product Title -->
        //                 <h2 class="text-xl font-bold">${product.name}</h2>

        //                 <!-- Price Area -->
        //                 <div class="space-y-2">
        //                     <div class="flex items-center gap-2">
        //                         <del class="text-gray-500">JOD ${product.price}</del>
        //                         <span class="text-red-600">${product.priceWithDiscount}</span>
        //                     </div>
        //                     <div class="text-2xl font-bold">JOD ${product.priceWithDiscount}</div>
        //                 </div>

        //                 <!-- Action Buttons -->
        //                 <div class="flex flex-wrap gap-4">
        //                     <a href="paypal.html" class="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
        //                         الدفع
        //                     </a>
        //                     <button class="px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors addToCart"
        //                             data-id="${product.productId}">
        //                         أضافة إلى السلة
        //                     </button>
        //                 </div>

        //                 <!-- Product Description -->
        //                 <div class="space-y-2">
        //                     <h3 class="font-bold">معلومات عن المنتج</h3>
        //                     <p class="text-gray-600">${product.description}</p>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // `;
        productCard.innerHTML = `
                <div class="col-md-5">
                    <div class="main-img">
                        <img class="img-fluid" style="width: 400px !important;
  height: 300px;
  max-width: 1000px;" src="../images/Accessories/${product.image}" alt="ProductS">
                        <div class="row my-3 previews"></div>
                    </div>
                </div>.
                <div class="col-md-7">
                    <div class="main-description px-2">
                        <div class="category text-bold">${product.name}</div>
                        <div class="price-area my-4">
                            <p class="old-price mb-1"><del>JOD ${product.price}</del> <span class="old-price-discount text-danger"></span></p>
                            <p class="new-price text-bold mb-1">JOD ${product.priceWithDiscount}</p>
                        </div>
                        <div class="buttons d-flex my-5">
                           
                            <div class="block">
                            
                                <a href="##" class="" ><button class="shadow btn custom-btn addToCart" data-id="${product.productId}">أضافة إلى السلة</button></a>
                            </div>
                        </div>
                    </div>
                    <div class="product-details my-4">
                        <p class="details-title text-color mb-1">معلومات عن المنتج</p>
                        <p class="description">${product.description}</p>
                    </div>
                </div>
            `;
debugger
        productcontainer.appendChild(productCard);
      } else {
        console.error("Failed response:", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  fetchCategories();
});
