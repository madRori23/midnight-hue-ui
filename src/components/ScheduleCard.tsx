import { motion } from "framer-motion";
import { Calendar, Clock, MapPin, Users, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface Request {
  id: string;
  username: string;
  status?: "pending" | "accepted" | "declined";
}

interface ScheduleCardProps {
  date: string;
  time: string;
  location: string;
  requests?: Request[];
  status?: "open" | "confirmed";
  onAccept?: (requestId: string) => void;
  onDecline?: (requestId: string) => void;
  onCancel?: () => void;
  onOptOut?: () => void;
  index?: number;
}

const ScheduleCard = ({
  date,
  time,
  location,
  requests = [],
  status = "open",
  onAccept,
  onDecline,
  onCancel,
  onOptOut,
  index = 0
}: ScheduleCardProps) => {
  const hasRequests = requests.length > 0;
  const acceptedRequest = requests.find(r => r.status === "accepted");

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
    >
      <Card className="bg-gradient-to-br from-card to-secondary border-border hover:shadow-card transition-all duration-300 p-4">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-primary">
              <Calendar size={16} />
              <span className="text-sm font-semibold">{date}</span>
            </div>
            {status === "confirmed" && (
              <span className="text-xs px-2 py-1 bg-primary/20 text-primary rounded-full">
                Confirmed
              </span>
            )}
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock size={14} />
              <span className="text-sm">{time}</span>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin size={14} />
              <span className="text-sm">{location}</span>
            </div>
          </div>

          {hasRequests && !acceptedRequest && (
            <div className="border-t border-border pt-3">
              <div className="flex items-center gap-2 mb-2">
                <Users size={16} className="text-primary" />
                <span className="text-sm font-semibold text-foreground">
                  {requests.length} Request{requests.length > 1 ? "s" : ""}
                </span>
              </div>
              {requests.map(request => (
                <div key={request.id} className="flex items-center justify-between py-2">
                  <span className="text-sm text-foreground">{request.username}</span>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      className="h-7 bg-primary hover:bg-primary-glow"
                      onClick={() => onAccept?.(request.id)}
                    >
                      <CheckCircle size={14} className="mr-1" />
                      Accept
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="h-7 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
                      onClick={() => onDecline?.(request.id)}
                    >
                      <XCircle size={14} className="mr-1" />
                      Decline
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {acceptedRequest && (
            <div className="border-t border-border pt-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Users size={16} className="text-primary" />
                  <span className="text-sm">
                    Buddy: <span className="font-semibold text-primary">{acceptedRequest.username}</span>
                  </span>
                </div>
                <Button
                  size="sm"
                  variant="outline"
                  className="h-7 text-destructive hover:bg-destructive hover:text-destructive-foreground"
                  onClick={onOptOut}
                >
                  Opt-out
                </Button>
              </div>
            </div>
          )}

          {!hasRequests && !acceptedRequest && (
            <div className="flex items-center gap-2 text-muted-foreground pt-2">
              <Users size={14} />
              <span className="text-sm">No requests yet</span>
            </div>
          )}
        </div>

        {onCancel && (
          <Button
            variant="outline"
            size="sm"
            className="w-full mt-3 border-destructive text-destructive hover:bg-destructive hover:text-destructive-foreground"
            onClick={onCancel}
          >
            Cancel Schedule
          </Button>
        )}
      </Card>
    </motion.div>
  );
};

export default ScheduleCard;