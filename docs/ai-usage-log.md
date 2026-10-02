# FUNewsManagementSystem - AI Usage Log

Tài liệu này ghi lại cách AI được sử dụng, phần nào được áp dụng và cách kết quả được kiểm chứng. Sinh viên vẫn chịu trách nhiệm đọc, hiểu, chạy thử và giải thích toàn bộ code trước khi nộp.

| # | Prompt/Mục đích | Gợi ý hoặc phần AI hỗ trợ | Cách kiểm chứng | Phần sinh viên cần hiểu/chỉnh sửa |
|---|---|---|---|---|
| 1 | Đọc Assignment 01, phân tích việc cần làm và lập kế hoạch | Requirement matrix, milestone, evidence và checklist theo rubric | Đối chiếu lại toàn bộ Student Guide; review `requirements.md` và `design.md` | Xác nhận giả định lớp học, deadline và quy định nộp |
| 2 | Rà soát kiến thức ReactJS/Spring Boot trong tài liệu thiết kế | Sửa provider hierarchy; bổ sung immutable state, derived data, Context và ranh giới REST API | Đối chiếu tài liệu chính thức React, React Router và Spring | Có thể giải thích props/state/Context/effect và frontend-backend boundary |
| 3 | Triển khai milestone Login/Auth | Routing, AuthContext, controlled form, validation, protected route, session và logout | `npm run lint` và `npm run build` pass; AUTH-01 đến AUTH-08 pass trong browser; console không có warning/error | Mở đúng file và giải thích event → validate → setState → navigation → render |
| 4 | Tạo logo AI và triển khai Admin Layout | Sinh logo, tích hợp asset; xây Header, Sidebar, nested routes và responsive menu | Kiểm tra ảnh RGBA có transparency; lint/build pass; LAYOUT-01 đến NAV-07 pass; tab browser sạch không có warning/error | Giải thích `AdminLayout → Outlet`, `NavLink`, props, state mở sidebar và cách import asset |
| 5 | Triển khai seed data, storage service và Read | Xây DataProvider/useData, hydrate/persist ba collection, chuyển auth sang User source và render ba bảng semantic | Lint/build pass; DATA-01 đến DATA-07 pass; reload và console sạch trong browser | Giải thích seed → storage service → Context → page, derived relation, stable key và vì sao không render mock password |
| 6 | Triển khai Category CRUD + Search | Tách Category page/table/form, common modal/search/confirm/empty state, validation và immutable operations | CAT-01 đến CAT-13; pure operation test; lint/build; desktop/mobile smoke test; console sạch | Giải thích local UI state, derived filtered list, controlled form, duplicate validation, update theo ID và delete relation guard |
| 7 | Triển khai News CRUD + Search | Tách News page/table/form, validation và immutable operations; resolve Category/User; gán creator từ session và giữ creator khi update | NEWS-01 đến NEWS-13; pure operation test; reload persistence; desktop/mobile test; lint/build và console sạch | Giải thích derived search, controlled form, quan hệ `categoryId`/`createdBy`, create theo current user, update theo ID và confirm delete |
| 8 | Rà soát tiến độ và hoàn thiện core scope còn thiếu | Triển khai Users CRUD + Search, relation guards, empty/no-result; đồng bộ login `Admin/Admin`; hoàn thiện Settings và README | USER-01 đến USER-14; validator/immutable operation checks; reload, logout, protected route; lint/build và console sạch | Giải thích User form state, validation unique, delete constraints, persistence và vì sao Staff không thuộc core login scope |

## Logo generation record

- Mode: built-in image generation.
- Project asset: `src/assets/funews-logo.png`.
- Output: PNG 1254 × 1254, RGBA, có kênh trong suốt.
- Nơi sử dụng: Login, Header và Sidebar.

Final prompt:

```text
Use case: logo-brand
Asset type: application logo mark for the FUNewsManagementSystem React admin dashboard
Primary request: create an original geometric symbol that combines a folded newspaper/page with a subtle forward-moving news signal; the mark should communicate news management, organization, and trust
Style/medium: clean vector-like logo mark, flat colors, minimal, crisp edges
Composition/framing: one centered square icon with a strong silhouette, balanced negative space, and generous transparent padding; readable at 32px
Color palette: deep navy #0C2742 and clear blue #1971D4, with optional white negative space
Constraints: genuinely transparent background; symbol only; no words, no letters, no gradients, no mockup, no 3D, no shadow, no watermark, no trademarked imagery
```
