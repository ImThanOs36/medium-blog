
interface BlogCardProps {
    id:number,
    author: string,
    title: string,
    content: string,
    publishedDate: string
  
}


function BlogCard({
    id,
    author,
    title,
    content,
    publishedDate,
   
}: BlogCardProps) {
    return (
        <div className=" outline " key={id}>
            <div>

           
            <div>{author}</div>
            <div>{title}</div>
            <div>{content}</div>
            <div>{publishedDate}</div>
             </div>
        </div>
    )
}

export default BlogCard