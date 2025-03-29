"use client"

import { useEffect, useRef, useState } from "react"
import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

// Mock data for demonstration
const SAMPLE_REGIONS = [
  { id: 1, name: "Downtown", coordinates: [30.7333, 76.7794], risk: 0.8 },
  { id: 2, name: "Riverside", coordinates: [30.7433, 76.7894], risk: 0.9 },
  { id: 3, name: "Highland Park", coordinates: [30.7233, 76.7694], risk: 0.3 },
  { id: 4, name: "Valley View", coordinates: [30.7533, 76.7994], risk: 0.7 },
  { id: 5, name: "Meadowlands", coordinates: [30.7133, 76.7594], risk: 0.5 },
]

export default function FloodMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [selectedRegion, setSelectedRegion] = useState<number | null>(null)
  const [mapLoaded, setMapLoaded] = useState(false)

  useEffect(() => {
    // Load Leaflet library dynamically
    const loadLeaflet = async () => {
      if (typeof window !== "undefined" && !window.L) {
        // Load Leaflet CSS
        const linkEl = document.createElement("link")
        linkEl.rel = "stylesheet"
        linkEl.href = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
        document.head.appendChild(linkEl)

        // Load Leaflet JS
        const script = document.createElement("script")
        script.src = "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        script.async = true
        script.onload = initializeMap
        document.body.appendChild(script)
      } else if (typeof window !== "undefined" && window.L) {
        initializeMap()
      }
    }

    const initializeMap = () => {
      if (!mapRef.current || mapLoaded) return

      const L = window.L
      const map = L.map(mapRef.current).setView([30.7333, 76.7794], 13)

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map)

      // Add risk zones
      SAMPLE_REGIONS.forEach((region) => {
        const riskColor = getRiskColor(region.risk)
        const circle = L.circle(region.coordinates, {
          color: riskColor,
          fillColor: riskColor,
          fillOpacity: 0.5,
          radius: region.risk * 500 + 300,
        }).addTo(map)

        circle.bindPopup(`
          <strong>${region.name}</strong><br>
          Risk Level: ${(region.risk * 100).toFixed(0)}%
        `)

        circle.on("click", () => {
          setSelectedRegion(region.id)
        })
      })

      setMapLoaded(true)
    }

    loadLeaflet()

    return () => {
      // Cleanup if needed
    }
  }, [mapLoaded])

  const getRiskColor = (risk: number): string => {
    if (risk >= 0.8) return "#ef4444" // High risk - red
    if (risk >= 0.6) return "#f97316" // Medium-high risk - orange
    if (risk >= 0.4) return "#eab308" // Medium risk - yellow
    if (risk >= 0.2) return "#22c55e" // Low-medium risk - green
    return "#3b82f6" // Low risk - blue
  }

  const getRiskLabel = (risk: number): string => {
    if (risk >= 0.8) return "Severe"
    if (risk >= 0.6) return "High"
    if (risk >= 0.4) return "Moderate"
    if (risk >= 0.2) return "Low"
    return "Minimal"
  }

  return (
    <div className="relative h-[500px] w-full">
      <div ref={mapRef} className="h-full w-full z-10"></div>

      <div className="absolute bottom-4 left-4 z-20 bg-background/80 backdrop-blur-sm p-3 rounded-md shadow-md">
        <h3 className="text-sm font-medium mb-2">Risk Levels</h3>
        <div className="flex flex-col gap-1">
          {[0.9, 0.7, 0.5, 0.3, 0.1].map((risk) => (
            <div key={risk} className="flex items-center gap-2">
              <div className="w-4 h-4 rounded-full" style={{ backgroundColor: getRiskColor(risk) }}></div>
              <span className="text-xs">{getRiskLabel(risk)}</span>
            </div>
          ))}
        </div>
      </div>

      {selectedRegion && (
        <Card className="absolute top-4 right-4 z-20 w-64 shadow-lg">
          <div className="p-3">
            <div className="flex justify-between items-start mb-2">
              <h3 className="font-medium">{SAMPLE_REGIONS.find((r) => r.id === selectedRegion)?.name}</h3>
              <Badge
                variant={
                  SAMPLE_REGIONS.find((r) => r.id === selectedRegion)?.risk! >= 0.6 ? "destructive" : "secondary"
                }
              >
                {getRiskLabel(SAMPLE_REGIONS.find((r) => r.id === selectedRegion)?.risk || 0)}
              </Badge>
            </div>
            <p className="text-sm text-muted-foreground mb-2">
              Risk Score: {(SAMPLE_REGIONS.find((r) => r.id === selectedRegion)?.risk! * 100).toFixed(0)}%
            </p>
            <button className="text-xs text-primary hover:underline" onClick={() => setSelectedRegion(null)}>
              Close
            </button>
          </div>
        </Card>
      )}
    </div>
  )
}

// Add this to make TypeScript happy with the global L object
declare global {
  interface Window {
    L: any
  }
}

