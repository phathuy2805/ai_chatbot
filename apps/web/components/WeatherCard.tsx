interface WeatherCardProps {
    data: WeatherData
}

interface WeatherData {
    location: string
    temperature: number
    condition: string
    humidity: string
}

export function WeatherCard({ data }: WeatherCardProps) {
    const getWeatherIcon = (condition: string) => {
        switch (condition.toLowerCase()) {
            case 'sunny':
                return '☀️'
            case 'cloudy':
                return '☁️'
            case 'rainy':
                return '🌧️'
            case 'windy':
                return '💨'
            case 'snowy':
                return '❄️'
            default:
                return '🌈'
        }
    }

    return (
        <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg p-4 text-white shadow-lg">
            <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-semibold">{data.location}</h3>
                <span className="text-3xl">
                    {getWeatherIcon(data.condition)}
                </span>
            </div>
            <div className="flex items-baseline gap-2 mb-2">
                <span className="text-4xl font-bold">{data.temperature}</span>
                <span className="text-sm opacity-90">F</span>
            </div>
            <div className="text-sm opacity-90 capitalize mb-3">
                Condition: {data.condition}
            </div>
            <div className="flex items-center gap-2 text-sm opacity-90">
                <span>Humidity: {data.humidity}</span>
                <span className="font-semibold">{data.humidity}</span>
            </div>
        </div>
    )
}
