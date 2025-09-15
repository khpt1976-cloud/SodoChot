// Documentation JavaScript
document.addEventListener('DOMContentLoaded', function() {
    initializeTheme();
    initializeMobileMenu();
    initializeSearch();
    initializeSidebar();
    initializeTableOfContents();
    initializeFeedback();
    initializeKeyboardShortcuts();
});

// Theme Management
function initializeTheme() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;
    
    // Get saved theme or default to dark
    const savedTheme = localStorage.getItem('docs-theme') || 'dark';
    html.classList.toggle('dark', savedTheme === 'dark');
    updateThemeIcon(savedTheme === 'dark');
    
    if (themeToggle) {
        themeToggle.addEventListener('click', function() {
            const isDark = html.classList.contains('dark');
            const newTheme = isDark ? 'light' : 'dark';
            
            html.classList.toggle('dark', newTheme === 'dark');
            localStorage.setItem('docs-theme', newTheme);
            updateThemeIcon(newTheme === 'dark');
        });
    }
}

function updateThemeIcon(isDark) {
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        const icon = themeToggle.querySelector('i');
        icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
    }
}

// Mobile Menu
function initializeMobileMenu() {
    const mobileToggle = document.getElementById('mobile-menu-toggle');
    const sidebar = document.getElementById('sidebar');
    
    if (mobileToggle && sidebar) {
        mobileToggle.addEventListener('click', function() {
            sidebar.classList.toggle('open');
            
            // Update icon
            const icon = mobileToggle.querySelector('i');
            if (sidebar.classList.contains('open')) {
                icon.className = 'fas fa-times';
            } else {
                icon.className = 'fas fa-bars';
            }
        });
        
        // Close sidebar when clicking outside
        document.addEventListener('click', function(e) {
            if (!sidebar.contains(e.target) && !mobileToggle.contains(e.target)) {
                sidebar.classList.remove('open');
                const icon = mobileToggle.querySelector('i');
                icon.className = 'fas fa-bars';
            }
        });
        
        // Close sidebar on window resize
        window.addEventListener('resize', function() {
            if (window.innerWidth > 768) {
                sidebar.classList.remove('open');
                const icon = mobileToggle.querySelector('i');
                icon.className = 'fas fa-bars';
            }
        });
    }
}

// Search Functionality
function initializeSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchBox = document.querySelector('.search-box');
    
    if (searchInput) {
        // Focus search with Ctrl+K
        document.addEventListener('keydown', function(e) {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                searchInput.focus();
            }
            
            // Escape to blur search
            if (e.key === 'Escape' && document.activeElement === searchInput) {
                searchInput.blur();
            }
        });
        
        // Search functionality (placeholder)
        searchInput.addEventListener('input', function(e) {
            const query = e.target.value.toLowerCase();
            if (query.length > 2) {
                performSearch(query);
            } else {
                clearSearchResults();
            }
        });
        
        // Search focus effects
        searchInput.addEventListener('focus', function() {
            searchBox.classList.add('focused');
        });
        
        searchInput.addEventListener('blur', function() {
            searchBox.classList.remove('focused');
        });
    }
}

function performSearch(query) {
    // Placeholder search functionality
    console.log('Searching for:', query);
    
    // In a real implementation, this would:
    // 1. Search through documentation content
    // 2. Show search results dropdown
    // 3. Highlight matching text
    // 4. Navigate to results
}

function clearSearchResults() {
    // Clear search results
    console.log('Clearing search results');
}

