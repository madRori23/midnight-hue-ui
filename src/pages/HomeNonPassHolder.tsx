import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Search, LogOut, User, Clock, CheckCircle, XCircle, AlertCircle, Calendar, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

interface AvailableSchedule {
  id: string;
  date: string;
  time: string;
  location: string;
  passHolder: string;
  activityType: string;
  spotsAvailable: boolean;
}

interface MyRequest {
  id: string;
  scheduleId: string;
  date: string;
  time: string;
  location: string;
  passHolder: string;
  status: "pending" | "accepted" | "declined" | "cancelled";
  requestedAt: string;
}

const HomeNonPassHolder = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [searchTerm, setSearchTerm] = useState("");
  
  const [availableSchedules] = useState<AvailableSchedule[]>([
    {
      id: "s1",
      date: "22/03/2025",
      time: "12:00pm",
      location: "Centurion Gate",
      passHolder: "JohnDoe",
      activityType: "Weight Training",
      spotsAvailable: true
    },
    {
      id: "s2",
      date: "25/03/2025",
      time: "6:00am",
      location: "Centurion Gate",
      passHolder: "SarahFit",
      activityType: "HIIT",
      spotsAvailable: false
    },
    {
      id: "s3",
      date: "29/03/2025",
      time: "5:00pm",
      location: "Centurion Gate",
      passHolder: "MikeStrong",
      activityType: "CrossFit",
      spotsAvailable: true
    },
    {
      id: "s4",
      date: "30/03/2025",
      time: "7:00am",
      location: "Sandton City",
      passHolder: "EmmaRun",
      activityType: "Cardio",
      spotsAvailable: true
    }
  ]);

  const [myRequests] = useState<MyRequest[]>([
    {
      id: "r1",
      scheduleId: "s2",
      date: "25/03/2025",
      time: "6:00am",
      location: "Centurion Gate",
      passHolder: "SarahFit",
      status: "accepted",
      requestedAt: "2 days ago"
    },
    {
      id: "r2",
      scheduleId: "s5",
      date: "23/03/2025",
      time: "4:00pm",
      location: "Rosebank Mall",
      passHolder: "AlexLift",
      status: "pending",
      requestedAt: "1 hour ago"
    },
    {
      id: "r3",
      scheduleId: "s6",
      date: "24/03/2025",
      time: "8:00am",
      location: "Menlyn Park",
      passHolder: "ChrisFlex",
      status: "declined",
      requestedAt: "3 days ago"
    }
  ]);

  const handleRequestToJoin = (scheduleId: string) => {
    toast({
      title: "Request Sent",
      description: "Your request to join this session has been sent to the pass holder.",
    });
  };

  const filteredSchedules = availableSchedules.filter(schedule =>
    schedule.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    schedule.activityType.toLowerCase().includes(searchTerm.toLowerCase()) ||
    schedule.passHolder.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "accepted":
        return <CheckCircle className="text-green-500" size={16} />;
      case "declined":
        return <XCircle className="text-destructive" size={16} />;
      case "pending":
        return <Clock className="text-primary" size={16} />;
      case "cancelled":
        return <AlertCircle className="text-muted-foreground" size={16} />;
      default:
        return null;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "text-green-500";
      case "declined":
        return "text-destructive";
      case "pending":
        return "text-primary";
      case "cancelled":
        return "text-muted-foreground";
      default:
        return "";
    }
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
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-muted to-secondary flex items-center justify-center">
              <User size={20} className="text-foreground" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Welcome back!</h1>
              <p className="text-sm text-muted-foreground">Non-Pass Holder</p>
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
        {/* My Requests Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <h2 className="text-2xl font-bold text-foreground mb-6">My Requests</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {myRequests.map((request, index) => (
              <motion.div
                key={request.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-card to-secondary border-border hover:shadow-card transition-all duration-300 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {getStatusIcon(request.status)}
                      <span className={`text-sm font-semibold capitalize ${getStatusColor(request.status)}`}>
                        {request.status}
                      </span>
                    </div>
                    <span className="text-xs text-muted-foreground">{request.requestedAt}</span>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-foreground">
                      <User size={14} className="text-primary" />
                      <span className="text-sm font-medium">{request.passHolder}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock size={14} />
                      <span className="text-sm">{request.date} at {request.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin size={14} />
                      <span className="text-sm">{request.location}</span>
                    </div>
                  </div>
                  
                  {request.status === "accepted" && (
                    <div className="mt-3 pt-3 border-t border-border">
                      <p className="text-xs text-green-500 font-medium">
                        ✓ You're confirmed for this session!
                      </p>
                    </div>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
          
          {myRequests.length === 0 && (
            <Card className="bg-card border-border p-8 text-center">
              <p className="text-muted-foreground">You haven't made any requests yet.</p>
            </Card>
          )}
        </motion.div>

        {/* Available Schedules Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-foreground">Available Schedules</h2>
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
              <Input
                placeholder="Search by location, activity..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-input border-border text-foreground placeholder:text-muted-foreground"
              />
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredSchedules.map((schedule, index) => (
              <motion.div
                key={schedule.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="bg-gradient-to-br from-card to-secondary border-border hover:shadow-card transition-all duration-300 p-4">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-semibold text-primary">{schedule.activityType}</span>
                    {schedule.spotsAvailable ? (
                      <span className="text-xs px-2 py-1 bg-green-500/20 text-green-500 rounded-full">
                        Available
                      </span>
                    ) : (
                      <span className="text-xs px-2 py-1 bg-destructive/20 text-destructive rounded-full">
                        Full
                      </span>
                    )}
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-foreground">
                      <User size={14} className="text-primary" />
                      <span className="text-sm font-medium">{schedule.passHolder}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Calendar size={14} />
                      <span className="text-sm">{schedule.date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Clock size={14} />
                      <span className="text-sm">{schedule.time}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin size={14} />
                      <span className="text-sm">{schedule.location}</span>
                    </div>
                  </div>
                  
                  <Button
                    className={`w-full ${
                      schedule.spotsAvailable
                        ? "bg-gradient-to-r from-primary to-accent hover:shadow-button"
                        : "bg-muted text-muted-foreground cursor-not-allowed"
                    }`}
                    disabled={!schedule.spotsAvailable}
                    onClick={() => handleRequestToJoin(schedule.id)}
                  >
                    {schedule.spotsAvailable ? "Request to Join" : "Session Full"}
                  </Button>
                </Card>
              </motion.div>
            ))}
          </div>
          
          {filteredSchedules.length === 0 && (
            <Card className="bg-card border-border p-8 text-center">
              <p className="text-muted-foreground">No available schedules found.</p>
            </Card>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default HomeNonPassHolder;