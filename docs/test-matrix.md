# FUNewsManagementSystem - Test Matrix

## Trạng thái

Tài liệu được cập nhật theo từng milestone. Các case chưa triển khai sẽ được bổ sung khi chức năng tương ứng hoàn thành.

## Login và Authentication

| ID | Nhóm | Trường hợp | Các bước | Kết quả mong đợi | Actual | Trạng thái |
|---|---|---|---|---|---|---|
| AUTH-01 | Login | Bỏ trống cả hai field | Mở `/login`, bấm Sign in | Không login; hiển thị lỗi bắt buộc cho username và password | Hiển thị đúng hai field error; URL giữ `/login` | Pass |
| AUTH-02 | Login | Sai username | Nhập `Wrong` / `Admin`, bấm Sign in | Không vào Dashboard; hiển thị lỗi credential | Hiển thị `Username or password is incorrect.` | Pass |
| AUTH-03 | Login | Sai password | Nhập `Admin` / `Wrong`, bấm Sign in | Không vào Dashboard; hiển thị lỗi credential | Hiển thị `Username or password is incorrect.` | Pass |
| AUTH-04 | Login | Credential hợp lệ | Nhập `Admin` / `Admin`, bấm Sign in | Chuyển tới `/dashboard`, hiển thị current user | URL là `/dashboard`; hiển thị `Welcome, Admin` | Pass |
| AUTH-05 | Authentication | Truy cập route protected | Khi chưa login, mở trực tiếp `/dashboard` | Chuyển về `/login` | Tự động chuyển về `/login` | Pass |
| AUTH-06 | Authentication | Khôi phục session | Login thành công rồi reload `/dashboard` | Vẫn ở khu vực protected theo persistence design | Reload vẫn ở `/dashboard` và có current user | Pass |
| AUTH-07 | Authentication | Logout | Tại Dashboard bấm Log out | Xóa session và chuyển về `/login` | Chuyển về `/login`; mở lại `/dashboard` bị chặn | Pass |
| AUTH-08 | Authentication | Truy cập Login khi đã login | Login thành công rồi mở `/login` | Chuyển về `/dashboard` | Tự động chuyển về `/dashboard` | Pass |

## Kiểm tra kỹ thuật cho milestone

| ID | Kiểm tra | Kết quả mong đợi | Actual | Trạng thái |
|---|---|---|---|---|
| TECH-01 | `npm run lint` | Không có ESLint error | Hoàn thành, exit code 0 | Pass |
| TECH-02 | `npm run build` | Production build thành công | Vite build thành công | Pass |
| TECH-03 | Browser console | Không có error nghiêm trọng | Không có warning/error sau smoke test | Pass |
