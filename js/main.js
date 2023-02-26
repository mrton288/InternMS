// Show - hidden edit option

var editOption = document.getElementById("edit__option");
var targetEdit = document.querySelectorAll(".edit__arrowdown").forEach((el) =>
    el.addEventListener("click", function Hide() {
        editOption.classList.toggle("hide");
        el.classList.toggle("edit__arrowdown-border");

        if (!editOption.classList.contains("hide")) {
            document.addEventListener("click", function (e) {
                editOption.classList.add("hide");
            });
        }

        // Lấy ra vị trí của phần tử
        var coords = el.getBoundingClientRect();
        editOption.style.left = coords.left + 35 + "px";
        if (coords.top > 600) {
            editOption.style.top = coords.top - 90 + "px";
        } else {
            editOption.style.top = coords.bottom + 2 + "px";
        }
    })
);

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
                // Set màu cho các hàng khi checkall = true
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

// Hiển thị form sửa thông tin khi click vào chữ sửa