// Sidebar Navigation
function initializeSidebar() {
    const navLinks = document.querySelectorAll('.nav-link');
    const navItems = document.querySelectorAll('.nav-item');
    const expandableItems = document.querySelectorAll('.expandable');
    
    // Handle navigation clicks for nav-items (applications)
    navItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Check if this is an application navigation
            const targetId = this.getAttribute('data-target');
            if (targetId) {
                switchToApplication(targetId, this);
            }
            
            // Remove active class from all nav-items
            navItems.forEach(i => i.classList.remove('active'));
            
            // Add active class to clicked item
            this.classList.add('active');
            
            // Close mobile menu if open
            const sidebar = document.getElementById('sidebar');
            if (sidebar && sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
                const mobileToggle = document.getElementById('mobile-menu-toggle');
                if (mobileToggle) {
                    const icon = mobileToggle.querySelector('i');
                    icon.className = 'fas fa-bars';
                }
            }
        });
    });
    
    // Handle navigation clicks for nav-links (pages)
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Check if this is a page navigation link
            const pageId = this.getAttribute('data-page') || this.parentElement.getAttribute('data-page');
            if (pageId) {
                switchToPage(pageId, this);
            }
            
            // Remove active class from all links
            navLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Close mobile menu if open
            const sidebar = document.getElementById('sidebar');
            if (sidebar && sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
                const mobileToggle = document.getElementById('mobile-menu-toggle');
                if (mobileToggle) {
                    const icon = mobileToggle.querySelector('i');
                    icon.className = 'fas fa-bars';
                }
            }
        });
    });
    
    // Handle expandable items
    expandableItems.forEach(item => {
        item.addEventListener('click', function(e) {
            e.preventDefault();
            const expandIcon = this.querySelector('.expand-icon');
            
            // Toggle expanded state
            this.classList.toggle('expanded');
            
            // Rotate icon
            if (expandIcon) {
                if (this.classList.contains('expanded')) {
                    expandIcon.style.transform = 'rotate(90deg)';
                } else {
                    expandIcon.style.transform = 'rotate(0deg)';
                }
            }
            
            // In a real implementation, this would show/hide sub-items
            console.log('Toggled expandable item:', this.textContent.trim());
        });
    });
    
    // Dropdown functionality
    const dropdown = document.querySelector('.nav-dropdown');
    if (dropdown) {
        dropdown.addEventListener('click', function() {
            this.classList.toggle('expanded');
            const icon = this.querySelector('.dropdown-icon');
            if (icon) {
                if (this.classList.contains('expanded')) {
                    icon.style.transform = 'rotate(180deg)';
                } else {
                    icon.style.transform = 'rotate(0deg)';
                }
            }
        });
    }
}

// Table of Contents
function initializeTableOfContents() {
    const tocLinks = document.querySelectorAll('.toc-link');
    const sections = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    
    // Handle TOC clicks
    tocLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Remove active class from all TOC links
            tocLinks.forEach(l => l.classList.remove('active'));
            
            // Add active class to clicked link
            this.classList.add('active');
            
            // Smooth scroll to section (placeholder)
            const targetId = this.getAttribute('href');
            if (targetId && targetId.startsWith('#')) {
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });
    
    // Auto-highlight TOC based on scroll position
    let ticking = false;
    
    function updateTOC() {
        const scrollPosition = window.scrollY + 100;
        
        let currentSection = null;
        sections.forEach(section => {
            if (section.offsetTop <= scrollPosition) {
                currentSection = section;
            }
        });
        
        if (currentSection) {
            const currentId = currentSection.id || currentSection.textContent.toLowerCase().replace(/\s+/g, '-');
            const currentTocLink = document.querySelector(`.toc-link[href="#${currentId}"]`);
            
            if (currentTocLink) {
                tocLinks.forEach(l => l.classList.remove('active'));
                currentTocLink.classList.add('active');
            }
        }
        
        ticking = false;
    }
    
    window.addEventListener('scroll', function() {
        if (!ticking) {
            requestAnimationFrame(updateTOC);
            ticking = true;
        }
    });
}

// Feedback System
function initializeFeedback() {
    const feedbackButtons = document.querySelectorAll('.feedback-btn');
    
    feedbackButtons.forEach(button => {
        button.addEventListener('click', function() {
            const isPositive = this.classList.contains('feedback-yes');
            
            // Visual feedback
            feedbackButtons.forEach(btn => btn.classList.remove('selected'));
            this.classList.add('selected');
            
            // Send feedback (placeholder)
            sendFeedback(isPositive);
            
            // Show thank you message
            showFeedbackThankYou();
        });
    });
}

function sendFeedback(isPositive) {
    console.log('Feedback sent:', isPositive ? 'positive' : 'negative');
    
    // In a real implementation, this would:
    // 1. Send feedback to analytics
    // 2. Store in database
    // 3. Trigger follow-up actions
}

