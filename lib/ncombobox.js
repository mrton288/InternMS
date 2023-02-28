class Combobox {
    Data;
    constructor() {
        this.buildComboboxHTML();
    }

    async buildComboboxHTML() {
        // Lấy tất cả các thẻ có tên là ncombobox
        let comboboxs = document.querySelectorAll("ncombobox");

        // Duyệt từng thẻ và thực hiện build combobox tương ứng
        for (const combobox of comboboxs) {
            // Lấy ra api
            const api = combobox.getAttribute("api");
            this.Data = await this.loadData(api);

            // Lấy ra id, class của phần tử
            const idCombobox = combobox.id;
            const classCombobox = combobox.getAttribute("class");

            // Build template html của combobox
            let comboboxHTMLTemplate = `<inputcbx></inputcbx>
                                        <datacbx></datacbx>
                                        <buttoncbx>
                                        <img src="/assets/img/downarrow.png" id="paging__arrowdown1" />
                                        </buttoncbx>`;
            // 2.2 Bổ sung các class, id nếu có:
            // 2.3 Tạo element cho combobox
            // Thêm class hoặc attribute cho element nếu có
            let comboboxHTMLNew = document.createElement("div");
            comboboxHTMLNew.setAttribute("id", idCombobox);
            comboboxHTMLNew.setAttribute("class", classCombobox || "");
            comboboxHTMLNew.innerHTML = comboboxHTMLTemplate;

            console.log(comboboxHTMLNew);
            // Tạo element input

            let inputCombobox = comboboxHTMLNew.querySelector("inputcbx");
            inputCombobox.setAttribute("id", combobox.querySelector("inputcbx").getAttribute("id"));
            // inputCombobox.addEventListener("keydown", this.inputOnKeyDown.bind(this));

            // Tạo element button
            let buttonCombobx = comboboxHTMLNew.querySelector("buttoncbx");
            buttonCombobx.setAttribute("class", combobox.querySelector("buttoncbx").getAttribute("class"));
            buttonCombobx.setAttribute("id", combobox.querySelector("buttoncbx").getAttribute("id"));

            // buttonCombobx.addEventListener("click", this.buttonOnClick.bind(this));

            let dataCombobox = comboboxHTMLNew.querySelector("datacbx");
            dataCombobox.setAttribute("class", combobox.querySelector("datacbx").getAttribute("class"));
            dataCombobox.setAttribute("id", combobox.querySelector("datacbx").getAttribute("id"));

            // const optionsElement = comboboxHTMLNew.querySelector(".menuDd1");
            // const inputSelected = comboboxHTMLNew.querySelector("input");
            this.builDataCombobox(dataCombobox, inputCombobox);

            // Thêm các sự kiện cần thiết
            // sự kiện click vào nút mũi tên
            buttonCombobx.onclick = () => {
                dataCombobox.classList.toggle("hide");
                comboboxHTMLNew.querySelector("img").classList.toggle("rotate");
            };
            // sự kiện focus cho thẻ input
            inputCombobox.onfocus = () => {
                dataCombobox.classList.remove("hide");
            };

            // Lấy template đính vào form combobox mới
            combobox.replaceWith(comboboxHTMLNew);
        }
        // 1. Tạo elemet template html của combobox
    }

    // Sự kiện chọn item khi click chuột vào item
    itemOnClick() {
        const combobox = this.closest(".combobox");
        const comboboxInput = combobox.querySelector(".combobox-input");
        const comboboxData = combobox.querySelector(".combobox-data");
        const selectedItem = this.innerText;

        // Cập nhật giá trị của input
        comboboxInput.value = selectedItem;

        // Ẩn danh sách item
        comboboxData.style.display = "none";

        // Đặt thuộc tính data-expanded của combobox thành "false"
        combobox.setAttribute("data-expanded", "false");
    }

    /**
     * sự kiện nhấn vào button trong combobox thì hiển thị danh sách các item
     */
    buttonOnClick() {
        // Xác định vị trí của combobox-data để hiển thị danh sách item.
        // Nếu combobox-data hiện đang được ẩn đi, thì hiển thị combobox-data và đặt giá trị cho thuộc tính data-expanded của combobox là "true".
        // Ngược lại, nếu combobox-data đang hiển thị, thì ẩn đi nó và đặt giá trị cho thuộc tính data-expanded của combobox là "false".
        const combobox = this.closest(".combobox");
        const comboboxData = combobox.querySelector(".combobox-data");
        const isExpanded = combobox.getAttribute("data-expanded") === "true";

        if (!isExpanded) {
            // Hiển thị danh sách item
            comboboxData.style.display = "block";
            combobox.setAttribute("data-expanded", "true");
        } else {
            // Ẩn danh sách item
            comboboxData.style.display = "none";
            combobox.setAttribute("data-expanded", "false");
        }
    }

    builDataCombobox(dataCombobox, inputCombobox) {
        // Lấy các item của combobox
        // Duyệt từng đối tượng để build ra dữ liệu tương ứng
        try {
            const uniqueValues = new Set(); // đối tượng Set để lưu trữ các giá trị duy nhất
            // Duyệt tìm xem item có model nam là DepartmentName
            // Đọc dòng dữ liệu trong data và gán cho các element "li"
            for (const item of this.Data) {
                let liElement = document.createElement("li");
                // Dùng để kiểm tra trong danh sách đã có departmentName đó chưa
                // nếu chưa có thì add vào danh sách
                if (!uniqueValues.has(item.DepartmentName)) {
                    liElement.textContent = item.DepartmentName;
                    uniqueValues.add(item.DepartmentName); // Thêm giá trị của item vào uniqueValues
                    // Duyệt qua từng đối tượng
                    dataCombobox.append(liElement);
                }
                liElement.classList.add("option1");
                liElement.onclick = () => {
                    inputCombobox.textContent = item.DepartmentName;
                    dataCombobox.classList.add("hide");
                };
            }
        } catch (error) {
            console.log(error);
        }
    }

    inputOnKeyDown(event) {
        const comboboxDataHTML = this.comboboxElement.querySelector(".combobox-data");
        const selectedItem = comboboxDataHTML.querySelector(".selected");
        if (event.keyCode === 40) {
            // Down arrow key
            if (selectedItem) {
                const nextItem = selectedItem.nextElementSibling;
                if (nextItem) {
                    selectedItem.classList.remove("selected");
                    nextItem.classList.add("selected");
                }
            } else {
                const firstItem = comboboxDataHTML.querySelector(".combobox-item");
                if (firstItem) {
                    firstItem.classList.add("selected");
                }
            }
        } else if (event.keyCode === 38) {
            // Up arrow key
            if (selectedItem) {
                const prevItem = selectedItem.previousElementSibling;
                if (prevItem) {
                    selectedItem.classList.remove("selected");
                    prevItem.classList.add("selected");
                } else {
                    selectedItem.classList.remove("selected");
                }
            }
        } else if (event.keyCode === 13) {
            // Enter key
            if (selectedItem) {
                this.inputElement.value = selectedItem.textContent;
                comboboxDataHTML.innerHTML = "";
            }
        } else if (event.keyCode === 9) {
        }
    }

    // Hàm lấy dữ liệu từ api
    async loadData(api) {
        var res = await fetch(api);
        var resJson = await res.json();
        return resJson;
    }
}
export default Combobox;
