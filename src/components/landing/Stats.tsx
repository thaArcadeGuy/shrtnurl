import { useEffect, useState } from "react"

interface Stat {
  label: string;
  value: number;
  suffix: string;
  color: string;
}

export default function Stats() {
  const stats: stat[] =[
    { label: "Active Users", value: 15000, suffix: "+", color: "#df2582" },
    { label: "Links Created", value: 250000, suffix: "+", color: "#FFBF00" },
    { label: "QR Codes Generated", value: 50000, suffix: "+", color: "rgb(3, 142, 125)" },
    { label: "Clicks & Scans", value: 1000000, suffix: "+", color: "rgba(17, 121, 191, 1)" }
  ]

  const [counters, setCounters] = useState(stats.map(() => 0))

  return (
    <section className="p6-16 bg-gradient-to-r from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {stats.map((stat, index) => (
            <div key={stat.label} className="">
              <div className="">
                {counters[index].toLocaleString()}{stat.suffix}
              </div>
              <div className="">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}