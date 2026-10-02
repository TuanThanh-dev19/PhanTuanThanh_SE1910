# FUNewsManagementSystem - Solution Design

## 1. Mục tiêu thiết kế

Thiết kế một ứng dụng quản trị tin tức đơn giản, rõ luồng dữ liệu và dễ giải thích trong buổi đánh giá. Kiến trúc ưu tiên core requirements, khả năng kiểm thử và khả năng thay mock storage bằng API sau này; không tối ưu quá mức hoặc phụ thuộc thư viện UI phức tạp.

## 2. Định hướng giao diện

Giao diện được thiết kế theo hướng admin dashboard:

- Nền nội dung sáng, sidebar xanh đậm, màu nhấn xanh dương.
- Header hiển thị logo, tên hệ thống, current user và Logout.
- Desktop: sidebar cố định bên trái, content bên phải.
- Màn hình hẹp: sidebar thu gọn hoặc mở bằng menu button.
- Table dùng cho Category, News và Users.
- Nút Add và Search đặt ở toolbar phía trên table.
- Create/Update dùng modal trung tâm.
- Delete dùng confirm dialog riêng, thể hiện rõ record sắp xóa.
- Active/Inactive và Admin/Staff hiển thị bằng badge có cả chữ, không chỉ dùng màu.

### 2.1 Wireframe mức khái niệm

```text
+------------------------------------------------------------------+
| Logo | FUNews Management                     Admin | Logout       |
+------------------+-----------------------------------------------+
| Dashboard        | Page title                                    |
| Category         | [Search........................] [Add new]     |
| News             |                                               |
| Users            | +-------------------------------------------+ |
| Settings         | | Data table / Empty state / Search result  | |
|                  | | Actions: Edit | Delete                    | |
|                  | +-------------------------------------------+ |
+------------------+-----------------------------------------------+
```

## 3. Kiến trúc tổng thể

```text
User event
    |
    v
UI Pages/Components
    |
    v
AuthContext / DataContext / SettingsContext
    |
    v
Storage Service
    |
    v
localStorage / seedData
```

- Page chịu trách nhiệm ghép UI và xử lý interaction của từng feature.
- Common components cung cấp Modal, ConfirmDialog, SearchBar và badge.
- Context giữ auth/shared data và expose các operation rõ tên.
- Storage service là điểm duy nhất trực tiếp đọc/ghi `localStorage`.
- Seed data dùng cho lần chạy đầu tiên hoặc thao tác reset demo.

Kiến trúc này cho phép thay `storageService` bằng API service mà không phải viết lại toàn bộ UI.

## 4. Component tree

```text
main.jsx
└─ StrictMode
   └─ BrowserRouter
      └─ DataProvider
         └─ AuthProvider
            └─ SettingsProvider
               └─ App
                  └─ AppRoutes
                     ├─ LoginPage
                     └─ ProtectedRoute
                        └─ AdminLayout
                           ├─ Header
                           │  ├─ BrandLogo
                           │  └─ UserMenu / LogoutButton
                           ├─ Sidebar
                           │  └─ NavigationItem[]
                           └─ Outlet
                              ├─ DashboardPage
                              │  └─ SummaryCard[]
                              ├─ CategoriesPage
                              │  ├─ ManagementToolbar
                              │  ├─ CategoryTable
                              │  ├─ CategoryFormDialog
                              │  └─ ConfirmDialog
                              ├─ NewsPage
                              │  ├─ ManagementToolbar
                              │  ├─ NewsTable
                              │  ├─ NewsFormDialog
                              │  └─ ConfirmDialog
                              ├─ UsersPage
                              │  ├─ ManagementToolbar
                              │  ├─ UserTable
                              │  ├─ UserFormDialog
                              │  └─ ConfirmDialog
                              └─ SettingsPage
```

