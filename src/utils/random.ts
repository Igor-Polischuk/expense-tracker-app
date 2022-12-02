import { TransactionI } from "../redux/slices/accauntSlice";
import { substractDays } from "./datetime";

export function generateTransactionsData() {
    const categoryes = ['food', 'biils', 'transport', 'entertaiment', 'subscribtions', 'health&sport', 'connections', 'house'];
    const type = ['expense', 'income']

    const data: TransactionI[] = []
    let today = new Date();
    
    for (let i = 0; i < 100; i++){
        const todayTransactionCount = random(1, 4);
        for (let j = 0; j <= todayTransactionCount; j++){
            if (today.getDate() === 20 || today.getDate() === 5) {
                data.push({
                    category: 'salary',
                    sum: random(7000, 12000),
                    type: type[1],
                    date: today.toDateString()
                })
                break
            }else{
                data.push({
                    category: getRandomFromArray<string>(categoryes),
                    sum: -random(50, 500),
                    type: type[0],
                    date: today.toDateString()
                })
            }
        }
        today = substractDays(random(1, 4), today);
    }

    return data;
}

export function random(min: number, max: number){
    return Math.floor(Math.random() * max-min) + min
}

export function getRandomFromArray<T>(arr: T[]){
    const index = Math.floor(Math.random() * arr.length)
    return arr[index]
}