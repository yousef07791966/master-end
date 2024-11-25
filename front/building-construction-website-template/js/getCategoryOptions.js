document.addEventListener("DOMContentLoaded", function () {
  const categoryContainer = document.getElementById("category");
  async function fetchCategories() {
    try {
      const response = await fetch(
        "https://localhost:44350/api/Category/GetAllCategory",
        {
          method: "get",
        }
      );

      if (response.ok) {
        const categories = await response.json();

        $(categoryContainer).empty();
        categories.forEach((category) => {
          const categoryItem = document.createElement("a");
          categoryItem.href = `feature.html?categoryId=${category.categoryId}`;
          categoryItem.className = "dropdown-item";
          categoryItem.textContent = category.name;

          categoryContainer.appendChild(categoryItem);

          $("#allCategories").append(`
            <div class="col-lg-4 wow fadeInUp" style="width:500px !important" data-wow-delay="0.6s">
                            <a href="feature.html?categoryId=${category.categoryId}" class="h4 d-block mb-4">
                                <div class="blog-item h-100">
                                    <div class="blog-img">
                                        <img src="../images/Accessories/${category.image}" class="img-fluid w-100" alt=""> 
                                    </div>
                                    <div class="blog-content p-4 text-center">
                                       <h4>${category.name}</h4>
                                       <p>${category.description}</p>
       
                                    </div>
                                </div>
                            </a>
                        </div>
            `);
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
