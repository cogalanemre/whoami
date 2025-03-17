import { TranslationType } from '../schema';

const en: TranslationType = {
  sections: {
    experience: "Experience",
    education: "Education",
    blog: "Blog",
    contact: "Contact",
    skills: "Skills",
    social: "Social Media"
  },
  contact: {
    info: "Contact Information",
    sendMessage: "Send Message",
    form: {
      name: "Full Name",
      email: "Email",
      phone: "Phone",
      phoneOptional: "optional",
      message: "Message",
      send: "Send",
      sending: "Sending..."
    },
    success: "Your message has been sent successfully.",
    error: "An error occurred while sending your message."
  },
  blog: {
    readMore: "Read more",
    loading: "Loading blog posts...",
    noPosts: "No blog posts yet.",
    readingTime: {
      minute: "minute",
      minutes: "minutes"
    },
    aria: {
      coverImage: "cover image",
      readPost: "Read blog post"
    }
  },
  education: {
    aria: {
      card: "education details",
      logo: "logo",
      duration: "education duration"
    }
  },
  theme: {
    dark: "Dark",
    light: "Light"
  },
  experience: {
    current: "Present",
    fullTime: "Full Time",
    workingModel: {
      hybrid: "Hybrid",
      remote: "Remote",
      office: "Office"
    },
    employmentType: {
      fullTime: "Full Time",
      partTime: "Part Time",
      contract: "Contract",
      freelance: "Freelance"
    }
  },
  skills: {
    showAll: "Show All Skills",
    showLess: "Show Less"
  },
  error: {
    title: "An Error Occurred",
    message: "Sorry, something went wrong.",
    retry: "Try Again"
  }
};

export default en; 