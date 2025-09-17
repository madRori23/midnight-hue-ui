import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Plus, Calendar, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import ScheduleCard from "@/components/ScheduleCard";
import { useToast } from "@/hooks/use-toast";

const Home = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  type RequestStatus = "pending" | "accepted" | "declined";
  
  interface Request {
    id: string;
    username: string;
    status: RequestStatus;
  }
  
  interface Schedule {
    id: string;
    date: string;
    time: string;
    location: string;
    requests: Request[];
  }
  
  const [schedules, setSchedules] = useState<Schedule[]>([
    {
      id: "1",
      date: "22/03/2025",
      time: "12:00pm",
      location: "Centurion Gate",
      requests: []
    },
    {
      id: "2",
      date: "25/03/2025",
      time: "6:00am",
      location: "Centurion Gate",
      requests: [
        { id: "r1", username: "JohnFit", status: "pending" },
        { id: "r2", username: "SarahStrong", status: "pending" }
      ]
    },
    {
      id: "3",
      date: "29/03/2025",
      time: "5:00pm",
      location: "Centurion Gate",
      requests: [
        { id: "r3", username: "MikeGains", status: "pending" }
      ]
    },
    {
      id: "4",
      date: "30/03/2025",
      time: "7:00am",
      location: "Centurion Gate",
      requests: []
    }
  ]);

  const handleAccept = (scheduleId: string, requestId: string) => {
    setSchedules(prev => prev.map(schedule => {
      if (schedule.id === scheduleId) {
        return {
          ...schedule,
          requests: schedule.requests.map(req =>
            req.id === requestId ? { ...req, status: "accepted" as const } : { ...req, status: "declined" as const }
          )
        };
      }
      return schedule;
    }));
    
    toast({
      title: "Request Accepted",
      description: "Your buddy has been confirmed for this session.",
    });
  };

  const handleDecline = (scheduleId: string, requestId: string) => {
    setSchedules(prev => prev.map(schedule => {
      if (schedule.id === scheduleId) {
        return {
          ...schedule,
          requests: schedule.requests.filter(req => req.id !== requestId)
        };
      }
      return schedule;
    }));
    
    toast({
      title: "Request Declined",
      description: "The buddy request has been declined.",
    });
  };

  const handleCancel = (scheduleId: string) => {
    setSchedules(prev => prev.filter(schedule => schedule.id !== scheduleId));
    
    toast({
      title: "Schedule Cancelled",
      description: "Your workout session has been cancelled.",
      variant: "destructive"
    });
  };

  const handleOptOut = (scheduleId: string) => {
    setSchedules(prev => prev.map(schedule => {
      if (schedule.id === scheduleId) {
        return {
          ...schedule,
          requests: []
        };
      }
      return schedule;
    }));
    
    toast({
      title: "Opted Out",
      description: "You have opted out of this buddy session.",
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-card">
      {/* Header */}
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-card/80 backdrop-blur-lg border-b border-border sticky top-0 z-50"
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
              <User size={20} className="text-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Welcome back!</h1>
              <p className="text-sm text-muted-foreground">Pass Holder</p>
            </div>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/")}
            className="border-border hover:bg-card"
          >
            <LogOut size={16} className="mr-2" />
            Logout
          </Button>
        </div>
      </motion.header>

      <div className="max-w-6xl mx-auto px-6 py-8">
        {/* Action Buttons */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
          className="flex gap-4 mb-8"
        >
          <Button
            onClick={() => navigate("/create-schedule")}
            className="bg-gradient-to-r from-primary to-accent hover:shadow-button transition-all duration-300"
            size="lg"
          >
            <Plus size={20} className="mr-2" />
            Create a new schedule
          </Button>
          
          <Button
            variant="outline"
            size="lg"
            className="border-border hover:bg-card"
          >
            <Calendar size={20} className="mr-2" />
            View Calendar
          </Button>
        </motion.div>

        {/* Existing Schedules */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-2xl font-bold text-foreground mb-6">Existing Schedules</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {schedules.map((schedule, index) => (
              <ScheduleCard
                key={schedule.id}
                date={schedule.date}
                time={schedule.time}
                location={schedule.location}
                requests={schedule.requests}
                status={schedule.requests.some(r => r.status === "accepted") ? "confirmed" : "open"}
                onAccept={(requestId) => handleAccept(schedule.id, requestId)}
                onDecline={(requestId) => handleDecline(schedule.id, requestId)}
                onCancel={() => handleCancel(schedule.id)}
                onOptOut={() => handleOptOut(schedule.id)}
                index={index}
              />
            ))}
          </div>
        </motion.div>

        {/* Accepted Requests Section */}
        {schedules.some(s => s.requests.some(r => r.status === "accepted")) && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="mt-12"
          >
            <h2 className="text-2xl font-bold text-foreground mb-6">Confirmed Sessions</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {schedules
                .filter(s => s.requests.some(r => r.status === "accepted"))
                .map((schedule, index) => (
                  <ScheduleCard
                    key={`confirmed-${schedule.id}`}
                    date={schedule.date}
                    time={schedule.time}
                    location={schedule.location}
                    requests={schedule.requests.filter(r => r.status === "accepted")}
                    status="confirmed"
                    onOptOut={() => handleOptOut(schedule.id)}
                    index={index}
                  />
                ))}
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default Home;
