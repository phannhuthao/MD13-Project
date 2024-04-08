function confirmLogout() {
    if (confirm("Bạn muốn thoát khỏi trang web không?")) {
        window.location.href = "/MD13/Login.html"; 
    }
}








// Chức năng Giỏ Hàng
document.addEventListener("DOMContentLoaded", function() {
    var addToCartButtons = document.querySelectorAll(".btn-add-to-cart");
    addToCartButtons.forEach(function(button) {
        button.addEventListener("click", function(event) {
            event.preventDefault();
            // Lấy thông tin sản phẩm
            var productCard = event.target.closest(".card");
            var productName = productCard.querySelector(".card-title").innerText;
            var productPrice = productCard.querySelector(".card-body p:last-child").innerText;
            var productImage = productCard.querySelector(".card-img-top").getAttribute("src"); // Lấy đường dẫn hình ảnh sản phẩm

            // Kiểm tra xem đã chọn size chưa
            var selectedSize = productCard.querySelector('.size-checkbox:checked');
            if (!selectedSize) {
                alert("Bạn phải chọn size sản phẩm trước khi thêm vào giỏ hàng!");
                return; // Không thêm vào giỏ hàng nếu chưa chọn size
            }

            // Lấy size đã chọn
            var selectedSizeValue = selectedSize.value;

            // Tạo đối tượng sản phẩm
            var product = {
                name: productName,
                price: productPrice,
                size: selectedSizeValue,
                image: productImage, // Thêm đường dẫn hình ảnh vào đối tượng sản phẩm
                quantity: 1
            };

            // Lưu sản phẩm vào localStorage
            var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
            var existingCartItem = cartItems.find(item => item.name === productName && item.size === selectedSizeValue);
            if (existingCartItem) {
                // Nếu sản phẩm đã tồn tại với cùng tên và size, tăng số lượng lên 1
                existingCartItem.quantity++;
            } else {
                // Nếu sản phẩm chưa tồn tại, thêm vào giỏ hàng
                cartItems.push(product);
            }
            localStorage.setItem("cartItems", JSON.stringify(cartItems));

            // Cập nhật số lượng sản phẩm trong icon giỏ hàng
            updateCartItemCount();

            alert("Sản phẩm đã được thêm vào giỏ hàng!");
        });
    });

    // Lắng nghe sự kiện khi người dùng ấn vào icon giỏ hàng
    var cartIcon = document.getElementById("cartIcon");
    cartIcon.addEventListener("click", function() {
        renderCartModal();
    });

    // Hiển thị số lượng sản phẩm trong icon giỏ hàng
    function updateCartItemCount() {
        var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        var cartItemCount = cartItems.reduce((total, item) => total + item.quantity, 0);
        document.getElementById("cartItemCount").innerText = cartItemCount;
    }

    // Hiển thị thông tin sản phẩm trong giỏ hàng
    function renderCartModal() {
        var cartItems = JSON.parse(localStorage.getItem("cartItems")) || [];
        var modalBody = document.getElementById("cartContent");
        modalBody.innerHTML = ""; // Xóa nội dung cũ
    
        if (cartItems.length === 0) {
            modalBody.innerHTML = "<p>Giỏ hàng của bạn đang trống.</p>";
        } else {
            cartItems.forEach(function(item) {
                var productHTML = `
                    <div class="product">
                        <img src="${item.image}" alt="${item.name}" class="cart-product-image"> <!-- Thêm lớp cart-product-image -->
                        <div>
                            <p><strong>${item.name}</strong></p>
                            <p>Size: ${item.size}</p>
                            <p>${item.price}</p>
                            <p>Số lượng: ${item.quantity}</p>
                        </div>
                    </div>
                `;
                modalBody.insertAdjacentHTML("beforeend", productHTML);
            });
        }
    }
});












//   thanh srceach
const products = [
    { name: "Áo phông LOCAL FREEHAND TYPO", category: "Áo", size: "S, M, L,", image: "/image/Áo Thun Loca Freehand Typo Tee.webp" },
    { name: "Áo phông Áo BROCK TEE - GREY", category: "Áo", size: "S, M, L,", image: "path_to_image2.jpg" },
    { name: "Quần short (nhiều màu)", category: "Quần", size: "S, M, L", image: "path_to_image3.jpg" },
    { name: "Quần dài nam", category: "Quần", size: "S, M, L,", image: "path_to_image4.jpg" },
    { name: "Mũ đen", category: "Nón", size: "S, M, L,", image: "path_to_image5.jpg" },
    { name: "ÁO YOUR SHADOW TEE", category: "Áo", size:"S,M,L", image: "path_to_image6.jpg"},
    { name: "Nike Court Legacy CU4149-102", category: "Giày", size: "S, M, L,", image: "path_to_image7.jpg" },
    // Thêm sản phẩm khác nếu cần
];

