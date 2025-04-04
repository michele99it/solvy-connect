import { useState, useRef } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  Search, MapPin, Clock, Star, Map as MapIcon, CheckSquare, MessageCircle, 
  Briefcase, Zap, Award, ShieldCheck, Sparkles, Computer, Home, Tv, 
  Wrench, Music, BookOpen, Car, PaintBucket, UtensilsCrossed, Smartphone
} from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { useAppContext } from "@/contexts/AppContext";
import { useNavigate } from "react-router-dom";
import FakeMap from "@/components/FakeMap";
import { Slider } from "@/components/ui/slider";
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import { useIsMobile } from "@/hooks/use-mobile";

const getCategoryIcon = (category: string, size: number = 16) => {
  switch(category.toLowerCase()) {
    case 'tecnologia':
    case 'technology':
      return <Computer size={size} />;
    case 'casa':
    case 'home':
    case 'household':
      return <Home size={size} />;
    case 'elettronica':
    case 'electronics':
      return <Tv size={size} />;
    case 'istruzione':
    case 'education':
      return <BookOpen size={size} />;
    case 'traslochi':
    case 'moving':
      return <Briefcase size={size} />;
    case 'riparazioni':
    case 'repairs':
      return <Wrench size={size} />;
    case 'musica':
    case 'music':
      return <Music size={size} />;
    case 'creatività':
    case 'creativity':
      return <PaintBucket size={size} />;
    case 'esterni':
    case 'outdoors':
      return <Car size={size} />;
    case 'assistenza':
    case 'assistance':
      return <ShieldCheck size={size} />;
    case 'informatica':
    case 'computers':
      return <Computer size={size} />;
    default:
      return <Zap size={size} />;
  }
};

const requestsData = [
  {
    id: 1,
    title: "Aiuto con trasloco",
    category: "Casa",
    description: "Ho bisogno di aiuto per spostare alcuni mobili pesanti al secondo piano.",
    location: "Milano, Italia",
    distance: "2.5 km",
    timePosted: "3 ore fa",
    budget: "€50",
    user: {
      name: "Marco B.",
      image: "",
      rating: 4.8,
      reviews: 12
    }
  },
  {
    id: 2,
    title: "Riparazione computer",
    category: "Tecnologia",
    description: "Il mio computer non si avvia correttamente. Necessito di un esperto per diagnosticare il problema.",
    location: "Milano, Italia",
    distance: "4.2 km",
    timePosted: "1 giorno fa",
    budget: "€40",
    user: {
      name: "Luisa M.",
      image: "",
      rating: 4.5,
      reviews: 8
    }
  },
  {
    id: 3,
    title: "Lezioni di matematica",
    category: "Istruzione",
    description: "Cerco qualcuno per aiutare mio figlio con le equazioni di secondo grado. Due ore a settimana.",
    location: "Milano, Italia",
    distance: "1.8 km",
    timePosted: "5 ore fa",
    budget: "€25/ora",
    user: {
      name: "Giulia V.",
      image: "",
      rating: 5.0,
      reviews: 20
    }
  }
];

const recentRequestsData = [
  {
    id: 4,
    title: "Supporto per installazione TV",
    category: "Elettronica",
    description: "Ho acquistato una nuova TV e ho bisogno di aiuto per montarla a parete.",
    location: "Milano, Italia",
    distance: "3.7 km",
    timePosted: "1 ora fa",
    budget: "€35",
    user: {
      name: "Roberto P.",
      image: "",
      rating: 4.6,
      reviews: 9
    }
  },
  {
    id: 5,
    title: "Aiuto per progetto di design",
    category: "Creatività",
    description: "Cerco qualcuno con competenze in grafica per un piccolo progetto aziendale.",
    location: "Milano, Italia",
    distance: "5.1 km",
    timePosted: "3 ore fa",
    budget: "€70",
    user: {
      name: "Alessia T.",
      image: "",
      rating: 4.9,
      reviews: 15
    }
  }
];

