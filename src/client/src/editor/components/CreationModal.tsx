import { Modal } from "@mui/material";
import * as React from "react";
import { createDocument } from "../requests.ts";
import "./CreationModal.css";


export default React.memo(({ open, setOpen, canCancel, setCanCancel }: { open: boolean; setOpen: React.Dispatch<React.SetStateAction<boolean>>; canCancel: boolean; setCanCancel: React.Dispatch<React.SetStateAction<boolean>>; }) => {
    const [name, setName] = React.useState("");

    const handleClose = React.useCallback(async () => {
        // if (reason === "backdropClick") return; // Prevent closing on backdrop click
        await createDocument(name);
        setOpen(false);
        setName("");
        window.location.reload(); // Refresh the document list so that the created document appears
    }, [name, setName, setOpen]);

    const onChange = React.useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        setName(e.target.value);
    }, [setName])

    const onCancel = React.useCallback(() => {
        setOpen(false);
        setName("");
    }, [setOpen, setName])

    return (
        <div>
            <Modal
                open={open}
                onClose={(event, reason) => {
                    if (reason === "backdropClick") return; // Prevent closing on backdrop click
                    handleClose();
                }}
            >
                <div className="modal">
                    <input type="text" placeholder="Enter the documents name" value={name} onChange={onChange} />
                    <div className="buttonsContainer">
                        <button onClick={handleClose}>Save</button>
                        {canCancel && <button onClick={onCancel}>Cancel</button>}
                    </div>
                </div>
            </Modal>
        </div>
    );
})