

function Dates({date}:{date:string}) {
    const res = new Date(date).toLocaleString("en-US", { timeZone: 'Asia/Kolkata' })
  return (
   <div className="font-satoshi text-xs font-medium text-indigo-500 ">
    <span><i>{res}</i></span>
   </div>
  )
}

export default Dates

