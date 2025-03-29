"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { predictFloodRisk } from "@/lib/prediction-model"
import { AlertCircle, Info } from "lucide-react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export default function PredictionPanel() {
  const [rainfall, setRainfall] = useState<number>(50)
  const [duration, setDuration] = useState<number>(24)
  const [soilSaturation, setSoilSaturation] = useState<number>(30)
  const [riverLevel, setRiverLevel] = useState<number>(40)
  const [useHistorical, setUseHistorical] = useState<boolean>(true)
  const [predictionResult, setPredictionResult] = useState<number | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handlePredict = async () => {
    setIsLoading(true)

    // Simulate API call delay
    setTimeout(() => {
      const result = predictFloodRisk({
        rainfall,
        duration,
        soilSaturation,
        riverLevel,
        useHistorical,
      })

      setPredictionResult(result)
      setIsLoading(false)
    }, 1500)
  }

  const getRiskLevel = (risk: number) => {
    if (risk >= 0.8) return { label: "Severe", color: "destructive" }
    if (risk >= 0.6) return { label: "High", color: "destructive" }
    if (risk >= 0.4) return { label: "Moderate", color: "warning" }
    if (risk >= 0.2) return { label: "Low", color: "secondary" }
    return { label: "Minimal", color: "secondary" }
  }

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="rainfall">Rainfall (mm)</Label>
            <span className="text-sm text-muted-foreground">{rainfall} mm</span>
          </div>
          <Slider
            id="rainfall"
            min={0}
            max={200}
            step={1}
            value={[rainfall]}
            onValueChange={(value) => setRainfall(value[0])}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Light</span>
            <span>Moderate</span>
            <span>Heavy</span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="duration">Duration (hours)</Label>
            <span className="text-sm text-muted-foreground">{duration} hrs</span>
          </div>
          <Slider
            id="duration"
            min={1}
            max={72}
            step={1}
            value={[duration]}
            onValueChange={(value) => setDuration(value[0])}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-1">
              <Label htmlFor="soil">Soil Saturation</Label>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="h-3.5 w-3.5 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="w-[200px] text-xs">
                      Soil saturation affects how much additional water the ground can absorb. Higher values indicate
                      more saturated soil.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <span className="text-sm text-muted-foreground">{soilSaturation}%</span>
          </div>
          <Slider
            id="soil"
            min={0}
            max={100}
            step={1}
            value={[soilSaturation]}
            onValueChange={(value) => setSoilSaturation(value[0])}
          />
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <Label htmlFor="river">River Level</Label>
            <span className="text-sm text-muted-foreground">{riverLevel}%</span>
          </div>
          <Slider
            id="river"
            min={0}
            max={100}
            step={1}
            value={[riverLevel]}
            onValueChange={(value) => setRiverLevel(value[0])}
          />
          <div className="flex justify-between text-xs text-muted-foreground">
            <span>Low</span>
            <span>Normal</span>
            <span>High</span>
          </div>
        </div>

        <div className="flex items-center space-x-2 pt-2">
          <Switch id="historical" checked={useHistorical} onCheckedChange={setUseHistorical} />
          <Label htmlFor="historical">Include historical data</Label>
        </div>
      </div>

      <Separator />

      <Button onClick={handlePredict} className="w-full" disabled={isLoading}>
        {isLoading ? "Calculating..." : "Run Prediction"}
      </Button>

      {predictionResult !== null && (
        <div className="mt-4 p-4 border rounded-md bg-muted/50">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-medium">Prediction Result</h3>
            <Badge variant={getRiskLevel(predictionResult).color as any}>{getRiskLevel(predictionResult).label}</Badge>
          </div>
          <div className="w-full bg-secondary h-2 rounded-full overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-500 ease-out"
              style={{ width: `${predictionResult * 100}%` }}
            ></div>
          </div>
          <p className="text-sm mt-2 flex items-center gap-1">
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
            <span>
              {predictionResult >= 0.6
                ? "Immediate action recommended"
                : predictionResult >= 0.4
                  ? "Monitor situation closely"
                  : "Low risk detected"}
            </span>
          </p>
        </div>
      )}
    </div>
  )
}

