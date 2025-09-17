import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, UserPlus, CreditCard, UserCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Logo from "@/components/Logo";
import { useToast } from "@/hooks/use-toast";

const Register = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    membershipType: "buddy-pass"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast({
        title: "Password Mismatch",
        description: "Passwords do not match. Please try again.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Registration Successful",
      description: "Welcome to Gym Buddies! Your account has been created.",
    });
    
    // Navigate based on membership type
    const isPassHolder = formData.membershipType === "buddy-pass";
    
    setTimeout(() => {
      navigate(isPassHolder ? "/home" : "/home-non-pass");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card flex items-center justify-center p-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="w-full max-w-md"
      >
        <Card className="bg-card/80 backdrop-blur-lg border-border shadow-card p-8">
          <div className="text-center mb-8">
            <Logo size="sm" animate={false} />
            <h2 className="text-2xl font-bold mt-4 text-foreground">
              Register your gym buddy account
            </h2>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-foreground">
                Username
              </Label>
              <Input
                id="username"
                type="text"
                value={formData.username}
                onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                className="bg-input border-border text-foreground placeholder:text-muted-foreground"
                placeholder="Choose a username"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-foreground">
                Password
              </Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground pr-10"
                  placeholder="Create a password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword" className="text-foreground">
                Confirm Password
              </Label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? "text" : "password"}
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="bg-input border-border text-foreground placeholder:text-muted-foreground pr-10"
                  placeholder="Confirm your password"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-foreground">Membership Type</Label>
              <RadioGroup
                value={formData.membershipType}
                onValueChange={(value) => setFormData({ ...formData, membershipType: value })}
                className="space-y-3"
              >
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-card hover:bg-muted transition-colors cursor-pointer">
                  <RadioGroupItem value="buddy-pass" id="buddy-pass" />
                  <Label htmlFor="buddy-pass" className="cursor-pointer flex items-center gap-2 flex-1">
                    <CreditCard size={18} className="text-primary" />
                    <span>Have a buddy pass</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-3 p-3 rounded-lg bg-card hover:bg-muted transition-colors cursor-pointer">
                  <RadioGroupItem value="no-pass" id="no-pass" />
                  <Label htmlFor="no-pass" className="cursor-pointer flex items-center gap-2 flex-1">
                    <UserCheck size={18} className="text-muted-foreground" />
                    <span>Don't have buddy pass</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            <Button
              type="submit"
              className="w-full bg-gradient-to-r from-primary to-accent hover:shadow-button transition-all duration-300"
              size="lg"
            >
              <UserPlus className="mr-2" size={20} />
              Register Account
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-muted-foreground">
              Already have an account?{" "}
              <button
                onClick={() => navigate("/login")}
                className="text-primary hover:text-primary-glow transition-colors font-semibold"
              >
                Login in
              </button>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default Register;