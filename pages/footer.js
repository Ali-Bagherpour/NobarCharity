fetch('footer.html')
  .then(response => response.text())
  .then(data => {
    document.getElementById('footer-placeholder').innerHTML = data;
  })
  .catch(error => console.error('Error loading header:', error));
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
