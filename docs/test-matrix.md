# FUNewsManagementSystem - Test Matrix

## Trạng thái

Tài liệu được cập nhật theo từng milestone. Các case chưa triển khai sẽ được bổ sung khi chức năng tương ứng hoàn thành.

## Login và Authentication

| ID | Nhóm | Trường hợp | Các bước | Kết quả mong đợi | Actual | Trạng thái |
|---|---|---|---|---|---|---|
| AUTH-01 | Login | Bỏ trống cả hai field | Mở `/login`, bấm Sign in | Không login; hiển thị lỗi bắt buộc cho username và password | Hiển thị đúng hai field error; URL giữ `/login` | Pass |
| AUTH-02 | Login | Sai username | Nhập `Wrong` / `Admin`, bấm Sign in | Không vào Dashboard; hiển thị lỗi credential | Hiển thị `Username or password is incorrect.` | Pass |
| AUTH-03 | Login | Sai password | Nhập `Admin` / `Wrong`, bấm Sign in | Không vào Dashboard; hiển thị lỗi credential | Hiển thị `Username or password is incorrect.` | Pass |
| AUTH-04 | Login | Credential hợp lệ | Nhập `Admin` / `Admin`, bấm Sign in | Chuyển tới `/dashboard`, hiển thị current user | URL là `/dashboard`; Header hiển thị username `Admin` và role `Admin` | Pass |
| AUTH-05 | Authentication | Truy cập route protected | Khi chưa login, mở trực tiếp `/dashboard` | Chuyển về `/login` | Tự động chuyển về `/login` | Pass |
| AUTH-06 | Authentication | Khôi phục session | Login thành công rồi reload `/dashboard` | Vẫn ở khu vực protected theo persistence design | Reload vẫn ở `/dashboard` và có current user | Pass |
| AUTH-07 | Authentication | Logout | Tại Dashboard bấm Log out | Xóa session và chuyển về `/login` | Chuyển về `/login`; mở lại `/dashboard` bị chặn | Pass |
| AUTH-08 | Authentication | Truy cập Login khi đã login | Login thành công rồi mở `/login` | Chuyển về `/dashboard` | Tự động chuyển về `/dashboard` | Pass |

## Admin Layout và Navigation

| ID | Nhóm | Trường hợp | Các bước | Kết quả mong đợi | Actual | Trạng thái |
|---|---|---|---|---|---|---|
| LAYOUT-01 | Master layout | Header và Sidebar dùng chung | Mở lần lượt năm trang quản trị | Header, Sidebar và vùng content xuất hiện nhất quán; không lặp code layout ở page | Cả năm route render qua `AdminLayout` và `Outlet` | Pass |
| LAYOUT-02 | Logo AI | Logo trên Login và admin layout | Mở `/login`, login, quan sát Header/Sidebar | Logo tải đúng, không vỡ ảnh hoặc lỗi đường dẫn | Logo hiển thị đúng trên Login, Header và Sidebar | Pass |
| NAV-01 | Menu | Đủ năm mục theo đề | Quan sát Sidebar | Có Dashboard, Category, News, Users, Settings | Đủ và đúng thứ tự năm mục | Pass |
| NAV-02 | Routing | Điều hướng từng menu | Bấm lần lượt năm mục | URL và heading đổi đúng, không reload toàn trang | `/dashboard`, `/categories`, `/news`, `/users`, `/settings` đều hiển thị đúng page | Pass |
| NAV-03 | Active state | Highlight route hiện tại | Điều hướng qua từng page | Chỉ item hiện tại có active style | Active item cập nhật đúng theo `NavLink` | Pass |
| NAV-04 | Browser history | Back/Forward | Từ Dashboard sang Settings, bấm Back rồi Forward | Quay lại đúng page và active item | Back về Dashboard; Forward tới Settings | Pass |
| NAV-05 | Protected route | Mở URL con khi chưa login | Logout rồi mở trực tiếp `/news` | Chuyển về `/login` | URL chuyển về `/login`; form login hiển thị | Pass |
| NAV-06 | Responsive | Mở/đóng menu ở viewport hẹp | Dùng viewport 390 × 844; mở menu rồi bấm backdrop | Sidebar trượt vào/ra; backdrop và `aria-expanded` đúng | Open: sidebar/backdrop hiện, `aria-expanded=true`; Close: đều trở về trạng thái đóng | Pass |
| NAV-07 | Logout | Logout từ page con | Tại `/settings`, bấm Log out | Xóa session và chuyển tới `/login` | Chuyển đúng về `/login`; route protected tiếp tục bị chặn | Pass |

## Seed Data, Storage và Read

