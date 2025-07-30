import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { CalendarDays } from 'lucide-react';
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

export type TimeRange = 'today' | 'yesterday' | '7d' | '30d' | 'custom';

interface TimeFilterProps {
  selectedRange: TimeRange;
  onRangeChange: (range: TimeRange, customDates?: { from: Date; to: Date }) => void;
  className?: string;
}

interface DateRange {
  from: Date | undefined;
  to: Date | undefined;
}

export function TimeFilter({ selectedRange, onRangeChange, className }: TimeFilterProps) {
  const [dateRange, setDateRange] = useState<DateRange>({
    from: undefined,
    to: undefined
  });
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const timeRanges = [
    { id: 'today', label: 'Today' },
    { id: 'yesterday', label: 'Yesterday' },
    { id: '7d', label: 'Last 7 days' },
    { id: '30d', label: 'Last 30 days' },
    { id: 'custom', label: 'Custom' }
  ] as const;

  const handleRangeSelect = (range: TimeRange) => {
    if (range === 'custom') {
      setIsCalendarOpen(true);
    } else {
      onRangeChange(range);
    }
  };

  const handleDateRangeSelect = (range: DateRange | undefined) => {
    if (range) {
      setDateRange(range);
      if (range.from && range.to) {
        onRangeChange('custom', { from: range.from, to: range.to });
        setIsCalendarOpen(false);
      }
    }
  };

  const getDisplayLabel = () => {
    if (selectedRange === 'custom' && dateRange.from && dateRange.to) {
      return `${format(dateRange.from, 'MMM dd')} - ${format(dateRange.to, 'MMM dd')}`;
    }
    return timeRanges.find(r => r.id === selectedRange)?.label || 'Last 7 days';
  };

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <motion.div 
        className="flex bg-muted/50 rounded-lg p-1 gap-1"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {timeRanges.map((range) => (
          <motion.div key={range.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant={selectedRange === range.id ? "default" : "ghost"}
              size="sm"
              onClick={() => handleRangeSelect(range.id)}
              className={cn(
                "text-xs transition-all duration-200",
                selectedRange === range.id 
                  ? "bg-primary text-primary-foreground shadow-sm" 
                  : "hover:bg-background/80"
              )}
            >
              {range.label}
            </Button>
          </motion.div>
        ))}
      </motion.div>

      {selectedRange === 'custom' && (
        <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
          <PopoverTrigger asChild>
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button variant="outline" size="sm" className="text-xs">
                <CalendarDays className="h-3 w-3 mr-1" />
                {getDisplayLabel()}
              </Button>
            </motion.div>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="range"
              selected={dateRange}
              onSelect={handleDateRangeSelect}
              numberOfMonths={2}
              className="pointer-events-auto"
            />
          </PopoverContent>
        </Popover>
      )}
    </div>
  );
}