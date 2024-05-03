
export function Appbar({firstName}){
   return<div>
    <div className="grid grid-cols-2 p-3">
    <div className="justify-self-start font-semibold text-lg pt-2">PayTM App</div>
    <div className="justify-self-end flex"><div className="pt-2">{firstName}</div> <div className="px-2"><div className="relative inline-flex items-center justify-center w-10 h-10 overflow-hidden bg-slate-300 rounded-full ">
    <span className="font-medium text-black ">{firstName[0]}</span>
</div>
</div>
 </div>
    

    </div>
    <hr className="border-1 "></hr>
    </div>
}