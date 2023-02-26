class Table {
    Data;
    constructor() {
        this.buildTableElement();
    }
    buildTableElement() {
        // 1. Lấy tất cả các thẻ có tên là mtable
        let tables = document.getElementsByTagName("mtable")
        // 2. Duyệt từng thẻ và thực hiện build table tương ứng
        for (const table of tables) {
            let tableHTMLTemplate = `table>
                                        <thead>
                                        </thead>
                                        <tbody>
                                        </tbody>
                                    </table>`;
        }
        // 2.1 Build template html của table

        // 2.2 Bổ sung các class, id nếu có

        // 2.3 Tạo element cho table
        // 2.4 Tạo dòng tiêu đề cho table
        // 2.5 Tạo các dòng dữ liệu cho table
        // 2.6 Thay thế table cũ bằng table mới bằng js
    }
}