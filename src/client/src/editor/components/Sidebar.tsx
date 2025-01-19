import * as React from "react";
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from "@mui/x-tree-view";
import { useNavigate, useParams } from "react-router-dom";
import { IDocuments } from "../model.ts";
import { MdDelete } from "react-icons/md";
import { FaPlus } from "react-icons/fa";
import _ from "lodash";
import "./Sidebar.css"
import { deleteDocument } from "../requests.ts";
import { useSelector } from "react-redux";
import { RootState } from "../../store.ts";
import { logout } from "../../user/requests.ts";

interface ISidebar {
    documents: IDocuments;
    setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export default React.memo(({ documents, setModalOpen }: ISidebar) => {
    const { id } = useParams<{ id: string }>();
    const nav = useNavigate();

    const onItemClick = React.useCallback((_event: React.MouseEvent, id: string) => {
        nav(`/editor/${id}`);
    }, [nav]);

    const onCreate = React.useCallback(() => {
        setModalOpen(true);
    }, [setModalOpen]);

    const onLogout = React.useCallback(async () => {
        await logout();
        nav("/");
    }, [nav])

    return (
        <div className="sidebar">
            <div className="buttonsContainerHeader">
                <FaPlus onClick={onCreate} className="addButtonIcon" />
            </div>
            <SimpleTreeView onItemClick={onItemClick} selectedItems={id}>
                {_.map(documents, ({ name, id }) => (
                    <TreeItem
                        itemId={id.toString()}
                        key={id}
                        label={
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }} className="label">
                                <span>{name}</span>
                                <DeleteButtonIcon id={id} />
                            </div>
                        }
                    />
                ))}
            </SimpleTreeView>
            <div className="buttonsContainerFooter">
                <button onClick={onLogout}>Log out</button>
            </div>
        </div>
    );
});

const DeleteButtonIcon = React.memo(({ id }: { id: string; }) => {
    const firstDocumentId = useSelector((state: RootState) => _.head(state.documents.documents)?.id);
    const nav = useNavigate();

    const onDelete = React.useCallback(async () => {
        await deleteDocument(id.toString());
        if (firstDocumentId) {
            nav(`/editor/${firstDocumentId}`);
            window.location.reload(); // Refresh the document list so that the deleted document disappears
        }
    }, [id, nav, firstDocumentId]);
    return (
        <MdDelete onClick={onDelete} className="deleteButtonIcon" />
    );
})