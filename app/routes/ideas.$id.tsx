import { LoaderArgs } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "~/db";

export const loader = async ({
  params,
}: LoaderArgs) => {
  const id = Number(params.id);

  if (isNaN(id)) {
    throw new Error("Invalid idea ID");
  }

  const idea = await prisma.idea.findUnique({
    where: { id },
  });

  return idea;
};

export default function IdeaDetails() {
  const idea = useLoaderData<typeof loader>();
  return (
    <div className="bg-gray-800 rounded p-6 text-gray-100">
      <h1 className="text-2xl">{idea?.title}</h1>
      <p>{idea?.description}</p>
      <p className="text-gray-500">
        {new Date(
          idea?.createdAt ?? ""
        ).toLocaleDateString()}
      </p>
    </div>
  );
}
