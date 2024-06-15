import { useState } from 'react';

function TextArea() {
    const [text, setText] = useState('');

    const handleInputChange = (event: any) => {
        setText(event.target.value);
    };
    console.log(text)
    return (
        <div>
            <textarea
                rows={10}
                cols={30}
                value={text}
                onChange={handleInputChange}
            ></textarea>
            <p>{text.split('\n').map((line, index) => (
                <span key={index}>
                    {line}
                    <br />
                </span>
            ))}</p>
        </div>
    );
}

export default TextArea;
