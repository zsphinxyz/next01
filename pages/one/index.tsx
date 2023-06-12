import '@/app/globals.css'
import Table from '@/components/Table'
// import {year1} from '@/utils/year1'
import {year2} from '@/utils/year2'

const index = () => {
  return (
    <div>
        <h1 className='text-center text-2xl font-bold'>Year 1 Data</h1>
        <Table data={year2}/>
    </div>
  )
}

export default index