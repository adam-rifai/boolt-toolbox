// QR Code Generator
function getQRGeneratorInterface() {
    return `
        <div class="tool-interface">
            <button class="clear-all-btn" onclick="clearQRGenerator()">Clear All</button>
            
            <div class="input-group">
                <label for="qrText">Text or URL to encode:</label>
                <textarea id="qrText" class="tool-textarea" rows="2" placeholder="Enter text or URL..."></textarea>
            </div>
            
            <div class="input-group">
                <label for="qrSize">Size:</label>
                <select id="qrSize" class="tool-select">
                    <option value="200">200x200</option>
                    <option value="300" selected>300x300</option>
                    <option value="400">400x400</option>
                    <option value="500">500x500</option>
                </select>
            </div>
            
            <button class="tool-btn" onclick="generateQR()">Generate QR Code</button>
            
            <div id="qrOutput" style="text-align: center; margin-top: 1rem;"></div>
        </div>
    `;
}

function clearQRGenerator() {
    document.getElementById('qrText').value = '';
    document.getElementById('qrSize').value = '300';
    document.getElementById('qrOutput').innerHTML = '';
}

function generateQR() {
    const text = document.getElementById('qrText').value.trim();
    const size = parseInt(document.getElementById('qrSize').value);
    const output = document.getElementById('qrOutput');
    
    if (!text) {
        output.innerHTML = '<p style="color: #e74c3c;">Please enter text or URL to generate QR code.</p>';
        return;
    }
    
    try {
        const canvas = document.createElement('canvas');
        const qr = new window.QRious({
            element: canvas,
            value: text,
            size: size,
            background: 'white',
            foreground: 'black'
        });
        
        const downloadBtn = `<button class="tool-btn secondary" onclick="downloadQR('${canvas.toDataURL()}', 'qrcode.png')" style="margin-top: 1rem;">Download QR Code</button>`;
        
        output.innerHTML = `
            <div style="margin: 1rem 0;">
                <p style="margin-bottom: 1rem; font-weight: 600;">Generated QR Code:</p>
                ${canvas.outerHTML}
                ${downloadBtn}
            </div>
        `;
    } catch (error) {
        output.innerHTML = '<p style="color: #e74c3c;">Error generating QR code. Please try again.</p>';
    }
}

function downloadQR(dataUrl, filename) {
    const link = document.createElement('a');
    link.download = filename;
    link.href = dataUrl;
    link.click();
}

