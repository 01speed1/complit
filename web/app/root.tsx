import {
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useRouteError,
  isRouteErrorResponse,
  useLoaderData,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunction } from "@remix-run/node";

import "./tailwind.css";
import ApiClient from "./services/apiClient";
import MainNavBar from "~/layout/MainNavBar";

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
];

export const loader: LoaderFunction = async ({ request }) => {
  const apiClient = new ApiClient(request);

  const isAuthenticated = await apiClient.checkIfAuthenticated();

  return {
    isAuthenticated,
    ENV: {
      authUrl: process.env.API_URL,
    },
  };
};

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>();

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body className="bg-gray-100">
        {children}
        <ScrollRestoration />
        <script
          dangerouslySetInnerHTML={{
            __html: `window.ENV = ${JSON.stringify(data.ENV)}`,
          }}
        />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  const { isAuthenticated } = useLoaderData<{
    isAuthenticated: boolean;
    ENV: {
      authUrl: string;
    };
  }>();

  return (
    <>
      <MainNavBar isAuthenticated={isAuthenticated} />
      <div className="mx-auto max-w-2xl p-4">
        <Outlet />
      </div>
    </>
  );
}
