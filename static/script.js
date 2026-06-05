document.addEventListener("DOMContentLoaded", () => {
    // Lock background viewport instantly
    document.body.classList.add("workspace-locked");

    const loaderShield = document.getElementById("portfolio-cinematic-loader");
    const progressFill = document.getElementById("loader-progress-fill");
    const percentCounter = document.getElementById("loader-percentage-counter");
    const statusLabel = document.getElementById("loader-status-text");
    const heroVideo = document.getElementById('hero-scrub-video');

    const loaderStartTime = Date.now();
    const MINIMUM_LOADER_MS = 2000; 

    function updateProgressUI(calculatedPercent, stateText) {
        const roundedPercent = Math.min(Math.max(Math.round(calculatedPercent), 0), 100);
        if (progressFill) progressFill.style.width = `${roundedPercent}%`;
        if (percentCounter) percentCounter.innerText = `${roundedPercent}%`;
        if (stateText && statusLabel) statusLabel.innerText = stateText;
    }

  
    function terminateLoaderSystem() {
        updateProgressUI(100, "Workspace alignment secure.");

        const elapsedTime = Date.now() - loaderStartTime;
        const remainingTime = Math.max(0, MINIMUM_LOADER_MS - elapsedTime);

        // Transition the curtain away smoothly
        setTimeout(() => {
            if (loaderShield) {
                loaderShield.classList.add("workspace-ready");
                loaderShield.style.opacity = "0";
                loaderShield.style.pointerEvents = "none";
                setTimeout(() => { loaderShield.style.display = "none"; }, 800);
            }
            document.body.classList.remove("workspace-locked");
        }, remainingTime);
    }

    // --- TRUE PROGRESS Asset Pipeline Engine ---
    function preloadHeroVideoAsset(videoUrl) {
        updateProgressUI(0, "Connecting to media stream...");

        const xhr = new XMLHttpRequest();
        xhr.open('GET', videoUrl, true);
        xhr.responseType = 'blob'; // Forces full binary file compilation into cache

        // Fires repeatedly as data bytes travel over the wire
        xhr.onprogress = (event) => {
            if (event.lengthComputable) {
                const percentage = (event.loaded / event.total) * 100;
                // Leave 5% breathing room for final hardware initialization handshakes
                const scalingUiPercent = percentage * 0.95; 
                updateProgressUI(scalingUiPercent, "Buffering cinematic matrices...");
            }
        };

        xhr.onload = () => {
            if (xhr.status === 200) {
                updateProgressUI(95, "Frames loaded. Synchronizing hardware...");
                
                // Convert downloaded data directly into an instant internal browser URL
                const videoBlob = xhr.response;
                const blobUrl = URL.createObjectURL(videoBlob);
                
                if (heroVideo) {
                    heroVideo.src = blobUrl;
                    heroVideo.load();
                    heroVideo.currentTime = 0;
                }
                
                terminateLoaderSystem();
            } else {
                fallbackNativeInitialization();
            }
        };

        xhr.onerror = () => {
            fallbackNativeInitialization();
        };

        xhr.send();
    }

    function fallbackNativeInitialization() {
        console.warn("XHR pipeline bypassed. Falling back to native rendering streams.");
        if (heroVideo) {
            heroVideo.load();
        }
        terminateLoaderSystem();
    }

    // Trigger the real-time progressive loader using the exact asset path
    preloadHeroVideoAsset("static/COFFEE_optimized.mp4");


    const landingHero = document.getElementById('landing-hero');
    
    if (heroVideo) {
        heroVideo.style.transform = 'translate3d(0,0,0)';
        heroVideo.style.backfaceVisibility = 'hidden';
        heroVideo.style.webkitBackfaceVisibility = 'hidden';
    }

    let targetTime = 0;   
    let currentTime = 0;  
    const ease = 0.08; 

    function syncHeroVideoScroll() {
        if (!landingHero || !heroVideo || isNaN(heroVideo.duration)) return;
        
        const scrollY = window.scrollY;
        const sectionHeight = landingHero.offsetHeight;
        const windowHeight = window.innerHeight;
        
        if (scrollY > sectionHeight + 100) return;
        
        const scrollRange = sectionHeight - windowHeight;
        if (scrollRange <= 0) return;
        
        let ratio = Math.max(0, Math.min(scrollY / scrollRange, 1));
        targetTime = ratio * heroVideo.duration;
    }

    function updateVideoScrub() {
        if (heroVideo && Math.abs(targetTime - currentTime) > 0.001) {
            currentTime += (targetTime - currentTime) * ease;
            if (!isNaN(heroVideo.duration) && Math.abs(currentTime - heroVideo.currentTime) > 0.04) {
                heroVideo.currentTime = currentTime;
            }
        }
        requestAnimationFrame(updateVideoScrub);
    }
//
    window.addEventListener('scroll', () => {
        syncHeroVideoScroll();
    }, { passive: true });

    requestAnimationFrame(updateVideoScrub);

//
    
    // Portfolio Video Autoplay Loops
    document.querySelectorAll('.video-container').forEach((container) => {
        const video = container.querySelector('.video-3d');
        if (!video) return;

        video.addEventListener('loadedmetadata', () => {
            video.loop = true;
            video.play().catch(() => {});
        });
        if (video.readyState >= 1) {
            video.loop = true;
            video.play().catch(() => {});
        }
    });

    // Accordion Dropdowns
    document.querySelectorAll(".category-trigger").forEach(trigger => {
        trigger.addEventListener("click", (e) => {
            const parentLi = e.target.parentElement;
            parentLi.classList.toggle("open");
            document.querySelectorAll(".category-group").forEach(group => {
                if (group !== parentLi) group.classList.remove("open");
            });
        });
    });

    // Image Expand Galleries
const lightbox = document.getElementById('gallery-lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.querySelector('.lightbox-close');

document.querySelectorAll('.project-gallery').forEach(grid => {
    const hiddenCount = grid.querySelectorAll('.hidden-asset').length;
    const counterCard = grid.querySelector('.counter-card');
    if (counterCard && hiddenCount > 0) {
        counterCard.setAttribute('data-plus-count', `+${hiddenCount}`);
    }
});

document.querySelectorAll('.gallery-card').forEach(card => {
    card.addEventListener('click', (e) => {
        const galleryGrid = card.closest('.project-gallery');
        if (!galleryGrid) return; // Safety check

        // BLOCK 1: Logic specifically for the Counter Card (+ X more / Minimize)
        if (card.classList.contains('counter-card')) {
            
            if (!galleryGrid.classList.contains('expanded')) {
                // If collapsed: expand it
                galleryGrid.classList.add('expanded');
            } else {
                // If already expanded: check if they clicked the bottom "minimize" area
                const rect = card.getBoundingClientRect();
                const clickY = e.clientY - rect.top; 
                
                if (clickY >= (rect.height - 45)) {
                    galleryGrid.classList.remove('expanded');
                }
            }
            
            // CRITICAL: Stop here so the counter card NEVER tries to open a lightbox
            return; 
        } 
        
        // BLOCK 2: Logic for regular image cards
        // Clicking a regular image should ALWAYS open the lightbox, 
        // regardless of whether the gallery grid is expanded or not.
        if (lightbox && lightboxImg) {
            const internalImg = card.querySelector('img');
            if (internalImg) {
                lightboxImg.src = internalImg.src;
                lightbox.style.display = 'block';
                document.body.style.overflow = 'hidden';
            }
        }
    });
});

if (closeBtn && lightbox) {
    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto';
    });
}

    // Variant Controls (Day/Night Variant buttons)
    const buttons = document.querySelectorAll('#project-car .variant-btn');
    const panels = document.querySelectorAll('#project-car .variant-panel');

    buttons.forEach(button => {
        button.addEventListener('click', () => {
            const targetVariant = button.getAttribute('data-target');
            buttons.forEach(btn => {
                if (btn.getAttribute('data-target') === targetVariant) {
                    btn.classList.add('active');
                } else {
                    btn.classList.remove('active');
                }
            });
            panels.forEach(panel => panel.classList.remove('active'));
            const targetPanel = document.getElementById(`panel-${targetVariant}`);
            if (targetPanel) targetPanel.classList.add('active');
        });
    });

    const mobileToggleBtn = document.getElementById('mobile-sidebar-toggle');
    const mainSidebarElement = document.querySelector('.sidebar');

    if (mobileToggleBtn && mainSidebarElement) {
        mobileToggleBtn.addEventListener('click', (e) => {
            e.stopPropagation(); // Prevents bubbling mismatches
            
            // Toggle active animation states across classes
            mobileToggleBtn.classList.toggle('active');
            mainSidebarElement.classList.toggle('mobile-open');
        });

        // Close the drawer automatically if a user hits a link inside it
        mainSidebarElement.querySelectorAll('.category-submenu a').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    mobileToggleBtn.classList.remove('active');
                    mainSidebarElement.classList.remove('mobile-open');
                }
            });
        });

        // Clean close hook: Tapping outside the sidebar anywhere else on screen closes it automatically
        document.addEventListener('click', (event) => {
            if (window.innerWidth <= 768 && mainSidebarElement.classList.contains('mobile-open')) {
                if (!mainSidebarElement.contains(event.target) && event.target !== mobileToggleBtn) {
                    mobileToggleBtn.classList.remove('active');
                    mainSidebarElement.classList.remove('mobile-open');
                }
            }
        });
    }
});