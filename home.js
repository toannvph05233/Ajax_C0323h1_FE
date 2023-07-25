function getAll() {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json'
        },
        url: "http://localhost:8080/products",
        success: function (data) {
            showProduct(data);
        },
        error: function (err) {
            console.log(err);
        }
    })
}

function showProduct(arr) {
    let str = ""
    for (const p of arr) {
        str +=`<div class="col-lg-6 menu-item filter-starters">
            <img src="${p.img}" class="menu-img" alt="">
            <div class="menu-content">
              <a href="#">${p.name}</a><span>$ ${p.price}</span>
            </div>
            <div class="menu-ingredients">
              ${p.category.name}
            </div>
          </div>`
    }
    document.getElementById("show").innerHTML = str;
}
getAll();


function create() {
    let name = $("#name").val();
    let price = $("#price").val();
    let img = $("#img").val();
    let category = $("#category").val();

    let product = {
        name: name,
        price: price,
        img:img,
        category: {
            id:category
        }
    }
    $.ajax({
        type: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/products",
        data:JSON.stringify(product),
        success: function (data) {
            getAll();
        },
        error: function (err) {
            console.log(err);
        }
    })
}
