import React, { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import { cn } from '../lib/utils';

export function ChatWidget() {
    const { t } = useTranslation();
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState([
        { id: 1, text: "مرحباً! كيف يمكننا مساعدتك اليوم؟", sender: 'support', time: '10:00' },
    ]);

    const handleSend = (e) => {
        e.preventDefault();
        if (!message.trim()) return;

        const newMessage = {
            id: Date.now(),
            text: message,
            sender: 'user',
            time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
        };

        setMessages([...messages, newMessage]);
        setMessage('');

        // Mock support response
        setTimeout(() => {
            setMessages(prev => [...prev, {
                id: Date.now() + 1,
                text: "شكراً لرسالتك. سنتواصل معك في أقرب وقت ممكن.",
                sender: 'support',
                time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
            }]);
        }, 1000);
    };

    return (
        <div className="fixed bottom-24 md:bottom-6 right-6 z-[60]">
            {isOpen ? (
                <div className="bg-white w-80 h-96 rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden animate-in slide-in-from-bottom-4 duration-300">
                    <header className="p-4 bg-primary-600 text-white flex justify-between items-center">
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center">
                                <MessageCircle size={18} />
                            </div>
                            <span className="font-bold">AJW Support</span>
                        </div>
                        <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded-lg">
                            <X size={20} />
                        </button>
                    </header>

                    <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
                        {messages.map((msg) => (
                            <div key={msg.id} className={cn(
                                "max-w-[80%] p-3 rounded-2xl text-sm shadow-sm",
                                msg.sender === 'user'
                                    ? "bg-primary-600 text-white ml-auto rounded-tr-none"
                                    : "bg-white text-gray-800 mr-auto rounded-tl-none border border-gray-100"
                            )}>
                                <p>{msg.text}</p>
                                <span className={cn(
                                    "text-[10px] mt-1 block opacity-70",
                                    msg.sender === 'user' ? "text-white" : "text-gray-400"
                                )}>{msg.time}</span>
                            </div>
                        ))}
                    </div>

                    <form onSubmit={handleSend} className="p-3 border-t bg-white flex gap-2">
                        <input
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Type a message..."
                            className="flex-1 px-4 py-2 bg-gray-100 rounded-full text-sm outline-none focus:ring-2 focus:ring-primary-500/20"
                        />
                        <button type="submit" className="w-9 h-9 bg-primary-600 text-white rounded-full flex items-center justify-center hover:bg-primary-700 active:scale-95 transition-all">
                            <Send size={18} />
                        </button>
                    </form>
                </div>
            ) : (
                <button
                    onClick={() => setIsOpen(true)}
                    className="w-14 h-14 bg-primary-600 text-white rounded-full shadow-lg hover:shadow-primary-500/40 hover:scale-110 active:scale-95 transition-all flex items-center justify-center group"
                >
                    <MessageCircle size={28} className="group-hover:rotate-12 transition-transform" />
                    <span className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full border-2 border-white animate-pulse" />
                </button>
            )}
        </div>
    );
}
