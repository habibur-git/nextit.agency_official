/** Paths match files in `public/assets/img/team/` */
const teamImage = (filename: string) =>
  `/assets/img/team/${encodeURIComponent(filename)}`;

export type TeamMember = {
  id: number;
  imageSrc: string;
  name: string;
  designation: string;
};

export const teamData: TeamMember[] = [
  {
    id: 9,
    imageSrc: teamImage("Zahidul Islam Chairman.jpg.jpeg"),
    name: "Zahidul Islam",
    designation: "Chairman",
  },
  {
    id: 6,
    imageSrc: teamImage("Rasel Babu Managing Director.jpg.jpeg"),
    name: "Rasel Babu",
    designation: "Managing Director",
  },
  {
    id: 1,
    imageSrc: teamImage("Habibur Rahman CEO.jpg.jpeg"),
    name: "Habibur Rahman",
    designation: "CEO",
  },
  {
    id: 7,
    imageSrc: teamImage("S M Sourov Sagor Head of Branding.jpg.jpeg"),
    name: "S M Sourov Sagor",
    designation: "Head of Branding",
  },
  {
    id: 10,
    imageSrc: teamImage("mahfuzur Rahman Head of Project Management.jpg.jpeg"),
    name: "Mahfuzur Rahman",
    designation: "Head of Project Management",
  },
  {
    id: 2,
    imageSrc: teamImage("Jubayer Bhuiyan Software Developer.jpg.jpeg"),
    name: "Jubayer Bhuiyan",
    designation: "Software Developer",
  },
  {
    id: 5,
    imageSrc: teamImage("Omer Faruq UI UX Designer.jpg.jpeg"),
    name: "Omer Faruq",
    designation: "UI UX Designer",
  },
  {
    id: 3,
    imageSrc: teamImage("Kabir Hossain Video Editor.jpg.jpeg"),
    name: "Kabir Hossain",
    designation: "Video Editor",
  },
  {
    id: 4,
    imageSrc: teamImage("Nafiz Ar Rafi Content Writer & IT Expert.jpg.jpeg"),
    name: "Nafiz Ar Rafi",
    designation: "Content Writer & IT Expert",
  },

  {
    id: 8,
    imageSrc: teamImage("Yasin Arafat Clint Comunication.jpg.jpeg"),
    name: "Yasin Arafat",
    designation: "Clint Comunication",
  },
];
