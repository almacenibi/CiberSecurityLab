document.addEventListener('DOMContentLoaded', () => {
    // === SCROLL NAVAL ACTIVE ===
    const sections = document.querySelectorAll('.content-section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (sections.length > 0) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    navLinks.forEach(link => {
                        link.classList.remove('active');
                        if (link.getAttribute('href') === '#' + entry.target.id) {
                            link.classList.add('active');
                        }
                    });
                }
            });
        }, { threshold: 0.2, rootMargin: '-100px 0px -50% 0px' });
        
        sections.forEach(section => observer.observe(section));
    }
    
    // === SHOW/HIDE SOLUCIÓN ===
    document.querySelectorAll('.solution-toggle').forEach(btn => {
        btn.addEventListener('click', function() {
            const content = this.nextElementSibling;
            content.style.display = content.style.display === 'block' ? 'none' : 'block';
            this.textContent = content.style.display === 'block' ? 'Ocultar Solución' : 'Ver Solución';
        });
    });
    
    // === CHECK ANSWER TEST ===
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.addEventListener('click', function() {
            const parent = this.closest('.quiz-question');
            const correct = parent.dataset.answer;
            const selected = this.dataset.value;
            
            parent.querySelectorAll('.quiz-option').forEach(opt => {
                opt.onclick = null;
            });
            
            if (selected === correct) {
                this.classList.add('correct');
            } else {
                this.classList.add('incorrect');
                parent.querySelectorAll('.quiz-option').forEach(opt => {
                    if (opt.dataset.value === correct) {
                        opt.classList.add('correct');
                    }
                });
            }
        });
    });
    
    // === BACK TO TOP ===
    document.querySelectorAll('.back-to-top').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });
    
    // === LOCAL SEARCH GLOSARIO ===
    const localSearch = document.getElementById('localSearch');
    if (localSearch) {
        localSearch.addEventListener('input', function() {
            const query = this.value.toLowerCase();
            document.querySelectorAll('.glossary-term').forEach(term => {
                const text = term.textContent.toLowerCase();
                term.style.display = text.includes(query) ? 'block' : 'none';
            });
        });
    }
});