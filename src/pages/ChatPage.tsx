
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, MoreVertical, Paperclip, ArrowLeft, Image } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useAppContext } from "@/contexts/AppContext";

// Dati di esempio
const chatsData = [
  {
    id: 1,
    user: {
      name: "Giulia Verdi",
      image: "",
      online: true,
      lastActive: "Online"
    },
    messages: [
      {
        id: 1,
        text: "Ciao! Ho visto che offri lezioni di matematica. Saresti disponibile questo weekend?",
        sender: "them",
        time: "10:32"
      },
      {
        id: 2,
        text: "Ciao Giulia! Sì, sono disponibile sabato pomeriggio. Ti andrebbe bene?",
        sender: "me",
        time: "10:35"
      },
      {
        id: 3,
        text: "Perfetto! Sabato pomeriggio va benissimo. Verso che ora?",
        sender: "them",
        time: "10:40"
      }
    ]
  },
  {
    id: 2,
    user: {
      name: "Luca Rossi",
      image: "",
      online: false,
      lastActive: "2 ore fa"
    },
    messages: [
      {
        id: 1,
        text: "Salve, ho un problema con il mio computer. Potresti aiutarmi?",
        sender: "them",
        time: "Ieri"
      },
      {
        id: 2,
        text: "Certo, mi può descrivere il problema?",
        sender: "me",
        time: "Ieri"
      }
    ]
  },
  {
    id: 3,
    user: {
      name: "Marco Bianchi",
      image: "",
      online: false,
      lastActive: "5 ore fa"
    },
    messages: [
      {
        id: 1,
        text: "Grazie per l'aiuto con il trasloco! Tutto perfetto.",
        sender: "them",
        time: "Lunedì"
      },
      {
        id: 2,
        text: "Grazie a te! Sono contento che sia andato tutto bene.",
        sender: "me",
        time: "Lunedì"
      }
    ]
  }
];

