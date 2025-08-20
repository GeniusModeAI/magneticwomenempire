export interface ContentData {
  id: string;
  section: string;
  key: string;
  value: string;
  type: 'text' | 'title' | 'subtitle' | 'description';
  updatedAt: Date;
}

export interface SiteContent {
  header: {
    title: string;
    subtitle: string;
    description: string;
    ctaText: string;
  };
  about: {
    title: string;
    description1: string;
    description2: string;
  };
  empireTools: {
    title: string;
    subtitle: string;
    tools: Array<{
      title: string;
      subtitle: string;
      description: string;
    }>;
  };
  howItWorks: {
    title: string;
    steps: Array<{
      title: string;
      description: string;
    }>;
  };
  whyWomenLove: {
    title: string;
    reasons: Array<{
      title: string;
      description: string;
    }>;
  };
  finalCTA: {
    title: string;
    subtitle: string;
    ctaText: string;
    footerText: string;
  };
}
