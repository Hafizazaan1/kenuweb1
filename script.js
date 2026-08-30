/* =========================================
   KENUCOLOR SETTINGS
========================================= */

// IMPORTANT:
// Yahan apna WhatsApp number likho.
// Pakistan example:
// 923001234567
//
// + sign, spaces aur dashes mat lagana.

const WHATSAPP_NUMBER = "923160899978";


/* =========================================
   PRODUCTS
========================================= */

let products = [

    {
        id: 1,
        name: "Kenu Premium Interior",
        category: "Interior Paint",
        color: "#F4E8D0",
        rating: 5,
        description:
            "Premium quality interior paint with a smooth and beautiful finish."
    },

    {
        id: 2,
        name: "Kenu Exterior Shield",
        category: "Exterior Paint",
        color: "#4E9F8C",
        rating: 5,
        description:
            "Durable exterior color designed to protect and beautify your walls."
    },

    {
        id: 3,
        name: "Kenu Weather Guard",
        category: "Weather Protection",
        color: "#2675C9",
        rating: 4.9,
        description:
            "Weather resistant paint for long-lasting exterior protection."
    },

    {
        id: 4,
        name: "Kenu Silk Finish",
        category: "Premium Finish",
        color: "#D8B4A0",
        rating: 5,
        description:
            "Elegant silk finish for modern interiors and beautiful spaces."
    },

    {
        id: 5,
        name: "Kenu Super White",
        category: "Wall Paint",
        color: "#F8F8F5",
        rating: 4.8,
        description:
            "Clean bright white color suitable for homes, offices and shops."
    },

    {
        id: 6,
        name: "Kenu Royal Blue",
        category: "Decorative Paint",
        color: "#174A9E",
        rating: 5,
        description:
            "Rich royal blue color for a bold and beautiful appearance."
    }

];


/* =========================================
   LANGUAGE
========================================= */

let currentLanguage = "en";


function selectLanguage(language) {

    currentLanguage = language;

    document.getElementById("languageScreen").classList.add("hidden");

    document.getElementById("mainWebsite").classList.remove("hidden");

    if (language === "ur") {

        document.body.classList.add("urdu");

        document.documentElement.lang = "ur";

    } else {

        document.body.classList.remove("urdu");

        document.documentElement.lang = "en";

    }

    updateLanguage();

    renderProducts();
}


function updateLanguage() {

    const elements = document.querySelectorAll("[data-en]");

    elements.forEach(element => {

        if (currentLanguage === "ur") {

            element.textContent = element.getAttribute("data-ur");

        } else {

            element.textContent = element.getAttribute("data-en");

        }

    });

}


/* =========================================
   PRODUCTS DISPLAY
========================================= */

function renderProducts(list = products) {

    const grid = document.getElementById("productsGrid");

    grid.innerHTML = "";

    if (list.length === 0) {

        grid.innerHTML = `
            <div style="grid-column:1/-1;text-align:center;padding:50px;">
                <h3>No products found</h3>
            </div>
        `;

        return;
    }


    list.forEach(product => {

        const card = document.createElement("div");

        card.className = "product-card";

        card.innerHTML = `

            <div
                class="product-color"
                style="background:${product.color}">
            </div>

            <div class="product-info">

                <span class="product-category">
                    ${product.category}
                </span>

                <h3>
                    ${product.name}
                </h3>

                <p>
                    ${product.description}
                </p>

                <div class="product-bottom">

                    <div class="rating">
                        ★★★★★
                        <small> ${product.rating}</small>
                    </div>

                    <button
                        class="view-btn"
                        onclick="openProduct(${product.id})">
                        ${
                            currentLanguage === "ur"
                            ? "دیکھیں"
                            : "View"
                        }
                    </button>

                </div>

            </div>

        `;

        grid.appendChild(card);

    });

}


/* =========================================
   PRODUCT SEARCH
========================================= */

function searchProducts() {

    const search =
        document
        .getElementById("productSearch")
        .value
        .toLowerCase();

    const filtered = products.filter(product =>

        product.name.toLowerCase().includes(search) ||

        product.category.toLowerCase().includes(search)

    );

    renderProducts(filtered);
}