function showFeedbackThankYou() {
    const feedbackSection = document.querySelector('.page-feedback');
    if (feedbackSection) {
        const thankYouMessage = document.createElement('div');
        thankYouMessage.className = 'feedback-thank-you';
        thankYouMessage.innerHTML = '<i class="fas fa-check-circle"></i> Thank you for your feedback!';
        thankYouMessage.style.cssText = `
            color: #10b981;
            font-size: 14px;
            font-weight: 500;
            display: flex;
            align-items: center;
            gap: 8px;
            margin-left: 16px;
            opacity: 0;
            transition: opacity 0.3s ease;
        `;
        
        feedbackSection.appendChild(thankYouMessage);
        
        // Fade in
        setTimeout(() => {
            thankYouMessage.style.opacity = '1';
        }, 100);
        
        // Remove after 3 seconds
        setTimeout(() => {
            thankYouMessage.style.opacity = '0';
            setTimeout(() => {
                if (thankYouMessage.parentNode) {
                    thankYouMessage.parentNode.removeChild(thankYouMessage);
                }
            }, 300);
        }, 3000);
    }
}

// Keyboard Shortcuts
function initializeKeyboardShortcuts() {
    document.addEventListener('keydown', function(e) {
        // Ctrl/Cmd + K for search (handled in search function)
        
        // Escape to close modals/dropdowns
        if (e.key === 'Escape') {
            // Close mobile menu
            const sidebar = document.getElementById('sidebar');
            if (sidebar && sidebar.classList.contains('open')) {
                sidebar.classList.remove('open');
                const mobileToggle = document.getElementById('mobile-menu-toggle');
                if (mobileToggle) {
                    const icon = mobileToggle.querySelector('i');
                    icon.className = 'fas fa-bars';
                }
            }
            
            // Close any expanded dropdowns
            const expandedDropdowns = document.querySelectorAll('.nav-dropdown.expanded');
            expandedDropdowns.forEach(dropdown => {
                dropdown.classList.remove('expanded');
                const icon = dropdown.querySelector('.dropdown-icon');
                if (icon) {
                    icon.style.transform = 'rotate(0deg)';
                }
            });
        }
        
        // Arrow keys for navigation (placeholder)
        if (e.key === 'ArrowLeft' && e.altKey) {
            // Navigate to previous page
            const prevLink = document.querySelector('.page-navigation .page-nav-item:first-child .nav-link-text');
            if (prevLink) {
                prevLink.click();
            }
        }
        
        if (e.key === 'ArrowRight' && e.altKey) {
            // Navigate to next page
            const nextLink = document.querySelector('.page-navigation .page-nav-item:last-child .nav-link-text');
            if (nextLink) {
                nextLink.click();
            }
        }
    });
}

// Utility Functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Add loading states for dynamic content
function showLoading(element) {
    if (element) {
        element.classList.add('loading');
        element.style.opacity = '0.6';
        element.style.pointerEvents = 'none';
    }
}

function hideLoading(element) {
    if (element) {
        element.classList.remove('loading');
        element.style.opacity = '1';
        element.style.pointerEvents = 'auto';
    }
}

// Copy code functionality (for future code blocks)
function initializeCodeCopy() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(block => {
        const pre = block.parentElement;
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-code-btn';
        copyButton.innerHTML = '<i class="fas fa-copy"></i>';
        copyButton.title = 'Copy code';
        
        copyButton.addEventListener('click', async function() {
            try {
                await navigator.clipboard.writeText(block.textContent);
                this.innerHTML = '<i class="fas fa-check"></i>';
                this.style.color = '#10b981';
                
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-copy"></i>';
                    this.style.color = '';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy code:', err);
            }
        });
        
        pre.style.position = 'relative';
        pre.appendChild(copyButton);
    });
}

// Initialize code copy when DOM is ready
document.addEventListener('DOMContentLoaded', initializeCodeCopy);

// Print functionality
function printPage() {
    window.print();
}

// Export functionality (placeholder)
function exportToPDF() {
    console.log('Export to PDF functionality would be implemented here');
    // In a real implementation, this would use a library like jsPDF or Puppeteer
}

// Analytics tracking (placeholder)
function trackPageView(page) {
    console.log('Page view tracked:', page);
    // In a real implementation, this would send data to analytics service
}

function trackEvent(category, action, label) {
    console.log('Event tracked:', { category, action, label });
    // In a real implementation, this would send data to analytics service
}

