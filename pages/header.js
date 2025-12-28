document.addEventListener("DOMContentLoaded", function () {
    loadHeader();
});

function loadHeader() {
    const headerPlaceholder = document.getElementById("header-placeholder");
    if (!headerPlaceholder) return;
    const isPagesDir = window.location.pathname.includes('/pages/');
    const basePath = isPagesDir ? '../' : '';
    const loginUrl = "https://admin-nobar.alibagherpour-dev.ir/index.html"; 
    const headerHTML = `
    <!-- منوی موبایل -->
    <div id="mobile-menu-overlay" onclick="toggleMenu()" class="fixed inset-0 bg-black/50 z-40 hidden transition-opacity backdrop-blur-sm"></div>
    <div id="mobile-menu" class="fixed top-0 right-0 h-full w-72 bg-white z-50 transform translate-x-full transition-transform duration-300 ease-in-out lg:hidden shadow-2xl flex flex-col">
        <div class="p-4 flex justify-between items-center border-b bg-gray-50">
            <a href="${basePath}index.html">
                <div class="flex items-center gap-2">
                    <img src="https://cdn-icons-png.flaticon.com/512/2913/2913520.png" alt="Logo" class="h-8 w-8">
                    <span class="font-bold text-brand-dark">منوی اصلی</span>
                </div>
            </a>
            <button onclick="toggleMenu()" class="text-gray-500 hover:text-red-500 w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-200 transition">
                <i class="fas fa-times text-xl"></i>
            </button>
        </div>
        <nav class="flex-1 overflow-y-auto p-4 flex flex-col gap-2">
            <a href="${basePath}index.html" class="flex items-center gap-3 p-3 text-gray-700 hover:bg-blue-50 hover:text-brand-cyan rounded-lg transition">
                <i class="fas fa-home w-5 text-center text-gray-400"></i> خانه
            </a>
            <a href="${basePath}pages/about-us.html" class="flex items-center gap-3 p-3 text-gray-700 hover:bg-blue-50 hover:text-brand-cyan rounded-lg transition">
                <i class="fas fa-info-circle w-5 text-center text-gray-400"></i> معرفی موسسه
            </a>
            <a href="${basePath}pages/contact.html" class="flex items-center gap-3 p-3 text-gray-700 hover:bg-blue-50 hover:text-brand-cyan rounded-lg transition">
                <i class="fas fa-handshake w-5 text-center text-gray-400"></i> تماس با ما
            </a>
            <a href="${basePath}pages/news_events.html" class="flex items-center gap-3 p-3 text-gray-700 hover:bg-blue-50 hover:text-primary rounded-lg transition font-medium">
                <i class="fas fa-newspaper w-5 text-center text-gray-400"></i> اخبار
            </a>
            <a href="${basePath}pages/gallery.html" class="flex items-center gap-3 p-3 text-gray-700 hover:bg-blue-50 hover:text-primary rounded-lg transition font-medium">
                <i class="fas fa-images w-5 text-center text-gray-400"></i> گالری تصاویر
            </a>
        </nav>
        <div class="p-4 border-t bg-gray-50" id="mobile-auth-section">
        </div>
    </div>
    <header class="bg-white shadow-sm sticky top-0 z-30 w-full">
        <div class="container mx-auto px-4 py-3 h-20 flex justify-between items-center">
            <div class="flex items-center gap-8 md:gap-12">
                <a href="${basePath}index.html" class="flex items-center gap-2 group shrink-0">
                    <div class="text-2xl font-black text-brand-dark flex flex-col items-center leading-none">
                        <span>NOBAR</span>
                        <span class="text-xs font-normal group-hover:text-brand-cyan transition">CHARITY</span>
                    </div>
                    <img src="https://cdn-icons-png.flaticon.com/512/2913/2913520.png" alt="Logo" class="h-10 w-10 opacity-90 group-hover:scale-110 transition">
                </a>
                <nav class="hidden lg:flex items-center gap-6 text-sm font-bold text-gray-600">
                    <a href="${basePath}index.html" class="hover:text-brand-cyan transition relative py-2 group">
                        خانه
                        <span class="absolute bottom-0 right-0 w-0 h-0.5 bg-brand-cyan transition-all group-hover:w-full"></span>
                    </a>
                    <a href="${basePath}pages/about-us.html" class="hover:text-brand-cyan transition relative py-2 group">
                        معرفی موسسه
                        <span class="absolute bottom-0 right-0 w-0 h-0.5 bg-brand-cyan transition-all group-hover:w-full"></span>
                    </a>
                    <a href="${basePath}pages/news_events.html" class="hover:text-brand-cyan transition relative py-2 group">
                        اخبار
                        <span class="absolute bottom-0 right-0 w-0 h-0.5 bg-brand-cyan transition-all group-hover:w-full"></span>
                    </a>
                    <a href="${basePath}pages/gallery.html" class="hover:text-brand-cyan transition relative py-2 group">
                        گالری تصاویر
                        <span class="absolute bottom-0 right-0 w-0 h-0.5 bg-brand-cyan transition-all group-hover:w-full"></span>
                    </a>
                    <a href="${basePath}pages/contact.html" class="hover:text-brand-cyan transition relative py-2 group">
                        تماس با ما
                        <span class="absolute bottom-0 right-0 w-0 h-0.5 bg-brand-cyan transition-all group-hover:w-full"></span>
                    </a>
                </nav>
            </div>
            <div class="flex items-center gap-4" id="cart-menu">
                <div id="desktop-auth-section">
                </div>
                <button class="lg:hidden text-2xl text-gray-600 w-10 h-10 flex items-center justify-center rounded hover:bg-gray-100 transition" onclick="toggleMenu()">
                    <i class="fas fa-bars"></i>
                </button>
            </div>
        </div>
    </header>
    `;
    headerPlaceholder.innerHTML = headerHTML;
    console.log("هدر جدید با موفقیت لود شد.");
    updateAuthButtons(loginUrl);
    setupCartButton();
}
function setupCartButton() {
    const cartMenu = document.getElementById('cart-menu');
    const currentPath = window.location.pathname.toLowerCase();
    if (currentPath.includes('iconic-gift-shop')) {
        const cartBtn = document.createElement('button');
        cartBtn.className = "hidden lg:inline-flex bg-green-600 text-white px-5 py-3 rounded-lg hover:bg-green-700 transition shadow-md font-bold text-sm items-center gap-2 ml-4";
        cartBtn.innerHTML = `
            <span>مشاهده سبد</span>
            <div id="header-badge" class="bg-white text-green-600 w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold">0</div>
        `;
        cartBtn.onclick = function() {
            if (typeof toggleCart === 'function') {
                toggleCart();
            } else {
                console.warn('تابع toggleCart پیدا نشد');
            }
        };
        cartMenu.prepend(cartBtn);
    }
}
function updateAuthButtons(loginUrl) {
    const mobileAuthSection = document.getElementById('mobile-auth-section');
    const desktopAuthSection = document.getElementById('desktop-auth-section');
    const userToken = localStorage.getItem('user_token');
    const adminToken = localStorage.getItem('admin_token');
    const isLoggedIn = userToken || adminToken;
    const dashboardText = adminToken ? "پنل مدیریت" : "داشبورد کاربری";
    const desktopClassGuest = "hidden lg:inline-flex bg-brand-dark text-white px-5 py-3 rounded-lg hover:bg-brand-cyan-dark transition shadow-md font-bold text-sm items-center gap-2";
    const desktopClassUser = "hidden lg:inline-flex bg-green-600 text-white px-5 py-2 rounded-lg hover:bg-green-700 transition shadow-md font-bold text-sm items-center gap-2";
    const mobileClassGuest = "bg-brand-dark text-white text-center py-3 rounded-lg hover:bg-opacity-90 transition block w-full shadow-md";
    const mobileClassUser = "bg-green-600 text-white text-center py-3 rounded-lg hover:bg-opacity-90 transition block w-full shadow-md";
    if (desktopAuthSection) {
        desktopAuthSection.innerHTML = isLoggedIn 
            ? `<a href="${loginUrl}" class="${desktopClassUser}"><i class="fas fa-user-circle"></i><span>${dashboardText}</span></a>`
            : `<a href="${loginUrl}" class="${desktopClassGuest}"><i class="fas fa-user"></i><span>ورود / ثبت نام</span></a>`;
    }
    if (mobileAuthSection) {
        mobileAuthSection.innerHTML = isLoggedIn
            ? `<a href="${loginUrl}" class="${mobileClassUser}"><i class="fas fa-user-circle ml-2"></i> ${dashboardText}</a>`
            : `<a href="${loginUrl}" class="${mobileClassGuest}"><i class="fas fa-sign-in-alt ml-2"></i> ورود / ثبت نام</a>`;
    }
}
window.toggleMenu = function() {
    const menu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-menu-overlay');
    if (!menu || !overlay) return;
    if (menu.classList.contains('translate-x-full')) {
        menu.classList.remove('translate-x-full');
        overlay.classList.remove('hidden');
        setTimeout(() => overlay.classList.remove('opacity-0'), 10);
        document.body.style.overflow = 'hidden';
    } else {
        menu.classList.add('translate-x-full');
        overlay.classList.add('opacity-0');
        setTimeout(() => overlay.classList.add('hidden'), 300);
        document.body.style.overflow = '';
    }
};