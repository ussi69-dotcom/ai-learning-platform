import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

// Pomocná funkce pro fetch dat (v reálu by byla v API klientovi)
async function getCourse(id: string) {
  const res = await fetch(`http://backend:8000/courses/${id}`, {
    cache: "no-store", // Server Component vždy čerstvá data
  });
  if (!res.ok) return undefined;
  return res.json();
}

async function getLessons(courseId: string) {
  // Pozn: Zatím nemáme speciální endpoint pro lekce kurzu,
  // tak zkusíme trik: stáhneme všechny a vyfiltrujeme (pro MVP stačí),
  // nebo pokud backend vrací lekce uvnitř kurzu, použijeme to.
  // Pro teď: Předpokládáme, že endpoint /courses/{id} vrátí i pole lekcí (pokud je relationship nastavená),
  // nebo si pro jednoduchost stáhneme lessons zvlášť.
  
  // Zkusíme fetchovat endpoint lessons, pokud existuje filtr, jinak dummy
  const res = await fetch(`http://backend:8000/lessons/`, { cache: "no-store" });
  if (!res.ok) return [];
  const allLessons = await res.json();
  // Filter na klientovi (pro MVP ok, později přesuneme na BE query)
  return allLessons.filter((l: any) => l.course_id === parseInt(courseId)).sort((a:any, b:any) => a.order - b.order);
}

export default async function CoursePage({ params }: { params: Promise<{ courseId: string }> }) {
  const { courseId } = await params;
  
  // Paralelní fetch dat
  const courseData = getCourse(courseId);
  const lessonsData = getLessons(courseId);
  const [course, lessons] = await Promise.all([courseData, lessonsData]);

  if (!course) {
    return <div className="p-12 text-center">Kurz nenalezen 😢</div>;
  }

  return (
    <div className="container mx-auto py-12 px-4 max-w-4xl">
      {/* Hlavička */}
      <div className="mb-12 text-center space-y-6">
        <h1 className="text-4xl font-bold tracking-tight">{course.title}</h1>
        <p className="text-xl text-muted-foreground">{course.description}</p>
        
   <div className="flex justify-center gap-4">
          {/* Tlačítko 1: Začít studovat */}
          <Link href={`/courses/${courseId}/lessons/${lessons[0]?.id || 1}`}>
            <Button size="lg">
              Začít studovat 🚀
            </Button>
          </Link>

          {/* Tlačítko 2: Zpět na přehled */}
          <Link href="/">
            <Button variant="outline" size="lg">
              Zpět na přehled
            </Button>
          </Link>
        </div>
        </div>
      {/* Seznam lekcí */}
      <div className="space-y-4">
        <h2 className="text-2xl font-semibold mb-6">Osnova kurzu</h2>
        {lessons.length === 0 ? (
          <p className="text-muted-foreground">Zatím žádné lekce.</p>
        ) : (
          lessons.map((lesson: any) => (
            <Card key={lesson.id} className="group hover:border-primary/50 transition-colors">
              <Link href={`/courses/${courseId}/lessons/${lesson.id}`} className="flex items-center p-6">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center font-bold mr-6 group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  {lesson.order}
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {lesson.title}
                  </h3>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {lesson.description}
                  </p>
                </div>
                <div className="text-sm text-muted-foreground font-mono">
                   Start &rarr;
                </div>
              </Link>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}