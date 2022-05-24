import Link from "next/link";
import styles from "./Pagination.module.css"

interface PaginationProps {
    total: number;
    limit: number;
    current: number;
    link: string;
}

export function Pagination({ total, limit, current, link }: PaginationProps) {
    const min_middle = Math.ceil(limit / 2);
    const max_middle = (total + 1) - min_middle;

    let middle = current;
    if(middle < min_middle) middle = min_middle;
    if(middle > max_middle) middle = max_middle;

    let left = Math.round(middle - ((limit - 1) / 2));
    let right = Math.round(((limit - 1) / 2) + middle);

    if(left < 1) left = 1;
    if(right > total) right = total;

    const pages = [];

    for(let i = left; i <= right; i++)
        pages.push(i);

    return (
        <div className={styles.pagination}>
            { 
                pages.map((page) => {
                    return (
                        <Link href={`${link}?page=${page}`} key={page}>
                            { page == current ? <span className={[styles.page, styles.active].join(" ")}>{ page }</span> : <span className={styles.page}>{ page }</span> }
                        </Link>
                    )
                }) 
            }
        </div>
    )
}