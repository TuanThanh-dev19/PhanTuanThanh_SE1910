# FUNewsManagementSystem - Requirement Specification

## 1. Thông tin tài liệu

| Thuộc tính | Giá trị |
|---|---|
| Bài tập | SBA301 Assignment 01 - Working with ReactJS Application |
| Hệ thống | FUNewsManagementSystem |
| Project | `PhanTuanThanh_SE1910` |
| Công nghệ bắt buộc | ReactJS + Vite |
| Trạng thái | Baseline v1 - trước khi triển khai chức năng |
| Nguồn yêu cầu | Assignment 01 Student Guide do giảng viên cung cấp |

## 2. Mục tiêu

Xây dựng một Single Page Application phục vụ quản trị nội dung tin tức. Ứng dụng phải cho phép Admin đăng nhập, điều hướng giữa các khu vực quản trị và thực hiện CRUD + Search đối với Category, News và User/Account.

Sản phẩm không chỉ cần chạy được mà còn phải có bằng chứng cho việc phân tích yêu cầu, thiết kế, kiểm thử, debug, giải thích code, xử lý thay đổi nhỏ và sử dụng AI có kiểm chứng.

## 3. Giả định và điểm đã làm rõ

| ID | Nội dung | Trạng thái |
|---|---|---|
| A01 | Giảng viên không cung cấp HTML/CSS template hoặc ảnh giao diện mẫu. Sinh viên tự thiết kế giao diện quản trị. | Đã xác nhận |
| A02 | Tiêu đề môn học nhắc tới tích hợp SPA với Spring Boot, nhưng phạm vi Assignment 01 không yêu cầu Spring Boot backend, database thật hoặc JWT. | Theo assignment |
| A03 | Dữ liệu được mô phỏng và có thể lưu bằng `localStorage`. | Đã triển khai |
| A04 | Logo FUNewsManagementSystem sẽ được tạo bằng công cụ AI và lưu lại prompt/AI log. | Theo assignment |
| A05 | Tài khoản đăng nhập bắt buộc là `Admin` / `Admin`; việc phân biệt hoa thường sẽ được giữ đúng như đề. | Đã triển khai |
| A06 | Ngày nộp, định dạng nộp và yêu cầu video/screenshot cụ thể phụ thuộc thông báo của lớp. | Cần theo dõi |

## 4. Phạm vi chức năng

### 4.1 Requirement Traceability Matrix

| ID | Yêu cầu | Bằng chứng UI/code dự kiến | Tiêu chí nghiệm thu tối thiểu |
|---|---|---|---|
| R01 | Project dùng ReactJS + Vite và đúng quy ước tên | `package.json`, tên thư mục project | `npm install`, `npm run dev`, `npm run build` hoạt động |
| R02 | Có trang Login | `LoginPage`, form username/password | Controlled inputs; validate khi để trống |
| R03 | `Admin/Admin` vào được khu vực admin | Auth state, protected route | Đúng credential vào Dashboard; sai credential không được vào |
| R04 | Có logo tạo bằng AI | Asset logo và Header | Logo hiển thị đúng, không lỗi đường dẫn; có AI usage record |
| R05 | Có Header và master/admin layout dùng chung | `AdminLayout`, `Header`, `Sidebar` | Mọi trang quản trị nằm trong cùng layout; không lặp Header |
| R06 | Có menu Dashboard, Category, News, Users, Settings | Sidebar/menu config và routes | Bấm từng mục chuyển đúng nội dung, không full page reload |
| R07 | Category có CRUD + Search | Category page, form dialog, data service | Create/Read/Update/Delete/Search hoạt động đúng |
| R08 | News có CRUD + Search | News page, form dialog, data service | CRUD + Search đúng; Category relation hợp lệ |
| R09 | User/Account có CRUD + Search | Users page, form dialog, data service | CRUD + Search đúng; role hiển thị hợp lý |
| R10 | Create/Update dùng popup dialog | Modal/Dialog và form state | Create mở form rỗng; Update prefill đúng item; Cancel không thay đổi dữ liệu |
| R11 | Delete có confirmation | Confirm dialog và selected item state | Cancel không xóa; Confirm chỉ xóa đúng item đã chọn |
| R12 | Data model hợp lý | Seed data, storage/data service | ID duy nhất; role/status đúng miền; `categoryId` tham chiếu Category tồn tại |

### 4.2 Yêu cầu hỗ trợ bắt buộc

