document.getElementById("su").addEventListener("click", function(event) {
    event.preventDefault();

    // Lấy giá trị từ các trường input
    var name = document.getElementById("nameInput").value;
    var email = document.getElementById("emailInput").value;
    var password = document.getElementById("passwordInput").value;
    var confirmPassword = document.getElementById("confirmPasswordInput").value;

    // Kiểm tra các điều kiện
    if (name.trim() === "" || !/^[a-zA-Z0-9]+$/.test(name)) {
        alert("Tên không được chứa kí tự đặc biệt và không được để trống");
        return;
    }

    if (!email.endsWith("@gmail.com")) {
        alert("Email phải là định dạng @gmail.com");
        return;
    }

    if (password.length < 6) {
        alert("Mật khẩu phải có ít nhất 6 ký tự");
        return;
    }

    if (password !== confirmPassword) {
        alert("Mật khẩu xác nhận không khớp");
        return;
    }

    // Kiểm tra xem có dữ liệu đã được lưu trong localStorage chưa
    var storedData = localStorage.getItem("userData");
    var userData = storedData ? JSON.parse(storedData) : [];

    // Thêm tài khoản mới vào mảng
    userData.push({
        name: name,
        email: email,
        password: password
    });

    // Lưu mảng tài khoản vào localStorage
    localStorage.setItem("userData", JSON.stringify(userData));

    // Chuyển hướng đến trang đăng nhập
    window.location.href = "/MD13/Login.html";
});
