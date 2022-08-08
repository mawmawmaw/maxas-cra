import { useState } from "react";
const FaqItem = ({title, content}) => {
    const [isOpen,setIsOpen] = useState(false);
    return (
        <div className='faq-item' onClick={()=>setIsOpen(!isOpen)}>
            <div className='faq-title'>
                <h2>{title}</h2>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path d="M310.6 246.6l-127.1 128C176.4 380.9 168.2 384 160 384s-16.38-3.125-22.63-9.375l-127.1-128C.2244 237.5-2.516 223.7 2.438 211.8S19.07 192 32 192h255.1c12.94 0 24.62 7.781 29.58 19.75S319.8 237.5 310.6 246.6z"/></svg>
            </div>
            <div className='faq-content' style={{display: `${isOpen ? "block" : "none"}`,height: `${isOpen ? "auto" : "0"}`}}>
                {content}
            </div>
        </div>
    )
}
export default FaqItem;