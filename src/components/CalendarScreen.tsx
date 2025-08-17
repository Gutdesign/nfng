@@ .. @@
 interface DayData {
   date: number;
   workoutType?: WorkoutType;
   completionPercentage?: number;
   isToday?: boolean;
 }
 
-export default function CalendarScreen() {
}
+export function CalendarScreen() {
   const [currentDate, setCurrentDate] = useState(new Date());
}