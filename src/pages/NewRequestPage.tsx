import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Clock, MapPin, AlertCircle, Calendar, HelpCircle, Check } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { format } from "date-fns";
import { it } from "date-fns/locale";
import { useAppContext } from "@/contexts/AppContext";
import { CategorySelect } from "@/components/CategorySelect";
import FakeMap from "@/components/FakeMap";

const NewRequestPage = () => {
  const { darkMode, language } = useAppContext();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState<Date | undefined>(new Date());
  const [budget, setBudget] = useState("");
  
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
                <CategorySelect onCategoryChange={setCategory} />
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
                <FakeMap />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
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
          </CardContent>
          <CardFooter>
            <Button onClick={handleSubmit}>
              {language === "it" ? "Invia Richiesta" : "Submit Request"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    </Layout>
  );
};

export default NewRequestPage;
