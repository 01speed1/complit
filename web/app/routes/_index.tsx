import { useLoaderData } from "@remix-run/react";

export const loader = async () => {
  return {
    authUrl: process.env.EXTERNAL_API_URL,
  };
};

export default function Index() {
  const { authUrl } = useLoaderData<typeof loader>();
  return (
    <>
      <div className="min-h-screen bg-gradient-to-r from-orange-500 to-amber-600 flex flex-col items-center justify-center p-8">
        <h1 className="font-righteous text-[6rem] font-bold text-white mb-8">
          Complit
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 w-full max-w-3xl">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-2">Description</h2>
            <p className="text-gray-700">
              Complit is an application designed to help save and track
              projects.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-2">Objective</h2>
            <p className="text-gray-700">
              Create projects easily and creatively, adding details and progress
              simply.
            </p>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-2">Features</h2>
            <ul className="text-gray-700 list-disc list-inside">
              <li>Project creation and management</li>
              <li>Attractive and cross-platform interface</li>
              <li>Add details and update progress</li>
            </ul>
          </div>
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-bold mb-2">Usage</h2>
            <p className="text-gray-700">
              Follow the installation instructions and quickly start creating
              and managing your projects.
            </p>
          </div>
        </div>
        <p className="text-white text-center mb-4">
          Manage your projects efficiently and creatively with{" "}
          <span className="font-semibold">Complit</span>.
        </p>
        <a
          href={`${authUrl}/auth/google`}
          className="px-6 py-3 bg-white text-orange-600 font-bold rounded-full shadow hover:bg-indigo-50 transition"
        >
          SignUp / LogIn with Google
        </a>
      </div>
    </>
  );
}
