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
    
    // === SHOW/HIDE SOLUCIÓN (CASOS PRÁCTICOS) ===
    document.querySelectorAll('.solution-toggle').forEach(btn => {
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            // El panel NO es hermano del botón: subimos al .case-card y buscamos dentro
            const card = this.closest('.case-card');
            const content = card
                ? card.querySelector('.solution-content')
                : this.nextElementSibling; // fallback por si algún caso tiene otra estructura

            if (!content) {
                console.warn('No se encontró .solution-content para este botón:', this);
                return;
            }

            const abriendo = content.style.display !== 'block';
            content.style.display = abriendo ? 'block' : 'none';
            this.textContent = abriendo ? 'Ocultar Solución' : 'Ver Solución';
            this.setAttribute('aria-expanded', abriendo ? 'true' : 'false');
        });
    });
    
        // === CHECK ANSWER TEST ===
    document.querySelectorAll('.quiz-option').forEach(option => {
        option.addEventListener('click', function () {
            const parent = this.closest('.quiz-question');
            if (parent.dataset.answered === 'true') return;   // ya respondida → ignorar
            parent.dataset.answered = 'true';

            const correct = parent.dataset.answer;
            const selected = this.dataset.value;

            parent.querySelectorAll('.quiz-option').forEach(opt => {
                if (opt.dataset.value === correct) opt.classList.add('correct');
                else if (opt.dataset.value === selected) opt.classList.add('incorrect');
            });

            const evt = new CustomEvent('quizAnswered', {
                detail: { correct: selected === correct }
            });
            parent.dispatchEvent(evt);
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