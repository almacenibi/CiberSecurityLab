// === DATA INDEX (CONFIGURAR CON TODOS LOS TEMAS) ===
const searchIndex = [
    {
        id: 1,
        title: "Unidad 1 - Los Cimientos de la IA",
        url: "temas/tema1.html",
        keywords: "cimientos ia definición historia turing algoritmo paradigma"
    },
    {
        id: 2,
        title: "Unidad 2 - Machine Learning: el motor de la predicción",
        url: "temas/tema2.html",
        keywords: "ml machine learning supervisado no supervisado regresión clasificación clustering mlops"
    },
    {
        id: 3,
        title: "Unidad 3 - Deep Learning y la intuición de la máquina",
        url: "temas/tema3.html",
        keywords: "deep learning redes neuronales cnn rnn perceptrón capa oculta"
    },
    {
        id: 4,
        title: "Unidad 4 - La Revolución Generativa y los transformers",
        url: "temas/tema4.html",
        keywords: "transformers gpt llm generativa atención contexto chatgpt"
    },
    {
        id: 5,
        title: "Unidad 5 - IA como activo estratégico",
        url: "temas/tema5.html",
        keywords: "estrategia activo competitivo roi transformación digital"
    },
    {
        id: 6,
        title: "Unidad 6 - IA en la Cadena de Suministro y Operaciones",
        url: "temas/tema6.html",
        keywords: "cadena suministro logística predicción demanda operaciones"
    },
    {
        id: 7,
        title: "Unidad 7 - Marketing de Precisión y Experiencia del Cliente",
        url: "temas/tema7.html",
        keywords: "marketing precisión cliente experiencia clv segmentación"
    },
    {
        id: 8,
        title: "Unidad 8 - Finanzas, Riesgos e Inversión en IA",
        url: "temas/tema8.html",
        keywords: "finanzas riesgo fraude scoring trading algorítmico"
    },
    {
        id: 9,
        title: "Unidad 9 - Product Management para IA",
        url: "temas/tema9.html",
        keywords: "product management productos no deterministas métricas"
    },
    {
        id: 10,
        title: "Unidad 10 - Estrategia de IA y Transformación Organizacional",
        url: "temas/tema10.html",
        keywords: "estrategia organización transformación liderazgo"
    },
    {
        id: 11,
        title: "Unidad 11 - Ética, Gobernanza y Riesgos Corporativos",
        url: "temas/tema11.html",
        keywords: "ética gobernanza riesgos regulacion sesgo xai"
    },
    {
        id: 12,
        title: "Unidad 12 - Liderazgo Aumentado y el Futuro del Management",
        url: "temas/tema12.html",
        keywords: "liderazgo aumento futuro management humano máquina"
    }
];

// === INICIALIZAR BUSCADOR GLOBAL ===
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('globalSearch');
    const searchResults = document.getElementById('searchResults');
    
    if (!searchInput || !searchResults) return;
    
    // Mostrar resultados al escribir
    searchInput.addEventListener('input', function() {
        const query = this.value.trim().toLowerCase();
        
        if (query.length < 2) {
            searchResults.classList.remove('active');
            return;
        }
        
        const filtered = searchIndex.filter(item => 
            item.title.toLowerCase().includes(query) ||
            item.keywords.includes(query)
        );
        
        displayResults(filtered, searchResults);
    });
    
    // Cerrar al hacer click fuera
    document.addEventListener('click', function(e) {
        if (!searchInput.contains(e.target) && !searchResults.contains(e.target)) {
            searchResults.classList.remove('active');
        }
    });
    
    // Limpiar con Escape
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            searchResults.classList.remove('active');
            this.value = '';
        }
    });
});

// === MOSTRAR RESULTADOS ===
function displayResults(results, container) {
    if (results.length === 0) {
        container.innerHTML = '<div class="search-item">No se encontraron resultados</div>';
        container.classList.add('active');
        return;
    }
    
    const html = results.map(item => `
        <a href="${item.url}" class="search-item fade-in">
            ${highlightMatch(item.title)}
        </a>
    `).join('');
    
    container.innerHTML = html;
    container.classList.add('active');
}

// === DESTACAR TERMINOS ENCONTRADOS ===
function highlightMatch(text) {
    const query = document.getElementById('globalSearch').value.toLowerCase();
    if (!query) return escapeHtml(text);
    
    const regex = new RegExp(`(${escapeRegExp(query)})`, 'gi');
    return escapeHtml(text).replace(regex, '<strong>$1</strong>');
}

// === ESCAPE HTML ===
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// === ESCAPE REGEXP ===
function escapeRegExp(string) {
    return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}