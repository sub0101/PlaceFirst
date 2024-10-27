export const manageStats =(totalPlaced:any , totalStudent:any)=>{

    const result:any = [];
    totalPlaced.map((item:any)=>{

        result.push( {
            id:item.id,
            departmentName:item.name,
            shortName  :getShortName(item.name),
            totalPlaced:item._count.student
        })
    })
    for(let i =0;i<result.length ;i++){
        result[i].totalStudent = totalStudent[i]._count.student
    }
    
    console.log(result)
return result;
}

const getShortName =(name:string)=>{

    const arr =  name.split(' ');
    let shortName = "" 
    arr.forEach( (item)=>  {
        if((item.toLocaleLowerCase() !=="of".toLocaleLowerCase() ) && item.toLocaleLowerCase() !=='and'.toLocaleLowerCase())  shortName+=item[0].toLocaleUpperCase()
}
)
    // console.log(shortName)
    return shortName
}