
import { useState, useRef, useEffect } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, MapPin, Clock, Star, Map as MapIcon } from "lucide-react";
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
  const [isSearchSticky, setIsSearchSticky] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  
  // Immagina che questo sia il nome dell'utente recuperato dal backend
  const userName = "Mario";
  
  useEffect(() => {
    const handleScroll = () => {
      if (searchRef.current) {
        const { top } = searchRef.current.getBoundingClientRect();
        setIsSearchSticky(top <= 0);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  
  const handleSolverClick = (solver: typeof solversData[0]) => {
    setSelectedSolver(solver);
  };
  
  const handleCloseHelperDetails = () => {
    setSelectedSolver(null);
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold font-montserrat">Ciao {userName}, la tua homepage</h1>
        </div>
        
        {isSearchSticky && (
          <div className="fixed top-16 left-0 right-0 z-20 bg-white shadow-md py-2 px-4">
            <div className="container max-w-screen-lg mx-auto">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-solvy-gray" size={18} />
                <Input 
                  className="pl-10" 
                  placeholder="Cerca richieste..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
          </div>
        )}
        
        <div ref={searchRef} className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-solvy-gray" size={18} />
          <Input 
            className="pl-10" 
            placeholder="Cerca richieste..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex justify-between items-center">
          <Tabs defaultValue={showMap ? "map" : "nearby"} className="w-full" onValueChange={(value) => setShowMap(value === "map")}>
            <TabsList className="w-full grid grid-cols-4">
              <TabsTrigger value="nearby">Vicino a te</TabsTrigger>
              <TabsTrigger value="recent">Recenti</TabsTrigger>
              <TabsTrigger value="popular">Popolari</TabsTrigger>
              <TabsTrigger value="map" className="flex items-center gap-1">
                <MapIcon size={16} />
                <span>Mappa</span>
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="nearby" className="space-y-4 mt-4">
              {requestsData.map((request) => (
                <Card key={request.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-lg">{request.title}</CardTitle>
                        <Badge variant="secondary" className="mt-1 bg-blue-100 text-solvy-blue hover:bg-blue-200">
                          {request.category}
                        </Badge>
                      </div>
                      <div className="text-right">
                        <span className="font-bold text-lg text-solvy-blue">{request.budget}</span>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent className="pb-2">
                    <p className="text-sm text-solvy-gray line-clamp-2 mb-3">
                      {request.description}
                    </p>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center text-solvy-gray">
                        <MapPin size={14} className="mr-1" />
                        <span>{request.distance}</span>
                      </div>
                      <div className="flex items-center text-solvy-gray">
                        <Clock size={14} className="mr-1" />
                        <span>{request.timePosted}</span>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="pt-2 border-t flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-solvy-blue/10 text-solvy-blue">
                          {request.user.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="text-sm font-medium">{request.user.name}</div>
                        <div className="flex items-center text-xs text-solvy-gray">
                          <Star size={12} className="fill-yellow-400 text-yellow-400 mr-1" />
                          <span>{request.user.rating} ({request.user.reviews})</span>
                        </div>
                      </div>
                    </div>
                    <Button size="sm" className="bg-solvy-blue hover:bg-solvy-blue/90">
                      Offri aiuto
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </TabsContent>
            
            <TabsContent value="recent" className="space-y-4 mt-4">
              <div className="text-center py-12 text-solvy-gray">
                <p>Caricamento richieste recenti...</p>
              </div>
            </TabsContent>
            
            <TabsContent value="popular" className="space-y-4 mt-4">
              <div className="text-center py-12 text-solvy-gray">
                <p>Caricamento richieste popolari...</p>
              </div>
            </TabsContent>
            
            <TabsContent value="map" className="mt-4">
              <Card className="overflow-hidden">
                <CardContent className="p-0 relative">
                  <FakeMap solvers={solversData} onSolverClick={handleSolverClick} />
                  
                  {selectedSolver && (
                    <div className="absolute bottom-0 left-0 right-0 bg-white p-4 shadow-lg rounded-t-lg animate-slide-up z-50">
                      <div className="flex justify-between items-start mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-12 h-12">
                            <AvatarFallback className="bg-solvy-blue/10 text-solvy-blue">
                              {selectedSolver.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium text-lg">{selectedSolver.name}</h3>
                            <div className="flex items-center text-sm text-solvy-gray">
                              <Star size={14} className="fill-yellow-400 text-yellow-400 mr-1" />
                              <span>{selectedSolver.rating} ({selectedSolver.reviews} recensioni)</span>
                            </div>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" onClick={handleCloseHelperDetails}>
                          Chiudi
                        </Button>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <h4 className="text-sm font-medium mb-1">Competenze:</h4>
                          <div className="flex flex-wrap gap-1">
                            {selectedSolver.skills.map((skill, index) => (
                              <Badge key={index} variant="secondary" className="bg-blue-50 text-solvy-blue">
                                {skill}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="text-sm font-medium mb-1">Tariffa:</h4>
                          <p className="text-solvy-blue font-bold">{selectedSolver.price}</p>
                        </div>
                        
                        <div className="flex gap-2 pt-2">
                          <Button className="flex-1 bg-solvy-blue hover:bg-solvy-blue/90">
                            Contatta
                          </Button>
                          <Button variant="outline" className="flex-1">
                            Vedi profilo
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
      </div>
    </Layout>
  );
};

export default Dashboard;