Provider phải bao bọc component cần đọc Context. `DataProvider` được đặt ngoài `AuthProvider` để auth có thể tra cứu tài khoản mock từ nguồn Users mà không tạo dependency vòng. `SettingsProvider` bao bọc App để Header và SettingsPage dùng chung profile. `BrowserRouter` bao bọc toàn bộ nhánh cần dùng route hooks/components.

Không bắt buộc trừu tượng hóa `ManagementToolbar` hoặc `DataTable` ngay từ đầu. Chỉ tách thành component dùng chung sau khi Category flow chạy ổn và nhận thấy API thực sự giống nhau.

## 5. Cấu trúc thư mục dự kiến

```text
src/
├─ assets/
│  └─ funews-logo.*
├─ components/
│  ├─ common/
│  │  ├─ ConfirmDialog.jsx
│  │  ├─ EmptyState.jsx
│  │  ├─ Modal.jsx
│  │  ├─ SearchBar.jsx
│  │  └─ StatusBadge.jsx
│  └─ layout/
│     ├─ Header.jsx
│     └─ Sidebar.jsx
├─ context/
│  ├─ AuthContext.jsx
│  └─ DataContext.jsx
├─ data/
│  └─ seedData.js
├─ layouts/
│  └─ AdminLayout.jsx
├─ pages/
│  ├─ CategoriesPage.jsx
│  ├─ DashboardPage.jsx
│  ├─ LoginPage.jsx
│  ├─ NewsPage.jsx
│  ├─ SettingsPage.jsx
│  └─ UsersPage.jsx
├─ routes/
│  ├─ AppRoutes.jsx
│  └─ ProtectedRoute.jsx
├─ services/
│  └─ storageService.js
├─ styles/
│  ├─ components.css
│  ├─ layout.css
│  └─ tokens.css
├─ utils/
│  ├─ constants.js
│  ├─ id.js
│  └─ validators.js
├─ App.jsx
├─ index.css
└─ main.jsx

docs/
├─ design.md
├─ requirements.md
├─ test-matrix.md          # tạo ở milestone testing
├─ debug-log.md            # ghi lỗi thật trong quá trình làm
└─ ai-usage-log.md         # ghi ngay khi dùng AI
```

## 6. Routing

| Path | Component | Quyền truy cập |
|---|---|---|
| `/login` | `LoginPage` | Public; đã login thì chuyển Dashboard |
| `/` | Redirect | Chuyển tới Login hoặc Dashboard theo auth state |
| `/dashboard` | `DashboardPage` | Protected |
| `/categories` | `CategoriesPage` | Protected |
| `/news` | `NewsPage` | Protected |
| `/users` | `UsersPage` | Protected |
| `/settings` | `SettingsPage` | Protected |
| `*` | Not found/redirect | Chuyển về route hợp lệ |

Navigation dùng React Router để URL phản ánh màn hình hiện tại, active menu đồng bộ với route và có thể kiểm thử back/forward/direct URL.

## 7. State ownership

| State | Owner | Lý do |
|---|---|---|
| `isAuthenticated`, `currentUser` | `AuthContext` | Chi phối route, Header và Logout |
| `categories`, `news`, `users` | `DataContext` | Nhiều page/Dashboard cần đọc dữ liệu |
| `displayName`, `email` | `SettingsContext` | SettingsPage chỉnh sửa và Header hiển thị cùng một profile |
| `keyword` | Management page tương ứng | Chỉ phục vụ search của page đó |
| `isFormOpen`, `formMode` | Management page | Điều khiển dialog Create/Update |
| `selectedItem` | Management page | Dùng cho Update/Delete |
| `formData`, `formErrors` | Form dialog | Gắn với vòng đời form |
| Mobile sidebar open/close | `AdminLayout` | Chỉ liên quan layout |

Nguyên tắc:

- Không đưa mọi state lên Context.
- State chỉ dùng trong một component được giữ local.
- Displayed list được tính từ source list + keyword, không lưu thành source state thứ hai.
- Không mutate item nhận qua props; form tạo một bản copy riêng.

