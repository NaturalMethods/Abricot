import Modal from "@/components/Modal/Modal";
import React, {Dispatch, SetStateAction, useContext, useEffect, useState} from "react";
import TextInput from "@/components/input/TextInput/TextInput";
import Button from "@/components/input/Button/Button";
import Image from "next/image";
import styles from "../Modal.module.css";
import {addContributor, createProject, delContributor, modifyProject, searchUser} from "@/lib/projectsService";
import Tags from "@/components/Tags/Tags";
import {Member, User} from "@/app/types/User";
import {Project} from "@/app/types/Project";
import {RefreshContext} from "@/app/contexts/RefreshContext/RefreshContext";

interface ModalProjectProps{

    isOpen: boolean,
    setIsOpen : Dispatch<SetStateAction<boolean>>,
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

    const {refresh} = useContext(RefreshContext);

    useEffect(() => {
        setContributors(
            project?.members?.map(m => ({
                id: m.id,
                email: m.email,
                name: m.name,
            } as Member)) ?? []
        );

    }, [])

    // -------------------------
    // FETCH USERS (API)
    // -------------------------
    async function getUsers(name: string): Promise<User[]> {
        if (name.trim().length < 2) return [];

        const res = await searchUser(name);
        if (!Array.isArray(res)) return [];

        return res.map((u: User) => ({
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
            description.trim().length > 0
        )) return true

        return false;
    }
    function closeModal() {
        setTitle("");
        setDescription("");
        onCloseAction();
        refresh()
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

            if (!isModification) return;

            const projectId = project?.id;
            if (!projectId) return;

            const projectMembers = project?.members ?? [];

            const sameIds =
                contributors.length === projectMembers.length &&
                contributors.every(c =>
                    projectMembers.some(m => m.id === c.id)
                );

            const hasProjectChanges =
                title.trim().length > 0 || description.trim().length > 0;


            let newTitle;
            if(title.trim().length === 0) newTitle = project?.name;
            else newTitle = title.trim();

            let newDescription;
            if(description.trim().length === 0) newDescription = project?.description;
            else newDescription = description.trim();

            // UPDATE PROJECT
            if (hasProjectChanges) {
                const resp = await modifyProject(
                    {
                        id: projectId,
                        name: newTitle,
                        description: newDescription,
                    },
                    contributors.map(c => c.email)
                );

                if (!resp?.success) return;
            }

            // NOTHING TO DO
            if (!hasProjectChanges && sameIds) {
                return;
            }

            // SYNC CONTRIBUTORS
            if (!sameIds || hasProjectChanges) {
                await Promise.all(
                    projectMembers.map(m =>
                        delContributor(projectId, m.id)
                    )
                );

                await Promise.all(
                    contributors
                        .filter(c => !project.owner?.id || c.id !== project.owner.id)
                        .map(c =>
                            addContributor(projectId, c.email, "CONTRIBUTOR")
                        )
                );
            }

            // CLOSE MODAL
            closeModal();
        }

        postProject();
    }

    return (
        <Modal isOpen={isOpen} onCloseAction={() => setIsOpen(false)}>

            {isCreation && (
                <div className={`flex-col align-center gap15 ${styles.padding}`}>
                    <form onSubmit={handleSubmit}>

                        <div className="flex-row flex-row-end max-w-100">
                            <button
                                type="button"
                                onClick={closeModal}
                                aria-label="Fermer la fenêtre"
                            >
                                <Image
                                    src="/cross.svg"
                                    width={15}
                                    height={15}
                                    alt=""
                                />
                            </button>
                        </div>

                        <div className="flex-col gap56">

                            <div className="flex-col gap30">

                                <h2 className={"sm:w-[452px] "}>Créer un projet</h2>

                                <TextInput
                                    label="Titre*"
                                    value={title}
                                    width="100%"
                                    onChange={(e) => setTitle(e.target.value)}
                                />

                                <TextInput
                                    label="Description*"
                                    value={description}
                                    width="100%"
                                    onChange={(e) => setDescription(e.target.value)}
                                />

                                {/* ---------------- AUTOCOMPLETE ---------------- */}
                                <TextInput
                                    label="Contributeurs"
                                    width="100%"
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
                                        <Tags
                                            key={user.id}
                                            label={user.name}
                                            padding="8px 16px"
                                            backgroundColor="grey-200"
                                            textColor="grey600"
                                            onClick={() =>
                                                setContributors(prev =>
                                                    prev.filter(u => u.id !== user.id)
                                                )
                                            }
                                        />
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
                            <button
                                type="button"
                                onClick={closeModal}
                                aria-label="Fermer la fenêtre"
                            >
                                <Image
                                    src="/cross.svg"
                                    width={15}
                                    height={15}
                                    alt=""
                                />
                            </button>
                        </div>

                        <div className="flex-col gap56">

                            <div className="flex-col gap30">

                                <h2 className={"sm:w-[452px]"}>Modifier un projet</h2>

                                <TextInput
                                    label="Titre"
                                    value={title}
                                    placeholder={project?.name}
                                    width="100%"
                                    onChange={(e) => setTitle(e.target.value)}
                                />

                                <TextInput
                                    label="Description"
                                    value={description}
                                    placeholder={project?.description}
                                    width="100%"
                                    onChange={(e) => setDescription(e.target.value)}
                                />

                                {/* ---------------- AUTOCOMPLETE ---------------- */}
                                <TextInput
                                    label="Contributeurs"
                                    width="100%"
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

                                            <Tags
                                                key={user.id}
                                                label={user.name}
                                                padding="8px 16px"
                                                backgroundColor="grey-200"
                                                textColor="grey600"
                                                onClick={() =>
                                                    setContributors(prev =>
                                                        prev.filter(u => u.id !== user.id)
                                                    )
                                                }
                                            />

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