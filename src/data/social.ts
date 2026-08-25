export interface SocialLink {
  label: string;
  url: string;
}

export interface SocialInfo {
  email: string | null;
  phone: string | null;
  links: SocialLink[];
}

// Sourced directly from the user-provided resume (2026-08-25) and their
// confirmed GitHub handle (thisislohit). Phone added to the public site
// 2026-08-25 per explicit user confirmation.
export const social: SocialInfo = {
  email: "kuntamukkala2017@gmail.com",
  phone: "+91 83415 90211",
  links: [
    { label: "GitHub", url: "https://github.com/thisislohit" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/thisislohit" },
  ],
};