const ChatPage = () => {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { darkMode, language } = useAppContext();
  
  const [activeChat, setActiveChat] = useState(chatsData[0]);
  const [message, setMessage] = useState("");
  // Inizia mostrando sempre la lista delle chat, sia su mobile che desktop
  const [showChatList, setShowChatList] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // Scroll to bottom when messages change
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [activeChat.messages]);
  
  useEffect(() => {
    // Su desktop, mostra sempre sia la lista che la chat attiva
    if (!isMobile) {
      setShowChatList(true);
    }
  }, [isMobile]);
  
  const sendMessage = () => {
    if (message.trim()) {
      // In un'app reale, qui invieresti il messaggio al backend
      console.log("Sending message:", message);
      setMessage("");
    }
  };
  
  const handleAttachClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // In un'app reale, qui gestiresti il caricamento del file
      console.log("File selected:", e.target.files[0].name);
      // Reset file input
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };
  
  return (
    <Layout>
      <div className={`flex h-[calc(100vh-8rem)] md:h-[calc(100vh-6rem)] rounded-lg overflow-hidden border ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
        {/* Lista chat - sempre visibile su desktop, condizionalmente su mobile */}
        {(showChatList || !isMobile) && (
          <div className={`${isMobile ? "w-full" : "w-1/3 lg:w-1/4"} flex flex-col border-r ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
            <div className={`p-4 border-b flex justify-between items-center ${darkMode ? "border-gray-700" : ""}`}>
              <h2 className={`font-semibold ${darkMode ? "text-white" : ""}`}>
                {language === "it" ? "Chat" : "Chats"}
              </h2>
            </div>
            <ScrollArea className="flex-1">
              {chatsData.map((chat) => (
                <div 
                  key={chat.id}
                  className={cn(
                    "flex items-center gap-3 p-4 cursor-pointer transition-colors",
                    activeChat.id === chat.id 
                      ? (darkMode ? "bg-gray-700" : "bg-blue-50") 
                      : (darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"),
                  )}
                  onClick={() => {
                    setActiveChat(chat);
                    if (isMobile) {
                      setShowChatList(false);
                    }
                  }}
                >
                  <div className="relative">
                    <Avatar>
                      <AvatarFallback className="bg-solvy-blue/10 text-solvy-blue">
                        {chat.user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    {chat.user.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-solvy-green rounded-full border-2 border-white dark:border-gray-800"></span>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center">
                      <h3 className={`font-medium truncate ${darkMode ? "text-white" : ""}`}>
                        {chat.user.name}
                      </h3>
                      <span className={`text-xs ${darkMode ? "text-gray-400" : "text-solvy-gray"}`}>
                        {chat.messages[chat.messages.length - 1].time}
                      </span>
                    </div>
                    <p className={`text-sm truncate ${darkMode ? "text-gray-400" : "text-solvy-gray"}`}>
                      {chat.messages[chat.messages.length - 1].text}
                    </p>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>
        )}
        
        {/* Area chat - visibile su desktop sempre, su mobile quando showChatList è false */}
        {(!isMobile || !showChatList) && (
          <div className="flex-1 flex flex-col">
            {/* Header chat */}
            <div className={`flex items-center justify-between p-4 border-b ${darkMode ? "border-gray-700" : ""}`}>
              <div className="flex items-center gap-3">
                {isMobile && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    onClick={() => setShowChatList(true)}
                    className={darkMode ? "text-gray-300" : ""}
                  >
                    <ArrowLeft size={18} />
                  </Button>
                )}
                <Avatar>
                  <AvatarFallback className="bg-solvy-blue/10 text-solvy-blue">
                    {activeChat.user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h3 className={`font-medium ${darkMode ? "text-white" : ""}`}>
                    {activeChat.user.name}
                  </h3>
                  <p className={`text-xs ${darkMode ? "text-gray-400" : "text-solvy-gray"}`}>
                    {activeChat.user.lastActive}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={darkMode ? "text-gray-300" : "text-solvy-gray"}
                >
                  <MoreVertical size={18} />
                </Button>
              </div>
            </div>
            
            {/* Area messaggi - con corretto overflow e massima larghezza */}
            <ScrollArea 
              className={`flex-1 p-4 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`} 
              ref={scrollAreaRef}
            >
              <div className="space-y-4">
                {activeChat.messages.map((msg) => (
                  <div 
                    key={msg.id}
                    className={cn(
                      "flex",
                      msg.sender === "me" ? "justify-end" : "justify-start"
                    )}
                  >
                    <div 
                      className={cn(
                        "max-w-[80%] rounded-lg px-4 py-3 break-words",
                        msg.sender === "me" 
                          ? "bg-solvy-blue text-white rounded-br-none" 
                          : (darkMode ? "bg-gray-800 text-white rounded-bl-none" : "bg-white border rounded-bl-none")
                      )}
                    >
                      <p className="whitespace-normal break-words">{msg.text}</p>
                      <p 
                        className={cn(
                          "text-right text-xs mt-1",
                          msg.sender === "me" 
                            ? "text-blue-100" 
                            : (darkMode ? "text-gray-400" : "text-solvy-gray")
                        )}
                      >
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            {/* Input messaggi */}
            <div className={`p-4 border-t ${darkMode ? "border-gray-700" : ""}`}>
              <div className="flex items-center gap-2">
                <Button 
                  onClick={handleAttachClick}
                  size="icon" 
                  variant="ghost"
                  className={`${darkMode ? "text-gray-300 hover:text-white" : "text-solvy-gray hover:text-solvy-blue"} transition-colors`}
                  aria-label={language === "it" ? "Allega file" : "Attach file"}
                >
                  <Paperclip size={18} />
                  <input 
                    type="file" 
                    ref={fileInputRef} 
                    className="hidden" 
                    onChange={handleFileChange}
                    accept="image/*,video/*"
                  />
                </Button>
                
                <Button 
                  size="icon" 
                  variant="ghost"
                  className={`${darkMode ? "text-gray-300 hover:text-white" : "text-solvy-gray hover:text-solvy-blue"} transition-colors`}
                  aria-label={language === "it" ? "Allega immagine" : "Attach image"}
                  onClick={handleAttachClick}
                >
                  <Image size={18} />
                </Button>
                
                <Input 
                  placeholder={language === "it" ? "Scrivi un messaggio..." : "Type a message..."}
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                  className={`flex-1 ${darkMode ? "bg-gray-700 border-gray-600 text-white" : ""}`}
                />
                <Button 
                  onClick={sendMessage}
                  size="icon" 
                  className="bg-solvy-blue hover:bg-solvy-blue/90 transition-colors"
                  aria-label={language === "it" ? "Invia messaggio" : "Send message"}
                >
                  <Send size={18} />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default ChatPage;
