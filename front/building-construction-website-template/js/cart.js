let products = [];
$(document).ready(function () {
  products = localStorage.getItem("products");
  if (products) {
    products = JSON.parse(localStorage.getItem("products"));
    displayProducts(products);
  } else {
    $("#productTable tbody").empty().append(`<tr><td>No Products</td></tr>`);
  }

  // Display products in the table

  $("#applyVouvher").on("click", function (e) {
    e.preventDefault();
    applyVoucher($("#voucherCode").val());
  });
});

function displayProducts(products) {
  let tableBody = $("#productTable tbody");
  tableBody.empty();

  for (let i = 0; i < products.length; i++) {
    let product = products[i];
    let row = $("<tr>");
    row.append(
      `<td><button class="btn btn-danger btn-sm delete-product" data-id="${product.productId}">Delete</button></td>`
    );
    row.append(
      `<td><img src="../images/Accessories/${product.image}" width="100" /></td>`
    );
    row.append(`<td>${product.name}</td>`);
    row.append(`<td>${product.priceWithDiscount}</td>`);
    row.append(
      `<td class="product_quantity"><label>الكمية</label> <input data-id="${
        product.productId
      }" class="quantity" min="1" max="100" value="${
        product.quantity || 1
      }" type="number"></td>`
    );
    row.append(
      `<td>${product.priceWithDiscount * (product.quantity || 1)}</td>`
    );
    tableBody.append(row);
  }
  calculateTotal();
}

$(document).on("click", ".delete-product", function (e) {
  e.preventDefault();
  deleteProduct($(e.target).attr("data-id"));
});
$(document).on("change", ".quantity", function (e) {
  e.preventDefault();
  editQuantity($(e.target).attr("data-id"), $(e.target).val());
});

function deleteProduct(id) {
  let index = products.findIndex(
    (product) => product.productId === parseInt(id)
  );
  if (index !== -1) {
    products.splice(index, 1);
    localStorage.setItem("products", JSON.stringify(products));
    displayProducts(products);
  }
}

function editQuantity(id, quantity) {
  let product = products.find((product) => product.productId === parseInt(id));
  if (product) {
    product.quantity = parseInt(quantity);
    localStorage.setItem("products", JSON.stringify(products));
    displayProducts(products);
  }
}

function calculateTotal() {
  let total = 0;
  products.forEach((product) => {
    total += product.priceWithDiscount * product.quantity;
  });
  if(localStorage.getItem('isVoucherUsed') == true) {
    total = localStorage.getItem('total');
  } else {
    localStorage.setItem("total", JSON.stringify(total));
  }
  $(".cart_amount").text(total);
}

async function applyVoucher(voucher) {
  if (!voucher.trim()) {
    return alert("Please inter a voucher");
  }

  const response = await fetch(
    `https://localhost:44350/api/Voucher/UseVoucher/${voucher}`,
    {
      method: "PUT",
      mode: "cors",
    }
  );
  
  const voucherRes = await response.json();

  if (voucherRes.voucherstatus == "valid") {
    var total = localStorage.getItem("total");
    total = Number(total);

    var newTotal = total - total * (Number(voucherRes.percentage) / 100);

    localStorage.setItem("total", JSON.stringify(newTotal));
    localStorage.setItem("isVoucherUsed", true);
    $(".cart_amount").text(newTotal);
  } else if (voucherRes.voucherstatus == "invalid") {
    alert(voucherRes.message);
  }
}
