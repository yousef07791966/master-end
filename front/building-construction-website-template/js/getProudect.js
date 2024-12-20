var products = [];
document.addEventListener("DOMContentLoaded", function () {
  const cardContainer = document.getElementById("card-container");

  const urlParams = new URLSearchParams(window.location.search);
  const categoryId = urlParams.get("categoryId");

  async function fetchCategories() {
    try {
      const response = await fetch(
        `https://localhost:44350/api/Products/GetProductByCategoryID${categoryId}`,
        {
          method: "get",
        }
      );

      if (response.ok) {
        products = await response.json();
        products.map((product, index) => {
          const productCard = document.createElement("div");
          productCard.classList.add("col-lg-4", "wow", "fadeInUp");
          productCard.setAttribute("data-wow-delay", "0.2s");

          productCard.innerHTML = `
                <div class="blog-item h-100">
                    <div class="blog-img">
                        <img src="../images/Accessories/${product.image}" class="img-fluid w-100" alt="${product.name}">
                    </div>
                    <div class="blog-content p-4">
                        <a href="#" class="h4 d-block mb-4">${product.name}</a>
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <a href="ProductDitales.html?productId=${product.productId}&categoryId=${categoryId}" class="btn btn-secondary py-2 px-4 w-100">
                                <i class="fa fa-calendar-check me-1"></i> عرض التفاصيل
                            </a>
                        </div>
                        <a href="##" data-id="${product.productId}" class="btn btn-secondary addToCart py-2 px-4 w-100">الإضافة إلى سلة</a>
                    </div>
                </div>
              `;

          cardContainer.appendChild(productCard);
        });
      } else {
        console.error("Failed response:", response);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  }

  fetchCategories();
});
