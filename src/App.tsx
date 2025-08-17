@@ .. @@
 import { useState } from 'react';
 import { Menu, X, Bell, Settings } from 'lucide-react';
 import { Button } from './components/ui/button';
 import { Sheet, SheetContent, SheetTrigger } from './components/ui/sheet';
-import CoachScreen from './components/CoachScreen';
-import CalendarScreen from './components/CalendarScreen';
-import StatsScreen from './components/StatsScreen';
-import ProfileScreen from './components/ProfileScreen';
+import { CoachScreen } from './components/CoachScreen';
+import { CalendarScreen } from './components/CalendarScreen';
+import { StatsScreen } from './components/StatsScreen';
+import { ProfileScreen } from './components/ProfileScreen';
 
 type Screen = 'coach' | 'calendar' | 'stats' | 'profile';