
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Star, MapPin, Mail, Phone, Calendar, Edit, Shield, Camera, MessageSquare } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

// Dati di esempio
const userData = {
  name: "Mario Rossi",
  image: "",
  userType: "helper", // "helper" o "requester"
  location: "Milano, Italia",
  email: "mario.rossi@example.com",
  phone: "+39 123 456 7890",
  memberSince: "Gennaio 2023",
  verified: true,
  bio: "Esperto in riparazioni elettroniche e computer. Offro assistenza tecnica veloce ed efficiente. Disponibile nei weekend e alcune sere infrasettimanali.",
  skills: ["Riparazioni PC", "Assistenza Software", "Installazione Hardware", "Recupero Dati"],
  rating: 4.8,
  completedTasks: 27,
  responseRate: "98%"
};

// Recensioni di esempio
const reviewsData = [
  {
    id: 1,
    user: "Lucia Bianchi",
    userImage: "",
    rating: 5,
    text: "Mario è stato fantastico! Ha risolto il problema del mio computer in pochissimo tempo. Molto professionale e gentile.",
    date: "2 settimane fa"
  },
  {
    id: 2,
    user: "Andrea Verdi",
    userImage: "",
    rating: 5,
    text: "Servizio eccellente! Ha recuperato tutti i miei dati da un hard disk danneggiato che pensavo fosse perso per sempre.",
    date: "1 mese fa"
  },
  {
    id: 3,
    user: "Giovanni Neri",
    userImage: "",
    rating: 4,
    text: "Buon servizio, ha risolto il problema anche se ci è voluto un po' più tempo del previsto. Comunque consigliato.",
    date: "2 mesi fa"
  }
];

const ProfilePage = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div className="md:flex md:items-start md:gap-6">
          {/* Profilo principale */}
          <Card className="md:w-1/3">
            <CardHeader className="relative pb-2">
              <div className="absolute top-3 right-3">
                <Button variant="ghost" size="icon">
                  <Edit size={18} />
                </Button>
              </div>
              <div className="flex flex-col items-center">
                <Avatar className="w-24 h-24 mb-2">
                  <AvatarFallback className="text-2xl bg-solvy-blue/10 text-solvy-blue">
                    {userData.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <CardTitle className="text-xl">{userData.name}</CardTitle>
                <div className="flex items-center gap-1 mt-1 text-solvy-gray">
                  <MapPin size={14} />
                  <span className="text-sm">{userData.location}</span>
                </div>
                {userData.verified && (
                  <Badge className="mt-2 bg-solvy-green hover:bg-solvy-green/90">
                    <Shield size={12} className="mr-1" /> Verificato
                  </Badge>
                )}
              </div>
            </CardHeader>
            <CardContent className="pb-2 space-y-4">
              <div>
                <h3 className="font-medium mb-2">Bio</h3>
                <p className="text-sm text-solvy-gray">{userData.bio}</p>
              </div>
              
              <div>
                <h3 className="font-medium mb-2">Competenze</h3>
                <div className="flex flex-wrap gap-2">
                  {userData.skills.map((skill, index) => (
                    <Badge key={index} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
              
              <div className="pt-2 border-t">
                <h3 className="font-medium mb-2">Informazioni di contatto</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-solvy-gray">
                    <Mail size={14} />
                    <span>{userData.email}</span>
                  </div>
                  <div className="flex items-center gap-2 text-solvy-gray">
                    <Phone size={14} />
                    <span>{userData.phone}</span>
                  </div>
                  <div className="flex items-center gap-2 text-solvy-gray">
                    <Calendar size={14} />
                    <span>Membro da {userData.memberSince}</span>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2 pt-2 border-t">
              <Button className="w-full bg-solvy-blue hover:bg-solvy-blue/90">
                <Camera size={16} className="mr-2" /> Modifica foto
              </Button>
              <Button variant="outline" className="w-full">
                <MessageSquare size={16} className="mr-2" /> Invia messaggio
              </Button>
            </CardFooter>
          </Card>
          
          {/* Statistiche e recensioni */}
          <div className="md:flex-1 mt-6 md:mt-0">
            <Tabs defaultValue="stats" className="w-full">
              <TabsList className="w-full grid grid-cols-2">
                <TabsTrigger value="stats">Statistiche</TabsTrigger>
                <TabsTrigger value="reviews">Recensioni</TabsTrigger>
              </TabsList>
              
              <TabsContent value="stats" className="space-y-4 mt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Statistiche come {userData.userType === "helper" ? "Helper" : "Richiedente"}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="space-y-1">
                        <p className="text-2xl font-bold text-solvy-blue">{userData.rating}</p>
                        <p className="text-sm text-solvy-gray">Valutazione</p>
                        <div className="flex items-center justify-center">
                          {Array(5).fill(0).map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              className={`${i < Math.floor(userData.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                            />
                          ))}
                        </div>
                      </div>
                      <div className="space-y-1">
                        <p className="text-2xl font-bold text-solvy-blue">{userData.completedTasks}</p>
                        <p className="text-sm text-solvy-gray">Lavori completati</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-2xl font-bold text-solvy-blue">{userData.responseRate}</p>
                        <p className="text-sm text-solvy-gray">Tasso di risposta</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Livello di esperienza</CardTitle>
                    <CardDescription>In base alle attività svolte</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Riparazioni PC</span>
                          <span className="font-medium">Avanzato</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full">
                          <div className="h-2 bg-solvy-blue rounded-full w-[85%]"></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Assistenza Software</span>
                          <span className="font-medium">Intermedio</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full">
                          <div className="h-2 bg-solvy-blue rounded-full w-[60%]"></div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span>Recupero Dati</span>
                          <span className="font-medium">Esperto</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full">
                          <div className="h-2 bg-solvy-blue rounded-full w-[95%]"></div>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
              
              <TabsContent value="reviews" className="mt-4">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Recensioni ricevute</CardTitle>
                    <CardDescription>
                      Media recensioni: {userData.rating}/5 ({reviewsData.length} recensioni)
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ScrollArea className="h-[400px] pr-4">
                      <div className="space-y-4">
                        {reviewsData.map((review) => (
                          <div key={review.id} className="pb-4 border-b last:border-0">
                            <div className="flex justify-between items-start mb-2">
                              <div className="flex items-center gap-2">
                                <Avatar className="w-8 h-8">
                                  <AvatarFallback className="bg-solvy-blue/10 text-solvy-blue">
                                    {review.user.charAt(0)}
                                  </AvatarFallback>
                                </Avatar>
                                <span className="font-medium">{review.user}</span>
                              </div>
                              <div className="flex items-center">
                                {Array(5).fill(0).map((_, i) => (
                                  <Star
                                    key={i}
                                    size={14}
                                    className={`${i < review.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                                  />
                                ))}
                              </div>
                            </div>
                            <p className="text-sm text-solvy-gray mb-1">{review.text}</p>
                            <p className="text-xs text-solvy-gray">{review.date}</p>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProfilePage;
