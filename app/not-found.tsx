import Image from "next/image";

export default function errorPage (){

    return(
        <section className={`flex-col align-center justify-center error-section`}>
            <Image loading={"lazy"}
                src="/logo.svg"
                alt="logo"
                width={512}
                height={64}
                priority
            />
            <div className="flex-col align-center justify-center">
                <Image loading={"eager"}
                    src="/404-error.png"
                    alt="page not found icon"
                    width={256}
                    height={256}
                />
                <h1 className={"manrope40700 grey950"}> La page demandé n&#39;existe pas</h1>
            </div>
        </section>
    )
}