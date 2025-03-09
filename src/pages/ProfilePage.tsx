
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, MessageSquare, MapPin, Award, Edit, LogOut } from "lucide-react";

const ProfilePage = () => {
  // Dati di esempio
  const user = {
    name: "Marco Bianchi",
    type: "helper",
    image: "",
    location: "Milano, Italia",
    joined: "Novembre 2023",
    rating: 4.8,
    reviews: 12,
    completedJobs: 24,
    bio: "Esperto in riparazioni domestiche, elettronica e piccoli lavori di manutenzione. Disponibile principalmente nei weekend e in alcune sere infrasettimanali.",
    skills: ["Riparazioni", "Elettronica", "Idraulica", "Montaggio mobili"],
    reviews: [
      {
        id: 1,
        user: "Giulia V.",
        userImage: "",
        rating: 5,
        text: "Marco è stato preciso e professionale. Ha risolto il problema in poco tempo.",
        date: "2 settimane fa"
      },
      {
        id: 2,
        user: "Luca R.",
        userImage: "",
        rating: 5,
        text: "Ottimo lavoro con il montaggio dei mobili. Consigliatissimo!",
        date: "1 mese fa"
      },
      {
        id: 3,
        user: "Anna M.",
        userImage: "",
        rating: 4,
        text: "Puntuale e competente. Unico difetto: ha lasciato qualche residuo di lavorazione.",
        date: "2 mesi fa"
      }
    ]
  };
  
  return (
    <Layout>
      <div className="space-y-6">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-6 items-center md:items-start">
              <div className="flex flex-col items-center">
                <Avatar className="w-24 h-24 border-4 border-white shadow-md">
                  <AvatarFallback className="bg-solvy-blue text-white text-2xl">
                    {user.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="mt-4 flex flex-col items-center md:items-start">
                  <div className="flex items-center gap-1 text-yellow-500 mb-1">
                    <Star className="fill-yellow-400 text-yellow-400" size={16} />
                    <span className="font-medium">{user.rating}</span>
                    <span className="text-solvy-gray text-sm">({user.reviews} recensioni)</span>
                  </div>
                  <div className="flex items-center text-solvy-gray text-sm mb-1">
                    <MapPin size={14} className="mr-1" />
                    <span>{user.location}</span>
                  </div>
                  <div className="flex items-center text-solvy-gray text-sm">
                    <Award size={14} className="mr-1" />
                    <span>{user.completedJobs} lavori completati</span>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 text-center md:text-left">
                <div className="flex flex-col md:flex-row justify-between">
                  <div>
                    <h1 className="text-2xl font-bold">{user.name}</h1>
                    <Badge variant={user.type === "helper" ? "blue" : "green"}>
                      {user.type === "helper" ? "Helper" : "Richiedente"}
                    </Badge>
                    <p className="text-sm text-solvy-gray mt-2">Membro da {user.joined}</p>
                  </div>
                  <div className="flex gap-2 mt-4 md:mt-0 justify-center md:justify-start">
                    <Button variant="outline" size="sm" className="flex items-center gap-1">
                      <Edit size={14} />
                      <span>Modifica</span>
                    </Button>
                    <Button variant="outline" size="sm" className="flex items-center gap-1 text-red-500 border-red-200 hover:bg-red-50">
                      <LogOut size={14} />
                      <span>Esci</span>
                    </Button>
                  </div>
                </div>
                
                <div className="mt-4">
                  <h2 className="font-medium mb-2">Bio</h2>
                  <p className="text-sm text-solvy-gray">{user.bio}</p>
                </div>
                
                <div className="mt-4">
                  <h2 className="font-medium mb-2">Competenze</h2>
                  <div className="flex flex-wrap gap-2">
                    {user.skills.map((skill, index) => (
                      <Badge key={index} variant="outline" className="bg-blue-50">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="reviews">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="reviews">Recensioni</TabsTrigger>
            <TabsTrigger value="history">Attività</TabsTrigger>
          </TabsList>
          
          <TabsContent value="reviews" className="mt-4 space-y-4">
            {user.reviews.map((review) => (
              <Card key={review.id}>
                <CardContent className="pt-6">
                  <div className="flex items-start gap-4">
                    <Avatar className="w-10 h-10">
                      <AvatarFallback className="bg-solvy-blue/10 text-solvy-blue">
                        {review.user.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <h3 className="font-medium">{review.user}</h3>
                        <span className="text-sm text-solvy-gray">{review.date}</span>
                      </div>
                      <div className="flex items-center mb-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            size={14}
                            className={`${
                              i < review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "fill-gray-200 text-gray-200"
                            }`}
                          />
                        ))}
                      </div>
                      <p className="text-sm text-solvy-gray">{review.text}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </TabsContent>
          
          <TabsContent value="history" className="mt-4">
            <Card>
              <CardHeader>
                <CardTitle>Attività recenti</CardTitle>
                <CardDescription>Visualizza la tua cronologia di lavori</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="text-center py-8 text-solvy-gray">
                  <p>Le tue attività appariranno qui.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

// Badge personalizzato per il tipo di utente
const Badge = ({ children, variant = "blue" }: { children: React.ReactNode; variant?: "blue" | "green" | "outline" }) => {
  const baseClasses = "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium";
  
  const variantClasses = {
    blue: "bg-blue-100 text-solvy-blue",
    green: "bg-green-100 text-solvy-green",
    outline: "border border-gray-200"
  };
  
  return (
    <span className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </span>
  );
};

export default ProfilePage;
