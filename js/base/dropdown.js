//#region Dropdown Phòng ban
// var dropdownSelect1 = document.getElementById("txtDepartment");
// var menuDropdown1 = document.getElementById("menuDropdown1");
// var pagingArrow1 = document.getElementById("paging__arrowdown1");
// var active1 = document.getElementById("active1");
// var options1 = document.getElementsByClassName("option1");

// // Thực hiện các sự kiện thay đổi khi click vào phần mũi tên trong ô input
// active1.onclick = function () {
//     menuDropdown1.classList.toggle("hide");
//     pagingArrow1.classList.toggle("rotate");
//     active1.classList.toggle("border__arrow");
// };

// // Thực hiện các thay đổi khi click vào 1 thành phần
// for (const opt of options1) {
//     opt.onclick = function () {
//         // Thay đổi text ở dropdown select
//         dropdownSelect1.innerText = this.textContent;
//         menuDropdown1.classList.toggle("hide");
//         pagingArrow1.classList.toggle("rotate");
//     };
// }

//#endregion

//#region : Dropdown phân trang
var dropdown = document.getElementById("d-select");
var dropdownSelect = document.getElementById("dropdown__select");
var options = document.getElementsByClassName("option");
var menuDropdown = document.getElementById("menuDropdown");
var pagingArrow = document.getElementById("paging__arrowdown");
var active = document.getElementById("active");
// Thực hiện các sự kiện thay đổi khi click vào phần mũi tên trong ô input
active.onclick = function () {
    menuDropdown.classList.toggle("hide");
    pagingArrow.classList.toggle("rotate");
    active.classList.toggle("border__arrow");
    dropdown.classList.toggle("border__select");
};

// Thực hiện thay đổi khi click vào 1 thành phần
for (const opt of options) {
    opt.onclick = function () {
        dropdownSelect.innerText = this.textContent;
        menuDropdown.classList.toggle("hide");
        pagingArrow.classList.toggle("rotate");
    };
}
//#endregion
