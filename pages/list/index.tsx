import '@/app/globals.css'
import data from '@/utils/data.json'
import yearData from '@/utils/year.json'

	// Fire Base 

	// Icons 
import {SiGoogleclassroom} from 'react-icons/si';
import {BsGrid3X3, BsFillCursorFill} from 'react-icons/bs';
import {TiInfoLargeOutline} from 'react-icons/ti';
import {TbColumnInsertRight} from 'react-icons/tb';
import {IoBrowsersSharp} from 'react-icons/io5';
import {AiFillPrinter, AiOutlineColumnWidth, AiOutlineOrderedList} from 'react-icons/ai';


	// React & Next
import { useRef, useEffect, useState } from 'react';
import ReactToPrint from "react-to-print"
// import { useRouter } from 'next/router';
// import { useSearchParams } from 'next/navigation';


export default function Att() {
	const [year, setYear] = useState('All');			// dropdown selection
	const [room, setRoom] = useState<number[]>([]);		// total room in current year
	const [r, setR] = useState('');						// show checked room in table of current year
	const [search, setSearch] = useState('');			// search box
	const [yearcol, setYearcol] = useState(false);		// add year(room) column
	const [empty, setEmpty] = useState(false);			// add empty columns
	const [cols, setCols] = useState(5); 				// number of columns
	const [colRef, setColRef] = useState<number[]>([])	// col array
	const [colWidth, setColWidth] = useState(80)		// width of empty columns
	const [isRoll, setIsRoll] = useState(false)			// show roll no or not
	const [isCell, setIsCell] = useState(false) 		// select individual cells
	const [tableHeader, setTableHeader] = useState(true)	// set Table header

	// const searchParams = useSearchParams();
	// const year = searchParams?.get('all')
	// const router = useRouter();

	const printRef = useRef(null);

	let c = 0;
	let arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]

	useEffect(() => {
		for (let i = 1; i < arr.length; i++) {
			setColRef([...arr.slice(0, cols)])
		}
	}, [cols])

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

		// From Stackoverflow
	function romanize(num:number) {
		var lookup:any = {M:1000,CM:900,D:500,CD:400,C:100,XC:90,L:50,XL:40,X:10,IX:9,V:5,IV:4,I:1},roman = '',i;
		for ( i in lookup ) {
		  while ( num >= lookup[i] ) {
			roman += i;
			num -= lookup[i];
		  }
		}
		return roman;
	  }
	
	return(
		<div>

	  {/* Controls for table */}
		<div className='select-none bg-slate-700 p-5 sticky top-0'>

			{/* Control for upper row */}
		<div className='flex items-center gap-2'>
			<select onChange={e=>
				setYear(e.target.value)
			}
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

		<label className={`bg-slate-300 p-1 rounded-sm ${isRoll && 'bg-green-300'}`}>
			<input 	type='checkbox' 
					checked={isRoll}
					className=" appearance-none peer"
					onChange={() => setIsRoll(!isRoll)}
			/> 
			<AiOutlineOrderedList className='w-fit inline text-[30px] text-stone-500 peer-checked:text-green-700' />
		</label>

		<label className={`bg-slate-300 p-1 rounded-sm ${yearcol && 'bg-green-300'}`}>
			<input 	type='checkbox' 
					checked={yearcol}
					className=" appearance-none peer"
					onChange={() => setYearcol(!yearcol)}
			/> 
			<SiGoogleclassroom className='w-fit inline text-[30px] text-stone-500 peer-checked:text-green-700' />
		</label>

		<label className={`bg-slate-300 p-1 rounded-sm ${empty && 'bg-green-300'}`}>
			<input 
				type='checkbox'
				checked={empty}
				className='appearance-none peer'
				onChange={ () => setEmpty(!empty) }
			/>
			<BsGrid3X3  className='w-fit inline text-[25px] text-stone-500 peer-checked:text-green-700 text-align-right' /> 
		</label>

	<label className='bg-slate-300 rounded-sm pr-1'>
		<TbColumnInsertRight className=' inline-block  text-2xl h-8' />
		<input type="number" min='0' max='25' className='outline-none bg-transparent w-7 h-8 text-right ' value={cols} onChange={e => setCols(parseInt(e.target.value))}/>
	</label>
	
	<label className='bg-slate-300 rounded-sm pr-1'>
		<AiOutlineColumnWidth className=' inline-block  text-2xl h-8' />
		<input type="number" min='10' max='200' className='outline-none bg-transparent w-10 h-8 text-right' value={colWidth} onChange={e => setColWidth(parseInt(e.target.value))}/>
	</label>


				{/* Select individual cells  */}
		<label className={`bg-slate-300 p-1 rounded-sm ${isCell && 'bg-green-300'}`}>
			<input 
				type='checkbox'
				checked={isCell}
				className='appearance-none peer'
				onChange={ () => setIsCell(!isCell) }
			/>
			<BsFillCursorFill  className='w-fit inline text-[25px] text-stone-500 peer-checked:text-green-700 text-align-right' /> 
		</label>

				{/* Add Header */}
		<label className={`bg-slate-300 p-1 rounded-sm ${tableHeader && 'bg-green-300'}`}>
			<input 
				type='checkbox'
				checked={tableHeader}
				className='appearance-none peer'
				onChange={ () => setTableHeader(!tableHeader) }
			/>
			<IoBrowsersSharp  className='w-fit inline text-[25px] text-stone-500 peer-checked:text-green-700 text-align-right' /> 
		</label>


	</div> {/* upper contol row ends */}

		{/* Middle row starts*/}
		<div className='w-full h-10 flex items-center '>
			{
				room.map(i => (
				<>
					<label>
						<input  
							type='checkbox'
							key={i}
							id={i.toString()}
							onChange={handleInput}
							defaultChecked = {i == parseInt(r) && true}
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
				className="text-black outline-none pl-2 py-1 bg-slate-300 focus:bg-slate-400"
				value={search}
			/>

			<ReactToPrint
				trigger = {
					() => (
						<button className='ml-2 bg-slate-300 h-[32px] hover:bg-slate-400 transition '>
							<AiFillPrinter className='w-full text-xl px-2'/>
						</button>
						)}
						content={()=>printRef.current}
						documentTitle="Students List"
						pageStyle="print"
			/>
			
			</div> {/* bottom control row ends */}

		</div>	{/* end of table contol */}

		<div className='p-2 py-1 bg-slate-300'> {/* Start Info bar */}
			<p>
				<TiInfoLargeOutline className='inline text-xl border border-black rounded-full mr-2'/>
				Year: {year} | &nbsp;
				{room.length} Rooms | &nbsp;
			</p>
		</div> {/* End Info bar */}

		<div 
		ref={printRef}
		className='w-fit border-green-200 p-2'>

		{/* Page Header */}

		{
			tableHeader && 
			<input type="text" placeholder='Enter Page Header' className=' font-serif text-xl font-bold text-center w-full' />
		}

		<h1 className="font-bold text-xl pl-5">
			{year == 'All' ?  'All' 
			: year == 'Reception' ? `Reception, Room(${r.split('').sort().join()})`
			: year == 'Nursery' ? 'Nursery'
			: `Year ${year}, Room(${r.split('').sort().join()})` } 
		</h1> 

 		<table className={`font-[Times] whitespace-nowrap ${isCell ? 'cursor-cell' : 'cursor-default'} selection:bg-slate-700 selection:text-white`}>
		<thead>
		 <tr>
			<th className="border border-black">No</th>
			{isRoll && <th className="border border-black">Roll No</th>}
			<th className="border border-black">Name</th>
			{
				yearcol &&
				<th className="border border-black px-2">Year (Room)</th>
			}

			{
			empty && (
				<>
					{colRef.map(i => (
						<th key={i} className='border border-black overflow-hidden min-w[10px] w-[80px] text-center' style={{minWidth: colWidth}}>
							<input type="text" className=' bg-transparent w-full text-center'/>
						</th>
					))}
				</>
			)}
			
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
								<td className='border border-black px-2 '>{c}</td>
								{isRoll && <td className='border border-black px-2 '>
									{i.roll != 0 ? `${romanize(Number(i.year))}-${i.roll}` : '-'}
								</td>}
								<td className={ `border border-black px-2 ${isCell ? 'select-all' : 'select-auto'}` }> {i.name} </td>
								{
									yearcol &&
									<td className='border border-black px-2 min-w-fit'>{i.year} ({i.room})</td>
								}
								{
								empty && (
									<>
										{colRef.map(i => (
											<td key={i} className="border border-black"></td>
										))}
									</>
								)}
							</tr>
						)
					})
		 } 


		</tbody>
		</table>

		</div>
		</div>
	)

}
