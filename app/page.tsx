import { Suspense } from "react"
import FloodMap from "@/components/flood-map"
import PredictionPanel from "@/components/prediction-panel"
import DataInsights from "@/components/data-insights"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col">
      <header className="bg-primary text-primary-foreground p-4 shadow-md">
        <div className="container mx-auto">
          <h1 className="text-2xl font-bold flex items-center">
            <span className="mr-2">🌊</span> FloodSight
            <span className="text-sm ml-2 opacity-75">AI-Powered Flood Risk Prediction</span>
          </h1>
        </div>
      </header>

      <div className="container mx-auto p-4 flex-1 flex flex-col lg:flex-row gap-4">
        <div className="lg:w-2/3 flex flex-col gap-4">
          <Card className="flex-1">
            <CardHeader className="pb-2">
              <CardTitle>Flood Risk Visualization</CardTitle>
              <CardDescription>Interactive map showing predicted flood risk zones</CardDescription>
            </CardHeader>
            <CardContent className="p-0">
              <Suspense fallback={<Skeleton className="h-[500px] w-full" />}>
                <FloodMap />
              </Suspense>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle>Data Insights</CardTitle>
              <CardDescription>Analysis of historical flood data and current predictions</CardDescription>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="historical">
                <TabsList className="mb-4">
                  <TabsTrigger value="historical">Historical Data</TabsTrigger>
                  <TabsTrigger value="predictions">Predictions</TabsTrigger>
                  <TabsTrigger value="comparison">Comparison</TabsTrigger>
                </TabsList>
                <TabsContent value="historical">
                  <DataInsights type="historical" />
                </TabsContent>
                <TabsContent value="predictions">
                  <DataInsights type="predictions" />
                </TabsContent>
                <TabsContent value="comparison">
                  <DataInsights type="comparison" />
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        <div className="lg:w-1/3">
          <Card className="h-full">
            <CardHeader>
              <CardTitle>Prediction Controls</CardTitle>
              <CardDescription>Adjust parameters to simulate different scenarios</CardDescription>
            </CardHeader>
            <CardContent>
              <PredictionPanel />
            </CardContent>
          </Card>
        </div>
      </div>
    </main>
  )
}

