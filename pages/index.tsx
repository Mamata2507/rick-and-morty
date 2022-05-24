import { GetServerSideProps } from "next"
import { Layout } from "../components/Layout"
import { Location } from "../components/Location"
import { Pagination } from "../components/Pagination"

import { LocationType } from "../types/location"
import { InfoType } from "../types/info"

import styles from "../styles/Locations.module.css"

export const getServerSideProps: GetServerSideProps = async (context) => {
  try{
    const page = context.query.page ? context.query.page : 1;
    const response = await fetch(`https://rickandmortyapi.com/api/location?page=${page}`);
    const data = await response.json();

    if(data.error) {
      return {
        redirect: {
          destination: "/500",
          permanent: false,
        }
      }
    }

    return {
      props: {
        page,
        locations: data.results,
        info: data.info
      }
    }
  }catch {
    return {
      redirect: {
        destination: "/500",
        permanent: false,
      }
    }
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
      <div className={styles.header}>
        <div>
          <h1 className={styles.heading}>Locations</h1>
        </div>
        <div>
          <input 
            className={styles.search}
            placeholder="Search location by name"
          />
        </div>
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

export default Home;