// Password Generator
function getPasswordGeneratorInterface() {
    return `
        <div class="tool-interface">
            <button class="clear-all-btn" onclick="clearPasswordGenerator()">Clear All</button>
            
            <div class="input-group">
                <label for="passwordLength">Password Length:</label>
                <div style="display: flex; align-items: center; gap: 0.5rem;">
                    <input type="range" id="passwordLength" min="4" max="50" value="16" class="tool-input" style="flex: 1;">
                    <span id="lengthValue" style="min-width: 30px; text-align: center; font-weight: 600;">16</span>
                </div>
            </div>
            
            <div class="input-group">
                <label>Character Options:</label>
                <div class="checkbox-group">
                    <div class="checkbox-item">
                        <input type="checkbox" id="includeUppercase" checked>
                        <label for="includeUppercase">Uppercase (A-Z)</label>
                    </div>
                    <div class="checkbox-item">
                        <input type="checkbox" id="includeLowercase" checked>
                        <label for="includeLowercase">Lowercase (a-z)</label>
                    </div>
                    <div class="checkbox-item">
                        <input type="checkbox" id="includeNumbers" checked>
                        <label for="includeNumbers">Numbers (0-9)</label>
                    </div>
                    <div class="checkbox-item">
                        <input type="checkbox" id="includeSymbols">
                        <label for="includeSymbols">Symbols (!@#$%^&*)</label>
                    </div>
                </div>
            </div>
            
            <button class="tool-btn" onclick="generatePassword()">Generate Password</button>
            
            <div id="passwordOutput" style="display: none;">
                <div class="input-group">
                    <label>Generated Password:</label>
                    <div style="display: flex; gap: 0.5rem;">
                        <input type="text" id="generatedPassword" class="tool-input" readonly>
                        <button class="copy-btn" onclick="copyToClipboard(document.getElementById('generatedPassword').value, this)">Copy</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function clearPasswordGenerator() {
    document.getElementById('passwordLength').value = '16';
    document.getElementById('lengthValue').textContent = '16';
    document.getElementById('includeUppercase').checked = true;
    document.getElementById('includeLowercase').checked = true;
    document.getElementById('includeNumbers').checked = true;
    document.getElementById('includeSymbols').checked = false;
    document.getElementById('passwordOutput').style.display = 'none';
    document.getElementById('generatedPassword').value = '';
}

document.addEventListener('DOMContentLoaded', function() {
    // Update length value when slider changes
    document.addEventListener('input', function(e) {
        if (e.target.id === 'passwordLength') {
            document.getElementById('lengthValue').textContent = e.target.value;
        }
    });
});

function generatePassword() {
    const length = parseInt(document.getElementById('passwordLength').value);
    const includeUppercase = document.getElementById('includeUppercase').checked;
    const includeLowercase = document.getElementById('includeLowercase').checked;
    const includeNumbers = document.getElementById('includeNumbers').checked;
    const includeSymbols = document.getElementById('includeSymbols').checked;
    
    if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols) {
        alert('Please select at least one character option.');
        return;
    }
    
    let charset = '';
    if (includeUppercase) charset += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (includeLowercase) charset += 'abcdefghijklmnopqrstuvwxyz';
    if (includeNumbers) charset += '0123456789';
    if (includeSymbols) charset += '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    let password = '';
    for (let i = 0; i < length; i++) {
        password += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    
    document.getElementById('generatedPassword').value = password;
    document.getElementById('passwordOutput').style.display = 'block';
}

// Calendar
function getCalendarInterface() {
    return `
        <div class="tool-interface">
            <button class="clear-all-btn" onclick="clearCalendar()">Clear All</button>
            
            <div class="calendar-header">
                <button class="calendar-nav" onclick="previousMonth()">&larr;</button>
                <h3 id="calendarTitle"></h3>
                <button class="calendar-nav" onclick="nextMonth()">&rarr;</button>
            </div>
            <div class="calendar-grid" id="calendarGrid"></div>
        </div>
    `;
}

function clearCalendar() {
    currentDate = new Date();
    renderCalendar();
}

let currentDate = new Date();

function initializeCalendar() {
    renderCalendar();
}

function renderCalendar() {
    const calendarTitle = document.getElementById('calendarTitle');
    const calendarGrid = document.getElementById('calendarGrid');
    
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    
    calendarTitle.textContent = new Date(year, month).toLocaleDateString('en-US', { 
        month: 'long', 
        year: 'numeric' 
    });
    
    calendarGrid.innerHTML = '';
    
    // Days of week headers
    const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    daysOfWeek.forEach(day => {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day header';
        dayElement.textContent = day;
        calendarGrid.appendChild(dayElement);
    });
    
    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const today = new Date();
    
    // Previous month's trailing days
    const prevMonthDays = new Date(year, month, 0).getDate();
    for (let i = firstDay - 1; i >= 0; i--) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day other-month';
        dayElement.textContent = prevMonthDays - i;
        calendarGrid.appendChild(dayElement);
    }
    
    // Current month's days
    for (let day = 1; day <= daysInMonth; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';
        dayElement.textContent = day;
        
        // Highlight today
        if (year === today.getFullYear() && 
            month === today.getMonth() && 
            day === today.getDate()) {
            dayElement.classList.add('today');
        }
        
        calendarGrid.appendChild(dayElement);
    }
    
    // Next month's leading days
    const totalCells = calendarGrid.children.length;
    const remainingCells = 42 - totalCells; // 6 rows × 7 days
    for (let day = 1; day <= remainingCells; day++) {
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day other-month';
        dayElement.textContent = day;
        calendarGrid.appendChild(dayElement);
    }
}

function previousMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar();
}

function nextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar();
}

// Calculator
function getCalculatorInterface() {
    return `
        <div class="tool-interface">
            <button class="clear-all-btn" onclick="clearCalculator()">Clear All</button>
            
            <div class="input-group">
                <input type="text" id="calculatorDisplay" class="tool-input" readonly placeholder="0" style="font-size: 1.2rem; text-align: right;">
            </div>
            
            <div class="calculator-grid">
                <button class="calc-btn" onclick="clearCalculator()">C</button>
                <button class="calc-btn" onclick="deleteLast()">⌫</button>
                <button class="calc-btn operator" onclick="appendToDisplay('/')">/</button>
                <button class="calc-btn operator" onclick="appendToDisplay('*')">×</button>
                
                <button class="calc-btn" onclick="appendToDisplay('7')">7</button>
                <button class="calc-btn" onclick="appendToDisplay('8')">8</button>
                <button class="calc-btn" onclick="appendToDisplay('9')">9</button>
                <button class="calc-btn operator" onclick="appendToDisplay('-')">-</button>
                
                <button class="calc-btn" onclick="appendToDisplay('4')">4</button>
                <button class="calc-btn" onclick="appendToDisplay('5')">5</button>
                <button class="calc-btn" onclick="appendToDisplay('6')">6</button>
                <button class="calc-btn operator" onclick="appendToDisplay('+')">+</button>
                
                <button class="calc-btn" onclick="appendToDisplay('1')">1</button>
                <button class="calc-btn" onclick="appendToDisplay('2')">2</button>
                <button class="calc-btn" onclick="appendToDisplay('3')">3</button>
                <button class="calc-btn equals" onclick="calculateResult()" rowspan="2">=</button>
                
                <button class="calc-btn zero" onclick="appendToDisplay('0')">0</button>
                <button class="calc-btn" onclick="appendToDisplay('.')">.</button>
            </div>
        </div>
    `;
}

function initializeCalculator() {
    // Add keyboard support
    document.addEventListener('keydown', handleCalculatorKeyboard);
}

function handleCalculatorKeyboard(e) {
    if (currentTool !== 'calculator') return;
    
    const key = e.key;
    if (key >= '0' && key <= '9' || key === '.') {
        appendToDisplay(key);
    } else if (key === '+' || key === '-' || key === '*' || key === '/') {
        appendToDisplay(key);
    } else if (key === 'Enter' || key === '=') {
        calculateResult();
    } else if (key === 'Escape' || key === 'c' || key === 'C') {
        clearCalculator();
    } else if (key === 'Backspace') {
        deleteLast();
    }
}

function appendToDisplay(value) {
    const display = document.getElementById('calculatorDisplay');
    if (display.value === '0' && value !== '.') {
        display.value = value;
    } else {
        display.value += value;
    }
}

function clearCalculator() {
    document.getElementById('calculatorDisplay').value = '0';
}

function deleteLast() {
    const display = document.getElementById('calculatorDisplay');
    if (display.value.length > 1) {
        display.value = display.value.slice(0, -1);
    } else {
        display.value = '0';
    }
}

function calculateResult() {
    const display = document.getElementById('calculatorDisplay');
    try {
        // Replace × with * for evaluation
        const expression = display.value.replace(/×/g, '*');
        const result = eval(expression);
        display.value = result.toString();
    } catch (error) {
        display.value = 'Error';
        setTimeout(() => {
            display.value = '0';
        }, 2000);
    }
}

// Unit Converter
function getUnitConverterInterface() {
    return `
        <div class="tool-interface">
            <button class="clear-all-btn" onclick="clearUnitConverter()">Clear All</button>
            
            <div class="input-group">
                <label for="unitType">Unit Type:</label>
                <select id="unitType" class="tool-select" onchange="updateUnitOptions()">
                    <option value="length">Length</option>
                    <option value="weight">Weight</option>
                    <option value="temperature">Temperature</option>
                </select>
            </div>
            
            <div class="input-group">
                <label for="fromValue">From:</label>
                <div style="display: flex; gap: 0.25rem;">
                    <input type="number" id="fromValue" class="tool-input" placeholder="Enter value" oninput="convertUnit()">
                    <select id="fromUnit" class="tool-select" onchange="convertUnit()"></select>
                </div>
            </div>
            
            <div class="input-group">
                <label for="toValue">To:</label>
                <div style="display: flex; gap: 0.25rem;">
                    <input type="number" id="toValue" class="tool-input" readonly>
                    <select id="toUnit" class="tool-select" onchange="convertUnit()"></select>
                </div>
            </div>
        </div>
    `;
}

function clearUnitConverter() {
    document.getElementById('unitType').value = 'length';
    document.getElementById('fromValue').value = '';
    document.getElementById('toValue').value = '';
    updateUnitOptions();
}

const unitConversions = {
    length: {
        meter: { name: 'Meter', factor: 1 },
        kilometer: { name: 'Kilometer', factor: 1000 },
        centimeter: { name: 'Centimeter', factor: 0.01 },
        millimeter: { name: 'Millimeter', factor: 0.001 },
        inch: { name: 'Inch', factor: 0.0254 },
        foot: { name: 'Foot', factor: 0.3048 },
        yard: { name: 'Yard', factor: 0.9144 },
        mile: { name: 'Mile', factor: 1609.344 }
    },
    weight: {
        kilogram: { name: 'Kilogram', factor: 1 },
        gram: { name: 'Gram', factor: 0.001 },
        pound: { name: 'Pound', factor: 0.453592 },
        ounce: { name: 'Ounce', factor: 0.0283495 },
        ton: { name: 'Ton', factor: 1000 },
        stone: { name: 'Stone', factor: 6.35029 }
    },
    temperature: {
        celsius: { name: 'Celsius' },
        fahrenheit: { name: 'Fahrenheit' },
        kelvin: { name: 'Kelvin' }
    }
};

function updateUnitOptions() {
    const unitType = document.getElementById('unitType').value;
    const fromUnit = document.getElementById('fromUnit');
    const toUnit = document.getElementById('toUnit');
    
    fromUnit.innerHTML = '';
    toUnit.innerHTML = '';
    
    Object.entries(unitConversions[unitType]).forEach(([key, unit]) => {
        const option1 = new Option(unit.name, key);
        const option2 = new Option(unit.name, key);
        fromUnit.add(option1);
        toUnit.add(option2);
    });
    
    // Set different default selections
    toUnit.selectedIndex = 1;
    
    convertUnit();
}

function convertUnit() {
    const unitType = document.getElementById('unitType').value;
    const fromValue = parseFloat(document.getElementById('fromValue').value);
    const fromUnitKey = document.getElementById('fromUnit').value;
    const toUnitKey = document.getElementById('toUnit').value;
    const toValueInput = document.getElementById('toValue');
    
    if (isNaN(fromValue)) {
        toValueInput.value = '';
        return;
    }
    
    let result;
    
    if (unitType === 'temperature') {
        result = convertTemperature(fromValue, fromUnitKey, toUnitKey);
    } else {
        const fromUnit = unitConversions[unitType][fromUnitKey];
        const toUnit = unitConversions[unitType][toUnitKey];
        const baseValue = fromValue * fromUnit.factor;
        result = baseValue / toUnit.factor;
    }
    
    toValueInput.value = result.toFixed(6).replace(/\.?0+$/, '');
}

function convertTemperature(value, from, to) {
    if (from === to) return value;
    
    // Convert to Celsius first
    let celsius;
    switch (from) {
        case 'celsius':
            celsius = value;
            break;
        case 'fahrenheit':
            celsius = (value - 32) * 5/9;
            break;
        case 'kelvin':
            celsius = value - 273.15;
            break;
    }
    
    // Convert from Celsius to target
    switch (to) {
        case 'celsius':
            return celsius;
        case 'fahrenheit':
            return celsius * 9/5 + 32;
        case 'kelvin':
            return celsius + 273.15;
    }
}

// Initialize unit converter when opened
document.addEventListener('DOMContentLoaded', function() {
    // This will be called when the modal is opened
    setTimeout(() => {
        if (currentTool === 'unit-converter') {
            updateUnitOptions();
        }
    }, 100);
});

// Text Case Converter
function getTextConverterInterface() {
    return `
        <div class="tool-interface">
            <button class="clear-all-btn" onclick="clearTextConverter()">Clear All</button>
            
            <div class="input-group">
                <label for="textInput">Text to convert:</label>
                <textarea id="textInput" class="tool-textarea" rows="3" placeholder="Enter your text here..."></textarea>
            </div>
            
            <div style="display: flex; flex-wrap: wrap; gap: 0.25rem; margin: 0.5rem 0;">
                <button class="tool-btn" onclick="convertText('uppercase')">UPPERCASE</button>
                <button class="tool-btn" onclick="convertText('lowercase')">lowercase</button>
                <button class="tool-btn" onclick="convertText('title')">Title Case</button>
                <button class="tool-btn" onclick="convertText('sentence')">Sentence case</button>
            </div>
            
            <div class="input-group">
                <label for="textOutput">Converted text:</label>
                <div style="display: flex; flex-direction: column; gap: 0.25rem;">
                    <textarea id="textOutput" class="tool-output" rows="3" readonly></textarea>
                    <button class="copy-btn" onclick="copyToClipboard(document.getElementById('textOutput').value, this)">Copy Text</button>
                </div>
            </div>
        </div>
    `;
}

function clearTextConverter() {
    document.getElementById('textInput').value = '';
    document.getElementById('textOutput').value = '';
}

function convertText(caseType) {
    const input = document.getElementById('textInput').value;
    const output = document.getElementById('textOutput');
    
    if (!input.trim()) {
        output.value = '';
        return;
    }
    
    let result;
    switch (caseType) {
        case 'uppercase':
            result = input.toUpperCase();
            break;
        case 'lowercase':
            result = input.toLowerCase();
            break;
        case 'title':
            result = input.replace(/\w\S*/g, (txt) => 
                txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase()
            );
            break;
        case 'sentence':
            result = input.toLowerCase().replace(/(^\s*\w|[.!?]\s*\w)/g, (c) => 
                c.toUpperCase()
            );
            break;
        default:
            result = input;
    }
    
    output.value = result;
}

// Timer & Stopwatch
function getTimerInterface() {
    return `
        <div class="tool-interface">
            <button class="clear-all-btn" onclick="clearTimer()">Clear All</button>
            
            <div style="display: flex; flex-direction: column; gap: 1rem;">
                <!-- Timer Section -->
                <div style="border: 2px solid #e1e5e9; border-radius: 10px; padding: 1rem;">
                    <h3 style="margin-bottom: 0.5rem; color: #333; font-size: 1.1rem;">⏰ Timer</h3>
                    
                    <div style="display: flex; gap: 0.25rem; margin-bottom: 0.5rem; align-items: center; justify-content: center;">
                        <input type="number" id="timerMinutes" class="tool-input" placeholder="MM" min="0" max="59" style="width: 80px;">
                        <span style="font-size: 1.2rem; font-weight: bold;">:</span>
                        <input type="number" id="timerSeconds" class="tool-input" placeholder="SS" min="0" max="59" style="width: 80px;">
                    </div>
                    
                    <div class="timer-display" id="timerDisplay" style="font-size: 2rem; padding: 1rem;">00:00</div>
                    
                    <div class="timer-controls">
                        <button class="tool-btn" onclick="startTimer()">Start</button>
                        <button class="tool-btn secondary" onclick="pauseTimer()">Pause</button>
                        <button class="tool-btn secondary" onclick="resetTimer()">Reset</button>
                    </div>
                </div>
                
                <!-- Stopwatch Section -->
                <div style="border: 2px solid #e1e5e9; border-radius: 10px; padding: 1rem;">
                    <h3 style="margin-bottom: 0.5rem; color: #333; font-size: 1.1rem;">⏱️ Stopwatch</h3>
                    
                    <div class="timer-display" id="stopwatchDisplay" style="font-size: 2rem; padding: 1rem;">00:00</div>
                    
                    <div class="timer-controls">
                        <button class="tool-btn" onclick="startStopwatch()">Start</button>
                        <button class="tool-btn secondary" onclick="pauseStopwatch()">Pause</button>
                        <button class="tool-btn secondary" onclick="resetStopwatch()">Reset</button>
                    </div>
                </div>
            </div>
        </div>
    `;
}

function clearTimer() {
    // Clear timer
    pauseTimer();
    timerTime = 0;
    document.getElementById('timerMinutes').value = '';
    document.getElementById('timerSeconds').value = '';
    updateTimerDisplay();
    
    // Clear stopwatch
    pauseStopwatch();
    stopwatchTime = 0;
    updateStopwatchDisplay();
}

function initializeTimer() {
    timerTime = 0;
    stopwatchTime = 0;
    isTimerRunning = false;
    isStopwatchRunning = false;
    updateTimerDisplay();
    updateStopwatchDisplay();
}

function startTimer() {
    const minutes = parseInt(document.getElementById('timerMinutes').value) || 0;
    const seconds = parseInt(document.getElementById('timerSeconds').value) || 0;
    
    if (timerTime === 0) {
        timerTime = minutes * 60 + seconds;
    }
    
    if (timerTime <= 0) {
        alert('Please set a timer duration');
        return;
    }
    
    if (!isTimerRunning) {
        isTimerRunning = true;
        timerInterval = setInterval(() => {
            timerTime--;
            updateTimerDisplay();
            
            if (timerTime <= 0) {
                clearInterval(timerInterval);
                isTimerRunning = false;
                alert('Timer finished!');
                // You could add sound notification here
            }
        }, 1000);
    }
}

function pauseTimer() {
    if (timerInterval) {
        clearInterval(timerInterval);
        timerInterval = null;
    }
    isTimerRunning = false;
}

function resetTimer() {
    pauseTimer();
    timerTime = 0;
    updateTimerDisplay();
}

function updateTimerDisplay() {
    const display = document.getElementById('timerDisplay');
    if (display) {
        display.textContent = formatTime(timerTime);
    }
}

function startStopwatch() {
    if (!isStopwatchRunning) {
        isStopwatchRunning = true;
        stopwatchInterval = setInterval(() => {
            stopwatchTime++;
            updateStopwatchDisplay();
        }, 1000);
    }
}

function pauseStopwatch() {
    if (stopwatchInterval) {
        clearInterval(stopwatchInterval);
        stopwatchInterval = null;
    }
    isStopwatchRunning = false;
}

function resetStopwatch() {
    pauseStopwatch();
    stopwatchTime = 0;
    updateStopwatchDisplay();
}

function updateStopwatchDisplay() {
    const display = document.getElementById('stopwatchDisplay');
    if (display) {
        display.textContent = formatTime(stopwatchTime);
    }
}

// Color Picker
function getColorPickerInterface() {
    return `
        <div class="tool-interface">
            <button class="clear-all-btn" onclick="clearColorPicker()">Clear All</button>
            
            <div class="input-group">
                <label for="colorInput">Pick a color:</label>
                <input type="color" id="colorInput" class="tool-input" value="#667eea" onchange="updateColorDisplay()">
            </div>
            
            <div class="color-display" id="colorDisplay"></div>
            
            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem;">
                <div class="input-group">
                    <label>Hex Value:</label>
                    <div style="display: flex; gap: 0.25rem;">
                        <input type="text" id="hexValue" class="tool-input" readonly>
                        <button class="copy-btn" onclick="copyToClipboard(document.getElementById('hexValue').value, this)">Copy</button>
                    </div>
                </div>
                
                <div class="input-group">
                    <label>RGB Value:</label>
                    <div style="display: flex; gap: 0.25rem;">
                        <input type="text" id="rgbValue" class="tool-input" readonly>
                        <button class="copy-btn" onclick="copyToClipboard(document.getElementById('rgbValue').value, this)">Copy</button>
                    </div>
                </div>
            </div>
            
            <button class="tool-btn" onclick="generateRandomColor()">Generate Random Color</button>
        </div>
    `;
}

function clearColorPicker() {
    document.getElementById('colorInput').value = '#667eea';
    updateColorDisplay();
}

function initializeColorPicker() {
    updateColorDisplay();
}

function updateColorDisplay() {
    const colorInput = document.getElementById('colorInput');
    const colorDisplay = document.getElementById('colorDisplay');
    const hexValue = document.getElementById('hexValue');
    const rgbValue = document.getElementById('rgbValue');
    
    const hex = colorInput.value;
    const rgb = hexToRgb(hex);
    
    colorDisplay.style.backgroundColor = hex;
    hexValue.value = hex.toUpperCase();
    rgbValue.value = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
}

function hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}

function generateRandomColor() {
    const hex = '#' + Math.floor(Math.random()*16777215).toString(16).padStart(6, '0');
    document.getElementById('colorInput').value = hex;
    updateColorDisplay();
}

// Base64 Encoder/Decoder
function getBase64Interface() {
    return `
        <div class="tool-interface">
            <button class="clear-all-btn" onclick="clearBase64()">Clear All</button>
            
            <div class="input-group">
                <label for="base64Input">Text to encode/decode:</label>
                <textarea id="base64Input" class="tool-textarea" rows="3" placeholder="Enter text to encode or Base64 string to decode..."></textarea>
            </div>
            
            <div style="display: flex; gap: 0.25rem; margin: 0.5rem 0;">
                <button class="tool-btn" onclick="encodeBase64()">Encode to Base64</button>
                <button class="tool-btn" onclick="decodeBase64()">Decode from Base64</button>
            </div>
            
            <div class="input-group">
                <label for="base64Output">Result:</label>
                <div style="display: flex; flex-direction: column; gap: 0.25rem;">
                    <textarea id="base64Output" class="tool-output" rows="3" readonly></textarea>
                    <button class="copy-btn" onclick="copyToClipboard(document.getElementById('base64Output').value, this)">Copy Result</button>
                </div>
            </div>
        </div>
    `;
}

function clearBase64() {
    document.getElementById('base64Input').value = '';
    document.getElementById('base64Output').value = '';
}

function encodeBase64() {
    const input = document.getElementById('base64Input').value;
    const output = document.getElementById('base64Output');
    
    if (!input) {
        output.value = '';
        return;
    }
    
    try {
        const encoded = btoa(unescape(encodeURIComponent(input)));
        output.value = encoded;
    } catch (error) {
        output.value = 'Error: Unable to encode the text.';
    }
}

function decodeBase64() {
    const input = document.getElementById('base64Input').value;
    const output = document.getElementById('base64Output');
    
    if (!input) {
        output.value = '';
        return;
    }
    
    try {
        const decoded = decodeURIComponent(escape(atob(input)));
        output.value = decoded;
    } catch (error) {
        output.value = 'Error: Invalid Base64 string.';
    }
}

// Word Counter
function getWordCounterInterface() {
    return `
        <div class="tool-interface">
            <button class="clear-all-btn" onclick="clearWordCounter()">Clear All</button>
            
            <div class="input-group">
                <label for="wordCountInput">Text to analyze:</label>
                <textarea id="wordCountInput" class="tool-textarea" rows="4" placeholder="Type or paste your text here..." oninput="updateWordCount()"></textarea>
            </div>
            
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 0.5rem; margin: 0.5rem 0;">
                <div style="background: #f8f9fa; padding: 0.75rem; border-radius: 8px; text-align: center;">
                    <div style="font-size: 1.5rem; font-weight: bold; color: #667eea;" id="characterCount">0</div>
                    <div style="color: #666;">Characters</div>
                </div>
                
                <div style="background: #f8f9fa; padding: 0.75rem; border-radius: 8px; text-align: center;">
                    <div style="font-size: 1.5rem; font-weight: bold; color: #667eea;" id="characterCountNoSpaces">0</div>
                    <div style="color: #666;">Characters (no spaces)</div>
                </div>
                
                <div style="background: #f8f9fa; padding: 0.75rem; border-radius: 8px; text-align: center;">
                    <div style="font-size: 1.5rem; font-weight: bold; color: #667eea;" id="wordCount">0</div>
                    <div style="color: #666;">Words</div>
                </div>
                
                <div style="background: #f8f9fa; padding: 0.75rem; border-radius: 8px; text-align: center;">
                    <div style="font-size: 1.5rem; font-weight: bold; color: #667eea;" id="sentenceCount">0</div>
                    <div style="color: #666;">Sentences</div>
                </div>
                
                <div style="background: #f8f9fa; padding: 0.75rem; border-radius: 8px; text-align: center;">
                    <div style="font-size: 1.5rem; font-weight: bold; color: #667eea;" id="paragraphCount">0</div>
                    <div style="color: #666;">Paragraphs</div>
                </div>
                
                <div style="background: #f8f9fa; padding: 0.75rem; border-radius: 8px; text-align: center;">
                    <div style="font-size: 1.5rem; font-weight: bold; color: #667eea;" id="readingTime">0</div>
                    <div style="color: #666;">Reading time (min)</div>
                </div>
            </div>
        </div>
    `;
}

function clearWordCounter() {
    document.getElementById('wordCountInput').value = '';
    updateWordCount();
}

function updateWordCount() {
    const text = document.getElementById('wordCountInput').value;
    
    // Character count
    document.getElementById('characterCount').textContent = text.length;
    
    // Character count without spaces
    document.getElementById('characterCountNoSpaces').textContent = text.replace(/\s/g, '').length;
    
    // Word count
    const words = text.trim() ? text.trim().split(/\s+/) : [];
    document.getElementById('wordCount').textContent = words.length === 1 && words[0] === '' ? 0 : words.length;
    
    // Sentence count
    const sentences = text.trim() ? text.split(/[.!?]+/).filter(s => s.trim().length > 0) : [];
    document.getElementById('sentenceCount').textContent = sentences.length;
    
    // Paragraph count
    const paragraphs = text.trim() ? text.split(/\n\s*\n/).filter(p => p.trim().length > 0) : [];
    document.getElementById('paragraphCount').textContent = paragraphs.length;
    
    // Reading time (assuming 200 words per minute)
    const wordCount = words.length === 1 && words[0] === '' ? 0 : words.length;
    const readingTime = Math.ceil(wordCount / 200);
    document.getElementById('readingTime').textContent = readingTime;
}

// Add event listener for unit converter initialization
document.addEventListener('DOMContentLoaded', function() {
    // Initialize unit converter when modal is opened
    const observer = new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                const modal = mutation.target;
                if (modal.classList.contains('active') && currentTool === 'unit-converter') {
                    setTimeout(() => updateUnitOptions(), 100);
                }
            }
        });
    });
    
    const modal = document.getElementById('modal');
    if (modal) {
        observer.observe(modal, { attributes: true });
    }
});