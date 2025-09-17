import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, MapPin, Activity, Save } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const CreateSchedule = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    date: "",
    time: "",
    location: "Centurion Gate",
    activityType: "weights"
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast({
      title: "Schedule Created",
      description: "Your workout session has been scheduled successfully!",
    });
    
    setTimeout(() => {
      navigate("/home");
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-card/80 backdrop-blur-lg border-b border-border sticky top-0 z-50"
      >
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate("/home")}
              className="hover:bg-muted"
            >
              <ArrowLeft size={20} className="mr-2" />
              Back
            </Button>
            <h1 className="text-xl font-bold text-foreground">Create Schedule</h1>
          </div>
        </div>
      </motion.header>

      <div className="max-w-2xl mx-auto px-6 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <Card className="bg-card/80 backdrop-blur-lg border-border shadow-card p-8">
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-foreground">Schedule a Workout Session</h2>
              <p className="text-muted-foreground mt-2">
                Set up a time for others to join you at the gym
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="date" className="flex items-center gap-2 text-foreground">
                  <Calendar size={16} className="text-primary" />
                  Date
                </Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                  className="bg-input border-border text-foreground"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="time" className="flex items-center gap-2 text-foreground">
                  <Clock size={16} className="text-primary" />
                  Time
                </Label>
                <Input
                  id="time"
                  type="time"
                  value={formData.time}
                  onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                  className="bg-input border-border text-foreground"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="location" className="flex items-center gap-2 text-foreground">
                  <MapPin size={16} className="text-primary" />
                  Location
                </Label>
                <Select
                  value={formData.location}
                  onValueChange={(value) => setFormData({ ...formData, location: value })}
                >
                  <SelectTrigger className="bg-input border-border text-foreground">
                    <SelectValue placeholder="Select a gym location" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="Centurion Gate">Centurion Gate</SelectItem>
                    <SelectItem value="Sandton City">Sandton City</SelectItem>
                    <SelectItem value="Rosebank Mall">Rosebank Mall</SelectItem>
                    <SelectItem value="Menlyn Park">Menlyn Park</SelectItem>
                    <SelectItem value="V&A Waterfront">V&A Waterfront</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="activityType" className="flex items-center gap-2 text-foreground">
                  <Activity size={16} className="text-primary" />
                  Activity Type
                </Label>
                <Select
                  value={formData.activityType}
                  onValueChange={(value) => setFormData({ ...formData, activityType: value })}
                >
                  <SelectTrigger className="bg-input border-border text-foreground">
                    <SelectValue placeholder="Select activity type" />
                  </SelectTrigger>
                  <SelectContent className="bg-popover border-border">
                    <SelectItem value="weights">Weight Training</SelectItem>
                    <SelectItem value="cardio">Cardio</SelectItem>
                    <SelectItem value="hiit">HIIT</SelectItem>
                    <SelectItem value="yoga">Yoga</SelectItem>
                    <SelectItem value="crossfit">CrossFit</SelectItem>
                    <SelectItem value="swimming">Swimming</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-primary to-accent hover:shadow-button transition-all duration-300"
                  size="lg"
                >
                  <Save size={20} className="mr-2" />
                  Add to Schedule
                </Button>
                
                <Button
                  type="button"
                  variant="outline"
                  size="lg"
                  onClick={() => navigate("/home")}
                  className="flex-1 border-border hover:bg-card"
                >
                  Cancel
                </Button>
              </div>
            </form>
          </Card>

          {/* Preview Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-8"
          >
            <Card className="bg-gradient-to-br from-card to-secondary border-border shadow-card p-6">
              <h3 className="text-lg font-semibold text-foreground mb-4">Session Preview</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar size={14} />
                  <span className="text-sm">
                    {formData.date ? new Date(formData.date).toLocaleDateString() : "Select a date"}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock size={14} />
                  <span className="text-sm">{formData.time || "Select a time"}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MapPin size={14} />
                  <span className="text-sm">{formData.location}</span>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Activity size={14} />
                  <span className="text-sm capitalize">
                    {formData.activityType.replace("weights", "Weight Training")}
                  </span>
                </div>
              </div>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateSchedule;