import { useEffect, useState } from "react"

interface Stat {
  label: string;
  value: number;
  suffix: string;
  color: string;
}

export default function Stats() {
  const stats: Stat[] =[
    { label: "Active Users", value: 15000, suffix: "+", color: "#df2582" },
    { label: "Links Created", value: 250000, suffix: "+", color: "#FFBF00" },
    { label: "QR Codes Generated", value: 50000, suffix: "+", color: "rgb(3, 142, 125)" },
    { label: "Clicks & Scans", value: 1000000, suffix: "+", color: "rgba(17, 121, 191, 1)" }
  ]

  const [counters, setCounters] = useState(stats.map(() => 0))

  useEffect(() => {
    const intervals = stats.map((stat, index) => {
      const duration = 2000
      const steps = 60
      const increment = stat.value / steps
      let current = 0

      const interval = setInterval(() => {
        current += increment
        if (current >= stat.value) {
          setCounters(prev => {
            const newCounters = [...prev]
            newCounters[index] = stat.value
            return newCounters
          })
          clearInterval(interval)
        } else {
          setCounters(prev => {
            const newCounters = [...prev]
            newCounters[index] = Math.floor(current)
            return newCounters
          })
        }
      }, duration / steps)

      return interval
    })

    return () => intervals.forEach(interval => clearInterval(interval))
  }, [])

  return (
    <section className="p6-16 bg-gradient-to-r from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div key={stat.label} className="text-center p-6 bg-white shadow-sm hover:shadow-md transition">
              <div 
                className="text-3xl md:text-4xl font-bold mb-2"
                style={{ color: stat.color }}
              >
                {counters[index].toLocaleString()}{stat.suffix}
              </div>
              <div className="text-gray-600 text-sm md:text-base">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}