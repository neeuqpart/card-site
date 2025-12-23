// Default data structure
const defaultData = {
    siteTitle: 'Welcome to My Page',
    siteSubtitle: 'Explore my cards below',
    cards: [
        {
            id: 1,
            icon: '🚀',
            title: 'Projects',
            description: 'Check out my latest projects and open source contributions.',
            link: 'https://github.com/neeuqpart',
            linkText: 'View Projects'
        },
        {
            id: 2,
            icon: '💼',
            title: 'Portfolio',
            description: 'Explore my professional work and creative endeavors.',
            link: '#',
            linkText: 'See Portfolio'
        },
        {
            id: 3,
            icon: '📧',
            title: 'Contact',
            description: 'Get in touch with me for collaborations or opportunities.',
            link: '#',
            linkText: 'Contact Me'
        },
        {
            id: 4,
            icon: '📝',
            title: 'Blog',
            description: 'Read my thoughts on technology, design, and development.',
            link: '#',
            linkText: 'Read Blog'
        }
    ]
};

// Initialize site with data from localStorage or default
function initializeSite() {
    const savedData = localStorage.getItem('cardSiteData');
    const data = savedData ? JSON.parse(savedData) : defaultData;
    
    // If no saved data, save the default data
    if (!savedData) {
        localStorage.setItem('cardSiteData', JSON.stringify(defaultData));
    }
    
    // Update site title and subtitle
    document.getElementById('site-title').textContent = data.siteTitle;
    document.getElementById('site-subtitle').textContent = data.siteSubtitle;
    
    // Render cards
    renderCards(data.cards);
}

// Render cards to the page
function renderCards(cards) {
    const container = document.getElementById('cards-container');
    container.innerHTML = '';
    
    cards.forEach(card => {
        const cardElement = createCardElement(card);
        container.appendChild(cardElement);
    });
}

// Create a card element
function createCardElement(card) {
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    
    cardDiv.innerHTML = `
        <div class="card-icon">${card.icon}</div>
        <h3>${card.title}</h3>
        <p>${card.description}</p>
        <a href="${card.link}" class="card-link" ${card.link.startsWith('http') ? 'target="_blank" rel="noopener noreferrer"' : ''}>
            ${card.linkText}
        </a>
    `;
    
    return cardDiv;
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', initializeSite);