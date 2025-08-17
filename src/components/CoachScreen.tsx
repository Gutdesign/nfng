import { useState } from 'react';
import { Send, Paperclip } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';

export function CoachScreen() {
  const [message, setMessage] = useState('');

  const handleSendMessage = () => {
    if (message.trim()) {
      // Handle sending message
      setMessage('');
    }
  };

  return (
    <div className="max-w-2xl mx-auto h-[calc(100vh-140px)] flex flex-col">
      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto pb-4">
        {/* Welcome Message */}
        <Card className="p-4 mb-4 bg-accent/30">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-lg">
              🤖
            </div>
            <div className="flex-1">
              <div className="font-medium mb-2">FitMotiv Coach</div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Привет! Я твой персональный тренер. Давай начнем твое фитнес-путешествие! 
                Расскажи мне о своих целях, и я составлю персональную программу тренировок.
              </p>
              <div className="mt-3 space-y-2">
                <Button variant="outline" size="sm" className="mr-2">
                  🎯 Похудение
                </Button>
                <Button variant="outline" size="sm" className="mr-2">
                  💪 Набор массы
                </Button>
                <Button variant="outline" size="sm">
                  🏃‍♂️ Выносливость
                </Button>
              </div>
            </div>
          </div>
        </Card>

        {/* Additional Tips */}
        <Card className="p-4 mb-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-chart-1 text-white flex items-center justify-center text-lg">
              💡
            </div>
            <div className="flex-1">
              <div className="font-medium mb-2">Совет дня</div>
              <p className="text-sm text-muted-foreground">
                Помни: постоянство важнее интенсивности. Лучше заниматься по 20 минут каждый день, 
                чем 2 часа раз в неделю.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Message Input */}
      <div className="border-t border-border pt-4">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="sm" className="p-2">
            <Paperclip className="h-4 w-4" />
          </Button>
          <Input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Напишите сообщение..."
            className="flex-1"
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
          />
          <Button 
            onClick={handleSendMessage}
            disabled={!message.trim()}
            size="sm"
            className="px-3"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}