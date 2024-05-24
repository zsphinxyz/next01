import '@/app/globals.css'
import data from '@/utils/data.json'
import yearData from '@/utils/year.json'
import Hover from "@/components/Hover"

	// Firebase 

	// Icons 
import {SiGoogleclassroom} from 'react-icons/si';
import {BsGrid3X3, BsFillCursorFill} from 'react-icons/bs';
import {TiInfoLargeOutline} from 'react-icons/ti';
import {TbColumnInsertRight} from 'react-icons/tb';
import {IoBrowsersSharp} from 'react-icons/io5';
import {RiFilePaper2Line} from 'react-icons/ri';
import {AiFillPrinter, AiOutlineColumnWidth, AiOutlineOrderedList, AiOutlineNumber, AiOutlineFontSize} from 'react-icons/ai';


	// React & Next
import { useRef, useEffect, useState } from 'react';
import ReactToPrint from "react-to-print"
import { La_Belle_Aurore } from 'next/font/google';
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
	const [rowHeight, setRowHeight] = useState(27)		// height of empty rows
	const [isRoll, setIsRoll] = useState(false)			// show roll no or not
	const [isNo, setIsNo] = useState(true)				// show Number or not
	const [isCell, setIsCell] = useState(false) 		// select individual cells
	const [tableHeader, setTableHeader] = useState(false)	// set Table header
	const [ori, setOri] = useState(false)				// set Orientation

	const [fontSize, setFontSize] = useState(14)		// font size

	// const searchParams = useSearchParams();
	// const year = searchParams?.get('all')
	// const router = useRouter();

	const printRef = useRef(null);

	let c = 0;
	let arr = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]

	// let studentNames:string[] = [] 

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

	//  store all the students names in one single array
	//  data.map(i => (
	// 	studentNames.push(i.name)
	//  ))
	//  console.log(studentNames.sort())
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
				className="p-2 bg-slate-300 text-black outline-none"
			>
				{
					yearData.map((i) => (
						<option key={i.year} 
							value={i.year} 
							className=''
						>
							{['Nursery','Reception', 'All'].includes(i.year) ? i.year : 'Year ' + i.year}
						</option>	
					))
				}
			</select>

		<Hover text='Show Number'>
			<label className={` p-1 pb-2 rounded-sm ${isNo ? 'bg-green-500' : 'bg-slate-300'}`}>
				<input 	type='checkbox' 
						checked={isNo}
						className=" appearance-none peer"
						onChange={() => setIsNo(!isNo)}
				/> 
				<AiOutlineOrderedList className='w-fit inline text-[30px] text-stone-500 peer-checked:text-white' />
			</label>
		</Hover>

		<Hover text='Show Roll Number'>
			<label className={` p-1 pb-2 rounded-sm ${isRoll ? 'bg-green-500' : 'bg-slate-300'}`}>
				<input 	type='checkbox' 
						checked={isRoll}
						className=" appearance-none peer"
						onChange={() => setIsRoll(!isRoll)}
				/> 
				<AiOutlineNumber className='w-fit inline text-[30px] text-stone-500 peer-checked:text-white' />
			</label>
		</Hover>
		
		<Hover text='Show Class'>
			<label className={` p-1 pb-2 rounded-sm ${yearcol ? 'bg-green-500' : 'bg-slate-300'}`}>
				<input 	type='checkbox' 
						checked={yearcol}
						className=" appearance-none peer"
						onChange={() => setYearcol(!yearcol)}
						/> 
				<SiGoogleclassroom className='w-fit inline text-[30px] text-stone-500 peer-checked:text-white' />
			</label>
		</Hover>


		<Hover text='Show Grid'>
			<label className={` p-1 pb-2 rounded-sm ${empty ? 'bg-green-500' : 'bg-slate-300'}`}>
				<input 
					type='checkbox'
					checked={empty}
					className='appearance-none peer'
					onChange={ () => setEmpty(!empty) }
					/>
				<BsGrid3X3  className='w-fit inline text-[25px] text-stone-500 peer-checked:text-white text-align-right' /> 
			</label>
		</Hover>

		{empty && <label className=' rounded-sm pr-1 bg-slate-300'>
			<TbColumnInsertRight className=' inline-block  text-2xl h-8' />
			<input type="number" min='0' max='25' className='outline-none bg-transparent w-7 h-8 text-right ' value={cols} onChange={e => setCols(parseInt(e.target.value))}/>
		</label>}
		
		{empty && <label className=' rounded-sm pr-1 bg-slate-300'>
			<AiOutlineColumnWidth className=' inline-block  text-2xl h-8' />
			<input type="number" min='10' max='200' className='outline-none bg-transparent w-10 h-8 text-right' value={colWidth} onChange={e => setColWidth(parseInt(e.target.value))}/>
		</label>}

		{empty && <label className=' rounded-sm pr-1 bg-slate-300'>
			<AiOutlineColumnWidth className=' inline-block text-2xl h-8 rotate-90' />
			<input type="number" min='10' max='200' className='outline-none bg-transparent w-10 h-8 text-right' value={rowHeight} onChange={e => setRowHeight(parseInt(e.target.value))}/>
		</label>}



				{/* Divider  */}
	<div className='w-[3px] h-7 bg-white mx-1 rounded-full' />

				{/* Select individual cells  */}
		<Hover text='Cell Mode'>
			<label className={` p-1 pb-2 rounded-sm ${isCell ? 'bg-green-500' : 'bg-slate-300'}`}>
				<input
					type='checkbox'
					checked={isCell}
					className='appearance-none peer'
					onChange={ () => setIsCell(!isCell) }
				/>
				<BsFillCursorFill  className='w-fit inline text-[25px] text-stone-500 peer-checked:text-white text-align-right' /> 
			</label>
		</Hover>

				{/* Add Header */}
		<Hover text='Page Header'>
			<label className={` p-1 pb-2 rounded-sm ${tableHeader ? 'bg-green-500' : 'bg-slate-300'}`}>
				<input 
					type='checkbox'
					checked={tableHeader}
					className='appearance-none peer'
					onChange={ () => setTableHeader(!tableHeader) }
				/>
				<IoBrowsersSharp  className='w-fit inline text-[25px] text-stone-500 peer-checked:text-white text-align-right' /> 
			</label>
		</Hover>

		{/* Orientation */}
		<Hover text='Orientation'>
			<label className={` p-1 pb-2 rounded-sm ${ori ? 'bg-green-500' : 'bg-slate-300'}`}>
				<input 
					type='checkbox'
					checked={ori}
					className='appearance-none peer'
					onChange={ () => setOri(!ori) }
				/>
				<RiFilePaper2Line  className='w-fit inline text-[25px] text-stone-500 peer-checked:text-white peer-checked:rotate-90 text-align-right' /> 
			</label>
		</Hover>


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
						/> <span className='bg-slate-300 p-1 rounded-sm w-full h-full peer-checked:bg-green-500 peer-checked:text-white'>R-{i}</span>
					</label>
				</>
				))
			} 
			<div className=" absolute left-[215px] w-[235px] h-7 flex items-center rounded-sm">
				<label className=' rounded-sm pr-1 bg-slate-300'>
					<AiOutlineFontSize className=' inline-block text-2xl h-8' />
					<input type="number" min='8' max='20' className='outline-none bg-transparent w-10 h-8 text-right' value={fontSize} onChange={e => setFontSize(parseInt(e.target.value))}/>
				</label>
			</div>
		</div> 
		{/* Middle row ends */}

			
			{/* bottom contol row starts */}
			<div className='flex items-center'>
			<input 
				placeholder='Search' 
				onChange={(e)=>setSearch(e.target.value)}
				className="text-black outline-none pl-2 py-1 bg-slate-300 focus:bg-slate-100"
				value={search}
			/>

			<ReactToPrint
				trigger = {
					() => (
						<button className='ml-2 bg-slate-300 hover:bg-slate-100 h-[32px] group transition '>
							<AiFillPrinter className='w-full text-xl px-2 group-hover:scale-125 transition '/>
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
				{[...data.map(i => i.id)].length} Students • &nbsp;
				Year: {year} • &nbsp;
				{room.length} Rooms • &nbsp;
			</p>
		</div> {/* End Info bar */}

		<div 
		ref={printRef}
		className={`min-w-fit ${ori ? 'h-[8.3in] w-[11.7in]' : 'w-[8.3in] h-[11.7in]' } [border:dashed_1px_gray] print:border-0`}>

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

 		<table className={`font-[Times] whitespace-nowrap ${isCell ? 'cursor-cell' : 'cursor-default'} selection:bg-slate-700 selection:text-white ml-5 print:ml-0`} style={{fontSize: fontSize+2}}>
		<thead>
		 <tr>
			{isNo && <th className="border border-black">No</th>}
			{isRoll && <th className="border border-black">Roll No</th>}
			<th className="border border-black min-w-[100px]">Name</th>
			{
				yearcol &&
				<th className="border border-black px-2">Year (Room)</th>
			}

			{
			empty && (
				<>
					{colRef.map(i => (
						<th key={i} className='border border-black overflow-hidden text-center' style={{width: colWidth}}>
							<input type="text" className=' bg-transparent w-full h-full text-center outline-none focus:bg-slate-200'/>
						</th>
					))}
				</>
			)}
			
		</tr>
		</thead>

		<tbody>

		 {
		 data.filter( j => year=='All' ?
		 			j.year :
					(j.year.toString() == year && r.concat('0').includes(j.room.toString()) ))
					.filter(
						s => search.length !=0 ?
						s.name.toLowerCase().includes(search.toLowerCase()) :
						s.name
					)
					.map((i) => {	
						c++;
						return(
							<tr key={i.id} style={{height: rowHeight}} /*className='odd:bg-stone-200'*/>
								{isNo && <td className='border border-black px-2 '> {c} </td>}
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
