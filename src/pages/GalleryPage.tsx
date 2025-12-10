import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import FloatingActions from "@/components/FloatingActions";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Image, Video } from "lucide-react";

const GalleryPage = () => {
  const photos = [
    { id: 1, url: "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=800", caption: "Workshop 2024" },
    { id: 2, url: "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800", caption: "Seminar on Bioinformatics" },
    { id: 3, url: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800", caption: "Team Meeting" },
    { id: 4, url: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=800", caption: "Lab Session" },
    { id: 5, url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=800", caption: "Research Presentation" },
    { id: 6, url: "https://images.unsplash.com/photo-1543269865-cbf427effbad?w=800", caption: "Conference 2023" },
  ];

  const videos = [
    { id: 1, thumbnail: "https://images.unsplash.com/photo-1492619375914-88005aa9e8fb?w=800", title: "Introduction to Club", duration: "5:30" },
    { id: 2, thumbnail: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800", title: "Workshop Highlights", duration: "8:45" },
    { id: 3, thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800", title: "Research Talk", duration: "12:20" },
  ];

  return (
    <div className="min-h-screen">
      <Navigation />
      <FloatingActions />
      
      <section className="py-20 bg-gradient-subtle">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-primary">
              Gallery
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Explore moments from our workshops, seminars, and events
            </p>
          </div>

          <Tabs defaultValue="photos" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="photos" className="gap-2">
                <Image className="w-4 h-4" />
                Photos
              </TabsTrigger>
              <TabsTrigger value="videos" className="gap-2">
                <Video className="w-4 h-4" />
                Videos
              </TabsTrigger>
            </TabsList>

            <TabsContent value="photos" className="mt-8">
              <div className="grid md:grid-cols-3 gap-6">
                {photos.map((photo) => (
                  <Card key={photo.id} className="group overflow-hidden hover:shadow-glow transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden">
                        <img
                          src={photo.url}
                          alt={photo.caption}
                          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end">
                          <p className="text-white p-4 font-medium">{photo.caption}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="videos" className="mt-8">
              <div className="grid md:grid-cols-3 gap-6">
                {videos.map((video) => (
                  <Card key={video.id} className="group overflow-hidden hover:shadow-glow transition-all duration-300">
                    <CardContent className="p-0">
                      <div className="relative overflow-hidden">
                        <img
                          src={video.thumbnail}
                          alt={video.title}
                          className="w-full h-64 object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                          <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <div className="w-0 h-0 border-l-[20px] border-l-primary border-y-[12px] border-y-transparent ml-1"></div>
                          </div>
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
                          <p className="text-white font-medium">{video.title}</p>
                          <p className="text-white/80 text-sm">{video.duration}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GalleryPage;
