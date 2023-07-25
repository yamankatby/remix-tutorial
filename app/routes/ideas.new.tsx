import {
  ActionArgs,
  redirect,
} from "@remix-run/node";
import { prisma } from "~/db";

export const action = async ({
  request,
}: ActionArgs) => {
  const formData = await request.formData();
  const title = formData.get("title");
  const description = formData.get("description");

  if (
    typeof title !== "string" ||
    typeof description !== "string"
  ) {
    throw new Error("Invalid form data");
  }

  await prisma.idea.create({
    data: {
      title,
      description,
    },
  });

  return redirect("/ideas");
};

export default function NewIdea() {
  return (
    <form
      method="post"
      className="bg-gray-800 text-gray-100 flex flex-col p-6 gap-6 rounded"
    >
      <input
        type="text"
        name="title"
        placeholder="Title"
        className="bg-gray-700 text-white rounded px-4 py-2"
      />
      <textarea
        name="description"
        placeholder="Description"
        rows={5}
        className="bg-gray-700 text-white rounded px-4 py-2"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white rounded px-4 py-2 self-end"
      >
        Create Idea
      </button>
    </form>
  );
}