const searchInput = document.getElementById('searchInput');
const searchResults = document.getElementById('searchResults');

searchInput.addEventListener('input', function () {
    const searchTerm = searchInput.value.toLowerCase();
    const filteredProducts = products.filter(product => {
        return product.name.toLowerCase().includes(searchTerm);
    });

    renderSearchResults(filteredProducts);
});

document.addEventListener('click', function(event) {
    if (!searchInput.contains(event.target)) {
        searchResults.classList.remove('show');
        searchInput.value = ''; // Xóa nội dung trong ô tìm kiếm khi click ra ngoài
    }
});

function renderSearchResults(results) {
    searchResults.innerHTML = '';

    if (results.length > 0) {
        searchResults.classList.add('show');
    } else {
        searchResults.classList.remove('show');
    }

    results.forEach(product => {
        const productElement = document.createElement('a');
        productElement.textContent = `${product.name} - ${product.category}`;  // tạo một đường liên kết (anchor element) với nội dung là tên sản phẩm và danh mục của sản phẩm 
        productElement.href = "#"; // Gắn href để có thể nhấp vào sản phẩm
        productElement.addEventListener('click', function(event) {
            event.preventDefault(); // Ngăn chặn hành động mặc định của thẻ a
            showProductDetails(product); // Hiển thị thông tin chi tiết của sản phẩm khi nhấp vào
        });
        
        searchResults.appendChild(productElement);
    });
}

function showProductDetails(product) {
    // Hiển thị thông tin chi tiết của sản phẩm
    alert(`Tên sản phẩm: ${product.name}\nDanh mục: ${product.category}\nKích thước: ${product.size} \nẢnh: ${product.image}`);
    // Bạn có thể thay thế alert bằng cách hiển thị thông tin chi tiết trong một modal, một cửa sổ popover, hoặc bất kỳ cách hiển thị nào khác phù hợp với thiết kế của bạn.
}


// Hàm để hiển thị thông tin người dùng
function displayUserInfo() {
    // Kiểm tra xem thông tin người dùng có được lưu trong localStorage không
    var storedData = localStorage.getItem("userData");
    if (storedData) {
        var userData = JSON.parse(storedData);
        var currentUser = userData[userData.length - 1]; // Lấy thông tin của người dùng mới nhất
        alert(`Tên: ${currentUser.name}\nEmail: ${currentUser.email}\nMật khẩu: ${currentUser.password}`);
    } else {
        alert('Không tìm thấy thông tin người dùng.');
    }
}

// Sự kiện khi nhấp vào biểu tượng người dùng
document.getElementById('userIcon').addEventListener('click', displayUserInfo);









// function addToFavorites(productName, size, image) {
//     // Cập nhật thông tin sản phẩm yêu thích vào modal
//     document.getElementById('favoriteModalImage').src = image;
//     document.getElementById('favoriteModalName').innerText = productName;
//     document.getElementById('favoriteModalSize').innerText = "Size: " + size;
    
//     // Mở modal
//     var favoriteModal = new bootstrap.Modal(document.getElementById('favoriteModal'));
//     favoriteModal.show();
    
//     // Thêm sản phẩm vào danh sách yêu thích trong localStorage
//     var favorites = JSON.parse(localStorage.getItem('favorites')) || [];
//     favorites.push({ image: image, name: productName, size: size });
//     localStorage.setItem('favorites', JSON.stringify(favorites));
    
//     // Hiển thị thông báo hoặc cập nhật UI khác tùy theo yêu cầu
//     alert('Sản phẩm đã được thêm vào danh sách yêu thích!');
// }

function addToFavorites(productName, size, image) {
    // Cập nhật thông tin sản phẩm yêu thích vào modal
    document.getElementById('favoriteModalImage').src = image;
    document.getElementById('favoriteModalName').innerText = productName;
    document.getElementById('favoriteModalSize').innerText = "Size: " + size;
    
    // Mở modal
    var favoriteModal = new bootstrap.Modal(document.getElementById('favoriteModal'));
    favoriteModal.show();
    
    // Thêm sản phẩm vào danh sách yêu thích trong localStorage
    var favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    favorites.push({ image: image, name: productName, size: size });
    localStorage.setItem('favorites', JSON.stringify(favorites));
    
    // Hiển thị thông báo hoặc cập nhật UI khác tùy theo yêu cầu
    alert('Sản phẩm đã được thêm vào danh sách yêu thích!');
}




  