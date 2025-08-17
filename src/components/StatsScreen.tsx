import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

export function StatsScreen() {
  // Mock data for charts
  const weeklyProgressData = [
    { day: 'Пн', workouts: 85, target: 100 },
    { day: 'Вт', workouts: 92, target: 100 },
    { day: 'Ср', workouts: 78, target: 100 },
    { day: 'Чт', workouts: 95, target: 100 },
    { day: 'Пт', workouts: 88, target: 100 },
    { day: 'Сб', workouts: 76, target: 100 },
    { day: 'Вс', workouts: 0, target: 100 },
  ];

  const monthlyTrendsData = [
    { date: '01', completion: 75, intensity: 65 },
    { date: '03', completion: 82, intensity: 72 },
    { date: '05', completion: 78, intensity: 68 },
    { date: '07', completion: 89, intensity: 78 },
    { date: '09', completion: 85, intensity: 74 },
    { date: '11', completion: 91, intensity: 82 },
    { date: '13', completion: 94, intensity: 85 },
    { date: '15', completion: 88, intensity: 80 },
  ];

  const workoutTypesData = [
    { name: 'Кардио', value: 35, color: '#8884d8' },
    { name: 'Силовые', value: 45, color: '#82ca9d' },
    { name: 'Растяжка', value: 20, color: '#ffc658' },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Выполнено тренировок</p>
            <p className="text-2xl font-bold">18 / 24</p>
            <Progress value={75} className="h-2" />
            <p className="text-xs text-muted-foreground">75% от цели месяца</p>
          </div>
        </Card>

        <Card className="p-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Текущая серия</p>
            <p className="text-2xl font-bold text-chart-1">5 дней</p>
            <p className="text-xs text-chart-1">🔥 Отличная работа!</p>
          </div>
        </Card>

        <Card className="p-4">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">Среднее качество</p>
            <p className="text-2xl font-bold">87%</p>
            <p className="text-xs text-muted-foreground">+5% к прошлой неделе</p>
          </div>
        </Card>
      </div>

      {/* Weekly Progress Chart */}
      <Card className="p-6">
        <h3 className="font-medium mb-4">Прогресс за неделю</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={weeklyProgressData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="day" />
              <YAxis />
              <Bar dataKey="workouts" fill="hsl(var(--chart-1))" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Card>

      {/* Monthly Trends */}
      <Card className="p-6">
        <h3 className="font-medium mb-4">Тренды месяца</h3>
        <div className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={monthlyTrendsData}>
              <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
              <XAxis dataKey="date" />
              <YAxis />
              <Line 
                type="monotone" 
                dataKey="completion" 
                stroke="hsl(var(--chart-1))" 
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--chart-1))' }}
              />
              <Line 
                type="monotone" 
                dataKey="intensity" 
                stroke="hsl(var(--chart-2))" 
                strokeWidth={2}
                dot={{ fill: 'hsl(var(--chart-2))' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-6 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-chart-1" />
            <span>Выполнение (%)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-chart-2" />
            <span>Интенсивность (%)</span>
          </div>
        </div>
      </Card>

      {/* Workout Types Distribution */}
      <Card className="p-6">
        <h3 className="font-medium mb-4">Типы тренировок</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={workoutTypesData}
                cx="50%"
                cy="50%"
                innerRadius={40}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {workoutTypesData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="space-y-2 mt-4">
          {workoutTypesData.map((item, index) => (
            <div key={index} className="flex items-center justify-between text-sm">
              <div className="flex items-center gap-2">
                <div 
                  className="w-3 h-3 rounded-full" 
                  style={{ backgroundColor: item.color }}
                />
                <span>{item.name}</span>
              </div>
              <span className="font-medium">{item.value}%</span>
            </div>
          ))}
        </div>
      </Card>

      {/* Goals & Achievements */}
      <Card className="p-6">
        <h3 className="font-medium mb-4">Цели и достижения</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Тренировки в месяц</p>
              <p className="text-sm text-muted-foreground">18 из 24 тренировок</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">75%</p>
              <Progress value={75} className="w-20 h-2 mt-1" />
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Серия тренировок</p>
              <p className="text-sm text-muted-foreground">5 из 7 дней подряд</p>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium">71%</p>
              <Progress value={71} className="w-20 h-2 mt-1" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}