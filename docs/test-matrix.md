# FUNewsManagementSystem - Test Matrix

## Trạng thái

Tài liệu được cập nhật theo từng milestone. Các case chưa triển khai sẽ được bổ sung khi chức năng tương ứng hoàn thành.

## Login và Authentication

| ID | Nhóm | Trường hợp | Các bước | Kết quả mong đợi | Actual | Trạng thái |
|---|---|---|---|---|---|---|
| AUTH-01 | Login | Bỏ trống cả hai field | Mở `/login`, bấm Sign in | Không login; hiển thị lỗi bắt buộc cho username và password | Hiển thị đúng hai field error; URL giữ `/login` | Pass |
| AUTH-02 | Login | Sai username hoặc sai hoa/thường | Nhập `admin` / `Admin`, bấm Sign in | Không vào Dashboard; hiển thị lỗi credential | Giữ `/login`; hiển thị `Username or password is incorrect.` | Pass |
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
| DATA-06 | Data-driven auth | Chỉ Admin baseline đăng nhập | Thử Staff hoặc User Inactive rồi thử `Admin/Admin` | Staff/Inactive bị từ chối; Admin Active đăng nhập được | Staff không thuộc credential baseline; `Admin/Admin` vào Dashboard | Pass |
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

## News CRUD và Search

| ID | Nhóm | Trường hợp | Các bước | Kết quả mong đợi | Actual | Trạng thái |
|---|---|---|---|---|---|---|
| NEWS-01 | Search | Tìm theo title | Nhập `learning` vào search | Chỉ hiển thị bài có title phù hợp | Hiển thị `Digital learning expands across universities`; 1/3 record | Pass |
| NEWS-02 | Search | Tìm theo content | Nhập `customer services` vào search | Search mở rộng sang content nhưng không đổi source list | Hiển thị `Local businesses prepare for a new quarter`; 1/3 record | Pass |
| NEWS-03 | Search | Không có kết quả và Clear | Nhập `no-such-article`, sau đó Clear search | Hiện no-result riêng; Clear trả lại full list | Hiện `No matching news`; Clear trả lại 3 records | Pass |
| NEWS-04 | Create | Bỏ trống title/content | Mở Add News Article, submit form rỗng | Không tạo; lỗi đặt gần đúng field | Hiển thị lỗi bắt buộc cho cả title và content | Pass |
| NEWS-05 | Validation | Category/status không hợp lệ | Gọi validator với ID Category giả và status ngoài 0/1 | Không chấp nhận dữ liệu phá vỡ model | Trả lỗi cho `categoryId` và `status`; không throw | Pass |
| NEWS-06 | Create | Dữ liệu hợp lệ có khoảng trắng | Tạo bài mới, chọn Education/Active | Trim dữ liệu; tạo ID duy nhất; `createdBy` là user đang login | Tăng từ 3 lên 4; title/content được trim; creator là Admin | Pass |
| NEWS-07 | Update | Prefill form | Edit bài vừa tạo | Form nạp đúng title, content, Category và Status | Bốn field được prefill đúng; hiển thị original creator Admin | Pass |
| NEWS-08 | Update | Đổi nội dung, Category và Status | Đổi title/content, chọn Technology/Inactive rồi Save | Update đúng ID; giữ nguyên `createdBy` | Row mới có Technology, Inactive và creator vẫn là Admin | Pass |
| NEWS-09 | Search + Dialog | Edit khi đang search và đóng bằng Escape | Search `showcase`, mở Edit, đổi title tạm rồi nhấn Escape | Filter vẫn đúng; dữ liệu tạm không được lưu | Còn 1/4 record; dialog đóng; title nguồn giữ nguyên | Pass |
| NEWS-10 | Persistence | Reload sau Create/Update | Reload origin test | Record mới và quan hệ đã sửa vẫn còn | Vẫn có 4 records; Technology/Admin/Inactive được giữ | Pass |
| NEWS-11 | Delete | Confirmation và Cancel | Bấm Delete bài test rồi Cancel | Tên record xuất hiện trong dialog; Cancel không xóa | Có nút `Delete Article`; sau Cancel bài vẫn tồn tại | Pass |
| NEWS-12 | Data operations | Create/Update/Delete immutable | Chạy pure operations với bản copy seed News | Trả collection mới, không mutate source; update giữ creator | Source không đổi; add = 4, delete = 3, creator vẫn `admin-account` | Pass |
| NEWS-13 | Responsive | Trang và form ở mobile/desktop | Kiểm tra 390 × 844 và 1365 × 768 | Không tràn ngang document; dialog nằm trong viewport; bảng cuộn trong vùng riêng | Document không tràn ngang; mobile dialog rộng 351/390px; desktop hiển thị đúng | Pass |

