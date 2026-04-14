document.addEventListener('DOMContentLoaded', () => {

    // 1. スクロール監視（文字を出すアニメーション）
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.scroll-reveal, .reveal-text, .fade-in').forEach(el => {
        observer.observe(el);
    });

    // 2. スクロール連動ギミック（巨大文字）
    window.addEventListener('scroll', () => {
        const scrolled = window.scrollY;
        const sideText = document.querySelector('.side-scroll-text');
        if (sideText) {
            sideText.style.transform = `translateX(${scrolled * 0.15}px)`;
        }
    });

    // 3. サイト全体のマウス追従（ここに集約しました！）
    const light = document.querySelector('.cursor-light');
    let mouseX = 0, mouseY = 0;
    let lightX = 0, lightY = 0;

    // 画面全体でマウスを監視
    window.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // animate関数の中身をこれに書き換えてください
function animate() {
    // 追従を少し遅らせてヌルヌルさせる
    lightX += (mouseX - lightX) * 0.15;
    lightY += (mouseY - lightY) * 0.15;

    if (light) {
        // left/topではなく、transformだけで位置を決める（これが一番バグらない）
        light.style.transform = `translate3d(${lightX}px, ${lightY}px, 0) translate(-50%, -50%)`;
    }
    requestAnimationFrame(animate);
}
    animate();
});

// 4. パネル展開
function expandPanel(selectedPanel) {
    document.querySelectorAll('.panel').forEach(panel => {
        panel.classList.remove('active');
    });
    selectedPanel.classList.add('active');
}