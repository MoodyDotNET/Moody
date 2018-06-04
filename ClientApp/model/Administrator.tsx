export default interface Administrator {
    userId: number;
    username: string;
    password: string;
    firstName: string;
    miidleName: string;
    lastName: string;
    available: boolean;
    lastModifyAt: Date;
    lastModifyBy: number;
}