// Page Navigation System
function switchToPage(pageId, navElement) {
    // Hide all content pages
    const allPages = document.querySelectorAll('.content-page');
    allPages.forEach(page => {
        page.classList.remove('active');
    });
    
    // Show the selected page
    const targetPage = document.getElementById(pageId + '-content');
    if (targetPage) {
        targetPage.classList.add('active');
        
        // Update breadcrumb
        updateBreadcrumb(pageId, navElement);
        
        // Update page title
        updatePageTitle(pageId);
        
        // Update Table of Contents
        updateTOCForPage(pageId);
        
        // Track page view
        trackPageView(pageId);
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Update URL without page reload
        if (history.pushState) {
            const newUrl = window.location.pathname + '?page=' + pageId;
            history.pushState({ page: pageId }, '', newUrl);
        }
    }
}

// Application Navigation System
function switchToApplication(appId, navElement) {
    // Hide all content pages and sections
    const allPages = document.querySelectorAll('.content-page');
    const allSections = document.querySelectorAll('.content-section');
    
    allPages.forEach(page => {
        page.classList.remove('active');
    });
    
    allSections.forEach(section => {
        section.classList.remove('active');
    });
    
    // Show the selected application
    const targetApp = document.getElementById(appId);
    if (targetApp) {
        targetApp.classList.add('active');
        
        // Update breadcrumb for application
        updateBreadcrumbForApp(appId, navElement);
        
        // Update page title for application
        updatePageTitleForApp(appId);
        
        // Track application view
        trackPageView(appId);
        
        // Scroll to top
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Update URL without page reload
        if (history.pushState) {
            const newUrl = window.location.pathname + '?app=' + appId;
            history.pushState({ app: appId }, '', newUrl);
        }
    }
}

function updateBreadcrumbForApp(appId, navElement) {
    const breadcrumb = document.querySelector('.breadcrumb');
    if (breadcrumb && navElement) {
        const appTitle = navElement.querySelector('span').textContent;
        
        // Update the last breadcrumb item
        const lastItem = breadcrumb.querySelector('.breadcrumb-item.active');
        if (lastItem) {
            lastItem.textContent = appTitle;
        }
    }
}

function updatePageTitleForApp(appId) {
    const appTitles = {
        'cart-app': 'Ứng dụng Giỏ hàng - Sơ đồ Kiến trúc',
        'product-app': 'Ứng dụng Sản phẩm - Sơ đồ Kiến trúc',
        'news-app': 'Ứng dụng Tin tức - Sơ đồ Kiến trúc',
        'design-calc-app': 'Ứng dụng Tính toán Thiết kế - Sơ đồ Kiến trúc',
        'football-app': 'Ứng dụng Bóng đá - Sơ đồ Kiến trúc',
        'comm-log-app': 'Ứng dụng Nhật ký thi công - Sơ đồ Kiến trúc',
        'chatbot-app': 'Ứng dụng Chatbot - Sơ đồ Kiến trúc',
        'payment-app': 'Ứng dụng Thanh toán - Sơ đồ Kiến trúc',
        'user-app': 'Ứng dụng Người dùng - Sơ đồ Kiến trúc',
        'admin-app': 'Ứng dụng Quản trị - Sơ đồ Kiến trúc',
        'agent-mgmt-app': 'Ứng dụng Quản lý Đại lý - Sơ đồ Kiến trúc',
        'agent-policy-app': 'Ứng dụng Chính sách Đại lý - Sơ đồ Kiến trúc',
        'shell-config-app': 'Ứng dụng Cấu hình Shell - Sơ đồ Kiến trúc',
        'shell-admin-app': 'Ứng dụng Quản trị Cấu hình Shell - Sơ đồ Kiến trúc'
    };
    
    const newTitle = appTitles[appId] || 'Sơ đồ Kiến trúc - Dự án Hpt';
    document.title = newTitle;
}

function updateBreadcrumb(pageId, navElement) {
    const breadcrumb = document.querySelector('.breadcrumb');
    if (breadcrumb && navElement) {
        const pageTitle = navElement.querySelector('span').textContent;
        
        // Update the last breadcrumb item
        const lastItem = breadcrumb.querySelector('.breadcrumb-item.active');
        if (lastItem) {
            lastItem.textContent = pageTitle;
        }
    }
}

