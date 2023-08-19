import '@/app/globals.css'
import data from '@/utils/data.json'
import yearData from '@/utils/year.json'

import { useEffect, useState } from 'react';

export default function Att() {
	const [year, setYear] = useState('nursery');
	const [room, setRoom] = useState<number[]>([]);
	let c = 0;

	useEffect(()=>{
   yearData.map(i => (
		i.year == year && setRoom(i.room)
	 ))
	}, [year])

	
	return(
		<div>
	  { /* Controls for table*/}
		<div>

	<select onChange={e=>{
		setYear(e.target.value)
	
		}}
					className="p-2 bg-teal-500 text-black"
	>
		{
			yearData.map((i) => (
				<option key={i.year} 
						  value={i.year} >
					{i.year}
				</option>	
			))
		}
	  </select>

		<br />
		{
			room.map(i => (
			<>
				<input type='checkbox' /> Room: {i}
		
			</>
			))
		}
		
		</div>
		<h1>Year: {year}, Room: {room.toString()}</h1>
		
		<table>
		
		<thead>
		 <tr>
			<th>ID</th>
			<th>No</th>
			<th>Name</th>
		</tr>
		</thead>

		<tbody>


		 {
 			data.filter(j => (j.year.toString() == year)).map((i) => {
			c++;
			return(
		<tr key={i.id}>
			<td className="border">
				{i.id}
			</td>
				<td className='border'>{c}</td>
				<td className='border'>
				 {i.name}
				</td>
		</tr>
			)})

			
		 } 













		</tbody>
		</table>
		</div>
	)

}
