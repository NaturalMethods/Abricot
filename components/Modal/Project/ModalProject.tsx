import Modal from "@/components/Modal/Modal";
import React, { useState, useMemo } from "react";
import TextInput from "@/components/input/TextInput/TextInput";
import Button from "@/components/input/Button/Button";
import Image from "next/image";
import styles from "../Modal.module.css";
import { createProject, searchUser } from "@/lib/projectsService";
import Tags from "@/components/Tags/Tags";
import {User} from "@/app/types/User";

export default function ModalProject({
                                         isOpen,
                                         setIsOpen,
                                         onCloseAction,
                                         isCreation,
                                         isModification
                                     }: any) {

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

        if (!Array.isArray(res)) return [];

        return res.map((u: any) => ({
            id: u.id,
            name: u.name,
            email: u.email,
        }));
    }

    // -------------------------
    // DEBOUNCE SIMPLE
    // -------------------------
    const debounce = (fn: Function, delay = 300) => {
        let timeout: NodeJS.Timeout;

        return (...args: any[]) => {
            clearTimeout(timeout);
            timeout = setTimeout(() => fn(...args), delay);
        };
    };

    // -------------------------
    // FORM VALIDATION
    // -------------------------
    const isFormValid =
        title.trim().length > 0 &&
        description.trim().length > 0;

    function closeModal() {
        setTitle("");
        setDescription("");
        onCloseAction();
        setIsOpen(false);
    }

    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();

        if (!isFormValid) return;

        async function postProject() {
            const resp = await createProject({
                name: title.trim(),
                description: description.trim(),

            }, contributors.map(c => c.email));

            if (resp?.success) closeModal();
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
                                    autoCompletionFunction={async (value) => {
                                        if (value.trim().length < 2) return [];

                                        const users = await getUsers(value);

                                        return users.map(u => u.name);
                                    }}
                                    onSelectSuggestion={(name) => {
                                        getUsers(name).then((users) => {
                                            const user = users.find(u => u.name === name);
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
                                disabled={!isFormValid}
                            />
                        </div>

                    </form>
                </div>
            )}

        </Modal>
    );
}