## 8. Persistence và storage

### 8.1 Storage keys

```text
funews.categories
funews.news
funews.users
funews.session
funews.settings
```

### 8.2 Hydration flow

1. Provider gọi storage service khi khởi tạo.
2. Nếu key chưa tồn tại hoặc dữ liệu không hợp lệ, dùng seed data.
3. CRUD update React state trước/song song với việc persist bản mới.
4. Reload hydrate lại từ storage.
5. Settings có thể cung cấp thao tác reset demo data nếu cần, kèm confirmation.

Storage service phải xử lý `JSON.parse` lỗi và không để dữ liệu hỏng làm ứng dụng crash.

### 8.3 Settings flow

```text
Settings form → validate display name/email → Save
              → SettingsContext update → Header re-render
              → persist funews.settings → reload vẫn giữ cấu hình
```

- `username` và `role` chỉ đọc vì thuộc phạm vi quản lý tài khoản.
- `displayName` là thông tin trình bày của phiên quản trị và xuất hiện trên Header.
- Dữ liệu Settings sai schema hoặc JSON hỏng sẽ fallback về mặc định.

## 9. Authentication design

- Login form dùng controlled inputs.
- Validate empty trước khi xác thực.
- Credential baseline: `Admin` / `Admin`, phân biệt hoa thường.
- Staff là dữ liệu quản lý theo core scope và không đăng nhập; phân quyền Staff chỉ thực hiện nếu có modification task.
- Khi thành công, lưu `currentUserId`; UI lấy user từ users source data.
- `ProtectedRoute` kiểm tra auth state trước khi render AdminLayout.
- Logout xóa session và chuyển về `/login`.
- Đây là mock authentication cho assignment; README phải ghi rõ không phải cơ chế production.

## 10. CRUD dialog design

State đề xuất tại management page:

```js
{
  isFormOpen: false,
  formMode: "create", // "create" | "update"
  selectedItem: null,
  isDeleteOpen: false
}
```

### Create

```text
Add → formMode=create → selectedItem=null → empty form
    → validate → create immutable → persist → close/reset
```

### Update

```text
Edit(item) → formMode=update → selectedItem=item → prefill copy
           → validate → replace by id → persist → close/reset
```

### Delete

```text
Delete(item) → selectedItem=item → confirmation
             → Cancel: close/reset
             → Confirm: validate relations → filter by id → persist
```

Modal chỉ quản lý presentation/focus/close behavior. Validation và mutation operation vẫn có tên rõ ràng theo từng entity để dễ giải thích, không xây một generic CRUD engine khó đọc.

## 11. Search design

```js
const normalizedKeyword = keyword.trim().toLowerCase()
const displayedItems = sourceItems.filter(/* entity fields */)
```

| Entity | Field search tối thiểu |
|---|---|
| Category | `name` |
| News | `title`, có thể thêm `content` |
| User | `username` |

Yêu cầu:

- Search không thay đổi source data.
- Clear keyword trả lại full list.
- Xử lý an toàn field null/undefined.
- Create/Update/Delete khi đang search phải tác động source data theo `id`.
- No-result state khác với empty source state.

## 12. Quan hệ và delete policy

| Thao tác | Policy |
|---|---|
| Xóa Category đang có News | Chặn xóa; thông báo số News đang sử dụng Category |
| Xóa User đang đăng nhập | Chặn xóa để session không trở thành orphan |
| Xóa User được News tham chiếu | Chặn xóa ở baseline; có thể đổi sang giữ snapshot username nếu requirement đổi |
| Chọn Category cho News | Chỉ cho chọn Category tồn tại; có thể hiển thị cả Active/Inactive nhưng trạng thái phải rõ |

Policy chặn xóa giúp giữ referential integrity và dễ chứng minh hơn cascade delete hoặc tự động đổi relation.

