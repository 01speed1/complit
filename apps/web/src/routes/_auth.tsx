import { createFileRoute, redirect, Outlet } from "@tanstack/react-router";
import { useGoogleAuth } from "@/components/providers/GoogleAuth.provider";

export const Route = createFileRoute("/_auth")({
    beforeLoad: async ({ context }) => {
        // En una aplicación real, aquí verificaríamos el token.
        // Como el hook useGoogleAuth usa React Context, no está disponible directamente en beforeLoad 
        // a menos que lo pasemos por el contexto del router.
        // Sin embargo, una forma común es verificar el token en localStorage/cookies aquí.

        const token = localStorage.getItem("auth_token");

        if (!token) {
            throw redirect({
                to: "/login",
                search: {
                    // Opcional: guardar la url de retorno
                    redirect: location.href,
                },
            });
        }
    },
    component: AuthLayout,
});

function AuthLayout() {
    const { isAuthenticated } = useGoogleAuth();

    // Doble verificación en render (opcional pero recomendada para UX reactiva)
    if (!isAuthenticated) {
        // Esto podría manejar casos donde el token existe pero es inválido y el provider lo detecta
        // return <Navigate to="/login" />;
        // Por ahora confiamos en beforeLoad y el estado del provider
    }

    return (
        <div className="p-2">
            <div className="flex gap-2 p-2 border-b">
                {/* Aquí podría ir un menú de navegación privado */}
                <span>Private Layout</span>
            </div>
            <Outlet />
        </div>
    );
}
