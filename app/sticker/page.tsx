'use client'
import { useState } from 'react';
import data from '@/utils/data.json'
import yearData from '@/utils/year.json'


// const Sticker = () => {
//   const [year, setYear] = useState('All');
//   const [room, setRoom] = useState<number[]>([]);	
//   const [r, setR] = useState('1');	

//   const handleInput = (e:any) => {
// 		e.target.checked ? 
// 		setR(
// 			(a) => e.target.id + a
// 		) : 
// 		setR(
// 			r.replace(e.target.id, '')
// 		)
// 		}

//   return (
//     <>
//     <div>
//       <select onChange={e=>{
//           setYear(e.target.value)
//           }}
//           className="p-2 bg-slate-300 text-black bold outline-none"
//         >
//           {
//             yearData.map((i) => (
//               <option 
//                 key={i.year} 
//                 value={i.year}
//                 className='hover:bg-green-300 '
//               >
//                 {['Nursery','Reception', 'All'].includes(i.year) ? i.year : 'Year '+i.year}
//               </option>	
//             ))
//           }
//         </select>

//         <div className='w-full h-10 flex items-center '>
// 			{
// 				room.map(i => (
// 				<>
// 					<label>
// 						<input  type='checkbox'
// 								key={i}
// 								id={i.toString()}
// 								onChange={handleInput}
// 								className='appearance-none peer'
// 						/> <span className='bg-slate-300 p-1 rounded-sm w-full h-full peer-checked:bg-green-500'>R-{i}</span>
// 					</label>
// 				</>
// 				))
// 			} 
// 		</div>

//     </div> {/* End of Control */}

//       <div className='grid grid-cols-3 gap-2 w-[21cm] font-serif'>
//             {
//               data.filter(j => j.year == year && j.year)
//               .map(j => (
//                 <div className=' bg-indigo-200 border border-black text-center py-4 rounded-md'>
//                   <h1 className=' leading-10 font-extrabold text-xl'>{j.name}</h1>
//                   <h2>{j.year} (Room {j.room}) </h2>
//                 </div>
//               ))
//             }
//       </div>
//     </>
//   )
// }

// export default Sticker