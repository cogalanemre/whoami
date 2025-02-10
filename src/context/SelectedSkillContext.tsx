import { createContext, useContext, useState, ReactNode } from "react";

interface SelectedSkillContextType {
  selectedSkill: string | null;
  setSelectedSkill: (skill: string | null) => void;
}

const SelectedSkillContext = createContext<
  SelectedSkillContextType | undefined
>(undefined);

export function SelectedSkillProvider({ children }: { children: ReactNode }) {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  return (
    <SelectedSkillContext.Provider value={{ selectedSkill, setSelectedSkill }}>
      {children}
    </SelectedSkillContext.Provider>
  );
}

export function useSelectedSkill() {
  const context = useContext(SelectedSkillContext);
  if (context === undefined) {
    throw new Error(
      "useSelectedSkill must be used within a SelectedSkillProvider"
    );
  }
  return context;
}
