"use client"

import { useEffect, useState } from "react"
import { Card } from "@/components/ui/card"
import {
  Chart,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart"
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  Line,
  LineChart,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"

type DataInsightsProps = {
  type: "historical" | "predictions" | "comparison"
}

// Mock data for demonstration
const historicalData = [
  { month: "Jan", rainfall: 45, floodEvents: 0, risk: 0.2 },
  { month: "Feb", rainfall: 50, floodEvents: 0, risk: 0.3 },
  { month: "Mar", rainfall: 65, floodEvents: 1, risk: 0.4 },
  { month: "Apr", rainfall: 80, floodEvents: 2, risk: 0.6 },
  { month: "May", rainfall: 120, floodEvents: 3, risk: 0.8 },
  { month: "Jun", rainfall: 150, floodEvents: 4, risk: 0.9 },
  { month: "Jul", rainfall: 130, floodEvents: 3, risk: 0.7 },
  { month: "Aug", rainfall: 100, floodEvents: 2, risk: 0.6 },
  { month: "Sep", rainfall: 85, floodEvents: 1, risk: 0.5 },
  { month: "Oct", rainfall: 70, floodEvents: 1, risk: 0.4 },
  { month: "Nov", rainfall: 55, floodEvents: 0, risk: 0.3 },
  { month: "Dec", rainfall: 40, floodEvents: 0, risk: 0.2 },
]

const predictionData = [
  { day: "Today", rainfall: 20, risk: 0.3 },
  { day: "Tomorrow", rainfall: 45, risk: 0.5 },
  { day: "Day 3", rainfall: 80, risk: 0.7 },
  { day: "Day 4", rainfall: 60, risk: 0.6 },
  { day: "Day 5", rainfall: 30, risk: 0.4 },
  { day: "Day 6", rainfall: 15, risk: 0.2 },
  { day: "Day 7", rainfall: 10, risk: 0.1 },
]

const comparisonData = [
  { year: "2018", actual: 0.4, predicted: 0.35 },
  { year: "2019", actual: 0.6, predicted: 0.55 },
  { year: "2020", actual: 0.8, predicted: 0.75 },
  { year: "2021", actual: 0.5, predicted: 0.6 },
  { year: "2022", actual: 0.7, predicted: 0.65 },
  { year: "2023", actual: 0.9, predicted: 0.85 },
]

export default function DataInsights({ type }: DataInsightsProps) {
  const [chartData, setChartData] = useState<any[]>([])

  useEffect(() => {
    // Simulate data loading
    setTimeout(() => {
      if (type === "historical") {
        setChartData(historicalData)
      } else if (type === "predictions") {
        setChartData(predictionData)
      } else {
        setChartData(comparisonData)
      }
    }, 500)
  }, [type])

  if (chartData.length === 0) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-pulse text-muted-foreground">Loading data...</div>
      </div>
    )
  }

  if (type === "historical") {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-2">Rainfall & Flood Events (Historical)</h3>
          <div className="h-64">
            <ChartContainer>
              <Chart>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis yAxisId="left" orientation="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Bar yAxisId="left" dataKey="rainfall" name="Rainfall (mm)" fill="#3b82f6" />
                    <Bar yAxisId="right" dataKey="floodEvents" name="Flood Events" fill="#ef4444" />
                  </BarChart>
                </ResponsiveContainer>
              </Chart>
              <ChartTooltip>
                <ChartTooltipContent />
              </ChartTooltip>
              <ChartLegend>
                <ChartLegendContent />
              </ChartLegend>
            </ChartContainer>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium mb-2">Historical Flood Risk</h3>
          <div className="h-64">
            <ChartContainer>
              <Chart>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 1]} tickFormatter={(value) => `${value * 100}%`} />
                    <Tooltip formatter={(value) => [`${(Number(value) * 100).toFixed(0)}%`, "Risk Level"]} />
                    <Area
                      type="monotone"
                      dataKey="risk"
                      name="Flood Risk"
                      stroke="#f97316"
                      fill="#f97316"
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Chart>
              <ChartTooltip>
                <ChartTooltipContent />
              </ChartTooltip>
            </ChartContainer>
          </div>
        </div>
      </div>
    )
  }

  if (type === "predictions") {
    return (
      <div className="space-y-6">
        <div>
          <h3 className="text-sm font-medium mb-2">7-Day Forecast</h3>
          <div className="h-64">
            <ChartContainer>
              <Chart>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis yAxisId="left" orientation="left" />
                    <YAxis
                      yAxisId="right"
                      orientation="right"
                      domain={[0, 1]}
                      tickFormatter={(value) => `${value * 100}%`}
                    />
                    <Tooltip />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="rainfall"
                      name="Rainfall (mm)"
                      stroke="#3b82f6"
                      activeDot={{ r: 8 }}
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="risk"
                      name="Flood Risk"
                      stroke="#ef4444"
                      formatter={(value) => `${(Number(value) * 100).toFixed(0)}%`}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Chart>
              <ChartTooltip>
                <ChartTooltipContent />
              </ChartTooltip>
              <ChartLegend>
                <ChartLegendContent />
              </ChartLegend>
            </ChartContainer>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {predictionData.slice(0, 3).map((day) => (
            <Card key={day.day} className="p-3">
              <h4 className="font-medium text-sm">{day.day}</h4>
              <div className="flex justify-between items-center mt-2">
                <div>
                  <p className="text-xs text-muted-foreground">Rainfall</p>
                  <p className="font-medium">{day.rainfall} mm</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Risk</p>
                  <p className="font-medium">{(day.risk * 100).toFixed(0)}%</p>
                </div>
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: day.risk >= 0.6 ? "#ef4444" : day.risk >= 0.4 ? "#f97316" : "#22c55e",
                  }}
                ></div>
              </div>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div>
      <h3 className="text-sm font-medium mb-2">Model Accuracy: Predicted vs Actual</h3>
      <div className="h-64">
        <ChartContainer>
          <Chart>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="year" />
                <YAxis domain={[0, 1]} tickFormatter={(value) => `${value * 100}%`} />
                <Tooltip formatter={(value) => [`${(Number(value) * 100).toFixed(0)}%`, ""]} />
                <Legend />
                <Bar dataKey="actual" name="Actual Risk" fill="#3b82f6" />
                <Bar dataKey="predicted" name="Predicted Risk" fill="#22c55e" />
              </BarChart>
            </ResponsiveContainer>
          </Chart>
          <ChartTooltip>
            <ChartTooltipContent />
          </ChartTooltip>
          <ChartLegend>
            <ChartLegendContent />
          </ChartLegend>
        </ChartContainer>
      </div>

      <div className="mt-4 p-3 bg-muted/50 rounded-md">
        <h4 className="text-sm font-medium mb-1">Model Performance</h4>
        <p className="text-sm text-muted-foreground">
          The AI model has achieved an average accuracy of 92% in predicting flood risks over the past 6 years, with a
          mean absolute error of 0.05 (5%).
        </p>
      </div>
    </div>
  )
}

