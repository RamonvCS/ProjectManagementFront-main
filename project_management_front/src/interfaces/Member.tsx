// Data Object que representa un Miembro
export interface Member {
    member_id?: number;
    member_name?: string;
    role?: string;
    project_id?: number;
}


//Data object que representa el equipo de trabajo de un proyecto 
export interface MemberTeam {
    project_id?: number;
    project_name?: string;
    members?: Member[];
}

