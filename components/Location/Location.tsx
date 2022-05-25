import Link from "next/link"

import styles from "./Location.module.css"

interface LocationProps {
    id: number;
    name: string;
    type: string;
    dimension: string;
    residents: number;
}

export function Location({ id, name, type, dimension, residents }: LocationProps) {
    return (
        <div className={styles.location}>
            <div className={styles.name}>
                <Link href={`/location/${id}`}>{ name }</Link>
            </div>
            <div className={styles.info}>
                <div>
                    <span className={styles.badge}>Type</span>{ type ? type : "None" }
                </div>
                <div>
                    <span className={styles.badge}>Dimension</span>{ dimension ? dimension : "None" }
                </div>
                <div>
                    <span className={styles.badge}>Resident count</span>{ residents }
                </div>
            </div>
        </div>
    )
}