/* =========================================
   PRODUCT DETAILS
========================================= */

function openProduct(id) {

    const product =
        products.find(item => item.id === id);

    if (!product) return;


    const modal =
        document.getElementById("productModal");

    const content =
        document.getElementById("modalProductContent");


    const applyText =
        currentLanguage === "ur"
        ? "ڈسٹری بیوٹر کے لیے اپلائی کریں"
        : "Apply for Distributor";


    content.innerHTML = `

        <div
            class="modal-product-color"
            style="background:${product.color}">
        </div>

        <span class="product-category">
            ${product.category}
        </span>

        <h2>
            ${product.name}
        </h2>

        <div class="modal-rating">
            ★★★★★ ${product.rating}
        </div>

        <p>
            ${product.description}
        </p>

        <br>

        <button
            class="whatsapp-btn"
            onclick="applyForProduct('${product.name}')">

            💬 ${applyText}

        </button>

    `;

    modal.classList.add("show");
}


function closeProductModal() {

    document
        .getElementById("productModal")
        .classList.remove("show");

}


/* =========================================
   DISTRIBUTOR WHATSAPP
========================================= */

function applyDistributor() {

    const message =
        currentLanguage === "ur"

        ? `السلام علیکم، میں KenuColor کا ڈسٹری بیوٹر بننے کے لیے اپلائی کرنا چاہتا ہوں۔ براہ کرم مجھے مکمل معلومات فراہم کریں۔`

        : `Hello KenuColor, I would like to apply to become a distributor. Please provide me with complete information.`;

    openWhatsApp(message);
}


function applyForProduct(productName) {

    const message =
        currentLanguage === "ur"

        ? `السلام علیکم، مجھے KenuColor کے "${productName}" کے بارے میں معلومات چاہیے اور میں ڈسٹری بیوٹر کے طور پر اپلائی کرنا چاہتا ہوں۔`

        : `Hello KenuColor, I am interested in "${productName}" and would like to apply as a distributor. Please provide me with more information.`;

    openWhatsApp(message);
}


function openWhatsApp(customMessage = null) {

    const message = customMessage ||

        (
            currentLanguage === "ur"

            ? "السلام علیکم، مجھے KenuColor کے بارے میں معلومات چاہیے۔"

            : "Hello KenuColor, I would like to get more information."
        );


    const url =
        `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;


    window.open(url, "_blank");

}


/* =========================================
   ADD PRODUCT
========================================= */

function openAddProduct() {

    document
        .getElementById("addProductModal")
        .classList.add("show");

}


function closeAddProduct() {

    document
        .getElementById("addProductModal")
        .classList.remove("show");

}


function addProduct() {

    const name =
        document
        .getElementById("newProductName")
        .value
        .trim();

    const category =
        document
        .getElementById("newProductCategory")
        .value
        .trim();

    const color =
        document
        .getElementById("newProductColor")
        .value;

    const description =
        document
        .getElementById("newProductDescription")
        .value
        .trim();


    if (!name || !category || !description) {

        alert(
            currentLanguage === "ur"
            ? "براہ کرم تمام معلومات مکمل کریں۔"
            : "Please fill all fields."
        );

        return;
    }


    const newProduct = {

        id: Date.now(),

        name: name,

        category: category,

        color: color,

        rating: 5,

        description: description

    };


    products.push(newProduct);

    renderProducts();

    closeAddProduct();


    document.getElementById("newProductName").value = "";

    document.getElementById("newProductCategory").value = "";

    document.getElementById("newProductDescription").value = "";


    alert(
        currentLanguage === "ur"
        ? "پروڈکٹ شامل کر دیا گیا ہے۔"
        : "Product added successfully."
    );

}


/* =========================================
   MOBILE MENU
========================================= */

function toggleMenu() {

    document
        .getElementById("navMenu")
        .classList.toggle("open");

}


/* =========================================
   CLOSE MODAL WHEN CLICKING OUTSIDE
========================================= */

window.addEventListener("click", function(event) {

    const productModal =
        document.getElementById("productModal");

    const addModal =
        document.getElementById("addProductModal");


    if (event.target === productModal) {

        closeProductModal();

    }


    if (event.target === addModal) {

        closeAddProduct();

    }

});
