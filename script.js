const video = document.querySelector(".hero-video");
const btn = document.getElementById("volumeBtn");

document.addEventListener("DOMContentLoaded", function() {
    // 1. KHÓA thao tác ngay khi web vừa load
    const body = document.body;
    
    // Khóa cuộn trang (Scroll)
    body.style.overflow = 'hidden'; 
    // Khóa bấm chuột (Click) vào mọi thứ trên trang
    body.style.pointerEvents = 'none';

    // 2. MỞ KHÓA sau 3 giây (bằng đúng thời gian animation CSS)
    setTimeout(() => {
        body.style.overflow = 'auto';      // Cho phép cuộn lại
        body.style.pointerEvents = 'auto'; // Cho phép bấm lại
    }, 3000); // 3000 mili giây = 3 giây
});

// 1. Định nghĩa 2 Icon SVG (Nét mảnh, giống style Contact Me)
const iconMute = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <line x1="23" y1="9" x2="17" y2="15"></line>
        <line x1="17" y1="9" x2="23" y2="15"></line>
    </svg>`;

const iconSound = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07"></path>
    </svg>`;

// 3. Đặt icon mặc định ban đầu (Mute)
btn.innerHTML = iconMute;

// --- XỬ LÝ ÂM THANH VIDEO ---

// 1. Sự kiện CLICK nút loa
btn.addEventListener('click', function() {
    video.muted = !video.muted; // Đảo ngược trạng thái
    
    if (video.muted) {
        btn.innerHTML = iconMute;
    } else {
        btn.innerHTML = iconSound;
        // QUAN TRỌNG: Phải reset âm lượng về 100% khi người dùng bật tiếng
        // Nếu không có dòng này, volume vẫn bằng 0 do lúc lướt xuống đã bị giảm
        video.volume = 1; 
    }
});

// 2. Sự kiện SCROLL (Làm nhỏ dần tiếng khi lướt đi)
window.addEventListener("scroll", () => {
    if (!video) return;

    const rect = video.getBoundingClientRect();
    const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
    const percentVisible = Math.max(0, Math.min(visibleHeight / rect.height, 1));

    // Logic:
    // Nếu video đang được bật tiếng (không mute) -> chỉnh volume theo độ hiển thị
    // Điều này giúp tạo hiệu ứng Fade in/out khi lướt lên xuống
    if (!video.muted) {
        video.volume = percentVisible;
    }

    // Nếu video bị khuất hoàn toàn (0%) -> Tự động Mute để tiết kiệm tài nguyên
    if (percentVisible <= 0 && !video.muted) {
        video.muted = true;
        btn.innerHTML = iconMute;
    }
});

// 1. Lấy danh sách tất cả các nút trong menu
const navLinks = document.querySelectorAll('.nav-link');

// 2. Lặp qua từng nút để gán sự kiện click
navLinks.forEach(link => {
    link.addEventListener('click', function() {
        
        // Bước A: Xóa class 'active' ở TẤT CẢ các nút (để reset về màu xám)
        navLinks.forEach(nav => nav.classList.remove('active'));
        
        // Bước B: Thêm class 'active' vào nút VỪA ĐƯỢC BẤM (để chuyển sang màu đen)
        this.classList.add('active');
    });
});

const sections = document.querySelectorAll('section');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        // -150 là khoảng bù trừ cho chiều cao của thanh navbar cố định
        if (pageYOffset >= (sectionTop - 150)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        // So sánh href của link với id của section hiện tại
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});

/* ---------------------------------------------- */
    document.addEventListener("DOMContentLoaded", function() {
        // Tạo một bộ theo dõi (Observer)
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                // Nếu phần tử xuất hiện trong màn hình
                if (entry.isIntersecting) {
                    // Thêm class .active để kích hoạt CSS hiện lên
                    entry.target.classList.add('active');
                }
            });
        }, {
            threshold: 0.1 // Chỉ cần hiện 10% là bắt đầu hiệu ứng
        });

        // Chọn tất cả các phần tử có class .reveal-item để theo dõi
        const hiddenElements = document.querySelectorAll('.reveal-item');
        hiddenElements.forEach((el) => observer.observe(el));
    });