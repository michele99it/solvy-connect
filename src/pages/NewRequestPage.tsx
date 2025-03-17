
import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { Clock, MapPin, Calendar, HelpCircle, Check, Image, Upload, Shield, Clock4, Award, User } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { useAppContext } from "@/contexts/AppContext";
import CategorySelect from "@/components/CategorySelect";
import FakeMap from "@/components/FakeMap";
import { cn } from "@/lib/utils";

const NewRequestPage = () => {
  const { darkMode, language } = useAppContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState<"technology" | "home" | "maintenance" | "education" | "professional" | "shopping" | "transport" | "food" | "pets" | "music" | "art" | "other">("technology");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [budget, setBudget] = useState("");
  
  // Add mock data for FakeMap component
  const mockSolvers = [
    {
      id: 1,
      name: "Mario Rossi",
      position: { x: 40, y: 60 },
      rating: 4.8,
      reviews: 124,
      skills: ["Riparazioni", "Elettronica"],
      price: "€30/h",
      image: ""
    },
    {
      id: 2,
      name: "Lucia Bianchi",
      position: { x: 60, y: 30 },
      rating: 4.6,
      reviews: 87,
      skills: ["Idraulica", "Manutenzione"],
      price: "€35/h",
      image: ""
    }
  ];
  
  const handleSolverClick = (solver: any) => {
    console.log("Selected solver:", solver);
  };
  
  const handleSubmit = () => {
    console.log("Submitting request:", {
      title,
      description,
      category,
      location,
      date,
      budget
    });
  };
  
  return (
    <Layout>
      <div className="space-y-6 pb-8">
        <div className="flex flex-col space-y-1.5">
          <h1 className={`text-2xl font-bold ${darkMode ? "text-white" : ""}`}>
            {language === "it" ? "Nuova Richiesta" : "New Request"}
          </h1>
          <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
            {language === "it" 
              ? "Trova la persona giusta per il tuo problema" 
              : "Find the right person for your problem"}
          </p>
        </div>
        
        <Card className={darkMode ? "bg-gray-800 border-gray-700" : "border-gray-200"}>
          <CardHeader>
            <CardTitle className={`text-lg ${darkMode ? "text-white" : ""}`}>
              {language === "it" ? "Dettagli Richiesta" : "Request Details"}
            </CardTitle>
            <CardDescription className={darkMode ? "text-gray-400" : "text-gray-500"}>
              {language === "it" 
                ? "Inserisci i dettagli della tua richiesta" 
                : "Enter the details of your request"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label 
                  htmlFor="title"
                  className={`text-sm font-medium leading-none ${darkMode ? "text-white" : ""}`}
                >
                  {language === "it" ? "Titolo" : "Title"}
                </label>
                <Input 
                  type="text" 
                  id="title" 
                  placeholder={language === "it" ? "Es: Riparazione lavatrice" : "Ex: Washing machine repair"}
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className={darkMode ? "bg-gray-700 border-gray-600 text-white" : ""}
                />
              </div>
            </div>
            
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label 
                  htmlFor="description"
                  className={`text-sm font-medium leading-none ${darkMode ? "text-white" : ""}`}
                >
                  {language === "it" ? "Descrizione" : "Description"}
                </label>
                <Textarea
                  id="description"
                  placeholder={language === "it" 
                    ? "Es: La mia lavatrice non si accende più. Ho bisogno di qualcuno che possa ripararla." 
                    : "Ex: My washing machine won't turn on anymore. I need someone who can fix it."}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className={darkMode ? "bg-gray-700 border-gray-600 text-white" : ""}
                />
              </div>
            </div>
            
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label 
                  className={`text-sm font-medium leading-none ${darkMode ? "text-white" : ""}`}
                >
                  {language === "it" ? "Categoria" : "Category"}
                </label>
                <CategorySelect 
                  selectedCategory={category} 
                  onCategoryChange={(cat) => setCategory(cat)}
                />
              </div>
            </div>
            
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label 
                  htmlFor="location"
                  className={`text-sm font-medium leading-none ${darkMode ? "text-white" : ""}`}
                >
                  {language === "it" ? "Luogo" : "Location"}
                </label>
                <Input 
                  type="text" 
                  id="location" 
                  placeholder={language === "it" ? "Es: Via Roma, 1" : "Ex: 123 Main Street"}
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  className={darkMode ? "bg-gray-700 border-gray-600 text-white" : ""}
                />
                <FakeMap solvers={mockSolvers} onSolverClick={handleSolverClick} />
              </div>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="grid gap-2">
                <label 
                  htmlFor="date"
                  className={`text-sm font-medium leading-none ${darkMode ? "text-white" : ""}`}
                >
                  {language === "it" ? "Data" : "Date"}
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant={"outline"}
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !date && "text-muted-foreground",
                        darkMode ? "bg-gray-700 border-gray-600 text-white" : ""
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {date ? format(date, "PPP", { locale: language === "it" ? it : undefined }) : (language === "it" ? "Seleziona una data" : "Pick a date")}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={date}
                      onSelect={setDate}
                      disabled={(date) =>
                        date < new Date()
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>
              
              <div className="grid gap-2">
                <label 
                  htmlFor="budget"
                  className={`text-sm font-medium leading-none ${darkMode ? "text-white" : ""}`}
                >
                  {language === "it" ? "Budget" : "Budget"}
                </label>
                <Input 
                  type="number" 
                  id="budget" 
                  placeholder="Es: 50€"
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className={darkMode ? "bg-gray-700 border-gray-600 text-white" : ""}
                />
              </div>
            </div>
            
            <div className="grid gap-4">
              <div className="grid gap-2">
                <label 
                  className={`text-sm font-medium leading-none ${darkMode ? "text-white" : ""}`}
                >
                  {language === "it" ? "Foto/Video" : "Photos/Videos"}
                </label>
                <div className={`border ${darkMode ? "border-gray-700" : "border-gray-200"} rounded-md p-4 flex flex-col items-center justify-center gap-2`}>
                  <div className={`p-3 rounded-full ${darkMode ? "bg-gray-700" : "bg-gray-100"}`}>
                    <Upload size={20} className={darkMode ? "text-gray-400" : "text-gray-500"} />
                  </div>
                  <p className={`text-sm ${darkMode ? "text-gray-400" : "text-gray-500"}`}>
                    {language === "it" 
                      ? "Trascina qui i file o clicca per caricare" 
                      : "Drag and drop files here or click to upload"}
                  </p>
                  <Button variant="secondary" size="sm" className="mt-2">
                    <Image className="mr-2 h-4 w-4" />
                    {language === "it" ? "Carica file" : "Upload files"}
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
          <CardFooter className="flex flex-col">
            <Button onClick={handleSubmit} className="w-full sm:w-auto">
              {language === "it" ? "Invia Richiesta" : "Submit Request"}
            </Button>
          </CardFooter>
        </Card>
        
        <div className={`mt-6 p-4 rounded-lg ${darkMode ? "bg-gray-800" : "bg-blue-50"} border ${darkMode ? "border-gray-700" : "border-blue-100"}`}>
          <h3 className={`text-lg font-medium mb-4 ${darkMode ? "text-white" : "text-gray-800"}`}>
            {language === "it" ? "Vantaggi del Network Solvy" : "Solvy Network Benefits"}
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-full ${darkMode ? "bg-blue-900/30 text-blue-400" : "bg-blue-100 text-blue-600"}`}>
                <Shield size={20} />
              </div>
              <div>
                <h4 className={`text-sm font-medium ${darkMode ? "text-white" : "text-gray-800"}`}>
                  {language === "it" ? "Professionisti Verificati" : "Verified Professionals"}
                </h4>
                <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {language === "it" 
                    ? "Tutti i Solvers sono verificati e affidabili" 
                    : "All Solvers are verified and reliable"}
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-full ${darkMode ? "bg-green-900/30 text-green-400" : "bg-green-100 text-green-600"}`}>
                <Clock4 size={20} />
              </div>
              <div>
                <h4 className={`text-sm font-medium ${darkMode ? "text-white" : "text-gray-800"}`}>
                  {language === "it" ? "Risposte Rapide" : "Quick Responses"}
                </h4>
                <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {language === "it" 
                    ? "Ricevi offerte entro poche ore" 
                    : "Get offers within hours"}
                </p>
              </div>
            </div>
            
            <div className="flex items-start gap-3">
              <div className={`p-2 rounded-full ${darkMode ? "bg-purple-900/30 text-purple-400" : "bg-purple-100 text-purple-600"}`}>
                <Award size={20} />
              </div>
              <div>
                <h4 className={`text-sm font-medium ${darkMode ? "text-white" : "text-gray-800"}`}>
                  {language === "it" ? "Garanzia di Qualità" : "Quality Guarantee"}
                </h4>
                <p className={`text-xs mt-1 ${darkMode ? "text-gray-400" : "text-gray-600"}`}>
                  {language === "it" 
                    ? "Soddisfatti o rimborsati" 
                    : "Satisfaction or money back"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default NewRequestPage;
