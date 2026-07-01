
import styles from "@/components/layout/Header.module.css"
export default function ProjectsButton() {
    return (
        <section className={`flex-row items-center 
                             justify-center w-[48px] 
                             md:w-[150px] lg:w-[248px] 
                             gap-4 h-[48px] 
                             bg-white rounded-[10px] 
                             transition-colors duration-300 
                             ease-in-out ${styles["header-button"]}
                                                            `}>
            <img className="logo w-[25vw] max-w-[24px] min-w-[12px] h-auto
              sm:w-[24px] sm:h-[24px]" src="/directoryicon.svg" alt="icône projets"  />
            <p className="hidden md:block inter16400 dark-orange">Projets</p>
        </section>

    )
}