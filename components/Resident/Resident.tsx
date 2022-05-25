import Image from "next/image"

import styles from "./Resident.module.css"

interface ResidentProps {
    image: string;
    name: string;
    status: string;
    species: string;
    type: string;
    gender: string;
    origin: string;
}

export function Resident({ image, name, status, species, type, gender, origin }: ResidentProps) {
    return (
        <div className={styles.resident}>
            <div className={styles["image-container"]}>
                <Image 
                    src={ image }
                    width="100%"
                    height="100%"
                    layout="responsive"
                    className={styles.image}
                    alt=""
                />
            </div>
            <div className={styles["name-container"]}>
                <h1 className={styles.name}>{ name }</h1>
            </div>
            <div className={styles.status}>
                <span className={styles[status]}></span> { status }
            </div>
            <div className={styles["info-container"]}>
                <div className={styles.info}>
                    <span>Species</span>
                    <p>{ species ? species : "unknown" }</p>
                </div>
                <div className={styles.info}>
                    <span>Type</span>
                    <p>{ type ? type : "unknown" }</p>
                </div>
                <div className={styles.info}>
                    <span>Gender</span>
                    <p>{ gender ? gender : "unknown" }</p>
                </div>
                <div className={styles.info}>
                    <span>Origin</span>
                    <p>{ origin ? origin : "unknown" }</p>
                </div>
            </div>
        </div>
    )
}