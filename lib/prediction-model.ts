// This is a simplified prediction model for demonstration purposes
// In a real application, you would use a more sophisticated model
// trained on actual historical data

type PredictionInput = {
  rainfall: number
  duration: number
  soilSaturation: number
  riverLevel: number
  useHistorical: boolean
}

export function predictFloodRisk(input: PredictionInput): number {
  // Normalize inputs to 0-1 range
  const normalizedRainfall = Math.min(input.rainfall / 200, 1)
  const normalizedDuration = Math.min(input.duration / 72, 1)
  const normalizedSoil = input.soilSaturation / 100
  const normalizedRiver = input.riverLevel / 100

  // Simple weighted model
  // In a real application, this would be a trained ML model
  let riskScore = normalizedRainfall * 0.4 + normalizedDuration * 0.2 + normalizedSoil * 0.2 + normalizedRiver * 0.2

  // Add some randomness to simulate real-world variability
  if (input.useHistorical) {
    // Historical data tends to make predictions more accurate
    riskScore = riskScore * 0.9 + Math.random() * 0.1
  } else {
    // More variability without historical data
    riskScore = riskScore * 0.7 + Math.random() * 0.3
  }

  // Ensure the risk score is between 0 and 1
  return Math.max(0, Math.min(1, riskScore))
}

