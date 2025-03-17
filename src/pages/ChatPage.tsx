import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, MoreVertical, Paperclip, Image, InfoIcon } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useAppContext } from "@/contexts/AppContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";

const chatsData = [
  {
    id: 1,
    user: {
      name: "Giulia Verdi",
      image: "",
      online: true,
      lastActive: "Online",
      skills: ["Matematica", "Fisica", "Chimica"]
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
      lastActive: "2 ore fa",
      skills: ["Informatica", "Elettronica"]
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
        text: "Certo, mi può descrivere il problema? Sarei felice di aiutarla.",
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
      lastActive: "5 ore fa",
      skills: ["Traslochi", "Montaggio mobili"]
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

const truncateMessage = (text: string, maxLength: number = 30) => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

const ChatPage = () => {
  const isMobile = useIsMobile();
  const { darkMode, language } = useAppContext();
  
  const [activeChat, setActiveChat] = useState(chatsData[0]);
  const [message, setMessage] = useState("");
  const [showChatList, setShowChatList] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [activeChat.messages]);
  
  useEffect(() => {
    if (!isMobile) {
      setShowChatList(true);
    }
  }, [isMobile]);
  
  const sendMessage = () => {
    if (message.trim()) {
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
      console.log("File selected:", e.target.files[0].name);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };
  
  return (
    <Layout>
      <div className={`flex h-[calc(100vh-8rem)] md:h-[calc(100vh-6rem)] rounded-xl overflow-hidden shadow-lg ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white border"}`}>
        {(showChatList || !isMobile) && (
          <div className={`${isMobile ? "w-full" : "w-1/3 lg:w-1/4"} flex flex-col border-r ${darkMode ? "bg-gray-800 border-gray-700" : "bg-white"}`}>
            <div className={`p-4 border-b flex justify-between items-center ${darkMode ? "border-gray-700" : ""}`}>
              <h2 className={`font-semibold ${darkMode ? "text-white" : ""}`}>
                {language === "it" ? "Messaggi" : "Messages"}
              </h2>
              <Button 
                variant="ghost" 
                size="sm" 
                className={darkMode ? "text-gray-300 hover:text-white hover:bg-gray-700" : "text-gray-500 hover:text-gray-900"}
              >
                {language === "it" ? "Filtri" : "Filters"}
              </Button>
            </div>
            
            <div className="p-3">
              <Input 
                placeholder={language === "it" ? "Cerca una chat..." : "Search chats..."}
                className={`${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-50"} rounded-full`}
              />
            </div>
            
            <ScrollArea className="flex-1">
              {chatsData.map((chat) => (
                <div 
                  key={chat.id}
                  className={cn(
                    "flex items-center gap-3 p-4 cursor-pointer transition-colors",
                    activeChat.id === chat.id 
                      ? (darkMode ? "bg-gray-700" : "bg-blue-50/80") 
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
                    <Avatar className="border-2 border-transparent">
                      <AvatarFallback className={activeChat.id === chat.id 
                        ? "bg-gradient-to-br from-blue-500 to-purple-500 text-white"
                        : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                      }>
                        {chat.user.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    {chat.user.online && (
                      <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></span>
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-center mb-1">
                      <h3 className={`font-medium truncate ${darkMode ? "text-white" : ""}`}>
                        {chat.user.name}
                      </h3>
                      <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        {chat.messages[chat.messages.length - 1].time}
                      </span>
                    </div>
                    <p className={`text-sm truncate ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                      {truncateMessage(chat.messages[chat.messages.length - 1].text)}
                    </p>
                  </div>
                </div>
              ))}
            </ScrollArea>
          </div>
        )}
        
        {(!isMobile || !showChatList) && (
          <div className="flex-1 flex flex-col">
            <div className={`flex items-center justify-between p-4 border-b ${darkMode ? "border-gray-700" : ""}`}>
              <div className="flex items-center gap-3">
                <Avatar className="border-2 border-transparent">
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                    {activeChat.user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className={`font-medium ${darkMode ? "text-white" : ""}`}>
                      {activeChat.user.name}
                    </h3>
                    {activeChat.user.online && (
                      <Badge variant="outline" className="text-xs py-0 h-5 font-normal bg-green-500/10 text-green-500 border-green-500/20">
                        {language === "it" ? "Online" : "Online"}
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-1 mt-0.5">
                    {activeChat.user.skills.slice(0, 2).map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs py-0 h-5 font-normal">
                        {skill}
                      </Badge>
                    ))}
                    {activeChat.user.skills.length > 2 && (
                      <Badge variant="outline" className="text-xs py-0 h-5 font-normal">
                        +{activeChat.user.skills.length - 2}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="ghost" 
                  size="icon" 
                  className={cn(
                    "rounded-full", 
                    darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-500 hover:bg-gray-100"
                  )}
                >
                  <InfoIcon size={18} />
                </Button>
              </div>
            </div>
            
            <ScrollArea 
              className={`flex-1 p-4 ${darkMode ? "bg-gray-900" : "bg-gray-50"}`} 
              ref={scrollAreaRef}
            >
              <div className="space-y-4 px-2">
                <div className="flex justify-center">
                  <div className={`px-4 py-1 rounded-full text-xs ${darkMode ? "bg-gray-800 text-gray-400" : "bg-gray-200 text-gray-500"}`}>
                    {language === "it" ? "Oggi" : "Today"}
                  </div>
                </div>
                
                {activeChat.messages.map((msg) => (
                  <div 
                    key={msg.id}
                    className={cn(
                      "flex",
                      msg.sender === "me" ? "justify-end" : "justify-start"
                    )}
                  >
                    {msg.sender !== "me" && (
                      <Avatar className="h-8 w-8 mr-2 mt-1 hidden sm:inline-flex flex-shrink-0">
                        <AvatarFallback className="text-xs bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300">
                          {activeChat.user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    )}
                    <div 
                      className={cn(
                        "max-w-[70%] sm:max-w-[75%] md:max-w-[65%] rounded-2xl px-4 py-2.5 shadow-sm break-words",
                        msg.sender === "me" 
                          ? "bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-br-none" 
                          : (darkMode ? "bg-gray-800 text-white rounded-bl-none" : "bg-white border rounded-bl-none")
                      )}
                    >
                      <p className="text-sm break-words whitespace-pre-wrap">{msg.text}</p>
                      <p 
                        className={cn(
                          "text-right text-xs mt-1",
                          msg.sender === "me" 
                            ? "text-blue-100" 
                            : (darkMode ? "text-gray-400" : "text-gray-400")
                        )}
                      >
                        {msg.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            
            <div className={`p-3 border-t ${darkMode ? "border-gray-700" : ""}`}>
              <div className="flex items-center gap-2">
                <Button 
                  onClick={handleAttachClick}
                  size="icon" 
                  variant="ghost"
                  className={cn(
                    "rounded-full", 
                    darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-500 hover:bg-gray-100"
                  )}
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
                  className={cn(
                    "rounded-full", 
                    darkMode ? "text-gray-300 hover:bg-gray-700" : "text-gray-500 hover:bg-gray-100"
                  )}
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
                  className={cn(
                    "flex-1 rounded-full",
                    darkMode ? "bg-gray-700 border-gray-600 text-white focus:ring-blue-500 focus:border-blue-600" : "bg-gray-50 focus:ring-blue-400 focus:border-blue-500"
                  )}
                />
                <Button 
                  onClick={sendMessage}
                  size="icon" 
                  disabled={!message.trim()}
                  className={cn(
                    "rounded-full",
                    !message.trim() 
                      ? (darkMode ? "bg-gray-700 text-gray-400" : "bg-gray-200 text-gray-400") 
                      : "bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700"
                  )}
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