## 13. Validation strategy

- Validation chạy khi submit; field đã tương tác có thể validate thêm khi blur.
- Error được lưu theo field, ví dụ `{ name: "Category name is required" }`.
- Trim text trước khi kiểm tra rỗng/trùng.
- Kiểm tra unique trên toàn bộ source list; khi Update phải loại chính record đang sửa theo `id`.
- Không đóng dialog nếu validation thất bại.
- Không dùng browser alert cho validation form; alert/confirm native chỉ dùng tạm nếu chưa có dialog, sau đó thay bằng UI nhất quán.

## 14. Styling, responsive và accessibility

- Dùng CSS thuần và design tokens; chưa cần thư viện UI.
- Breakpoint dự kiến: desktop/tablet/mobile, điều chỉnh sau khi kiểm tra UI thật.
- Table trên màn hình hẹp có thể scroll ngang; các action vẫn truy cập được.
- Input có `label` liên kết bằng `htmlFor`/`id`.
- Button có `type` rõ ràng.
- Dialog có heading, close/cancel button và Escape behavior nếu triển khai an toàn.
- Màu status luôn kèm text/icon; không truyền đạt thông tin chỉ bằng màu.
- Focus state phải nhìn thấy được.
- Logo có alt text phù hợp.

## 15. Design Decision Record

| ID | Quyết định | Lý do | Trade-off / ảnh hưởng khi đổi yêu cầu |
|---|---|---|---|
| D01 | Dùng React Router | URL rõ, protected route, active menu và back/forward dễ kiểm thử | Thêm dependency và route configuration |
| D02 | Auth trong `AuthContext` | Header, route và Login cùng cần auth state | Nếu thêm backend phải đổi login/service nhưng UI ít thay đổi |
| D03 | Shared entity data trong `DataContext` | Dashboard và nhiều page cần cùng source data | Context lớn có thể re-render nhiều; scope hiện tại vẫn nhỏ |
| D04 | Persistence qua storage service | Tách browser storage khỏi UI và tạo đường thay bằng API | Phải xử lý parse/schema lỗi; localStorage không phải database |
| D05 | Một form dialog cho Create/Update của từng entity | Giảm lặp form và thể hiện rõ `mode/selectedItem` | Không dùng một generic form cho cả ba entity để tránh khó đọc |
| D06 | Search là derived data | Không phá source list; clear/search/CRUD nhất quán | Với API thật sẽ chuyển sang query/server state |
| D07 | Chặn xóa khi có relation | Giữ dữ liệu hợp lệ và dễ giải thích | Người dùng phải xử lý News/User liên quan trước |
| D08 | CSS thuần, không dùng UI framework | Ít dependency, dễ chứng minh code tự viết | Tốn công styling và accessibility dialog hơn |
| D09 | ID bằng `crypto.randomUUID()` khi khả dụng | Unique và không phụ thuộc index/độ dài mảng | Có thể cần fallback nếu môi trường cũ |
| D10 | Triển khai Category hoàn chỉnh trước | Tạo pattern CRUD đã kiểm chứng rồi áp dụng cho News/User | Tránh trừu tượng hóa sớm; có thể refactor sau |
| D11 | Settings dùng Context riêng | Header và SettingsPage cần cùng profile mà không trộn với entity data | Thêm một Provider nhỏ nhưng luồng state rõ và dễ thay bằng API sau này |

## 16. Milestone triển khai

