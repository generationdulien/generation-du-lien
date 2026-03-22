import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getTopics } from "../lib/api.js";
import { Card } from "../components/Card.js";

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
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-gray-600">Chargement...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-error-600">{error}</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="text-4xl font-bold text-gray-900 mb-4">
        Notre programme
      </h1>
      <p className="text-lg text-gray-600 mb-12">
        Découvrez les thématiques clés de notre mouvement et participez au débat.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {topics.map((topic) => (
          <Link key={topic.id} to={`/topics/${topic.slug}`}>
            <Card className="h-full hover:shadow-xl">
              {topic.image && (
                <div className="w-full h-40 bg-gray-200 rounded-lg mb-4">
                  {/* Image placeholder */}
                </div>
              )}
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {topic.title}
              </h2>
              <p className="text-gray-600 line-clamp-3">{topic.summary}</p>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}
