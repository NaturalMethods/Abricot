import styles from "./TextInput.module.css"

interface TextInputProps {
    label: string
    placeholder?: string
    type?: string
    width?: string
    value?: string
    onChange?: (
        e: React.ChangeEvent<HTMLInputElement>
    ) => void
}

export default function TextInput({
                                      label,
                                      placeholder = "",
                                      type = "text",
                                      width = "300px",
                                      value,
                                      onChange,
                                  }: TextInputProps) {

    return (
        <div
            className={`flex-col inter14400 ${styles["input-container"]}`}
            style={{ width }}
        >
            <label>{label}</label>

            <input
                className={`inter12400 ${styles["input-field"]}`}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
            />
        </div>
    )
}