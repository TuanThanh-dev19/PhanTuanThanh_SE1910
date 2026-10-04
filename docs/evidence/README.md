# FUNewsManagementSystem - Evidence Index

Thư mục này lưu bằng chứng hình ảnh/video cho Assignment 01. Sinh viên tự chụp và thay trạng thái `Chưa bổ sung` sau khi kiểm tra ảnh thể hiện đúng test case.

## Quy tắc đặt tên

- Dùng PNG cho screenshot và MP4/WebM nếu giảng viên yêu cầu video.
- Ảnh phải hiển thị đủ ngữ cảnh: tên trang, dữ liệu thao tác và kết quả quan sát được.
- Không chụp hoặc công khai mock password trong bảng Users.
- Một ảnh có thể chứng minh nhiều test case nếu nội dung quan sát được rõ ràng.

## E01 - Login success/error

| File đề xuất | Test ID | Nội dung cần chụp | Trạng thái |
|---|---|---|---|
| `e01-login-empty-validation.png` | AUTH-01 | Login rỗng và hai thông báo required | Chưa bổ sung |
| `e01-login-wrong-credential.png` | AUTH-02/03 | Credential sai, vẫn ở `/login`, có thông báo lỗi | Chưa bổ sung |
| `e01-login-success.png` | AUTH-04 | Dashboard sau khi đăng nhập `Admin/Admin`, Header hiển thị Admin | Chưa bổ sung |

## E02 - CRUD và Search

| File đề xuất | Test ID | Nội dung cần chụp | Trạng thái |
|---|---|---|---|
| `e02-category-create-update.png` | CAT-05/06 | Category mới hoặc record sau Update | Chưa bổ sung |
| `e02-category-delete-confirm.png` | CAT-DELETE-CONFIRM | Confirmation và kết quả record bị xóa | Chưa bổ sung |
| `e02-category-search.png` | CAT-01/02 | Search hit hoặc no-result | Chưa bổ sung |
| `e02-news-create-update.png` | NEWS-06/08 | News sau Create/Update với Category và Status đúng | Chưa bổ sung |
| `e02-news-delete-confirm.png` | NEWS-DELETE-CONFIRM | Confirmation và kết quả News bị xóa | Chưa bổ sung |
| `e02-news-search.png` | NEWS-01/03 | Search hit hoặc no-result | Chưa bổ sung |
| `e02-user-create-update.png` | USER-06/08 | User sau Create/Update với Role và Status đúng | Chưa bổ sung |
| `e02-user-delete-confirm.png` | USER-DELETE-CONFIRM | Confirmation và kết quả User test bị xóa | Chưa bổ sung |
| `e02-user-search.png` | USER-02/03 | Search hit hoặc no-result | Chưa bổ sung |
| `e02-empty-state.png` | DATA-EMPTY-01 | Trang News với source list rỗng và empty-state message | Chưa bổ sung |

## Evidence tài liệu

| Evidence | Vị trí | Trạng thái |
|---|---|---|
| E03 - Test matrix có Actual/Pass | `../test-matrix.md` | Có |
| E04 - Debug log | `../debug-log.md` | Có |
| E05 - Component/data/state sketch | `../design.md` | Có |
| E06 - AI usage log | `../ai-usage-log.md` | Có |
| E07 - Git history | Git repository | Có |
| E08 - README | `../../README.md` | Có |

## Kiểm tra trước khi nộp

- [ ] Tất cả file E01 đã được bổ sung hoặc có demo trực tiếp theo yêu cầu giảng viên.
- [ ] Có bằng chứng cho Category, News và Users CRUD + Search.
- [ ] Có bằng chứng Delete Confirm và Empty state.
- [ ] Tên file trong bảng khớp với file thực tế.
- [ ] Screenshot không chứa thông tin ngoài phạm vi assignment.
