import '@/app/globals.css'
import data from '@/utils/data.json'
import yearData from '@/utils/year.json'

import {SiGoogleclassroom} from 'react-icons/si';
import {BsGrid3X3} from 'react-icons/bs';
import {TiInfoLargeOutline} from 'react-icons/ti';
import {AiFillPrinter} from 'react-icons/ai';


import { useRef, useEffect, useState } from 'react';
import ReactToPrint from "react-to-print"


export default function Att() {
	const [year, setYear] = useState('All');
	const [room, setRoom] = useState<number[]>([]);
	const [r, setR] = useState('1');
	const [search, setSearch] = useState('')
	const [yearcol, setYearcol] = useState(false)
	const [empty, setEmpty] = useState(false)
	
	const printRef = useRef(null)

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
		<div >

	  {/* Controls for table */}
		<div className='select-none bg-slate-700 p-5'>

			{/* Control for upper row */}
		<div className='flex items-center'>
			<select onChange={e=>{
				setYear(e.target.value)
				}}
				className="p-2 bg-slate-300 text-black bold outline-none"
			>
				{
					yearData.map((i) => (
						<option key={i.year} 
							value={i.year} 
							className='hover:bg-green-300 '
						>
							{['Nursery','Reception', 'All'].includes(i.year) ? i.year : 'Year '+i.year}
						</option>	
					))
				}
			</select>

		<label className={`bg-slate-300 p-1 rounded-sm ml-2 ${yearcol && 'bg-green-300'}`}>
		<input 	type='checkbox' 
				checked={yearcol}
				className=" appearance-none peer"
				onChange={() => setYearcol(!yearcol)}
		/> 
		<SiGoogleclassroom className='w-fit inline text-[30px] text-stone-500 peer-checked:text-green-700' />
	</label>

	<label className={`bg-slate-300 p-1 rounded-sm ml-2 ${empty && 'bg-green-300'}`}>
		<input 
			type='checkbox'
			checked={empty}
			className='appearance-none peer'
			onChange={ () => setEmpty(!empty) }
		/>
		<BsGrid3X3  className='w-fit inline text-[25px] text-stone-500 peer-checked:text-green-700' /> 
	</label>

	<input type="number" className='w-10 ml-2 outline-none bg-slate-300 h-8 p-1 rounded-sm' />
	<input type="range" min='1' max='100' />


	</div> {/* upper contol row ends */}


		{/* Middle row starts*/}
		<div className='w-full h-10 flex items-center '>
			{
				room.map(i => (
				<>
					<label>
						<input  type='checkbox'
								key={i}
								id={i.toString()}
								onChange={handleInput}
								className='appearance-none peer'
						/> <span className='bg-slate-300 p-1 rounded-sm w-full h-full peer-checked:bg-green-500'>R-{i}</span>
					</label>
				</>
				))
			} 
		</div> {/* Middle row ends */}

			
			{/* bottom contol row starts */}
			<div className='flex items-center'>
			<input 
				placeholder='Search' 
				onChange={(e)=>setSearch(e.target.value)}
				className="text-black outline-none pl-2 py-1 bg-slate-300"
				value={search}
			/>

			<ReactToPrint
				trigger = {
					() => (
						<button className=' ml-2 bg-slate-300 h-[32px] '>
							<AiFillPrinter className='w-full text-xl px-2'/>
						</button>
						)}
						content={()=>printRef.current}
						documentTitle="Students List"
						pageStyle="print"
			/>
			
			</div> {/* bottwm control row ends */}

		</div>	{/* end of table contol */}

		<div className='p-2 py-1 bg-stone-400'> {/* Start Info bar */}
			<p>
				<TiInfoLargeOutline className='inline text-xl border border-black rounded-full mr-2'/>
				Year: {year}, &nbsp;
				{room.length} Rooms, &nbsp;
			</p>
		</div> {/* End Info bar */}

		<div 
		ref={printRef}
		className='w-fit border-green-200 p-2'>

		<h1 className="font-bold text-xl pl-5">
			{year == 'All' ?  'All' : `Year ${year}, Room(${r.split('').sort().join()})` } 
		</h1> 

 		<table className='font-serif font-[12px] whitespace-nowrap '>
		<thead>
		 <tr>
			<th className="border border-black">No</th>
			<th className="border border-black">Name</th>
			{
				yearcol &&
				<th className="border border-black px-2">Year (Room)</th>
			}
			
		{ empty && (
		<>
		<th className="border border-black min-w-[75px]"></th>
		<th className="border border-black min-w-[75px]"></th>
		<th className="border border-black min-w-[75px]"></th>
		<th className="border border-black min-w-[75px]"></th>
		<th className="border border-black min-w-[75px]"></th>
		</>)
		}
			
		</tr>
		</thead>

		<tbody>


		 {
		 data.filter(j => year=='All' ?
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
				<td className='border border-black px-2'>{c}</td>
				<td className='border border-black px-2'> {i.name} </td>
				{
					yearcol &&
					<td className='border border-black px-2 min-w-fit'>{i.year} ({i.room})</td>
				}
		{
		empty && (
			<>
				<td className="border border-black"> </td>
				<td className="border border-black"> </td>
				<td className="border border-black"> </td>
				<td className="border border-black"> </td>
				<td className="border border-black"> </td>
			</>
		)
		}
		</tr>
			)})

		 } 


		</tbody>
		</table>

		</div>
		</div>
	)

}