| ID | Yêu cầu | Tiêu chí nghiệm thu |
|---|---|---|
| S01 | Logout | Xóa session và đưa người dùng về Login |
| S02 | Bảo vệ trang quản trị | Truy cập route admin khi chưa login phải được chuyển về Login |
| S03 | Validation | Form không hợp lệ không được làm thay đổi source data và phải có feedback rõ ràng |
| S04 | Empty state | Danh sách rỗng không làm ứng dụng crash và có thông báo phù hợp |
| S05 | No-result state | Search không có kết quả phải hiển thị trạng thái riêng |
| S06 | Immutable update | Create/Update/Delete tạo array/object mới, không mutate React state trực tiếp |
| S07 | Persistence nhất quán | Reload giữ hoặc mất dữ liệu đúng theo quyết định thiết kế đã công bố |
| S08 | Responsive cơ bản | Layout sử dụng được trên desktop và màn hình hẹp phổ biến |

## 5. Màn hình và trách nhiệm

| Màn hình/khu vực | Trách nhiệm tối thiểu | Kết quả đầu ra |
|---|---|---|
| Login | Nhận username/password, validate, xác thực mock | Error hoặc chuyển tới Dashboard |
| Dashboard | Hiển thị tổng quan đơn giản | Số lượng Category, News, User và trạng thái dữ liệu |
| Category | Danh sách, Create, Update, Delete, Search | Danh sách Category đã lọc/cập nhật |
| News | Danh sách, Create, Update, Delete, Search, chọn Category | Danh sách News với Category và Status dễ đọc |
| Users | Danh sách, Create, Update, Delete, Search, chọn Role | Danh sách User với nhãn Admin/Staff |
| Settings | Cấu hình/profile mock tối thiểu | Thông tin hệ thống hoặc current user |
| Header | Logo, tên hệ thống, current user, Logout | Nhận diện hệ thống và thao tác đăng xuất |
| Sidebar | Hiển thị menu và active item | Điều hướng SPA giữa năm khu vực |

## 6. Data model baseline

### 6.1 Category

```js
{
  id: "category-uuid",
  name: "Technology",
  status: 1
}
```

Quy tắc:

- `id` duy nhất và không thay đổi sau khi tạo.
- `name` bắt buộc, được trim và không trùng không phân biệt hoa/thường.
- `status` chỉ nhận `1` (Active) hoặc `0` (Inactive).
- Không cho xóa Category nếu đang được News tham chiếu; UI phải giải thích lý do.

### 6.2 News

```js
{
  id: "news-uuid",
  title: "Article title",
  content: "Article content",
  categoryId: "category-uuid",
  createdBy: "user-uuid",
  status: 1
}
```

Quy tắc:

- `id` duy nhất.
- `title` và `content` bắt buộc sau khi trim.
- `categoryId` phải trỏ tới Category đang tồn tại.
- `createdBy` trỏ tới User tạo bài; UI hiển thị username tương ứng.
- `status` chỉ nhận `1` hoặc `0`.
- Search tối thiểu theo `title`; có thể mở rộng sang `content` nếu vẫn giải thích được.

### 6.3 User/Account

```js
{
  id: "user-uuid",
  username: "Admin",
  mockPassword: "Admin",
  role: 1,
  status: 1
}
```

Quy tắc:

- `id` duy nhất.
- `username` bắt buộc và không trùng không phân biệt hoa/thường.
- `mockPassword` chỉ phục vụ assignment, không phải mật khẩu production.
- `role`: `1 = Admin`, `2 = Staff`.
- `status`: `1 = Active`, `0 = Inactive`.
- Không cho sửa hoặc xóa tài khoản hệ thống `admin-account`; CRUD đầy đủ được thực hiện với các tài khoản quản lý khác.

### 6.4 Session/Auth

```js
{
  isAuthenticated: true,
  currentUserId: "user-uuid"
}
```

Quy tắc:

- Login thành công chỉ khi credential đúng và tài khoản Active.
- Logout xóa session hiện tại.
- Không lưu mật khẩu của form login trong session storage/localStorage.

## 7. Luồng chức năng

### 7.1 Login

1. Người dùng nhập username/password.
2. Submit form chạy validation rỗng.
3. Hệ thống so sánh với tài khoản mock `Admin/Admin`.
4. Thành công: tạo auth state/session và chuyển tới Dashboard.
5. Thất bại: giữ nguyên Login và hiển thị error.

### 7.2 Create

