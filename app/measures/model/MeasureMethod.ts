
export enum MeasureMethod {
    JACKSON_POLLOCK_7 = 'JACKSON_POLLOCK_7',
    JACKSON_POLLOCK_3 = 'JACKSON_POLLOCK_3',
    JACKSON_POLLOCK_4 = 'JACKSON_POLLOCK_4',
    PARRILLO = 'PARRILLO',
    DURNIN_WOMERSLEY = 'DURNIN_WOMERSLEY',
    FROM_SCALE = 'FROM_SCALE',
    WEIGHT_ONLY = 'WEIGHT_ONLY',
}

export function methodMessageId(method?: MeasureMethod): string {
    switch (method) {
        case MeasureMethod.JACKSON_POLLOCK_7:
            return 'measureMethodJacksonPollock7';
        case MeasureMethod.JACKSON_POLLOCK_3:
            return 'measureMethodJacksonPollock3';
        case MeasureMethod.JACKSON_POLLOCK_4:
            return 'measureMethodJacksonPollock4';
        case MeasureMethod.PARRILLO:
            return 'measureMethodParrillo';
        case MeasureMethod.DURNIN_WOMERSLEY:
            return 'measureMethodDurninWomersley';
        case MeasureMethod.FROM_SCALE:
            return 'measureMethodManualScale';
        case MeasureMethod.WEIGHT_ONLY:
            return 'measureMethodWeight';
        default:
            return 'measureMethodWeight';
    }
}

