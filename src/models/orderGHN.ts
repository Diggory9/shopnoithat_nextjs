interface MOrder{
    ProvinceID?:number,
    ProvinceName?:string,
    Code?:string
}
interface MWard{
    WardCode?:number
    DistrictID?:number,
    WardName?:string
}
interface MDistrict{
    DistrictID?:number,
    ProvinceID?:number,
    DistrictName?:string,
    Code?:string,
    Type?:number,
    SupportType?:number
}