1. Bấm Add.
2. Mở dialog ở mode `create`, `selectedItem = null`, form rỗng.
3. Submit chạy validation.
4. Nếu hợp lệ: tạo ID, thêm record bằng immutable update, persist và đóng dialog.
5. Nếu không hợp lệ: giữ dialog mở và hiển thị error.

### 7.3 Update

1. Bấm Edit tại một record.
2. Lưu `selectedItem`, mở dialog mode `update` và prefill form.
3. Submit chạy validation.
4. Nếu hợp lệ: thay đúng record theo `id`, persist và đóng dialog.

### 7.4 Delete

1. Bấm Delete tại một record.
2. Lưu selected item và mở confirmation dialog.
3. Cancel: đóng dialog, source data không đổi.
4. Confirm: kiểm tra constraint quan hệ rồi xóa đúng `id` bằng immutable update.

### 7.5 Search

1. Lưu keyword riêng với source list.
2. Normalize bằng `trim().toLowerCase()`.
3. Tính displayed list từ source list, không ghi đè source list.
4. Clear keyword trả về toàn bộ danh sách.
5. CRUD trong khi đang search vẫn cập nhật source list đúng.

## 8. Validation baseline

| Form | Validation tối thiểu |
|---|---|
| Login | Username và password không rỗng; credential phải đúng |
| Category | Name không rỗng/không trùng; status thuộc 0/1 |
| News | Title/content không rỗng; Category tồn tại; status thuộc 0/1 |
| User | Username không rỗng/không trùng; mock password không rỗng; role thuộc 1/2; status thuộc 0/1 |

Thông báo lỗi phải cụ thể, đặt gần field hoặc tại vị trí dễ quan sát. Không sử dụng thông báo chung chung như "Invalid" nếu có thể nêu rõ nguyên nhân.

## 9. Yêu cầu chất lượng

- `npm run dev`, `npm run lint` và `npm run build` chạy thành công.
- Không có console error nghiêm trọng.
- Component có trách nhiệm rõ ràng, không đặt toàn bộ ứng dụng trong một file.
- List sử dụng stable key từ `id`, không dùng array index khi đã có ID.
- Nút và form sử dụng semantic HTML phù hợp.
- Dialog có title, nút đóng/cancel và trạng thái focus dễ nhận biết.
- Không commit `node_modules`, `dist`, secret hoặc đường dẫn phụ thuộc máy cá nhân.
- Người khác có thể clone repo, cài dependency và chạy theo README.

## 10. Ngoài phạm vi

- Spring Boot API hoặc database thật.
- JWT, refresh token và bảo mật production.
- Upload file thật.
- Phân quyền Staff hoàn chỉnh ngoài yêu cầu thay đổi khi đánh giá.
- Server-side search/pagination.
- Deployment production.
- Chart, dark mode, pagination hoặc tính năng nâng cao trước khi core scope hoàn thành.

Lưu ý kiến thức: "ngoài phạm vi" không có nghĩa React và Spring Boot là cùng một tầng. Trong Assignment 01, React là frontend chạy trên trình duyệt và mock data/localStorage đóng vai trò nguồn dữ liệu tạm. Nếu một assignment sau yêu cầu Spring Boot, React sẽ gọi REST API qua HTTP/JSON; Spring Boot xử lý request ở backend và thay thế mock storage làm nguồn dữ liệu chính.

## 11. Evidence cần tích lũy

| Evidence | Nội dung |
|---|---|
| E01 | Requirement Traceability Matrix này |
| E02 | Component tree, state map và design decisions |
| E03 | Ảnh Login success/error |
| E04 | Ảnh hoặc demo CRUD + Search cho ba entity |
| E05 | Test matrix có Expected, Actual, Pass/Fail |
| E06 | 2-3 debug log từ lỗi thật, có fix và retest |
| E07 | AI usage log, bao gồm prompt tạo logo |
| E08 | Git history theo milestone |
| E09 | README hoàn chỉnh và kiểm tra chạy lại từ môi trường sạch |

## 12. Câu hỏi cần xác nhận trước khi nộp

- Deadline chính xác và nơi nộp bài.
- Có yêu cầu nộp file ZIP ngoài GitHub hay không.
- Screenshot/video có bắt buộc hay chỉ dùng khi demo.
- AI usage log cần nộp thành file riêng hay đặt trong README/docs.
- Giảng viên có quy định thư viện UI/router cụ thể hay không.
