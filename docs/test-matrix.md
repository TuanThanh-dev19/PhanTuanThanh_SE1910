# FUNewsManagementSystem - Test Matrix

## Trạng thái

Tài liệu được cập nhật theo từng milestone. Các case chưa triển khai sẽ được bổ sung khi chức năng tương ứng hoàn thành.

## Login và Authentication

| ID | Nhóm | Trường hợp | Các bước | Kết quả mong đợi | Actual | Trạng thái |
|---|---|---|---|---|---|---|
| AUTH-01 | Login | Bỏ trống cả hai field | Mở `/login`, bấm Sign in | Không login; hiển thị lỗi bắt buộc cho username và password | Hiển thị đúng hai field error; URL giữ `/login` | Pass |
| AUTH-02 | Login | Sai username | Nhập `Wrong` / `Admin`, bấm Sign in | Không vào Dashboard; hiển thị lỗi credential | Hiển thị `Username or password is incorrect.` | Pass |
| AUTH-03 | Login | Sai password | Nhập `Admin` / `Wrong`, bấm Sign in | Không vào Dashboard; hiển thị lỗi credential | Hiển thị `Username or password is incorrect.` | Pass |
| AUTH-04 | Login | Credential hợp lệ | Nhập `Admin` / `Admin`, bấm Sign in | Chuyển tới `/dashboard`, hiển thị current user | URL là `/dashboard`; Header hiển thị `System Administrator` và role `Admin` | Pass |
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

## Kiểm tra kỹ thuật cho milestone

| ID | Kiểm tra | Kết quả mong đợi | Actual | Trạng thái |
|---|---|---|---|---|
| TECH-01 | `npm run lint` | Không có ESLint error | Hoàn thành, exit code 0 | Pass |
| TECH-02 | `npm run build` | Production build thành công | Vite build thành công | Pass |
| TECH-03 | Browser console | Không có error nghiêm trọng | Tab sạch sau build không có warning/error | Pass |
