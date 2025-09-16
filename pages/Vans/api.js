export async function getAllVans() {
    const res = await fetch("/api/vans");
    if (!res.ok) {
        throw {
            message: "Failed to fetch vans",
            statusText: res.statusText,
            status: res.status
        };
    }
    const data = await res.json();
    return data.vans;
}

export async function getVan(id) {
    const res = await fetch(`/api/vans/${id}`);
    if (!res.ok) {
        throw {
            message: "Failed to fetch van details",
            statusText: res.statusText,
            status: res.status
        };
    }
    const data = await res.json();
    if (!data || !data.vans) {
        throw {
            message: "Failed to fetch van details",
            statusText: "Van not found",
            status: 401
        };
    }
    return data.vans;
}
