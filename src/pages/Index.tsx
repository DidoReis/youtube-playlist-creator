
import { Button } from "@/components/ui/button";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { MusicNotesIcon } from "@/components/ui/music-icon";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      
      <main className="flex-grow">
        {/* Hero Section */}
        <section className="pt-32 pb-20 px-4">
          <div className="container mx-auto max-w-6xl">
            <div className="flex flex-col md:flex-row items-center">
              <div className="md:w-1/2 mb-10 md:mb-0">
                <h1 className="text-4xl md:text-6xl font-bold mb-6">
                  Create <span className="text-gradient">AI-Powered</span> YouTube Playlists
                </h1>
                <p className="text-lg text-gray-300 mb-8 max-w-xl">
                  Generate personalized playlists for any occasion with just a few clicks. 
                  Powered by AI to match your unique preferences and mood.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="purple-gradient">
                    <Link to="/signup">Get Started</Link>
                  </Button>
                  <Button asChild size="lg" variant="outline" className="border-purple-500/50">
                    <Link to="/about">Learn More</Link>
                  </Button>
                </div>
              </div>
              
              <div className="md:w-1/2 relative">
                <div className="relative z-10">
                  <div className="bg-gradient-to-br from-purple-600/20 to-purple-900/20 rounded-2xl p-6 border border-purple-500/20 shadow-lg">
                    <div className="bg-black/60 rounded-lg p-4 border border-white/10">
                      <div className="flex items-center mb-4">
                        <MusicNotesIcon className="w-6 h-6 text-purple-400 mr-2" />
                        <h3 className="font-medium">Halloween Party Playlist</h3>
                      </div>
                      <div className="space-y-3">
                        {['Thriller - Michael Jackson', 'Monster Mash - Bobby Pickett', 'Ghostbusters - Ray Parker Jr.', 'Zombie - The Cranberries'].map((song, index) => (
                          <div key={index} className="flex items-center p-2 rounded bg-white/5 hover:bg-white/10 transition-colors">
                            <span className="w-6 text-center text-gray-500">{index + 1}</span>
                            <span className="ml-2 text-sm">{song}</span>
                          </div>
                        ))}
                      </div>
                      <div className="mt-4 pt-4 border-t border-white/10 text-center">
                        <Button size="sm" className="text-xs">View Full Playlist</Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="absolute -bottom-4 -right-4 z-0 animate-float">
                    <div className="bg-gradient-to-br from-purple-600/20 to-purple-900/20 rounded-2xl p-6 border border-purple-500/20 shadow-lg">
                      <div className="bg-black/60 rounded-lg p-4 border border-white/10">
                        <div className="flex items-center mb-4">
                          <MusicNotesIcon className="w-6 h-6 text-purple-400 mr-2" />
                          <h3 className="font-medium">Road Trip Vibes</h3>
                        </div>
                        <div className="space-y-3">
                          {['On The Road Again - Willie Nelson', 'Life Is A Highway - Tom Cochrane'].map((song, index) => (
                            <div key={index} className="flex items-center p-2 rounded bg-white/5 hover:bg-white/10 transition-colors">
                              <span className="w-6 text-center text-gray-500">{index + 1}</span>
                              <span className="ml-2 text-sm">{song}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Features Section */}
        <section className="py-16 px-4 bg-black/30">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">
              <span className="text-gradient">Features</span> That Make the Difference
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  title: "AI-Powered Creation",
                  description: "Our AI understands your vibe and creates the perfect playlist for any occasion."
                },
                {
                  title: "YouTube Integration",
                  description: "Seamlessly integrates with YouTube to build and share your playlists instantly."
                },
                {
                  title: "Custom Management",
                  description: "Create, edit, and delete playlists from your personalized dashboard."
                }
              ].map((feature, index) => (
                <div key={index} className="glass-morphism rounded-xl p-6">
                  <div className="w-12 h-12 mb-4 rounded-full bg-gradient-to-br from-purple-500 to-purple-700 flex items-center justify-center">
                    <span className="text-white font-semibold">{index + 1}</span>
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
                  <p className="text-gray-400">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-6xl">
            <h2 className="text-3xl font-bold text-center mb-12">
              How <span className="text-gradient">It Works</span>
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                {
                  title: "Sign Up",
                  description: "Create your account in seconds."
                },
                {
                  title: "Describe Your Vibe",
                  description: "Tell our AI what kind of playlist you want."
                },
                {
                  title: "Generate Playlist",
                  description: "Our AI finds the perfect songs for your occasion."
                },
                {
                  title: "Share & Enjoy",
                  description: "Share with friends or enjoy your personalized playlist."
                }
              ].map((step, index) => (
                <div key={index} className="flex flex-col items-center text-center">
                  <div className="relative">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-purple-400 flex items-center justify-center mb-5">
                      <span className="text-white font-bold text-xl">{index + 1}</span>
                    </div>
                    {index < 3 && (
                      <div className="hidden md:block absolute top-8 left-full w-full h-0.5 bg-gradient-to-r from-purple-500 to-transparent"></div>
                    )}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-400 text-sm">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16 px-4">
          <div className="container mx-auto max-w-4xl">
            <div className="glass-morphism rounded-2xl p-8 text-center">
              <h2 className="text-3xl font-bold mb-4">Ready to Create Your Perfect Playlist?</h2>
              <p className="text-gray-300 mb-8 max-w-xl mx-auto">
                Join thousands of users who are already enjoying custom AI-generated playlists for every moment.
              </p>
              <Button asChild size="lg" className="purple-gradient">
                <Link to="/signup">Get Started Now</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
