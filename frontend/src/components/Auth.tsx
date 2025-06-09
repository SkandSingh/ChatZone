
import React, { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useChat } from "@/hooks/use-chat";
import { LogIn } from "lucide-react";

const Auth: React.FC = () => {
  const { username, setUsername, roomId, setRoomId, joinRoom } = useChat();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    
    if (!username.trim()) {
      setError("Username is required");
      return;
    }
    
    if (!roomId.trim()) {
      setError("Room ID is required");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate loading
    setTimeout(() => {
      joinRoom();
      setIsSubmitting(false);
    }, 800);
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-chatzone-dark via-[#1a1f3d] to-[#0d0f22]">
      <div className="w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-8 gradient-text animate-gradient-shift">
          Welcome to ChatZone
        </h1>
        
        <Card className="relative overflow-hidden backdrop-blur-lg border border-white/10 shadow-2xl">
          <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#9b87f5]/20 via-[#7E69AB]/30 to-[#6E59A5]/20"></div>
          
          <div className="absolute -inset-[1px] -z-10 rounded-lg" style={{
            background: "linear-gradient(130deg, #9b87f5, #7E69AB, #9b87f5)",
            backgroundSize: "200% 200%",
            animation: "border-beam 4s linear infinite"
          }}></div>
          
          <CardHeader>
            <CardTitle className="text-center text-white">Join a Room</CardTitle>
          </CardHeader>
          
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="username" className="text-sm font-medium text-gray-300">
                  Your Name
                </label>
                <Input
                  id="username"
                  placeholder="Enter your name"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 focus:border-[#9b87f5] focus:ring-1 focus:ring-[#9b87f5]/50"
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="roomId" className="text-sm font-medium text-gray-300">
                  Room ID
                </label>
                <Input
                  id="roomId"
                  placeholder="Enter room ID"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                  className="bg-white/10 border-white/20 text-white placeholder:text-gray-500 focus:border-[#9b87f5] focus:ring-1 focus:ring-[#9b87f5]/50"
                />
              </div>
              
              {error && <p className="text-sm text-red-400">{error}</p>}
            </CardContent>
            
            <CardFooter>
              <Button
                type="submit"
                className="w-full bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] hover:opacity-90 transition-all shadow-lg hover:shadow-[#9b87f5]/20 hover:shadow-xl"
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <span className="animate-pulse">Connecting...</span>
                ) : (
                  <>
                    <LogIn className="w-4 h-4 mr-2" /> Join Chat
                  </>
                )}
              </Button>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Auth;
