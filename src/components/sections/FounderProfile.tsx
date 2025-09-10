import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { FounderProfileProps } from "@/types"

export function FounderProfile({ founder }: FounderProfileProps) {
  return (
    <Card className="group hover:shadow-xl transition-all duration-300">
      <CardHeader>
        <CardTitle className="text-2xl font-bold text-gray-900 flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
            <span className="text-white text-xl">👨‍💼</span>
          </div>
          Leadership
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col md:flex-row gap-6">
          {/* Founder Image */}
          <div className="flex-shrink-0">
            <div className="w-32 h-32 md:w-40 md:h-40 rounded-xl bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center border-4 border-white shadow-lg">
              {founder.image ? (
                <img
                  src={founder.image}
                  alt={founder.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              ) : (
                <div className="text-6xl text-gray-400">👤</div>
              )}
            </div>
          </div>

          {/* Founder Info */}
          <div className="flex-1 space-y-4">
            <div>
              <h3 className="text-2xl font-bold text-gray-900">
                {founder.name}
              </h3>
              <p className="text-lg text-blue-600 font-medium">
                {founder.title}
              </p>
            </div>

            <div className="prose prose-gray max-w-none">
              <p className="text-gray-700 leading-relaxed">{founder.bio}</p>
            </div>

            {/* Professional Highlights */}
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                15+ Years Experience
              </span>
              <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm font-medium">
                AI Specialist
              </span>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm font-medium">
                Enterprise Solutions
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
