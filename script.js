// Authentication State Management
let isLoggedIn = false;
const validCredentials = {
    username: 'Hpt',
    password: 'Hpt@768696'
};

// Initialize page state
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing...'); // Debug log
    initializeNavigation();
    initializeAuth();
    updateNavigationState();
    
    // Add specific handler for Tài liệu link
    const documentsLink = document.getElementById('nav-documents');
    if (documentsLink) {
        documentsLink.addEventListener('click', function(e) {
            e.preventDefault();
            window.open('https://work-2-hwidsqjnesezwdgb.prod-runtime.all-hands.dev/Tailieu/', '_blank');
        });
    }
    
    // Additional direct event binding as backup
    setTimeout(function() {
        const loginForm = document.getElementById('login-form');
        const loginBtn = document.querySelector('#login-form button[type="submit"]');
        
        if (loginBtn && !loginBtn.hasAttribute('data-listener-added')) {
            console.log('Adding backup click listener to login button');
            loginBtn.setAttribute('data-listener-added', 'true');
            loginBtn.onclick = function(e) {
                e.preventDefault();
                console.log('Backup click handler triggered');
                handleLogin();
                return false;
            };
        }
    }, 500);
});

// Mobile Navigation Toggle
function initializeNavigation() {
    const mobileMenu = document.getElementById('mobile-menu');
    const navMenu = document.querySelector('.nav-menu');

    if (mobileMenu && navMenu) {
        mobileMenu.addEventListener('click', function() {
            mobileMenu.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        // Close mobile menu when clicking on a link
        document.querySelectorAll('.nav-link').forEach(link => {
            link.addEventListener('click', (e) => {
                // Handle Tài liệu link specifically
                if (link.id === 'nav-documents') {
                    e.preventDefault();
                    window.open('https://work-2-hwidsqjnesezwdgb.prod-runtime.all-hands.dev/Tailieu/', '_blank');
                    return;
                }
                
                if (link.classList.contains('disabled')) {
                    e.preventDefault();
                    return;
                }
                
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', function(event) {
            const isClickInsideNav = navMenu.contains(event.target);
            const isClickOnToggle = mobileMenu.contains(event.target);
            
            if (!isClickInsideNav && !isClickOnToggle && navMenu.classList.contains('active')) {
                mobileMenu.classList.remove('active');
                navMenu.classList.remove('active');
            }
        });
    }
}

// Authentication System
function initializeAuth() {
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const loginModal = document.getElementById('login-modal');
    const modalClose = document.getElementById('modal-close');
    const cancelLogin = document.getElementById('cancel-login');
    const loginForm = document.getElementById('login-form');

    // Login button click
    if (loginBtn) {
        loginBtn.addEventListener('click', function() {
            showLoginModal();
        });
    }

    // Logout button click
    if (logoutBtn) {
        logoutBtn.addEventListener('click', function() {
            logout();
        });
    }

    // Modal close events
    if (modalClose) {
        modalClose.addEventListener('click', function() {
            hideLoginModal();
        });
    }

    if (cancelLogin) {
        cancelLogin.addEventListener('click', function() {
            hideLoginModal();
        });
    }

    // Click outside modal to close
    if (loginModal) {
        loginModal.addEventListener('click', function(e) {
            if (e.target === loginModal) {
                hideLoginModal();
            }
        });
    }

    // Login form submission
    if (loginForm) {
        console.log('Login form found, adding event listener'); // Debug log
        loginForm.addEventListener('submit', function(e) {
            console.log('Form submitted'); // Debug log
            e.preventDefault();
            handleLogin();
        });
        
        // Also add click event to submit button as backup
        const submitBtn = loginForm.querySelector('button[type="submit"]');
        if (submitBtn) {
            submitBtn.addEventListener('click', function(e) {
                console.log('Submit button clicked'); // Debug log
                e.preventDefault();
                handleLogin();
            });
        }
    } else {
        console.log('Login form not found!'); // Debug log
    }

    // ESC key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && loginModal && loginModal.style.display !== 'none') {
            hideLoginModal();
        }
    });
}

function showLoginModal() {
    const loginModal = document.getElementById('login-modal');
    const loginError = document.getElementById('login-error');
    
    if (loginModal) {
        loginModal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        
        // Clear previous error and form
        if (loginError) {
            loginError.style.display = 'none';
        }
        
        // Focus on username field
        const usernameField = document.getElementById('username');
        if (usernameField) {
            setTimeout(() => usernameField.focus(), 100);
        }
    }
}

function hideLoginModal() {
    const loginModal = document.getElementById('login-modal');
    const loginForm = document.getElementById('login-form');
    const loginError = document.getElementById('login-error');
    
    if (loginModal) {
        loginModal.style.display = 'none';
        document.body.style.overflow = 'auto';
        
        // Clear form and error
        if (loginForm) {
            loginForm.reset();
        }
        if (loginError) {
            loginError.style.display = 'none';
        }
    }
}

function handleLogin() {
    console.log('handleLogin called'); // Debug log
    
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    const loginError = document.getElementById('login-error');
    
    console.log('Username:', username, 'Password length:', password.length); // Debug log
    
    // Validate credentials
    if (username === validCredentials.username && password === validCredentials.password) {
        // Successful login
        console.log('Login successful'); // Debug log
        isLoggedIn = true;
        hideLoginModal();
        updateNavigationState();
        showNotification('Đăng nhập thành công!', 'success');
    } else {
        // Failed login
        console.log('Login failed'); // Debug log
        if (loginError) {
            loginError.style.display = 'block';
        }
        
        // Clear password field
        document.getElementById('password').value = '';
        document.getElementById('password').focus();
    }
}

function logout() {
    isLoggedIn = false;
    updateNavigationState();
    showNotification('Đã đăng xuất thành công!', 'info');
}

function updateNavigationState() {
    const loginBtn = document.getElementById('login-btn');
    const userInfo = document.getElementById('user-info');
    const navLinks = document.querySelectorAll('.nav-link:not(.active)');
    
    if (isLoggedIn) {
        // Show user info, hide login button
        if (loginBtn) loginBtn.style.display = 'none';
        if (userInfo) userInfo.style.display = 'flex';
        
        // Enable all navigation links
        navLinks.forEach(link => {
            link.classList.remove('disabled');
        });
    } else {
        // Show login button, hide user info
        if (loginBtn) loginBtn.style.display = 'block';
        if (userInfo) userInfo.style.display = 'none';
        
        // Disable navigation links except home
        navLinks.forEach(link => {
            link.classList.add('disabled');
        });
    }
}

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Header scroll effect
window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.style.background = 'rgba(255, 255, 255, 0.95)';
        header.style.backdropFilter = 'blur(10px)';
    } else {
        header.style.background = '#fff';
        header.style.backdropFilter = 'none';
    }
});

