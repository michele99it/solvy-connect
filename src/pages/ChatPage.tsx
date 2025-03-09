
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Send, MoreVertical, Phone, Video } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";

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
  const [activeChat, setActiveChat] = useState(chatsData[0]);
  const [message, setMessage] = useState("");
  
  const sendMessage = () => {
    if (message.trim()) {
      // In un'app reale, qui invieresti il messaggio al backend
      console.log("Sending message:", message);
      setMessage("");
    }
  };
  
  return (
    <Layout>
      <div className="flex h-[calc(100vh-8rem)] md:h-[calc(100vh-6rem)] rounded-lg overflow-hidden border">
        {/* Lista chat (visibile solo su desktop) */}
        <div className="hidden md:flex md:w-1/3 lg:w-1/4 flex-col border-r bg-white">
          <div className="p-4 border-b">
            <h2 className="font-semibold">Chat</h2>
          </div>
          <ScrollArea className="flex-1">
            {chatsData.map((chat) => (
              <div 
                key={chat.id}
                className={cn(
                  "flex items-center gap-3 p-4 cursor-pointer hover:bg-gray-50 transition-colors",
                  activeChat.id === chat.id && "bg-blue-50 hover:bg-blue-50"
                )}
                onClick={() => setActiveChat(chat)}
              >
                <div className="relative">
                  <Avatar>
                    <AvatarFallback className="bg-solvy-blue/10 text-solvy-blue">
                      {chat.user.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  {chat.user.online && (
                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-solvy-green rounded-full border-2 border-white"></span>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <h3 className="font-medium truncate">{chat.user.name}</h3>
                    <span className="text-xs text-solvy-gray">
                      {chat.messages[chat.messages.length - 1].time}
                    </span>
                  </div>
                  <p className="text-sm text-solvy-gray truncate">
                    {chat.messages[chat.messages.length - 1].text}
                  </p>
                </div>
              </div>
            ))}
          </ScrollArea>
        </div>
        
        {/* Area chat */}
        <div className="flex-1 flex flex-col bg-white">
          {/* Header chat */}
          <div className="flex items-center justify-between p-4 border-b">
            <div className="flex items-center gap-3">
              <Avatar>
                <AvatarFallback className="bg-solvy-blue/10 text-solvy-blue">
                  {activeChat.user.name.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-medium">{activeChat.user.name}</h3>
                <p className="text-xs text-solvy-gray">{activeChat.user.lastActive}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="text-solvy-gray">
                <Phone size={18} />
              </Button>
              <Button variant="ghost" size="icon" className="text-solvy-gray">
                <Video size={18} />
              </Button>
              <Button variant="ghost" size="icon" className="text-solvy-gray">
                <MoreVertical size={18} />
              </Button>
            </div>
          </div>
          
          {/* Area messaggi */}
          <ScrollArea className="flex-1 p-4 bg-gray-50">
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
                      "max-w-[80%] rounded-lg px-4 py-3",
                      msg.sender === "me" 
                        ? "bg-solvy-blue text-white rounded-br-none" 
                        : "bg-white border rounded-bl-none"
                    )}
                  >
                    <p>{msg.text}</p>
                    <p 
                      className={cn(
                        "text-right text-xs mt-1",
                        msg.sender === "me" ? "text-blue-100" : "text-solvy-gray"
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
          <div className="p-4 border-t">
            <div className="flex items-center gap-2">
              <Input 
                placeholder="Scrivi un messaggio..." 
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                className="flex-1"
              />
              <Button 
                onClick={sendMessage}
                size="icon" 
                className="bg-solvy-blue hover:bg-solvy-blue/90"
              >
                <Send size={18} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ChatPage;
