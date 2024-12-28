import { useEffect } from "react"
import { useState } from "react"





export default function SpinnerLoader() {

    const [text, setText] = useState('')
    const [showImg] = useState(true)
        useEffect (() => {
            setTimeout(() => {
                setText(
                    'I waited for 3 seconds to be loaded, did you see the spinner?'
                )
            },3000)
        },[])
    return(
    <>
    <div>
        {
            showImg ? ( 
                <img src="/spinner.svg" alt="spinner"/>
            ) :
            (
                <h3>{text}</h3>
            )
        }
    </div>
    </>
    )
}