function updatePageTitle(pageId) {
    const pageTitles = {
        'gioi-thieu': 'Giới thiệu về Dự án - Tài liệu',
        'so-do-tong-the': 'Sơ đồ tổng thể - Tài liệu',
        'microservice-architecture': 'Microservice Architecture - Tài liệu',
        'thu-tu-trien-khai': 'Thứ tự triển khai dự án - Tài liệu',
        'luu-y-trien-khai': 'Lưu ý khi triển khai - Tài liệu',
        'tung-buoc-trien-khai': 'Từng bước triển khai - Tài liệu',
        'nhiem-vu-shell': 'Nhiệm vụ thành phần Shell trong kiến trúc microservice - Tài liệu',
        'settings': 'Settings - Tài liệu'
    };
    
    const newTitle = pageTitles[pageId] || 'Tài liệu - Hệ thống Quản lý Nhật ký Thi công';
    document.title = newTitle;
}

function updateTOCForPage(pageId) {
    // Hide all TOC content sections
    const allTocSections = document.querySelectorAll('[class^="toc-content-"]');
    allTocSections.forEach(section => {
        section.style.display = 'none';
    });
    
    // Show the appropriate TOC section
    let tocClass = 'settings'; // default
    if (pageId === 'gioi-thieu') {
        tocClass = 'gioi-thieu';
    } else if (pageId === 'microservice-architecture') {
        tocClass = 'microservice';
    } else if (pageId === 'so-do-tong-the') {
        tocClass = 'so-do-tong-the';
    } else if (pageId === 'thu-tu-trien-khai') {
        tocClass = 'thu-tu-trien-khai';
    } else if (pageId === 'luu-y-trien-khai') {
        tocClass = 'luu-y-trien-khai';
    } else if (pageId === 'tung-buoc-trien-khai') {
        tocClass = 'tung-buoc-trien-khai';
    } else if (pageId === 'nhiem-vu-shell') {
        tocClass = 'nhiem-vu-shell';
    }
    
    const targetTocSection = document.querySelector(`.toc-content-${tocClass}`);
    if (targetTocSection) {
        targetTocSection.style.display = 'block';
        
        // Reset active states
        const tocLinks = targetTocSection.querySelectorAll('.toc-link');
        tocLinks.forEach(link => link.classList.remove('active'));
        
        // Set first link as active
        if (tocLinks.length > 0) {
            tocLinks[0].classList.add('active');
        }
    }
}

// Handle browser back/forward buttons
window.addEventListener('popstate', function(event) {
    if (event.state && event.state.page) {
        const pageId = event.state.page;
        const navLink = document.querySelector(`[data-page="${pageId}"]`);
        if (navLink) {
            switchToPage(pageId, navLink);
            
            // Update active nav link
            document.querySelectorAll('.nav-link').forEach(l => l.classList.remove('active'));
            navLink.classList.add('active');
        }
    } else {
        // Default to settings page
        const settingsContent = document.getElementById('settings-content');
        const microserviceContent = document.getElementById('microservice-architecture-content');
        const soDoTongTheContent = document.getElementById('so-do-tong-the-content');
        
        if (settingsContent) settingsContent.style.display = 'block';
        if (microserviceContent) microserviceContent.style.display = 'none';
        if (soDoTongTheContent) soDoTongTheContent.style.display = 'none';
        
        document.title = 'Settings - Tài liệu';
    }
});

// Initialize page based on URL parameter
function initializePageFromURL() {
    const urlParams = new URLSearchParams(window.location.search);
    const pageParam = urlParams.get('page');
    
    if (pageParam) {
        const navLink = document.querySelector(`[data-page="${pageParam}"]`);
        if (navLink) {
            switchToPage(pageParam, navLink);
            navLink.classList.add('active');
            
            // Remove active from other links
            document.querySelectorAll('.nav-link').forEach(l => {
                if (l !== navLink) l.classList.remove('active');
            });
        }
    } else {
        // Default to "Giới thiệu" page when no page parameter
        const defaultNavLink = document.querySelector('[data-page="gioi-thieu"]');
        if (defaultNavLink) {
            switchToPage('gioi-thieu', defaultNavLink);
            defaultNavLink.classList.add('active');
            
            // Remove active from other links
            document.querySelectorAll('.nav-link').forEach(l => {
                if (l !== defaultNavLink) l.classList.remove('active');
            });
        }
    }
}

