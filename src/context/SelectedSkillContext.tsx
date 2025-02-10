import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface SelectedSkillContextType {
  selectedSkill: string | null;
  setSelectedSkill: (skill: string | null) => void;
}

const SelectedSkillContext = createContext<
  SelectedSkillContextType | undefined
>(undefined);

export function SelectedSkillProvider({ children }: { children: ReactNode }) {
  const [selectedSkill, setSelectedSkill] = useState<string | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;

      // Eğer tıklanan element bir kart veya chip değilse seçimi kaldır
      if (
        !target.closest(".MuiPaper-root") && // Kartlar için
        !target.closest(".MuiChip-root") && // Chip'ler için
        selectedSkill !== null
      ) {
        setSelectedSkill(null);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [selectedSkill]);

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
