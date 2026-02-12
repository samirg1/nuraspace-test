import { useNavigate } from "react-router";

export default function Login() {
    const navigate = useNavigate();

    function handleSubmit(e: React.SubmitEvent<HTMLFormElement>) {
        e.preventDefault();
        // TODO: real auth later
        navigate("/home");
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-xl shadow-md w-80">
                <h1 className="text-2xl font-bold text-center mb-6 text-black">
                    Nuraspace Login
                </h1>
                <p className="text-center text-gray-600 mb-6">Please enter your credentials to continue</p>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <input
                        className="w-full border rounded px-3 py-2 border-black text-black"
                        placeholder="Username"
                    />
                    <input
                        className="w-full border rounded px-3 py-2 border-black text-black"
                        type="password"
                        placeholder="Password"
                    />

                    <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
}
