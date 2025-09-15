# Kiến trúc Thư mục Dự án Microservice

Đây là kiến trúc thư mục tổng quan cho dự án Microservice, được tổ chức để dễ dàng quản lý và mở rộng. Cấu trúc này phản ánh sự phân chia rõ ràng giữa các dịch vụ backend, ứng dụng frontend, các thành phần dùng chung và hạ tầng.

```
/project-root
├── services/                                   # Chứa mã nguồn của tất cả các Microservice Backend
│   ├── cart-service/                           # Dịch vụ giỏ hàng
│   ├── product-service/                        # Dịch vụ sản phẩm
│   ├── news-service/                           # Dịch vụ tin tức
│   ├── design-calculation-service/             # Dịch vụ tính toán thiết kế
│   ├── football-service/                       # Dịch vụ bóng đá
│   ├── communication-log-service/              # Dịch vụ nhật ký thi công
│   ├── chatbot-service/                        # Dịch vụ chatbot
│   ├── payment-service/                        # Dịch vụ thanh toán
│   ├── user-service/                           # Dịch vụ người dùng
│   ├── shell-config-service/                   # Dịch vụ cấu hình shell (backend cho Shell App User/Admin và Shell Config Admin Frontend)
│   ├── admin-service/                          # Dịch vụ quản trị hệ thống
│   ├── agent-management-service/               # Dịch vụ quản lý đại lý
│   └── agent-policy-service/                   # Dịch vụ chính sách đại lý
│
├── frontend/                                   # Chứa mã nguồn của tất cả các ứng dụng Frontend
│   ├── shell-app-user/                         # Ứng dụng Frontend chính cho người dùng cuối
│   ├── shell-app-admin/                        # Ứng dụng Frontend chính cho quản trị viên
│   ├── shell-config-admin-frontend/            # Ứng dụng Frontend độc lập cho quản trị cấu hình Shell
│   ├── cart-service-frontend/                  # Giao diện người dùng giỏ hàng
│   ├── cart-service-admin/                     # Giao diện quản trị giỏ hàng
│   ├── product-service-frontend/               # Giao diện người dùng sản phẩm
│   ├── product-service-admin/                  # Giao diện quản trị sản phẩm
│   ├── news-service-frontend/                  # Giao diện người dùng tin tức
│   ├── news-service-admin/                     # Giao diện quản trị tin tức
│   ├── design-calculation-frontend/            # Giao diện người dùng tính toán thiết kế
│   ├── design-calculation-admin/               # Giao diện quản trị tính toán thiết kế
│   ├── football-service-frontend/              # Giao diện người dùng bóng đá
│   ├── football-service-admin/                 # Giao diện quản trị bóng đá
│   ├── communication-log-frontend/             # Giao diện người dùng nhật ký thi công
│   ├── communication-log-admin/                # Giao diện quản trị nhật ký thi công
│   ├── chatbot-service-frontend/               # Giao diện người dùng chatbot
│   ├── chatbot-service-admin/                  # Giao diện quản trị chatbot
│   ├── payment-service-frontend/               # Giao diện người dùng thanh toán
│   ├── payment-service-admin/                  # Giao diện quản trị thanh toán
│   ├── user-service-frontend/                  # Giao diện người dùng
│   ├── user-service-admin/                     # Giao diện quản trị người dùng
│   ├── admin-service-frontend/                 # Giao diện người dùng quản trị
│   ├── admin-service-admin/                    # Giao diện quản trị hệ thống
│   ├── agent-management-frontend/              # Giao diện người dùng quản lý đại lý
│   ├── agent-management-admin/                 # Giao diện quản trị quản lý đại lý
│   ├── agent-policy-frontend/                  # Giao diện người dùng chính sách đại lý
│   └── agent-policy-admin/                     # Giao diện quản trị chính sách đại lý
│
├── api-gateway/                                # Cấu hình và mã nguồn cho API Gateway
│   ├── user-gateway/                           # API Gateway cho người dùng cuối
│   └── admin-gateway/                          # API Gateway cho quản trị viên
│
├── shared/                                     # Chứa các thư viện, module dùng chung
│   ├── common-models/                          # Các định nghĩa model dùng chung
│   ├── utils/                                  # Các tiện ích chung
│   └── config/                                 # Cấu hình chung
│
├── infrastructure/                             # Cấu hình và mã nguồn liên quan đến hạ tầng
│   ├── kubernetes/                             # Cấu hình Kubernetes (Deployments, Services, Ingress, v.v.)
│   ├── terraform/                              # Mã Terraform để quản lý hạ tầng (nếu có)
│   ├── ansible/                                # Playbook Ansible để cấu hình máy chủ (nếu có)
│   ├── monitoring/                             # Cấu hình cho các công cụ giám sát (Prometheus, Grafana)
│   └── logging/                                # Cấu hình cho hệ thống logging (ELK Stack)
│
├── docs/                                       # Tài liệu dự án
│   ├── architecture/                           # Tài liệu kiến trúc
│   ├── deployment/                             # Tài liệu triển khai
│   └── README.md
│
├── scripts/                                    # Các script tự động hóa (CI/CD, deploy, backup)
│   ├── ci-cd/                                  # Script cho CI/CD pipelines
│   ├── deploy/                                 # Script triển khai
│   └── setup/                                  # Script cài đặt môi trường
│
├── .gitignore                                  # Các file/thư mục bỏ qua bởi Git
├── README.md                                   # File README tổng quan dự án
└── docker-compose.yml                          # File Docker Compose cho môi trường phát triển cục bộ
```

**Giải thích cấu trúc:**

*   **`services/`**: Chứa tất cả các microservice backend. Mỗi thư mục con là một microservice độc lập với mã nguồn, Dockerfile, và các file cấu hình riêng.
*   **`frontend/`**: Chứa tất cả các ứng dụng frontend. Mỗi thư mục con là một ứng dụng frontend độc lập, bao gồm cả `Shell Config Admin Frontend` được tách biệt.
*   **`api-gateway/`**: Chứa cấu hình và mã nguồn cho các API Gateway, phân tách giữa người dùng và quản trị.
*   **`shared/`**: Chứa các module, thư viện, hoặc định nghĩa dùng chung giữa các dịch vụ và ứng dụng để tránh trùng lặp mã.
*   **`infrastructure/`**: Chứa tất cả các cấu hình và mã nguồn liên quan đến hạ tầng, như Kubernetes manifests, Terraform scripts, Ansible playbooks, cấu hình monitoring và logging. Đây là phần nền tảng hỗ trợ toàn bộ hệ thống.
*   **`docs/`**: Chứa tất cả tài liệu của dự án, bao gồm tài liệu kiến trúc, triển khai, và các hướng dẫn khác.
*   **`scripts/`**: Chứa các script tự động hóa cho các tác vụ như CI/CD, triển khai, và thiết lập môi trường.
*   Các file ở cấp độ gốc như `.gitignore`, `README.md`, `docker-compose.yml` cung cấp thông tin tổng quan và cấu hình cho toàn bộ dự án.

Cấu trúc này giúp duy trì sự rõ ràng, dễ dàng mở rộng và quản lý các thành phần trong một hệ thống microservice phức tạp.


