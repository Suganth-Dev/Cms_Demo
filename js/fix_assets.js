// MutationObserver to automatically fix relative asset paths for Dynalektric CMS integration
document.addEventListener('DOMContentLoaded', () => {
    const ASSETS_PREFIX = 'Dynalektric/demo1DL/';
    
    function fixNode(node) {
        if (node.tagName === 'IMG' && node.getAttribute('src')) {
            let src = node.getAttribute('src');
            if (src.startsWith('assets/')) {
                node.setAttribute('src', ASSETS_PREFIX + src);
            } else if (src.startsWith('./assets/')) {
                node.setAttribute('src', ASSETS_PREFIX + src.substring(2));
            }
        }
        if (node.tagName === 'SOURCE' && node.getAttribute('src')) {
            let src = node.getAttribute('src');
            if (src.startsWith('public/')) {
                node.setAttribute('src', ASSETS_PREFIX + src);
            } else if (src.startsWith('./public/')) {
                node.setAttribute('src', ASSETS_PREFIX + src.substring(2));
            }
            // If the source src was updated, we need to tell the parent video to load it
            if (node.parentNode && node.parentNode.tagName === 'VIDEO' && !node.parentNode.hasAttribute('data-fixed')) {
                node.parentNode.setAttribute('data-fixed', 'true');
                node.parentNode.load();
            }
        }
        if (node.tagName === 'VIDEO' && node.getAttribute('poster')) {
            let poster = node.getAttribute('poster');
            if (poster.startsWith('assets/')) {
                node.setAttribute('poster', ASSETS_PREFIX + poster);
            } else if (poster.startsWith('./assets/')) {
                node.setAttribute('poster', ASSETS_PREFIX + poster.substring(2));
            }
        }
        
        // Also fix <image-slot> custom element which might use 'src'
        if (node.tagName && node.tagName.toLowerCase() === 'image-slot' && node.getAttribute('src')) {
            let src = node.getAttribute('src');
            if (src.startsWith('assets/')) {
                node.setAttribute('src', ASSETS_PREFIX + src);
            } else if (src.startsWith('./assets/')) {
                node.setAttribute('src', ASSETS_PREFIX + src.substring(2));
            }
        }
    }
    
    const observer = new MutationObserver((mutations) => {
        mutations.forEach(mutation => {
            if (mutation.type === 'attributes') {
                if (['src', 'poster'].includes(mutation.attributeName)) {
                    fixNode(mutation.target);
                }
            } else if (mutation.type === 'childList') {
                mutation.addedNodes.forEach(node => {
                    if (node.nodeType === Node.ELEMENT_NODE) {
                        fixNode(node);
                        node.querySelectorAll('img, source, video, image-slot').forEach(fixNode);
                    }
                });
            }
        });
    });
    
    observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ['src', 'poster']
    });
    
    // Initial pass
    document.querySelectorAll('img, source, video, image-slot').forEach(fixNode);
});
