document.getElementById("submitBtn").addEventListener("click", function(event) {
    event.preventDefault();

    // Lấy giá trị từ các trường input
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    // Lấy thông tin từ localStorage
    var storedData = localStorage.getItem("userData");

    if (storedData) {
        var userData = JSON.parse(storedData);
        // Kiểm tra thông tin đăng nhập với từng tài khoản trong mảng
        var isLoggedIn = userData.some(function(user) {
            return user.email === email && user.password === password;
        });
        
        if (isLoggedIn) {
            // Chuyển hướng đến trang index.html nếu thông tin đúng
            window.location.href = "/MD13/index.html";
        } else {
            alert("Tài khoản này chưa được đăng kí");
        }
    } else {
        alert("Tài khoản này chưa được đăng kí");
    }
});


