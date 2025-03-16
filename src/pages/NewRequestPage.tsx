
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { MapPin, Camera, Upload, ArrowLeft, Search, CheckSquare, Clock, CreditCard, Calendar, Zap, Award, Target } from "lucide-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useAppContext } from "@/contexts/AppContext";

// Database of categories and subcategories
const categoryDatabase = {
  casa: {
    name: { it: "Casa", en: "Home" },
    subcategories: [
      { id: "idraulica", name: { it: "Idraulica", en: "Plumbing" } },
      { id: "elettricita", name: { it: "Elettricità", en: "Electricity" } },
      { id: "mobili", name: { it: "Mobili", en: "Furniture" } },
      { id: "giardinaggio", name: { it: "Giardinaggio", en: "Gardening" } },
      { id: "pulizie", name: { it: "Pulizie", en: "Cleaning" } }
    ]
  },
  tecnologia: {
    name: { it: "Tecnologia", en: "Technology" },
    subcategories: [
      { id: "computer", name: { it: "Computer", en: "Computer" } },
      { id: "smartphone", name: { it: "Smartphone", en: "Smartphone" } },
      { id: "internet", name: { it: "Internet", en: "Internet" } },
      { id: "stampante", name: { it: "Stampante", en: "Printer" } },
      { id: "smart_home", name: { it: "Smart Home", en: "Smart Home" } }
    ]
  },
  istruzione: {
    name: { it: "Istruzione", en: "Education" },
    subcategories: [
      { id: "ripetizioni", name: { it: "Ripetizioni", en: "Tutoring" } },
      { id: "lingue", name: { it: "Lingue Straniere", en: "Languages" } },
      { id: "informatica", name: { it: "Informatica", en: "Computer Science" } },
      { id: "musica", name: { it: "Musica", en: "Music" } }
    ]
  },
  trasporti: {
    name: { it: "Trasporti", en: "Transportation" },
    subcategories: [
      { id: "auto", name: { it: "Automobile", en: "Car" } },
      { id: "moto", name: { it: "Moto", en: "Motorcycle" } },
      { id: "bicicletta", name: { it: "Bicicletta", en: "Bicycle" } }
    ]
  },
  benessere: {
    name: { it: "Benessere", en: "Wellness" },
    subcategories: [
      { id: "fitness", name: { it: "Fitness", en: "Fitness" } },
      { id: "yoga", name: { it: "Yoga", en: "Yoga" } },
      { id: "nutrizione", name: { it: "Nutrizione", en: "Nutrition" } }
    ]
  },
  altro: {
    name: { it: "Altro", en: "Other" },
    subcategories: [
      { id: "altro_generico", name: { it: "Specifiche nelle note", en: "Specify in notes" } }
    ]
  }
};

// Mock data for solvers simulation
const mockSolvers = [
  {
    id: 1,
    name: "Marco Bianchi",
    avatar: "",
    rating: 4.8,
    reviews: 32,
    skills: ["Riparazioni PC", "Reti WiFi", "Stampanti"],
    price: "€25/ora",
    distance: "2.5 km",
    availability: "Oggi",
  },
  {
    id: 2,
    name: "Laura Rossi",
    avatar: "",
    rating: 4.9,
    reviews: 45,
    skills: ["Installazione Software", "Rimozione Virus", "Computer Portatili"],
    price: "€30/ora",
    distance: "4 km",
    availability: "Domani",
  },
  {
    id: 3,
    name: "Giulio Verdi",
    avatar: "",
    rating: 4.6,
    reviews: 28,
    skills: ["Smart Home", "WiFi", "Telefonia"],
    price: "€22/ora",
    distance: "3.2 km",
    availability: "Oggi",
  }
];

