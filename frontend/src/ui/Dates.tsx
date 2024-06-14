

function Dates({date}:{date:string}) {
    const res = new Date(date).toLocaleString("en-US", { timeZone: 'Asia/Kolkata' })
  return (
   <div className="font-satoshi text-sm font-sanst">
    <span><i>{res}</i></span>
   </div>
  )
}

export default Dates

