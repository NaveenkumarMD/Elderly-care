import {FETCH_POST,NEW_POST} from './Types'
export const fetchposts=()=>(dispatch)=>{
        console.log("fetching.....")
        fetch("https://jsonplaceholder.typicode.com/posts").then(res=>res.json()).then(data=>{
            console.log(data)
            dispatch({
                type:FETCH_POST,
                payload:data
            })
        })
    
}
export const createposts=(postdata)=>(dispatch)=>{
    fetch("https://jsonplaceholder.typicode.com/posts",{
        method:"POST",
        headers:{
            'Content-Type':'application/json'
        },
        body:JSON.stringify({
            title:postdata.title,
            body:postdata.body
        })
    }).then(res=>res.json()).then(data=>{
        dispatch({
            type:NEW_POST,
            payload:data
        })
    })

}