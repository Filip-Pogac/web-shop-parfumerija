
//on page load call setCategory for category 0
window.onload = function () {
    //ne zelim hard code, stoga dohvati prvu tipku iz kategorija i njen text
    let category_name = document.getElementById("sve_kategorije").getElementsByTagName("button")[0].textContent;
    setCategory(0, category_name);
}

async function setCategory(category_index, category_name) {
    try {
        let url = "/home/products/" + category_index;

        const response = await fetch(url);
        const html = await response.text();

        const productsContainer = document.querySelector('.products');
        productsContainer.innerHTML = html;

        //dohvati pokazi_kategoriju
        let showCategory = document.getElementById("pokazi_kategoriju");
        //postavi naziv kategorije
        showCategory.textContent = category_name;

    } catch (error) {
        console.error('Error fetching products:', error);
    }
}


//kao id proizvoda koristim ime pripadajuće slike, name ne može jer može sadržavati razmake
function addToCart(id) {
    let url = "/cart/add/" + id;
    fetch(url).then((response) => {
        if (response.ok) {
            //dohvati document.getElementById("totalBasketCount") i povecaj ga za 1 i napravi ga visible
            let totalBasketCount = document.getElementById("totalBasketCount");
            totalBasketCount.textContent = parseInt(totalBasketCount.textContent) + 1;
            totalBasketCount.style.display = "block";
            totalBasketCount.style.visibility = "visible";

            //logiraj
            console.log("Product added to cart");

            //dohvati proizvod po id i povecaj broj proizvoda u kosarici za 1
            let productCount = document.getElementById(id);
            let count = productCount.textContent;
            count++;
            productCount.textContent = count;
            productCount.style.visibility = "visible";
        } else {
            console.log("Error");
        }
    });
}

function removeFromCart(id) {
    let url = "/cart/remove/" + id;
    fetch(url).then((response) => {
        if (response.ok) {
            //dohvati document.getElementById("totalBasketCount") i smanji ga za 1
            let totalBasketCount = document.getElementById("totalBasketCount");
            totalBasketCount.textContent = parseInt(totalBasketCount.textContent) - 1;
            //ako je totalBasketCount 0 sakrij ga
            if (totalBasketCount.textContent == 0) {
                totalBasketCount.style.visibility = "hidden";
            }

            //dohvati proizvod po id i smanji broj proizvoda u kosarici za 1
            let productCount = document.getElementById(id);
            let count = productCount.textContent;
            count--;
            productCount.textContent = count;
        } else {
            console.log("Error");
        }
    });
}