// Video placeholder click handler
document.querySelector('.video-placeholder').addEventListener('click', function() {
    // This would typically open a modal or redirect to a video
    alert('Video demo sẽ được phát ở đây. Tính năng này sẽ được triển khai sau.');
});

// Pricing card interactions
document.querySelectorAll('.pricing-card .btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        const cardTitle = this.closest('.pricing-card').querySelector('h3').textContent;
        
        if (this.textContent.includes('Liên hệ')) {
            alert(`Cảm ơn bạn quan tâm đến gói ${cardTitle}. Chúng tôi sẽ liên hệ với bạn sớm nhất.`);
        } else {
            alert(`Bạn đã chọn gói ${cardTitle}. Chức năng đăng ký sẽ được triển khai sau.`);
        }
    });
});

// CTA button interactions
document.querySelectorAll('.cta .btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        if (this.textContent.includes('miễn phí')) {
            alert('Chức năng đăng ký dùng thử miễn phí sẽ được triển khai sau.');
        } else {
            alert('Chức năng liên hệ tư vấn sẽ được triển khai sau.');
        }
    });
});

// Hero button interactions
document.querySelectorAll('.hero .btn').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
        if (this.textContent.includes('miễn phí')) {
            alert('Chức năng đăng ký dùng thử miễn phí sẽ được triển khai sau.');
        } else {
            alert('Chức năng xem demo sẽ được triển khai sau.');
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', function() {
    const animatedElements = document.querySelectorAll('.feature-card, .benefit-item, .testimonial-card, .pricing-card');
    
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        observer.observe(el);
    });
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    function updateCounter() {
        start += increment;
        if (start < target) {
            element.textContent = Math.floor(start) + '+';
            requestAnimationFrame(updateCounter);
        } else {
            element.textContent = target + '+';
        }
    }
    
    updateCounter();
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('.stat-number');
            if (statNumber && !statNumber.classList.contains('animated')) {
                statNumber.classList.add('animated');
                animateCounter(statNumber, 1000);
            }
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', function() {
    const trustSection = document.querySelector('.trust-section');
    if (trustSection) {
        statsObserver.observe(trustSection);
    }
});

