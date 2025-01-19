import * as React from "react";
import Quill from "quill";
import 'quill/dist/quill.snow.css';
import "./Editor.css"
import { getAllDocuments, editDocument } from "./requests.ts";
import Sidebar from "./components/Sidebar.tsx";
import { useParams } from "react-router-dom";
import CreationModal from "./components/CreationModal.tsx";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store.ts";
import slice from "./slice.ts";
import _ from "lodash";


export default React.memo(() => {
    const { id } = useParams<{ id: string }>();

    const editorRef = React.useRef<HTMLDivElement>(null);
    const quillRef = React.useRef<Quill>(null);

    const dispatch = useDispatch();
    const documents = useSelector((state: RootState) => state.documents.documents);

    const [documentName, setDocumentName] = React.useState<string>("Untitled document");
    const [open, setModalOpen] = React.useState(false);
    const [canCancel, setCanCancel] = React.useState(true);

    const fetchData = React.useCallback(async () => {
        const docs = await getAllDocuments();
        if (_.isEmpty(docs)) {
            setModalOpen(true); // If there is no documents we want to force the user to create a document
            setCanCancel(false);
        }
        dispatch(slice.actions.setDocuments(docs));
    }, [dispatch]);

    // Initialize or update editor content
    React.useEffect(() => {
        if (id) {
            // Check if the document is already loaded
            if (!documents || !documents[id]) {
                fetchData();
            } else {
                setDocumentName(documents[id]?.name || "Untitled document");
                if (quillRef.current && documents[id]?.data) {
                    quillRef.current.setContents(documents[id]?.data);
                }
            }
        }
        if (editorRef.current && !quillRef.current) {
            quillRef.current = new Quill(editorRef.current, {
                theme: "snow",
                modules: {
                    toolbar: [
                        [{ header: [1, 2, false] }],
                        ["bold", "italic", "underline", "strike"],
                        ["blockquote", "code-block"],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        ["link"]
                    ],
                },
            });
        }
    }, [quillRef, editorRef, documents, id, fetchData]);

    const onNameChange = React.useCallback(async (e: React.ChangeEvent<HTMLInputElement>) => {
        setDocumentName(e.target.value);
        if (id) {
            await editDocument({ name: e.target.value, id });
        }
    }, [setDocumentName, id]);

    const onSave = React.useCallback(async () => {
        if (quillRef.current && id) {
            await editDocument({ data: quillRef.current.getContents(), id });
        }
    }, [quillRef, id])

    if (!documents) return null;

    return (
        <div className="editor-layout">
            <CreationModal open={open} setOpen={setModalOpen} canCancel={canCancel} setCanCancel={setCanCancel} />
            <Sidebar documents={documents} setModalOpen={setModalOpen} />
            <div className="main-layout">
                <header>
                    <input type="text" className="documentName" onChange={onNameChange} value={documentName} />
                    <button onClick={onSave}>Save</button>
                </header>
                <div className="container">
                    <div className="editor" ref={editorRef}></div>
                </div>
            </div>
        </div>
    );
})