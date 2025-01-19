import slice from "./slice.ts";

export const login = async ({ username, password }: { username: string; password: string }) => {
    try {
        const response = await fetch("http://localhost:3000/src/server/user/users.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'login',
                username,
                password
            }),
        });

        const data = await response.json();

        // Check if the response indicates a successful login or if there's an error
        if (data.status === "error") {
            return { error: data.message };
        } else {
            slice.actions.login({ id: data.id, username: data.username });
            return { user: data };
        }
    } catch (error) {
        console.error('Error:', error);
        return { error: 'An unexpected error occurred.' };
    }
};

export const logout = async () => {
    await fetch("http://localhost:3000/src/server/user/users.php", {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            action: 'logout'
        })
    })
        .then((response) => response.json())
        .then((data) => { slice.actions.logout(); })
        .catch(error => console.error('Error:', error));
}

export const createUser = async ({ username, password }: { username: string; password: string }) => {
    try {
        const response = await fetch("http://localhost:3000/src/server/user/users.php", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                action: 'create',
                username,
                password
            })
        });

        const data = await response.json();

        if (data.status === "success") {
            console.log("User created:", data);
        } else {
            console.error("Error:", data.message);
        }

    } catch (error) {
        console.error("Error:", error);
    }
}