## User CRUD và Search

| ID | Nhóm | Trường hợp | Các bước | Kết quả mong đợi | Actual | Trạng thái |
|---|---|---|---|---|---|---|
| USER-01 | Read | Hiển thị User seed | Mở `/users` sau khi login | Username, Admin/Staff, Active/Inactive và ID hiển thị đúng; không lộ mock password | Ba User seed hiển thị đúng trước test Create; không có `Staff123` trong table | Pass |
| USER-02 | Search | Tìm username không phân biệt hoa/thường và khoảng trắng | Nhập ` bao ` | Chỉ hiển thị BaoTran; source list không đổi | Hiển thị 1/3 record trước test Create | Pass |
| USER-03 | Search | Không có kết quả và Clear | Nhập `no-such-user`, sau đó Clear search | Hiện no-result riêng; Clear trả lại full list | Hiện `No matching users`; Clear trả lại 4 record hiện có | Pass |
| USER-04 | Create | Bỏ trống username/password | Mở Add User và submit form rỗng | Không tạo; lỗi đặt gần đúng field | Hiển thị `Username is required.` và `Mock password is required.` | Pass |
| USER-05 | Validation | Username trùng, role/status ngoài miền | Chạy validator với `admin`, role 9 và status 3 | Trả lỗi cụ thể; không tạo dữ liệu | Duplicate, role và status đều bị từ chối | Pass |
| USER-06 | Create | Dữ liệu hợp lệ có khoảng trắng | Tạo TestUser, Staff, Active | Trim dữ liệu, tạo ID duy nhất và thêm immutable | Danh sách tăng 3 lên 4; feedback thành công | Pass |
| USER-07 | Update | Prefill form | Edit TestUser | Form nạp đúng username, mock password, role và status | Bốn field được prefill đúng | Pass |
| USER-08 | Update | Đổi username và status | Đổi thành TestUserUpdated/Inactive rồi Save | Update đúng ID; record khác giữ nguyên | Row đổi đúng username/status; ID không đổi | Pass |
| USER-09 | Delete | Confirmation và Cancel | Bấm Delete TestUserUpdated rồi Cancel | Dialog hiển thị đúng record; Cancel không xóa | Dialog có nút `Delete User`; sau Cancel record vẫn còn | Pass |
| USER-10 | Delete constraint | Xóa tài khoản đang đăng nhập | Bấm Delete Admin | Chặn xóa và giải thích lý do | Dialog chỉ có Close; không có nút confirm delete | Pass |
| USER-11 | Delete constraint | Xóa User được News tham chiếu | Bấm Delete MinhAnh | Chặn xóa và hiển thị số News tham chiếu | Dialog báo 1 News article tham chiếu MinhAnh | Pass |
| USER-12 | Data operations | Create/Update/Delete immutable | Chạy pure operations với bản copy seed Users | Trả collection mới, không mutate source; xóa theo ID | Append/update/delete pass; current/reference guards pass | Pass |
| USER-13 | Persistence | Reload sau Create/Update | Reload rồi login lại và mở Dashboard/Users | Session và User mới vẫn sử dụng được | Dashboard và Users đều hiển thị 4 records; TestUserUpdated còn dữ liệu | Pass |
| USER-14 | Responsive | Users ở viewport hẹp | Mở Users trên viewport mobile | Toolbar xếp dọc; bảng cuộn trong vùng riêng; không tràn nút | Search và Add User chiếm đủ chiều rộng; table giữ trong data panel | Pass |

## Kiểm tra kỹ thuật cho milestone

| ID | Kiểm tra | Kết quả mong đợi | Actual | Trạng thái |
|---|---|---|---|---|
| TECH-01 | `npm run lint` | Không có ESLint error | Hoàn thành, exit code 0 | Pass |
| TECH-02 | `npm run build` | Production build thành công | Vite build thành công | Pass |
| TECH-03 | Browser console | Không có error nghiêm trọng | Tab sạch sau build không có warning/error | Pass |
