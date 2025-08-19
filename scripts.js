// Global variables
let currentTool = null;
let timerInterval = null;
let stopwatchInterval = null;
let timerTime = 0;
let stopwatchTime = 0;
let isTimerRunning = false;
let isStopwatchRunning = false;

// Tools data
const tools = [
    {
        id: 'qr-generator',
        name: 'QR Code Generator',
        icon: '📱',
        description: 'Generate QR codes for text, URLs, or any data',
        category: 'productivity'
    },
    {
        id: 'password-generator',
        name: 'Password Generator',
        icon: '🔐',
        description: 'Create secure passwords with customizable options',
        category: 'security'
    },
    {
        id: 'calendar',
        name: 'Calendar',
        icon: '📅',
        description: 'Interactive monthly calendar view',
        category: 'productivity'
    },
    {
        id: 'calculator',
        name: 'Calculator',
        icon: '🧮',
        description: 'Basic arithmetic calculator',
        category: 'productivity'
    },
    {
        id: 'unit-converter',
        name: 'Unit Converter',
        icon: '📏',
        description: 'Convert between different units of measurement',
        category: 'productivity'
    },
    {
        id: 'text-converter',
        name: 'Text Case Converter',
        icon: '🔤',
        description: 'Transform text between different cases',
        category: 'text'
    },
    {
        id: 'timer',
        name: 'Timer & Stopwatch',
        icon: '⏱️',
        description: 'Countdown timer and precision stopwatch',
        category: 'productivity'
    },
    {
        id: 'color-picker',
        name: 'Color Picker',
        icon: '🎨',
        description: 'Pick colors and get hex/RGB values',
        category: 'design'
    },
    {
        id: 'base64',
        name: 'Base64 Encoder/Decoder',
        icon: '🔒',
        description: 'Encode and decode text to/from Base64',
        category: 'text'
    },
    {
        id: 'word-counter',
        name: 'Word Counter',
        icon: '📝',
        description: 'Count words, characters, and sentences',
        category: 'text'
    }
];

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    renderTools();
    setupEventListeners();
});

// Render tools grid
function renderTools(filteredTools = tools) {
    const toolsGrid = document.getElementById('toolsGrid');
    if (!toolsGrid) return;
    
    toolsGrid.innerHTML = '';
    
    filteredTools.forEach(tool => {
        const toolCard = document.createElement('div');
        toolCard.className = 'tool-card';
        toolCard.onclick = () => openTool(tool.id);
        
        toolCard.innerHTML = `
            <span class="tool-icon">${tool.icon}</span>
            <h3 class="tool-name">${tool.name}</h3>
            <p class="tool-description">${tool.description}</p>
            <span class="tool-category">${tool.category}</span>
        `;
        
        toolsGrid.appendChild(toolCard);
    });
}

// Setup event listeners
function setupEventListeners() {
    // Search functionality
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    // Category filtering
    const categoryBtns = document.querySelectorAll('.category-btn');
    categoryBtns.forEach(btn => {
        btn.addEventListener('click', handleCategoryFilter);
    });
    
    // Modal close
    const modal = document.getElementById('modal');
    const closeBtn = document.getElementById('closeModal');
    const backdrop = document.querySelector('.modal-backdrop');
    
    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (backdrop) backdrop.addEventListener('click', closeModal);
    
    // Close modal on Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Handle search
function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    const clearBtn = document.getElementById('clearSearch');
    
    // Show/hide clear button
    if (searchTerm.length > 0) {
        clearBtn.style.display = 'flex';
    } else {
        clearBtn.style.display = 'none';
    }
    
    const activeCategory = document.querySelector('.category-btn.active').dataset.category;
    
    let filteredTools = tools.filter(tool => 
        tool.name.toLowerCase().includes(searchTerm) ||
        tool.description.toLowerCase().includes(searchTerm)
    );
    
    if (activeCategory !== 'all') {
        filteredTools = filteredTools.filter(tool => tool.category === activeCategory);
    }
    
    renderTools(filteredTools);
}

