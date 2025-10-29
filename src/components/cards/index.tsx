import { useEffect, useState } from 'react'
import axios from 'axios'
import styles from './cards.module.css'
import { BlinkBlur } from 'react-loading-indicators'

export interface driverProps {
  first_name: string
  last_name: string
  team_name: string
  name_acronym: string
  driver_number: string
  headshot_url: string
  full_name: string
}

export function Cards(){

    const [drivers, setDrivers] = useState<driverProps[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [input, setInput] = useState<string>("")

    const inputLowerCase = input.toLowerCase()
    const filteredDriver = drivers.filter((driver) => driver.full_name.toLowerCase().includes(inputLowerCase) || driver.team_name.toLowerCase().includes(inputLowerCase))
    
    useEffect(() => {
      getDrivers()
    }, [])
    
     const getDrivers = async () => {
        await axios({
          method: 'get',
          url: 'https://api.openf1.org/v1/drivers'
        }).then(response => {
          setDrivers(response.data.slice(6700, 6720))
        })

        setIsLoading(false)
    }

    if(isLoading) {
      return (
        <div className={styles.load_container}>
          <BlinkBlur color="#EE0000" size="medium" text="" textColor="" />
        </div>
      )
    }

    return (
      <>
      <div className='input'>
            <input value={input} onChange={(e) => setInput(e.target.value)} className={styles.search_input} type="text" placeholder='Digite o nome do piloto...' />
        </div>

          <div className={styles.cards}>

          {filteredDriver.map((driver) => 
          <div key={driver.full_name} className={styles.driver_card}>
          <div className={styles.driver_img}>
          <img src={driver.headshot_url}/>
          </div>
          <p className={styles.driver_name}>{driver.first_name}<br /> <strong>{driver.last_name}</strong></p>
          <hr />
          <p className={styles.driver_acronym}>{driver.name_acronym}</p>
          <p className={styles.driver_team}>{driver.team_name}</p>
          <p className={styles.driver_number}>#{driver.driver_number}</p>

          </div>

          )}

      </div>
    </>
    )
}