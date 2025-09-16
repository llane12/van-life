export async function loginUser(credentials) {
    const res = await fetch("/api/login", {
        method: "POST",
        body: JSON.stringify(credentials),
        headers: {
            "Content-Type": "application/json",
        },
    });
    if (!res.ok) {
        throw {
            message: "Failed to login",
            statusText: res.statusText,
            status: res.status
        };
    }
    const data = await res.json();
    return data;
}
