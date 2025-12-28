const API_BASE = 'https://charity-backend.alibagerpour2.workers.dev';
async function fetchNews() {
    const container = document.getElementById('news-container');
    if (API_BASE.includes('YOUR_SUBDOMAIN')) {
        container.innerHTML = `<div class="col-span-full text-center text-red-500 bg-red-100 p-4 rounded-lg">خطا: لطفاً آدرس API_BASE را در کد HTML تنظیم کنید.</div>`;
        return;
    }
    try {
        const response = await fetch(`${API_BASE}/api/news`);
        if (!response.ok) throw new Error('خطا در شبکه'); 
        const newsList = await response.json();
        container.innerHTML = '';
        if (newsList.length === 0) {
            container.innerHTML = `<div class="col-span-full text-center text-gray-500 py-10 border-2 border-dashed border-gray-300 rounded-xl">هنوز خبری ثبت نشده است.</div>`;
            return;
        }
        newsList.forEach(news => {
            const date = new Date(news.created_at).toLocaleDateString('fa-IR');
            const link = `pages/news_detail.html?id=${news.id}`;
            let excerpt = news.content.substring(0, 100);
            if (news.content.length > 100) excerpt += '...';
            const imgUrl = news.image_url || 'https://placehold.co/600x400?text=خبر';
            container.innerHTML += `
                <div class="bg-white rounded-2xl overflow-hidden shadow-card hover:shadow-lg transition border border-gray-100 flex flex-col h-full group transform hover:-translate-y-1 duration-300">
                    <a href="${link}" class="block h-48 overflow-hidden relative bg-gray-200">
                        <img src="${imgUrl}" class="w-full h-full object-cover group-hover:scale-110 transition duration-500" onerror="this.src='https://placehold.co/600x400?text=تصویر'">
                        <div class="absolute top-3 right-3 bg-white/90 backdrop-blur text-xs font-bold text-gray-700 px-3 py-1 rounded-full shadow-sm flex items-center gap-1">
                            <span class="w-1.5 h-1.5 bg-primary rounded-full"></span>
                            ${date}
                        </div>
                    </a>
                    <div class="p-5 flex-1 flex flex-col">
                        <a href="${link}">
                            <h3 class="text-lg font-bold text-darkblue mb-2 hover:text-primary transition line-clamp-2 leading-snug">${news.title}</h3>
                        </a>
                        <p class="text-gray-500 text-sm leading-7 mb-4 line-clamp-3 flex-1 text-justify">${excerpt}</p>
                        <a href="${link}" class="text-primary font-bold text-sm flex items-center gap-1 hover:gap-2 transition-all mt-auto self-start bg-primary/5 px-4 py-2 rounded-lg hover:bg-primary hover:text-white">
                            مشاهده کامل
                            <svg class="w-4 h-4 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 19l-7-7m0 0l7-7m-7 7h18"/></svg>
                        </a>
                    </div>
                </div>
            `;
        });
    } catch (error) {
        console.error(error);
        container.innerHTML = `<div class="col-span-full text-center text-red-500 bg-white p-8 rounded-xl shadow-sm">خطا در دریافت اطلاعات. لطفا اینترنت خود را بررسی کنید.</div>`;
    }
}

function toggleMenu() {
    const menu = document.getElementById('mobile-menu');
    const overlay = document.getElementById('mobile-menu-overlay');
    if (menu.classList.contains('translate-x-full')) {
        menu.classList.remove('translate-x-full');
        overlay.classList.remove('hidden');
        document.body.style.overflow = 'hidden'; // Prevent scrolling
    } else {
        menu.classList.add('translate-x-full');
        overlay.classList.add('hidden');
        document.body.style.overflow = ''; // Enable scrolling
    }
}

fetchNews();

function copyText(text, element) {
    const textArea = document.createElement("textarea");
    const valueToCopy = element.getAttribute('data-value') || text;
    textArea.value = valueToCopy;
    document.body.appendChild(textArea);
    textArea.select();
    try {
        document.execCommand('copy');
        showToast('کپی شد!');
        const originalCl = element.style.color;
        element.style.color = '#000000ff';
        setTimeout(() => {
          element.style.color = originalCl;
        });
        const originalBg = element.style.backgroundColor;
        element.style.backgroundColor = '#dcfce7';
        setTimeout(() => {
            element.style.backgroundColor = originalBg;
        }, 300);
        
    } catch (err) {
        console.error('Unable to copy', err);
        showToast('خطا در کپی');
    }
    document.body.removeChild(textArea);
}

function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.remove('translate-y-20', 'opacity-0');
    setTimeout(() => {
        toast.classList.add('translate-y-20', 'opacity-0');
    }, 2000);
}