// Clear search function
function clearSearch() {
    const searchInput = document.getElementById('searchInput');
    const clearBtn = document.getElementById('clearSearch');
    
    searchInput.value = '';
    clearBtn.style.display = 'none';
    
    // Re-filter with current category
    const activeCategory = document.querySelector('.category-btn.active').dataset.category;
    let filteredTools = tools;
    
    if (activeCategory !== 'all') {
        filteredTools = filteredTools.filter(tool => tool.category === activeCategory);
    }
    
    renderTools(filteredTools);
}

// Handle category filtering
function handleCategoryFilter(e) {
    const category = e.target.dataset.category;
    const searchTerm = document.getElementById('searchInput')?.value.toLowerCase() || '';
    
    // Update active button
    document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('active'));
    e.target.classList.add('active');
    
    let filteredTools = tools;
    
    if (category !== 'all') {
        filteredTools = filteredTools.filter(tool => tool.category === category);
    }
    
    if (searchTerm) {
        filteredTools = filteredTools.filter(tool => 
            tool.name.toLowerCase().includes(searchTerm) ||
            tool.description.toLowerCase().includes(searchTerm)
        );
    }
    
    renderTools(filteredTools);
}

// Open tool modal
function openTool(toolId) {
    currentTool = toolId;
    const tool = tools.find(t => t.id === toolId);
    if (!tool) return;
    
    const modal = document.getElementById('modal');
    const modalTitle = document.getElementById('modalTitle');
    const modalBody = document.getElementById('modalBody');
    
    modalTitle.textContent = tool.name;
    modalBody.innerHTML = getToolInterface(toolId);
    
    modal.classList.add('active');
    
    // Initialize tool-specific functionality
    initializeTool(toolId);
}

// Close modal
function closeModal() {
    const modal = document.getElementById('modal');
    modal.classList.remove('active');
    
    // Clean up tool-specific resources
    cleanupTool(currentTool);
    currentTool = null;
}

// Get tool interface HTML
function getToolInterface(toolId) {
    switch (toolId) {
        case 'qr-generator':
            return getQRGeneratorInterface();
        case 'password-generator':
            return getPasswordGeneratorInterface();
        case 'calendar':
            return getCalendarInterface();
        case 'calculator':
            return getCalculatorInterface();
        case 'unit-converter':
            return getUnitConverterInterface();
        case 'text-converter':
            return getTextConverterInterface();
        case 'timer':
            return getTimerInterface();
        case 'color-picker':
            return getColorPickerInterface();
        case 'base64':
            return getBase64Interface();
        case 'word-counter':
            return getWordCounterInterface();
        default:
            return '<p>Tool not found</p>';
    }
}

// Initialize tool
function initializeTool(toolId) {
    switch (toolId) {
        case 'calendar':
            initializeCalendar();
            break;
        case 'calculator':
            initializeCalculator();
            break;
        case 'timer':
            initializeTimer();
            break;
        case 'color-picker':
            initializeColorPicker();
            break;
    }
}

// Cleanup tool
function cleanupTool(toolId) {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    if (stopwatchInterval) {
        clearInterval(stopwatchInterval);
        stopwatchInterval = null;
    }
    isTimerRunning = false;
    isStopwatchRunning = false;
}

// Utility functions
function copyToClipboard(text, button) {
    navigator.clipboard.writeText(text).then(() => {
        const originalText = button.textContent;
        button.textContent = 'Copied!';
        button.style.background = '#10B981';
        setTimeout(() => {
            button.textContent = originalText;
            button.style.background = '';
        }, 2000);
    }).catch(err => {
        console.error('Failed to copy text: ', err);
        // Fallback for browsers that don't support clipboard API
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        try {
            document.execCommand('copy');
            const originalText = button.textContent;
            button.textContent = 'Copied!';
            button.style.background = '#10B981';
            setTimeout(() => {
                button.textContent = originalText;
                button.style.background = '';
            }, 2000);
        } catch (err) {
            console.error('Fallback copy failed: ', err);
        }
        document.body.removeChild(textArea);
    });
}

function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    
    if (hours > 0) {
        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}