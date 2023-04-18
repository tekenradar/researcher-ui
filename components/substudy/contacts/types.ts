export interface Note {
  id: string;
  time: number;
  author: string;
  content: string;
}

export interface ContactDetailsData {
  id: string;
  addedAt: number;
  sessionID: string;
  participantID: string;
  general: {
    age: number;
    gender: string;
    otherStudies: boolean;
  };
  contactData?: {
    firstName: string;
    lastName: string;
    email: string;
    phone?: string;
    birthday?: number;
    gender?: string;
    gp?: {
      office: string;
      name: string;
      address: {
        street: string;
        nr: string;
        postcode: string;
        city: string;
      }
      phone: string;
    }
  };
  keepContactData: boolean;
  notes?: Note[];
}
