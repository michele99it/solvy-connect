
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { Search, MapPin, Star, Briefcase, Filter } from "lucide-react";
import { useState } from "react";
import FakeMap from "@/components/FakeMap";

// Dati di esempio
const solversData = [
  {
    id: 1,
    name: "Marco Rossi",
    image: "",
    position: { x: 35, y: 42 },
    categories: ["Casa", "Giardinaggio"],
    skills: ["Riparazioni", "Montaggio mobili", "Manutenzione giardino"],
    rating: 4.8,
    reviews: 24,
    location: "Milano, Italia",
    distance: "2.3 km",
    completedJobs: 42,
    hourlyRate: "€25/ora",
    price: "€25/ora"
  },
  {
    id: 2,
    name: "Laura Bianchi",
    image: "",
    position: { x: 65, y: 28 },
    categories: ["Istruzione"],
    skills: ["Matematica", "Fisica", "Chimica"],
    rating: 4.9,
    reviews: 56,
    location: "Milano, Italia",
    distance: "3.5 km",
    completedJobs: 78,
    hourlyRate: "€20/ora",
    price: "€20/ora"
  },
  {
    id: 3,
    name: "Davide Verdi",
    image: "",
    position: { x: 48, y: 70 },
    categories: ["Tecnologia"],
    skills: ["Riparazione PC", "Software", "Reti"],
    rating: 4.7,
    reviews: 31,
    location: "Milano, Italia",
    distance: "4.1 km",
    completedJobs: 37,
    hourlyRate: "€30/ora",
    price: "€30/ora"
  },
  {
    id: 4,
    name: "Alessia Neri",
    image: "",
    position: { x: 22, y: 55 },
    categories: ["Casa", "Cucina"],
    skills: ["Pulizie", "Cucina", "Babysitting"],
    rating: 4.6,
    reviews: 18,
    location: "Milano, Italia",
    distance: "1.8 km",
    completedJobs: 23,
    hourlyRate: "€15/ora",
    price: "€15/ora"
  }
];

const categories = [
  { label: "Tutte le categorie", value: "all" },
  { label: "Casa", value: "casa" },
  { label: "Tecnologia", value: "tecnologia" },
  { label: "Istruzione", value: "istruzione" },
  { label: "Cucina", value: "cucina" },
  { label: "Giardinaggio", value: "giardinaggio" },
  { label: "Salute", value: "salute" },
  { label: "Bellezza", value: "bellezza" },
  { label: "Auto", value: "auto" }
];

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("all");
  const [distance, setDistance] = useState([10]);
  const [showFilters, setShowFilters] = useState(false);
  const [showMap, setShowMap] = useState(false);
  const [selectedSolver, setSelectedSolver] = useState(null);
  
  const handleSolverClick = (solver) => {
    setSelectedSolver(solver);
    setShowMap(false);
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="space-y-2">
          <h1 className="text-2xl font-bold">Cerca Solver</h1>
          <p className="text-solvy-gray">Trova persone esperte vicino a te</p>
        </div>
        
        <div className="grid gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-solvy-gray" size={18} />
            <Input 
              className="pl-10" 
              placeholder="Cerca solver o competenze..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="flex-1">
                <SelectValue placeholder="Categoria" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            
            <Button 
              variant="outline" 
              className="flex items-center gap-2"
              onClick={() => setShowFilters(!showFilters)}
            >
              <Filter size={16} />
              <span>Filtri</span>
            </Button>
            
            <Button
              className="bg-solvy-blue hover:bg-solvy-blue/90"
              onClick={() => setShowMap(!showMap)}
            >
              {showMap ? "Lista" : "Mappa"}
            </Button>
          </div>
          
          {showFilters && (
            <Card>
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <label className="text-sm font-medium">Distanza massima</label>
                      <span className="text-sm text-solvy-gray">{distance[0]} km</span>
                    </div>
                    <Slider
                      defaultValue={distance}
                      max={50}
                      step={1}
                      onValueChange={setDistance}
                    />
                  </div>
                  
                  {/* Altri filtri potrebbero essere aggiunti qui */}
                  <div className="flex justify-end">
                    <Button size="sm" variant="outline">
                      Reimposta
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
        
        {showMap ? (
          <FakeMap
            solvers={solversData}
            onSolverClick={handleSolverClick}
          />
        ) : (
          <div className="space-y-4">
            <h2 className="font-semibold text-lg">Solver disponibili</h2>
            
            {solversData.map((solver) => (
              <Card key={solver.id} className="overflow-hidden">
                <CardContent className="p-0">
                  <div className="p-4 flex gap-4">
                    <Avatar className="w-16 h-16">
                      <AvatarImage src={solver.image} alt={solver.name} />
                      <AvatarFallback className="bg-solvy-blue/10 text-solvy-blue text-xl">
                        {solver.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium">{solver.name}</h3>
                          <div className="flex items-center text-solvy-gray text-sm mt-1">
                            <MapPin size={14} className="mr-1" />
                            <span>{solver.distance}</span>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-solvy-blue">
                            {solver.hourlyRate}
                          </div>
                          <div className="flex items-center text-sm mt-1 justify-end">
                            <Star size={14} className="fill-yellow-400 text-yellow-400 mr-1" />
                            <span className="font-medium">{solver.rating}</span>
                            <span className="text-solvy-gray">({solver.reviews})</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="mt-2">
                        <div className="flex flex-wrap gap-1 mb-2">
                          {solver.categories.map((cat, index) => (
                            <Badge key={index} variant="secondary" className="bg-blue-100 text-solvy-blue">
                              {cat}
                            </Badge>
                          ))}
                        </div>
                        
                        <p className="text-sm text-solvy-gray mb-2">
                          Competenze: {solver.skills.join(", ")}
                        </p>
                        
                        <div className="flex items-center text-solvy-gray text-sm">
                          <Briefcase size={14} className="mr-1" />
                          <span>{solver.completedJobs} lavori completati</span>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border-t px-4 py-3 flex justify-between">
                    <Button variant="outline" size="sm">
                      Vedi profilo
                    </Button>
                    <Button size="sm" className="bg-solvy-blue hover:bg-solvy-blue/90">
                      Contatta
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default SearchPage;
