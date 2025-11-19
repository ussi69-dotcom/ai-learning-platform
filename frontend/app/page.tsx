import Link from 'next/link'
import { Button } from '@/components/ui/Button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card'
import { GraduationCap, ArrowRight } from 'lucide-react'
import { DefaultService, OpenAPI } from '@/lib/api' 

// Nastavení URL pro komunikaci s backendem (pro lokální vývoj)
OpenAPI.BASE = 'http://localhost:8000'; 

export default async function HomePage() {
  let courses = [];
  let errorMsg = null;

  try {
    // Stáhneme kurzy z backendu
    courses = await DefaultService.readCoursesCoursesGet(0, 100);
  } catch (error) {
    console.error("Chyba při načítání kurzů:", error);
    errorMsg = "Nepodařilo se načíst kurzy. Běží backend na portu 8000?";
  }

  return (
    <div className="flex min-h-screen flex-col bg-white text-slate-900">
      {/* Hero Sekce */}
      <section className="w-full py-12 md:py-24 lg:py-32 bg-slate-50 border-b">
        <div className="container px-4 md:px-6 mx-auto text-center">
          <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl mb-4">
            AI Learning Platform
          </h1>
          <p className="mx-auto max-w-[700px] text-slate-600 md:text-xl mb-8">
            Learning by doing. Postaveno na Next.js 16 + FastAPI.
          </p>
          <div className="space-x-4">
             <Link href="/dashboard">
              <Button size="lg" className='gap-2'>
                Start Learning <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Seznam Kurzů */}
      <section className="w-full py-12 md:py-24 container px-4 mx-auto">
          <h2 className="text-3xl font-bold mb-8">Dostupné Kurzy</h2>
          
          {errorMsg && (
            <div className="p-4 border border-red-200 bg-red-50 text-red-600 rounded-lg mb-6">
              {errorMsg}
            </div>
          )}

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {courses.length > 0 ? (
              courses.map((course) => (
                <Card key={course.id} className="border-2 border-slate-200 hover:border-slate-400 transition-colors">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <GraduationCap className="h-5 w-5" />
                      {course.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4 text-sm min-h-[40px]">
                      {course.description || "Bez popisu"}
                    </p>
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-bold px-2 py-1 bg-slate-100 rounded uppercase tracking-wide">
                        {course.difficulty}
                      </span>
                      <Button variant="outline" size="sm">Start</Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              !errorMsg && (
                <div className="col-span-3 p-12 border-2 border-dashed border-slate-200 rounded-xl text-center text-slate-500">
                  <p>Zatím tu nic není.</p>
                  <p className="text-sm mt-2">Přidej první kurz přes <a href="http://localhost:8000/docs" className="underline text-blue-600" target="_blank">Swagger UI</a>.</p>
                </div>
              )
            )}
          </div>
      </section>
    </div>
  )
}