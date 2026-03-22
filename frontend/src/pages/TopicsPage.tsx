import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTopics } from "../lib/api";
import { Card, CardContent } from "../components/Card";
import { Skeleton } from "../components/ui/skeleton";
import { Alert, AlertDescription } from "../components/ui/alert";

interface Topic {
  id: string;
  title: string;
  slug: string;
  summary: string;
  image: string | null;
  order: number;
}

export function TopicsPage() {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTopics() {
      try {
        const response = await getTopics();
        if (response.success && response.data) {
          setTopics(response.data as Topic[]);
        } else {
          setError("Impossible de charger les thématiques");
        }
      } catch (err) {
        setError("Erreur lors du chargement");
      } finally {
        setIsLoading(false);
      }
    }

    loadTopics();
  }, []);

  if (isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-4xl font-bold mb-4">Notre programme</h1>
        <p className="text-lg text-muted-foreground mb-12">
          Découvrez les thématiques clés de notre mouvement et participez au débat.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <Card key={i}>
              <CardContent className="pt-6 space-y-4">
                <Skeleton className="h-40 w-full" />
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold mb-4">Notre programme</h1>
      <p className="text-lg text-muted-foreground mb-12">
        Découvrez les thématiques clés de notre mouvement et participez au débat.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {topics.map((topic) => (
          <Link key={topic.id} to={`/topics/${topic.slug}`}>
            <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="pt-6 space-y-4">
                {topic.image && (
                  <div className="w-full h-40 bg-muted rounded-lg" />
                )}
                <div className="space-y-2">
                  <h2 className="text-xl font-bold line-clamp-2">{topic.title}</h2>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {topic.summary}
                  </p>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
