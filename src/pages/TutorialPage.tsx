
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Search, ThumbsUp, BookOpen, Star, Clock, Eye, ArrowRight, PlayCircle, CheckCircle2, Lightbulb, Wrench, Zap } from "lucide-react";
import { useAppContext } from "@/contexts/AppContext";
import { cn } from "@/lib/utils";
import { CategoryIcon } from "@/components/CategoryIcon";
import { CategoryType } from "@/components/CategoryIcon";

interface Tutorial {
  id: number;
  title: string;
  category: CategoryType;
  description: string;
  thumbnailUrl: string;
  duration: string;
  author: string;
  authorImage: string;
  views: number;
  likes: number;
  featured?: boolean;
  difficulty: "beginner" | "intermediate" | "advanced";
}

const TutorialPage = () => {
  const { darkMode, language } = useAppContext();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  const categories = [
    { id: "technology", name: language === "it" ? "Tecnologia" : "Technology" },
    { id: "home", name: language === "it" ? "Casa" : "Home" },
    { id: "maintenance", name: language === "it" ? "Riparazioni" : "Repairs" },
    { id: "education", name: language === "it" ? "Formazione" : "Education" },
    { id: "food", name: language === "it" ? "Cucina" : "Cooking" },
    { id: "other", name: language === "it" ? "Altro" : "Other" },
  ];
  
  const tutorials: Tutorial[] = [
    {
      id: 1,
      title: language === "it" ? "Come riparare uno smartphone con schermo rotto" : "How to fix a smartphone with broken screen",
      category: "technology",
      description: language === "it" 
        ? "Una guida passo passo per sostituire lo schermo del tuo smartphone danneggiato con strumenti di base." 
        : "A step-by-step guide to replacing your damaged smartphone screen with basic tools.",
      thumbnailUrl: "https://source.unsplash.com/random/800x450/?smartphone",
      duration: "15:30",
      author: "Marco T.",
      authorImage: "",
      views: 1542,
      likes: 124,
      featured: true,
      difficulty: "intermediate"
    },
    {
      id: 2,
      title: language === "it" ? "Riparare una perdita d'acqua sotto il lavandino" : "Fix a water leak under the sink",
      category: "home",
      description: language === "it" 
        ? "Scopri come individuare e riparare una perdita d'acqua sotto il lavandino senza chiamare un idraulico." 
        : "Learn how to locate and fix a water leak under the sink without calling a plumber.",
      thumbnailUrl: "https://source.unsplash.com/random/800x450/?plumbing",
      duration: "08:45",
      author: "Anna V.",
      authorImage: "",
      views: 987,
      likes: 76,
      difficulty: "beginner"
    },
    {
      id: 3,
      title: language === "it" ? "Sostituzione della scheda madre del computer" : "Replacing a computer motherboard",
      category: "technology",
      description: language === "it" 
        ? "Tutorial completo su come rimuovere e sostituire la scheda madre di un computer desktop." 
        : "Complete tutorial on how to remove and replace a desktop computer's motherboard.",
      thumbnailUrl: "https://source.unsplash.com/random/800x450/?computer",
      duration: "28:15",
      author: "Luca B.",
      authorImage: "",
      views: 2341,
      likes: 218,
      difficulty: "advanced"
    },
    {
      id: 4,
      title: language === "it" ? "Riparare una sedia con gamba rotta" : "Fixing a chair with a broken leg",
      category: "home",
      description: language === "it" 
        ? "Impara a riparare una sedia con una gamba rotta utilizzando strumenti semplici e colla per legno." 
        : "Learn how to fix a chair with a broken leg using simple tools and wood glue.",
      thumbnailUrl: "https://source.unsplash.com/random/800x450/?chair",
      duration: "12:20",
      author: "Sofia M.",
      authorImage: "",
      views: 756,
      likes: 62,
      difficulty: "beginner"
    },
    {
      id: 5,
      title: language === "it" ? "Configurazione di un router Wi-Fi per prestazioni ottimali" : "Setting up a Wi-Fi router for optimal performance",
      category: "technology",
      description: language === "it" 
        ? "Come configurare il tuo router Wi-Fi domestico per ottenere la massima copertura e velocità." 
        : "How to set up your home Wi-Fi router for maximum coverage and speed.",
      thumbnailUrl: "https://source.unsplash.com/random/800x450/?router",
      duration: "18:50",
      author: "Roberto D.",
      authorImage: "",
      views: 1876,
      likes: 143,
      featured: true,
      difficulty: "intermediate"
    },
    {
      id: 6,
      title: language === "it" ? "Riparazione di un rubinetto che gocciola" : "Fixing a dripping faucet",
      category: "maintenance",
      description: language === "it" 
        ? "Una guida pratica su come riparare un rubinetto che gocciola e risparmiare sulla bolletta dell'acqua." 
        : "A practical guide on how to fix a dripping faucet and save on your water bill.",
      thumbnailUrl: "https://source.unsplash.com/random/800x450/?faucet",
      duration: "10:15",
      author: "Giulia P.",
      authorImage: "",
      views: 1120,
      likes: 94,
      difficulty: "beginner"
    },
  ];
  
  const filteredTutorials = tutorials.filter(tutorial => {
    // Filter by search term
    const matchesSearch = tutorial.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         tutorial.description.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter by category if one is selected
    const matchesCategory = selectedCategory ? tutorial.category === selectedCategory : true;
    
    return matchesSearch && matchesCategory;
  });
  
  const featuredTutorials = tutorials.filter(tutorial => tutorial.featured);
  
  // Helper function to get difficulty badge color
  const getDifficultyColor = (difficulty: string, isDark: boolean) => {
    switch (difficulty) {
      case "beginner":
        return isDark ? "bg-green-900/30 text-green-400 border-green-800" : "bg-green-50 text-green-700 border-green-100";
      case "intermediate":
        return isDark ? "bg-blue-900/30 text-blue-400 border-blue-800" : "bg-blue-50 text-blue-700 border-blue-100";
      case "advanced":
        return isDark ? "bg-purple-900/30 text-purple-400 border-purple-800" : "bg-purple-50 text-purple-700 border-purple-100";
      default:
        return isDark ? "bg-gray-800 text-gray-300 border-gray-700" : "bg-gray-100 text-gray-700 border-gray-200";
    }
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="bg-gradient-to-r from-[#3a8dff] to-[#439cf8] -mx-4 -mt-6 px-4 py-10 md:py-16 md:-mx-6 md:px-6 rounded-b-[30px] mb-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl md:text-3xl font-bold text-white font-poppins drop-shadow-sm">
              {language === "it" ? "Tutorial" : "Tutorials"}
            </h1>
            <Badge className="bg-white/20 text-white border-none hover:bg-white/30">
              <BookOpen size={14} className="mr-1 text-white" />
              {language === "it" ? "Guide pratiche" : "Practical guides"}
            </Badge>
          </div>
          
          <p className="text-blue-100 mb-6 mt-1">
            {language === "it" ? "Impara a risolvere problemi comuni con le nostre guide passo passo" : "Learn to solve common problems with our step-by-step guides"}
          </p>
          
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-solvy-gray" size={18} />
            <Input 
              className="pl-10 bg-white border-none shadow-md rounded-lg py-6"
              placeholder={language === "it" ? "Cerca tutorial..." : "Search tutorials..."}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        
        {/* Featured Tutorials */}
        {featuredTutorials.length > 0 && searchTerm === "" && !selectedCategory && (
          <div className="mb-8">
            <div className="flex items-center justify-between mb-4">
              <h2 className={`text-xl font-semibold ${darkMode ? "text-white" : ""}`}>
                {language === "it" ? "Tutorial in evidenza" : "Featured Tutorials"}
              </h2>
              <Button variant="ghost" size="sm" className={darkMode ? "text-blue-400" : "text-solvy-blue"}>
                {language === "it" ? "Vedi tutti" : "View all"} <ArrowRight className="ml-1" size={16} />
              </Button>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {featuredTutorials.map(tutorial => (
                <Card key={tutorial.id} className={`overflow-hidden group transition-all duration-300 hover:shadow-lg ${darkMode ? "bg-gray-800 border-gray-700 hover:border-blue-900" : "hover:border-blue-200"}`}>
                  <div className="relative h-48">
                    <img 
                      src={tutorial.thumbnailUrl} 
                      alt={tutorial.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end p-4">
                      <div>
                        <Badge className="bg-blue-500 hover:bg-blue-600 border-none mb-2">
                          {language === "it" ? "In evidenza" : "Featured"}
                        </Badge>
                        <h3 className="text-white text-lg font-medium line-clamp-2">{tutorial.title}</h3>
                      </div>
                    </div>
                    <div className="absolute top-3 right-3 bg-black/70 text-white text-xs px-2 py-1 rounded-md flex items-center">
                      <Clock size={12} className="mr-1" />
                      {tutorial.duration}
                    </div>
                  </div>
                  <CardContent className="pt-4">
                    <div className="flex items-center gap-2 mb-3">
                      <CategoryIcon category={tutorial.category as CategoryType} size={14} bgClassName="w-6 h-6" />
                      <span className={`text-sm ${darkMode ? "text-gray-300" : "text-gray-600"}`}>
                        {categories.find(c => c.id === tutorial.category)?.name}
                      </span>
                      <div className="flex-1"></div>
                      <Badge variant="outline" className={`border ${getDifficultyColor(tutorial.difficulty, darkMode)}`}>
                        {tutorial.difficulty === "beginner" 
                          ? (language === "it" ? "Principiante" : "Beginner")
                          : tutorial.difficulty === "intermediate"
                            ? (language === "it" ? "Intermedio" : "Intermediate")
                            : (language === "it" ? "Avanzato" : "Advanced")
                        }
                      </Badge>
                    </div>
                    <p className={`text-sm line-clamp-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                      {tutorial.description}
                    </p>
                  </CardContent>
                  <CardFooter className={`border-t flex justify-between items-center ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                    <div className="flex items-center gap-2">
                      <Avatar className="w-7 h-7">
                        <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs">
                          {tutorial.author.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      <span className={`text-sm font-medium ${darkMode ? "text-gray-300" : ""}`}>{tutorial.author}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <Eye size={14} />
                        <span>{tutorial.views}</span>
                      </div>
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <ThumbsUp size={14} />
                        <span>{tutorial.likes}</span>
                      </div>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        )}
        
        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-4">
          <Button 
            variant={selectedCategory === null ? "soft" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(null)}
            className="flex items-center gap-1.5"
          >
            <Lightbulb size={14} />
            {language === "it" ? "Tutti" : "All"}
          </Button>
          
          {categories.map(category => (
            <Button 
              key={category.id}
              variant={selectedCategory === category.id ? "soft" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category.id)}
              className="flex items-center gap-1.5"
            >
              <CategoryIcon 
                category={category.id as CategoryType} 
                size={14} 
                bgClassName="w-5 h-5"
              />
              {category.name}
            </Button>
          ))}
        </div>
        
        {/* Tutorial Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredTutorials.map(tutorial => (
            <Card key={tutorial.id} className={`overflow-hidden hover-card ${darkMode ? "bg-gray-800 border-gray-700" : "border-gray-200"}`}>
              <div className="relative">
                <img 
                  src={tutorial.thumbnailUrl} 
                  alt={tutorial.title}
                  className="w-full h-32 object-cover"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button variant="ghost" size="icon" className="rounded-full bg-white/20 hover:bg-white/40 text-white">
                    <PlayCircle size={36} />
                  </Button>
                </div>
                <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded-md flex items-center">
                  <Clock size={12} className="mr-1" />
                  {tutorial.duration}
                </div>
              </div>
              
              <CardHeader className="pb-2">
                <div className="flex items-center gap-2 mb-2">
                  <CategoryIcon category={tutorial.category as CategoryType} size={14} bgClassName="w-6 h-6" />
                  <span className={`text-xs ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    {categories.find(c => c.id === tutorial.category)?.name}
                  </span>
                  <div className="flex-1"></div>
                  <Badge variant="outline" className={`text-xs border ${getDifficultyColor(tutorial.difficulty, darkMode)}`}>
                    {tutorial.difficulty === "beginner" 
                      ? (language === "it" ? "Base" : "Basic")
                      : tutorial.difficulty === "intermediate"
                        ? (language === "it" ? "Medio" : "Medium")
                        : (language === "it" ? "Avanzato" : "Advanced")
                    }
                  </Badge>
                </div>
                <CardTitle className={`text-base line-clamp-2 ${darkMode ? "text-white" : ""}`}>
                  {tutorial.title}
                </CardTitle>
              </CardHeader>
              
              <CardContent className="pb-2">
                <p className={`text-xs line-clamp-2 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {tutorial.description}
                </p>
              </CardContent>
              
              <CardFooter className={`pt-2 border-t flex justify-between items-center ${darkMode ? "border-gray-700" : "border-gray-200"}`}>
                <div className="flex items-center gap-1.5">
                  <Avatar className="w-6 h-6">
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs">
                      {tutorial.author.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <span className={`text-xs font-medium ${darkMode ? "text-gray-300" : ""}`}>{tutorial.author}</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <Eye size={12} />
                    <span>{tutorial.views}</span>
                  </div>
                  <div className="flex items-center gap-1 text-xs text-gray-500">
                    <ThumbsUp size={12} />
                    <span>{tutorial.likes}</span>
                  </div>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {filteredTutorials.length === 0 && (
          <div className={`text-center py-10 ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            <div className="flex justify-center mb-3">
              <BookOpen size={48} className={darkMode ? "text-gray-600" : "text-gray-300"} />
            </div>
            <h3 className={`text-lg font-medium mb-1 ${darkMode ? "text-white" : ""}`}>
              {language === "it" ? "Nessun tutorial trovato" : "No tutorials found"}
            </h3>
            <p>
              {language === "it" 
                ? "Prova a cercare con altri termini o categorie" 
                : "Try searching with different terms or categories"}
            </p>
          </div>
        )}
        
        {/* Tips & Tricks Section */}
        {searchTerm === "" && !selectedCategory && (
          <div className="mt-8 pt-6 border-t">
            <h2 className={`text-xl font-semibold mb-4 ${darkMode ? "text-white" : ""}`}>
              {language === "it" ? "Suggerimenti rapidi" : "Quick Tips"}
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                <CardHeader className="pb-2">
                  <div className="mb-2">
                    <Zap size={20} className="text-yellow-500" />
                  </div>
                  <CardTitle className="text-base">
                    {language === "it" ? "Risparmia energia" : "Save energy"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    {language === "it" 
                      ? "Stacca gli apparecchi elettrici quando non li usi per risparmiare fino al 10% sulla bolletta." 
                      : "Unplug electrical appliances when not in use to save up to 10% on your bill."}
                  </p>
                </CardContent>
              </Card>
              
              <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                <CardHeader className="pb-2">
                  <div className="mb-2">
                    <Wrench size={20} className="text-blue-500" />
                  </div>
                  <CardTitle className="text-base">
                    {language === "it" ? "Manutenzione preventiva" : "Preventive maintenance"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    {language === "it" 
                      ? "Pulisci regolarmente i filtri di condizionatori e asciugatrici per migliorarne l'efficienza." 
                      : "Regularly clean filters in air conditioners and dryers to improve their efficiency."}
                  </p>
                </CardContent>
              </Card>
              
              <Card className={darkMode ? "bg-gray-800 border-gray-700" : ""}>
                <CardHeader className="pb-2">
                  <div className="mb-2">
                    <Lightbulb size={20} className="text-amber-500" />
                  </div>
                  <CardTitle className="text-base">
                    {language === "it" ? "Illuminazione intelligente" : "Smart lighting"}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                    {language === "it" 
                      ? "Sostituisci le lampadine tradizionali con LED per risparmiare fino all'80% di energia." 
                      : "Replace traditional bulbs with LEDs to save up to 80% energy."}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
};

export default TutorialPage;
