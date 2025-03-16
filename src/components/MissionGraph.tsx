
import React from 'react';
import { 
  LineChart, 
  Line, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Area,
  AreaChart,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { Star, Clock, DollarSign, Award } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { cn } from '@/lib/utils';
import { useAppContext } from '@/contexts/AppContext';

interface MissionGraphProps {
  className?: string;
}

const MissionGraph: React.FC<MissionGraphProps> = ({ className }) => {
  const { darkMode, language } = useAppContext();
  
  const statsData = [
    { name: language === 'it' ? 'Gennaio' : 'Jan', solvers: 40, requests: 25 },
    { name: language === 'it' ? 'Febbraio' : 'Feb', solvers: 45, requests: 30 },
    { name: language === 'it' ? 'Marzo' : 'Mar', solvers: 55, requests: 35 },
    { name: language === 'it' ? 'Aprile' : 'Apr', solvers: 60, requests: 45 },
    { name: language === 'it' ? 'Maggio' : 'May', solvers: 75, requests: 55 },
    { name: language === 'it' ? 'Giugno' : 'Jun', solvers: 85, requests: 65 },
  ];

  const pieData = [
    { name: language === 'it' ? 'Tecnologia' : 'Technology', value: 35 },
    { name: language === 'it' ? 'Casa' : 'Home', value: 25 },
    { name: language === 'it' ? 'Educazione' : 'Education', value: 20 },
    { name: language === 'it' ? 'Altro' : 'Other', value: 20 },
  ];

  const COLORS = ['#0088FE', '#8884d8', '#00C49F', '#FFBB28'];

  return (
    <div className={cn("grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4", className)}>
      <Card className="xl:col-span-2">
        <CardHeader>
          <CardTitle>
            {language === 'it' ? 'Crescita della Comunity' : 'Community Growth'}
          </CardTitle>
          <CardDescription>
            {language === 'it' 
              ? 'Mostra la crescita dei solver e delle richieste' 
              : 'Shows growth of solvers and requests'}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="h-[250px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={statsData}>
                <defs>
                  <linearGradient id="colorSolvers" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#8884d8" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="colorRequests" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#82ca9d" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke={darkMode ? "#333" : "#eee"} />
                <XAxis 
                  dataKey="name" 
                  stroke={darkMode ? "#aaa" : "#666"}
                />
                <YAxis stroke={darkMode ? "#aaa" : "#666"} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: darkMode ? '#333' : '#fff', 
                    borderColor: darkMode ? '#555' : '#ddd',
                    color: darkMode ? '#fff' : '#333'
                  }} 
                />
                <Area 
                  type="monotone" 
                  dataKey="solvers" 
                  name={language === 'it' ? 'Solver' : 'Solvers'} 
                  stroke="#8884d8" 
                  fillOpacity={1} 
                  fill="url(#colorSolvers)" 
                />
                <Area 
                  type="monotone" 
                  dataKey="requests" 
                  name={language === 'it' ? 'Richieste' : 'Requests'} 
                  stroke="#82ca9d" 
                  fillOpacity={1} 
                  fill="url(#colorRequests)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>
            {language === 'it' ? 'Categorie di Aiuto' : 'Help Categories'}
          </CardTitle>
          <CardDescription>
            {language === 'it' 
              ? 'Distribuzione per categoria' 
              : 'Distribution by category'}
          </CardDescription>
        </CardHeader>
        <CardContent className="pt-2">
          <div className="h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: darkMode ? '#333' : '#fff', 
                    borderColor: darkMode ? '#555' : '#ddd',
                    color: darkMode ? '#fff' : '#333'
                  }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>
      
      <Card className="relative overflow-hidden">
        <div className="absolute -right-10 -top-10 h-48 w-48 rounded-full bg-gradient-to-r from-violet-500/10 to-purple-500/20 blur-2xl"></div>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-yellow-500" />
            {language === 'it' ? 'Soddisfazione' : 'Satisfaction'}
          </CardTitle>
          <CardDescription>
            {language === 'it' 
              ? 'Livello di soddisfazione utenti' 
              : 'User satisfaction level'}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center">
            <div className="relative flex aspect-square h-32 w-32 items-center justify-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 font-mono text-4xl font-bold text-white">
              <div className="absolute inset-1 rounded-full bg-card flex items-center justify-center">
                <div className="flex flex-col items-center">
                  <span className="text-3xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">4.8</span>
                  <span className="text-xs text-muted-foreground">/ 5.0</span>
                </div>
              </div>
            </div>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-muted-foreground">
              {language === 'it' 
                ? 'Basato su più di 10.000 valutazioni' 
                : 'Based on over 10,000 ratings'}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MissionGraph;
