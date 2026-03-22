import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getTopicBySlug } from "../lib/api";
import { Button } from "../components/Button";
import { Card, CardContent } from "../components/Card";
import { Separator } from "../components/ui/separator";
import { Skeleton } from "../components/ui/skeleton";
import { Alert, AlertDescription } from "../components/ui/alert";

interface Topic {
  id: string;
  title: string;
  slug: string;
  summary: string;
  content: string;
  image: string | null;
  order: number;
  createdAt: string;
}

export function TopicDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const [topic, setTopic] = useState<Topic | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadTopic() {
      if (!slug) {
        setError("Thématique non trouvée");
        return;
      }

      try {
        const response = await getTopicBySlug(slug);
        if (response.success && response.data) {
          setTopic(response.data as Topic);
        } else {
          setError("Impossible de charger la thématique");
        }
      } catch (err) {
        setError("Erreur lors du chargement");
      } finally {
        setIsLoading(false);
      }
    }

    loadTopic();
  }, [slug]);

  if (isLoading) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-6">
        <Skeleton className="h-6 w-32" />
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-6 w-full" />
        <Skeleton className="h-6 w-5/6" />
        <div className="space-y-3 mt-8">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-3/4" />
        </div>
      </div>
    );
  }

  if (error || !topic) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Alert variant="destructive">
          <AlertDescription>{error || "Thématique non trouvée"}</AlertDescription>
        </Alert>
        <Link to="/topics" className="block mt-4">
          <Button>Retour aux thématiques</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <Link to="/topics" className="text-primary hover:underline inline-flex items-center gap-1">
        ← Retour aux thématiques
      </Link>

      <article className="space-y-6">
        <div className="space-y-3">
          <h1 className="text-4xl font-bold">{topic.title}</h1>
          <p className="text-lg text-muted-foreground">{topic.summary}</p>
        </div>

        <Separator />

        <div
          className="prose prose-sm max-w-none text-muted-foreground leading-relaxed"
          dangerouslySetInnerHTML={{ __html: topic.content }}
        />
      </article>

      <Separator />

      <Card className="bg-primary/5 border-primary/10">
        <CardContent className="pt-6 space-y-4">
          <h3 className="text-xl font-bold">Vous avez une contribution ?</h3>
          <p className="text-muted-foreground">
            Participez à ce débat en vous inscrivant et en partageant vos idées.
          </p>
          <Link to="/auth/register">
            <Button className="w-full sm:w-auto">S'inscrire et contribuer</Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  );
}
