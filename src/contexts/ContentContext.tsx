import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { SiteContent } from '../types/content';

// Default content - fallback if Firebase fails
const defaultContent: SiteContent = {
  header: {
    title: 'MAGNETIC WOMAN EMPIRE™',
    subtitle: 'Where devotion, luxury, and sacred feminine power meet practical communication mastery.',
    description: 'Unlock the Magnetic Power to Attract, Cultivate, and Communicate™ Love',
    ctaText: 'Explore the Magnetic Woman Empire'
  },
  about: {
    title: 'Luba Evans, Harvard speaker and creator of the Magnetic Woman Empire™,',
    description1: 'has helped thousands of brilliant, high-achieving women embody their feminine magnetism — after years of struggling in love.',
    description2: 'Her programs combine neuroscience, sacred feminine embodiment, and high-performance psychology to help you shift your nervous system, release old patterns, and finally attract the love you deserve — without chasing, forcing, or lowering your standards.'
  },
  empireTools: {
    title: 'Your Magnetic Woman Empire Tools',
    subtitle: 'Magnetic Woman Empire',
    tools: [
      {
        title: 'LAW OF DEVOTION',
        subtitle: 'Unlock Your Irresistible Feminine Power',
        description: 'Principles to inspire deep, lifelong commitment from the right man.'
      },
      {
        title: 'MAGNETIC WOMAN LAUNCHPAD',
        subtitle: 'Find the Love You Desire in 90 Days',
        description: 'A 4-step process to effortlessly attract high-quality men without the apps.'
      },
      {
        title: 'THERA SLEEP',
        subtitle: 'Restore Radiance While You Sleep',
        description: 'Overnight nervous system reset, turning stress into feminine magnetism.'
      },
      {
        title: 'MAGNETIC COMMUNICATION COACH',
        subtitle: 'AI Wisdom for Authentic Connection',
        description: 'An AI-powered guide to help you master captivating conversations and deep connection.'
      },
      {
        title: 'SOULMATE MAGNET PROFILE',
        subtitle: 'Write the Perfect Love Attraction Bio',
        description: 'Position yourself online to attract your forever partner — while filtering out the wrong men.'
      }
    ]
  },
  howItWorks: {
    title: 'How It Works',
    steps: [
      {
        title: 'Choose the Transformation You Want Most',
        description: 'Whether it\'s unlocking devotion, finding love, restoring radiance, or perfecting your online profile — start with the door that calls to you most.'
      },
      {
        title: 'Start With the Right Program for You',
        description: 'Begin with one app or explore the whole Magnetic Woman Empire for a layered transformation. Each program works alone or together.'
      },
      {
        title: 'Experience Your Own Love Breakthrough',
        description: 'Your magnetic power awakens. Your nervous system shifts. Extraordinary men notice — and the right one steps forward.'
      }
    ]
  },
  whyWomenLove: {
    title: 'Why Women Love the Magnetic Woman Empire',
    reasons: [
      {
        title: 'Luxury Meets Science',
        description: 'Elegant design meets proven, neuroscience-backed results.'
      },
      {
        title: 'Feminine Without Losing Your Edge',
        description: 'You keep your success and attract love.'
      },
      {
        title: 'Results Without the Hustle',
        description: 'Many clients see shifts within weeks.'
      }
    ]
  },
  finalCTA: {
    title: 'You\'ve been the strong one long enough.',
    subtitle: 'Now, it\'s time to let yourself be pursued, cherished, and fully claimed.',
    ctaText: 'Enter the Magnetic Woman Empire',
    footerText: 'Once you rise, you never go back.'
  }
};

interface ContentContextType {
  content: SiteContent;
  loading: boolean;
  updateContent: (section: keyof SiteContent, updates: any) => Promise<void>;
  refreshContent: () => Promise<void>;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};

interface ContentProviderProps {
  children: ReactNode;
}

export const ContentProvider: React.FC<ContentProviderProps> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(defaultContent);
  const [loading, setLoading] = useState(true);

  const loadContent = async () => {
    try {
      const docRef = doc(db, 'siteContent', 'main');
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data() as SiteContent;
        setContent(data);
      } else {
        // Initialize with default content if document doesn't exist
        await setDoc(docRef, defaultContent);
        setContent(defaultContent);
      }
    } catch (error) {
      console.error('Error loading content:', error);
      // Use default content if Firebase fails
      setContent(defaultContent);
    } finally {
      setLoading(false);
    }
  };

  const updateContent = async (section: keyof SiteContent, updates: any) => {
    try {
      const docRef = doc(db, 'siteContent', 'main');
      const updatedContent = {
        ...content,
        [section]: {
          ...content[section],
          ...updates
        }
      };
      
      // Try to update first, if document doesn't exist, create it
      try {
        await updateDoc(docRef, updatedContent);
      } catch (updateError: any) {
        if (updateError.code === 'not-found') {
          // Document doesn't exist, create it
          await setDoc(docRef, updatedContent);
        } else {
          throw updateError;
        }
      }
      
      setContent(updatedContent);
    } catch (error) {
      console.error('Error updating content:', error);
      throw error;
    }
  };

  const refreshContent = async () => {
    setLoading(true);
    await loadContent();
  };

  useEffect(() => {
    loadContent();
  }, []);

  return (
    <ContentContext.Provider value={{
      content,
      loading,
      updateContent,
      refreshContent
    }}>
      {children}
    </ContentContext.Provider>
  );
};

export default ContentContext;
