import { Injectable } from '@nestjs/common'
import { tool } from 'ai'
import z from 'zod'

@Injectable()
export class ToolsService {
  getWeatherTool() {
    return tool({
      description: 'Get the current weather for a given location',
      inputSchema: z.object({
        location: z.string().describe('The city name')
      }),
      execute: ({ location }) => {
        const temps = [68, 72, 75, 80, 85]
        const conditions = ['sunny', 'cloudy', 'rainy', 'windy', 'snowy']
        return {
          location,
          temperature: temps[Math.floor(Math.random() * temps.length)],
          condition: conditions[Math.floor(Math.random() * conditions.length)],
          humidity: Math.floor(Math.random() * 40) + 40
        }
      }
    })
  }
  getAllTools() {
    return {
      getWeather: this.getWeatherTool()
    }
  }
}