// Enhanced Table of Contents for dynamic content
function updateTableOfContents(pageId) {
    const tocNav = document.querySelector('.toc-nav');
    if (!tocNav) return;
    
    // Clear existing TOC
    tocNav.innerHTML = '';
    
    // Get headings from current page
    const currentPage = document.getElementById(pageId + '-content');
    if (!currentPage) return;
    
    const headings = currentPage.querySelectorAll('h1, h2, h3, h4, h5, h6');
    
    headings.forEach((heading, index) => {
        const level = parseInt(heading.tagName.charAt(1));
        const text = heading.textContent;
        const id = heading.id || `heading-${index}`;
        
        // Set ID if not exists
        if (!heading.id) {
            heading.id = id;
        }
        
        // Create TOC link
        const tocLink = document.createElement('a');
        tocLink.href = `#${id}`;
        tocLink.className = 'toc-link';
        tocLink.textContent = text;
        tocLink.style.paddingLeft = `${(level - 1) * 12}px`;
        
        // Add click handler
        tocLink.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.getElementById(id);
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                
                // Update active TOC link
                document.querySelectorAll('.toc-link').forEach(l => l.classList.remove('active'));
                this.classList.add('active');
            }
        });
        
        tocNav.appendChild(tocLink);
    });
}

// Enhanced search for multiple pages
function performSearchAcrossPages(query) {
    const results = [];
    const allPages = document.querySelectorAll('.content-page');
    
    allPages.forEach(page => {
        const pageId = page.id.replace('-content', '');
        const content = page.textContent.toLowerCase();
        
        if (content.includes(query.toLowerCase())) {
            const title = page.querySelector('.page-title')?.textContent || pageId;
            results.push({
                pageId: pageId,
                title: title,
                snippet: extractSnippet(content, query)
            });
        }
    });
    
    return results;
}

function extractSnippet(content, query, maxLength = 150) {
    const index = content.toLowerCase().indexOf(query.toLowerCase());
    if (index === -1) return '';
    
    const start = Math.max(0, index - 50);
    const end = Math.min(content.length, index + query.length + 50);
    
    let snippet = content.substring(start, end);
    if (start > 0) snippet = '...' + snippet;
    if (end < content.length) snippet = snippet + '...';
    
    return snippet;
}

// Copy code functionality for code blocks
function initializeCodeCopyForPage(pageId) {
    const currentPage = document.getElementById(pageId + '-content');
    if (!currentPage) return;
    
    const codeBlocks = currentPage.querySelectorAll('.code-block pre code');
    
    codeBlocks.forEach(block => {
        const pre = block.parentElement;
        const codeContainer = pre.parentElement;
        
        // Check if copy button already exists
        if (codeContainer.querySelector('.copy-code-btn')) return;
        
        const copyButton = document.createElement('button');
        copyButton.className = 'copy-code-btn';
        copyButton.innerHTML = '<i class="fas fa-copy"></i>';
        copyButton.title = 'Copy code';
        copyButton.style.cssText = `
            position: absolute;
            top: 12px;
            right: 12px;
            background: var(--bg-primary);
            border: 1px solid var(--border-color);
            border-radius: 4px;
            padding: 6px 8px;
            cursor: pointer;
            color: var(--text-muted);
            font-size: 12px;
            transition: var(--transition-fast);
            z-index: 10;
        `;
        
        copyButton.addEventListener('click', async function() {
            try {
                await navigator.clipboard.writeText(block.textContent);
                this.innerHTML = '<i class="fas fa-check"></i>';
                this.style.color = '#10b981';
                
                setTimeout(() => {
                    this.innerHTML = '<i class="fas fa-copy"></i>';
                    this.style.color = 'var(--text-muted)';
                }, 2000);
            } catch (err) {
                console.error('Failed to copy code:', err);
            }
        });
        
        codeContainer.style.position = 'relative';
        codeContainer.appendChild(copyButton);
    });
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initialize page from URL
    initializePageFromURL();
    
    // Initialize code copy for all pages
    setTimeout(() => {
        initializeCodeCopyForPage('settings');
        initializeCodeCopyForPage('so-do-tong-the');
        initializeCodeCopyForPage('microservice-architecture');
    }, 100);
});

// Initialize analytics
trackPageView(window.location.pathname);