import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type {
  LinksFunction,
  LoaderFunction,
  MetaFunction,
} from "@remix-run/node";

import "./tailwind.css";
import ApiClient from "./services/apiClient";
import MainNavBar from "~/layout/MainNavBar";

export const meta: MetaFunction = () => {
  return [
    {
      title: "Complit",
      description: "Complit is a simple app to manage your tasks",
    },
    { charSet: "utf-8" },
    { name: "viewport", content: "width=device-width, initial-scale=1" },
  ];
};

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  {
    rel: "stylesheet",
    href: "https://cdn.jsdelivr.net/npm/remixicon@4.5.0/fonts/remixicon.css",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Caveat:wght@400..700&display=swap",
  },
];

export const loader: LoaderFunction = async ({ request }) => {
  const apiClient = new ApiClient(request);

  const isAuthenticated = await apiClient.checkIfAuthenticated();

  return {
    isAuthenticated,
  };
};

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body className="bg-gray-100">
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { isAuthenticated } = useLoaderData<typeof loader>();

  return (
    <>
      <MainNavBar isAuthenticated={isAuthenticated} />
      <div className="mx-auto max-w-2xl p-4">
        <Outlet />
      </div>
    </>
  );
}
