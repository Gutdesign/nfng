import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';

type WorkoutType = 'main' | 'alternative' | 'rest' | 'missed';

interface DayData {
  date: number;
  workoutType?: WorkoutType;
  completionPercentage?: number;
  isToday?: boolean;
}

export default function CalendarScreen() {
  const [currentDate, setCurrentDate] = useState(new Date());

  // Mock data for calendar
  const generateCalendarData = (): DayData[] => {
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days: DayData[] = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push({ date: 0 });
    }

    // Add days of the month with mock workout data
    for (let date = 1; date <= daysInMonth; date++) {
      const dayData: DayData = { date };
      
      // Check if today
      const today = new Date();
      if (year === today.getFullYear() && month === today.getMonth() && date === today.getDate()) {
        dayData.isToday = true;
      }

      // Mock workout data
      if (date % 7 === 0) {
        dayData.workoutType = 'rest';
      } else if (date % 5 === 0) {
        dayData.workoutType = 'missed';
      } else if (date % 3 === 0) {
        dayData.workoutType = 'alternative';
        dayData.completionPercentage = Math.floor(Math.random() * 40) + 60; // 60-100%
      } else if (date % 2 === 0) {
        dayData.workoutType = 'main';
        dayData.completionPercentage = Math.floor(Math.random() * 50) + 50; // 50-100%
      }

      days.push(dayData);
    }

    return days;
  };

  const calendarData = generateCalendarData();
  const monthNames = [
    'Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
    'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'
  ];

  const weekDays = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      if (direction === 'prev') {
        newDate.setMonth(prev.getMonth() - 1);
      } else {
        newDate.setMonth(prev.getMonth() + 1);
      }
      return newDate;
    });
  };

  const getWorkoutColor = (type: WorkoutType) => {
    switch (type) {
      case 'main': return 'bg-chart-1';
      case 'alternative': return 'bg-chart-2';
      case 'missed': return 'bg-destructive';
      case 'rest': return 'bg-muted';
      default: return 'bg-transparent';
    }
  };

  const getDayContent = (day: DayData) => {
    if (day.date === 0) return null;

    return (
      <div 
        className={`
          relative w-full h-12 flex items-center justify-center rounded-lg border transition-colors
          ${day.isToday ? 'border-primary bg-primary/10' : 'border-border hover:bg-accent/50'}
        `}
      >
        {/* Day number */}
        <span className={`text-sm ${day.isToday ? 'text-primary font-medium' : ''}`}>
          {day.date}
        </span>
        
        {/* Workout progress bar */}
        {day.workoutType && day.workoutType !== 'rest' && (
          <div className="absolute bottom-0 left-0 right-0 h-1 bg-muted rounded-b-lg overflow-hidden">
            <div 
              className={`h-full ${getWorkoutColor(day.workoutType)} transition-all duration-300`}
              style={{ 
                width: day.completionPercentage ? `${day.completionPercentage}%` : '0%' 
              }}
            />
          </div>
        )}
        
        {/* Rest day indicator */}
        {day.workoutType === 'rest' && (
          <div className="absolute top-1 right-1 w-2 h-2 bg-muted rounded-full" />
        )}
        
        {/* Missed workout indicator */}
        {day.workoutType === 'missed' && (
          <div className="absolute top-1 right-1 w-2 h-2 bg-destructive rounded-full" />
        )}
      </div>
    );
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Calendar Header */}
      <Card className="p-4">
        <div className="flex items-center justify-between mb-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateMonth('prev')}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <h2 className="text-lg font-medium">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateMonth('next')}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        {/* Week days header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {weekDays.map(day => (
            <div key={day} className="text-center text-xs text-muted-foreground py-2">
              {day}
            </div>
          ))}
        </div>

        {/* Calendar grid */}
        <div className="grid grid-cols-7 gap-1">
          {calendarData.map((day, index) => (
            <div key={index} className="aspect-square">
              {getDayContent(day)}
            </div>
          ))}
        </div>
      </Card>

      {/* Legend */}
      <Card className="p-4">
        <div className="grid grid-cols-2 gap-3 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-4 h-2 bg-chart-1 rounded" />
            <span>Основная тренировка</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-4 h-2 bg-chart-2 rounded" />
            <span>Альтернативная</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-muted rounded-full" />
            <span>День отдыха</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-destructive rounded-full" />
            <span>Пропущена</span>
          </div>
        </div>
      </Card>
    </div>
  );
}