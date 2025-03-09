
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { MapPin, Camera, Upload, ArrowLeft } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

const NewRequestPage = () => {
  const navigate = useNavigate();
  const [location, setLocation] = useState("Milano, Italia");
  const [isLoading, setIsLoading] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simula l'invio della richiesta
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Richiesta inviata",
        description: "La tua richiesta è stata pubblicata con successo.",
      });
      navigate("/");
    }, 1500);
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={20} />
          </Button>
          <h1 className="text-2xl font-bold font-montserrat">Nuova Richiesta</h1>
        </div>
        
        <Card>
          <form onSubmit={handleSubmit}>
            <CardHeader>
              <CardTitle className="text-lg">Dettagli della richiesta</CardTitle>
              <CardDescription>Inserisci i dettagli della tua richiesta per trovare la persona giusta</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="title">Titolo</Label>
                <Input 
                  id="title" 
                  placeholder="Es: Riparazione lavatrice" 
                  required 
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="category">Categoria</Label>
                <Select required>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Seleziona una categoria" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="casa">Casa</SelectItem>
                    <SelectItem value="tecnologia">Tecnologia</SelectItem>
                    <SelectItem value="istruzione">Istruzione</SelectItem>
                    <SelectItem value="trasporti">Trasporti</SelectItem>
                    <SelectItem value="benessere">Benessere</SelectItem>
                    <SelectItem value="altro">Altro</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="description">Descrizione</Label>
                <Textarea 
                  id="description" 
                  placeholder="Descrivi in dettaglio di cosa hai bisogno..." 
                  rows={4}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="budget">Budget (opzionale)</Label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2">€</span>
                  <Input 
                    id="budget" 
                    type="number" 
                    className="pl-8" 
                    placeholder="Importo" 
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="location">Posizione</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-solvy-gray" size={16} />
                  <Input 
                    id="location" 
                    className="pl-9" 
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <Label>Foto (opzionale)</Label>
                <div className="border border-dashed rounded-md p-8 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <Upload className="text-solvy-gray mb-2" size={24} />
                    <p className="text-sm text-solvy-gray mb-2">Trascina qui le foto o</p>
                    <Button type="button" variant="outline" size="sm">
                      <Camera className="mr-2" size={16} />
                      Aggiungi foto
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex-col space-y-2">
              <Button 
                type="submit" 
                className="w-full bg-solvy-blue hover:bg-solvy-blue/90"
                disabled={isLoading}
              >
                {isLoading ? "Pubblicazione..." : "Pubblica richiesta"}
              </Button>
              <Button 
                type="button" 
                variant="outline" 
                className="w-full" 
                onClick={() => navigate(-1)}
              >
                Annulla
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </Layout>
  );
};

export default NewRequestPage;
