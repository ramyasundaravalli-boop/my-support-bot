// ShopAssist Pro - E-commerce Support Bot
// Deploy by adding: <script src="https://cdn.jsdelivr.net/gh/ramyasundaravalli-boop/my-support-bot@main/bot.js"></script>

(function() {
    // Don't load if already loaded
    if (window.shopAssistLoaded) return;
    window.shopAssistLoaded = true;
    
    // Create and inject CSS
    const css = `
        .shopassist-chat-container {
            position: fixed;
            bottom: 20px;
            right: 20px;
            z-index: 10000;
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        .shopassist-chat-widget {
            background: white;
            border-radius: 15px;
            box-shadow: 0 10px 30px rgba(0,0,0,0.2);
            width: 350px;
            height: 500px;
            display: flex;
            flex-direction: column;
            display: none;
        }
        
        .shopassist-chat-header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 20px;
            border-radius: 15px 15px 0 0;
            text-align: center;
        }
        
        .shopassist-chat-messages {
            flex: 1;
            overflow-y: auto;
            padding: 15px;
            background: #f8f9fa;
        }
        
        .shopassist-message {
            margin-bottom: 10px;
            padding: 12px 16px;
            border-radius: 18px;
            max-width: 80%;
            line-height: 1.4;
            animation: fadeIn 0.3s ease-in;
        }
        
        .shopassist-message-bot {
            background: white;
            border-bottom-left-radius: 4px;
            text-align: left;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        
        .shopassist-message-user {
            background: #667eea;
            color: white;
            margin-left: auto;
            border-bottom-right-radius: 4px;
            text-align: right;
        }
        
        .shopassist-chat-input-container {
            padding: 15px;
            border-top: 1px solid #e5e7eb;
            background: white;
            border-radius: 0 0 15px 15px;
        }
        
        .shopassist-chat-input {
            width: 100%;
            padding: 12px;
            border: 2px solid #e5e7eb;
            border-radius: 8px;
            margin-bottom: 10px;
            font-size: 14px;
        }
        
        .shopassist-chat-input:focus {
            outline: none;
            border-color: #667eea;
        }
        
        .shopassist-send-button {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            padding: 12px 20px;
            border-radius: 8px;
            width: 100%;
            cursor: pointer;
            font-weight: 600;
        }
        
        .shopassist-toggle-button {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            border: none;
            border-radius: 50%;
            width: 60px;
            height: 60px;
            font-size: 24px;
            cursor: pointer;
            box-shadow: 0 5px 15px rgba(0,0,0,0.2);
            transition: transform 0.2s;
        }
        
        .shopassist-toggle-button:hover {
            transform: scale(1.1);
        }
        
        .shopassist-suggestions {
            display: flex;
            gap: 8px;
            margin-top: 10px;
            flex-wrap: wrap;
        }
        
        .shopassist-suggestion {
            background: #e5e7eb;
            padding: 6px 12px;
            border-radius: 15px;
            cursor: pointer;
            font-size: 12px;
            transition: background 0.2s;
        }
        
        .shopassist-suggestion:hover {
            background: #d1d5db;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
    `;
    
    const styleSheet = document.createElement('style');
    styleSheet.textContent = css;
    document.head.appendChild(styleSheet);
    
    // Create chat container
    const chatContainer = document.createElement('div');
    chatContainer.className = 'shopassist-chat-container';
    chatContainer.innerHTML = `
        <div class="shopassist-chat-widget" id="shopassistChatWidget">
            <div class="shopassist-chat-header">
                <h3 style="margin: 0 0 5px 0;">🛍️ ShopAssist Pro</h3>
                <p style="margin: 0; font-size: 12px; opacity: 0.9;">AI Support Bot • Online</p>
            </div>
            
            <div class="shopassist-chat-messages" id="shopassistChatMessages">
                <div class="shopassist-message shopassist-message-bot">
                    👋 Welcome! I'm your AI shopping assistant. I can help with:
                    <br>• Order tracking
                    <br>• Returns & refunds  
                    <br>• Shipping info
                    <br>• Product questions
                    <br><br>How can I help you today?
                </div>
            </div>
            
            <div class="shopassist-chat-input-container">
                <input type="text" class="shopassist-chat-input" id="shopassistChatInput" 
                       placeholder="Type your question...">
                <button class="shopassist-send-button" onclick="window.shopAssistSendMessage()">
                    Send Message
                </button>
                <div class="shopassist-suggestions" id="shopassistSuggestions">
                    <div class="shopassist-suggestion" onclick="window.shopAssistQuickQuestion('Where is my order?')">📦 Track Order</div>
                    <div class="shopassist-suggestion" onclick="window.shopAssistQuickQuestion('Return policy?')">🔄 Returns</div>
                    <div class="shopassist-suggestion" onclick="window.shopAssistQuickQuestion('Shipping time?')">🚚 Shipping</div>
                    <div class="shopassist-suggestion" onclick="window.shopAssistQuickQuestion('Contact support?')">👨‍💻 Help</div>
                </div>
            </div>
        </div>
        
        <button class="shopassist-toggle-button" onclick="window.shopAssistToggleChat()">
            💬
        </button>
    `;
    
    document.body.appendChild(chatContainer);
    
    // Chat functions
    window.shopAssistToggleChat = function() {
        const widget = document.getElementById('shopassistChatWidget');
        widget.style.display = widget.style.display === 'none' ? 'flex' : 'none';
    };
    
    window.shopAssistSendMessage = function() {
        const input = document.getElementById('shopassistChatInput');
        const message = input.value.trim();
        
        if (message) {
            window.shopAssistAddMessage(message, 'user');
            input.value = '';
            window.shopAssistGenerateResponse(message);
        }
    };
    
    window.shopAssistQuickQuestion = function(question) {
        window.shopAssistAddMessage(question, 'user');
        window.shopAssistGenerateResponse(question);
    };
    
    window.shopAssistAddMessage = function(text, sender) {
        const messages = document.getElementById('shopassistChatMessages');
        const messageDiv = document.createElement('div');
        messageDiv.className = `shopassist-message shopassist-message-${sender}`;
        messageDiv.textContent = text;
        messages.appendChild(messageDiv);
        messages.scrollTop = messages.scrollHeight;
    };
    
    window.shopAssistGenerateResponse = function(userMessage) {
        const messages = document.getElementById('shopassistChatMessages');
        
        // Simulate typing delay
        setTimeout(() => {
            const responses = {
                'order': "To check your order status, I'll need your order number (like ORD-1001). You can find it in your confirmation email or account dashboard.",
                'track': "For order tracking, please provide your order number. Most orders ship within 1-2 business days with 3-7 day delivery.",
                'return': "We offer a 30-day return policy. Items must be unused with original packaging. Start your return in your account or contact support.",
                'refund': "Refunds are processed within 5-7 business days after we receive your return. You'll get an email confirmation when it's processed.",
                'shipping': "Standard shipping takes 3-7 business days. Express (2-3 days) and overnight options are available at checkout.",
                'delivery': "Delivery times are 3-7 business days for standard shipping. You'll receive tracking info once your order ships.",
                'product': "I'd love to help with product info! Could you tell me which product you're interested in?",
                'price': "For current pricing and availability, please check the product page on our website. We also run regular sales and promotions!",
                'contact': "You can reach our support team at support@store.com or call (555) 123-4567 during business hours (9AM-6PM EST).",
                'help': "I'm here to help with orders, returns, shipping, and product questions. What specifically can I assist you with?",
                'default': "I understand you're asking about this. For detailed assistance with orders, returns, or shipping, please contact our support team who can access your specific account information."
            };
            
            const messageLower = userMessage.toLowerCase();
            let response = responses.default;
            
            for (const [key, value] of Object.entries(responses)) {
                if (messageLower.includes(key)) {
                    response = value;
                    break;
                }
            }
            
            window.shopAssistAddMessage(response, 'bot');
        }, 1000);
    };
    
    // Handle Enter key in input
    document.getElementById('shopassistChatInput').addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            window.shopAssistSendMessage();
        }
    });
    
    console.log('🛍️ ShopAssist Pro loaded successfully!');
})();
