
'use client';
import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  LabelList,
} from 'recharts';

const barData = [
  { name: 'Jan', productivity: 4000 },
  { name: 'Feb', productivity: 3000 },
  { name: 'Mar', productivity: 5000 },
  { name: 'Apr', productivity: 4500 },
  { name: 'May', productivity: 6000 },
  { name: 'Jun', productivity: 2390 },
  { name: 'Jul', productivity: 3490 },
  { name: 'Aug', productivity: 4300 },
  { name: 'Sep', productivity: 5100 },
  { name: 'Oct', productivity: 4800 },
  { name: 'Nov', productivity: 5500 },
  { name: 'Dec', productivity: 3800 },
];

const staffManagementData = [
    { name: 'Total Employees', value: 4 },
    { name: 'Login', value: 3 },
    { name: 'Not Login', value: 1 },
    { name: 'In Office', value: 3 },
    { name: 'Freelancer', value: 7 },
];

const freelancerData = [
    { name: 'Total Employees', value: 4 },
    { name: 'Login', value: 1 },
    { name: 'Not Login', value: 3 },
    { name: 'Freelancer', value: 7 },
];


const sourceData = [
    { name: 'Websites', value: 100 },
]

const PIE_CHART_COLORS = ['hsl(var(--primary))', '#F97316', '#EF4444', '#10B981', '#3B82F6'];
const FREELANCER_CHART_COLORS = ['#FB923C', '#F97316', '#EA580C', '#D97706'];

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-2 bg-background/80 backdrop-blur-sm border rounded-lg shadow-lg">
        <p className="label font-bold text-foreground">{`${payload[0].name} : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

export const BarChart = () => (
  <ResponsiveContainer width="100%" height={300}>
    <RechartsBarChart data={barData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }}>
      <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
      <XAxis dataKey="name" stroke="hsl(var(--card-foreground))" fontSize={12} tickLine={false} axisLine={false} />
      <YAxis stroke="hsl(var(--card-foreground))" fontSize={12} tickLine={false} axisLine={false} unit="k" tickFormatter={(value) => `$${value/1000}`} />
      <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--accent))', radius: 4 }} />
      <Legend iconType="circle" iconSize={8} />
      <Bar dataKey="productivity" name="profit" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={20} />
    </RechartsBarChart>
  </ResponsiveContainer>
);

const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, payload }: any) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);
  const labelRadius = outerRadius + 20;
  const lx = cx + labelRadius * Math.cos(-midAngle * RADIAN);
  const ly = cy + labelRadius * Math.sin(-midAngle * RADIAN);


  return (
    <text x={lx} y={ly} fill="hsl(var(--card-foreground))" textAnchor={lx > cx ? 'start' : 'end'} dominantBaseline="central">
      {`${payload.name} - ${payload.value}`}
    </text>
  );
};

export const PieChart = ({ type }: { type: 'staff' | 'source' }) => {
    const data = type === 'staff' ? staffManagementData : sourceData;
    const colors = PIE_CHART_COLORS;
    
    return (
      <ResponsiveContainer width="100%" height={300}>
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={type === 'staff'}
            label={type === 'staff' ? renderCustomizedLabel : undefined}
            outerRadius={80}
            fill="#8884d8"
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={colors[index % colors.length]} />
            ))}
             {type === 'source' && <LabelList dataKey="name" position="outside" offset={15} formatter={(value: string) => `${value} - 100`} />}
          </Pie>
          <Tooltip
            content={<CustomTooltip />}
            cursor={{ fill: 'hsl(var(--accent))' }}
          />
          <Legend wrapperStyle={{color: 'hsl(var(--card-foreground))'}} iconType="circle" iconSize={8} />
        </RechartsPieChart>
      </ResponsiveContainer>
    );
}

export const FreelancerChart = () => (
    <ResponsiveContainer width="100%" height={300}>
        <RechartsBarChart data={freelancerData} margin={{ top: 5, right: 20, left: -20, bottom: 5 }} barCategoryGap="20%">
            <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
            <XAxis dataKey="name" stroke="hsl(var(--card-foreground))" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="hsl(var(--card-foreground))" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: 'hsl(var(--accent))', radius: 4 }} />
            <Bar dataKey="value" name="value" radius={[4, 4, 0, 0]}>
                {freelancerData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={FREELANCER_CHART_COLORS[index % FREELANCER_CHART_COLORS.length]} />
                ))}
                <LabelList dataKey="value" position="top" />
            </Bar>
        </RechartsBarChart>
    </ResponsiveContainer>
);
