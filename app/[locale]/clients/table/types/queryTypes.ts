export interface IResponseItem {
  id: number;
  firstName: string;
  fullName: string;
  lastName: string;
  imageUrl: string;
  targetDetails: {
    typeOfService: 'FullSupport' | 'Mentoring' | 'PersonalBrand';
    startDate: number;
    endDate: number;
    program: string;
    personDegree: 'Bachelor' | 'Master' | 'GraduateStudent';
  };
  cws: {
    completed: number;
    total: number;
  };
  universities: {
    total: number;
    top: number;
  };
  typeOfClient: 'Strong' | 'Weak' | 'Questionable';
  curator?: Curator;
  targetDetailsProgram: string;
  numberOfUniversities: number;
  numberOfTopUniversities: number;
  targetDetailsStartDate: number;
  targetDetailsEndDate: number;
  cwsCompleted?: number;
  cwsTotal?: number
  citizenship: Citizenship[];
  targetCountry: Country;
  redStage: Stage[];
  orangeStage: Stage[];
  chanceOfScholarship: number;
}

interface Curator {
  description?: string;
  id: number;
  firstName: string;
  lastName: string;
  imageUrl?: string;
}

interface Citizenship {
  id: number;
  country: string;
}

interface Country {
  id: number;
  country: string;
}

interface Stage {
  id: number;
  order: number;
  deadline: number;
}