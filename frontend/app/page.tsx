import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// Přidali jsme import 'Course' (typ)
import { DefaultService, OpenAPI, Course } from "@/client"; 

// Nastavení URL pro backend
// Server komponenty v Dockeru vidí 'backend', klient (pokud by to běžel tam) vidí 'localhost'
OpenAPI.BASE = process.env.NODE_ENV === 'development' ? "http://backend:8000" : "http://backend:8000";

export default async function HomePage() {
  // 1. OPRAVA TYPU: Explicitně říkáme, že toto je pole objektů 'Course'
  let courses: Course[] = [];
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
             {/* Pokud máme nějaký kurz, tlačítko vede na první lekci prvního kurzu */}
             {courses.length > 0 ? (
                <Link href={`/courses/${courses[0].id}`}>
                  <Button size="lg" className='gap-2'>
                    Start Learning 🚀
                  </Button>
                </Link>
             ) : (
                <Button size="lg" disabled>Loading...</Button>
             )}
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
                <Card key={course.id} className="border-2 border-slate-200 hover:border-primary/50 transition-colors group">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      {/* Odkaz na detail kurzu */}
                      <Link href={`/courses/${course.id}`} className="hover:underline">
                        {course.title}
                      </Link>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-slate-600 mb-4 text-sm min-h-[40px] line-clamp-3">
                      {course.description || "Bez popisu"}
                    </p>
                    <div className="flex justify-between items-center mt-4">
                      {/* Odstranili jsme 'difficulty', v novém modelu není */}
                      <span className="text-xs text-slate-400">ID: {course.id}</span>
                      
                      {/* Odkaz je okolo, tlačítko uvnitř. asChild jsme smazali. */}
                    <Link href={`/courses/${course.id}`}>
                      <Button variant="outline" size="sm">
                         Detail
                       </Button>
                    </Link>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              !errorMsg && (
                <div className="col-span-3 p-12 border-2 border-dashed border-slate-200 rounded-xl text-center text-slate-500">
                  <p>Zatím tu nic není.</p>
                  <p className="text-sm mt-2">Spusť <code>seed.py</code> v backendu.</p>
                </div>
              )
            )}
          </div>
      </section>
    </div>
  )
}