const NewRequestPage = () => {
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { darkMode, language, translations } = useAppContext();
  
  const [location, setLocation] = useState("Milano, Italia");
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [description, setDescription] = useState("");
  const [budget, setBudget] = useState("");
  
  // Solver selection and confirmation states
  const [showSolvers, setShowSolvers] = useState(false);
  const [selectedSolver, setSelectedSolver] = useState<any>(null);
  const [confirmationOpen, setConfirmationOpen] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsLoading(false);
      setShowSolvers(true);
    }, 1000);
  };
  
  const handleSelectSolver = (solver: any) => {
    setSelectedSolver(solver);
    setConfirmationOpen(true);
  };
  
  const handleConfirm = () => {
    setConfirmationOpen(false);
    setShowSolvers(false);
    toast({
      title: language === "it" ? "Richiesta inviata" : "Request sent",
      description: language === "it" 
        ? `La tua richiesta è stata inviata a ${selectedSolver.name}` 
        : `Your request has been sent to ${selectedSolver.name}`,
    });
    navigate("/chat");
  };
  
  // Get subcategories based on selected category
  const getSubcategories = () => {
    if (!category || !categoryDatabase[category as keyof typeof categoryDatabase]) {
      return [];
    }
    
    return categoryDatabase[category as keyof typeof categoryDatabase].subcategories;
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center gap-3 mb-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
            className="text-foreground"
          >
            <ArrowLeft size={20} />
          </Button>
          <div>
            <h1 className="text-2xl font-bold font-montserrat">
              {language === "it" ? "Nuova Richiesta" : "New Request"}
            </h1>
            <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
              {language === "it" 
                ? "Trova la persona giusta per il tuo problema" 
                : "Find the right person for your problem"}
            </p>
          </div>
        </div>
        
        {!showSolvers ? (
          <Card className={`overflow-hidden ${darkMode ? "bg-gray-800 border-gray-700" : ""}`} variant={darkMode ? "default" : "gradient"}>
            <div className={`h-24 bg-gradient-to-r from-blue-500/20 to-purple-500/20 relative`}>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="flex flex-col items-center justify-center text-center px-4">
                  <p className={`text-sm font-medium ${darkMode ? "text-white" : "text-gray-700"}`}>
                    {language === "it" 
                      ? "Più dettagli fornisci, più facile sarà trovare la persona giusta" 
                      : "The more details you provide, the easier it will be to find the right person"}
                  </p>
                </div>
              </div>
            </div>
            
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle className={`text-lg ${darkMode ? "text-white" : ""}`}>
                  {language === "it" ? "Dettagli della richiesta" : "Request details"}
                </CardTitle>
                <CardDescription className={darkMode ? "text-gray-400" : ""}>
                  {language === "it" 
                    ? "Inserisci i dettagli della tua richiesta per trovare la persona giusta" 
                    : "Enter your request details to find the right person"}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-5">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Left column */}
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="title" className={darkMode ? "text-gray-300" : ""}>
                        {language === "it" ? "Titolo" : "Title"}
                      </Label>
                      <div className="relative">
                        <Target className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? "text-gray-400" : "text-blue-500"}`} size={18} />
                        <Input 
                          id="title" 
                          placeholder={language === "it" ? "Es: Riparazione computer" : "E.g.: Computer repair"}
                          required 
                          value={title}
                          onChange={(e) => setTitle(e.target.value)}
                          className={`pl-10 ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "border-blue-100 focus:border-blue-300"}`}
                        />
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="category" className={darkMode ? "text-gray-300" : ""}>
                        {language === "it" ? "Categoria" : "Category"}
                      </Label>
                      <Select
                        required
                        value={category}
                        onValueChange={(value) => {
                          setCategory(value);
                          setSubcategory("");
                        }}
                      >
                        <SelectTrigger id="category" className={`${darkMode ? "bg-gray-700 border-gray-600 text-white" : "border-blue-100 focus:border-blue-300"}`}>
                          <SelectValue placeholder={language === "it" ? "Seleziona una categoria" : "Select a category"} />
                        </SelectTrigger>
                        <SelectContent className={darkMode ? "bg-gray-800 border-gray-700 text-white" : ""}>
                          {Object.keys(categoryDatabase).map((catKey) => (
                            <SelectItem 
                              key={catKey} 
                              value={catKey}
                              className={darkMode ? "hover:bg-gray-700" : ""}
                            >
                              {categoryDatabase[catKey as keyof typeof categoryDatabase].name[language as keyof typeof categoryDatabase[keyof typeof categoryDatabase]['name']]}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    
                    {category && (
                      <div className="space-y-2">
                        <Label htmlFor="subcategory" className={darkMode ? "text-gray-300" : ""}>
                          {language === "it" ? "Sottocategoria" : "Subcategory"}
                        </Label>
                        <Select
                          required
                          value={subcategory}
                          onValueChange={setSubcategory}
                        >
                          <SelectTrigger id="subcategory" className={`${darkMode ? "bg-gray-700 border-gray-600 text-white" : "border-blue-100 focus:border-blue-300"}`}>
                            <SelectValue placeholder={language === "it" ? "Seleziona una sottocategoria" : "Select a subcategory"} />
                          </SelectTrigger>
                          <SelectContent className={darkMode ? "bg-gray-800 border-gray-700 text-white" : ""}>
                            {getSubcategories().map((subcat) => (
                              <SelectItem 
                                key={subcat.id} 
                                value={subcat.id}
                                className={darkMode ? "hover:bg-gray-700" : ""}
                              >
                                {subcat.name[language as keyof typeof subcat.name]}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    )}

                    <div className="space-y-2">
                      <Label htmlFor="location" className={darkMode ? "text-gray-300" : ""}>
                        {language === "it" ? "Posizione" : "Location"}
                      </Label>
                      <div className="relative">
                        <MapPin className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? "text-gray-400" : "text-blue-500"}`} size={18} />
                        <Input 
                          id="location" 
                          className={`pl-10 ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "border-blue-100 focus:border-blue-300"}`}
                          value={location}
                          onChange={(e) => setLocation(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  
                  {/* Right column */}
                  <div className="space-y-5">
                    <div className="space-y-2">
                      <Label htmlFor="description" className={darkMode ? "text-gray-300" : ""}>
                        {language === "it" ? "Descrizione" : "Description"}
                      </Label>
                      <Textarea 
                        id="description" 
                        placeholder={language === "it" ? "Descrivi in dettaglio di cosa hai bisogno..." : "Describe in detail what you need..."}
                        rows={4}
                        required
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className={`${darkMode ? "bg-gray-700 border-gray-600 text-white" : "border-blue-100 focus:border-blue-300"} min-h-[120px]`}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="budget" className={darkMode ? "text-gray-300" : ""}>
                        {language === "it" ? "Budget (opzionale)" : "Budget (optional)"}
                      </Label>
                      <div className="relative">
                        <CreditCard className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? "text-gray-400" : "text-blue-500"}`} size={18} />
                        <Input 
                          id="budget" 
                          type="number" 
                          className={`pl-10 ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "border-blue-100 focus:border-blue-300"}`}
                          placeholder={language === "it" ? "Importo in €" : "Amount in €"}
                          value={budget}
                          onChange={(e) => setBudget(e.target.value)}
                        />
                      </div>
                      <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                        {language === "it" 
                          ? "Opzionale. Un budget aiuta i solver a capire la complessità del lavoro." 
                          : "Optional. A budget helps solvers understand the complexity of the work."}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3 pt-2">
                  <Label className={darkMode ? "text-gray-300" : ""}>
                    {language === "it" ? "Foto (opzionale)" : "Photos (optional)"}
                  </Label>
                  <div className={`border border-dashed rounded-xl p-6 text-center transition-colors hover:bg-gray-50 dark:hover:bg-gray-700/50 ${darkMode ? "border-gray-600" : "border-blue-200"}`}>
                    <div className="flex flex-col items-center justify-center">
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 ${darkMode ? "bg-gray-700" : "bg-blue-50"}`}>
                        <Upload className={darkMode ? "text-gray-400" : "text-blue-500"} size={24} />
                      </div>
                      <p className={`text-sm mb-3 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                        {language === "it" ? "Trascina qui le foto o" : "Drag photos here or"}
                      </p>
                      <Button type="button" variant={darkMode ? "outline" : "accent"} size="sm" className={darkMode ? "border-gray-600 text-white" : ""}>
                        <Camera className="mr-2" size={16} />
                        {language === "it" ? "Aggiungi foto" : "Add photos"}
                      </Button>
                      <p className={`text-xs mt-3 ${darkMode ? "text-gray-500" : "text-gray-500"}`}>
                        {language === "it" 
                          ? "Le foto aiutano i solver a capire meglio il problema" 
                          : "Photos help solvers better understand the problem"}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                  <Card className={`border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-blue-50 border-blue-100"}`}>
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? "bg-gray-600" : "bg-blue-100"}`}>
                        <Zap className={darkMode ? "text-blue-400" : "text-blue-500"} size={20} />
                      </div>
                      <div>
                        <h3 className={`text-sm font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                          {language === "it" ? "Risposta rapida" : "Quick response"}
                        </h3>
                        <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                          {language === "it" ? "Ricevi risposte in pochi minuti" : "Get responses in minutes"}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className={`border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-green-50 border-green-100"}`}>
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? "bg-gray-600" : "bg-green-100"}`}>
                        <Award className={darkMode ? "text-green-400" : "text-green-500"} size={20} />
                      </div>
                      <div>
                        <h3 className={`text-sm font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                          {language === "it" ? "Professionisti verificati" : "Verified professionals"}
                        </h3>
                        <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                          {language === "it" ? "Solo solver qualificati" : "Only qualified solvers"}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Card className={`border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-purple-50 border-purple-100"}`}>
                    <CardContent className="p-4 flex items-center gap-3">
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? "bg-gray-600" : "bg-purple-100"}`}>
                        <Clock className={darkMode ? "text-purple-400" : "text-purple-500"} size={20} />
                      </div>
                      <div>
                        <h3 className={`text-sm font-medium ${darkMode ? "text-white" : "text-gray-900"}`}>
                          {language === "it" ? "Quando vuoi tu" : "On your schedule"}
                        </h3>
                        <p className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                          {language === "it" ? "Flessibilità negli orari" : "Flexible timing"}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </CardContent>
              
              <CardFooter className="flex-col space-y-3 px-6 pb-6">
                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md shadow-blue-500/20 hover:shadow-blue-600/30"
                  disabled={isLoading}
                  size="lg"
                >
                  {isLoading 
                    ? (language === "it" ? "Ricerca..." : "Searching...") 
                    : (language === "it" ? "Cerca solver disponibili" : "Find available solvers")}
                </Button>
                <Button 
                  type="button" 
                  variant="outline" 
                  className={`w-full ${darkMode ? "border-gray-600 text-white hover:bg-gray-700" : ""}`}
                  onClick={() => navigate(-1)}
                >
                  {language === "it" ? "Annulla" : "Cancel"}
                </Button>
              </CardFooter>
            </form>
          </Card>
        ) : (
          <div className="space-y-4">
            <Card className={`overflow-hidden ${darkMode ? "bg-gray-800 border-gray-700" : ""}`} variant={darkMode ? "default" : "accent"}>
              <div className={`h-24 bg-gradient-to-r from-blue-500/20 to-purple-500/20 relative`}>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex flex-col items-center justify-center text-center px-4">
                    <h3 className={`text-lg font-medium ${darkMode ? "text-white" : "text-gray-800"}`}>
                      {language === "it" ? "Solver pronti ad aiutarti" : "Solvers ready to help you"}
                    </h3>
                    <p className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                      {language === "it" 
                        ? `Trovati ${mockSolvers.length} solver per "${title}"` 
                        : `Found ${mockSolvers.length} solvers for "${title}"`}
                    </p>
                  </div>
                </div>
              </div>
              
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className={`text-lg ${darkMode ? "text-white" : ""}`}>
                      {language === "it" ? "Solver disponibili" : "Available solvers"}
                    </CardTitle>
                    <CardDescription className={darkMode ? "text-gray-400" : ""}>
                      {language === "it" 
                        ? `a ${location}` 
                        : `at ${location}`}
                    </CardDescription>
                  </div>
                  <div className="relative">
                    <Search className={`absolute left-3 top-1/2 transform -translate-y-1/2 ${darkMode ? "text-gray-400" : "text-gray-500"}`} size={16} />
                    <Input 
                      placeholder={language === "it" ? "Filtra solver..." : "Filter solvers..."}
                      className={`pl-9 w-52 ${darkMode ? "bg-gray-700 border-gray-600 text-white" : "bg-gray-50"}`}
                    />
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="p-0">
                <div className={`divide-y ${darkMode ? "divide-gray-700" : "divide-gray-100"}`}>
                  {mockSolvers.map((solver) => (
                    <div key={solver.id} className={`p-5 transition-colors ${darkMode ? "hover:bg-gray-700" : "hover:bg-gray-50"}`}>
                      <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                        <div className="flex gap-4">
                          <Avatar className="h-14 w-14 border-2 border-white dark:border-gray-800 shadow-sm">
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white text-lg">
                              {solver.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className={`font-medium text-lg ${darkMode ? "text-white" : ""}`}>{solver.name}</h3>
                            <div className="flex items-center text-yellow-500 text-sm my-1">
                              {'★'.repeat(Math.floor(solver.rating))}
                              <span className={`ml-1 ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                                {solver.rating} ({solver.reviews} {language === "it" ? "recensioni" : "reviews"})
                              </span>
                            </div>
                            
                            <div className="flex flex-wrap gap-1 mt-2">
                              {solver.skills.map((skill, index) => (
                                <Badge key={index} variant="secondary" className={`${darkMode ? "bg-gray-700" : "bg-blue-50 text-blue-700"}`}>
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-col gap-3 md:items-end mt-3 md:mt-0">
                          <Badge variant="outline" className={`bg-blue-500/10 text-blue-600 border-blue-200 dark:bg-blue-900/20 dark:text-blue-400 dark:border-blue-900/50 px-3 py-1`}>
                            <MapPin className="w-3.5 h-3.5 mr-1 inline" /> {solver.distance}
                          </Badge>
                          
                          <div className="flex flex-col gap-1 mt-1">
                            <div className={`text-sm font-semibold ${darkMode ? "text-white" : "text-gray-800"}`}>
                              {solver.price}
                            </div>
                            <div className={`text-xs flex items-center ${darkMode ? "text-green-400" : "text-green-600"}`}>
                              <Clock className="w-3.5 h-3.5 mr-1" />
                              <span>{solver.availability}</span>
                            </div>
                          </div>
                          
                          <Button 
                            onClick={() => handleSelectSolver(solver)}
                            className="mt-3 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md shadow-blue-500/20 hover:shadow-blue-600/30"
                          >
                            {language === "it" ? "Offri aiuto" : "Offer help"}
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-center pt-4 px-6 pb-6">
                <Button 
                  variant="outline" 
                  className={`w-full ${darkMode ? "border-gray-600 text-white hover:bg-gray-700" : ""}`}
                  onClick={() => setShowSolvers(false)}
                >
                  {language === "it" ? "Torna alla richiesta" : "Back to request"}
                </Button>
              </CardFooter>
            </Card>
          </div>
        )}
        
        {/* Confirmation modal */}
        <Dialog open={confirmationOpen} onOpenChange={setConfirmationOpen}>
          <DialogContent className={`sm:max-w-md rounded-xl ${darkMode ? "bg-gray-800 border-gray-700 text-white" : "bg-white"}`}>
            <DialogHeader>
              <DialogTitle className={darkMode ? "text-white" : ""}>
                {language === "it" ? "Conferma richiesta" : "Confirm request"}
              </DialogTitle>
              <DialogDescription className={darkMode ? "text-gray-400" : ""}>
                {language === "it" 
                  ? "Riepilogo della tua richiesta di assistenza" 
                  : "Summary of your assistance request"}
              </DialogDescription>
            </DialogHeader>
            
            {selectedSolver && (
              <div className="space-y-4">
                <div className={`p-4 rounded-lg border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-gray-50 border-gray-100"}`}>
                  <h3 className={`font-medium mb-2 ${darkMode ? "text-white" : ""}`}>
                    {language === "it" ? "Dettagli richiesta" : "Request details"}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className={darkMode ? "text-gray-400" : "text-gray-500"}>
                        {language === "it" ? "Servizio:" : "Service:"}
                      </span>
                      <span className="font-medium">{title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={darkMode ? "text-gray-400" : "text-gray-500"}>
                        {language === "it" ? "Categoria:" : "Category:"}
                      </span>
                      <span className="font-medium">
                        {category && categoryDatabase[category as keyof typeof categoryDatabase].name[language as keyof typeof categoryDatabase[keyof typeof categoryDatabase]['name']]}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className={darkMode ? "text-gray-400" : "text-gray-500"}>
                        {language === "it" ? "Solver:" : "Solver:"}
                      </span>
                      <span className="font-medium">{selectedSolver.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={darkMode ? "text-gray-400" : "text-gray-500"}>
                        {language === "it" ? "Tariffa:" : "Rate:"}
                      </span>
                      <span className="font-medium">{selectedSolver.price}</span>
                    </div>
                  </div>
                </div>
                
                <div className={`p-4 rounded-lg border ${darkMode ? "bg-gray-700 border-gray-600" : "bg-blue-50 border-blue-100"}`}>
                  <h3 className={`font-medium mb-2 ${darkMode ? "text-white" : "text-blue-800"}`}>
                    {language === "it" ? "Stima dei costi" : "Cost estimate"}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className={darkMode ? "text-gray-400" : "text-gray-600"}>
                        {language === "it" ? "Tariffa oraria:" : "Hourly rate:"}
                      </span>
                      <span className="font-medium">{selectedSolver.price.replace("/ora", "").replace("/hour", "")}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className={darkMode ? "text-gray-400" : "text-gray-600"}>
                        {language === "it" ? "Durata stimata:" : "Estimated duration:"}
                      </span>
                      <span className="font-medium">2 {language === "it" ? "ore" : "hours"}</span>
                    </div>
                    <div className={`border-t my-2 pt-2 ${darkMode ? "border-gray-600" : "border-blue-200"}`}></div>
                    <div className="flex justify-between font-medium">
                      <span>{language === "it" ? "Totale stimato:" : "Estimated total:"}</span>
                      <span className={darkMode ? "text-blue-400" : "text-blue-700"}>
                        {selectedSolver.price.includes("25") ? "€50" : (selectedSolver.price.includes("30") ? "€60" : "€44")}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className={`flex items-center p-3 rounded-lg ${darkMode ? "bg-blue-900/20 text-blue-300" : "bg-blue-50 text-blue-700"}`}>
                  <CheckSquare className={darkMode ? "text-blue-400" : "text-blue-500"} size={16} />
                  <p className="text-sm ml-2">
                    {language === "it" 
                      ? "Il pagamento sarà gestito in modo sicuro tramite l'app dopo il completamento del servizio."
                      : "Payment will be securely handled through the app after service completion."}
                  </p>
                </div>
              </div>
            )}
            
            <DialogFooter className="flex-col sm:flex-col gap-2 mt-2">
              <Button 
                onClick={handleConfirm}
                className="w-full bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white shadow-md shadow-blue-500/20 hover:shadow-blue-600/30"
              >
                {language === "it" ? "Conferma e contatta" : "Confirm and contact"}
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setConfirmationOpen(false)}
                className={`w-full ${darkMode ? "border-gray-600 text-white hover:bg-gray-700" : ""}`}
              >
                {language === "it" ? "Torna alla lista" : "Back to list"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
};

export default NewRequestPage;