| Mốc | Nội dung | Gate đạt | Evidence/commit dự kiến |
|---|---|---|---|
| M0 | Requirements + design | Hai tài liệu baseline được review | `docs: add requirement and design baseline` |
| M1 | Dọn Vite default, tạo styles/layout shell | App chạy, layout responsive cơ bản | Screenshot UI shell |
| M2 | Login + auth + protected route | Test empty/wrong/correct/logout/direct URL | Login evidence |
| M3 | Header/logo/sidebar/navigation | Đủ năm menu, active route đúng | Admin layout screenshot + AI logo log |
| M4 | Seed data + storage service + Read | Ba list hiển thị đúng, relation hợp lệ | Data model note |
| M5 | Category CRUD + Search | Full flow + validation + empty/no-result | Test cases Category |
| M6 | News CRUD + Search | Full flow + Category relation | Test cases News |
| M7 | Users CRUD + Search | Full flow + role/status | Test cases Users |
| M8 | Dashboard/Settings + polish | Summary đúng, UI nhất quán | Smoke test |
| M9 | Verification/evidence | Test matrix, debug log, lint/build pass | Test/debug docs |
| M10 | Release candidate | README final, clone/run test, Git tag nếu cần | Submission version |

## 17. Definition of Done

Một milestone chỉ được xem là hoàn thành khi:

- Chức năng đúng với requirement và acceptance criteria.
- Có ít nhất normal + negative/edge test liên quan.
- Không có console error nghiêm trọng.
- `npm run lint` và `npm run build` vẫn chạy được.
- Code có tên rõ ràng và sinh viên có thể giải thích purpose → input → trigger → transform → output.
- Evidence hoặc debug note được cập nhật ngay, không để đến cuối assignment.
- Commit chỉ chứa thay đổi có liên quan và có message mô tả đúng chức năng.

## 18. Thứ tự bắt đầu code

1. Review hai tài liệu baseline và điều chỉnh nếu có quyết định khác.
2. Cài React Router.
3. Dọn UI mặc định của Vite và tạo design tokens/global layout.
4. Triển khai Login/Auth/ProtectedRoute.
5. Triển khai AdminLayout/Header/Sidebar và navigation.
6. Tạo logo AI trong milestone layout và ghi AI usage log.
7. Sau khi auth/layout ổn định mới bắt đầu data layer và CRUD.

## 19. ReactJS knowledge alignment

Các nguyên tắc dưới đây là guardrail khi triển khai, nhằm bảo đảm code thể hiện đúng kiến thức React cơ bản thay vì chỉ tạo UI chạy được.

### 19.1 Component, props và state

- Component là function trả về JSX và có một trách nhiệm chính có thể giải thích được.
- Props là dữ liệu chỉ đọc từ parent; child không được sửa trực tiếp props.
- State là dữ liệu component cần ghi nhớ giữa các lần render.
- Hook như `useState`, `useContext`, `useEffect` chỉ được gọi ở top level của component hoặc custom hook, không gọi trong `if`, loop hoặc event handler.
- Nếu nhiều component cần cùng một state, state được lift lên common ancestor gần nhất; Context chỉ dùng khi nhiều nhánh sâu cùng cần dữ liệu.
- Không đưa local UI state như keyword hoặc form error vào global Context nếu chỉ một page sử dụng.

### 19.2 Render và event flow

```text
User event → event handler → validate/transform → setState
           → React render lại → UI phản ánh state mới
```

- Không chỉnh UI bằng `document.querySelector`, `innerHTML` hoặc DOM script cũ của template.
- Form submit dùng React event handler và `event.preventDefault()` khi cần ngăn browser reload.
- Navigation bình thường dùng `Link`/`NavLink`; imperative navigation chỉ dùng cho các flow như login thành công hoặc logout.
- Conditional rendering quyết định Login/Admin/Error/Empty state từ state và props, không ẩn hiện bằng thao tác DOM thủ công.

### 19.3 Immutable state

- Treat array/object trong state là read-only.
- Create dùng spread hoặc concat để tạo array mới.
- Update dùng `map` và tạo object mới cho record đúng `id`.
- Delete dùng `filter` để tạo array mới.
- Không dùng `push`, `splice` hoặc sửa trực tiếp thuộc tính trên object đang nằm trong state.
- Khi next state phụ thuộc previous state, ưu tiên functional updater: `setItems(previous => ...)`.

