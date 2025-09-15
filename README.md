# ConstructVN - Hệ thống Quản lý Nhật ký Thi công

Website giới thiệu dịch vụ quản lý dự án xây dựng chuyên nghiệp, được thiết kế dựa trên giao diện của http://hoatdongxaydung.org/

## Tính năng

- **Responsive Design**: Tương thích với mọi thiết bị (desktop, tablet, mobile)
- **Modern UI/UX**: Giao diện hiện đại, thân thiện với người dùng
- **Interactive Elements**: Các hiệu ứng tương tác mượt mà
- **Performance Optimized**: Tối ưu hóa tốc độ tải trang

## Cấu trúc dự án

```
/workspace/project/
├── index.html          # Trang chính
├── styles.css          # File CSS chính
├── script.js           # JavaScript tương tác
├── README.md           # Tài liệu dự án
└── server.log          # Log của development server
```

## Các section chính

1. **Header**: Navigation menu với logo và các liên kết
2. **Hero Section**: Tiêu đề chính và call-to-action
3. **Features**: 3 tính năng nổi bật của hệ thống
4. **Benefits**: 4 lợi ích khi sử dụng dịch vụ
5. **Testimonials**: Phản hồi từ khách hàng
6. **Pricing**: 4 gói dịch vụ với giá cả khác nhau
7. **CTA**: Kêu gọi hành động cuối trang
8. **Footer**: Thông tin liên hệ và links

## Chạy dự án

Website đang chạy trên development server:

```bash
python3 -m http.server 12000 --bind 0.0.0.0
```

Truy cập: https://work-1-hwidsqjnesezwdgb.prod-runtime.all-hands.dev

## Công nghệ sử dụng

- **HTML5**: Cấu trúc semantic
- **CSS3**: Flexbox, Grid, Animations, Responsive Design
- **JavaScript ES6+**: Tương tác và hiệu ứng
- **Font Awesome**: Icons
- **Google Fonts**: Typography (Segoe UI fallback)

## Tính năng tương tác

- Mobile navigation menu
- Smooth scrolling
- Scroll effects cho header
- Animation khi scroll
- Button loading states
- Notification system
- Keyboard navigation support

## Responsive Breakpoints

- **Desktop**: > 768px
- **Tablet**: 768px - 480px  
- **Mobile**: < 480px

## Ghi chú

- Tất cả các button và form hiện tại chỉ hiển thị thông báo demo
- Video placeholder sẽ được thay thế bằng video thực tế trong tương lai
- Các trang con sẽ được phát triển trong các phiên bản tiếp theo
- API integration sẽ được thêm vào sau

## Phát triển tiếp theo

1. Thêm các trang con (About, Contact, Features detail, etc.)
2. Tích hợp backend API
3. Thêm form liên hệ thực tế
4. Tích hợp payment gateway
5. Thêm dashboard cho khách hàng
6. SEO optimization
7. Performance monitoring