// Form validation (for future contact forms)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Utility function for showing notifications
function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Style the notification
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        padding: '15px 20px',
        borderRadius: '8px',
        color: 'white',
        fontWeight: '500',
        zIndex: '10000',
        transform: 'translateX(400px)',
        transition: 'transform 0.3s ease-out'
    });
    
    // Set background color based on type
    switch(type) {
        case 'success':
            notification.style.background = '#10b981';
            break;
        case 'error':
            notification.style.background = '#ef4444';
            break;
        case 'warning':
            notification.style.background = '#f59e0b';
            break;
        default:
            notification.style.background = '#2563eb';
    }
    
    // Add to DOM
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(400px)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Add loading states to buttons
function addLoadingState(button, originalText) {
    button.disabled = true;
    button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Đang xử lý...';
    
    setTimeout(() => {
        button.disabled = false;
        button.innerHTML = originalText;
    }, 2000);
}

// Enhanced button click handlers with loading states
document.addEventListener('DOMContentLoaded', function() {
    // Update existing button handlers to include loading states
    document.querySelectorAll('.btn-primary').forEach(button => {
        button.addEventListener('click', function(e) {
            if (!this.disabled) {
                const originalText = this.innerHTML;
                addLoadingState(this, originalText);
            }
        });
    });
});

// Keyboard navigation support
document.addEventListener('keydown', function(e) {
    // ESC key closes mobile menu (if login modal is not open)
    if (e.key === 'Escape') {
        const loginModal = document.getElementById('login-modal');
        const mobileMenu = document.getElementById('mobile-menu');
        const navMenu = document.querySelector('.nav-menu');
        
        // Only close mobile menu if login modal is not open
        if ((!loginModal || loginModal.style.display === 'none') && navMenu.classList.contains('active')) {
            mobileMenu.classList.remove('active');
            navMenu.classList.remove('active');
        }
    }
});

// Performance optimization: Lazy load images when implemented
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.remove('lazy');
                imageObserver.unobserve(img);
            }
        });
    });

    images.forEach(img => imageObserver.observe(img));
}

// Initialize lazy loading when DOM is ready
document.addEventListener('DOMContentLoaded', lazyLoadImages);

// Console welcome message
console.log('%c🏗️ ConstructVN Website', 'color: #2563eb; font-size: 20px; font-weight: bold;');
console.log('%cWebsite được phát triển bởi OpenHands AI', 'color: #6b7280; font-size: 14px;');
console.log('%cMọi tính năng tương tác sẽ được triển khai trong phiên bản tiếp theo.', 'color: #6b7280; font-size: 12px;');