### 19.4 Derived data

- `displayedItems` được tính từ `sourceItems`, `keyword` và filter trong quá trình render.
- Không lưu cả source list và filtered list như hai state độc lập vì dễ mất đồng bộ.
- Không dùng `useEffect` chỉ để cập nhật một state có thể tính trực tiếp từ props/state hiện có.
- `useMemo` chỉ là tối ưu tùy chọn khi phép tính thực sự tốn kém; không cần cho danh sách mock nhỏ.

### 19.5 Effect và localStorage

- `useEffect` dùng để đồng bộ React với external system như `localStorage`, không dùng thay cho event handler.
- Thao tác Create/Update/Delete xuất phát từ click/submit phải chạy trong event flow; không đặt mutation nghiệp vụ vào Effect.
- Đọc initial storage nên dùng lazy state initializer hoặc hàm khởi tạo rõ ràng.
- Ghi storage có thể đặt trong operation/service hoặc Effect phụ thuộc source state, nhưng chỉ chọn một chiến lược để tránh ghi trùng.
- Vì development `StrictMode` có thể chạy thêm chu kỳ kiểm tra, logic đồng bộ phải idempotent và không tạo record hai lần.

### 19.6 List, form và Context

- Mỗi row dùng stable `id` làm React `key`; không dùng index nếu record đã có ID.
- Controlled input nhận `value` từ state và cập nhật qua `onChange`.
- Form state là bản copy riêng; không bind input rồi sửa trực tiếp `selectedItem` từ source list.
- Context Provider phải nằm phía trên consumer trong render tree.
- Provider chỉ expose state và operation cần thiết; component trình bày không đọc/ghi `localStorage` trực tiếp.

## 20. Ranh giới với Spring Boot

### 20.1 Assignment hiện tại

- Repo hiện tại là React frontend, không tạo `Controller`, `Service`, `Repository`, Entity JPA hoặc cấu hình database Java.
- `storageService` là adapter mock phía trình duyệt, không phải Spring service.
- `DataContext` quản lý client state, không thay thế backend application layer trong hệ thống production.
- `Admin/Admin` là mock authentication theo đề, không phải Spring Security.

### 20.2 Khi tích hợp Spring Boot trong tương lai

```text
React component
    ↓ gọi operation
Frontend API service (`fetch`)
    ↓ HTTP + JSON
Spring `@RestController`
    ↓
Spring service
    ↓
Repository / database
```

- Spring Boot expose REST endpoints và serialize/deserialize JSON; React không import hoặc gọi trực tiếp Java class.
- HTTP mapping dự kiến: `GET` đọc, `POST` tạo, `PUT/PATCH` cập nhật, `DELETE` xóa.
- Khi chuyển sang API, backend trở thành source of truth; không duy trì `localStorage` như nguồn CRUD thứ hai.
- Frontend service chuyển thành async và UI phải bổ sung loading/error/retry phù hợp.
- ID và relation được backend kiểm tra lại; frontend validation chỉ cải thiện UX, không thay thế backend validation.
- CORS chỉ cần cấu hình khi frontend và backend chạy khác origin trong môi trường phát triển/deploy.

## 21. Tài liệu kỹ thuật tham chiếu

- [React - Quick Start](https://react.dev/learn)
- [React - Choosing the State Structure](https://react.dev/learn/choosing-the-state-structure)
- [React - Sharing State Between Components](https://react.dev/learn/sharing-state-between-components)
- [React - Updating Arrays in State](https://react.dev/learn/updating-arrays-in-state)
- [React - Passing Data Deeply with Context](https://react.dev/learn/passing-data-deeply-with-context)
- [React - Synchronizing with Effects](https://react.dev/learn/synchronizing-with-effects)
- [React Router - Declarative Routing](https://reactrouter.com/start/modes)
- [Spring - Building a RESTful Web Service](https://spring.io/guides/gs/rest-service/)
