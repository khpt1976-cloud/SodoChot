# 📚 Tài liệu - Hệ thống Quản lý Nhật ký Thi công

Trang tài liệu được thiết kế giống hệt **All Hands Docs** với đầy đủ tính năng và giao diện chuyên nghiệp.

## 🌟 Tính năng chính

### ✅ Giao diện hoàn chỉnh
- **Header** với logo, search bar, theme toggle, và user menu
- **Sidebar navigation** với menu tree đa cấp
- **Main content area** với breadcrumb và nội dung
- **Table of Contents** (TOC) bên phải
- **Footer** với social links

### 🎨 Thiết kế
- **Dark/Light theme** tự động chuyển đổi
- **Responsive design** hoạt động trên mọi thiết bị
- **Typography** sử dụng font Inter chuyên nghiệp
- **Color scheme** giống All Hands Docs
- **Animations** mượt mà và tinh tế

### 🔧 Tính năng tương tác
- **Search functionality** với Ctrl+K shortcut
- **Mobile menu** với hamburger button
- **Expandable navigation** items
- **Smooth scrolling** cho anchor links
- **Feedback system** (Yes/No buttons)
- **Keyboard shortcuts** hỗ trợ navigation

## 📁 Cấu trúc file

```
Tailieu/
├── index.html          # Trang chính
├── docs.css           # Styling chính
├── docs.js            # JavaScript functionality
└── README.md          # Tài liệu này
```

## 🚀 Cách sử dụng

### 1. Truy cập trực tiếp
```
http://localhost:12001/Tailieu/
```

### 2. Từ website chính
- Đăng nhập với `Hpt/Hpt@768696`
- Click vào nút **"Tài liệu"** trong menu
- Trang sẽ mở trong tab mới

## 🎯 Các trang có thể mở rộng

Sidebar đã được thiết kế với các section:

### 📖 Documentation Sections
- **Introduction** - Giới thiệu hệ thống
- **Quick Start** - Hướng dẫn bắt đầu nhanh
- **Key Features** - Tính năng chính
- **FAQs** - Câu hỏi thường gặp

### ☁️ Dự án Hpt
- **Getting Started** - Bắt đầu với Cloud
- **Integrations** - Tích hợp
- **Cloud UI** - Giao diện Cloud
- **Cloud API** - API documentation

### 🔧 Self-Hosted
- **Getting Started** - Cài đặt tự host
- **GUI** - Giao diện người dùng
- **CLI** - Command line interface
- **Headless** - Chế độ headless

### ⚙️ Customizations & Settings
- **Dự án Hpt Settings** - Cài đặt hệ thống
- **Repository Customization** - Tùy chỉnh repository
- **Microagents** - Quản lý microagents

## 🎨 Customization

### Thay đổi màu sắc
Chỉnh sửa CSS variables trong `docs.css`:

```css
:root {
    --primary: 153 135 60;        /* Màu chính */
    --primary-light: 255 225 101; /* Màu sáng */
    --primary-dark: 255 225 101;  /* Màu tối */
}
```

### Thêm trang mới
1. Tạo file HTML mới
2. Copy structure từ `index.html`
3. Cập nhật nội dung trong `.page-content`
4. Thêm link trong sidebar navigation

### Tùy chỉnh sidebar
Chỉnh sửa navigation structure trong `index.html`:

```html
<div class="nav-group">
    <div class="nav-group-title">Tên Section</div>
    <div class="nav-item">
        <div class="nav-link">
            <i class="fas fa-icon nav-icon"></i>
            <span>Tên trang</span>
        </div>
    </div>
</div>
```

## 📱 Responsive Breakpoints

- **Desktop**: > 1200px (Full layout với TOC)
- **Tablet**: 768px - 1200px (Ẩn TOC)
- **Mobile**: < 768px (Mobile menu)

## ⌨️ Keyboard Shortcuts

- **Ctrl/Cmd + K**: Focus search
- **Escape**: Close mobile menu/dropdowns
- **Alt + ←**: Previous page
- **Alt + →**: Next page

## 🔍 Search Implementation

Search hiện tại là placeholder. Để implement thực tế:

1. **Index content**: Tạo search index từ tất cả trang
2. **Search API**: Implement backend search
3. **Results UI**: Tạo dropdown results
4. **Highlighting**: Highlight matching text

## 📊 Analytics

JavaScript đã chuẩn bị sẵn tracking functions:

```javascript
trackPageView(page);
trackEvent(category, action, label);
```

Chỉ cần kết nối với Google Analytics hoặc service khác.

## 🎯 Next Steps

1. **Thêm nội dung** cho các trang con
2. **Implement search** thực tế
3. **Kết nối database** cho dynamic content
4. **Thêm user authentication** integration
5. **SEO optimization** với meta tags
6. **Performance optimization** với lazy loading

## 🛠️ Technical Stack

- **HTML5** - Semantic markup
- **CSS3** - Modern styling với CSS Grid/Flexbox
- **Vanilla JavaScript** - No dependencies
- **Font Awesome** - Icons
- **Google Fonts** - Inter typography
- **CSS Variables** - Theme system

## 📞 Support

Trang tài liệu này được thiết kế để dễ dàng mở rộng và tùy chỉnh. Mọi thay đổi đều có thể thực hiện thông qua HTML/CSS/JS cơ bản.

---

**🎉 Hoàn thành!** Trang tài liệu đã sẵn sàng sử dụng với giao diện giống hệt All Hands Docs!