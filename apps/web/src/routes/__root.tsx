import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtoolsPanel } from "@tanstack/react-router-devtools";
import { TanStackDevtools } from "@tanstack/react-devtools";

// Providers
import { AuthProvider } from "@/components/providers/GoogleAuth.provider";

const Root = () => {
  return (
    <>
      <AuthProvider>
        <Outlet />
        <TanStackDevtools
          config={{
            position: "bottom-right",
          }}
          plugins={[
            {
              name: "Tanstack Router",
              render: <TanStackRouterDevtoolsPanel />,
            },
          ]}
        />
      </AuthProvider>
    </>
  );
};

export const Route = createRootRoute({
  component: Root,
  context: () => {
    // This will be populated by the router context if needed,
    // but for now we are wrapping the app in the provider.
    // To access auth in beforeLoad, we might need to pass it via context,
    // but since context is created at the root, we might need a different approach
    // if we want to use the hook in beforeLoad of child routes.
    // However, for now, let's just wrap the app.
    return {};
  },
});