const popularRequestsData = [
  {
    id: 6,
    title: "Giardinaggio e potatura siepi",
    category: "Esterni",
    description: "Ho un piccolo giardino che necessita di manutenzione e potatura siepi.",
    location: "Milano, Italia",
    distance: "1.2 km",
    timePosted: "2 giorni fa",
    budget: "€60",
    user: {
      name: "Matteo L.",
      image: "",
      rating: 4.7,
      reviews: 23
    }
  },
  {
    id: 7,
    title: "Lezioni di chitarra",
    category: "Musica",
    description: "Cerco un insegnante di chitarra per lezioni settimanali a domicilio.",
    location: "Milano, Italia",
    distance: "3.4 km",
    timePosted: "5 giorni fa",
    budget: "€30/ora",
    user: {
      name: "Cristina R.",
      image: "",
      rating: 4.8,
      reviews: 17
    }
  }
];

const solversData = [
  {
    id: 1,
    name: "Paolo R.",
    position: { x: 30, y: 40 },
    rating: 4.9,
    reviews: 27,
    skills: ["Elettricista", "Idraulico"],
    price: "€35/ora",
    image: ""
  },
  {
    id: 2,
    name: "Anna F.",
    position: { x: 45, y: 65 },
    rating: 4.7,
    reviews: 15,
    skills: ["Riparazioni PC", "Insegnante"],
    price: "€30/ora",
    image: ""
  },
  {
    id: 3,
    name: "Giovanni T.",
    position: { x: 65, y: 30 },
    rating: 4.8,
    reviews: 32,
    skills: ["Traslochi", "Montaggio mobili"],
    price: "€25/ora",
    image: ""
  },
  {
    id: 4,
    name: "Laura M.",
    position: { x: 80, y: 70 },
    rating: 5.0,
    reviews: 19,
    skills: ["Tutoraggio", "Web Design"],
    price: "€40/ora",
    image: ""
  }
];

