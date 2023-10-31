const Hover = ({children, text}:{children: React.ReactNode, text: string}) => {
  return (
    <div className="relative group">
        {children}
        <span aria-hidden className="opacity-0 group-hover:opacity-90 top-[-25px] left-1/2 -translate-x-1/2 transition delay-200 inset-0 whitespace-nowrap absolute min-w-fit px-2 rounded-sm w-full h-5 bg-slate-600 text-white text-[12px]"> {text} </span>
    </div>
  )
}

export default Hover