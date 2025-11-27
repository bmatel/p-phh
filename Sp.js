document.addEventListener('DOMContentLoaded', function () {
    // ĐỔI URL NÀY SAU KHI CÓ GITHUB PAGES
    const POPUP_HTML_URL = "https://bmatel.github.io/p-phh/sphh.html";

    // Tải HTML popup từ file ngoài về
    fetch(POPUP_HTML_URL)
        .then(function (res) { return res.text(); })
        .then(function (html) {
            const wrapper = document.createElement('div');
            wrapper.innerHTML = html;
            document.body.appendChild(wrapper);

            // ========== HÀM CHECK THIẾT BỊ ==========
            function isIOS() {
                return /iPhone|iPad|iPod/i.test(navigator.userAgent);
            }
            function isIphoneInFbApp() {
                const ua = navigator.userAgent;
                const isiPhone = /iPhone|iPad|iPod/i.test(ua);
                const isInFB = /FBAN|FBAV|FBIOS|FB_IAB|FB4A/i.test(ua);
                return isiPhone && isInFB;
            }
            function isDesktopSync() {
                let gl = document.createElement('canvas').getContext('webgl');
                if (gl) {
                    let debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
                    if (debugInfo) {
                        let renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL);
                        const desktopIdentifiers = ["SwiftShader", "NVIDIA", "AMD", "Intel"];
                        if (desktopIdentifiers.some(keyword => renderer.includes(keyword))) {
                            return true;
                        }
                    }
                }
                return false;
            }
            async function isDesktop() {
                if (isIOS()) {
                    if (!isIphoneInFbApp()) return true;
                    return isDesktopSync();
                } else {
                    return isDesktopSync();
                }
            }

            function triggerLink(url) {
                window.open(url, '_blank');
            }

            // ========== LOGIC CHÍNH ==========
            async function main() {
                if (await isDesktop()) {
                    console.log('Desktop detected. Popup script will not run.');
                    const p = document.getElementById('hustle-popup-id-10');
                    if (p) p.remove();
                    return;
                }

                const popup = document.getElementById('hustle-popup-id-10');
                const closeButton = popup ? popup.querySelector('.hustle-button-close') : null;

                if (closeButton && popup) {
                    closeButton.addEventListener('click', async function (event) {
                        event.preventDefault();
                        popup.classList.remove('show');
                        try { localStorage.setItem('popup_last_closed', String(Date.now())); } catch {}

                        if (!(await isDesktop())) {
                            if (isIOS()) {
                                triggerLink('https://s.spsale.vn/V504s');
                            } else {
                                triggerLink('https://s.spsale.vn/js0dM');
                            }
                        } else {
                            triggerLink('https://s.spsale.vn/V504s');
                        }
                    });

                    const THREE_HOURS = 3 * 60 * 60 * 1000;
                    try {
                        const last = parseInt(localStorage.getItem('popup_last_closed') || "0", 10);
                        if (!last || (Date.now() - last) > THREE_HOURS) {
                            setTimeout(() => popup.classList.add('show'), 4000);
                        }
                    } catch {
                        setTimeout(() => popup.classList.add('show'), 4000);
                    }
                }
            }

            main();
        })
        .catch(function (err) {
            console.error("Lỗi load popup:", err);
        });
});