| ID | Nhóm | Trường hợp | Các bước | Kết quả mong đợi | Actual | Trạng thái |
|---|---|---|---|---|---|---|
| DATA-01 | Seed data | Hydrate dữ liệu lần đầu | Login và mở Dashboard | Hiển thị đúng tổng Category, News, User | Dashboard hiển thị lần lượt 4, 3, 3 records | Pass |
| DATA-02 | Category Read | Hiển thị Category | Mở `/categories` | Stable key, tên và Active/Inactive đúng | 4 dòng: Business, Education, Technology, Lifestyle; 3 Active và 1 Inactive | Pass |
| DATA-03 | News Read | Resolve quan hệ | Mở `/news` | `categoryId` và `createdBy` được đổi thành tên dễ đọc | Ba dòng resolve đúng Technology/Education/Business và Admin/MinhAnh | Pass |
| DATA-04 | User Read | Hiển thị role/status an toàn | Mở `/users` | Admin/Staff và Active/Inactive đúng; không render mock password | 3 user đúng role; `Staff123` không xuất hiện trong page text | Pass |
| DATA-05 | Persistence | Reload sau khi hydrate | Reload Dashboard | Session và ba collection vẫn sử dụng được | Vẫn ở `/dashboard`; các count giữ 4, 3, 3 | Pass |
| DATA-06 | Data-driven auth | Login bằng User source | Thử user Inactive rồi thử `Admin/Admin` | Inactive bị từ chối; Admin Active đăng nhập được | `BaoTran/Staff123` bị từ chối; `Admin/Admin` vào Dashboard | Pass |
| DATA-07 | Invalid storage | JSON hoặc collection không hợp lệ | Chạy kiểm tra storage service với mock localStorage | Không throw; trả về bản copy seed data | Invalid JSON và invalid record đều fallback về seed | Pass |

## Category CRUD và Search

| ID | Nhóm | Trường hợp | Các bước | Kết quả mong đợi | Actual | Trạng thái |
|---|---|---|---|---|---|---|
| CAT-01 | Search | Tìm không phân biệt hoa/thường | Nhập `tech` vào search | Chỉ hiển thị Category phù hợp; source list không đổi | Hiển thị Technology; summary `1 of 4 records` | Pass |
| CAT-02 | Search | Không có kết quả và Clear | Nhập `not-found`, sau đó Clear search | Hiện no-result riêng; Clear trả lại full list | Hiện `No matching categories`; Clear trả lại 4 dòng | Pass |
| CAT-03 | Create | Tên rỗng | Mở Add Category, submit form rỗng | Không tạo; lỗi đặt gần field name | Hiển thị `Category name is required.` | Pass |
| CAT-04 | Create | Tên trùng khác hoa/thường | Nhập `technology` có khoảng trắng | Không tạo record trùng | Hiển thị `Category name already exists.` | Pass |
| CAT-05 | Create | Dữ liệu hợp lệ | Nhập `Culture`, status Active | Trim và thêm immutable với ID duy nhất | List tăng từ 4 lên 5; feedback thành công | Pass |
| CAT-06 | Update | Prefill và đổi dữ liệu | Edit Culture, đổi thành `Arts & Culture`, chọn Inactive | Đúng record được thay; ID giữ nguyên | Tên/status cập nhật đúng, các record khác giữ nguyên | Pass |
| CAT-07 | Update | Tên trùng | Đổi Category đang edit thành `Business` | Không lưu; form vẫn mở | Hiển thị lỗi duplicate | Pass |
| CAT-08 | Search + Update | CRUD khi đang search | Search `arts`, edit thành `Culture & Arts` | Cập nhật source đúng theo ID; filtered list được tính lại | Vẫn hiển thị 1/5 và tên mới | Pass |
| CAT-09 | Delete | Category đang được News dùng | Bấm Delete Technology | Chặn xóa và giải thích số News tham chiếu | Dialog báo 1 News article; không có nút confirm delete | Pass |
| CAT-10 | Delete | Cancel confirmation | Bấm Delete Lifestyle rồi Cancel | Dialog đóng, dữ liệu không đổi | Lifestyle vẫn xuất hiện | Pass |
| CAT-11 | Delete | Category không được tham chiếu | Chạy pure operation với bản copy Category test | Trả list mới, không mutate source | `success=true`; bản copy giảm 5 xuống 4, source seed vẫn 4 | Pass |
| CAT-12 | Persistence | Reload sau Create/Update | Reload origin test | Record mới và dữ liệu cập nhật vẫn còn | Vẫn có 5 records và `Arts & Culture` | Pass |
| CAT-13 | Dialog | Đóng bằng Escape | Mở Edit, thay tạm tên rồi nhấn Escape | Dialog đóng, không lưu dữ liệu tạm | Dialog count về 0; tên nguồn không đổi | Pass |

## Kiểm tra kỹ thuật cho milestone

| ID | Kiểm tra | Kết quả mong đợi | Actual | Trạng thái |
|---|---|---|---|---|
| TECH-01 | `npm run lint` | Không có ESLint error | Hoàn thành, exit code 0 | Pass |
| TECH-02 | `npm run build` | Production build thành công | Vite build thành công | Pass |
| TECH-03 | Browser console | Không có error nghiêm trọng | Tab sạch sau build không có warning/error | Pass |
