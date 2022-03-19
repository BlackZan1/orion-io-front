export const withoutFailObjectData: any = (data: any) => {
    const new_data: any = {}
    Object.entries(data).map((e: any) => {
        if(e[1] !== "") {
           return new_data[e[0]] = e[1]
        }
        return
    })

    return new_data
}