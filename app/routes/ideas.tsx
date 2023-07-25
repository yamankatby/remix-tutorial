import {
  Link,
  Outlet,
  useLoaderData,
} from "@remix-run/react";
import { prisma } from "~/db";

export const loader = async () => {
  const ideas = await prisma.idea.findMany({});
  return ideas;
};

export default function Ideas() {
  const ideas = useLoaderData<typeof loader>();
  return (
    <div className="bg-gray-900 min-h-screen">
      <div className="container mx-auto p-6">
        <Link
          to="./new"
          className="bg-blue-500 text-white rounded px-4 py-2"
        >
          Create New Idea
        </Link>

        <ul className="text-white text-lg flex flex-col gap-2 bg-gray-800 rounded p-6 my-6">
          {ideas.map((idea) => (
            <Link
              key={idea.id}
              to={`./${idea.id}`}
            >
              <li>{idea.title}</li>
            </Link>
          ))}
        </ul>

        <Outlet />
      </div>
    </div>
  );
}
