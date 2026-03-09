export interface ExperienceRow {
  id: number;
  company: string;
  period: string;
  location: string;
  bulletPoints: number;
}

export interface EducationRow {
  id: number;
  institution: string;
  degreeMajor: string;
  period: string;
  location: string;
}

export interface CertificationRow {
  id: number;
  institution: string;
  certification: string;
  period: string;
}

const STORAGE_KEY = 'resume-data';

function loadSaved(): Record<string, any> {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

function createResumeStore() {
  const saved = loadSaved();

  const initialExperience: ExperienceRow[] =
    Array.isArray(saved.experience) && saved.experience.length
      ? saved.experience
      : [{ id: 1, company: '', period: '', location: '', bulletPoints: 3 }];

  const initialEducation: EducationRow[] =
    Array.isArray(saved.education) && saved.education.length
      ? saved.education
      : [{ id: 1, institution: '', degreeMajor: '', period: '', location: '' }];

  const initialCertifications: CertificationRow[] =
    Array.isArray(saved.certifications) && saved.certifications.length
      ? saved.certifications
      : [{ id: 1, institution: '', certification: '', period: '' }];

  let personal = $state({
    fullName: (saved.personal?.fullName as string) ?? '',
    email: (saved.personal?.email as string) ?? '',
    phone: (saved.personal?.phone as string) ?? '',
    location: (saved.personal?.location as string) ?? '',
    linkedin: (saved.personal?.linkedin as string) ?? '',
    github: (saved.personal?.github as string) ?? '',
    website: (saved.personal?.website as string) ?? '',
  });

  let experience: ExperienceRow[] = $state(initialExperience);
  let education: EducationRow[] = $state(initialEducation);
  let certifications: CertificationRow[] = $state(initialCertifications);
  let summary: string = $state(saved.summary ?? '');
  let prompt: string = $state(saved.prompt ?? '');
  let resumeJson: string = $state(saved.resumeJson ?? '');

  let _nextExpId = Math.max(0, ...initialExperience.map((r) => r.id)) + 1;
  let _nextEduId = Math.max(0, ...initialEducation.map((r) => r.id)) + 1;
  let _nextCertId = Math.max(0, ...initialCertifications.map((r) => r.id)) + 1;

  $effect.root(() => {
    $effect(() => {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ personal, experience, education, certifications, summary, prompt, resumeJson }),
      );
    });
  });

  return {
    get personal() {
      return personal;
    },

    get experience() {
      return experience;
    },
    set experience(v: ExperienceRow[]) {
      experience = v;
    },
    addExperience() {
      experience.push({ id: _nextExpId++, company: '', period: '', location: '', bulletPoints: 3 });
    },
    removeExperience(id: number) {
      if (experience.length <= 1) return;
      experience = experience.filter((r) => r.id !== id);
    },

    get education() {
      return education;
    },
    set education(v: EducationRow[]) {
      education = v;
    },
    addEducation() {
      education.push({ id: _nextEduId++, institution: '', degreeMajor: '', period: '', location: '' });
    },
    removeEducation(id: number) {
      if (education.length <= 1) return;
      education = education.filter((r) => r.id !== id);
    },

    get certifications() {
      return certifications;
    },
    set certifications(v: CertificationRow[]) {
      certifications = v;
    },
    addCertification() {
      certifications.push({ id: _nextCertId++, institution: '', certification: '', period: '' });
    },
    removeCertification(id: number) {
      certifications = certifications.filter((r) => r.id !== id);
    },

    get summary() {
      return summary;
    },
    set summary(v: string) {
      summary = v;
    },

    get prompt() {
      return prompt;
    },
    set prompt(v: string) {
      prompt = v;
    },

    get resumeJson() {
      return resumeJson;
    },
    set resumeJson(v: string) {
      resumeJson = v;
    },
  };
}

export const resume = createResumeStore();
