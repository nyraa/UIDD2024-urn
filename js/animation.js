window.addEventListener("load", function() {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            const { intersectionRect, boundingClientRect, target } = entry;
            const isFullyVisible = intersectionRect.top >= boundingClientRect.top && intersectionRect.bottom <= boundingClientRect.bottom;
            if (entry.isIntersecting && isFullyVisible) {
                const target = entry.target;
                target.classList.add("animated");
                observer.unobserve(target);
            }
        },
        {
            threshold: 1,
            rootMargin: "-50%",
            root: null
        });
    });
    const elements = document.querySelectorAll(".animation-required");
    elements.forEach(element => observer.observe(element));
});