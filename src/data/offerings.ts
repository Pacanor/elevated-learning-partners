import { BarChart3, BrainCircuit, GraduationCap, ShieldCheck, Users } from "lucide-react";

export const offerings = [
  {
    icon: GraduationCap,
    number: "01",
    title: "Curriculum design & development",
    copy: "Custom, standards-aligned curricula designed to meet diverse learner needs, promote accessible and culturally responsive learning, and foster meaningful, lasting learning outcomes. With Academy of Hope, that included a new Maryland adult curriculum and a modernized Washington, DC curriculum.",
  },
  {
    icon: ShieldCheck,
    number: "02",
    title: "Curriculum evaluation & modernization",
    copy: "Comprehensive curriculum reviews and redesigns that strengthen educational quality, ensure alignment with global and national standards, promote accessibility and inclusive, culturally responsive learning, and integrate evidence-based instructional practices.",
  },
  {
    icon: BrainCircuit,
    number: "03",
    title: "Instructional design & course development",
    copy: "Engaging courses, lessons, assessments, and learning resources designed for in-person, online, and blended environments, creating meaningful learning experiences that foster lasting understanding, knowledge retention, and real-world application.",
  },
  {
    icon: Users,
    number: "04",
    title: "Educator, professional & workforce development",
    copy: "Practical, research-informed training that strengthens instructional effectiveness, develops workforce skills, builds professional capacity, and supports continuous improvement.",
  },
  {
    icon: BarChart3,
    number: "05",
    title: "Learning evaluation & quality assurance",
    copy: "Data-informed evaluation of curricula, instructional practices, and learning outcomes to identify areas for improvement, guide evidence-based decisions, and strengthen educational quality and effectiveness.",
  },
] as const;
