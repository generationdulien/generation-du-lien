import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getTopicBySlug } from "../lib/api.js";
import { Button } from "../components/Button.js";

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
      <div className="flex justify-center items-center min-h-screen">
        <p>Chargement...</p>
      </div>
    );
  }

  if (error || !topic) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div>
          <p className="text-error-600 mb-4">{error || "Thématique non trouvée"}</p>
          <Link to="/topics">
            <Button>Retour aux thématiques</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link to="/topics" className="text-primary-600 hover:text-primary-700 mb-6 inline-block">
        ← Retour aux thématiques
      </Link>

      <article className="prose prose-lg max-w-none">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">{topic.title}</h1>
        <p className="text-xl text-gray-600 mb-12">{topic.summary}</p>

        <div className="prose prose-lg max-w-none">
          {/* Render markdown content */}
          <div
            className="text-gray-700 whitespace-pre-wrap"
            dangerouslySetInnerHTML={{ __html: topic.content }}
          />
        </div>
      </article>

      <div className="mt-12 p-6 bg-primary-50 rounded-lg">
        <h3 className="text-xl font-bold text-gray-900 mb-4">
          Vous avez une contribution ?
        </h3>
        <p className="text-gray-600 mb-4">
          Participez à ce débat en vous inscrivant et en partageant vos idées.
        </p>
        <Link to="/auth/register">
          <Button>S'inscrire et contribuer</Button>
        </Link>
      </div>
    </div>
  );
}
