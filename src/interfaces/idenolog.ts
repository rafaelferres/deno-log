export interface IDenoLogOption {
    prefix?:string,
    showDate?:boolean,
    showTime?:boolean,
    path?: string

}


export var IDenoLogOptionDefault : IDenoLogOption = {
    prefix: "",
    showDate: true,
    showTime: true,
    path: Deno.cwd()
}