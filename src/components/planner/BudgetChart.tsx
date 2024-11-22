import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";

interface BudgetChartProps {
  expenses: Array<{
    category: string;
    amount: number;
  }>;
}

const COLORS = ['#8B5CF6', '#D946EF', '#F97316', '#0EA5E9', '#E5DEFF'];

const BudgetChart = ({ expenses }: BudgetChartProps) => {
  // Kategorilere göre harcamaları grupla
  const categoryTotals = expenses.reduce((acc, curr) => {
    const existing = acc.find(item => item.category === curr.category);
    if (existing) {
      existing.value += curr.amount;
    } else {
      acc.push({ category: curr.category, value: curr.amount });
    }
    return acc;
  }, [] as Array<{ category: string; value: number }>);

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={categoryTotals}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            nameKey="category"
            label={({ name, percent }) => 
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
          >
            {categoryTotals.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip 
            formatter={(value: number) => `${value}₺`}
          />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BudgetChart;