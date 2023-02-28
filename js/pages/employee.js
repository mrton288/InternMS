import Combobox from "../../lib/ncombobox.js";

var test; // Biến để lưu giá trị ngày sinh đẩy ra global
const messageError = [
    {
        card: "Số CMND không hợp lệ",
    },
    {
        number: "Số điện thoại không hợp lệ",
    },
    {
        email: "Địa chỉ email không hợp lệ",
    },
    {
        bAccount: "Số tài khoản không hợp lệ",
    },
];

window.onload = function () {
    createEvent();
    new EmployeePage();
    new Combobox();
};

class EmployeePage {
    ListEmployee;
    constructor() {
        // this.deleteRowData();
        this.loadData();
    }
    /**
     * Load dữ liệu cho table
     * Author: NVDUC (23/2/2023*)
     */
    loadData() {
        try {
            // Gọi api lấy dữ liệu
            fetch("https://apidemo.laptrinhweb.edu.vn/api/v1/Employees")
                .then((res) => res.json())
                .then((data) => {
                    this.ListEmployee = data;
                    // buil table
                    this.buildTableData(data);
                    this.eventCheckAll();
                    this.eventCheckLine();
                });
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Xử lý dữ liệu đẩy vào table Employee
     */
    buildTableData(data) {
        try {
            // Hiển thị loading khi chưa load dữ liệu
            document.querySelector(".loading").style.display = "block";

            let tableEmployee = document.getElementById("tableEmployee");
            let bodyTable = tableEmployee.lastElementChild;

            // Duyệt các tiêu đề của table, đọc các thông tin được khai báo
            let thList = tableEmployee.getElementsByTagName("th");

            // Duyệt các đối tượng trong danh sách dữ liệu -> Lấy các thông tin tương ứng và build tr
            for (const item of data) {
                // Tạo từng dòng dữ liệu tương ứng với từng đối tượng trong danh sách nhân viên sau đó đẩy lên table
                let trElement = document.createElement("tr");
                for (const col of thList) {
                    // 2. Lấy ra các thông tin tương ứng với các cột table
                    // Lấy ra cột có attribute là type = checkbox
                    const type = col.getAttribute("type");
                    const format = col.ATTRIBUTE_NODE;
                    if (type == "checkbox") {
                        // 3. Build html thể hiện các thông tin trên table
                        let tdCheckbox = document.createElement("td");

                        // Tạo element div
                        let divCheckbox = document.createElement("div");
                        divCheckbox.classList.add("checkbox");

                        // Tạo element input
                        let inputCheckbox = document.createElement("input");
                        inputCheckbox.setAttribute("type", "checkbox");

                        let spanCheckbox = document.createElement("span");
                        spanCheckbox.classList.add("checkmark");

                        divCheckbox.append(inputCheckbox);
                        divCheckbox.append(spanCheckbox);
                        tdCheckbox.append(divCheckbox);
                        trElement.append(tdCheckbox);
                    } else if (type == "editfunction") {
                        let tdEdit = document.createElement("td");

                        // Tạo element div
                        let divEdit = document.createElement("div");
                        divEdit.classList.add("edit__function");

                        let editButton = document.createElement("button");
                        // editButton.setAttribute("onclick", "displayEmployeeEditForm(data)");
                        editButton.classList.add("edit__button");
                        editButton.textContent = "Sửa";

                        let divEditChild = document.createElement("div");
                        divEditChild.classList.add("edit__arrowdown");
                        divEditChild.setAttribute("id", "target__edit");

                        divEdit.append(editButton);
                        divEdit.append(divEditChild);
                        tdEdit.append(divEdit);
                        trElement.append(tdEdit);
                    } else {
                        // Lấy ra modul-name
                        const modelName = col.getAttribute("model-name");
                        let tdElement = document.createElement("td");
                        const value = item[modelName];

                        // Định dạng cho cột lương, ngày sinh, giới tính
                        if (modelName == "Salary") {
                            tdElement.textContent = this.formatMoney(value);
                            tdElement.classList.add("text__align-right");
                        } else if (modelName == "DateOfBirth") {
                            tdElement.textContent = this.formatDateOfBirth(value);
                            tdElement.classList.add("text__align-center");
                        } else if (modelName == "Gender") {
                            tdElement.textContent = this.formatGender(value);
                        } else {
                            tdElement.textContent = value;
                        }
                        trElement.append(tdElement);
                    }
                }
                trElement.ondblclick = () => {
                    this.displayEmployeeEditForm(item);
                };
                this.showHideMenuFunction();
                // 4. Đẩy vào table
                bodyTable.append(trElement);
                // Ẩn loading khi load dữ liệu xong
                document.querySelector(".loading").style.display = "none";
            }
        } catch (error) {
            console.log(error);
        }
    }

    /**
     * Định dạng ngày sinh dd/mm/yy
     */
    formatDateOfBirth(data) {
        try {
            data = new Date(data);
            // Lấy ra ngày
            let dateValue = data.getDate();
            // Lấy ra tháng
            let monthValue = data.getMonth() + 1;
            // Lẩy ra năm
            let yearValue = data.getFullYear();
            if (dateValue < 10) {
                dateValue = `0${dateValue}`;
            }
            if (monthValue < 10) {
                monthValue = `0${monthValue}`;
            }
            return `${dateValue}/${monthValue}/${yearValue}`;
        } catch (error) {
            return error;
        }
    }

    /**
     * Định dạng lương hiển thị theo VND
     */
    formatMoney(data) {
        try {
            const config = { style: "currency", currency: "VND", maximumFractionDigits: 9 };
            const formated = new Intl.NumberFormat("vi-VN", config).format(data);
            return formated;
        } catch (error) {
            console.log(error);
        }
    }
    /**
     * Hiển thị ra giới tính từ dữ liệu
     */
    formatGender(data) {
        try {
            switch (data) {
                case 0:
                    return "Nam";
                case 1:
                    return "Nữ";
                case 2:
                    return "Không xác định";
                default:
                    break;
            }
        } catch (error) {
            console.log(error);
        }
    }

    // Các sự kiện chức năng khác
    showHideMenuFunction() {
        var k = 0;
        // Show - hidden Menu chức năng
        var editOption = document.getElementById("edit__option");
        document.querySelectorAll(".edit__arrowdown").forEach((el) =>
            el.addEventListener("click", function () {
                // Ẩn hiện phần lựa chọn chức năng khi ấn vào mũi tên
                editOption.classList.toggle("hide");
                // Thêm border cho mũi tên "Sửa"
                el.classList.toggle("edit__arrowdown-border");
                k = 1;
                // Lấy ra vị trí của phần tử mũi tên
                var coords = el.getBoundingClientRect();
                editOption.style.left = coords.left + 35 + "px";
                if (coords.top > 600) {
                    editOption.style.top = coords.top - 90 + "px";
                } else {
                    editOption.style.top = coords.bottom + 2 + "px";
                }

                if (k == 0) {
                    document.addEventListener("click", function (event) {
                        if (event.target !== el) {
                            editOption.classList.add("hide");
                        }
                    });
                }
            })
        );
    }

    eventCheckLine() {
        var allLine = document.querySelector("table tbody tr td");
        const allCheckbox = document.querySelectorAll(".checkbox:not(.select-all, .cbOther) input");
        allCheckbox.forEach((el) => {
            el.addEventListener("click", function () {
                el.parentElement.parentElement.classList.toggle("background-line");
            });
        });
    }

    // Hiển thị checked toàn bộ khi checked vào ô ở head
    eventCheckAll() {
        // Checkbox all
        var allLine = document.querySelectorAll("table tbody tr td");
        const selectAll = document.querySelector(".checkbox.select-all input");
        const allCheckbox = document.querySelectorAll(".checkbox:not(.select-all, .cbOther) input");
        let listBoolean = [];

        // Duyệt qua từng phần tử trong mảng document allCheckbox
        allCheckbox.forEach((item) => {
            item.addEventListener("change", function () {
                // phần tử nào checked thì add vào mảng listBoolen
                allCheckbox.forEach((i) => {
                    listBoolean.push(i.checked);
                });
                // Nếu 1 trong các phần tử trong mảng đổi trạng thái checked thì
                // element cha cũng đổi trạng thái
                if (listBoolean.includes(false)) {
                    selectAll.checked = false;
                } else {
                    selectAll.checked = true;
                }
                listBoolean = [];
            });
        });

        // Checked tất cả hàng khi selectAll có checked = true và ngược lại
        selectAll.addEventListener("change", function () {
            if (this.checked) {
                allCheckbox.forEach((i) => {
                    i.checked = true;
                    allLine.forEach((el) => {
                        el.style.backgroundColor = "#EDF8EB";
                    });
                });
            } else {
                allCheckbox.forEach((i) => {
                    i.checked = false;
                    allLine.forEach((el) => {
                        el.style.backgroundColor = null;
                    });
                });
            }
        });
    }

    displayEmployeeEditForm(item) {
        // Đổi title popup
        document.querySelector(".popup__title").textContent = "Sửa nhân viên";
        // Lấy ra các thông tin trên bảng để hiện thị lên popup
        document.getElementById("txtEmployeeCode").value = item.EmployeeCode;
        document.getElementById("txtEmployeeName").value = item.FullName;
        document.getElementById("txtIdentityCard").value = item.IdentityNumber;
        document.getElementById("txtPosition").value = item.PositionName;
        document.getElementById("txtAddress").value = item.Address;
        document.getElementById("txtPhoneNumber").value = item.PhoneNumber;
        document.getElementById("txtEmail").value = item.Email;

        if (item["Gender"]) {
            document.getElementsByName("gender")[item["Gender"]].checked = true;
        }
        if (item["DateOfBirth"]) {
            //Gán giá trị ngày
            let date = new Date(item["DateOfBirth"]);
            //Lấy ra ngày
            let day = date.getDate().toString().padStart(2, "0");
            //Lấy ra tháng
            let month = (date.getMonth() + 1).toString().padStart(2, "0");
            //Lấy ra năm
            let year = date.getFullYear();
            document.getElementById("dateOfBirth").value = year + "-" + month + "-" + day;
        }
        document.getElementById("form__detail").style.display = "block";
    }

    /**
     * Xoá dữ liệu theo từng hàng
     * CreateBy: NVDUC(25/2/2023)
     */
    // deleteRowData() {
    //     // Lấy ra id nhân viên của hàng muốn xoá
    //     // - gọi api lấy ra cột có id nhân viên muốn xoá
    //     var getIdEmployee;
    //     try {
    //         fetch("https://apidemo.laptrinhweb.edu.vn/api/v1/Employees")
    //             .then((res) => res.json)
    //             .then((data) => {
    //                 this.ListEmployee = data;
    //             });

    //         let tableEmployee = document.getElementById("tableEmployee");
    //         // let thList = tableEmployee.getElementsByTagName("th");

    //         for (const row of data) {
    //             let trList = tableEmployee.getElementsByTagName("tr");
    //             // for (const col of thList) {
    //             //     row.EmployeeId;
    //             // }
    //             document.getElementsByClassName("edit__arrowdown").forEach((el) => {
    //                 el.addEventListener("click", function () {
    //                     getIdEmployee = data[data.indexOf(row)].EmployeeId;
    //                     trList.remove(getIdEmployee);
    //                 });
    //             });
    //         }
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }
    // - gán id đó cho hàm xoá
    // Thực hiện xoá hàng dữ liệu theo mã nhân viên đã lấy ra

    // show detail khi double click vào từng dòng
    // document.querySelectorAll("table tbody tr").forEach((el) => {
    //     el.addEventListener("dblclick", onShowFormDetail());
    // });
    /**
     * Hiển thị form sửa nhân viên
     */
}

// Xoá thông tin cũ khi click vào "thêm mới nhân viên"
function clearInfoEmployee() {
    document.getElementById("txtEmployeeCode").value = "NV-0001";
    document.getElementById("txtEmployeeName").value = "";
    document.getElementById("txtIdentityCard").value = "";
    document.getElementById("txtPosition").value = "";
    document.getElementById("txtAddress").value = "";
    document.getElementById("txtPhoneNumber").value = "";
    document.getElementById("txtEmail").value = "";
    document.getElementById("dateOfBirth").value = null;
}

/**
 * Tạo sự kiện cho các element
 */
function createEvent() {
    try {
        // Hiển thị from thông tin nhân viên
        document.querySelector(".content__header-add").addEventListener("click", function () {
            document.getElementById("form__detail").style.display = "block";
            document.querySelector(".popup__title").textContent = "Thông tin nhân viên";
            clearInfoEmployee();
            let infoEmployee = document.getElementById("txtEmployeeCode");
            // Tự động focus vào employeeCode
            infoEmployee.focus();
            infoEmployee.select();
        });

        // Ẩn form thông tin nhân viên
        document.getElementById("btnCancel").addEventListener("click", function () {
            document.getElementById("form__detail").style.display = "none";
        });

        document.querySelectorAll(".input--required").forEach((el) => {
            el.addEventListener("blur", onValidateFiedEmpty);
        });

        // Tạo sự kiện validate ngày sinh
        document.getElementById("dateOfBirth").addEventListener("input", onValidateDateOfBirth);

        document.getElementById("dateRange").addEventListener("input", onValidateDayRange);

        document.getElementById("txtIdentityCard").addEventListener("blur", function () {
            // Định dạng số CMND
            var cardRegex = /(([0-9]{9,12})\b)/;
            onValidateFormat(cardRegex, messageError[0].card);
        });

        document.querySelectorAll(".checkNumber").forEach((el) => {
            el.addEventListener("blur", function () {
                // Định dạng của SĐT
                var numberRegex = /((09|03|07|08|05)+([0-9]{8})\b)/g;
                onValidateFormat(numberRegex, messageError[1].number);
            });
        });

        // Kiểm tra email hợp lệ
        document.getElementById("txtEmail").addEventListener("blur", function () {
            // Định dạng email
            var emailRegex = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            onValidateFormat(emailRegex, messageError[2].email);
        });

        // Kiểm tra tài khoản ngân hàng:8 chữ số đến 15 chữ số
        document.getElementById("checkBankAccount").addEventListener("blur", function () {
            // Định dạng số CMND
            var bAccountRegex = /(([0-9]{8,15})\b)/;
            onValidateFormat(bAccountRegex, messageError[3].bAccount);
        });

        // Lấy ra id của hàng muốn xoá
        // document.getElementById("deleteRow").addEventListener("click", deleteRowData());
    } catch (error) {
        console.log(error);
    }
}

/* Validate dữ liệu */
// - Họ tên không được phép trống
// - Mã nhân viên không được phép trống
// - Ngày sinh không được lớn hơn ngày hiện tại
// - Email phải đúng định dạng

/**
 * Kiểm tra dữ liệu có trống hay không
 */
function onValidateFiedEmpty() {
    try {
        // Lấy ra value trong input:
        let me = this;
        const valueCurrent = me.value;

        // Lấy ra element cùng cấp đứng ngay sau đó
        let elErrorInfo = this.nextElementSibling;

        // Kiểm tra value có trống hay không
        if (!valueCurrent.trim()) {
            // Nếu dữ liệu trống thì hiển thị thông báo lỗi
            // Gán cho input border màu đỏ
            me.classList.add("input__error");

            // Hiển thị thông tin lỗi:
            // 1. Lấy ra element thông tin lỗi
            // 2. Đặt hiển thị
            // elErrorInfo.style.display = "block";

            /* Hiển thị thông tin lỗi bằng cách thêm Element */
            if (elErrorInfo == null) {
                let elError = document.createElement("div");
                elError.classList.add("error-info");
                elError.textContent = "Thông tin này không được phép để trống";

                // Sử dụng element cha của input và append
                // this.after(elError);
                me.parentElement.append(elError);
            }
        } else {
            // Bỏ border màu đỏ của input
            me.classList.remove("input__error");
            // Bỏ hiển thị thông tin lỗi
            // elErrorInfo.style.display = "none";

            // Kiểm tra trong dom có element lỗi hay không nếu có thì remove
            if (elErrorInfo) {
                elErrorInfo.remove();
            }
        }
        // Nếu có dữ liệu thì xoá(nếu có)
    } catch (error) {
        console.log(error);
    }
}

/**
 * Kiểm tra định dạng của input
 */
function onValidateFormat(format, mes) {
    try {
        // Lấy ra value trong input
        let me = event.currentTarget;
        let infoCheck = me.value;

        // Lấy ra element ngang cấp đứng ngay sau element đang active
        let elErrorElement = me.nextElementSibling;

        // Kiểm tra định dạng email so với email nhập vào
        if (!format.test(infoCheck) && infoCheck !== "") {
            me.classList.add("input__error");

            // Thêm element cảnh báo khi email không hợp lệ
            if (elErrorElement == null) {
                let elError = document.createElement("div");
                elError.classList.add("error-info");
                elError.textContent = mes;
                // Nối thêm element mới vào cuối element cha
                me.parentElement.append(elError);
            }
        } else {
            // Bỏ border thông tin lỗi
            me.classList.remove("input__error");
            // Xoá element lỗi khỏi DOM
            if (elErrorElement) {
                elErrorElement.remove();
            }
        }
    } catch (error) {
        console.log(error);
    }
}

/**
 * Kiểm tra ngày sinh hợp lệ hay không
 */
function onValidateDateOfBirth() {
    try {
        // Lấy ra value trong input
        let me = this;
        let dateOfBirth = me.value;

        let elErrorInfo = me.nextElementSibling;
        // Kiểm tra value có đúng định dạng ngày không
        if (dateOfBirth) {
            dateOfBirth = new Date(dateOfBirth);
        }
        // Kiểm tra ngày chọn so với ngày hiện tại
        if (dateOfBirth > new Date()) {
            me.classList.add("input__error");
            if (elErrorInfo == null) {
                let elError = document.createElement("div");
                elError.classList.add("error-info");
                elError.textContent = "Ngày sinh không được lớn hơn ngày hiện tại";

                me.parentElement.append(elError);
            }
        } else {
            me.classList.remove("input__error");

            if (elErrorInfo) {
                elErrorInfo.remove();
            }
            test = dateOfBirth;
        }
        console.log(dateOfBirth);
    } catch (error) {
        console.log(error);
    }
}

function onValidateDayRange() {
    try {
        // Lấy ra value trong input
        let me = this;
        let dateCurrent = me.value;

        let elErrorInfo = me.nextElementSibling;

        if (dateCurrent) {
            dateCurrent = new Date(dateCurrent);
        }
        if (dateCurrent < test) {
            me.classList.add("input__error");
            if (elErrorInfo == null) {
                let elError = document.createElement("div");
                elError.classList.add("error-info");
                elError.textContent = "Ngày cấp không được nhỏ hơn ngày sinh";

                me.parentElement.append(elError);
            }
        } else {
            me.classList.remove("input__error");

            if (elErrorInfo) {
                elErrorInfo.remove();
            }
        }
    } catch (error) {
        console.log(error);
    }
}
