
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, X, Paperclip, Image, Search } from "lucide-react";
import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import { useAppContext } from "@/contexts/AppContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

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
  
  const [chats, setChats] = useState(chatsData);
  const [activeChat, setActiveChat] = useState(chatsData[0]);
  const [message, setMessage] = useState("");
  const [showChatList, setShowChatList] = useState(true);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  
  // Scroll to bottom when messages change
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
      // Create a copy of all chats
      const newChats = [...chats];
      
      // Find the active chat index
      const chatIndex = newChats.findIndex(chat => chat.id === activeChat.id);
      
      if (chatIndex !== -1) {
        // Create a new message object
        const newMessage = {
          id: activeChat.messages.length + 1,
          text: message,
          sender: "me",
          time: new Date().getHours() + ":" + String(new Date().getMinutes()).padStart(2, '0')
        };
        
        // Add new message to the chat's messages array
        newChats[chatIndex].messages = [...newChats[chatIndex].messages, newMessage];
        
        // Update state
        setChats(newChats);
        setActiveChat(newChats[chatIndex]);
        
        // Show toast
        toast.success(language === "it" ? "Messaggio inviato" : "Message sent");
      }
      
      // Clear input
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
      toast.info(language === "it" 
        ? `File selezionato: ${e.target.files[0].name}` 
        : `File selected: ${e.target.files[0].name}`);
        
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    }
  };
  
  return (
    <Layout>
      <div className="space-y-0 -mx-4 sm:-mx-6 -mt-8 h-[calc(100vh-10rem)] md:h-[calc(100vh-8rem)] flex flex-col">
        {/* Header for the entire chat section */}
        <div className="flex flex-col space-y-1.5 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 px-4 py-3 md:px-6">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {language === "it" ? "Messaggi" : "Messages"}
          </h1>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {language === "it" 
              ? "Comunica con altri utenti della piattaforma" 
              : "Communicate with other users on the platform"}
          </p>
        </div>
        
        <div className="flex flex-1 overflow-hidden">
          {/* Chat list panel */}
          {(showChatList || !isMobile) && (
            <div className={`${isMobile ? "w-full" : "w-1/3 lg:w-1/4"} flex flex-col ${darkMode ? "bg-gray-950" : "bg-white"} border-r ${darkMode ? "border-gray-800" : "border-gray-200"}`}>
              <div className={`p-3 border-b flex justify-between items-center ${darkMode ? "border-gray-800" : "border-gray-200"}`}>
                <h2 className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                  {language === "it" ? "Conversazioni" : "Conversations"}
                </h2>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className={darkMode ? "text-gray-300 hover:text-white hover:bg-gray-800" : "text-gray-500 hover:text-gray-900"}
                >
                  {language === "it" ? "Filtri" : "Filters"}
                </Button>
              </div>
              
              <div className="p-3">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <Input 
                    placeholder={language === "it" ? "Cerca una chat..." : "Search chats..."}
                    className={`${darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-100 border-gray-200"} pl-9 rounded-full`}
                  />
                </div>
              </div>
              
              <ScrollArea className="flex-1">
                {chats.map((chat) => (
                  <div 
                    key={chat.id}
                    className={cn(
                      "flex items-center gap-3 p-4 cursor-pointer transition-colors",
                      activeChat.id === chat.id 
                        ? (darkMode ? "bg-gray-800" : "bg-gray-100") 
                        : (darkMode ? "hover:bg-gray-900" : "hover:bg-gray-50"),
                      "border-b",
                      darkMode ? "border-gray-800" : "border-gray-100"
                    )}
                    onClick={() => {
                      setActiveChat(chat);
                      if (isMobile) {
                        setShowChatList(false);
                      }
                    }}
                  >
                    <div className="relative">
                      <Avatar className="h-12 w-12 border border-transparent">
                        <AvatarFallback className={activeChat.id === chat.id 
                          ? "bg-blue-500 text-white"
                          : "bg-gray-200 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                        }>
                          {chat.user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      {chat.user.online && (
                        <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-900"></span>
                      )}
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className={`font-medium truncate ${darkMode ? "text-white" : "text-gray-900"}`}>
                          {chat.user.name}
                        </h3>
                        <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                          {chat.messages[chat.messages.length - 1].time}
                        </span>
                      </div>
                      <p className={`text-sm truncate w-full ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        {truncateMessage(chat.messages[chat.messages.length - 1].text)}
                      </p>
                    </div>
                  </div>
                ))}
              </ScrollArea>
            </div>
          )}
          
          {/* Active chat panel */}
          {(!isMobile || !showChatList) && (
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* Chat header */}
              <div className={`flex items-center justify-between p-3 border-b ${darkMode ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"}`}>
                <div className="flex items-center gap-3">
                  {isMobile && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="mr-1"
                      onClick={() => setShowChatList(true)}
                    >
                      <X size={18} />
                    </Button>
                  )}
                  <Avatar className="h-10 w-10 border border-transparent">
                    <AvatarFallback className="bg-blue-500 text-white">
                      {activeChat.user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className={`font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
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
              </div>
              
              {/* Messages area */}
              <ScrollArea 
                className={`flex-1 p-3 ${darkMode ? "bg-gray-950" : "bg-white"}`} 
                ref={scrollAreaRef}
              >
                <div className="space-y-4 px-2 pb-2">
                  <div className="flex justify-center">
                    <div className={`px-3 py-1 rounded-full text-xs ${darkMode ? "bg-gray-800 text-gray-400" : "bg-gray-100 text-gray-500"}`}>
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
                          "max-w-[70%] sm:max-w-[75%] md:max-w-[65%] rounded-xl px-4 py-2.5 shadow-sm break-words",
                          msg.sender === "me" 
                            ? "bg-blue-500 text-white rounded-br-none" 
                            : (darkMode ? "bg-gray-800 text-white rounded-bl-none" : "bg-gray-100 text-gray-800 rounded-bl-none")
                        )}
                      >
                        <p className="text-sm break-words whitespace-pre-wrap">{msg.text}</p>
                        <p 
                          className={cn(
                            "text-right text-xs mt-1",
                            msg.sender === "me" 
                              ? "text-blue-100" 
                              : (darkMode ? "text-gray-400" : "text-gray-500")
                          )}
                        >
                          {msg.time}
                        </p>
                      </div>
                    </div>
                  ))}
                  <div ref={messagesEndRef} />
                </div>
              </ScrollArea>
              
              {/* Message input area */}
              <div className={`p-3 border-t ${darkMode ? "border-gray-800 bg-gray-900" : "border-gray-200 bg-white"}`}>
                <div className="flex items-center gap-2">
                  <Button 
                    onClick={handleAttachClick}
                    size="icon" 
                    variant="ghost"
                    className={cn(
                      "rounded-full", 
                      darkMode ? "text-gray-300 hover:bg-gray-800" : "text-gray-400 hover:bg-gray-100"
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
                      darkMode ? "text-gray-300 hover:bg-gray-800" : "text-gray-400 hover:bg-gray-100"
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
                      darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-gray-100 border-gray-200"
                    )}
                  />
                  <Button 
                    onClick={sendMessage}
                    size="icon" 
                    disabled={!message.trim()}
                    className={cn(
                      "rounded-full",
                      !message.trim() 
                        ? (darkMode ? "bg-gray-800 text-gray-500" : "bg-gray-200 text-gray-400") 
                        : "bg-blue-500 hover:bg-blue-600"
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
      </div>
    </Layout>
  );
};

export default ChatPage;
