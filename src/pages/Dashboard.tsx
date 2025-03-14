
import { useState, useRef } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, MapPin, Clock, Star, Map as MapIcon, CheckSquare } from "lucide-react";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { toast } from "@/components/ui/use-toast";
import { useAppContext } from "@/contexts/AppContext";
import { useNavigate } from "react-router-dom";
import FakeMap from "@/components/FakeMap";

// Dati di esempio
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

// Dati recenti di esempio
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

// Dati popolari di esempio
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

// Dati degli solver sulla mappa
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
  
  const navigate = useNavigate();
  const { darkMode, language } = useAppContext();
  
  // Immagina che questo sia il nome dell'utente recuperato dal backend
  const userName = "Mario";
  
  const handleSolverClick = (solver: typeof solversData[0]) => {
    setSelectedSolver(solver);
  };
  
  const handleCloseHelperDetails = () => {
    setSelectedSolver(null);
  };

  // Handle offering help for a request
  const handleOfferHelp = (request: any) => {
    setSelectedRequest(request);
    setConfirmationOpen(true);
  };

  // Handle confirmation for offering help
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

  // Funzione per renderizzare le card delle richieste
  const renderRequestCards = (requests: typeof requestsData) => {
    return requests.map((request) => (
      <Card key={request.id} className={`overflow-hidden ${darkMode ? "bg-gray-800 border-gray-700" : ""}`}>
        <CardHeader className="pb-2">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className={`text-lg ${darkMode ? "text-white" : ""}`}>{request.title}</CardTitle>
              <Badge variant="secondary" className="mt-1 bg-blue-100 text-solvy-blue hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-300">
                {request.category}
              </Badge>
            </div>
            <div className="text-right">
              <span className={`font-bold text-lg text-solvy-blue ${darkMode ? "text-blue-400" : ""}`}>{request.budget}</span>
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
        <CardFooter className={`pt-2 border-t ${darkMode ? "border-gray-700" : ""} flex justify-between items-center`}>
          <div className="flex items-center gap-2">
            <Avatar className="w-8 h-8">
              <AvatarFallback className="bg-solvy-blue/10 text-solvy-blue">
                {request.user.name.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className={`text-sm font-medium ${darkMode ? "text-white" : ""}`}>{request.user.name}</div>
              <div className={`flex items-center text-xs ${darkMode ? "text-gray-400" : "text-solvy-gray"}`}>
                <Star size={12} className="fill-yellow-400 text-yellow-400 mr-1" />
                <span>{request.user.rating} ({request.user.reviews})</span>
              </div>
            </div>
          </div>
          <Button 
            size="sm" 
            className="bg-solvy-blue hover:bg-solvy-blue/90"
            onClick={() => handleOfferHelp(request)}
          >
            {language === "it" ? "Offri aiuto" : "Offer help"}
          </Button>
        </CardFooter>
      </Card>
    ));
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-[#439cf8] font-montserrat">
            {language === "it" ? `Ciao ${userName}, la tua homepage` : `Hello ${userName}, your homepage`}
          </h1>
        </div>
        
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-solvy-gray" size={18} />
          <Input 
            className={`pl-10 ${darkMode ? "bg-gray-700 border-gray-600 text-white" : ""}`}
            placeholder={language === "it" ? "Cerca richieste..." : "Search requests..."}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex justify-between items-center">
          <Tabs defaultValue={showMap ? "map" : "nearby"} className="w-full" onValueChange={(value) => setShowMap(value === "map")}>
            <TabsList className={`w-full grid grid-cols-4 ${darkMode ? "bg-gray-800" : ""}`}>
              <TabsTrigger value="nearby">
                {language === "it" ? "Vicino a te" : "Nearby"}
              </TabsTrigger>
              <TabsTrigger value="recent">
                {language === "it" ? "Recenti" : "Recent"}
              </TabsTrigger>
              <TabsTrigger value="popular">
                {language === "it" ? "Popolari" : "Popular"}
              </TabsTrigger>
              <TabsTrigger value="map" className="flex items-center gap-1">
                <MapIcon size={16} />
                <span>{language === "it" ? "Mappa" : "Map"}</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="nearby" className="space-y-4 mt-4">
              {renderRequestCards(requestsData)}
            </TabsContent>
            
            <TabsContent value="recent" className="space-y-4 mt-4">
              {renderRequestCards(recentRequestsData)}
            </TabsContent>
            
            <TabsContent value="popular" className="space-y-4 mt-4">
              {renderRequestCards(popularRequestsData)}
            </TabsContent>
            
            <TabsContent value="map" className="mt-4">
              <Card className={`overflow-hidden ${darkMode ? "bg-gray-800 border-gray-700" : ""}`}>
                <CardContent className="p-0 relative">
                  <FakeMap solvers={solversData} onSolverClick={handleSolverClick} />
                  
                  {selectedSolver && (
                    <div className={`absolute bottom-0 left-0 right-0 ${darkMode ? "bg-gray-800" : "bg-white"} p-4 shadow-lg rounded-t-lg animate-slide-up z-50`}>
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback className="bg-solvy-blue/10 text-solvy-blue">
                              {selectedSolver.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className={`font-medium text-lg ${darkMode ? "text-white" : ""}`}>{selectedSolver.name}</h3>
                            <div className={`flex items-center text-sm ${darkMode ? "text-gray-400" : "text-solvy-gray"}`}>
                              <Star size={14} className="fill-yellow-400 text-yellow-400 mr-1" />
                              <span>
                                {selectedSolver.rating} ({selectedSolver.reviews} {language === "it" ? "recensioni" : "reviews"})
                              </span>
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
                                className={darkMode ? "bg-gray-700 text-gray-200" : "bg-blue-50 text-solvy-blue"}
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
                          <p className="text-solvy-blue font-bold">{selectedSolver.price}</p>
                        </div>
                        
                        <div className="flex gap-2 pt-2">
                          <Button className="flex-1 bg-solvy-blue hover:bg-solvy-blue/90">
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

        {/* Confirmation modal for offering help */}
        <Dialog open={confirmationOpen} onOpenChange={setConfirmationOpen}>
          <DialogContent className={`sm:max-w-md ${darkMode ? "bg-gray-800 border-gray-700 text-white" : ""}`}>
            <DialogHeader>
              <DialogTitle className={darkMode ? "text-white" : ""}>
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
                <div className={`p-4 rounded-lg border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50"}`}>
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
                
                <div className={`p-4 rounded-lg border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50"}`}>
                  <h3 className={`font-medium mb-2 ${darkMode ? "text-white" : ""}`}>
                    {language === "it" ? "La tua offerta" : "Your offer"}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className={darkMode ? "text-gray-400" : "text-gray-500"}>
                        {language === "it" ? "Tariffa oraria:" : "Hourly rate:"}
                      </span>
                      <span className="font-medium">€30</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={darkMode ? "text-gray-400" : "text-gray-500"}>
                        {language === "it" ? "Durata stimata:" : "Estimated duration:"}
                      </span>
                      <span className="font-medium">
                        {selectedRequest.budget.includes("ora") 
                          ? "1 ora" 
                          : selectedRequest.budget.includes("25") 
                            ? "1 ora" 
                            : selectedRequest.budget.includes("40") 
                              ? "1.5 ore" 
                              : "2 ore"}
                      </span>
                    </div>
                    <div className="border-t border-gray-200 dark:border-gray-600 my-2 pt-2"></div>
                    <div className="flex justify-between font-medium">
                      <span>{language === "it" ? "Totale stimato:" : "Estimated total:"}</span>
                      <span className="text-solvy-blue">
                        {selectedRequest.budget.includes("ora") 
                          ? "€30" 
                          : selectedRequest.budget.includes("25") 
                            ? "€30" 
                            : selectedRequest.budget.includes("40") 
                              ? "€45" 
                              : "€60"}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center p-2 rounded-lg bg-blue-50 dark:bg-blue-900/20 text-sm">
                  <CheckSquare className="text-solvy-blue mr-2 flex-shrink-0" size={16} />
                  <p className={darkMode ? "text-gray-300" : "text-gray-600"}>
                    {language === "it" 
                      ? "Offrendo il tuo aiuto, ti impegni a completare il lavoro come descritto. Il pagamento sarà gestito in modo sicuro tramite l'app."
                      : "By offering your help, you commit to completing the work as described. Payment will be securely handled through the app."}
                  </p>
                </div>
              </div>
            )}
            
            <DialogFooter className="flex-col sm:flex-col gap-2">
              <Button 
                onClick={handleConfirm}
                className="w-full bg-solvy-blue hover:bg-solvy-blue/90"
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
