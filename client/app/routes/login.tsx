import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Spinner } from "~/components/Spinner";
import { login } from "~/server/login";
import { useAuthentication } from "~/state/authentication";
import { useLoader } from "~/state/loading";

export default function Login() {
    const navigate = useNavigate();
    const user = useAuthentication((state) => state.user);
    const setUser = useAuthentication((state) => state.setUser);
    const loaderValue = useLoader((state) => state.value);
    const setLoading = useLoader((state) => state.set);
    const stopLoading = useLoader((state) => state.stop);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (user) navigate("/home");
    }, [user]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setError(null);
        if (!username || !password) return;

        setLoading("Logging in...");
        try {
            const user = await login(username, password);
            setUser(user);
        } catch (error) {
            console.error("Login failed:", error);
            setError(error instanceof Error ? error.message : "An unknown error occurred");
        } finally {
            stopLoading();
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-md w-80">
                <h1 className="text-2xl font-bold text-center mb-6 text-black">
                    Nuraspace Login
                </h1>
                <p className="text-center text-gray-600 mb-6">
                    Please enter your credentials to continue
                </p>
                {error && <p className="text-red-500 text-center mb-6">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        className="w-full border rounded px-3 py-2 border-black text-black"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <input
                        className="w-full border rounded px-3 py-2 border-black text-black"
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <button
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-400"
                        disabled={!username || !password}
                    >
                        <span className="inline-flex items-center gap-2">
                            Login {loaderValue && <Spinner />}
                        </span>
                    </button>
                </form>
            </div>
        </div>
    );
}
