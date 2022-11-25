import { UserType } from "../../types"

export const getMinPrice = (data: UserType[]) => {
    let arr: number[] = []

    data.forEach(item => {
        if (item.price === undefined || item.price === null) {
            arr.push(0)
        } else {
            arr.push(item.price)
        }
    })

    return Math.min(...arr)
}

export const getMaxPrice = (data: UserType[]) => {
    let arr: number[] = []

    data.forEach(item => {
        if (item.price === undefined || item.price === null) {
            arr.push(0)
        } else {
            arr.push(item.price)
        }
    })

    return Math.max.apply(Math, arr)
}
