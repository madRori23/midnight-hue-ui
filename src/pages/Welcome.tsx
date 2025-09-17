import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import Logo from "@/components/Logo";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Welcome = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md"
      >
        <div className="text-center space-y-8">
          <Logo size="lg" />
          
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="space-y-4"
          >
            <h1 className="text-2xl font-semibold text-foreground">
              Welcome to Gym Buddies
            </h1>
            <p className="text-muted-foreground">
              Find your perfect workout partner and achieve your fitness goals together
            </p>
          </motion.div>

          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.7, duration: 0.6 }}
            className="space-y-3"
          >
            <Button
              onClick={() => navigate("/login")}
              className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-button transition-all duration-300 text-lg py-6"
              size="lg"
            >
              Login to existing account
              <ArrowRight className="ml-2" size={20} />
            </Button>
            
            <Button
              onClick={() => navigate("/register")}
              variant="outline"
              className="w-full border-border hover:bg-card transition-all duration-300 text-lg py-6"
              size="lg"
            >
              Create new account
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default Welcome;