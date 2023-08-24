import '@/app/globals.css'
import data from '@/utils/data.json'
import yearData from '@/utils/year.json'

import { useEffect, useState } from 'react';


const TableRow = (c:number, name:string, id:number) => {
	return(

		<tr key={id}>
				<td className='border'>{c}</td>
				<td className='border'> {name} </td>
		</tr>
	)
}

export default function Att() {
	const [year, setYear] = useState('all');
	const [room, setRoom] = useState<number[]>([]);
	const [r, setR] = useState('');
	let c = 0;

	useEffect(()=>{
   yearData.map(i => (
		i.year == year && setRoom(i.room)
	 ))
	 setR('')
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
		
		<table>
		
		<thead>
		 <tr>
			<th>No</th>
			<th>Name</th>
		</tr>
		</thead>

		<tbody>


		 {
		 data.filter(j => year=='all' ? j.year : (j.year.toString() == year && r.concat('0').includes(j.room.toString()) ))
					.map((i) => {

			c++;
			return(
		<tr key={i.id}>
				<td className='border'>{c}</td>
				<td className='border'> {i.name} </td>
		</tr>
			)})

			
		 } 













		</tbody>
		</table>
		</div>
	)

}
