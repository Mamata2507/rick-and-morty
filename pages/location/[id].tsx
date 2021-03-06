import Head from "next/head"
import { GetServerSideProps } from "next"
import { Layout } from "../../components/Layout"
import { Resident } from "../../components/Resident"

import { LocationType } from "../../types/location"
import { ResidentType } from "../../types/resident"

import styles from "../../styles/ResidentsPage.module.css"

export const getServerSideProps: GetServerSideProps = async (context) => {
    try{
        const locationResponse = await fetch(`https://rickandmortyapi.com/api/location/${context.params!.id}`);
        const location = await locationResponse.json();
        if(location.error) return { redirect: { destination: "/404", permanent: false } }
        
        const ids = [0];
        for (const resident of location.residents) 
            ids.push(resident.split("/").pop());

        const residentsResponse = await fetch(`https://rickandmortyapi.com/api/character/${ids.join(",")}`)
        const residents = await residentsResponse.json();
        if(!residents.length) return { props: { location, error: "No residents found in this location" } }

        return { props: { location, residents } }
    }catch {
        return { redirect: { destination: "/500", permanent: false } }
    }
}

interface ResidentsProps {
    location: LocationType
    residents: Array<ResidentType>;
    error: string;
}

function Residents({ location, residents, error }: ResidentsProps) {
    return (
        <Layout>
            <Head>
                <title>Rick and Morty - { location.name }&apos;s residents</title>
            </Head>
            <div className={styles.header}>
                <h1 className={styles.heading}>{ location.name }&apos;s residents</h1>
                <div className={styles.info}>
                    <div>
                        <span className={styles.badge}>Type</span>{ location.type ? location.type : "None" }
                    </div>
                    <div>
                        <span className={styles.badge}>Dimension</span>{ location.dimension ? location.dimension : "None" }
                    </div>
                </div>
            </div>
            {error && <div className={styles.error}>{ error }</div>}
            {!error &&
                <div className={styles.residents}>
                    {
                        residents.map(resident => {
                            return (
                                <Resident
                                    key={resident.id}
                                    image={resident.image}
                                    name={resident.name}
                                    status={resident.status}
                                    species={resident.species}
                                    type={resident.type}
                                    gender={resident.gender}
                                    origin={resident.origin.name}
                                />
                            )
                        })
                    }
                </div>
            }
        </Layout>
  )
}

export default Residents
