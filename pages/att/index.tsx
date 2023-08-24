import '@/app/globals.css'
import data from '@/utils/data.json'
import yearData from '@/utils/year.json'

import { useEffect, useState } from 'react';


export default function Att() {
	const [year, setYear] = useState('all');
	const [room, setRoom] = useState<number[]>([]);
	const [r, setR] = useState('1');
	const [search, setSearch] = useState('')
	const [yearcol, setYearcol] = useState(false)

	let c = 0;

	useEffect(()=>{
   yearData.map(i => (
		i.year == year && setRoom(i.room)
	 ))
	 setR('')
	 setSearch('')
	}, [year])

	const handleInput = (e:any) => {
		e.target.checked ? 
		setR(
			(a) => e.target.id + a
		) : 
		setR(
			r.replace(e.target.id, '')
		)
		}
	
	return(
		<div>
	  {/* Controls for table */}
		<div>

	<select onChange={e=>{
		setYear(e.target.value)
		}}
					className="p-2 bg-teal-500 text-black"
	>

		<option value='all'> All </option>	
		{
			yearData.map((i) => (
				<option key={i.year} 
						  value={i.year} >
					{['Nursery','Reception'].includes(i.year) ? i.year : 'Year '+i.year}
				</option>	
			))
		}
	  </select>
		<input 	type='checkbox' 
						checked={yearcol}
						className="ml-8"
						onChange={() => setYearcol(!yearcol)}
		/> Add Room Colum
		<br />
		{
			room.map(i => (
			<>
				<input type='checkbox'
					key={i}
					id={i.toString()}
					onChange={handleInput}
					/>
					R-{i}
			</>
			))
		} 
		<br />

		</div>
		<h1>Year {year}, Room: {r.toString()}</h1>

		<input 
			placeholder='Search' 
			onChange={(e)=>setSearch(e.target.value)}
			className="text-black"
			value={search}
		/>
		<br />
		&gt;&gt; {search}

		<table className='font-serif'>
		
		<thead>
		 <tr>
			<th className="border">No</th>
			<th className="border">Name</th>
			{
				yearcol &&
				<th className="border px-2">Year (Room)</th>
			}
		</tr>
		</thead>

		<tbody>


		 {
		 data.filter(j => year=='all' ?
		 			j.year :
					(j.year.toString() == year && r.concat('0').includes(j.room.toString()) ))
					.filter(s => search.length !=0 ?
					s.name.toLowerCase().includes(search.toLowerCase()) :
					s.name
					)
					.map((i) => {

			c++;
			return(
		<tr key={i.id}>
				<td className='border px-2'>{c}</td>
				<td className='border px-2'> {i.name} </td>
				{
					yearcol &&
					<td className='border px-2 min-w-fit'>{i.year} ({i.room})</td>
				}
		</tr>
			)})

			
		 } 













		</tbody>
		</table>
		</div>
	)

}
