export type Client = {
    id: number;
    full_name: string;
    personal_or_complete_name: string;
    internal_usage: boolean;
}

export type ActiveRecord = {
    id: number;
    name: string;
    description: string;
    client: Client;
    created_at: Date;
    internal: boolean;
    status: string;
    project_tour: boolean;
    organization_name: string;
    organization_id: number;
}


