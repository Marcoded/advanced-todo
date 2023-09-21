export interface Ttodos {
    title: string
    dueDate?: Date 
    content?: string
    done: boolean
    id: string
  }

  export interface Tserializedtodos {
    title: string
    dueDate?: string  
    content?: string
    done: boolean
    id: string
  }
  