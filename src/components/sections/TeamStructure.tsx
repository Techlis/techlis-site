import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import type { TeamStructureProps } from "@/types"

export function TeamStructure({ teamInfo }: TeamStructureProps) {
  return (
    <div className="space-y-8">
      {/* Section Header */}
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">
          Our Global Team
        </h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          We combine the best of both worlds with our hybrid team structure,
          delivering 24/7 support and world-class expertise across all time
          zones.
        </p>
      </div>

      {/* Team Cards Grid */}
      <div className="grid gap-8 md:grid-cols-2">
        {/* Onshore Team */}
        <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-blue-200">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-blue-600 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                <span className="text-blue-600 text-xl">🏢</span>
              </div>
              Onshore Team
              <span className="ml-auto bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-sm font-medium">
                {teamInfo.onshoreTeam.size} Members
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              {teamInfo.onshoreTeam.description}
            </p>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">
                Core Expertise:
              </h4>
              <div className="grid gap-2">
                {teamInfo.onshoreTeam.expertise.map((skill, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-blue-600" />
                    <span className="text-gray-700">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span>Business Hours: 9 AM - 6 PM PST/EST</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Offshore Team */}
        <Card className="group hover:shadow-xl transition-all duration-300 border-2 hover:border-purple-200">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-purple-600 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                <span className="text-purple-600 text-xl">🌏</span>
              </div>
              Offshore Team
              <span className="ml-auto bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-sm font-medium">
                {teamInfo.offshoreTeam.size} Members
              </span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-700 leading-relaxed">
              {teamInfo.offshoreTeam.description}
            </p>

            <div>
              <h4 className="font-semibold text-gray-900 mb-3">
                Core Expertise:
              </h4>
              <div className="grid gap-2">
                {teamInfo.offshoreTeam.expertise.map((skill, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-purple-600" />
                    <span className="text-gray-700">{skill}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                <span>24/7 Support & Development</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Team Stats */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-3xl font-bold text-blue-600">
              {teamInfo.onshoreTeam.size + teamInfo.offshoreTeam.size}
            </div>
            <div className="text-sm text-gray-600 font-medium">
              Total Team Members
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-purple-600">24/7</div>
            <div className="text-sm text-gray-600 font-medium">
              Support Coverage
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-yellow-600">3</div>
            <div className="text-sm text-gray-600 font-medium">
              Global Locations
            </div>
          </div>
          <div>
            <div className="text-3xl font-bold text-green-600">5+</div>
            <div className="text-sm text-gray-600 font-medium">
              Years Average Experience
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
