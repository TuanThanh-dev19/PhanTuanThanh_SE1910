# FUNewsManagementSystem - Debug Log

Tài liệu ghi lại lỗi thật trong quá trình triển khai, nguyên nhân và cách kiểm chứng sau khi sửa.

| Ngày | Milestone | Hiện tượng | Nguyên nhân | Cách sửa | Kiểm chứng |
|---|---|---|---|---|---|
| 2026-09-29 | M4 - Data layer | ESLint báo `react-hooks/set-state-in-effect` và cảnh báo dependency trong `AuthProvider` | Provider gọi `setCurrentUserId(null)` đồng bộ trong effect chỉ để xử lý session orphan; `useMemo` giữ function dependency không cần thiết | Validate user của session ngay trong state initializer, xóa effect và dùng value object trực tiếp | `npm run lint` exit code 0; `npm run build` thành công |
| 2026-09-30 | M5 - Category CRUD | Blocked-delete dialog hiển thị câu `1 news article reference it` | Chuỗi plural chỉ thêm `s` cho danh từ nhưng chưa chia động từ theo số ít | Tách cả cụm `article references` / `articles reference` theo reference count | Mở lại blocked-delete case; nội dung đúng ngữ pháp cho một hoặc nhiều News |
