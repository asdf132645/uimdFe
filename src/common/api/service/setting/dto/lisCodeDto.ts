// wbc
export interface CreateLisCodeDto {
    lisCodeItems: LisCodeWbcItem[];
    userId: number;
}

export interface LisCodeWbcItem {
    text: string;
    value: string;
    code: string;
}

export interface UpdateLisCodeDto {
    lisCodeItems: LisCodeWbcItem[];
    userId: number;
}

// rbc
export interface CreateLisCodeRbcDto {
    lisCodeItems: LisCodeRbcItem[];
    userId: number;
}


export interface LisCodeRbcItem {
    categoryId: string;
    categoryNm: string;
    classId: string;
    classNm: string;
    code: string;
}

export interface UpdateLisCodeRbcDto {
    lisCodeItems: LisCodeRbcItem[];
    userId: number;
}

//cbc

export interface CreateCbcCodeRbcDto {
    cbcCodeItems: cbcCodeItem[];
    userId: number;
}


export interface cbcCodeItem {
    cd: string;
    testCd: string;
    testNm: string;
    isSelected: boolean;
}

export interface UpdateCbcCodeRbcDto {
    cbcCodeItems: cbcCodeItem[];
    userId: number;
}
