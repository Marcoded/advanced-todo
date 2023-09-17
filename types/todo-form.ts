export interface TtodoForm {
    mode : "edit" | "create";
    title : string;
    content? : string
    DueDate: Date | undefined
    id: string 
}