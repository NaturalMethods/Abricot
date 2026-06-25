import Modal from "@/components/Modal/Modal";
import React, { useState } from "react";
import TextInput from "@/components/input/TextInput/TextInput";
import Button from "@/components/input/Button/Button";
import Image from "next/image";
import styles from "../Modal.module.css";
import {addContributor, createProject, modifyProject, searchUser} from "@/lib/projectsService";
import Tags from "@/components/Tags/Tags";
import {User} from "@/app/types/User";
import {Project} from "@/app/types/Project";

interface ModalProjectProps{

    isOpen: any,
    setIsOpen : any,
    onCloseAction : () => void,
    isCreation : boolean,
    isModification: boolean,
    project?:Project,

}

export default function ModalProject({
                                         isOpen,
                                         setIsOpen,
                                         onCloseAction,
                                         isCreation,
                                         isModification,
                                         project,
                                     }: ModalProjectProps) {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [contributors, setContributors] = useState<User[]>([]);
    const [contributorsInput, setContributorsInput] = useState("");

    // -------------------------
    // FETCH USERS (API)
    // -------------------------
    async function getUsers(name: string): Promise<any> {
        if (name.trim().length < 2) return [];

        const res = await searchUser(name);
        //TODO reset Contributors fermeture de la modalProject
        if (!Array.isArray(res)) return [];

        return res.map((u: any) => ({
            id: u.id,
            name: u.name,
            email: u.email,
        }));
    }

    // -------------------------
    // FORM VALIDATION
    // -------------------------
    function isFormValid() {

        if(isModification && (title.trim().length > 0 ||
            description.trim().length > 0 ||
            contributors.length > 0
        )) return true

        if(isCreation && (title.trim().length > 0 &&
            description.trim().length > 0 &&
            contributors.length > 0)) return true

        return false;
    }
    function closeModal() {
        setTitle("");
        setDescription("");
        onCloseAction();
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!isFormValid) return;

        async function postProject() {

            if (isCreation) {
                const resp = await createProject({
                    name: title.trim(),
                    description: description.trim(),

                }, contributors.map(c => c.email));

                if (resp?.success) closeModal();
            }
            if (isModification){
                if(project?.id && project?.id?.length > 0 || title.trim().length > 0 || description.trim().length > 0) {
                    const resp = await modifyProject({
                        id: project?.id,
                        name: title.trim(),
                        description: description.trim(),

                    }, contributors.map(c => c.email));
                    if (resp?.success) closeModal();
                }
                contributors.forEach(c => {
                    if(project?.id)
                    addContributor(project?.id,c.email, "CONTRIBUTOR");
                });
                //TODO resp de addContributor non pris compte ?

            }
        }

        postProject();
    }

    return (
        <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>

            {isCreation && (
                <div className={`flex-col align-center gap15 ${styles.padding}`}>
                    <form onSubmit={handleSubmit}>

                        <div className="flex-row flex-row-end max-w-100">
                            <Image
                                src="/cross.svg"
                                width={15}
                                height={15}
                                alt="close"
                                onClick={closeModal}
                                style={{ cursor: "pointer" }}
                            />
                        </div>

                        <div className="flex-col gap56">

                            <div className="flex-col gap30">

                                <h2>Créer un projet</h2>

                                <TextInput
                                    label="Titre*"
                                    value={title}
                                    width="452px"
                                    onChange={(e) => setTitle(e.target.value)}
                                />

                                <TextInput
                                    label="Description*"
                                    value={description}
                                    width="452px"
                                    onChange={(e) => setDescription(e.target.value)}
                                />

                                {/* ---------------- AUTOCOMPLETE ---------------- */}
                                <TextInput
                                    label="Contributeurs"
                                    width="452px"
                                    value={contributorsInput}
                                    onChange={(e) => setContributorsInput(e.target.value)}
                                    isAutoComplete
                                    autoCompletionFunction={async (value:string) => {
                                        if (value.trim().length < 2) return [];

                                        const users = await getUsers(value);

                                        return users.map((u: { name: string; }) => u.name);
                                    }}
                                    onSelectSuggestion={(name) => {
                                        getUsers(name).then((users) => {
                                            const user = users.find((u: { name: string; }) => u.name === name);
                                            if (!user) return;

                                            setContributors(prev =>
                                                prev.some(c => c.id === user.id)
                                                    ? prev
                                                    : [...prev, user]
                                            );

                                            setContributorsInput("");
                                        });
                                    }}
                                />

                                {/* ---------------- TAGS ---------------- */}
                                <div className="flex-row flex-wrap gap10 mt10">
                                    {contributors.map((user) => (
                                        <div
                                            key={user.id}
                                            onClick={() =>
                                                setContributors(prev =>
                                                    prev.filter(u => u.id !== user.id)
                                                )
                                            }
                                            style={{ cursor: "pointer" }}
                                        >
                                            <Tags
                                                label={user.name}
                                                padding="8px 16px"
                                                backgroundColor="grey-200"
                                                textColor="grey600"
                                            />
                                        </div>
                                    ))}
                                </div>

                            </div>

                            <Button
                                type="submit"
                                text="Ajouter un projet"
                                width="181px"
                                disabled={!isFormValid()}
                            />
                        </div>

                    </form>
                </div>
            )}
            {isModification && (
                <div className={`flex-col align-center gap15 ${styles.padding}`}>
                    <form onSubmit={handleSubmit}>

                        <div className="flex-row flex-row-end max-w-100">
                            <Image
                                src="/cross.svg"
                                width={15}
                                height={15}
                                alt="close"
                                onClick={closeModal}
                                style={{ cursor: "pointer" }}
                            />
                        </div>

                        <div className="flex-col gap56">

                            <div className="flex-col gap30">

                                <h2>Modifier un projet</h2>

                                <TextInput
                                    label="Titre*"
                                    value={title}
                                    placeholder={project?.name}
                                    width="452px"
                                    onChange={(e) => setTitle(e.target.value)}
                                />

                                <TextInput
                                    label="Description*"
                                    value={description}
                                    placeholder={project?.description}
                                    width="452px"
                                    onChange={(e) => setDescription(e.target.value)}
                                />

                                {/* ---------------- AUTOCOMPLETE ---------------- */}
                                <TextInput
                                    label="Contributeurs"
                                    width="452px"
                                    value={contributorsInput}
                                    placeholder={`${project?.members?.length} contributeurs`}
                                    onChange={(e) => setContributorsInput(e.target.value)}
                                    isAutoComplete
                                    autoCompletionFunction={async (value: string) => {
                                        if (value.trim().length < 2) return [];

                                        const users = await getUsers(value);

                                        return users.map((u: { name: string; }) => u.name);
                                    }}
                                    onSelectSuggestion={(name) => {
                                        getUsers(name).then((users) => {
                                            const user = users.find((u: { name: string; }) => u.name === name);
                                            if (!user) return;

                                            setContributors(prev =>
                                                prev.some(c => c.id === user.id)
                                                    ? prev
                                                    : [...prev, user]
                                            );

                                            setContributorsInput("");
                                        });
                                    }}
                                />

                                {/* ---------------- TAGS ---------------- */}
                                <div className="flex-row flex-wrap gap10 mt10">
                                    {contributors.map((user) => (
                                        <div
                                            key={user.id}
                                            onClick={() =>
                                                setContributors(prev =>
                                                    prev.filter(u => u.id !== user.id)
                                                )
                                            }
                                            style={{ cursor: "pointer" }}
                                        >
                                            <Tags
                                                label={user.name}
                                                padding="8px 16px"
                                                backgroundColor="grey-200"
                                                textColor="grey600"
                                            />
                                        </div>
                                    ))}
                                </div>

                            </div>

                            <Button
                                type="submit"
                                text="Enregistrer"
                                width="181px"
                                disabled={!isFormValid()}
                            />
                        </div>

                    </form>
                </div>
            )}

        </Modal>
    );
}