const Dashboard = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showMap, setShowMap] = useState(false);
  const [selectedSolver, setSelectedSolver] = useState<typeof solversData[0] | null>(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<any>(null);
  const [hourlyRate, setHourlyRate] = useState(30);
  const [estimatedHours, setEstimatedHours] = useState(1);
  const [isFixedPrice, setIsFixedPrice] = useState(false);
  const [fixedPrice, setFixedPrice] = useState(30);
  
  const navigate = useNavigate();
  const { darkMode, language } = useAppContext();
  const isMobile = useIsMobile();
  
  const form = useForm({
    defaultValues: {
      hourlyRate: 30,
      hours: 1
    }
  });
  
  const userName = "Mario";
  
  const handleSolverClick = (solver: typeof solversData[0]) => {
    setSelectedSolver(solver);
  };
  
  const handleCloseHelperDetails = () => {
    setSelectedSolver(null);
  };

  const calculateEstimatedTotal = () => {
    return isFixedPrice ? fixedPrice : hourlyRate * estimatedHours;
  };

  const handleOfferHelp = (request: any) => {
    setSelectedRequest(request);
    
    let defaultHours = 1;
    if (request.budget.includes("ora")) {
      defaultHours = 1;
    } else if (parseFloat(request.budget.replace(/[^\d.]/g, '')) <= 25) {
      defaultHours = 1;
    } else if (parseFloat(request.budget.replace(/[^\d.]/g, '')) <= 40) {
      defaultHours = 1.5;
    } else {
      defaultHours = 2;
    }
    
    setHourlyRate(30);
    setEstimatedHours(defaultHours);
    setFixedPrice(parseFloat(request.budget.replace(/[^\d.]/g, '')) || 30);
    setIsFixedPrice(false);
    setConfirmationOpen(true);
  };

  const handleConfirm = () => {
    setConfirmationOpen(false);
    toast({
      title: language === "it" ? "Offerta inviata" : "Offer sent",
      description: language === "it" 
        ? `La tua offerta di aiuto è stata inviata a ${selectedRequest.user.name}` 
        : `Your offer to help has been sent to ${selectedRequest.user.name}`,
    });
    navigate("/chat");
  };

  const handleContact = (request: any) => {
    toast({
      title: language === "it" ? "Contatto avviato" : "Contact initiated",
      description: language === "it" 
        ? `Hai iniziato una chat con ${request.user.name}` 
        : `You started a chat with ${request.user.name}`,
    });
    navigate("/chat");
  };

  const renderRequestCards = (requests: typeof requestsData) => {
    return requests.map((request) => (
      <Card key={request.id} className={`overflow-hidden card-hover-effect elevation-1 ${darkMode ? "bg-gray-800 border-gray-700" : "border-gray-200"}`}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className={`text-lg font-poppins ${darkMode ? "text-white" : ""}`}>{request.title}</CardTitle>
              <Badge variant="secondary" className="mt-1 bg-blue-100 text-solvy-blue hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300 badge-glow flex items-center gap-1">
                {getCategoryIcon(request.category)}
                {request.category}
              </Badge>
            </div>
            <div className="text-right">
              <span className={`font-bold text-lg ${darkMode ? "text-blue-400" : "bg-gradient-to-r from-[#3a8dff] to-[#439cf8] bg-clip-text text-transparent"}`}>{request.budget}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pb-2">
          <p className={`text-sm ${darkMode ? "text-gray-300" : "text-solvy-gray"} line-clamp-2 mb-3`}>
            {request.description}
          </p>
          <div className="flex items-center gap-4 text-sm">
            <div className={`flex items-center ${darkMode ? "text-gray-400" : "text-solvy-gray"}`}>
              <MapPin size={14} className="mr-1" />
              <span>{request.distance}</span>
            </div>
            <div className={`flex items-center ${darkMode ? "text-gray-400" : "text-solvy-gray"}`}>
              <Clock size={14} className="mr-1" />
              <span>{request.timePosted}</span>
            </div>
          </div>
        </CardContent>
        <CardFooter className={`pt-2 border-t ${darkMode ? "border-gray-700" : "border-gray-200"} flex justify-between items-center`}>
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8 ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-800 ring-blue-100">
              <AvatarFallback className="bg-gradient-to-r from-[#3a8dff] to-[#439cf8] text-white">
                {request.user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className={`text-sm font-medium ${darkMode ? "text-white" : ""}`}>{request.user.name}</div>
              <div className={`flex items-center text-xs ${darkMode ? "text-gray-400" : "text-solvy-gray"}`}>
                <Star size={14} className="fill-yellow-400 text-yellow-400 mr-1" />
                <span>{request.user.rating} ({request.user.reviews})</span>
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button 
              size={isMobile ? "xs" : "sm"} 
              variant="contact"
              onClick={() => handleContact(request)}
            >
              {isMobile ? <MessageCircle size={14} /> : (
                <>
                  <MessageCircle size={16} />
                  {language === "it" ? "Contatta" : "Contact"}
                </>
              )}
            </Button>
            <Button 
              size={isMobile ? "xs" : "sm"} 
              variant="solvy-blue"
              onClick={() => handleOfferHelp(request)}
            >
              {language === "it" ? "Offri aiuto" : "Offer help"}
            </Button>
          </div>
        </CardFooter>
      </Card>
    ));
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-[#3a8dff] to-[#439cf8] -mx-4 -mt-6 px-4 py-10 md:py-16 md:-mx-6 md:px-6 rounded-b-[30px] mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold text-white font-poppins drop-shadow-sm">
              {language === "it" ? `Ciao ${userName}` : `Hello ${userName}`}
            </h1>
            <Badge className="bg-white/20 text-white border-none hover:bg-white/30">
              <Sparkles size={14} className="mr-1 text-yellow-300" />
              {language === "it" ? "Pro Solver" : "Pro Solver"}
            </Badge>
          </div>
          
          <p className="text-blue-100 mb-6 mt-1">
            {language === "it" ? "Trova soluzioni o offri il tuo aiuto" : "Find solutions or offer your help"}
          </p>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-solvy-gray" size={18} />
            <Input 
              className="pl-10 bg-white border-none shadow-md rounded-lg py-6"
              placeholder={language === "it" ? "Cerca richieste o competenze..." : "Search requests or skills..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        <div className="flex justify-between items-center">
          <Tabs defaultValue={showMap ? "map" : "nearby"} className="w-full" onValueChange={(value) => setShowMap(value === "map")}>
            <TabsList className={`w-full grid grid-cols-4 ${darkMode ? "bg-gray-800" : "bg-white"} p-1 rounded-lg`}>
              <TabsTrigger value="nearby" className="rounded-md">
                {language === "it" ? "Vicino a te" : "Nearby"}
              </TabsTrigger>
              <TabsTrigger value="recent" className="rounded-md">
                {language === "it" ? "Recenti" : "Recent"}
              </TabsTrigger>
              <TabsTrigger value="popular" className="rounded-md">
                {language === "it" ? "Popolari" : "Popular"}
              </TabsTrigger>
              <TabsTrigger value="map" className="flex items-center gap-1 rounded-md">
                <MapIcon size={16} />
                <span>{language === "it" ? "Mappa" : "Map"}</span>
              </TabsTrigger>
            </TabsList>
            
            <div className="flex flex-wrap gap-3 my-4">
              <Badge variant="outline" className="bg-white dark:bg-gray-800 px-3 py-1.5 flex items-center">
                <Home className="mr-1.5 h-3.5 w-3.5" />
                {language === "it" ? "Lavori domestici" : "Household"}
              </Badge>
              <Badge variant="outline" className="bg-white dark:bg-gray-800 px-3 py-1.5 flex items-center">
                <Tv className="mr-1.5 h-3.5 w-3.5" />
                {language === "it" ? "Elettronica" : "Electronics"}
              </Badge>
              <Badge variant="outline" className="bg-white dark:bg-gray-800 px-3 py-1.5 flex items-center">
                <BookOpen className="mr-1.5 h-3.5 w-3.5" />
                {language === "it" ? "Istruzione" : "Education"}
              </Badge>
              <Badge variant="outline" className="bg-white dark:bg-gray-800 px-3 py-1.5 flex items-center">
                <ShieldCheck className="mr-1.5 h-3.5 w-3.5" />
                {language === "it" ? "Assistenza" : "Assistance"}
              </Badge>
            </div>
            
            <TabsContent value="nearby" className="space-y-4 mt-2">
              {renderRequestCards(requestsData)}
            </TabsContent>
            
            <TabsContent value="recent" className="space-y-4 mt-2">
              {renderRequestCards(recentRequestsData)}
            </TabsContent>
            
            <TabsContent value="popular" className="space-y-4 mt-2">
              {renderRequestCards(popularRequestsData)}
            </TabsContent>
            
            <TabsContent value="map" className="mt-2">
              <Card className={`overflow-hidden elevation-2 ${darkMode ? "bg-gray-800 border-gray-700" : "border-gray-200"}`}>
                <CardContent className="p-0 relative">
                  <FakeMap solvers={solversData} onSolverClick={handleSolverClick} />
                  
                  {selectedSolver && (
                    <div className={`absolute bottom-0 left-0 right-0 ${darkMode ? "bg-gray-800" : "bg-white"} p-4 shadow-lg rounded-t-lg animate-slide-up z-50 elevation-3`}>
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-12 h-12 ring-2 ring-offset-2 ring-offset-white dark:ring-offset-gray-800 ring-blue-100">
                            <AvatarFallback className="bg-gradient-to-r from-[#3a8dff] to-[#439cf8] text-white">
                              {selectedSolver.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className={`font-medium text-lg ${darkMode ? "text-white" : ""}`}>{selectedSolver.name}</h3>
                            <div className={`flex items-center text-sm ${darkMode ? "text-gray-400" : "text-solvy-gray"}`}>
                              <Star size={14} className="fill-yellow-400 text-yellow-400 mr-1" />
                              <span>{selectedSolver.rating} ({selectedSolver.reviews} {language === "it" ? "recensioni" : "reviews"})</span>
                            </div>
                          </div>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          onClick={handleCloseHelperDetails}
                          className={darkMode ? "border-gray-600 text-white" : ""}
                        >
                          {language === "it" ? "Chiudi" : "Close"}
                        </Button>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <h4 className={`text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : ""}`}>
                            {language === "it" ? "Competenze:" : "Skills:"}
                          </h4>
                          <div className="flex flex-wrap gap-1">
                            {selectedSolver.skills.map((skill: string, index: number) => (
                              <Badge 
                                key={index} 
                                variant="secondary" 
                                className={darkMode 
                                  ? "bg-gray-700 text-gray-200" 
                                  : "bg-gradient-to-r from-blue-50 to-indigo-50 text-blue-600"}
                              >
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className={`text-sm font-medium mb-1 ${darkMode ? "text-gray-300" : ""}`}>
                            {language === "it" ? "Tariffa:" : "Rate:"}
                          </h4>
                          <p className="bg-gradient-to-r from-[#3a8dff] to-[#439cf8] bg-clip-text text-transparent font-bold">
                            {selectedSolver.price}
                          </p>
                        </div>
                        
                        <div className="flex gap-2 pt-2">
                          <Button className="flex-1" variant="contact">
                            {language === "it" ? "Contatta" : "Contact"}
                          </Button>
                          <Button 
                            variant="outline" 
                            className={`flex-1 ${darkMode ? "border-gray-600 text-white hover:bg-gray-700" : ""}`}
                          >
                            {language === "it" ? "Vedi profilo" : "View profile"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>

        <Dialog open={confirmationOpen} onOpenChange={setConfirmationOpen}>
          <DialogContent className={`sm:max-w-md max-h-[80vh] overflow-y-auto ${darkMode ? "bg-gray-800 border-gray-700 text-white" : ""}`}>
            <DialogHeader>
              <DialogTitle className={`${darkMode ? "text-white" : ""} font-poppins`}>
                {language === "it" ? "Conferma offerta di aiuto" : "Confirm help offer"}
              </DialogTitle>
              <DialogDescription className={darkMode ? "text-gray-400" : ""}>
                {language === "it" 
                  ? "Riepilogo della richiesta a cui offrirai aiuto" 
                  : "Summary of the request you'll be helping with"}
              </DialogDescription>
            </DialogHeader>
            
            {selectedRequest && (
              <div className="space-y-4">
                <div className={`p-4 rounded-lg border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-blue-50/50 border-blue-100"}`}>
                  <h3 className={`font-medium mb-2 ${darkMode ? "text-white" : ""}`}>
                    {language === "it" ? "Dettagli richiesta" : "Request details"}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className={darkMode ? "text-gray-400" : "text-gray-500"}>
                        {language === "it" ? "Servizio:" : "Service:"}
                      </span>
                      <span className="font-medium">{selectedRequest.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={darkMode ? "text-gray-400" : "text-gray-500"}>
                        {language === "it" ? "Categoria:" : "Category:"}
                      </span>
                      <span className="font-medium">{selectedRequest.category}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={darkMode ? "text-gray-400" : "text-gray-500"}>
                        {language === "it" ? "Cliente:" : "Client:"}
                      </span>
                      <span className="font-medium">{selectedRequest.user.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={darkMode ? "text-gray-400" : "text-gray-500"}>
                        {language === "it" ? "Budget cliente:" : "Client budget:"}
                      </span>
                      <span className="font-medium">{selectedRequest.budget}</span>
                    </div>
                  </div>
                </div>
                
                <div className={`p-4 rounded-lg border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-blue-50/50 border-blue-100"}`}>
                  <h3 className={`font-medium mb-2 ${darkMode ? "text-white" : ""}`}>
                    {language === "it" ? "La tua offerta" : "Your offer"}
                  </h3>
                  
                  <div className="space-y-4 text-sm">
                    <div className="flex items-center justify-between">
                      <span className={darkMode ? "text-gray-300" : "text-gray-700"}>
                        {language === "it" ? "Prezzo fisso:" : "Fixed price:"}
                      </span>
                      <Switch 
                        checked={isFixedPrice} 
                        onCheckedChange={setIsFixedPrice} 
                      />
                    </div>
                    
                    {isFixedPrice ? (
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className={darkMode ? "text-gray-400" : "text-gray-500"}>
                            {language === "it" ? "Prezzo totale:" : "Total price:"}
                          </span>
                          <span className="font-medium">€{fixedPrice}</span>
                        </div>
                        <Slider 
                          defaultValue={[fixedPrice]} 
                          value={[fixedPrice]}
                          min={15} 
                          max={200} 
                          step={5}
                          onValueChange={(value) => setFixedPrice(value[0])}
                          className={darkMode ? "py-2" : "py-2"}
                        />
                        <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                          <span>€15</span>
                          <span>€200</span>
                        </div>
                      </div>
                    ) : (
                      <>
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className={darkMode ? "text-gray-400" : "text-gray-500"}>
                              {language === "it" ? "Tariffa oraria:" : "Hourly rate:"}
                            </span>
                            <span className="font-medium">€{hourlyRate}</span>
                          </div>
                          <Slider 
                            defaultValue={[hourlyRate]} 
                            value={[hourlyRate]}
                            min={15} 
                            max={50} 
                            step={5}
                            onValueChange={(value) => setHourlyRate(value[0])}
                            className={darkMode ? "py-2" : "py-2"}
                          />
                          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                            <span>€15</span>
                            <span>€50</span>
                          </div>
                        </div>
                        
                        <div className="space-y-2">
                          <div className="flex justify-between">
                            <span className={darkMode ? "text-gray-400" : "text-gray-500"}>
                              {language === "it" ? "Durata stimata:" : "Estimated duration:"}
                            </span>
                            <span className="font-medium">
                              {estimatedHours === 1 
                                ? (language === "it" ? "1 ora" : "1 hour") 
                                : estimatedHours % 1 === 0 
                                  ? `${estimatedHours} ${language === "it" ? "ore" : "hours"}`
                                  : `${estimatedHours} ${language === "it" ? "ore" : "hours"}`
                              }
                            </span>
                          </div>
                          <Slider 
                            defaultValue={[estimatedHours]} 
                            value={[estimatedHours]}
                            min={0.5} 
                            max={5} 
                            step={0.5}
                            onValueChange={(value) => setEstimatedHours(value[0])}
                            className={darkMode ? "py-2" : "py-2"}
                          />
                          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400">
                            <span>0.5h</span>
                            <span>5h</span>
                          </div>
                        </div>
                      </>
                    )}
                    
                    <div className="border-t border-gray-200 dark:border-gray-600 my-2 pt-2"></div>
                    <div className="flex justify-between font-medium">
                      <span>{language === "it" ? "Totale stimato:" : "Estimated total:"}</span>
                      <span className="bg-gradient-to-r from-[#3a8dff] to-[#439cf8] bg-clip-text text-transparent font-bold">
                        €{calculateEstimatedTotal()}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center p-3 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-sm">
                  <CheckSquare className="text-solvy-blue mr-2 flex-shrink-0" size={16} />
                  <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                    {language === "it" 
                      ? "Offrendo il tuo aiuto, ti impegni a completare il lavoro come descritto. Il pagamento sarà gestito in modo sicuro tramite l'app."
                      : "By offering your help, you commit to completing the work as described. Payment will be securely handled through the app."}
                  </p>
                </div>
              </div>
            )}
            
            <DialogFooter className="flex-col sm:flex-col gap-2 mt-2 pb-2">
              <Button 
                onClick={handleConfirm}
                className="w-full"
                variant="solvy-blue"
              >
                {language === "it" ? "Conferma e contatta" : "Confirm and contact"}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setConfirmationOpen(false)}
                className={`w-full ${darkMode ? "border-gray-600 text-white hover:bg-gray-700" : ""}`}
              >
                {language === "it" ? "Torna indietro" : "Go back"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default Dashboard;
