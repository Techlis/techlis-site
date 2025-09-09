import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { CompanyInfoProps } from "@/types"

export function CompanyInfo({ mission, vision, values }: CompanyInfoProps) {
  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {/* Mission Card */}
      <Card className="group hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-blue-600 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center">
              <span className="text-blue-600 text-lg">🎯</span>
            </div>
            Our Mission
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">{mission}</p>
        </CardContent>
      </Card>

      {/* Vision Card */}
      <Card className="group hover:shadow-xl transition-all duration-300">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-purple-600 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-purple-100 flex items-center justify-center">
              <span className="text-purple-600 text-lg">🔮</span>
            </div>
            Our Vision
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-700 leading-relaxed">{vision}</p>
        </CardContent>
      </Card>

      {/* Values Card */}
      <Card className="group hover:shadow-xl transition-all duration-300 md:col-span-2 lg:col-span-1">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-yellow-600 flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-yellow-100 flex items-center justify-center">
              <span className="text-yellow-600 text-lg">⭐</span>
            </div>
            Our Values
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-3">
            {values.map((value, index) => (
              <li key={index} className="flex items-start gap-2">
                <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 mt-2 flex-shrink-0" />
                <span className="text-gray-700 leading-relaxed">{value}</span>
              </li>
            ))}
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
