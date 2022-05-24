import Link from "next/link"
import Image from "next/image"

import styles from "./Layout.module.css"

interface LayoutProps {
    children?: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Link href="/">
                    <Image 
                        className={styles.logo} 
                        src="/assets/logo.png"
                        width={120}
                        height={36}
                        alt=""
                    />
                </Link>
            </div>
            <div className={styles.content}>
                { children }
            </div>
        </div>
    )
}