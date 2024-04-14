import React, {useState} from 'react'
import SearchBar from '@/components/SearchBar'
import StatsTracker from '@/components/StatsTracker'
import Buttons from '@/sections/view/Buttons'
import LimbTracker from '@/components/LimbTracker'
import { useSearchParams } from 'next/navigation'

export default function View() {
    const searchParams = useSearchParams()
    const [currentPlayer, setCurrentPlayer] = useState(searchParams?.get('player') ?? '')
    const [dataStats, setDataStats] = useState<any[]>([])
    const [isLoadingStats, setIsLoadingStats] = useState(true);
    const [dataLimbs, setDataLimbs] = useState(null)
    const [isLoadingLimbs, setIsLoadingLimbs] = useState(true);

    const fetchDataStats = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_BACKEND;
        const response = await fetch(`${API_URL}/api/view_all_stats`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDataStats(data);
        setIsLoadingStats(false);
      } catch (error) {
        console.error('Error:', error);
      }
    };

    const fetchDataLimbs = async () => {
      try {
          const API_URL = process.env.NEXT_PUBLIC_BACKEND;
          const response = await fetch(`${API_URL}/api/view_parts/${currentPlayer}`);
          const data = await response.json();
          setDataLimbs(data);
          setIsLoadingLimbs(false)
      } catch (error) {
          console.error('Error:', error);
      }
    };

    return (
    <div className='p-6 flex flex-col'>
      
        <SearchBar/>
        <StatsTracker
          currentPlayer={currentPlayer}
          setCurrentPlayer={setCurrentPlayer}
          fetchData={fetchDataStats}
          dataStats={dataStats}
          isLoadingStats={isLoadingStats}/>
        <LimbTracker
          playerView={currentPlayer}
          fetchData={fetchDataLimbs}
          data={dataLimbs}
          />
        <Buttons
        playerView={currentPlayer}/>
      </div>
  )
}
