function getAll(page) {
    $.ajax({
        type: "GET",
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        },
        url: "http://localhost:8080/products?page=" + page,
        success: function (data) {
            console.log(data)
            showProduct(data);
        },
        error: function (err) {
            console.log(err);
        }
    })
}

function showProduct(arr) {
    let str = ""
    for (const p of arr.content) {
        str += `<div class="col-lg-6 menu-item filter-starters">
            <img src="${p.img}" class="menu-img" alt="">
            <div class="menu-content">
              <a href="#">${p.name}</a><span>$ ${p.price}</span>
            </div>
            <div class="menu-ingredients">
              ${p.quality}
            </div>
          </div>`
    }
    for (let i = 0; i < arr.totalPages; i++) {
        if (i == arr.number) {
            str += `<button class="btn btn-secondary" onclick="getAll(${i})" > ${i + 1}  </button>`
        } else
            str += `<button class="btn btn-light" onclick="getAll(${i})" > ${i + 1}  </button>`

    }
    document.getElementById("show").innerHTML = str;
}

getAll(0);


function create() {
    let name = $("#name").val();
    let price = $("#price").val();
    let img = $("#img").val();
    let category = $("#category").val();

    let product = {
        name: name,
        price: price,
        img: img,
        category: {
            id: category
        }
    }
    $.ajax({
        type: "POST",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        url: "http://localhost:8080/products",
        data: JSON.stringify(product),
        success: function (data) {
            getAll();
        },
        error: function (err) {
            console.log(err);
        }
    })
}
