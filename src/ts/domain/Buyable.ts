export default interface Buyable {
    readonly id: number,
    readonly name: string,
    readonly price: number,
    amount?: number,
    print?(): void,
}