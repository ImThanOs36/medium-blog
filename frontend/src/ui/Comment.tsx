
import Author from '../components/Author'

function Comment({ content, name }: { content: string, name: string }) {
  return (
    <div className=' p-2 text-xs'>

      <Author author={name} disable={false} />
      <p className='ml-8'>{content}</p>

    </div>

  )
}

export default Comment
