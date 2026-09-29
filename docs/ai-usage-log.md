# FUNewsManagementSystem - AI Usage Log

Tài liệu này ghi lại cách AI được sử dụng, phần nào được áp dụng và cách kết quả được kiểm chứng. Sinh viên vẫn chịu trách nhiệm đọc, hiểu, chạy thử và giải thích toàn bộ code trước khi nộp.

| # | Prompt/Mục đích | Gợi ý hoặc phần AI hỗ trợ | Cách kiểm chứng | Phần sinh viên cần hiểu/chỉnh sửa |
|---|---|---|---|---|
| 1 | Đọc Assignment 01, phân tích việc cần làm và lập kế hoạch | Requirement matrix, milestone, evidence và checklist theo rubric | Đối chiếu lại toàn bộ Student Guide; review `requirements.md` và `design.md` | Xác nhận giả định lớp học, deadline và quy định nộp |
| 2 | Rà soát kiến thức ReactJS/Spring Boot trong tài liệu thiết kế | Sửa provider hierarchy; bổ sung immutable state, derived data, Context và ranh giới REST API | Đối chiếu tài liệu chính thức React, React Router và Spring | Có thể giải thích props/state/Context/effect và frontend-backend boundary |
| 3 | Triển khai milestone Login/Auth | Routing, AuthContext, controlled form, validation, protected route, session và logout | `npm run lint` và `npm run build` pass; AUTH-01 đến AUTH-08 pass trong browser; console không có warning/error | Mở đúng file và giải thích event → validate → setState → navigation → render |
