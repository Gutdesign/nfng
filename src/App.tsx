import { useState } from 'react';
import { Menu, X, Bell, Settings } from 'lucide-react';
import { Button } from './components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from './components/ui/sheet';
import { CoachScreen } from './components/CoachScreen';
import { CalendarScreen } from './components/CalendarScreen';
import { StatsScreen } from './components/StatsScreen';
import { ProfileScreen } from './components/ProfileScreen';

type Screen = 'coach' | 'calendar' | 'stats' | 'profile';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('coach');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleScreenChange = (screen: Screen) => {
    setCurrentScreen(screen);
    setIsMenuOpen(false);
  };

  const menuItems = [
    { id: 'coach', label: 'Coach', icon: '💬' },
    { id: 'calendar', label: 'Calendar', icon: '📅' },
    { id: 'stats', label: 'Stats', icon: '📊' },
    { id: 'profile', label: 'Profile', icon: '👤' },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="flex items-center justify-between p-4 border-b border-border">
        <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="sm" className="p-2">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-80 p-0">
            <div className="p-6">
              <div className="text-sm text-muted-foreground mb-4">МЕНЮ</div>
              <nav className="space-y-2">
                {menuItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => handleScreenChange(item.id as Screen)}
                    className={`w-full flex items-center gap-3 p-3 rounded-lg transition-colors ${
                      currentScreen === item.id
                        ? 'bg-accent text-accent-foreground'
                        : 'hover:bg-accent/50'
                    }`}
                  >
                    <span className="text-lg">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                ))}
              </nav>
            </div>
          </SheetContent>
        </Sheet>

        <h1 className="text-lg font-medium">FitMotiv</h1>

        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="p-2">
            <Bell className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="sm" className="p-2">
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="p-4">
        {currentScreen === 'coach' && <CoachScreen />}
        {currentScreen === 'calendar' && <CalendarScreen />}
        {currentScreen === 'stats' && <StatsScreen />}
        {currentScreen === 'profile' && <ProfileScreen />}
      </main>
    </div>
  );
}