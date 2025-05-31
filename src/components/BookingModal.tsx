
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { format } from 'date-fns';
import { cn } from '@/lib/utils';

interface ServiceProvider {
  id: string;
  name: string;
  businessName: string;
  category: string;
  rating: number;
  reviewCount: number;
  location: string;
  image: string;
  description: string;
  price: string;
  verified: boolean;
}

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  provider: ServiceProvider | null;
}

const timeSlots = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '12:00', '12:30', '13:00', '13:30', '14:00', '14:30',
  '15:00', '15:30', '16:00', '16:30', '17:00', '17:30'
];

const BookingModal = ({ isOpen, onClose, provider }: BookingModalProps) => {
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>();

  const handleBooking = () => {
    if (!selectedDate || !selectedTime) return;

    const bookingDetails = {
      provider: provider?.businessName,
      date: format(selectedDate, 'PPP'),
      time: selectedTime,
      customer: JSON.parse(localStorage.getItem('user') || '{}')
    };

    console.log('Booking confirmed:', bookingDetails);
    
    // Simulate sending booking to provider
    alert(`Booking confirmed with ${provider?.name} on ${format(selectedDate, 'PPP')} at ${selectedTime}`);
    
    onClose();
    setSelectedDate(undefined);
    setSelectedTime(undefined);
  };

  if (!provider) return null;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Book a Call with {provider.name}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <h3 className="font-medium mb-2">Select Date</h3>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => date < new Date() || date < new Date("1900-01-01")}
              initialFocus
              className={cn("p-3 pointer-events-auto border rounded-md")}
            />
          </div>

          {selectedDate && (
            <div>
              <h3 className="font-medium mb-2">Select Time</h3>
              <Select value={selectedTime} onValueChange={setSelectedTime}>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a time slot" />
                </SelectTrigger>
                <SelectContent>
                  {timeSlots.map((time) => (
                    <SelectItem key={time} value={time}>
                      {time}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}

          <div className="flex gap-2">
            <Button variant="outline" onClick={onClose} className="flex-1">
              Cancel
            </Button>
            <Button 
              onClick={handleBooking} 
              disabled={!selectedDate || !selectedTime}
              className="flex-1"
            >
              Confirm Booking
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BookingModal;
