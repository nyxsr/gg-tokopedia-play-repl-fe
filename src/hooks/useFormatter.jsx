export default function useFormatter() {
    const price = (value) =>{
        return new Intl.NumberFormat('id-ID',{style:'currency',currency:'IDR',minimumFractionDigits:0}).format(parseInt(value))
    }

    return {price}
}