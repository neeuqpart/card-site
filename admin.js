// Load settings on page load
function loadSettings() {
    const savedData = localStorage.getItem('cardSiteData');
    
    if (savedData) {
        const data = JSON.parse(savedData);
        
        // Load site settings
        document.getElementById('site-title').value = data.siteTitle;
        document.getElementById('site-subtitle').value = data.siteSubtitle;
        
        // Load cards
        renderCardEditors(data.cards);
    } else {
        // Load default data
        const defaultData = {
            siteTitle: 'Welcome to My Page',
            siteSubtitle: 'Explore my cards below',
            cards: [
                {
                    id: Date.now(),
                    icon: '🚀',
                    title: 'Projects',
                    description: 'Check out my latest projects and open source contributions.',
                    link: 'https://github.com/neeuqpart',
                    linkText: 'View Projects'
                }
            ]
        };
        
        localStorage.setItem('cardSiteData', JSON.stringify(defaultData));
        loadSettings();
    }
}

// Render card editors
function renderCardEditors(cards) {
    const container = document.getElementById('cards-editor');
    container.innerHTML = '';
    
    cards.forEach((card, index) => {
        const cardEditor = createCardEditor(card, index);
        container.appendChild(cardEditor);
    });
}

// Create a card editor
function createCardEditor(card, index) {
    const editorDiv = document.createElement('div');
    editorDiv.className = 'card-editor';
    editorDiv.dataset.cardId = card.id;
    
    editorDiv.innerHTML = `
        <div class="card-editor-header">
            <h3>Card ${index + 1}</h3>
            <button class="remove-card-btn" onclick="removeCard(${card.id})">Remove</button>
        </div>
        <div class="form-group">
            <label>Icon (Emoji)</label>
            <input type="text" class="card-icon" value="${card.icon}" maxlength="2" placeholder="🚀">
        </div>
        <div class="form-group">
            <label>Title</label>
            <input type="text" class="card-title" value="${card.title}" placeholder="Card Title">
        </div>
        <div class="form-group">
            <label>Description</label>
            <textarea class="card-description" placeholder="Card description">${card.description}</textarea>
        </div>
        <div class="form-group">
            <label>Link URL</label>
            <input type="url" class="card-link" value="${card.link}" placeholder="https://example.com">
        </div>
        <div class="form-group">
            <label>Link Text</label>
            <input type="text" class="card-link-text" value="${card.linkText}" placeholder="Learn More">
        </div>
    `;
    
    return editorDiv;
}

// Add a new card
function addNewCard() {
    const savedData = localStorage.getItem('cardSiteData');
    const data = JSON.parse(savedData);
    
    const newCard = {
        id: Date.now(),
        icon: '✨',
        title: 'New Card',
        description: 'Add your description here',
        link: '#',
        linkText: 'Learn More'
    };
    
    data.cards.push(newCard);
    localStorage.setItem('cardSiteData', JSON.stringify(data));
    
    renderCardEditors(data.cards);
}

// Remove a card
function removeCard(cardId) {
    if (!confirm('Are you sure you want to remove this card?')) {
        return;
    }
    
    const savedData = localStorage.getItem('cardSiteData');
    const data = JSON.parse(savedData);
    
    data.cards = data.cards.filter(card => card.id !== cardId);
    localStorage.setItem('cardSiteData', JSON.stringify(data));
    
    renderCardEditors(data.cards);
}

// Save settings
function saveSettings() {
    const siteTitle = document.getElementById('site-title').value;
    const siteSubtitle = document.getElementById('site-subtitle').value;
    
    const cards = [];
    const cardEditors = document.querySelectorAll('.card-editor');
    
    cardEditors.forEach(editor => {
        const cardId = parseInt(editor.dataset.cardId);
        const icon = editor.querySelector('.card-icon').value;
        const title = editor.querySelector('.card-title').value;
        const description = editor.querySelector('.card-description').value;
        const link = editor.querySelector('.card-link').value;
        const linkText = editor.querySelector('.card-link-text').value;
        
        cards.push({
            id: cardId,
            icon: icon,
            title: title,
            description: description,
            link: link,
            linkText: linkText
        });
    });
    
    const data = {
        siteTitle: siteTitle,
        siteSubtitle: siteSubtitle,
        cards: cards
    };
    
    localStorage.setItem('cardSiteData', JSON.stringify(data));
    
    // Show success message
    const successMessage = document.getElementById('success-message');
    successMessage.classList.add('show');
    
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 3000);
}

// Reset to default
function resetToDefault() {
    if (!confirm('Are you sure you want to reset to default settings? This will delete all your current content.')) {
        return;
    }
    
    localStorage.removeItem('cardSiteData');
    location.reload();
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', loadSettings);
