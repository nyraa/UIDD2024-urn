window.addEventListener("load", function() {
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                target.classList.add("animated");
                observer.unobserve(target);
            }
        },
        {
            threshold: 0.1
        });
    });
    const elements = document.querySelectorAll(".animation-required");
    elements.forEach(element => observer.observe(element));
});