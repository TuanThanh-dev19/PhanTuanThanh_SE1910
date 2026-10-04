# FUNewsManagementSystem - Code Flow Guide

Tài liệu này dùng để mở đúng file và giải thích luồng theo khung: Purpose → Input → Trigger → Transform → Output.

## 1. Ranh giới trách nhiệm

```text
Route
  → Page quản lý interaction/local UI state
  → Form dialog giữ form state và gọi validator
  → DataProvider cập nhật shared data
  → storageService đồng bộ localStorage
  → React render lại UI
```

- `App.jsx`: khai báo route.
- `AuthProvider.jsx`: credential `Admin/Admin`, session, login/logout.
- `DataProvider.jsx`: shared Category/News/User state và CRUD operations.
- `*Page.jsx`: keyword, selected item, dialog, feedback và derived list.
- `*FormDialog.jsx`: controlled input, validation và normalized submit data.
- `dataOperations.js`: pure immutable array operations và delete relation guards.
- `storageService.js`: đọc/ghi localStorage và seed fallback.

## 2. Login flow

```text
Login form submit
  → validate required fields
  → AuthProvider.login(username, password)
  → compare exact Admin/Admin
  → save funews.session + set currentUserId
  → navigate /dashboard
  → ProtectedRoute cho render AdminLayout
```

Logout xóa `funews.session`, đặt current user về `null` và điều hướng tới `/login`.

## 3. Create flow

```text
Add button
  → formState = { mode: 'create', item: null }
  → dialog render form rỗng
  → submit → validator
  → Page gọi create operation từ DataContext
  → DataProvider tạo ID và append immutable
  → React render list mới
  → useEffect persist collection
```

## 4. Update flow

```text
Edit button
  → formState giữ selected item
  → dialog copy item vào local form state
  → submit → validator
  → DataProvider replace bằng map theo id
  → React render đúng record đã đổi
  → useEffect persist collection
```

`admin-account` là system account nên Edit/Delete bị chặn. Các User khác vẫn có đầy đủ CRUD.

## 5. Delete flow

```text
Delete button
  → lưu itemPendingDelete
  → ConfirmDialog
  → Cancel: đóng dialog, data không đổi
  → Confirm: kiểm tra relation/system constraint
  → filter theo id nếu hợp lệ
  → React render + persist
```

- Category đang được News tham chiếu không được xóa.
- User là system Admin hoặc đang được News tham chiếu không được xóa.

## 6. Search flow

```text
Search input onChange
  → setKeyword
  → normalize trim/lowercase
  → filter source collection trong render
  → Table nhận displayed list
```

Source collection không bị ghi đè. Clear keyword tự trả lại toàn bộ danh sách.

## 7. Reload/persistence flow

```text
Ứng dụng khởi động
  → lazy state initializer gọi loadCollection
  → JSON array hợp lệ: dùng stored collection
  → key thiếu/JSON lỗi/non-array: dùng bản copy seed data
  → DataContext cung cấp data cho Dashboard và management pages
```

## 8. File cần mở khi interview

| Câu hỏi | File chính |
|---|---|
| Login/logout/session | `LoginPage.jsx`, `AuthProvider.jsx`, `ProtectedRoute.jsx` |
| Category CRUD | `CategoriesPage.jsx`, `CategoryFormDialog.jsx`, `DataProvider.jsx` |
| News relation | `NewsPage.jsx`, `NewsFormDialog.jsx`, `seedData.js` |
| User role/system guard | `UsersPage.jsx`, `UserFormDialog.jsx`, `dataOperations.js` |
| Search | Management page tương ứng |
| Persistence | `DataProvider.jsx`, `storageService.js` |
| Navigation/layout | `App.jsx`, `AdminLayout.jsx`, `Sidebar.jsx` |
