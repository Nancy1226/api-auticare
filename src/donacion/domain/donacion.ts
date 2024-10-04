    export class Donacion {
        id: number | null;
        uuid: string;
        id_pago: string | undefined; // proporcionado por el sistema de pagos
        cantidad: number;
        moneda: string;
        estado_pago: string;
    
        constructor(id: number | null, uuid: string, id_pago: string | undefined, cantidad: number, moneda: string, estado_pago: string) {
        this.id = id;
        this.uuid = uuid;
        this.id_pago = id_pago;
        this.cantidad = cantidad;
        this.moneda = moneda;
        this.estado_pago = estado_pago;
        }
    }
    