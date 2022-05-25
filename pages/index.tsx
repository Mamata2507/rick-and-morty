import Head from "next/head"
import { GetServerSideProps } from "next"
import { Layout } from "../components/Layout"
import { Location } from "../components/Location"
import { Pagination } from "../components/Pagination"

import { LocationType } from "../types/location"
import { InfoType } from "../types/info"

import styles from "../styles/LocationsPage.module.css"

export const getServerSideProps: GetServerSideProps = async (context) => {
  try{
    const page = context.query.page ? context.query.page : 1;
    const response = await fetch(`https://rickandmortyapi.com/api/location?page=${page}`);
    const data = await response.json();
    if(data.error) return { redirect: { destination: "/404", permanent: false } }

    return { props: { page, locations: data.results, info: data.info } }
  }catch {
    return { redirect: { destination: "/500", permanent: false } }
  }
}

interface HomeProps {
  page: number;
  locations: Array<LocationType>;
  info: InfoType;
}

function Home({ page, locations, info }: HomeProps) {
  return (
    <Layout>
      <Head>
        <title>Rick and Morty - Locations</title>
      </Head>
      <div>
          <h1 className={styles.heading}>Locations</h1>
      </div>
      <div className={styles.locations}>
        { 
          locations.map(location => {
            return <Location 
              key={location.id}
              id={location.id} 
              name={location.name}
              type={location.type}
              dimension={location.dimension}
              residents={location.residents.length}
            />
          }) 
        }
      </div>
      <Pagination
        current={page}
        total={info.pages}
        limit={5} 
        link={"/"}
      />
    </Layout>
  )
}

export default Home
