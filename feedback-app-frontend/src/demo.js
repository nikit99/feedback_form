import React from 'react'

const demo = () => {

  obj = { 
    name:"ankit",
    company:"intellicus"
  }
  return (
    <div>
          (
            obj.map((index, val)=>{
                <>
                <h1>val.name</h1>
                <p>val.company</p>
                </>
                
            })
          )
    </div>
  )
}

export default demo
