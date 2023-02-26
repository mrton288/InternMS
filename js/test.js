function onValidateNumber() {
    try {
        // Lấy ra value trong input
        let me = this;
        let numberCheck = this.value;

        // Lấy ra element ngang cấp đứng ngay sau
        let elErrorNumber = this.nextElementSibling;
        var sdtRegex = /((09|03|07|08|05)+([0-9]{8})\b)/g;

        if (!sdtRegex.test(numberCheck) && numberCheck !== "") {
            me.classList.add("input__error");
            if (elErrorNumber == null) {
                let elError = document.createElement("div");
                elError.classList.add("error-info");
                elError.textContent = "Số điện thoại không hợp lệ";

                me.parentElement.append(elError);
            }
        } else {
            me.classList.remove("input__error");

            if (elErrorNumber) {
                elErrorNumber.remove();
            }
        }
    } catch (error) {
        console.log(error);
    }
}

function onValidateEmail() {
    try {
        // Lấy ra value trong input
        let me = this;
        let emailCheck = this.value;

        // Lấy ra element ngang cấp đứng ngay sau
        let elErrorEmail = this.nextElementSibling;

        // Định dạng của email
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;

        // Kiểm tra định dạng email so với email nhập vào
        if (!filter.test(emailCheck) && emailCheck !== "") {
            // Thêm border thông tin lỗi
            me.classList.add("input__error");

            // Thêm element cảnh báo khi email không hợp lệ
            if (elErrorEmail == null) {
                let elError = document.createElement("div");
                elError.classList.add("error-info");
                elError.textContent = "Email không hợp lệ";

                this.parentElement.append(elError);
            }
        } else {
            // Bỏ border thông tin lỗi
            me.classList.remove("input__error");

            if (elErrorEmail) {
                elErrorEmail.remove();
            }
        }
    } catch (error) {
        console.log(error);
    }
}
