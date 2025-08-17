import { useState } from 'react';
import { Edit2, LogOut } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Switch } from './ui/switch';
import { Avatar, AvatarFallback } from './ui/avatar';

export default function ProfileScreen() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: 'Миша',
    email: 'mszaritovsky@gmail.com',
    notifications: true,
    reminders: false,
  });

  const handleSave = () => {
    setIsEditing(false);
    // Save profile data
  };

  const handleLogout = () => {
    // Handle logout
    console.log('Logging out...');
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {/* Profile Header */}
      <Card className="p-6">
        <div className="flex items-center gap-4 mb-6">
          <div className="relative">
            <Avatar className="w-16 h-16">
              <AvatarFallback className="text-2xl bg-accent">
                😊
              </AvatarFallback>
            </Avatar>
            <Button
              variant="outline"
              size="sm"
              className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full p-0"
              onClick={() => setIsEditing(!isEditing)}
            >
              <Edit2 className="h-3 w-3" />
            </Button>
          </div>
          <div>
            <p className="text-sm text-muted-foreground mb-1">
              Наведи на аватар, чтобы изменить (демо)
            </p>
            <h2 className="text-xl font-medium">{profile.name}</h2>
          </div>
        </div>

        {/* Profile Form */}
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">ИМЯ</Label>
            <Input
              id="name"
              value={profile.name}
              onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
              disabled={!isEditing}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="email">ПОЧТА</Label>
            <Input
              id="email"
              type="email"
              value={profile.email}
              onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
              disabled={!isEditing}
              className="mt-2"
            />
          </div>

          <div>
            <Label htmlFor="password">ПАРОЛЬ</Label>
            <Input
              id="password"
              type="password"
              placeholder="Оставь пустым, чтобы не менять"
              disabled={!isEditing}
              className="mt-2"
            />
          </div>
        </div>
      </Card>

      {/* Notification Settings */}
      <Card className="p-6">
        <h3 className="font-medium mb-4">Настройки уведомлений</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <Label>Включить уведомления</Label>
              <p className="text-sm text-muted-foreground">
                Получать push-уведомления о тренировках
              </p>
            </div>
            <Switch
              checked={profile.notifications}
              onCheckedChange={(checked) => 
                setProfile(prev => ({ ...prev, notifications: checked }))
              }
            />
          </div>

          <div className="flex items-center justify-between">
            <div>
              <Label>Разрешить напоминания</Label>
              <p className="text-sm text-muted-foreground">
                Ежедневные напоминания о тренировках
              </p>
            </div>
            <Switch
              checked={profile.reminders}
              onCheckedChange={(checked) => 
                setProfile(prev => ({ ...prev, reminders: checked }))
              }
            />
          </div>
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col gap-3">
        {isEditing ? (
          <Button 
            onClick={handleSave}
            className="w-full bg-chart-1 hover:bg-chart-1/90"
          >
            ✓ Сохранить
          </Button>
        ) : null}
        
        <Button 
          variant="outline" 
          onClick={handleLogout}
          className="w-full flex items-center gap-2"
        >
          <LogOut className="h-4 w-4" />
          Log Out
        </Button>
      </div>
    </div>
  );
}