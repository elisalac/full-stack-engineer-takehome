import { IDocument } from "./model.ts"
import slice from "./slice.ts";

export const createDocument = async (name: string) => {
    console.log(JSON.stringify({ name }));
    try {
        const response = await fetch("http://localhost:3000/src/server/editor/api.php", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ name }),
        });

        const result: IDocument = await response.json();
        slice.actions.addDocument(result);
        console.log("Server Response:", result);
    } catch (error) {
        console.error("Error sending data to API:", error);
    }
};

export const editDocument = async ({ data, name, id }: Partial<IDocument>) => {
    try {
        await fetch('http://localhost:3000/src/server/editor/api.php', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                id,
                data,
                name,
            }),
        })

        if (id) slice.actions.updateDocument({ id, name, data });
    } catch (error) {
        console.error('Error:', error);
    }
}

export const deleteDocument = async (id: string) => {
    try {
        const response = await fetch("http://localhost:3000/src/server/editor/api.php", {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ id }),  // Pass the ID of the document to delete
        });

        const result = await response.json();
        slice.actions.deleteDocument(id);
        console.log("Server Response:", result);
        return result;
    } catch (error) {
        console.error("Error sending data to API:", error);
    }
};

export const getAllDocuments = async () => {
    try {
        const response = await fetch("http://localhost:3000/src/server/editor/api.php?get_all=true", {
            method: 'GET',
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            const errorData = await response.json();
            console.error('Error:', errorData);
        }
    } catch (error) {
        console.error('Network Error:', error);
    }
};