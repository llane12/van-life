export async function getHostAllVans(hostId) {
    const res = await fetch(`/api/hosts/${hostId}/vans`);
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

export async function getHostVan(hostId, vanId) {
    const res = await fetch(`/api/hosts/${hostId}/vans/${vanId}`);
    if (!res.ok) {
        throw {
            message: "Failed to fetch van details",
            statusText: res.statusText,
            status: res.status
        };
    }
    const data = await res.json();
    if (!data || !data.vans || data.vans.length !== 1) {
        throw {
            message: "Failed to fetch van details",
            statusText: "Van not found",
            status: 401
        };
    }
    return data.vans[0];
}

export async function getHostAllTransactions(hostId) {
    const res = await fetch(`/api/hosts/${hostId}/transactions`);
    if (!res.ok) {
        throw {
            message: "Failed to fetch transactions",
            statusText: res.statusText,
            status: res.status
        };
    }
    const data = await res.json();
    return data.transactions;
}

export async function getHostAllReviews(hostId) {
    const res = await fetch(`/api/hosts/${hostId}/reviews`);
    if (!res.ok) {
        throw {
            message: "Failed to fetch reviews",
            statusText: res.statusText,
            status: res.status
        };
    }
    const data = await res.json();
    return data.reviews;
}
